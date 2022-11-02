const Mongoose=require('mongoose');

const reminderSchema=new Mongoose.Schema({
    Reminder:String,
    Priority:Number,
    EndDate:{
        type:Date,
        default:Date()
    },
    EntryDate:{
        type:Date,
        default:Date()
    }

})

module.exports=Mongoose.model("Reminder",reminderSchema)