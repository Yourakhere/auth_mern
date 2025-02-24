const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');  
const ProductsRouter = require('./Routes/ProductsRouter');

require('dotenv').config();
require('./Models/db');

app.get('/ak', (req, res) => {
    res.send('Abhishek Rock');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter); 
app.use('/products', ProductsRouter); 

// Export the app as a serverless function for Vercel
module.exports = app;
