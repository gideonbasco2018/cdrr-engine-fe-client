// src/components/miv-n/wizard/ProductInfoStep.jsx
import { Field, inputClass, SelfAssessment } from "./shared";

export default function ProductInfoStep({ data, onChange }) {
  const set = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-lg text-ink mb-1">Product Info</h2>
        <p className="text-sm text-ink/60">
          Details of the product covered by this application.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Brand Name">
          <input
            className={inputClass}
            placeholder="e.g. Biogesic"
            value={data.brandName}
            onChange={set("brandName")}
          />
        </Field>
        <Field label="Generic Name">
          <input
            className={inputClass}
            placeholder="e.g. Paracetamol"
            value={data.genericName}
            onChange={set("genericName")}
          />
        </Field>
        <Field label="Dosage Strength">
          <input
            className={inputClass}
            placeholder="e.g. 500mg"
            value={data.dosageStrength}
            onChange={set("dosageStrength")}
          />
        </Field>
        <Field label="Dosage Form">
          <input
            className={inputClass}
            placeholder="e.g. Tablet"
            value={data.dosageForm}
            onChange={set("dosageForm")}
          />
        </Field>
        <Field label="Classification">
          <input
            className={inputClass}
            placeholder="e.g. OTC, Rx"
            value={data.classification}
            onChange={set("classification")}
          />
        </Field>
        <Field label="Shelf Life">
          <input
            className={inputClass}
            placeholder="e.g. 24 months"
            value={data.shelfLife}
            onChange={set("shelfLife")}
          />
        </Field>
        <Field label="Storage Condition">
          <input
            className={inputClass}
            placeholder="e.g. Store below 30°C"
            value={data.storageCondition}
            onChange={set("storageCondition")}
          />
        </Field>
        <Field label="Packaging">
          <input
            className={inputClass}
            placeholder="e.g. Blister pack of 10"
            value={data.packaging}
            onChange={set("packaging")}
          />
        </Field>
      </div>

      <Field label="Suggested Retail Price">
        <input
          className={inputClass}
          placeholder="e.g. 150.00"
          value={data.srp}
          onChange={set("srp")}
        />
      </Field>

      <SelfAssessment
        checked={data.attested}
        onChange={(v) => onChange({ ...data, attested: v })}
      />
    </div>
  );
}
