import React, { Component, useEffect} from "react"
import * as Yup from "yup"
import { gql, useMutation } from '@apollo/client'
import { Formik, Form, Field, useFormikContext} from "formik"
import { withRouter } from "react-router"

const CREATE_FEEDBACK = gql`
    mutation CreateFeedback (
         $name: String
         $affiliation: String
         $idea: String 
         $ideaRating: Int
         $criticism: String 
         $challenges: String 
         $fundingWilliness: Int
        ) {
        createFeedback (
            input: {
                 name: $name
                 affiliation: $affiliation
                 idea: $idea
                 ideaRating: $ideaRating
                 criticism: $criticism
                 challenges: $challenges
                 fundingWilliness: $fundingWilliness
                 }
        ) {
            feedback {
        name
        affiliation
        idea
        ideaRating
        criticism
        challenges
        fundingWilliness
      }
        }
    }
`

const FocusError = () => {
  const { errors, isSubmitting, isValidating } = useFormikContext()

  useEffect(() => {
    if (isSubmitting && !isValidating) {
      let keys = Object.keys(errors)
      if (keys.length > 0) {
        const selector = `[for=${keys[0]}]`
        // console.log(selector)
        const errorElement = document.querySelector(selector)
        // console.log(errorElement)
        if (errorElement) {
          errorElement.scrollIntoView()
        }
      }
    }
  }, [errors, isSubmitting, isValidating])

  return null
}

function SubmittingWheel(props) {
  const isSubmitting = props.isSubmitting
  const isValid = props.isValid
  const mutationLoading = props.mutationLoading
  const error = props.error
  // console.log(isSubmitting, isValid);
  if (isSubmitting && isValid && mutationLoading ) {
    return <div><br/> Submitting... ⌛</div>
  } else {
    return <React.Fragment></React.Fragment>
  }
}

function CreateFeedbackForm(props) {
    const [createFeedbackCall, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_FEEDBACK)
    // const [count, setCount] = useState(0);

    return (
        <Formik 
          initialValues= {{
             name: "", 
             affiliation: "", 
             idea: "", 
             ideaRating: "", 
             criticism: "", 
             challenges: "", 
             fundingWilliness: "", 
             }}
          validationSchema = {Yup.object().shape({
             name: Yup.string().required("Message"),
             affiliation: Yup.string().required("Message"),
             idea: Yup.string().required("Message"),
             ideaRating: Yup.number().required("Message"),
             criticism: Yup.string().required("Message"),
             challenges: Yup.string().required("Message"),
             fundingWilliness: Yup.number().required("Message"),
            
          })}
          onSubmit={async (values, actions) => {
              //values.countvariable = count
              const data = await createFeedbackCall({ variables: values })
              actions.setSubmitting(false)
              // console.log(data)
              props.history.push(`/thankyou${data.mutationoutputname}`)
          }}        
        >
         {({ handleSubmit, handleBlur, handleChange, errors, touched, isValid, isSubmitting, values, setFieldValue, validateForm }) => (
             <Form onSubmit={handleSubmit}>
                 {mutationError && (
                    <p className="alert alert-danger">
                      {mutationError.graphQLErrors.map(({ message }, i) => (
                        <span key={i}>{message}</span>
                      ))}
                    </p>
                  )}
              
                <div className="form-group">
                <label htmlFor="name">name</label>
                {touched.name && errors.name && <p className="alert alert-danger">{errors.name}</p>}
                
                <Field name="name" className="form-control" />
                
                </div>
              
                <div className="form-group">
                <label htmlFor="affiliation">affiliation</label>
                {touched.affiliation && errors.affiliation && <p className="alert alert-danger">{errors.affiliation}</p>}
                
                <Field name="affiliation" className="form-control" />
                
                </div>
              
                <div className="form-group">
                <label htmlFor="idea">idea</label>
                {touched.idea && errors.idea && <p className="alert alert-danger">{errors.idea}</p>}
                
                <Field name="idea" component="textarea" rows="5" className="form-control" />
                
                </div>
              
                <div className="form-group">
                <label htmlFor="ideaRating">ideaRating</label>
                {touched.ideaRating && errors.ideaRating && <p className="alert alert-danger">{errors.ideaRating}</p>}
                
                <Field name="ideaRating" className="form-control" />
                
                </div>
              
                <div className="form-group">
                <label htmlFor="criticism">criticism</label>
                {touched.criticism && errors.criticism && <p className="alert alert-danger">{errors.criticism}</p>}
                
                <Field name="criticism" component="textarea" rows="5" className="form-control" />
                
                </div>
              
                <div className="form-group">
                <label htmlFor="challenges">challenges</label>
                {touched.challenges && errors.challenges && <p className="alert alert-danger">{errors.challenges}</p>}
                
                <Field name="challenges" component="textarea" rows="5" className="form-control" />
                
                </div>
              
                <div className="form-group">
                <label htmlFor="fundingWilliness">fundingWilliness</label>
                {touched.fundingWilliness && errors.fundingWilliness && <p className="alert alert-danger">{errors.fundingWilliness}</p>}
                
                <Field name="fundingWilliness" className="form-control" />
                
                </div>
              
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Submit Form
                </button>
                
              </div>
              <SubmittingWheel isValid={isValid} isSubmitting={isSubmitting}   mutationLoading={mutationLoading}/>
              <FocusError />
             </Form>
         )}
        </Formik>
    )
}

class CreateFeedbackAvrit extends Component {
  render() {
    const { history } = this.props
    return (
      <React.Fragment>
        <CreateFeedbackForm history={history} />
      </React.Fragment>
    )
  }
}

export default withRouter(CreateFeedbackAvrit)
