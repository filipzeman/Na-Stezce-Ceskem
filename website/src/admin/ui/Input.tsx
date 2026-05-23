import type {
  InputHTMLAttributes,
} from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;

  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label">
          {label}
        </label>
      )}

      <input
        className={`
          input
          ${error ? "error" : ""}
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="input-error">
          {error}
        </p>
      )}
    </div>
  );
}