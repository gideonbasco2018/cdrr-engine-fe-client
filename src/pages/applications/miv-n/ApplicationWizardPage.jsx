// src/pages/applications/miv-n/ApplicationWizardPage.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppLayout from "../../../components/AppLayout";
import {
  ApplicationDetailsStep,
  EstablishmentInfoStep,
  ProductInfoStep,
  InvolvedPartiesStep,
  DocumentsStep,
  SummaryStep,
  emptyParty,
} from "../../../components/miv-n/WizardSteps";

const STEPS = [
  { key: "applicationDetails", label: "Application Details" },
  { key: "establishment", label: "Establishment Info" },
  { key: "product", label: "Product Info" },
  { key: "parties", label: "Involved Parties" },
  { key: "documents", label: "Documents" },
  { key: "summary", label: "Summary" },
];

const FEES = { filing: 1000, variation: 2500, legalResearch: 35 };

function initialFormData() {
  return {
    applicationDetails: {
      registrationNumber: "",
      variationType: "",
      agreedTerms: false,
    },
    establishment: {
      ltoNumber: "",
      category: "",
      company: "",
      tin: "",
      address: "",
      email: "",
      contact: "",
      ltoValidity: "",
      attested: false,
    },
    product: {
      brandName: "",
      genericName: "",
      dosageStrength: "",
      dosageForm: "",
      classification: "",
      shelfLife: "",
      storageCondition: "",
      packaging: "",
      srp: "",
      attested: false,
    },
    parties: {
      parties: [emptyParty()],
      attested: false,
    },
    documents: {
      additionalDocuments: [],
    },
  };
}

