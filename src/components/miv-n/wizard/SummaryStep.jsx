// src/components/miv-n/wizard/SummaryStep.jsx
import { useEffect, useState } from "react";
import {
  VARIATION_OPTIONS,
  REQUIREMENTS_BY_VARIATION,
  DOCUMENT_REQUIREMENTS,
  SummarySection,
} from "./shared";

function Row({ label, value }) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-3 py-1 text-sm">
      <span className="text-ink/50">{label}</span>
      <span className="text-ink">{value || "—"}</span>
    </div>
  );
}

function FilePreviewModal({ file, onClose }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!file) {
      setUrl(null);
      return undefined;
    }
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!file || !url) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/60 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-3xl h-[85vh] flex flex-col overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-line shrink-0">
          <p className="text-sm font-medium text-ink truncate pr-4">
            {file.name}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md border border-line px-3 py-1.5 text-xs font-medium text-ink/70 hover:bg-ink/5 transition-colors"
          >
            Close
          </button>
        </div>
        <iframe src={url} title={file.name} className="flex-1 w-full" />
      </div>
    </div>
  );
}

function RequirementRow({ label, required, files, onPreview }) {
  const hasFiles = files.length > 0;
  return (
    <div className="px-4 py-3">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm text-ink/70">
          {label} {required && <span className="text-red-500">*</span>}
        </p>
        {!hasFiles && (
          <span className="shrink-0 text-xs font-medium text-red-500">
            Missing
          </span>
        )}
      </div>
      {hasFiles && (
        <ul className="mt-2 space-y-1">
          {files.map((f) => (
            <li
              key={f.name}
              className="flex items-center justify-between gap-2 text-xs text-ink/60 bg-paper rounded px-2 py-1.5"
            >
              <span className="truncate">{f.name}</span>
              <button
                type="button"
                onClick={() => onPreview(f)}
                className="shrink-0 text-forest hover:text-forest-light font-medium"
              >
                Preview
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function SummaryStep({ formData }) {
  const [previewFile, setPreviewFile] = useState(null);

  const variationTypes = formData.documents.variationTypes || [];
  const requirementFiles = formData.documents.requirementFiles || {};
  const parties = formData.parties.parties || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-lg text-ink mb-1">Summary</h2>
        <p className="text-sm text-ink/60">
          Review your application before submitting.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <SummarySection title="Application Details">
            <Row
              label="Application Type"
              value="Minor Variation-Notification (MiV-N)"
            />
            <Row
              label="Registration Number"
              value={formData.applicationDetails.registrationNumber}
            />
          </SummarySection>

          <SummarySection title="Establishment Info">
            <Row label="Company" value={formData.establishment.company} />
            <Row label="LTO Number" value={formData.establishment.ltoNumber} />
            <Row label="Category" value={formData.establishment.category} />
            <Row label="TIN" value={formData.establishment.tin} />
            <Row label="Address" value={formData.establishment.address} />
            <Row label="Email" value={formData.establishment.email} />
            <Row label="Contact No." value={formData.establishment.contact} />
            <Row
              label="LTO Validity"
              value={formData.establishment.ltoValidity}
            />
          </SummarySection>
        </div>

        <div className="space-y-6">
          <SummarySection title="Product Info">
            <Row label="Brand Name" value={formData.product.brandName} />
            <Row label="Generic Name" value={formData.product.genericName} />
            <Row
              label="Dosage"
              value={`${formData.product.dosageStrength || ""} ${
                formData.product.dosageForm || ""
              }`.trim()}
            />
            <Row
              label="Classification"
              value={formData.product.classification}
            />
            <Row label="Shelf Life" value={formData.product.shelfLife} />
            <Row
              label="Storage Condition"
              value={formData.product.storageCondition}
            />
            <Row label="Packaging" value={formData.product.packaging} />
            <Row label="Suggested Retail Price" value={formData.product.srp} />
          </SummarySection>

          <div>
            <p className="text-sm font-semibold text-ink mb-2">
              Involved Parties
            </p>
            {parties.length === 0 ? (
              <p className="text-sm text-ink/40 italic">No parties added.</p>
            ) : (
              <div className="rounded-md border border-line divide-y divide-line">
                {parties.map((p) => (
                  <div key={p.id} className="px-4 py-3">
                    <p className="text-sm text-forest font-medium mb-1.5">
                      {p.role}
                    </p>
                    <Row label="Name" value={p.name} />
                    <Row label="Country" value={p.country} />
                    <Row label="Address" value={p.address} />
                    <Row label="TIN" value={p.tin} />
                    <Row label="LTO Number" value={p.ltoNumber} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-semibold text-ink mb-2">
            Administrative Requirements
          </p>
          <div className="divide-y divide-line rounded-md border border-line">
            {DOCUMENT_REQUIREMENTS.map((req) => (
              <RequirementRow
                key={req.id}
                label={req.label}
                required={req.required}
                files={formData.documents[req.id] || []}
                onPreview={setPreviewFile}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink mb-2">
            Technical Requirements
          </p>
          {variationTypes.length === 0 ? (
            <p className="text-sm text-ink/40 italic">No variation selected.</p>
          ) : (
            <div className="space-y-3">
              {variationTypes.map((vId) => {
                const variation = VARIATION_OPTIONS.find((v) => v.id === vId);
                const requirements = REQUIREMENTS_BY_VARIATION[vId] || [];
                return (
                  <div
                    key={vId}
                    className="rounded-md border border-line overflow-hidden"
                  >
                    <div className="px-4 py-2.5 bg-paper border-b border-line">
                      <p className="text-sm font-medium text-ink">
                        <span className="text-forest">{vId}</span> —{" "}
                        {variation?.label}
                      </p>
                    </div>
                    <div className="divide-y divide-line">
                      {requirements.length === 0 ? (
                        <p className="px-4 py-3 text-xs text-ink/40 italic">
                          Requirements not yet configured for this variation.
                        </p>
                      ) : (
                        requirements.map((req) => (
                          <RequirementRow
                            key={req.id}
                            label={req.label}
                            required
                            files={requirementFiles[req.id] || []}
                            onPreview={setPreviewFile}
                          />
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <FilePreviewModal
        file={previewFile}
        onClose={() => setPreviewFile(null)}
      />
    </div>
  );
}
