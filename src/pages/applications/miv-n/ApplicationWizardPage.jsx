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
} from "../../../components/miv-n/WizardSteps";
import {
  REQUIREMENTS_BY_VARIATION,
  DOCUMENT_REQUIREMENTS,
} from "../../../components/miv-n/wizard/shared";
const STEPS = [
  { key: "applicationDetails", label: "Application Details" },
  { key: "establishment", label: "Establishment Info" },
  { key: "product", label: "Product Info" },
  { key: "parties", label: "Involved Parties" },
  { key: "documents", label: "Documents" },
  { key: "summary", label: "Summary" },
];

function initialFormData() {
  return {
    applicationDetails: {
      registrationNumber: "",
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
      parties: [],
      attested: false,
    },
    documents: {
      variationTypes: [],
      requirementFiles: {},
    },
  };
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
      return Boolean(
        formData.applicationDetails.registrationNumber &&
        formData.applicationDetails.agreedTerms,
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
    if (currentKey === "documents") {
      const { variationTypes, requirementFiles } = formData.documents;

      const allAdminRequirementsUploaded = DOCUMENT_REQUIREMENTS.filter(
        (req) => req.required,
      ).every((req) => (formData.documents[req.id] || []).length > 0);

      const allTechnicalRequirementsUploaded = (variationTypes || []).every(
        (vId) =>
          (REQUIREMENTS_BY_VARIATION[vId] || []).every(
            (req) => (requirementFiles?.[req.id] || []).length > 0,
          ),
      );

      return (
        allAdminRequirementsUploaded &&
        (variationTypes || []).length > 0 &&
        allTechnicalRequirementsUploaded
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
      <div className="px-7 py-6">
        <h1 className="font-display text-lg text-ink mb-4">Application</h1>

        <div className="flex items-center mb-5 max-w-3xl">
          {STEPS.map((step, i) => (
            <div
              key={step.key}
              className="flex items-center flex-1 last:flex-none"
            >
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={[
                    "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0",
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
                    "text-[11px] whitespace-nowrap",
                    i <= stepIndex ? "text-forest font-medium" : "text-ink/30",
                  ].join(" ")}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={[
                    "h-px flex-1 mx-2",
                    i < stepIndex ? "bg-forest" : "bg-line",
                  ].join(" ")}
                />
              )}
            </div>
          ))}
        </div>

        <div>
          <div className="rounded-lg border border-line bg-white px-6 py-5">
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

            <div className="flex justify-between mt-5 pt-4 border-t border-line">
              <button
                type="button"
                onClick={goBack}
                className="rounded-md border border-line text-ink/70 hover:bg-ink/5 font-medium px-4 py-2 transition-colors text-xs"
              >
                Back
              </button>
              {currentKey === "summary" ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="rounded-md bg-forest hover:bg-forest-light text-paper font-medium px-4 py-2 transition-colors text-xs"
                >
                  Submit Application
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canGoNext()}
                  className="rounded-md bg-forest hover:bg-forest-light disabled:opacity-50 text-paper font-medium px-4 py-2 transition-colors text-xs"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
