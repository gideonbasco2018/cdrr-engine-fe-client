// src/pages/MyApplicationsPage.jsx
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import AppLayout from "../components/AppLayout";

// =========================================================
// STATIC MOCK DATA
// =========================================================
const APPLICATIONS = [
  {
    id: "FDA-2026-0417",
    productName: "Amoxicillin 500mg Capsule",
    type: "Minor Variation-Notification (MiV-N)",
    dateSubmitted: "2026-06-12",
    status: "Under review",
  },
  {
    id: "FDA-2026-0398",
    productName: "Paracetamol 250mg/5mL Syrup",
    type: "Minor Variation-Notification (MiV-N)",
    dateSubmitted: "2026-05-28",
    status: "Submitted",
  },
  {
    id: "FDA-2026-0355",
    productName: "Losartan Potassium 50mg Tablet",
    type: "Minor Variation-Notification (MiV-N)",
    dateSubmitted: "2026-04-15",
    status: "Approved",
  },
  {
    id: "FDA-2026-0312",
    productName: "Cetirizine HCl 10mg Tablet",
    type: "Minor Variation-Notification (MiV-N)",
    dateSubmitted: "2026-03-02",
    status: "For compliance",
  },
  {
    id: "FDA-2026-0287",
    productName: "Multivitamins + Minerals Softgel",
    type: "Minor Variation-Notification (MiV-N)",
    dateSubmitted: "2026-01-20",
    status: "Rejected",
  },
];

// =========================================================
// STATUS BADGE
// =========================================================
function StatusBadge({ status }) {
  const styles = {
    Submitted: "bg-gray-100 text-gray-600 border-gray-200",
    "Under review": "bg-[#d4af52]/10 text-[#8a6d1f] border-[#d4af52]/30",
    Approved: "bg-emerald-50 text-[#0b513c] border-emerald-200",
    "For compliance": "bg-amber-50 text-amber-700 border-amber-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium ${
        styles[status] || "bg-gray-100 text-gray-600 border-gray-200"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

// =========================================================
// ACTION MENU (fixed: uses a portal so it can't be clipped by
// the table's `overflow-x-auto` / `overflow-hidden` ancestors,
// and it flips upward automatically if there isn't room below)
// =========================================================
function ActionMenu({ application, onViewStatus, onViewDocuments }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, openUp: false });
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const MENU_WIDTH = 224; // w-56
  const MENU_HEIGHT_ESTIMATE = 96; // two items, roughly

  function computePosition() {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();

    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < MENU_HEIGHT_ESTIMATE + 8;

    let left = rect.right - MENU_WIDTH;
    left = Math.max(8, Math.min(left, window.innerWidth - MENU_WIDTH - 8));

    const top = openUp ? rect.top - 6 : rect.bottom + 6;

    setCoords({ top, left, openUp });
  }

  useLayoutEffect(() => {
    if (open) computePosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleReposition() {
      computePosition();
    }
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink/70 transition hover:bg-gray-50"
      >
        Actions
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              width: MENU_WIDTH,
              transform: coords.openUp ? "translateY(-100%)" : "none",
              zIndex: 50,
            }}
            className="overflow-hidden rounded-xl border border-line bg-white shadow-lg"
          >
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onViewStatus(application);
              }}
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-xs text-ink/80 transition hover:bg-gray-50"
            >
              <svg
                className="h-4 w-4 shrink-0 text-forest"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
              View application status
            </button>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onViewDocuments(application);
              }}
              className="flex w-full items-center gap-2.5 border-t border-line px-3.5 py-2.5 text-left text-xs text-ink/80 transition hover:bg-gray-50"
            >
              <svg
                className="h-4 w-4 shrink-0 text-forest"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
                <path d="M14 3v5h5" />
              </svg>
              View output documents
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
}

// =========================================================
// PAGE
// =========================================================
export default function MyApplicationsPage() {
  function handleViewStatus(application) {
    console.log("View status:", application.id);
    // TODO: navigate to status page, e.g. navigate(`/applications/${application.id}/status`)
  }

  function handleViewDocuments(application) {
    console.log("View documents:", application.id);
    // TODO: navigate to documents page, e.g. navigate(`/applications/${application.id}/documents`)
  }

  return (
    <AppLayout>
      <div className="px-10 py-10">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-forest mb-2">
          Applications
        </p>
        <h1 className="font-display text-3xl text-ink mb-8">My Applications</h1>

        <div className="overflow-hidden rounded-lg border border-line bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line bg-gray-50/60">
                  <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-ink/50">
                    Reference No.
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-ink/50">
                    Product Name
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-ink/50">
                    Application Type
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-ink/50">
                    Date Submitted
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-ink/50">
                    Status
                  </th>
                  <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-ink/50">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {APPLICATIONS.map((application) => (
                  <tr
                    key={application.id}
                    className="border-b border-line last:border-b-0 hover:bg-gray-50/40"
                  >
                    <td className="px-5 py-4 font-mono text-xs text-ink/70">
                      {application.id}
                    </td>
                    <td className="px-5 py-4 text-ink">
                      {application.productName}
                    </td>
                    <td className="px-5 py-4 text-ink/70">
                      {application.type}
                    </td>
                    <td className="px-5 py-4 text-ink/70">
                      {new Date(application.dateSubmitted).toLocaleDateString(
                        "en-PH",
                        { year: "numeric", month: "short", day: "numeric" },
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={application.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <ActionMenu
                        application={application}
                        onViewStatus={handleViewStatus}
                        onViewDocuments={handleViewDocuments}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {APPLICATIONS.length === 0 && (
            <div className="p-8 text-center text-sm text-ink/60">
              No applications yet.
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
