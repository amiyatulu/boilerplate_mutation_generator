import React, { Component} from "react"
import * as Yup from "yup"
import { gql, useMutation } from "@apollo/client"
import { Formik, Form, Field } from "formik"
import { useHistory } from "react-router-dom"
import {FocusError, SubmittingWheel} from "../commons/MutationCommon"

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


function CreateFeedbackForm(props) {
    const [createFeedbackCall, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_FEEDBACK)
    // const [count, setCount] = useState(0);
    let history = useHistory();

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
             name: Yup.string().required("name is required"),
             affiliation: Yup.string().required("affiliation is required"),
             idea: Yup.string().required("idea is required"),
             ideaRating: Yup.number().required("ideaRating is required"),
             criticism: Yup.string().required("criticism is required"),
            
          })}
          onSubmit={async (values, actions) => {
              //values.countvariable = count
              const data = await createFeedbackCall({ variables: values })
              actions.setSubmitting(false)
              // console.log(data)
              history.push(`/thankyou${data.mutationoutputname}`)
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
              
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Submit Form
                </button>
                
              </div>
              <SubmittingWheel isValid={isValid} isSubmitting={isSubmitting} mutationLoading={mutationLoading}/>
              <FocusError />
             </Form>
         )}
        </Formik>
    )
}

function CreateFeedbackAvrit() {
  return (
    <React.Fragment>
    <CreateFeedbackForm />
    </React.Fragment>
  )
}


export default CreateFeedbackAvrit
export {CreateFeedbackForm}
