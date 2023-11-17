import React, { useState } from 'react'

const AddProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const [error, setError] = useState(false)
    const addproductfunc = async () => {

        console.log(!name)
        if (!name || !price || !category || !company) {
            setError(true)
            return false
        }

        console.log(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id
        let result = await fetch('http://localhost:5000/addProduct', {
            method: 'post',
            body: JSON.stringify({ name, price, category, userId, company }),
            headers: {
                'Content-Type': "application/json",

                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        })
        result = await result.json()
        console.log(result);
    }
    return (
        <div className='product'>
            <h1>Add product</h1>
            <input type='text'
                placeholder='Enter Product name'
                className='inputBox'
                value={name}
                onChange={(e) => { setName(e.target.value) }}
            />
            {
                error && !name &&
                <span className='invalid_input'>Enter valid name</span>
            }
            <input type='text'
                placeholder='Enter Product price'
                className='inputBox'
                value={price}
                onChange={(e) => { setPrice(e.target.value) }}
            />
            {
                error && !price &&
                <span className='invalid_input'>Enter valid price</span>
            }
            <input type='text'
                placeholder='Enter Product category'
                className='inputBox'
                value={category}
                onChange={(e) => { setCategory(e.target.value) }}
            />
            {
                error && !category &&
                <span className='invalid_input'>Enter valid category</span>
            }
            <input type='text'
                placeholder='Enter Product company'
                className='inputBox'
                value={company}
                onChange={(e) => { setCompany(e.target.value) }}
            />
            {
                error && !company &&
                <span className='invalid_input'>Enter valid company</span>
            }
            <button
                onClick={addproductfunc}
                className='appButton'>Add Product</button>
        </div>
    )
}

export default AddProduct