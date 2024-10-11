import React from "react";
import { IconType } from "react-icons";

interface ButtonI {
  key?: string | number;
  selected?: boolean; // Optional: default to false for simple usage
  label: string | number; // Optional: button label
  onClick?: () => void; // Optional: default no-op function
  Icon?: IconType;
}

const Button = ({ key, selected = false, label = "", onClick = () => {}, Icon }: ButtonI) => {
  const base_style = "flex items-center gap-2 px-4 py-2 font-bold transition-all hover:-translate-y-1 hover:cursor-pointer";

  // Conditional styles based on the selected state
  const button_style = selected
    ? `${base_style} bg-green-500 text-white hover:bg-white hover:text-red-600`
    : `${base_style} bg-red-600 text-white hover:bg-white hover:text-red-600`;

  return (
    <button key={key} className={button_style} onClick={onClick}>
      {Icon && <Icon size={23} />}
      {label}
    </button>
  );
};

export default Button;
