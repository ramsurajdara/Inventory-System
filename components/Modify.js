import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

function Modify() {

    const [products, setProducts] = useState([]);
    const [checkedBoxes, setCheckedBoxes] = useState([]);
    const [dummy, setDummy] = useState(false);
    useEffect(()=>{
        getProducts();
      }, [dummy]);                
      
    const getProducts  = async () => {
        const response = await fetch(`http://localhost:8000/products`);
        const data = await response.json();
        setProducts(data);   
        setDummy(false);
        setCheckedBoxes(Object.fromEntries(data.map(d => [d.id, false ])))
    }  

    function deleteProduct(id) {
        if(window.confirm("Do you really want to delete product")){
            const axios = require('axios')
            axios.delete('http://localhost:8000/products/'+id) 
            alert("Product is deleted")
            setDummy(true);   
        }
    }

    function deleteSelected() {
        if(window.confirm("Do you really want to delete selected products")){
            const axios = require('axios')
            for (var key in checkedBoxes) {
                if (checkedBoxes[key] === true) {
                    axios.delete('http://localhost:8000/products/' + key) 
                    setTimeout(2000)
                }
            }
            alert("Products are deleted")
            setCheckedBoxes([])
            setDummy(true);   
        }
    }

    function setCheckBox(e) {
        let newCheckedBoxes =  checkedBoxes;
        newCheckedBoxes[e.target.value] = !newCheckedBoxes[e.target.value];
        setCheckedBoxes(newCheckedBoxes)
    }

    return (
        <div class = "table-responsive">
            <button onClick = {deleteSelected} class="btn btn-danger">Delete Selected</button>
            <table class="table w-auto ">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Product Name</th>
                        {/* <th scope="col">Manufacturer</th> */}
                        {/* <th scope="col">Edit</th> */}
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (    
                        <tr>
                            <th scope="row">
                                <input key = {product.id} type = "checkbox" autoComplete = "off" defaultChecked = {checkedBoxes[product.id]} onChange = {setCheckBox} value ={product.id}/>
                            </th>
                            <td>{product.id}</td>
                            <td>{product.productName}</td>
                            {/* <td>{product.manufacturer}</td> */}
                            {/* <td>
                                <Link to={{pathname: "/edit-product/" + product.id + "/" + product.productName,
                                params: product}} class = "btn btn-warning" >Edit</Link>
                            </td> */}
                            <td>                    
                                <button onClick = {() => {deleteProduct(product.id)}} type="button" class="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))} 
                </tbody>
            </table>
        </div>
    )
}

export default Modify
