import { useState } from "react";

const useForm = (inic) => {
  const [form, setForm] = useState(inic);

  const handleChange = (event, id) => {
    if (id) {
      setForm({ ...form, id: id });
    } else {
      event.target.type === "checkbox"
        ? setForm({ ...form, [event.target.name]: event.target.checked })
        : setForm({ ...form, [event.target.name]: event.target.value });
    };
  };
  
  return { form, handleChange };
};

export default useForm;
