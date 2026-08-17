// src/pages/applications/ComingSoonPage.jsx
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/AppLayout";

export default function ComingSoonPage({
  title = "Coming Soon",
  message = "This activity type isn't available yet. Please check back later.",
}) {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="flex items-center justify-center px-10 py-10 min-h-[calc(100vh-4rem)]">
        <div className="max-w-md text-center rounded-lg border border-line bg-white px-8 py-10">
          <h1 className="font-display text-2xl text-ink mb-2">{title}</h1>
          <p className="text-ink/60 mb-8">{message}</p>
          <button
            type="button"
            onClick={() => navigate("/applications/new")}
            className="rounded-md bg-forest hover:bg-forest-light text-paper font-medium px-5 py-2.5 transition-colors"
          >
            Back to Select Activity
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
