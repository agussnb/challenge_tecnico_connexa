import { Controller } from "react-hook-form";

export const TaskInputSelect = ({ name, control, label, options, error, texts }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <select
            id={name}
            {...field}
            value={field.value || ""}
            className={`form-control ${error ? "is-invalid" : ""}`}
          >
            <option value="">{texts.selectOption}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
      />
      {error && <p className="error">{error.message}</p>}
    </div>
  );
};
