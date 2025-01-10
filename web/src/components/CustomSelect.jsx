import React from "react";
import Select from "react-select";

const CustomSelect = ({
  className,
  placeholder,
  field,
  options,
  isMulti = false,
  onChange,
}) => {
  const getValue = () => {
    if (options) {
      if (isMulti) {
        const selectedValues = Array.isArray(field.value)
          ? field.value
          : field.value?.split(", ").map((val) => val.trim()) || [];
        return options.filter((option) =>
          selectedValues.includes(option.value)
        );
      } else {
        return options.find((option) => option.value === field.value);
      }
    } else {
      return isMulti ? [] : "";
    }
  };

  const handleChange = (selectedOptions) => {
    const selectedValues = isMulti
      ? selectedOptions.map((option) => option.value)
      : selectedOptions?.value;
    onChange(selectedValues);
  };

  return (
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      onChange={handleChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
    />
  );
};

export default CustomSelect;
