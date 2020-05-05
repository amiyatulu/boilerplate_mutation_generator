import React, { Component } from "react"
import { gql, useQuery } from '@apollo/client'
// import { Link } from "react-router-dom"
// import styles from "./Details.module.css"



const ARTICLE_LIST_QUERY = gql`
query {
  biohelikonManuscript {
    edges {
      node {
        id
        title
        abstract
        authors     
      }
    }
  }
}
`

const preStyle = {
   whiteSpace: 'pre-line'
}

function ArticleListViewView() {
    const { loading, error, data } = useQuery(ARTICLE_LIST_QUERY);
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
        
        <div className={`card`}>
            <div className="card-body">
              <h4 className="card-title">Title0</h4>
              <hr />
              <p className="card-text" style={preStyle}>
                {data.genericProfile.{data.__}}
              </p>
            </div>
        </div>
        <br />
        
        <div className={`card`}>
            <div className="card-body">
              <h4 className="card-title">Title1</h4>
              <hr />
              <p className="card-text" style={preStyle}>
                {data.genericProfile.{data.__}}
              </p>
            </div>
        </div>
        <br />
        
        <div className={`card`}>
            <div className="card-body">
              <h4 className="card-title">Title2</h4>
              <hr />
              <p className="card-text" style={preStyle}>
                {data.genericProfile.{data.__}}
              </p>
            </div>
        </div>
        <br />
        
        </React.Fragment>        
    )

  // return (
  //   <React.Fragment>
  //     <div className="container">
  //       <br />
  //       {data.QUERYNAME.edges.map((item) => {
  //         return (
  //           <React.Fragment key={item.node.id}>
  //             <div className={`card ${styles.cardstyle}`}>
  //               <div className="card-body">
  //                 <h4 className="card-title">{item.node.___}</h4>
  //                 <p className="card-text">{item.node.__}</p>
  //                 <hr />
  //                 <p className="card-text" dangerouslySetInnerHTML={{ __html: item.node.___ }} />
  //               </div>
  //             </div>
  //             <br />
  //           </React.Fragment>
  //         )
  //       })}
  //     </div>
  //   </React.Fragment>
  // )
}

function ArticleListView() {
    return (
        <React.Fragment>
            <ArticleListViewView />
        </React.Fragment>
    )
}

export default ArticleListView
export {ArticleListViewView}
