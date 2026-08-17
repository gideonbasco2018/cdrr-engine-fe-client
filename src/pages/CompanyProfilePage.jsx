import AppLayout from "../components/AppLayout";

export default function CompanyProfilePage() {
  return (
    <AppLayout>
      <div className="px-10 py-10">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-forest mb-2">
          Profile
        </p>
        <h1 className="font-display text-3xl text-ink mb-8">Company Profile</h1>
        <div className="rounded-lg border border-line bg-white p-8 text-ink/60">
          Company profile content goes here.
        </div>
      </div>
    </AppLayout>
  );
}
