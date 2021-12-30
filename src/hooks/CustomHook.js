import React from "react";

export const CustomHook = (initialState) => {
  const [value, setValue] = React.useState(initialState);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return { value, onChange, setValue };
};
