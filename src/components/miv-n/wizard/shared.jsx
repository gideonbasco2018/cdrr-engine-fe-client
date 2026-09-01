// src/components/miv-n/wizard/shared.jsx
export const VARIATION_OPTIONS = [
  {
    id: "MiV-N1",
    label:
      "Change in name and/or address of the marketing authorization holder",
  },
  { id: "MiV-N2", label: "Change of product owner" },
  { id: "MiV-N3", label: "Change in ownership of manufacturer" },
  {
    id: "MiV-N4",
    label: "Change of the name or address of the manufacturer of drug product",
  },
  {
    id: "MiV-N5",
    label:
      "Change of the name or address of the company or manufacturer responsible for batch release",
  },
  {
    id: "MiV-N6",
    label:
      "Change of the name and/or address of a manufacturer of the drug substance",
  },
  {
    id: "MiV-N7",
    label:
      "Withdrawal/deletion of the alternative manufacturer(s) (for drug substance and/or drug product and/or packager)",
  },
  {
    id: "MiV-N8",
    label:
      "Renewal of European Pharmacopoeial Certificate of Suitability (CEP)",
  },
  {
    id: "MiV-N9",
    label:
      "Change of release and/or shelf-life/re-test specifications and/or test procedure of the drug product and/or drug substance and/or excipient, following the updates in the compendium",
  },
  { id: "MiV-N10", label: "Deletion of pack size for a product" },
  {
    id: "MiV-N11",
    label:
      "Minor change in the manufacturing process of an immediate release solid oral dosage form, semi solid or oral solutions",
  },
  {
    id: "MiV-PH-N1",
    label:
      "Change of product labeling (in accordance to country specific labeling requirement)",
  },
  {
    id: "MiV-PH-N2",
    label:
      "Change/addition of QC/Stability testing site/s (different from the batch release site)",
  },
  {
    id: "MiV-PH-N3",
    label:
      "Change/inclusion of distributor (for Principal Certificate of Product Registration, PCPR)",
  },
  {
    id: "MiV-PH-N4",
    label: "Addition/change of supplier of drug substance / excipient",
  },
  {
    id: "MiV-PH-N5",
    label: "Addition/change of supplier of packaging materials",
  },
  {
    id: "MiV-PH-N6",
    label: "Administrative changes affecting entities other than the MAH",
  },
  {
    id: "MiV-PH-N7",
    label: "Addition of pack size for non-sterile drug product",
  },
  {
    id: "MiV-PA18",
    label: "Deletion of the solvent/diluent for the drug product",
  },
  {
    id: "MiV-PA31",
    label: "Change of outer carton pack sizes for a drug product",
  },
  {
    id: "MiV-PA32",
    label:
      "Change in any part of the (primary) packaging material not in contact with the finished product formulation such as colour of flip-off caps, colour code rings on ampoules, change of needle shield (different plastic used)",
  },
  { id: "MiV-PH3", label: "Change of Marketing Authorization Holder (MAH)" },
];

