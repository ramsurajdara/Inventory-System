import React, {useState, useContext} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Redirect } from "react-router"
import {UserContext} from './UserContext';

export default function Login()  {
    const [auth, setAuth] = useContext(UserContext)
    const [flag, setFlag] = useState(auth);
    
    const error_style = {
        color: "red"
    };
    const UserSchema = Yup.object().shape({
        userName: Yup.string()
            .required('User Name is required'),
        password: Yup.string()
            .required('Password is required'),
    });

    if(flag == true) {
        return <Redirect to="/" />
    }
    return (

            <div class="d-flex align-items-center flex-column justify-content-center h-100" >
                <Formik
                initialValues = {{
                    userName : "",
                    password : ""
                }}

                validationSchema = {UserSchema}

                onSubmit = {(values, {resetForm}) => {
                    const axios = require('axios');
                    axios.get('http://localhost:8000/users/'+values.userName)
                    .then(resp => {
                        if(resp.data.password == values.password) {
                            alert("Login Successful");
                            setFlag(true);
                            window.sessionStorage.setItem("flag", true);
                            window.sessionStorage.setItem("user", values.userName);
                            setAuth({"flag": true, "user": values.userName})
                            resetForm(); 
                        }
                        else {
                            alert("Incorrect Password")
                        }

                    })
                    .catch(err => {
                        alert("Email ID Not Found");
                        resetForm();
                    });
                    
                }}
                >
                    <Form>
                        <div class="center">
                            <h3 class="display-4">Login</h3>

                            <Field class="form-control" class = "form-control form-control-lg" type = "text" placeholder="Enter Email ID" name = "userName"/> 
                            <span style = {error_style}><ErrorMessage name = "userName"/></span><br/>

                            <Field class="form-control" class = "form-control form-control-lg" type = "password" placeholder="Enter Password" name = "password"/> 
                            <span style = {error_style}><ErrorMessage name = "password" /></span><br/>

                            <button class="btn btn-primary" type = "submit">Login</button>

                        </div>
                    </Form>
                    
                </Formik>
            </div>
    );
}