import React, {useEffect, useState} from 'react'
import Product from './Product'

export default function ProductList() {

    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState(['']);
    const [cb, setCb] = useState({"cbs" : {"os": true, "manufacturer": true, "processor": true}})
    useEffect(()=>{
        getProducts();
      }, [query, cb]);
      
    const getProducts  = async () => {
        const response = await fetch(`http://localhost:8000/products?q=${query}`);
        const data = await response.json();
        setProducts(data);
    }  
    
    const getSearch = e => {
        e.preventDefault();
        setQuery(e.target.elements.searchquery.value);
    }

    function setCheckBox(e) {
        e.persist();
        setCb(prevState => {
            let cbs = Object.assign({}, prevState.cbs);
            console.log(cbs)
            cbs[e.target.value]= !prevState.cbs[e.target.value];
            return { cbs };
          });
    }
    return (
        <div class = "products-list">
            <div class = "search-form" style = {{"margin": "20px"}}>
                <form onSubmit={getSearch} class="form-inline my-2 my-lg-0 justify-content-center">
                    <input class="form-control mr-sm-2" type="text" name = "searchquery" placeholder = "Search for anything"/>
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
            <div class = "customization form-inline justify-content-center">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" defaultChecked = {cb.cbs["os"]} onChange = {setCheckBox} value="os" />
                    <label class="form-check-label">OS</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" defaultChecked = {cb.cbs["manufacturer"]} onChange = {setCheckBox} value="manufacturer"/>
                    <label class="form-check-label">Manufacturer</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" defaultChecked = {cb.cbs["processor"]} onChange = {setCheckBox} value="processor"/>
                    <label class="form-check-label">Processor</label>
                </div>
            </div>
            <div class="row">
                {products.map(product => (
                
                <Product 
                    {...product} cb = {cb}
                />))}    
            </div>
        </div>
    )
}
