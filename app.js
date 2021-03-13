const express = require('express');
const path = require('path');

const mongoose = require('mongoose');

const { config } = require('./configs')
const apiRouter = require('./router/api.router');

const app = express();

_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(config.PORT , () => {
    console.log(`App listen ${config.PORT}`);
});

function _connectDB() {
    mongoose.connect(config.MONGO_URL,
        { useNewUrlParser: true, useUnifiedTopology: true });

    const connection = mongoose.connection;

    connection.on('error', (error) => {
        console.log(error)
    });
}
