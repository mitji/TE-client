// this hoc is going to be used in all different forms to validate the inputs
// and to give feedback to user so that he/she knows what to write and what inputs
// are required
import React from 'react';
import useForm from 'react-hook-form';


const withValidation = WrappedComponent => {

  return (props) => {
    const { register, handleSubmit, errors} = useForm();

    return <WrappedComponent register={register} handleSubmit={handleSubmit} errors={errors} {...props}/>;
  };

}

export {withValidation};