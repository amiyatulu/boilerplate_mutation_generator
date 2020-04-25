import React, { Component } from "react";
import { gql, useQuery } from '@apollo/client';


const GENERIC_PROFILE_QUERY = gql`
query{
  genericProfile{
    affiliation
    summary
    experience    
  }
}
`

const divStyle = {
   whiteSpace: 'pre-line'
}

function ProfileDetails() {
    const { loading, error, data } = useQuery(GENERIC_PROFILE_QUERY);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
            // return error.graphQLErrors.map(({ message }, i) =>
            //   message === "ProfileDetails matching query does not exist." ? (
            //     <div className="container" key="noprofile">
            //       <br />
            //       <div className="alert alert-danger">Profile Details does not exist.</div>
            //       <div>
            //         <Link className="btn btn-success" to="/createprofile">
            //           Create Profile
            //         </Link>
            //       </div>
            //     </div>
            //   ) : (
            //     <div className="container">
            //       <span key={i}>{message}</span>
            //     </div>
            //   )
            // )
    return (
        <React.Fragment>
        
         <div>
            <li className="list-group-item">
             <h4>Title0</h4>
            </li>
            <li className="list-group-item" style={divStyle}>{data.__}</li>
        </div>
        <br />
        
         <div>
            <li className="list-group-item">
             <h4>Title1</h4>
            </li>
            <li className="list-group-item" style={divStyle}>{data.__}</li>
        </div>
        <br />
        
         <div>
            <li className="list-group-item">
             <h4>Title2</h4>
            </li>
            <li className="list-group-item" style={divStyle}>{data.__}</li>
        </div>
        <br />
        
        </React.Fragment>
        
    )
}
