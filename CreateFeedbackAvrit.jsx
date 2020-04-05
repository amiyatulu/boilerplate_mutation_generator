import React, { Component } from "react"
import * as Yup from "yup"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { Formik, Form, Field } from "formik"
import { withRouter } from "react-router"

const CREATE_FEEDBACK = gql`
    mutation CreateFeedback (
         $name: String
         $affiliation: String
         $idea: String 
         $ideaRating: Int
         $criticism: String 
        ) {
        createFeedback (
            input: {
                 name: $name
                 affiliation: $affiliation
                 idea: $idea
                 ideaRating: $ideaRating
                 criticism: $criticism
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

function SubmittingWheel(props) {
  const isSubmitting = props.isSubmitting
  const isValid = props.isValid
  const error = props.error
  // console.log(isSubmitting, isValid);
  if (isSubmitting && isValid) {
    return <div>Submitting...</div>
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
             }}
          validationSchema = {Yup.object().shape({
             $name: Yup.string().required("Message"),
             $affiliation: Yup.string().required("Message"),
             $idea: Yup.string().required("Message"),
             $ideaRating: Yup.number().required("Message"),
             $criticism: Yup.string().required("Message"),
            
          })}
          onSubmit={(values, actions) => {
              //values.countvariable = count
              const promise = createFeedbackCall({ variables: values })
              promise.then(function(data){
                  actions.setSubmitting(false)
                  // console.log(data)
                  props.history.push(`/thankyou${data.data.mutationoutputname}`)
              })
          }}        
        >
         {({ handleSubmit, handleBlur, handleChange, errors, touched, isValid, isSubmitting, values, setFieldValue }) => (
             <Form onSubmit={handleSubmit}>
              
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
              
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Submit Form
                </button>
                <SubmittingWheel />
              </div>
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
