const validate = values => {
    const errors = {}
    if(!values.title) {
      errors.title = 'Required'
    }
    if (!values.quizes || !values.quizes.length) {
      errors.quizes = { _error: 'At least one field must be entered' }
    } else {
      const quizesArrayErrors = []
      values.quizes.forEach((quiz, quizIndex) => {
        const quizErrors = {}
        if (!quiz || !quiz.question) {
          quizErrors.question = 'Required'
          quizesArrayErrors[quizIndex] = quizErrors
        }
        if (!quiz || !quiz.answer) {
          quizErrors.answer = 'Required'
          quizesArrayErrors[quizIndex] = quizErrors
        }
        if (quiz && quiz.answer_choices && quiz.answer_choices.length) {
          const choiceArrayErrors = []
          quiz.answer_choices.forEach((choice, choiceIndex) => {
            if (!choice || !choice.length) {
              choiceArrayErrors[choiceIndex] =  'Required'
            }
          })
          if(choiceArrayErrors.length) {
            quizErrors.answer_choices = choiceArrayErrors
            quizesArrayErrors[quizIndex] = quizErrors
          }
          if (quiz.answer_choices.length > 3) {
            if(!quizErrors.answer_choices) {
              quizErrors.answer_choices = []
            }
            quizErrors.answer_choices._error = 'No more than three choices allowed'
            quizesArrayErrors[quizIndex] = quizErrors
          }
        }
      })
      if(quizesArrayErrors.length) {
        errors.quizes = quizesArrayErrors
      }
    }
    return errors
  }
  
  export default validate