import { useState, useRef } from "react";

const useForm = (inic) => {
  const [form, setForm] = useState(inic);
  const handleChange = (event, value, name) => {
    event.target?.type === "checkbox"
      ? setForm({ ...form, [name]: event.target.checked })
      : setForm({ ...form, [name]: value });
  };
  console.log("FORM", form);

  return { form, handleChange };
};

export default useForm;
