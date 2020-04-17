import React from "react"
import ReactDOM from "react-dom"
import { HashRouter } from "react-router-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { ApolloProvider } from "@apollo/client"
import client from "./services/appoloclient"

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
