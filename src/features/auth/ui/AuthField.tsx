import { getInputClassName } from "../../../shared/utils/getInputClassName";

type AuthFieldProps = {
  label: string;
  type: "text" | "email" | "password";
  value: string;
  placeholder: string;
  error?: string;
  onChange: (value: string) => void;
};

export default function AuthField({
  label,
  type,
  value,
  placeholder,
  error,
  onChange,
}: AuthFieldProps) {
  return (
    <div>
      <label
        className="mb-1.5 block text-sm font-semibold"
        style={{ color: "#334155" }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={getInputClassName(Boolean(error))}
      />
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
