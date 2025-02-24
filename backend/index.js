const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');  
const ProductsRouter = require('./Routes/ProductsRouter');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 5654;

app.get('/ak', (req, res) => {
    res.send('Abhishek Rock');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter); 
app.use('/products', ProductsRouter); 

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});