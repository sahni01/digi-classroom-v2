const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://digi-class:ti975PZzi9GJ6v6@cluster0.osd6q.mongodb.net/digiClassroom?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true
})
 
const conn = mongoose.connection;

conn.on('open',()=>{

    console.log('database-connected')

})

conn.on('close',()=>{
    console.log('database-disconnected')
})