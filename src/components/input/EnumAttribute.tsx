import React from "react";

export interface EnumAttributeProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const EnumAttribute: React.FC<EnumAttributeProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
