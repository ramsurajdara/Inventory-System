import React, {useEffect, useState} from 'react'
import {useContext} from 'react';
import {UserContext} from './UserContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Prompt } from "react-router";

export default function Profile() {
    const [dummy, setDummy] = useState(false);

    const [auth, setAuth] = useContext(UserContext)
    const [user, setUser] = useState({})

    useEffect(() => {
        getUser(); 
    }, [dummy])

    function getUser() {
        const axios = require('axios');
        axios.get("http://localhost:8000/users/" + auth.user)
        .then(res => {
            setUser(res.data);
        })
        setDummy(true)
    }

    function saveDetails(values) {
        //console.log(values);
        const axios = require('axios');
        axios.put('http://localhost:8000/users/'+user.id, {
            firstName: values.firstName,
            lastName: values.lastName,
            location: values.location,
            mobileNo: values.mobileNo,
            password: user.password
        }).then(resp => {
            alert("User Details are saved");
        }).catch(error => {
            alert(error + ": User Details are not saved");
        });
    }
    const error_style = {
        color: "red"
    };
    const phoneRegExp = /^[789]\d{9}$/

    const UserSchema = Yup.object().shape({
        userName: Yup.string()
            .required('User Name is required'),
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        location: Yup.string()
            .required('Location is required'),
        mobileNo: Yup.string().matches(phoneRegExp, 'Mobile number is not valid')
            .required('Mobile Number is required'),
    });
    return (
        <div>
            
            <Formik
                enableReinitialize={true}
                initialValues = {{
                    userName: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    location: user.location,
                    mobileNo: user.mobileNo
                }}

                validationSchema = {UserSchema}

                onSubmit = {(values) => {
                    saveDetails(values)
                }}
            >
                {({ values }) => (
                <Form>
                    <h3 class="display-4">Profile</h3>
                    <Prompt 
                        when = {!values.userName || !values.firstName || !values.lastName
                        || !values.location || !values.mobileNo }
                        message="You have unsaved changes, are you sure you want to leave?"
                    />
                    <div class="form-group">
                        <div class="col-lg-4">
                            <label>User ID/ Email ID:</label><br/>
                            <Field class="form-control" type = "text" name = "userName" disabled="disabled"/> 
                            <span style = {error_style}><ErrorMessage name = "userName"/></span><br/>
                        </div>     
                        <div class="col-lg-4">
                            <label>First name:</label><br/>
                            <Field class="form-control" type = "text" cols = {23} name = "firstName"/> 
                            <span style = {error_style}><ErrorMessage name = "firstName" /></span><br/>
                        </div>     
                        <div class="col-lg-4"> 
                            <label>Last name:</label><br/>
                            <Field class="form-control" type = "text" name = "lastName" />
                            <span style = {error_style}><ErrorMessage name = "lastName" /></span><br/>
                        </div>

                        <div class="col-lg-4">
                            <label>Location:</label><br/>
                            <Field class="form-control" type = "text" name = "location" min = "1"/>
                            <span style = {error_style}><ErrorMessage name = "location" /></span><br/>
                        </div>

                        <div class="col-lg-4">
                            <label>Mobile Number:</label><br/> 
                            <Field class="form-control" type = "text" name = "mobileNo" />
                            <span style = {error_style}><ErrorMessage name = "mobileNo" /></span><br/>
                        </div>

                        {/* <div class="col-lg-4">
                            <label>New Password:</label><br/>   
                            <Field class="form-control" type = "text" name = "password" />
                            <span style = {error_style}><ErrorMessage name = "password" /></span><br/> 
                        </div> */}
                        <div class="col-lg-4">        
                            <button class="btn btn-success" type = "submit">Save Details</button>
                        </div>
                    </div>
                </Form>
                    
                )}
            </Formik>
        </div>
    )
}
