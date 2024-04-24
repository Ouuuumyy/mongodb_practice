const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017/blogApp')
    .then(()=>console.log('connected to database'))
    .catch((err)=>console.log(err));

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    age : Number,
    date : Date//{type : Date, default : Date.now}
});

const User = new mongoose.model('Users',userSchema);

const newUser = new User({
    name: "sarah",
    email: "mike.ross@arkx.group",
    age: 30,
    date : "2024-02-19T09:18:12.035+00:00"
});

function addUser(user){
    user.save()
        .then(()=>console.log("user added successfully"))
        .catch((err)=>console.log(err));
}

User.find({})
  .then((users) => console.log(users))
  .catch((error) => console.log("Error fetching users: ", error));

function deleteOldData(){
    const today = new Date(Date.now());
    const oneWeekAgo = new Date(new Date() - (7*24*60*60*1000));
    console.log(today+"\n"+oneWeekAgo);
    User.deleteMany({
        date : {$lt : oneWeekAgo}})
        .then((result)=>{
            console.log("deleted "+ result.deletedCount + " accounts");
        })
        .catch((err)=>console.log(err));
}

deleteOldData();

//addUser(newUser);