// Core
import React from 'react';
import styled from 'styled-components';
import { reduxForm, Field } from 'redux-form';
// Components
import TextError from '../../common/Errors/errorForm.jsx';

const LabelS = styled.div`
  opacity: 0.3;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: left;
  color: #4a4a4a;
  margin-bottom: 0.5rem;
  font-family: Qanelas;
`;
const Fieldwrap = styled.div`margin: 0 auto 1.5rem auto;`;
const InputS = styled.input`
  width: 100%;
  border-bottom: solid 0.1rem #cccccc;
  border-top: none;
  border-left: none;
  border-right: none;
  font-family: Qanelas;
  font-size: 1.6rem;
  font-weight: 500;
  text-align: left;
  color: #000000;
  padding-bottom: 0.5rem;

  &:hover {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;
const ButtonS = styled.button`
  background-color: transparent;
  border: solid 0.1rem #000000;
  border-radius: 2.3rem;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -0rem;
  text-align: left;
  color: #4a4a4a;
  padding: 1rem 2rem;
  font-family: Qanelas;
  margin-top: ${props => (props.error ? '1rem' : '2.5rem')};
  transition: background-color 0.5s ease;
  &:hover {
    background-color: #f5f5f5;
    outline: none;
  }
  &:focus {
    background-color: #f5f5f5;
    outline: none;
  }
`;
const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};
const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <Fieldwrap>
    <LabelS>{label}</LabelS>
    <div>
      <InputS {...input} placeholder={label} type={type} />
      {touched && error && <p>{error}</p>}
    </div>
  </Fieldwrap>
);

@reduxForm({ form: 'login', validate })
export default class FormLogin extends React.Component {
  render() {
    const { handleSubmit, error } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name='_username'
          type='text'
          component={renderField}
          label='Email'
        />
        <Field
          name='_password'
          type='password'
          component={renderField}
          label='Password'
        />
        {error && <TextError text={error} />}

        <ButtonS type='submit' error={error}>
          Login
        </ButtonS>
      </form>
    );
  }
}
