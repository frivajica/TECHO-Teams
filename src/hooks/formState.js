import { useState } from "react";

const useForm = inic => {
    const [form, setForm] = useState(inic);
    
    const handleChange = (event)=>{
        setForm({...form, [event.target.name]: event.target.value});
    }

    return {form, handleChange}
};

export default useForm;