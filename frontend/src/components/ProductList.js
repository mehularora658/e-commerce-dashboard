import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ProductList = () => {
    const searchHandle =async  (event) => {
        console.log(event.target.value);
        let key = event.target.value
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers: {
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json()
            if (result) {
                setProducts(result)
            }
        }else{
            getProducts()
        }
    }
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'delete',
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }

        })
        result = await result.json()
        if (result) {
            getProducts();
        }
    }
    const [product, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization:`Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        setProducts(result)
    }
    console.log("products", product);

    return (
        <div className='product_list'>
            <h3>Product list</h3>
            <input className='search_productBox' type="text" placeholder='Search Product'
                onChange={searchHandle}
            />
            <ul>
                <li>S. no</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Comapny</li>
                <li>Operation</li>
            </ul>
            {
               product.length>0? product.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button
                                onClick={() => deleteProduct(item._id)}
                            >
                                Delete
                            </button>
                            <Link to={`/updateProduct/${item._id}`}>Update</Link>
                        </li>
                    </ul>
                )
                :<h1>No Result found</h1>
            }

        </div>
    )
}

export default ProductList