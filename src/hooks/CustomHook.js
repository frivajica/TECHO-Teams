import React from "react";

export const CustomHook = () => {
  const [value, setValue] = React.useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return { value, onChange };
};
