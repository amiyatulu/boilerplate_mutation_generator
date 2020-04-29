import React, { Component } from 'react'
import axios from 'axios'
import { apiUrl } from "../services/config"
export default class SignOut extends Component {
    componentDidMount() {
        axios.get(apiUrl + '/delcookie', {withCredentials: true}).then(res => {
            window.location="/"
        })
    }  
    render() {
        return (
            <div>
              <p>You have successfully sign out.</p>  
            </div>
        )
    }
}