function currency(n) {
  return `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;
}

export default function ApplicationWizardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const refNumber = location.state?.refNumber;

  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState(initialFormData());
  const [submitted, setSubmitted] = useState(false);

  const currentKey = STEPS[stepIndex].key;

  function patchSection(sectionKey, patch) {
    setFormData((prev) => ({
      ...prev,
      [sectionKey]:
        typeof patch === "object" && !Array.isArray(patch)
          ? { ...prev[sectionKey], ...patch }
          : patch,
    }));
  }

  function canGoNext() {
    if (currentKey === "applicationDetails") {
      return (
        formData.applicationDetails.variationType &&
        formData.applicationDetails.agreedTerms
      );
    }
    if (currentKey === "establishment") {
      return (
        formData.establishment.company &&
        formData.establishment.ltoNumber &&
        formData.establishment.attested
      );
    }
    if (currentKey === "product") {
      return formData.product.brandName && formData.product.attested;
    }
    if (currentKey === "parties") {
      return (
        formData.parties.parties.every((p) => p.role && p.name) &&
        formData.parties.attested
      );
    }
    return true;
  }

  function goNext() {
    if (stepIndex < STEPS.length - 1) setStepIndex(stepIndex + 1);
  }
  function goBack() {
    if (stepIndex === 0) {
      navigate("/applications/new/miv-n");
    } else {
      setStepIndex(stepIndex - 1);
    }
  }

  function handleSubmit() {
    // TODO: wire to POST /app_logs (or the actual submission endpoint) once ready.
    setSubmitted(true);
  }

  const total = FEES.filing + FEES.variation + FEES.legalResearch;
  const hasVariation = !!formData.applicationDetails.variationType;

  if (submitted) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center px-10 py-10 min-h-[calc(100vh-4rem)]">
          <div className="max-w-md text-center rounded-lg border border-line bg-white px-8 py-10">
            <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center">
              <span className="text-forest text-xl">✓</span>
            </div>
            <h1 className="font-display text-2xl text-ink mb-2">
              Application Submitted
            </h1>
            <p className="text-ink/60 mb-8">
              Your MiV-N application has been received and is now pending
              evaluation.
            </p>
            <button
              type="button"
              onClick={() => navigate("/applications")}
              className="rounded-md bg-forest hover:bg-forest-light text-paper font-medium px-5 py-2.5 transition-colors"
            >
              View My Applications
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="px-10 py-8">
        <h1 className="font-display text-xl text-ink mb-6">Application</h1>

        <div className="flex items-center mb-8 max-w-3xl">
          {STEPS.map((step, i) => (
            <div
              key={step.key}
              className="flex items-center flex-1 last:flex-none"
            >
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={[
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0",
                    i < stepIndex
                      ? "bg-forest text-paper"
                      : i === stepIndex
                        ? "border-2 border-forest text-forest"
                        : "border border-ink/20 text-ink/30",
                  ].join(" ")}
                >
                  {i < stepIndex ? "✓" : i + 1}
                </span>
                <span
                  className={[
                    "text-xs whitespace-nowrap",
                    i <= stepIndex ? "text-forest font-medium" : "text-ink/30",
                  ].join(" ")}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={[
                    "h-px flex-1 mx-3",
                    i < stepIndex ? "bg-forest" : "bg-line",
                  ].join(" ")}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-8 max-w-5xl">
          <div className="flex-1 rounded-lg border border-line bg-white px-8 py-8">
            {currentKey === "applicationDetails" && (
              <ApplicationDetailsStep
                data={formData.applicationDetails}
                onChange={(patch) => patchSection("applicationDetails", patch)}
              />
            )}
            {currentKey === "establishment" && (
              <EstablishmentInfoStep
                data={formData.establishment}
                onChange={(patch) => patchSection("establishment", patch)}
              />
            )}
            {currentKey === "product" && (
              <ProductInfoStep
                data={formData.product}
                onChange={(patch) => patchSection("product", patch)}
              />
            )}
            {currentKey === "parties" && (
              <InvolvedPartiesStep
                data={formData.parties}
                onChange={(patch) => patchSection("parties", patch)}
              />
            )}
            {currentKey === "documents" && (
              <DocumentsStep
                data={formData.documents}
                onChange={(patch) => patchSection("documents", patch)}
              />
            )}
            {currentKey === "summary" && <SummaryStep formData={formData} />}

            <div className="flex justify-between mt-8 pt-6 border-t border-line">
              <button
                type="button"
                onClick={goBack}
                className="rounded-md border border-line text-ink/70 hover:bg-ink/5 font-medium px-5 py-2.5 transition-colors text-sm"
              >
                Back
              </button>
              {currentKey === "summary" ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="rounded-md bg-forest hover:bg-forest-light text-paper font-medium px-5 py-2.5 transition-colors text-sm"
                >
                  Submit Application
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canGoNext()}
                  className="rounded-md bg-forest hover:bg-forest-light disabled:opacity-50 text-paper font-medium px-5 py-2.5 transition-colors text-sm"
                >
                  Next
                </button>
              )}
            </div>
          </div>

          <aside className="w-64 shrink-0 rounded-lg border border-line bg-white px-5 py-5 h-fit">
            <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-3">
              Estimated Payment
            </p>
            {hasVariation ? (
              <>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink/60">Filing Fee</span>
                    <span className="text-ink">{currency(FEES.filing)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink/60">Variation Fee</span>
                    <span className="text-ink">{currency(FEES.variation)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink/60">Legal Research Fee</span>
                    <span className="text-ink">
                      {currency(FEES.legalResearch)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between mt-3 pt-3 border-t border-line text-sm font-semibold">
                  <span className="text-ink">Total</span>
                  <span className="text-ink">{currency(total)}</span>
                </div>
              </>
            ) : (
              <p className="text-xs text-ink/40">
                Select a variation type to see the estimated fees.
              </p>
            )}
            <p className="text-[10px] text-ink/30 mt-3">
              Estimate only. Final amount will be confirmed upon evaluation.
            </p>
            {refNumber && (
              <p className="text-[10px] text-ink/30 mt-4 pt-3 border-t border-line">
                Appointment Ref. {refNumber}
              </p>
            )}
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}
