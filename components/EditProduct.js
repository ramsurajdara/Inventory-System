import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Prompt, useLocation, useHistory } from "react-router";

export default function EditProduct() {
    let location = useLocation();
    let history = useHistory();
    const error_style = {
        color: "red"
    };

    //console.log(location);

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
            .required('OS is required')
    });

    const saveProduct = (values) => {
        const axios = require('axios');
        //console.log(values)
        if(window.confirm("Are you sure to save the new details?")) {
            axios.put('http://localhost:8000/products/'+location.params.id, {
                "productName": values.productName,
                "description": values.description,
                "manufacturer": values.manufacturer,
                "price": values.price,
                "processor": values.processor,
                "os": values.os,
                "views": location.params.views,
                "image": values.url
            }).then(resp => {
                alert("Product is saved");
                history.goBack();
            }).catch(error => {
                alert(error + ": Product is not saved");
            });
        }
    }      
    return (
        <div> 
            <Formik
                initialValues = {{
                    productName: location.params.productName,
                    description: location.params.description,
                    manufacturer: location.params.manufacturer,
                    price: location.params.price,
                    processor: location.params.processor,
                    os: location.params.os,
                    url: location.params.image
                }}

                validationSchema = {ProductSchema}

                onSubmit = {(values) => {
                    saveProduct(values);
                }}
            >
                {({ values }) => (
                <Form>
                    <Prompt 
                        when = {!values.productName || !values.description || !values.manufacturer
                        || !values.os || !values.processor || !values.price }
                        message="You have unsaved changes, are you sure you want to leave?"
                    />
                    <div class="form-group">
                        <h3>Edit Product</h3>
                        <div class="col-lg-4">
                            <label>Product Name:</label><br/>
                            <Field class="form-control" type = "text" name = "productName"/> 
                            <span style = {error_style}><ErrorMessage name = "productName"/></span><br/>
                        </div>

                        <div class="col-lg-4">
                            <label>Description</label><br/>
                            <Field class="form-control" component = "textarea" cols = {23} name = "description"/> 
                            <span style = {error_style}><ErrorMessage name = "description" /></span><br/>
                        </div>

                        <div class="col-lg-4">
                            <label>Manufactuer:</label><br/>
                            <Field class="form-control" type = "text" name = "manufacturer" />
                            <span style = {error_style}><ErrorMessage name = "manufacturer" /></span><br/>
                        </div>    

                        <div class="col-lg-4">
                            <label>Price:</label><br/>
                            <Field class="form-control" type = "number" name = "price" min = "1"/>
                            <span style = {error_style}><ErrorMessage name = "price" /></span><br/>
                        </div>

                        <div class="col-lg-4">
                            <label>Processor:</label><br/>
                            <Field class="form-control" type = "text" name = "processor" />
                            <span style = {error_style}><ErrorMessage name = "processor" /></span><br/>
                        </div>

                        <div class="col-lg-4">
                            <label>OS:</label><br/>
                            <Field class="form-control" type = "text" name = "os" />
                            <span style = {error_style}><ErrorMessage name = "os" /></span><br/>
                        </div>
                        <div class="col-lg-4">
                            <label>Image URL:</label><br/>
                            <Field class="form-control" type = "text" name = "url" />
                            <span style = {error_style}><ErrorMessage name = "url" /></span><br/> 
                        </div>
                        <button class="btn btn-success" type = "submit">Save Product</button>
                    </div>
                </Form>
                    
                )}
            </Formik>
            
        </div>
    )
}
