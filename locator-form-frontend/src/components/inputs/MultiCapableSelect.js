import React from "react";
import Select from "react-select";

// interface Option {
//   label: string;
//   value: string;
// }

// interface CustomSelectProps extends FieldProps {
//   options: OptionsType<Option>;
//   isMulti?: boolean;
//   className?: string;
//   placeholder?: string;
// }

export const MultiCapableSelect = ({
  field,
  form: { setFieldValue },
  options,
  placeholder,
  isMulti = false,
  isSearchable = false,
  ...props
}) => {
  const onChange = (option) => {
    if (option == null) {
      setFieldValue(
        field.name,
        []
      )
    } else {
      setFieldValue(
        field.name,
        isMulti
          ? (option).map((item) => item.value)
          : (option).value
    );
    }
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(option => field.value.indexOf(option.value) >= 0)
        : options.find(option => option.value === field.value);
    } else {
      return isMulti ? [] : ("");
    }
  };

  return (
    <Select
        {...field}
        {...props}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isSearchable={isSearchable}
      onBlur={(e) => {
        e.target.name = field.name;
        field.onBlur(e);
      }}
      isMulti={isMulti}
    />
  );
};

export default MultiCapableSelect;
