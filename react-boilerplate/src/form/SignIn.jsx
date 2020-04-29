import React, { Component } from "react"
import * as Yup from "yup"
import { gql, useMutation, useApolloClient } from "@apollo/client"
import { Formik, Form, Field } from "formik"
import { useHistory } from "react-router-dom"
import { FocusError, SubmittingWheel } from "../commons/MutationCommon"
import {ME_QUERY} from "../services/MeQuery"

const LOGIN_MUTATION = gql`
  mutation TokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`

function SignIn() {
  const [tokenAuthCall, { loading: mutationLoading, error: mutationError }] = useMutation(LOGIN_MUTATION, {
    refetchQueries: [ { query: ME_QUERY }], awaitRefetchQueries: true,
  })
  // const [count, setCount] = useState(0);
  let history = useHistory();

  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Not a valid email")
          .required("Email field is required"),
        password: Yup.string()
          .min(5)
          .required("Password field is required")
      })}
      onSubmit={async (values, actions) => {
        //values.countvariable = count
        const data = await tokenAuthCall({ variables: values })
        actions.setSubmitting(false)
        // console.log(data)
        history.push(`/others`)
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
            <label htmlFor="email">Email</label>
            {touched.email && errors.email && <p className="alert alert-danger">{errors.email}</p>}

            <Field name="email" className="form-control" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            {touched.password && errors.password && <p className="alert alert-danger">{errors.password}</p>}

            <Field name="password" type="password" className="form-control" />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </div>
          <SubmittingWheel isValid={isValid} isSubmitting={isSubmitting} mutationLoading={mutationLoading} />
          <FocusError />
        </Form>
      )}
    </Formik>
  )
}



export default SignIn

