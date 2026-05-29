// ─────────────────────────────────────────────────────────────────────────────
// Telemetry Engine — STANDALONE BACKGROUND POLLER
//
// Runs entirely OUTSIDE React.  No useState, no useEffect, no useCallback.
// Components subscribe via useSyncExternalStore (see TelemetryContext.jsx).
//
// Three independent streams, each with its own snapshot object.
// When a stream updates it replaces ONLY its snapshot reference.
// useSyncExternalStore compares with Object.is → components subscribed to
// OTHER streams see the same reference → no re-render.
// ─────────────────────────────────────────────────────────────────────────────

import {
    fetchSystemStats,
    fetchGPUStats,
    fetchProcesses,
    fetchHistory,
    fetchCoreHistory,
    fetchTemperatureStats,
    fetchSystemInfo,
    fetchAnalyticsDaily,
    fetchAnalyticsWeekly,
    fetchDailyHistory,
    fetchWeeklyHistory,
    fetchProcessLoad,
    fetchCoreUsage,
    fetchAlerts,
} from "../api/telemetryApi";

// ── Stream snapshots ─────────────────────────────────────────────────────
// Module-level mutable state.  Each variable is an immutable snapshot.
// Only the stream's own poll function replaces its reference.

let fastSnap   = { stats: null, gpu: null };
let mediumSnap = { processes: [], history: null, coreHistory: {} };
let slowSnap   = {
    temp: null, systemInfo: null,
    analyticsDaily: null, analyticsWeekly: null,
    dailyHistory: [], weeklyHistory: [],
    processLoad: [], coreUsage: [], alerts: [],
};

// ── Pub / sub ────────────────────────────────────────────────────────────
const listeners = new Set();

function notify() {
    for (const fn of listeners) fn();
}

/** Subscribe a listener; returns unsubscribe function.  */
export function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

/** Snapshot getters — stable reference when that stream hasn't updated. */
export function getFastSnapshot()   { return fastSnap; }
export function getMediumSnapshot() { return mediumSnap; }
export function getSlowSnapshot()   { return slowSnap; }

// ── In-flight guards ─────────────────────────────────────────────────────
// Prevent request pile-up if the API is slower than the interval.
let fastBusy   = false;
let mediumBusy = false;
let slowBusy   = false;

// ── Poll functions ───────────────────────────────────────────────────────

//  🔵 FAST  (1.5 s)  —  CPU %, RAM %, GPU %
async function pollFast() {
    if (fastBusy) return;
    fastBusy = true;
    try {
        const [stats, gpu] = await Promise.all([
            fetchSystemStats(),
            fetchGPUStats(),
        ]);
        fastSnap = { stats, gpu };          // new reference
        notify();
    } catch (err) {
        console.error("[engine/fast]", err);
    } finally {
        fastBusy = false;
    }
}

//  🟡 MEDIUM  (6 s)  —  processes, history charts, core history
async function pollMedium() {
    if (mediumBusy) return;
    mediumBusy = true;
    try {
        const [processes, history, coreHistory] = await Promise.all([
            fetchProcesses(),
            fetchHistory(),
            fetchCoreHistory(),
        ]);
        mediumSnap = { processes, history, coreHistory };
        notify();
    } catch (err) {
        console.error("[engine/medium]", err);
    } finally {
        mediumBusy = false;
    }
}

//  🔴 SLOW  (30 s)  —  analytics, alerts, temperature, system info
async function pollSlow() {
    if (slowBusy) return;
    slowBusy = true;
    try {
        const [
            temp, systemInfo,
            daily, weekly, dHist, wHist,
            processLoad, coreUsage, alerts,
        ] = await Promise.all([
            fetchTemperatureStats(),
            fetchSystemInfo(),
            fetchAnalyticsDaily(),
            fetchAnalyticsWeekly(),
            fetchDailyHistory(),
            fetchWeeklyHistory(),
            fetchProcessLoad(),
            fetchCoreUsage(),
            fetchAlerts(),
        ]);
        slowSnap = {
            temp, systemInfo,
            analyticsDaily: daily,
            analyticsWeekly: weekly,
            dailyHistory:  dHist.slice(-70),
            weeklyHistory: wHist.slice(-50),
            processLoad, coreUsage, alerts,
        };
        notify();
    } catch (err) {
        console.error("[engine/slow]", err);
    } finally {
        slowBusy = false;
    }
}

// ── Lifecycle ────────────────────────────────────────────────────────────

let fastTimer   = null;
let mediumTimer = null;
let slowTimer   = null;

export function start() {
    // Fetch everything immediately
    pollFast();
    pollMedium();
    pollSlow();

    // Schedule independent intervals
    fastTimer   = setInterval(pollFast,    1_500);
    mediumTimer = setInterval(pollMedium,  6_000);
    slowTimer   = setInterval(pollSlow,   30_000);
}

export function stop() {
    clearInterval(fastTimer);
    clearInterval(mediumTimer);
    clearInterval(slowTimer);
    fastTimer = mediumTimer = slowTimer = null;
}
