const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;
if (!mongo_url) {
    console.error('MONGO_CONN environment variable is not set');
    process.exit(1);
}

mongoose.connect(mongo_url)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Failed to connect to MongoDB', err);
    });