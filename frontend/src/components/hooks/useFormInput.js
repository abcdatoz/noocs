import {useState} from 'react'

const useFormInput = (initialValue, the, name) =>{
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }

    return {
        value,
        name,
        onChange: handleChange,
        className: "form-control",
        type:"text",
        placeholder:"Introduzca " + the + " " + name  
    }
}

export default useFormInput;