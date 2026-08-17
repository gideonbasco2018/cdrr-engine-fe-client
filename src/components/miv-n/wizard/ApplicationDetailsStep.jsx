// src/components/miv-n/wizard/ApplicationDetailsStep.jsx
import { VARIATION_OPTIONS, Field, inputClass } from "./shared";

export default function ApplicationDetailsStep({ data, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-lg text-ink mb-1">Application Type</h2>
        <p className="text-sm text-ink/60 mb-3">
          Select the type of application you&apos;re filing.
        </p>
        <div className="rounded-md border border-forest/40 bg-forest/[0.03] px-4 py-3 flex items-center gap-3">
          <span className="w-4 h-4 rounded-full border-[5px] border-forest shrink-0" />
          <div>
            <p className="text-sm font-semibold text-ink">
              Minor Variation-Notification (MiV-N)
            </p>
            <p className="text-xs text-ink/60">
              Modify details of an existing product registration.
            </p>
          </div>
        </div>
      </div>

      <Field label="Registration Number">
        <input
          type="text"
          className={inputClass}
          placeholder="e.g. DR-XY12345"
          value={data.registrationNumber}
          onChange={(e) => onChange({ registrationNumber: e.target.value })}
        />
      </Field>

      <div>
        <h3 className="text-sm font-medium text-ink/80 mb-1">Variation</h3>
        <p className="text-xs text-ink/50 mb-3">
          Select what&apos;s being varied on this registration.
        </p>
        <div className="space-y-2">
          {VARIATION_OPTIONS.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-3 rounded-md border border-line px-4 py-3 cursor-pointer hover:border-forest/40 transition-colors"
            >
              <input
                type="radio"
                name="variationType"
                checked={data.variationType === opt.id}
                onChange={() => onChange({ variationType: opt.id })}
              />
              <span className="text-sm text-ink">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-ink/80 mb-2">
          Terms and Conditions
        </h3>
        <div className="rounded-md border border-line bg-paper px-4 py-3 h-28 overflow-y-auto text-xs text-ink/60 space-y-2">
          <p>
            1. By filing this application, you certify that you are an
            authorized representative of the establishment named in this form,
            and that you have the authority to submit this application on its
            behalf.
          </p>
          <p>
            2. All information, statements, and documents submitted as part of
            this application must be true, complete, and accurate. Submitting
            false or misleading information may result in the denial,
            suspension, or revocation of the related registration, and may
            expose the applicant to administrative, civil, or criminal
            liability.
          </p>
          <p>
            3. Processing times are estimates only and may vary depending on the
            completeness of the submitted requirements, the volume of
            applications on file, and applicable evaluation procedures.
          </p>
        </div>
        <label className="flex items-center gap-2 mt-3 text-sm text-ink/70">
          <input
            type="checkbox"
            checked={data.agreedTerms}
            onChange={(e) => onChange({ agreedTerms: e.target.checked })}
          />
          I have read and agree with the above terms and conditions.
        </label>
      </div>
    </div>
  );
}
