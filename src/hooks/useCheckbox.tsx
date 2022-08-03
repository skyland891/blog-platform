import { useState } from "react";

export const useCheckbox = (initialValue: boolean) => {
  const [checked, setChecked] = useState(initialValue);

  const onChange = () => {
    setChecked(!checked);
  };
  return {
    checked,
    onChange,
  };
};
