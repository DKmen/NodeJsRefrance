const express = require('express');
const morgan=require('morgan');
const taskRoute=require('./routes/taskRoutes');


const app = express();


app.use(express.json());
app.use(express.static(`${__dirname}/public`));


if(process.env.ENV=='dev') app.use(morgan('dev'));
    


app.use((req,res,next)=>{
    console.log('Hello from middleware');
    next();
})


app.use('/task',taskRoute);


module.exports=app;