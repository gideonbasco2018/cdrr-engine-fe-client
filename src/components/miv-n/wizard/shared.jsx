// src/components/miv-n/wizard/shared.jsx
export const VARIATION_OPTIONS = [
  { id: "brand-name", label: "Change of Brand Name" },
  { id: "classification", label: "Change of Classification" },
  { id: "dosage-form", label: "Change of Dosage Form" },
  { id: "dosage-strength", label: "Change of Dosage Strength" },
];

export const ESTABLISHMENT_CATEGORIES = [
  "Drug Establishment",
  "Trader",
  "Importer",
  "Distributor",
  "Packer/Repacker",
];

export const PARTY_ROLES = [
  "Manufacturer",
  "Trader",
  "Importer",
  "Distributor",
  "Packer/Repacker",
];

export const DOCUMENT_REQUIREMENTS = [
  { id: "cpr", label: "Certificate of Product Registration", required: true },
  {
    id: "pacs",
    label:
      "Copy of previously approved/acknowledged PACs (if not yet incorporated in the current CPR) (if applicable)",
    required: false,
  },
  {
    id: "clidp",
    label:
      "For variations of Certificate of Listing of Identical Drug Products (CLIDP), copy of Principal CPR (PCPR) variation approval/acknowledgements (whenever applicable)",
    required: false,
  },
  {
    id: "notarized-notification",
    label: "Notarized Notification Form (Annex C)",
    required: true,
  },
  {
    id: "product-label",
    label:
      "Product Label (Currently approved, proposed, and highlighted changes)",
    required: true,
  },
  { id: "coa", label: "Certificate of Analysis", required: true },
  {
    id: "loj",
    label: "Letter of Justification / Letter of Authorization",
    required: true,
  },
  { id: "gmp", label: "Valid GMP Certificate", required: true },
  { id: "lto", label: "Valid LTO Certificate", required: true },
  {
    id: "proposed-change-evidence",
    label:
      "Official document/evidence referencing the proposed change (e.g. Foreign GMP, Dossier)",
    required: false,
  },
  {
    id: "deed-of-assignment",
    label: "Deed of Assignment / Termination of Agreement",
    required: false,
  },
  { id: "actd", label: "Relevant ACTD Section", required: false },
];

export function emptyParty() {
  return {
    id: crypto.randomUUID(),
    role: "",
    name: "",
    country: "",
    address: "",
    tin: "",
    ltoNumber: "",
  };
}

export const inputClass =
  "w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/30 focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-colors";

export const tableInputClass =
  "w-full rounded border border-line bg-surface px-2 py-1.5 text-sm text-ink placeholder:text-ink/30 focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-colors";

export function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink/80 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

export function SelfAssessment({ checked, onChange }) {
  return (
    <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3">
      <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1.5">
        Self-Assessment
      </p>
      <label className="flex items-start gap-2 text-sm text-ink/70">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5"
        />
        I attest that the information provided in this section is true,
        complete, and accurate to the best of my knowledge, and I understand
        that any misrepresentation may result in the denial or revocation of
        this application.
      </label>
    </div>
  );
}

export function SummarySection({ title, children }) {
  return (
    <div className="rounded-md border border-line px-4 py-4">
      <p className="text-sm font-semibold text-ink mb-2">{title}</p>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

export function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-ink/50">{label}</span>
      <span className="text-ink text-right">{value || "—"}</span>
    </div>
  );
}
