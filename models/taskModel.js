const mongoose = require("mongoose");

const taskScheema=new mongoose.Schema({
    taskName:{
        type:String,
        require:true,
        trim:true
    },
    discripation:{
        type:String,
        require:true,
        trim:true,
        select:false
    },
    startTime:{
        type:String,
        trim:true
    },
    endTime:{
        type:String,
        trim:true
    },
    date:{
        type:Date,
    }
})

const taskModel=mongoose.model('task',taskScheema);

module.exports=taskModel;