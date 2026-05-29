import React, { memo } from "react";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

// Outside the component — same reference every render.
// Previously this object was rebuilt on every AlertCard render.
const SEVERITY_COLORS = {
    LOW:    "text-green-400",
    MEDIUM: "text-yellow-400",
    HIGH:   "text-red-400",
};

// ─── AlertCard ─────────────────────────────────────────────────────────────
// memo'd so only the specific card whose alert data changed re-renders,
// not the entire list on every poll.

const AlertCard = React.memo(function AlertCard({ alert }) {

    return (

        <div className="
            bg-[#111111]
            border border-[#1f1f1f]
            rounded-xl
            p-4
            flex
            items-start
            gap-4
        ">

            <div className="mt-1">
                {alert.success ? (
                    <CheckCircle size={18} className="text-green-400" />
                ) : (
                    <XCircle size={18} className="text-red-400" />
                )}
            </div>

            <div className="flex-1">

                <div className="flex items-center justify-between gap-3">

                    <h3 className="font-medium">
                        {alert.type} Alert
                    </h3>

                    <span className={`text-xs font-medium ${SEVERITY_COLORS[alert.severity]}`}>
                        {alert.severity}
                    </span>

                </div>

                <p className="text-sm text-gray-400 mt-1">
                    {alert.message}
                </p>

                <p className="text-xs text-gray-600 mt-2">
                    {new Date(alert.timestamp).toLocaleString()}
                </p>

            </div>

        </div>
    );
});

// ─── AlertsPanel ───────────────────────────────────────────────────────────

const AlertsPanel = memo(function AlertsPanel({ alerts }) {

    return (

        <div className="
            bg-[#0d0d0d]
            border border-[#1a1a1a]
            rounded-2xl
            p-5
            space-y-4
        ">

            <div className="flex items-center justify-between">

                <h2 className="text-xl font-semibold">
                    Recent Alerts
                </h2>

                <p className="text-xs text-gray-500">
                    Last 50 events
                </p>

            </div>

            <div className="max-h-100 overflow-y-auto pr-2 space-y-3">

                {alerts.length === 0 ? (

                    <div className="text-gray-500 text-sm py-10 text-center">
                        No alerts yet
                    </div>

                ) : (

                    alerts.map((alert) => (
                        <AlertCard key={alert.id} alert={alert} />
                    ))

                )}

            </div>

        </div>
    );
});

export default AlertsPanel;