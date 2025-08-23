const express= require('express');
const path= require('path');
const app= express();
// env file
const dotenv = require('dotenv');
dotenv.config();

// router file
const siteRouter= require('./router/site.routes');

// Public folder 
app.use(express.static(path.join(__dirname,'public')));

// EJS template,view engine
app.set('view engine','ejs');

// view folder dirname
app.set('views',path.join(__dirname,'views'));

// Router 
app.use('/',siteRouter);

// Error handel
app.use((req,res)=>{
    res.status(404).render('pages/notfound')
});

// Use env PORT 
const PORT = process.env.PORT;

// server
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
});