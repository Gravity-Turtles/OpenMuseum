import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default class Test extends Component{


    render(){
        return(
            <form id        =  "uploadForm"
                 enctype   =  "multipart/form-data"
                 action    =  "/api/photo"
                 method    =  "post"
            >
                <input type="file" name="userPhoto" />
                <input type="submit" value="Upload Image" name="submit">
            </form>
        )

    }
}