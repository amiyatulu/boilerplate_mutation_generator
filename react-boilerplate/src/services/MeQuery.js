import React, { Component } from "react"
import { gql, useQuery } from "@apollo/client"

const ME_QUERY = gql`
  query {
    me {
      email
      name
    }
  }
`

function MeQuery() {
  const { loading, error, data } = useQuery(ME_QUERY)
  let value
  if (loading) return "Loading..."
  if (error) {
    value = false
  }
  value = data
  return value
}

export default MeQuery
export {ME_QUERY}