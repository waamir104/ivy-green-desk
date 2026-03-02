import React from "react";

type ScheduleColorInputProps = {
  value: string;
  onChange: (hex: string) => void;
  "aria-label"?: string;
  className?: string;
};

/**
 * Color input that looks like a dark pill with a circular swatch (no dropdown arrow).
 * The native color picker opens when clicking anywhere on the control.
 */
export const ScheduleColorInput: React.FC<ScheduleColorInputProps> = ({
  value,
  onChange,
  "aria-label": ariaLabel = "Choose color",
  className = "",
}) => (
  <div className={`schedule-color-input ${className}`.trim()}>
    <span
      className="schedule-color-input__swatch"
      style={{ backgroundColor: value }}
      aria-hidden
    />
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="schedule-color-input__native"
      aria-label={ariaLabel}
      title={value}
    />
  </div>
);