export const REQUIREMENTS_BY_VARIATION = {
  "MiV-N1": [
    {
      id: "N1-1",
      label:
        "Revised draft package insert and labeling incorporating the proposed variation (where applicable).",
    },
    {
      id: "N1-2",
      label:
        "Letter by the product owner authorizing the proposed name of marketing authorization holder to hold the product license.",
    },
    {
      id: "N1-3",
      label:
        "Official document from the relevant authority confirming the change with the proposed name and/or address.",
    },
  ],
  "MiV-N2": [
    {
      id: "N2-1",
      label:
        "Revised drafts of the package insert and labeling incorporating the proposed variation (where applicable).",
    },
    {
      id: "N2-2",
      label:
        "Declaration on the transfer of ownership between the approved and proposed product owner.",
    },
    {
      id: "N2-3",
      label:
        "Official letter from the proposed product owner declaring the change, and authorizing the local license holder to be responsible for the product license.",
    },
    {
      id: "N2-4",
      label:
        "If the proposed product owner is not the manufacturer of the drug product, an official letter by the proposed product owner authorizing the manufacturer to manufacture the drug product on its behalf.",
    },
    {
      id: "N2-5",
      label:
        "If the proposed product owner is not the manufacturer of the drug product, letter of acceptance from the manufacturer that it will be held responsible for manufacturing and ensuring the efficacy, quality and safety aspect of the drug product.",
    },
  ],
  "MiV-N3": [
    {
      id: "N3-1",
      label:
        "Revised drafts of the package insert and labeling incorporating the proposed variation (where applicable).",
    },
    {
      id: "N3-2",
      label:
        "Letter of justification on the transfer of ownership such as a valid GMP certificate.",
    },
    {
      id: "N3-3",
      label:
        "Official letter stating the transfer of ownership to the proposed manufacturer (where applicable).",
    },
    {
      id: "N3-4",
      label:
        "In case of a contract manufacturer, official letter from product owner declaring the change and authorizing the proposed manufacturer to manufacture the drug products on its behalf.",
    },
    {
      id: "N3-5",
      label:
        "In case of a contract manufacturer, letter of acceptance from the proposed manufacturer that it will be held responsible for manufacturing and ensuring the efficacy, quality and safety aspect of the drug product.",
    },
  ],
  "MiV-N4": [
    {
      id: "N4-1",
      label:
        "Revised drafts of the package insert and labeling incorporating the proposed variation (where applicable).",
    },
    {
      id: "N4-2",
      label:
        "A valid GMP certificate, CPP which covers the GMP certification or official document from relevant authority confirming the proposed name and/or address.",
    },
    {
      id: "N4-3",
      label:
        "Official letter from product owner authorizing the manufacturer with proposed name/address to manufacture the drug product.",
    },
  ],
  "MiV-N5": [
    {
      id: "N5-1",
      label:
        "Revised drafts of the package insert and labeling incorporating the proposed variation (where applicable).",
    },
    {
      id: "N5-2",
      label:
        "A valid GMP certificate, CPP which covers the GMP certification or official document from relevant authority confirming the proposed name or address (where applicable).",
    },
    {
      id: "N5-3",
      label:
        "Official letter from product owner authorizing company/manufacturer with proposed name/address responsible for batch release.",
    },
    {
      id: "N5-4",
      label:
        "A declaration from the marketing authorization holder that the change does not involve change of batch release site.",
    },
  ],
  "MiV-N6": [
    {
      id: "N6-1",
      label: "Updated information of the manufacturer of the drug substance.",
    },
    { id: "N6-2", label: "Official document/evidence where applicable." },
  ],
  "MiV-N7": [{ id: "N7-1", label: "Reason for withdrawal/deletion." }],
  "MiV-N8": [
    {
      id: "N8-1",
      label:
        "A valid European Pharmacopoeial Certificate of Suitability (CEP) for the drug substance, latest version, with all annexes issued by EDQM.",
    },
  ],
  "MiV-N9": [
    {
      id: "N9-1",
      label:
        "Tabulation of the approved and proposed release and/or shelf-life/re-test specifications and/or test procedure of the drug product with changes highlighted.",
    },
    {
      id: "N9-2",
      label:
        "Batch analysis data (in comparative tabulated format) of the drug product for all tests in the proposed specification of at least two batches and/or certificate of analysis of excipient and/or drug substance.",
    },
    {
      id: "N9-3",
      label: "Revised release and/or shelf-life/re-test specifications.",
    },
    {
      id: "N9-4",
      label:
        "For change in test procedure, appropriate verification data of the proposed test procedure (where applicable).",
    },
  ],
  "MiV-N10": [
    {
      id: "N10-1",
      label:
        "Revised drafts of the package insert and labeling incorporating the proposed variation (where applicable).",
    },
    { id: "N10-2", label: "Reason for deletion." },
  ],
  "MiV-N11": [
    {
      id: "N11-1",
      label:
        "Amendment of the relevant section(s) of the dossier, as appropriate, including a direct comparison of the approved process and the proposed process.",
    },
    {
      id: "N11-2",
      label:
        "For semi-solid and liquid products in which the active substance is present in non-dissolved form: appropriate validation of the change including microscopic imaging of particles to check for visible changes in morphology; comparative particle size distribution data by an appropriate method.",
    },
    {
      id: "N11-3",
      label:
        "For solid dosage forms: dissolution profile data of one representative production batch and comparative data of the last three batches from the previous process; data on the next two full production batches should be available on request or reported if outside specification (with proposed action).",
    },
    {
      id: "N11-4",
      label:
        "Justification for not submitting a new bioequivalence study according to the ASEAN Guidelines for the Conduct of Bioavailability and Bioequivalence Studies (where applicable).",
    },
    {
      id: "N11-5",
      label: "Copy of approved release and shelf-life specifications.",
    },
    {
      id: "N11-6",
      label:
        "Certificate of analysis and/or batch analysis data (in a comparative tabulated format) on a minimum of one batch manufactured to both the approved and the proposed process. Batch analysis data on the next two full production batches should be made available upon request and reported by the marketing authorization holder if outside specification (with proposed action).",
    },
    {
      id: "N11-7",
      label:
        "A declaration from the marketing authorization holder that the relevant stability studies of the drug product will be started and that the relevant stability studies will be finalized; data should be provided only if outside specification (with proposed action).",
    },
  ],
  "MiV-PH-N1": [
    {
      id: "PHN1-1",
      label: "Change/s in packaging design (no change in text).",
    },
    {
      id: "PHN1-2",
      label: "Change/s in layout (positioning of graphic designs).",
    },
  ],
  "MiV-PH-N2": [
    {
      id: "PHN2-1",
      label:
        "No change in the manufacturer of the drug product / drug substance / excipient.",
    },
  ],
  "MiV-PH-N3": [{ id: "PHN3-1", label: "No change in MAH." }],
  "MiV-PH-N4": [
    {
      id: "PHN4-1",
      label: "No change in the manufacturer of the drug substance.",
    },
    {
      id: "PHN4-2",
      label:
        "No change in the specification of the drug substance / excipient.",
    },
  ],
  "MiV-PH-N5": [
    {
      id: "PHN5-1",
      label:
        "No change in the qualitative and quantitative composition, and type of container.",
    },
    {
      id: "PHN5-2",
      label: "No change in the specification of the packaging materials.",
    },
  ],
  "MiV-PH-N6": [
    {
      id: "PHN6-1",
      label: "No change in the manufacturer of the drug product.",
    },
    {
      id: "PHN6-2",
      label:
        "No change in the distributor [for Certificate of Listing of Identical Drug Products (CLIDP)].",
    },
  ],
  "MiV-PH-N7": [
    {
      id: "PHN7-1",
      label:
        "No change in the qualitative and quantitative composition, and type of container.",
    },
    {
      id: "PHN7-2",
      label: "No change in the specification of the packaging materials.",
    },
  ],
  "MiV-PA18": [
    {
      id: "PA18-1",
      label:
        "Revised drafts of the package insert and labeling incorporating the proposed variation (where applicable).",
    },
    {
      id: "PA18-2",
      label:
        "Justification for the deletion of the solvent/diluent, including a statement regarding alternative means to obtain the drug product.",
    },
    {
      id: "PA18-3",
      label: "Amended relevant ACTD Section P (where applicable).",
    },
  ],
  "MiV-PA31": [
    {
      id: "PA31-1",
      label:
        "Revised drafts of the package insert and labeling incorporating the proposed variation (where applicable).",
    },
    {
      id: "PA31-2",
      label:
        "Letter of declaration from the marketing authorization holder stating that no other changes except for the change of outer carton pack sizes for a drug product.",
    },
  ],
  "MiV-PA32": [
    {
      id: "PA32-1",
      label:
        "Amendment of the relevant section(s) of the dossier (presented in the ACTD format), including revised product labeling as appropriate.",
    },
  ],
  "MiV-PH3": [
    { id: "PH3-1", label: "Copy of valid License to Operate." },
    {
      id: "PH3-2",
      label:
        "Termination of Contract/Deed of Assignment [For imported products (CLIDP): deed of assignment of MAH (Importer) to the distributor will suffice]. For local products (CLIDP): distributorship agreement.",
    },
    {
      id: "PH3-3",
      label:
        "Agreement between manufacturer and the new trader/importer/distributor (for CLIDPs, no need to submit this — the agreement is between the manufacturer and PCPR MAH [Importer if imported product] and Trader if local).",
    },
    {
      id: "PH3-4",
      label:
        "Complete labeling materials reflecting the change of trader/importer/distributor.",
    },
  ],
};

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
    required: true,
  },
  {
    id: "clidp",
    label:
      "For variations of Certificate of Listing of Identical Drug Products (CLIDP), copy of Principal CPR (PCPR) variation approval/acknowledgements (whenever applicable)",
    required: true,
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
    required: false,
  },
  { id: "coa", label: "Certificate of Analysis", required: false },
  {
    id: "loj",
    label: "Letter of Justification / Letter of Authorization",
    required: true,
  },
  { id: "gmp", label: "Valid GMP Certificate", required: false },
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
  "w-full rounded-md border border-line bg-surface px-3 py-1.5 text-sm text-ink placeholder:text-ink/30 focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-colors";
export const tableInputClass =
  "w-full rounded border border-line bg-surface px-2 py-1.5 text-sm text-ink placeholder:text-ink/30 focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-colors";

export function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink/80 mb-1">
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
