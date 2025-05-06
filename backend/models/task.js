const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title:String,
    description:String,
    assignedEmployee:String,
    priority:String,
    deadline:Date,
    status:{
        type:String,
        enum:['Pending','In Progress','Complate'],
        default:'Pending'
    }

});

module.exports = mongoose.model('Task',taskSchema);