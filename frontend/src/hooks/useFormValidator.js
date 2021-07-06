import React, { useCallback } from "react";

function useFormValidator() {
  const [inputValues, setInputValues] = React.useState({});
  const [errorMessages, setErrorMessages] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  function handleInputChange(e) {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
    setErrorMessages({
      ...errorMessages,
      [e.target.name]: e.target.validationMessage,
    });
    
    setIsValid(e.target.closest(".forms").checkValidity());
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setInputValues(newValues);
      setErrorMessages(newErrors);
      setIsValid(newIsValid);
    },
    [setInputValues, setErrorMessages, setIsValid]
  )

  return { inputValues, errorMessages, isValid, handleInputChange, resetForm };

}

export default useFormValidator;
