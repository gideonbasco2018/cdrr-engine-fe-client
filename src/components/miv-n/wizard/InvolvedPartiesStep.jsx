// src/components/miv-n/wizard/InvolvedPartiesStep.jsx
import { useState } from "react";
import { PARTY_ROLES, Field, inputClass, SelfAssessment } from "./shared";
import CountrySelect from "./CountrySelect";

function emptyDraft() {
  return {
    role: "",
    name: "",
    country: "",
    address: "",
    tin: "",
    ltoNumber: "",
  };
}

export default function InvolvedPartiesStep({ data, onChange }) {
  const [draft, setDraft] = useState(emptyDraft());

  const canAdd = draft.role && draft.name && draft.country && draft.address;

  function setField(field, value) {
    setDraft((prev) => ({ ...prev, [field]: value }));
  }

  function addParty() {
    if (!canAdd) return;
    onChange({
      ...data,
      parties: [...data.parties, { id: crypto.randomUUID(), ...draft }],
    });
    setDraft(emptyDraft());
  }

  function removeParty(id) {
    onChange({
      ...data,
      parties: data.parties.filter((p) => p.id !== id),
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-lg text-ink mb-1">
          Company Particulars
        </h2>
        <p className="text-sm text-ink/60">
          Add the Manufacturer, and — if applicable — Trader, Importer,
          Distributor, and Packer/Repacker involved in this application.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <Field label="Role" required>
            <select
              className={inputClass}
              value={draft.role}
              onChange={(e) => setField("role", e.target.value)}
            >
              <option value="">Select role</option>
              {PARTY_ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Name" required>
            <input
              className={inputClass}
              placeholder="Registered company name"
              value={draft.name}
              onChange={(e) => setField("name", e.target.value)}
            />
          </Field>
          <Field label="Country" required>
            <CountrySelect
              value={draft.country}
              onChange={(v) => setField("country", v)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Address" required>
            <input
              className={inputClass}
              placeholder="Complete address"
              value={draft.address}
              onChange={(e) => setField("address", e.target.value)}
            />
          </Field>
          <Field label="TIN">
            <input
              className={inputClass}
              placeholder="000-000-000-000"
              value={draft.tin}
              onChange={(e) => setField("tin", e.target.value)}
            />
          </Field>
          <Field label="LTO Number">
            <input
              className={inputClass}
              placeholder="e.g. LTO-2026-000123"
              value={draft.ltoNumber}
              onChange={(e) => setField("ltoNumber", e.target.value)}
            />
          </Field>
        </div>

        <button
          type="button"
          onClick={addParty}
          disabled={!canAdd}
          className="rounded-md bg-forest hover:bg-forest-light disabled:opacity-50 disabled:cursor-not-allowed text-cream font-medium px-4 py-2.5 text-sm transition-colors"
        >
          + Add Party
        </button>
      </div>

      {data.parties.length > 0 && (
        <div className="overflow-x-auto rounded-md border border-line">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr className="bg-paper border-b border-line text-left">
                <th className="px-3 py-2 text-xs font-semibold text-ink/50 uppercase tracking-wide">
                  Role
                </th>
                <th className="px-3 py-2 text-xs font-semibold text-ink/50 uppercase tracking-wide">
                  Name
                </th>
                <th className="px-3 py-2 text-xs font-semibold text-ink/50 uppercase tracking-wide">
                  Address
                </th>
                <th className="px-3 py-2 text-xs font-semibold text-ink/50 uppercase tracking-wide">
                  TIN
                </th>
                <th className="px-3 py-2 text-xs font-semibold text-ink/50 uppercase tracking-wide">
                  LTO Number
                </th>
                <th className="px-3 py-2 text-xs font-semibold text-ink/50 uppercase tracking-wide">
                  Country
                </th>
                <th className="px-3 py-2 w-24" />
              </tr>
            </thead>
            <tbody>
              {data.parties.map((party) => (
                <tr
                  key={party.id}
                  className="border-b border-line last:border-b-0"
                >
                  <td className="px-3 py-3 text-sm text-forest font-medium">
                    {party.role}
                  </td>
                  <td className="px-3 py-3 text-sm text-ink">{party.name}</td>
                  <td className="px-3 py-3 text-sm text-ink">
                    {party.address}
                  </td>
                  <td className="px-3 py-3 text-sm text-ink">
                    {party.tin || "—"}
                  </td>
                  <td className="px-3 py-3 text-sm text-ink">
                    {party.ltoNumber || "—"}
                  </td>
                  <td className="px-3 py-3 text-sm text-ink">
                    {party.country}
                  </td>
                  <td className="px-3 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => removeParty(party.id)}
                      className="rounded-md border border-line px-3 py-1 text-xs font-medium text-ink/70 hover:bg-ink/5 transition-colors"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <SelfAssessment
        checked={data.attested}
        onChange={(v) => onChange({ ...data, attested: v })}
      />
    </div>
  );
}
