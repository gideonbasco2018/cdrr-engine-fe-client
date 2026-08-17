// src/pages/applications/NewApplicationPage.jsx
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/AppLayout";

const ACTIVITIES = [
  {
    id: "miv-n",
    label: "Minor Variation-Notification (MiV-N)",
    description: "Modify details of an existing product registration.",
    to: "/applications/new/miv-n",
  },
  {
    id: "fgmp",
    label: "FGMP - Foreign Good Manufacturing Practices (Coming Soon)",
    description: "Application for Foreign Good Manufacturing Practices.",
    to: "/applications/new/fgmp",
  },
];

export default function NewApplicationPage() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="px-10 py-10 max-w-2xl">
        <h1 className="font-display text-2xl text-ink mb-1">
          Select Activity / Service
        </h1>
        <p className="text-ink/60 mb-8">
          Choose the activity or service you&apos;d like to file an application
          for.
        </p>

        <div className="space-y-3">
          {ACTIVITIES.map((activity) => (
            <button
              key={activity.id}
              type="button"
              onClick={() => navigate(activity.to)}
              className="w-full text-left rounded-lg border border-line bg-white px-5 py-4 hover:border-forest/40 hover:bg-forest/[0.02] transition-colors flex items-start gap-3"
            >
              <span className="mt-1 w-4 h-4 rounded-full border border-ink/30 shrink-0" />
              <span>
                <span className="block text-sm font-semibold text-ink">
                  {activity.label}
                </span>
                <span className="block text-sm text-forest/80">
                  {activity.description}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
