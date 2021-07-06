import React from 'react';

const Sign = (props) => {
return (
    <form className='form forms' noValidate onSubmit={props.onSubmit}>
        <h2 className='form__title'>{props.title}</h2>
        {props.children}
        <button  type='submit' className={(props.isLoading || !props.isValid) ? "form__button-submit form__button-submit_disabled" : "form__button-submit"}>{props.buttonText}</button>
        {props.link && props.link}
    </form>
)
}

export default Sign;