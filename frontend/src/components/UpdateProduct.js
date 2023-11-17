import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const params = useParams()
    const navigate = useNavigate()

    const getProductDetails = async () => {
        console.log(params.id);
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'get',
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        console.log(result);
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }
    useEffect(() => {
        console.log('useeffect working...');
        getProductDetails()
    }, [])



    const updateProductFunc = async () => {
        console.log(name, price, category, company);
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json',

                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        })
        result = await result.json()
        console.log(result);
        navigate('/')
    }
    return (
        <div className='product'>
            <h1>Update product</h1>
            <input type='text'
                placeholder='Enter Product name'
                className='inputBox'
                value={name}
                onChange={(e) => { setName(e.target.value) }}
            />

            <input type='text'
                placeholder='Enter Product price'
                className='inputBox'
                value={price}
                onChange={(e) => { setPrice(e.target.value) }}
            />

            <input type='text'
                placeholder='Enter Product category'
                className='inputBox'
                value={category}
                onChange={(e) => { setCategory(e.target.value) }}
            />

            <input type='text'
                placeholder='Enter Product company'
                className='inputBox'
                value={company}
                onChange={(e) => { setCompany(e.target.value) }}
            />

            <button
                onClick={updateProductFunc}
                className='appButton'>Update Product</button>
        </div>
    )
}

export default UpdateProduct