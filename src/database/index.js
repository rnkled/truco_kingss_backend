const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://app_default:${process.env.DB_PASS}@kingone.mcoex.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

module.exports = mongoose;