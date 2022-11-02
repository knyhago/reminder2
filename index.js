const express = require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');
const port=9010;

const Reminder=require('./Models/reminder');

const url='mongodb+srv://knyhago:kenny@cluster0.2kzve.mongodb.net/?retryWrites=true&w=majority'

const app= express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get('/',async (req,res)=>{
    await res.send("health done")
})

app.get('/all',async (req,res)=>{
    await Reminder.find()
    .then((result)=>{
        res.status(200).send(result)
    })
})

app.post('/post',async(req,res)=>{
    const dat=new Reminder({
        Reminder:req.body.reminder,
        Priority:req.body.priority,
        Date:req.body.date
    })

    try {
      const save= await dat.save()
       res.status(200).send(save)
        // .then((res)=>{
        //     res.status(200).send('Saved')
        // })
        
    } catch (error) {
        res.status(400).send(error)
        
    }

   

})

app.patch('/patch/:id',async (req,res)=>{
    var id=req.params.id
   await Reminder.findByIdAndUpdate({_id:id},{$set:{Reminder:req.body.reminder}},{isNew:true})
   .then((respo)=>{
    res.status(200).send(respo)
   })
})

app.delete('/delete/:id',async(req,res)=>{
    var id=req.params.id;
    try {
        await Reminder.findByIdAndDelete({_id:id})
        .then((response)=>{
            res.status(200).send('deleted')
        })
        
    } catch (error) {
        
    }
})


mongoose.connect(url,(err)=>{
    if (err) throw err
    console.log('connected to db')

    app.listen(port,(err)=>{
        if (err) throw err
        console.log(`listening to ${port}`)
    })
})