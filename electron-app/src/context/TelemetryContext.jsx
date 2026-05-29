// ─────────────────────────────────────────────────────────────────────────────
// TelemetryContext — Thin React bridge over the standalone engine
//
// The engine (src/engine/telemetryEngine.js) does ALL polling outside React.
// This file provides:
//   1.  <TelemetryProvider>  — starts / stops the engine on mount / unmount
//   2.  useFastTelemetry()   — CPU %, RAM %, GPU %   (1.5 s)
//   3.  useMediumTelemetry() — processes, history     (6 s)
//   4.  useSlowTelemetry()   — analytics, alerts      (30 s)
//
// Each hook returns a DIFFERENT snapshot object so React only re-renders
// the components that subscribe to the stream that actually changed.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useSyncExternalStore } from "react";

import * as engine from "../engine/telemetryEngine";

// ── Provider ─────────────────────────────────────────────────────────────
// Only job: start the engine when mounted, stop when unmounted.
// Handles tab-visibility pause/resume.

export function TelemetryProvider({ children }) {

    useEffect(() => {
        engine.start();

        const onVisibility = () => {
            if (document.hidden) {
                engine.stop();
            } else {
                engine.start();
            }
        };
        document.addEventListener("visibilitychange", onVisibility);

        return () => {
            engine.stop();
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, []);

    return children;
}

// ── Stream hooks ─────────────────────────────────────────────────────────
// Each returns an immutable snapshot object whose reference ONLY changes
// when that specific stream polls new data.

/** 🔵 FAST  (1.5 s)  — { stats, gpu } */
export function useFastTelemetry() {
    return useSyncExternalStore(engine.subscribe, engine.getFastSnapshot);
}

/** 🟡 MEDIUM  (6 s)  — { processes, history, coreHistory } */
export function useMediumTelemetry() {
    return useSyncExternalStore(engine.subscribe, engine.getMediumSnapshot);
}

/** 🔴 SLOW  (30 s)  — { temp, systemInfo, analyticsDaily, analyticsWeekly,
 *                       dailyHistory, weeklyHistory, processLoad, coreUsage,
 *                       alerts } */
export function useSlowTelemetry() {
    return useSyncExternalStore(engine.subscribe, engine.getSlowSnapshot);
}