import React, { Suspense, lazy, Component }  from "react"
import { Route, Switch } from "react-router-dom"
const CreateFeedbackAvrit = lazy(() => import("./form/CreateFeedbackAvrit"))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="container">
      <h3>Hello World</h3>
      <Switch>
        <Route path="/" exact component={CreateFeedbackAvrit} />
      </Switch>
    </div>
    </Suspense>
  )
}

export default App
