import React, { Suspense, lazy, Component } from "react"
import { Route, Switch } from "react-router-dom"
import Nav from "./Nav/Nav"
import SignIn from "./form/SignIn"
import SignOut from "./form/SignOut"
const CreateFeedbackAvrit = lazy(() => import("./form/CreateFeedbackAvrit"))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Nav />
      <div className="container">
        <h3>Hello World</h3>
        <Switch>
          <Route path="/" exact component={CreateFeedbackAvrit} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signout" component={SignOut} />
        </Switch>
      </div>
    </Suspense>
  )
}

export default App
