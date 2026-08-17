// src/pages/applications/miv-n/VerifyAppointmentPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../../components/AppLayout";

// TODO: replace with real API call once the appointment-check endpoint is ready.
// Expected shape from backend:
//   { status: "valid" }
//   { status: "no_schedule_today", nextSchedule: { date, refNumber } }
//   { status: "not_found" }
function checkAppointmentMock(refNumber) {
  const trimmed = refNumber.trim().toUpperCase();
  if (trimmed === "APT-2026-000123") {
    return { status: "valid" };
  }
  return { status: "not_found" };
}

export default function VerifyAppointmentPage() {
  const [refNumber, setRefNumber] = useState("");
  const [result, setResult] = useState(null); // null | { status, nextSchedule? }
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate();

  function handleCheck(e) {
    e?.preventDefault();
    setChecking(true);
    setResult(null);
    setTimeout(() => {
      setResult(checkAppointmentMock(refNumber));
      setChecking(false);
    }, 300);
  }

  function goToApplication(usedRefNumber) {
    navigate("/applications/new/miv-n/apply", {
      state: { refNumber: usedRefNumber },
    });
  }

  function testValidToday() {
    setRefNumber("APT-2026-000123");
    setResult({ status: "valid" });
  }
  function testHasScheduleNotYet() {
    setRefNumber("APT-2026-005190");
    setResult({
      status: "no_schedule_today",
      nextSchedule: {
        date: "August 15, 2026 · 10:00 AM",
        refNumber: "APT-2026-005190",
      },
    });
  }
  function testNoScheduleFound() {
    setRefNumber("APT-2026-000000");
    setResult({ status: "not_found" });
  }

  return (
    <AppLayout>
      <div className="flex items-center justify-center px-10 py-10 min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-md rounded-lg border border-line bg-surface px-8 py-8">
          {!result && (
            <>
              <h1 className="font-display text-xl text-ink mb-1 text-center">
                Verify Your Appointment
              </h1>
              <p className="text-sm text-ink/60 mb-6 text-center">
                Enter your appointment reference number to proceed with filing a
                variation application.
              </p>

              <form onSubmit={handleCheck} className="space-y-4">
                <input
                  type="text"
                  value={refNumber}
                  onChange={(e) => setRefNumber(e.target.value)}
                  placeholder="e.g. APT-2026-000123"
                  className="w-full rounded-md border border-line bg-white px-4 py-2.5 text-center text-ink placeholder:text-ink/30 focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={checking || !refNumber.trim()}
                  className="w-full rounded-md bg-forest hover:bg-forest-light disabled:opacity-60 text-paper font-medium py-2.5 transition-colors"
                >
                  {checking ? "Checking…" : "Check Appointment"}
                </button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-line" />
                <span className="text-[10px] text-ink/40 uppercase tracking-wider">
                  For testing
                </span>
                <div className="h-px flex-1 bg-line" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={testValidToday}
                  className="rounded-md border border-line px-3 py-2 text-xs text-ink/70 hover:bg-ink/5 transition-colors"
                >
                  Test: Valid appointment (today)
                </button>
                <button
                  type="button"
                  onClick={testHasScheduleNotYet}
                  className="rounded-md border border-line px-3 py-2 text-xs text-ink/70 hover:bg-ink/5 transition-colors"
                >
                  Test: Has schedule, not yet
                </button>
                <button
                  type="button"
                  onClick={testNoScheduleFound}
                  className="col-span-2 rounded-md border border-line px-3 py-2 text-xs text-ink/70 hover:bg-ink/5 transition-colors"
                >
                  Test: No schedule found
                </button>
              </div>
            </>
          )}

          {result?.status === "not_found" && (
            <div className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <span className="text-amber-500 text-xl">⚠</span>
              </div>
              <h2 className="font-display text-lg text-ink mb-2">
                Reference Number Not Found
              </h2>
              <p className="text-sm text-ink/60 mb-6">
                We couldn&apos;t find an appointment for reference number{" "}
                <strong>{refNumber}</strong>. Please book a schedule through the
                appointment system before filing a variation application.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate("/appointments/new")}
                  className="flex-1 rounded-md bg-forest hover:bg-forest-light text-paper font-medium py-2.5 transition-colors text-sm"
                >
                  Go to Appointment Scheduler
                </button>
                <button
                  type="button"
                  onClick={() => setResult(null)}
                  className="flex-1 rounded-md border border-line text-ink/70 hover:bg-ink/5 font-medium py-2.5 transition-colors text-sm"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {result?.status === "no_schedule_today" && (
            <div className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <span className="text-amber-500 text-xl">⚠</span>
              </div>
              <h2 className="font-display text-lg text-ink mb-2">
                No Valid Appointment Today
              </h2>
              <p className="text-sm text-ink/60 mb-1">
                You don&apos;t have a valid appointment for today, so you
                can&apos;t file a variation application yet.
              </p>
              <p className="text-sm text-ink/60 mb-4">
                Your next available schedule is:
              </p>
              <div className="rounded-md border border-line bg-paper px-4 py-3 mb-6">
                <p className="text-sm font-medium text-ink">
                  {result.nextSchedule.date}
                </p>
                <p className="text-xs text-ink/50 mt-0.5">
                  Reference No. {result.nextSchedule.refNumber}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate("/appointments/new")}
                  className="flex-1 rounded-md bg-forest hover:bg-forest-light text-paper font-medium py-2.5 transition-colors text-sm"
                >
                  Go to Appointment Scheduler
                </button>
                <button
                  type="button"
                  onClick={() => setResult(null)}
                  className="flex-1 rounded-md border border-line text-ink/70 hover:bg-ink/5 font-medium py-2.5 transition-colors text-sm"
                >
                  Check Another Reference No.
                </button>
              </div>
            </div>
          )}

          {result?.status === "valid" && (
            <div className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center">
                <span className="text-forest text-xl">✓</span>
              </div>
              <h2 className="font-display text-lg text-ink mb-2">
                Appointment Verified
              </h2>
              <p className="text-sm text-ink/60 mb-6">
                Reference No. <strong>{refNumber || "APT-2026-000123"}</strong>{" "}
                is valid for today. You may proceed with your application.
              </p>
              <button
                type="button"
                onClick={() => goToApplication(refNumber || "APT-2026-000123")}
                className="w-full rounded-md bg-forest hover:bg-forest-light text-paper font-medium py-2.5 transition-colors text-sm"
              >
                Proceed to Application
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
