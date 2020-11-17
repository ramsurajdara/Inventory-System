import React from 'react'
import TopProducts from './TopProducts'
export default function Home() {
    return (
        <div>
            <div class = "d-flex justify-content-center">
                <h4 class="display-4">
                    Mobile Shoppy!!!
                </h4>
            </div>
            <p class = "d-flex justify-content-center">
            Welcome to your new online shop! And thanks for choosing Mobile Shoppy!!
            </p>
            <hr/>
            <h3 class = "d-flex justify-content-center">We sell mobiles of all brands</h3>
            <div class = "d-flex justify-content-center">
                <div class="thumbnail"> 
                <img src = "apple.jpg" class="img-thumbnail" alt ="" />
                </div><div class="thumbnail"> 
                <img src = "samsung.jpg" class="img-thumbnail" alt ="" />
                </div><div class="thumbnail"> 
                <img src = "realme.jpg" class="img-thumbnail" alt ="" />
                </div><div class="thumbnail"> 
                <img src = "xiaomi.jpg" class="img-thumbnail" alt ="" />
                </div>
            </div>
            <div class = "d-flex justify-content-center">
            <div class="thumbnail"> 
                <img src = "moto.png" class="img-thumbnail img-responsive" alt ="" />
                </div><div class="thumbnail"> 
                <img src = "oppo.jpg" class="img-thumbnail img-responsive" alt ="" />
                </div><div class="thumbnail"> 
                <img src = "huawei.jpg" class="img-thumbnail img-responsive" alt ="" />
                </div><div class="thumbnail"> 
                <img src = "oneplus.png" class="img-thumbnail" alt ="" />
                </div>
            </div>
            <div>
                <h3 class = "d-flex justify-content-center">Our Top Viewed Products</h3>
                <TopProducts/>
            </div>
        </div>
    )
}
