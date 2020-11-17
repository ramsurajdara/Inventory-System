import React , {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import axios from 'axios';

export default function ProductDetails() {

    const params = useParams();
    const [product, setProduct] = useState([]);
    
    useEffect(()=>{
       axios.get("http://localhost:8000/products/" + params.id)
        .then(res => {
            const product = res.data;
            const new_product = {...product, views: product.views+1}
            setProduct(new_product)
            axios.put("http://localhost:8000/products/" + params.id, new_product)
        })
      }, []);

    return (
        <div class="d-flex align-items-center flex-column justify-content-center h-100" >
            <h3 class="display-4">{product.productName}</h3>
            <div class="col-sm-6 col-md-4 col-lg-3 border">
                <b>Description:</b> {product.description} <br/>
                <b>Price:</b> Rs {product.price} /-<br/>
                <b>OS:</b> {product.os} <br/>
                <b>Manufacturer:</b> {product.manufacturer}<br/>
                <b>Processor:</b> {product.processor} <br/>
            </div>
        </div>
       
    )
}