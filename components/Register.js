import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Prompt, useHistory, withRouter } from "react-router";

function Register() {
    let history = useHistory();

    function saveDetails(values) {
        //console.log(values);
        const axios = require('axios');
        axios.get('http://localhost:8000/users/' + values.userName)
        .then(res=> {
            alert("User already exists with same email ID")
            }
        )
        .catch(err => {
            axios.post('http://localhost:8000/users/', {
                id: values.userName,
                firstName: values.firstName,
                lastName: values.lastName,
                location: values.location,
                mobileNo: values.mobileNo,
                password: values.password
            }).then(resp => {
                alert("User is registered");
                history.push("/login");
            }).catch(error => {
                alert(error + ": User is not registered");
            });
        })

        
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
        password: Yup.string()
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .required('Password is required'),
    });
    return (
        <div>
            <h3 class="display-4">Register</h3>
            <Formik
                enableReinitialize={true}
                initialValues = {{
                    userName: "",
                    firstName: "",
                    lastName: "",
                    location: "",
                    mobileNo: "",
                    password: ""
                }}

                validationSchema = {UserSchema}

                onSubmit = {(values) => {
                    saveDetails(values)
                }}
            >
                {({ values }) => (
                <Form class="form-horizontal">
                    <Prompt 
                        when = {!values.userName || !values.firstName || !values.lastName
                        || !values.location || !values.mobileNo }
                        message="You have unsaved changes, are you sure you want to leave?"
                    />
                    <div class="form-group">
                        <div class="col-lg-4">
                            <label>User ID/ Email ID:</label><br/>
                            <Field class="form-control" type = "text" name = "userName"/> 
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

                        <div class="col-lg-4">
                            <label>Password:</label><br/>   
                            <Field class="form-control" type = "text" name = "password" />
                            <span style = {error_style}><ErrorMessage name = "password" /></span><br/> 
                        </div>

                        <div class="col-lg-4">        
                            <button class="btn btn-success" type = "submit">Register</button>
                        </div>
                    </div>
                </Form>
                    
                )}
            </Formik>
        </div>
    )
}

export default withRouter(Register);