import { useState } from "react";

const useForm = (inic) => {
  const [form, setForm] = useState(inic);
  const handleChange = (event, value, name) => {
    event.target?.type === "checkbox"
      ? setForm({ ...form, [name]: event.target.checked })
      : setForm({ ...form, [name]: value });
  };
  return { form, handleChange };
};

export default useForm;
