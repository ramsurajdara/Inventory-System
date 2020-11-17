import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Bar } from 'react-chartjs-2'

export default function TopProducts() {
    const [products, setProducts] = useState([]);
    const [top, setTop] = useState({"value": 5});

    useEffect(()=>{
        axios.get("http://localhost:8000/products?_sort=views&_order=desc&_end="+top.value)
            .then(res=>{
                setProducts(res.data)
            })
    }, [top])

    const data = {
        labels: products.map(product => product.productName),
        datasets: [
            {
                label: '# of Views',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                data: products.map(product => product.views),
                borderWidth: 1,
            },
        ],
    }
    const options = {
        responsive: true,
        scales: {
            yAxes: [
                {
                ticks: {
                    beginAtZero: true,
                    },
                },
            ],
        },
    } 
    const changeTop = (e) => {
        setTop({"value": e.target.value})
    }
    return (
        <div class = "top-products">
            <div class="row justify-content-center">
                <div class="col-sm-12 col-md-12 col-lg-6 border center" style={{"paddingTop": "10px"}}>
                    <select class="form-control" onChange={changeTop}>
                        <option selected value = "5">Top 5 viewed products</option>
                        <option value="10">Top 10 viewed products</option>
                        <option value="15">Top 15 viewed products</option>
                    </select>
                    <Bar data={data} options={options}/>
                </div>
            </div>
        </div>
)
}
