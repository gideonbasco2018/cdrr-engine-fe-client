// src/components/miv-n/wizard/SummaryStep.jsx
import {
  VARIATION_OPTIONS,
  DOCUMENT_REQUIREMENTS,
  SummarySection,
  SummaryRow,
} from "./shared";

export default function SummaryStep({ formData }) {
  const variationLabel = VARIATION_OPTIONS.find(
    (v) => v.id === formData.applicationDetails.variationType,
  )?.label;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-lg text-ink mb-1">Summary</h2>
        <p className="text-sm text-ink/60">
          Review your application before submitting.
        </p>
      </div>

      <SummarySection title="Application Details">
        <SummaryRow
          label="Application Type"
          value="Minor Variation-Notification (MiV-N)"
        />
        <SummaryRow
          label="Registration Number"
          value={formData.applicationDetails.registrationNumber}
        />
        <SummaryRow label="Variation" value={variationLabel} />
      </SummarySection>

      <SummarySection title="Establishment Info">
        <SummaryRow label="Company" value={formData.establishment.company} />
        <SummaryRow
          label="LTO Number"
          value={formData.establishment.ltoNumber}
        />
        <SummaryRow label="Category" value={formData.establishment.category} />
        <SummaryRow label="Address" value={formData.establishment.address} />
      </SummarySection>

      <SummarySection title="Product Info">
        <SummaryRow label="Brand Name" value={formData.product.brandName} />
        <SummaryRow label="Generic Name" value={formData.product.genericName} />
        <SummaryRow
          label="Dosage"
          value={`${formData.product.dosageStrength || ""} ${
            formData.product.dosageForm || ""
          }`.trim()}
        />
      </SummarySection>

      <SummarySection title="Involved Parties">
        {formData.parties.parties.map((p, i) => (
          <SummaryRow
            key={p.id}
            label={p.role || `Party ${i + 1}`}
            value={p.name}
          />
        ))}
      </SummarySection>

      <SummarySection title="Documents">
        {DOCUMENT_REQUIREMENTS.map((req) => {
          const files = formData.documents[req.id] || [];
          if (files.length === 0) return null;
          return (
            <SummaryRow
              key={req.id}
              label={req.label}
              value={`${files.length} file${files.length > 1 ? "s" : ""}`}
            />
          );
        })}
      </SummarySection>
    </div>
  );
}
