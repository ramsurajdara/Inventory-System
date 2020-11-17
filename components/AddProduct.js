import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Prompt } from "react-router";

export default function AddProduct() {
    
    const error_style = {
        color: "red"
    };

    const ProductSchema = Yup.object().shape({
        productName: Yup.string()
            .required('Product Name is required'),
        description: Yup.string()
            .required('Description is required'),
        price: Yup.number()
            .required('Price is required'),
        manufacturer: Yup.string()
            .required('Manufacturer is required'),
        processor: Yup.string()
            .required('Processor is required'),
        os: Yup.string()
            .required('OS is required'),
        url: Yup.string()
            .required('Image URL is required')
    });
    const addProduct = (values) => {
        if(window.confirm("Are you sure to add the new product?")) {
            const axios = require('axios');
            axios.post('http://localhost:8000/products', {
                "productName": values.productName,
                "description": values.description,
                "manufacturer": values.manufacturer,
                "price": values.price,
                "processor": values.processor,
                "os": values.os,
                "views": 0,
                "image": values.url
            }).then(resp => {
                alert("Product is Added");
            }).catch(error => {
                alert(error + ": Product not added");
            });
        }
    }      
    return (
        <div> 
            <Formik
                initialValues = {{
                    productName: '',
                    description: '',
                    manufacturer: '',
                    price: '',
                    processor: '',
                    os: '',
                    url: ''
                }}

                validationSchema = {ProductSchema}

                onSubmit = {(values, {resetForm}) => {
                    addProduct(values);
                    resetForm();
                }}
            >
                {({ values }) => (
                <Form>
                    <Prompt 
                        when = {!values.productName || !values.description || !values.manufacturer
                        || !values.os || !values.processor || !values.price }
                        message="You have unsaved changes, are you sure you want to leave?"
                    />
                    <div class="col-sm-12 col-md-12 col-lg-4 center">
                        <h3>Add Product</h3>
                        <Field class="form-control" type = "text" placeholder="Enter Product Name" name = "productName"/> 
                        <span style = {error_style}><ErrorMessage name = "productName"/></span><br/>
                        
                        <Field class="form-control" component = "textarea" cols = {23} placeholder="Enter Product Details" name = "description"/> 
                        <span style = {error_style}><ErrorMessage name = "description" /></span><br/>

                        <Field class="form-control" type = "text" placeholder="Enter Manufacturer" name = "manufacturer" />
                        <span style = {error_style}><ErrorMessage name = "manufacturer" /></span><br/>

                        <Field class="form-control" type = "number" placeholder="Enter Price" name = "price" min = "1"/>
                        <span style = {error_style}><ErrorMessage name = "price" /></span><br/>

                        <Field class="form-control" type = "text" placeholder="Enter Processor" name = "processor" />
                        <span style = {error_style}><ErrorMessage name = "processor" /></span><br/>

                        <Field class="form-control" type = "text" placeholder="Enter OS Name" name = "os" />
                        <span style = {error_style}><ErrorMessage name = "os" /></span><br/>

                        <Field class="form-control" type = "text" placeholder="Enter Image URL" name = "url" />
                        <span style = {error_style}><ErrorMessage name = "url" /></span><br/> 

                        <button class="btn btn-primary" type = "submit">Add Product</button>
                    </div>
                </Form>
                    
                )}
            </Formik>
            
        </div>
    )
}
