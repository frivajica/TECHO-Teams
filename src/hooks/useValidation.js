import { useState } from "react";
 
export const useValidation = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
console.log("form",form)
  const handleChanges = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    handleChanges(e);
    setErrors(validateForm(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));

 
  };

  return {
    form,
    errors,
    loading,
    response,
    handleChanges,
    handleBlur,
    handleSubmit,
  };
};
