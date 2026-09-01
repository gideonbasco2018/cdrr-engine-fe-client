// src/components/miv-n/wizard/DocumentsStep.jsx
import {
  DOCUMENT_REQUIREMENTS,
  VARIATION_OPTIONS,
  REQUIREMENTS_BY_VARIATION,
} from "./shared";

export default function DocumentsStep({ data, onChange }) {
  function handleFiles(reqId, fileList) {
    const files = Array.from(fileList).filter(
      (f) => f.type === "application/pdf",
    );
    onChange({
      ...data,
      [reqId]: [...(data[reqId] || []), ...files],
    });
  }

  function removeFile(reqId, fileName) {
    onChange({
      ...data,
      [reqId]: (data[reqId] || []).filter((f) => f.name !== fileName),
    });
  }

  function toggleVariation(id) {
    const current = data.variationTypes || [];
    const next = current.includes(id)
      ? current.filter((v) => v !== id)
      : [...current, id];
    onChange({ ...data, variationTypes: next });
  }

  function handleRequirementFiles(reqId, fileList) {
    const incoming = Array.from(fileList).filter(
      (f) => f.type === "application/pdf",
    );
    if (incoming.length === 0) return;
    const existing = data.requirementFiles?.[reqId] || [];
    onChange({
      ...data,
      requirementFiles: {
        ...(data.requirementFiles || {}),
        [reqId]: [...existing, ...incoming],
      },
    });
  }

  function removeRequirementFile(reqId, fileName) {
    const existing = data.requirementFiles?.[reqId] || [];
    onChange({
      ...data,
      requirementFiles: {
        ...(data.requirementFiles || {}),
        [reqId]: existing.filter((f) => f.name !== fileName),
      },
    });
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="font-display text-lg text-ink mb-1">
            Administrative Requirements
          </h2>
          <p className="text-sm text-ink/60 mb-2">
            Upload the required supporting documents for this application. PDF
            files only — you may upload multiple files per requirement.
          </p>

          <div className="divide-y divide-line rounded-md border border-line">
            {DOCUMENT_REQUIREMENTS.map((req) => {
              const files = data[req.id] || [];
              return (
                <div key={req.id} className="px-4 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <p
                      className={`text-sm ${
                        req.required ? "text-red-600" : "text-forest/80"
                      }`}
                    >
                      {req.label} {req.required && <span>*</span>}
                    </p>
                    <label className="shrink-0 cursor-pointer rounded-md border border-line px-3 py-1.5 text-xs font-medium text-ink/70 hover:bg-ink/5 transition-colors">
                      Upload Files
                      <input
                        type="file"
                        accept="application/pdf"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFiles(req.id, e.target.files)}
                      />
                    </label>
                  </div>
                  {files.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {files.map((f) => (
                        <li
                          key={f.name}
                          className="flex items-center justify-between text-xs text-ink/60 bg-paper rounded px-2 py-1"
                        >
                          <span className="truncate">{f.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(req.id, f.name)}
                            className="text-red-500 hover:text-red-600 ml-2"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg text-ink mb-1">
            Technical Requirements
          </h2>
          <p className="text-sm text-ink/60 mb-2">
            Select what&apos;s being varied on this registration. You may select
            more than one.
          </p>
          <div className="space-y-2">
            {VARIATION_OPTIONS.map((opt) => {
              const checked = (data.variationTypes || []).includes(opt.id);
              const requirements = REQUIREMENTS_BY_VARIATION[opt.id] || [];
              return (
                <div
                  key={opt.id}
                  className={[
                    "rounded-md border transition-colors",
                    checked
                      ? "border-forest/50 bg-forest/[0.03]"
                      : "border-line",
                  ].join(" ")}
                >
                  <label className="flex items-start gap-2 px-4 py-3 cursor-pointer hover:border-forest/40">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleVariation(opt.id)}
                      className="mt-0.5"
                    />
                    <span className="text-sm text-ink">
                      <span className="font-medium">{opt.id}</span> —{" "}
                      {opt.label}
                    </span>
                  </label>

                  {checked && (
                    <div className="px-4 pb-4 pl-11 space-y-2">
                      <p className="text-xs font-semibold text-ink/60 uppercase tracking-wide mb-1">
                        Requirements to be Submitted
                      </p>
                      {requirements.length === 0 && (
                        <p className="text-xs text-ink/40 italic">
                          Requirements not yet configured for this variation.
                        </p>
                      )}
                      {requirements.map((req) => {
                        const files = data.requirementFiles?.[req.id] || [];
                        const hasFiles = files.length > 0;
                        return (
                          <div
                            key={req.id}
                            className={[
                              "rounded-md border bg-white px-4 py-3",
                              hasFiles ? "border-line" : "border-red-200",
                            ].join(" ")}
                          >
                            <div className="flex items-center justify-between gap-4 mb-1.5">
                              <p className="text-sm text-ink/70">
                                {req.label}{" "}
                                <span className="text-red-500">*</span>
                              </p>
                              <label className="shrink-0 cursor-pointer rounded-md border border-line px-3 py-1.5 text-xs font-medium text-ink/70 hover:bg-ink/5 transition-colors">
                                {hasFiles ? "Add More" : "Upload Files"}
                                <input
                                  type="file"
                                  accept="application/pdf"
                                  multiple
                                  className="hidden"
                                  onChange={(e) => {
                                    handleRequirementFiles(
                                      req.id,
                                      e.target.files,
                                    );
                                    e.target.value = "";
                                  }}
                                />
                              </label>
                            </div>

                            {hasFiles ? (
                              <ul className="space-y-1">
                                {files.map((f) => (
                                  <li
                                    key={f.name}
                                    className="flex items-center justify-between text-xs text-ink/60 bg-paper rounded px-2 py-1"
                                  >
                                    <span className="truncate">{f.name}</span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        removeRequirementFile(req.id, f.name)
                                      }
                                      className="text-red-500 hover:text-red-600 ml-2"
                                    >
                                      Remove
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-xs text-red-400">
                                No file chosen
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
