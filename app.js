const express = require ('express');
const bp = require('body-parser');
const users = require('./routes/userRoutes')
const posts = require('./routes/postRoutes')
const mongoose = require("mongoose");

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({extended:true}))
app.set('port', 3000);

mongoose.connect('mongodb://127.0.0.1:27017/twitter', (err) => {
    if(err)
        throw new Error('Connection to DB Failed');
    else
        console.log('Connected to DB Successfully');
});

app.use('/users', users);
app.use('/posts', posts);

app.listen(app.get('port'), () => {
    console.log("Node app is running at localhost:" + app.get('port'))
});




