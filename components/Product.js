import React from 'react'
import { Link } from 'react-router-dom';

class Product extends React.Component {
    
    render() {
        let viewNextTo = {
            pathname: "/products/" + this.props.id + "/" + this.props.productName,
        }
        //console.log(this.props)
        return (
            <div class="col-sm-6 col-md-4 col-lg-3 border">
                {/* <input type = "checkbox" name = "productIds" value = {this.props.id}/> */}
                <div>
                    <img class="card-img-top" src={this.props.image} alt = {this.props.manufacturer}/>
                </div>
                <div class="card-body">
                    <h5 class="card-title">{this.props.productName}</h5>
                    <p class="card-text">
                        <b>Price:</b> Rs {this.props.price} /-<br/>
                        {this.props.cb.cbs["os"] && <div><b>OS:</b> {this.props.os}<br/></div> }
                        {this.props.cb.cbs["manufacturer"] && <div><b>Manufacturer:</b> {this.props.manufacturer}<br/></div> }
                        {this.props.cb.cbs["processor"] && <div><b>Processor:</b> {this.props.processor}</div>}
                    </p>
                    <Link to={viewNextTo} class = "btn btn-primary" >View</Link>
                    <Link to={{pathname: "/edit-product/" + this.props.id + "/" + this.props.productName,
                                params: this.props}} class = "btn btn-warning" >Edit</Link>
                </div>
            </div>
        )
    }
}

export default Product;

