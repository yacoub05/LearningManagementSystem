import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import validate from './validate'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderQuiz = ({ quizes, meta: { touched, error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => quizes.push({})}>Add Quiz</button>
      {touched && error && <span>{error}</span>}
    </li>
    {quizes.map((quiz, index) =>
      <li key={index}>
        <button
          type="button"
          title="Remove Question"
          onClick={() => quizes.remove(index)}/>
        <h4>Question #{index + 1}</h4>
        <Field
          name={`${quiz}.question`}
          type="text"
          component={renderField}
          label="Question"/>
        <Field
          name={`${quiz}.answer`}
          type="text"
          component={renderField}
          label="Answer"/>
        <FieldArray name={`${quiz}.answer_choices`} component={renderChoices}/>
      </li>
    )}
  </ul>
)

const renderChoices = ({ quizes, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => quizes.push()}>Add Choice</button>
    </li>
    {quizes.map((choice, index) =>
      <li key={index}>
        <button
          type="button"
          title="Remove Choice"
          onClick={() => quizes.remove(index)}/>
        <Field
          name={choice}
          type="text"
          component={renderField}
          label={`Choice #${index + 1}`}/>
      </li>
    )}
    {error && <li className="error">{error}</li>}
  </ul>
)

const FieldArraysForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="title" type="text" component={renderField} label="Assignment Name"/>
      <FieldArray name="quizes" component={renderQuiz}/>
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'fieldArrays',     // a unique identifier for this form
  initialValues: {
    quizes: [{}]
  },
  validate
})(FieldArraysForm)