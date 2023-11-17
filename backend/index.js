const express = require('express')
require('./db/config')
const cors = require('cors')
const User = require('./db/User')
const Product = require('./db/Product')
const app = express()

app.use(express.json())
app.use(cors())

const jwt = require('jsonwebtoken')
const jwtKey = 'e-comm'

app.post('/register', async (req, resp) => {
    let user = new User(req.body)
    let result = await user.save()
    result = result.toObject()
    delete result.password
    if (result) {
        jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                resp.send({ result: "Try again after some time" })

            }
            resp.send({ result, auth: token })
        })
    }
})

app.post('/addProduct', verifyToken, async (req, resp) => {
    let product = new Product(req.body)
    let result = await product.save()
    resp.send(result)
})

app.get('/products', verifyToken, async (req, resp) => {
    let products = await Product.find()
    if (products.length > 0) {
        resp.send(products)
    } else {
        resp.send(result, "no products found")
    }
})

app.post('/login', async (req, resp) => {
    console.log(req.body);
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    resp.send({ result: "Try again after some time" })

                }
                resp.send({ user, auth: token })
            })
        } else {
            resp.send({ result: "No User Found" })
        }
    } else {
        resp.send({ result: "No User Found" })
    }


})

app.delete('/product/:id/', verifyToken, async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    resp.send(result)

})

app.get('/product/:id', verifyToken, async (req, resp) => {

    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result)
    } else {
        resp.send({ result: "No record found" })
    }
})

app.put('/product/:id', verifyToken, async (req, resp) => {
    console.log(req.body);
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    resp.send(result)
})

app.get('/search/:key', verifyToken, async (req, resp) => {
    let result = await Product.find({
        '$or': [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { price: { $regex: req.params.key } }
        ]
    })
    resp.send(result)
})

function verifyToken(req, resp, next) {
    let token = req.get('Authorization')
    if (token) {
        token = token.split(' ')[1]
        console.log('middlwware called if', token);
        jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.status(401).send({ result: 'PLease provide valid token ' })
            } else {
                next()
            }
        })
    } else {
        resp.status(403).send({ result: 'PLease add token with header' })
    }

}

app.listen(5000) 