import React from "react";
import { OptionProps, StylesConfig } from "react-select";

export const colourStyles: StylesConfig = {
  control: (styles: any, state) => ({
    ...styles,
    backgroundColor: "white",
    fontFamily: "Inter",
    fontSize: "12px",
    boxShadow: "none",
    transition: "all 200ms",
    border: state.isFocused ? "1px solid #00D09C" : "1px solid #d1d5db",
    "&:hover": !state.isFocused
      ? {
          border: "1px solid #9ca3af",
        }
      : {},
  }),
};

export const CustomOption: React.FC<OptionProps> = ({
  innerProps,
  data,
  isFocused,
  isSelected,
  isDisabled,
}) => {
  return !isDisabled ? (
    <div
      {...innerProps}
      className={`px-3 py-2 flex text-sm font-medium text-gray-500 cursor-pointer ${
        isFocused &&
        !isSelected &&
        "bg-white hover:bg-lightPrimary hover:text-primary transition-all"
      } ${isSelected && "bg-hoverColor text-darkPrimary"}`}
    >
      <p>{(data as any).label}</p>
    </div>
  ) : null;
};
