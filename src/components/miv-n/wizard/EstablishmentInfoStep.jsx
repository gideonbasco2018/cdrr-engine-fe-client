// src/components/miv-n/wizard/EstablishmentInfoStep.jsx
import {
  ESTABLISHMENT_CATEGORIES,
  Field,
  inputClass,
  SelfAssessment,
} from "./shared";

export default function EstablishmentInfoStep({ data, onChange }) {
  const set = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-lg text-ink mb-1">
          Establishment Info
        </h2>
        <p className="text-sm text-ink/60">
          License to Operate (LTO) details for this establishment.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="LTO Number">
          <input
            className={inputClass}
            placeholder="e.g. LTO-2026-000123"
            value={data.ltoNumber}
            onChange={set("ltoNumber")}
          />
        </Field>
        <Field label="Establishment Category">
          <select
            className={inputClass}
            value={data.category}
            onChange={set("category")}
          >
            <option value="">Select category</option>
            {ESTABLISHMENT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Company">
          <input
            className={inputClass}
            placeholder="Registered company name"
            value={data.company}
            onChange={set("company")}
          />
        </Field>
        <Field label="TIN">
          <input
            className={inputClass}
            placeholder="000-000-000-000"
            value={data.tin}
            onChange={set("tin")}
          />
        </Field>
      </div>

      <Field label="Address">
        <input
          className={inputClass}
          placeholder="Complete establishment address"
          value={data.address}
          onChange={set("address")}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Email">
          <input
            type="email"
            className={inputClass}
            placeholder="company@example.com"
            value={data.email}
            onChange={set("email")}
          />
        </Field>
        <Field label="Contact No.">
          <input
            className={inputClass}
            placeholder="09XX XXX XXXX"
            value={data.contact}
            onChange={set("contact")}
          />
        </Field>
      </div>

      <Field label="LTO Validity">
        <input
          type="date"
          className={inputClass}
          value={data.ltoValidity}
          onChange={set("ltoValidity")}
        />
      </Field>

      <SelfAssessment
        checked={data.attested}
        onChange={(v) => onChange({ ...data, attested: v })}
      />
    </div>
  );
}
