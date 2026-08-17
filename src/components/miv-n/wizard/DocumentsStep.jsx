// src/components/miv-n/wizard/DocumentsStep.jsx
import { DOCUMENT_REQUIREMENTS, inputClass } from "./shared";

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

  const additional = data.additionalDocuments || [];

  function addAdditionalDoc() {
    onChange({
      ...data,
      additionalDocuments: [
        ...additional,
        { id: crypto.randomUUID(), label: "", files: [] },
      ],
    });
  }

  function updateAdditionalLabel(id, label) {
    onChange({
      ...data,
      additionalDocuments: additional.map((d) =>
        d.id === id ? { ...d, label } : d,
      ),
    });
  }

  function handleAdditionalFiles(id, fileList) {
    const files = Array.from(fileList).filter(
      (f) => f.type === "application/pdf",
    );
    onChange({
      ...data,
      additionalDocuments: additional.map((d) =>
        d.id === id ? { ...d, files: [...d.files, ...files] } : d,
      ),
    });
  }

  function removeAdditionalDoc(id) {
    onChange({
      ...data,
      additionalDocuments: additional.filter((d) => d.id !== id),
    });
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-lg text-ink mb-1">
          Documentary Requirements
        </h2>
        <p className="text-sm text-ink/60">
          Upload the required supporting documents for this application. PDF
          files only — you may upload multiple files per requirement.
        </p>
      </div>

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

      <div>
        <p className="text-sm font-medium text-ink/80 mb-2">
          Additional Documents
        </p>
        <div className="space-y-3">
          {additional.map((doc) => (
            <div
              key={doc.id}
              className="rounded-md border border-line px-4 py-3 space-y-2"
            >
              <div className="flex items-center gap-2">
                <input
                  className={inputClass}
                  placeholder="Document label"
                  value={doc.label}
                  onChange={(e) =>
                    updateAdditionalLabel(doc.id, e.target.value)
                  }
                />
                <label className="shrink-0 cursor-pointer rounded-md border border-line px-3 py-2 text-xs font-medium text-ink/70 hover:bg-ink/5 transition-colors">
                  Upload Files
                  <input
                    type="file"
                    accept="application/pdf"
                    multiple
                    className="hidden"
                    onChange={(e) =>
                      handleAdditionalFiles(doc.id, e.target.files)
                    }
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeAdditionalDoc(doc.id)}
                  className="text-xs text-red-500 hover:text-red-600 shrink-0"
                >
                  Remove
                </button>
              </div>
              {doc.files.length > 0 && (
                <ul className="space-y-1">
                  {doc.files.map((f) => (
                    <li key={f.name} className="text-xs text-ink/60">
                      {f.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addAdditionalDoc}
          className="mt-3 rounded-md border border-forest/40 text-forest text-sm font-medium px-4 py-2 hover:bg-forest/5 transition-colors"
        >
          + Add Additional Document
        </button>
      </div>
    </div>
  );
}
