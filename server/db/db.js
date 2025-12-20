import mongoose from "mongoose";

function connectToDB () {
    mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("database connected successfully :)"))
    .catch(()=>{
        console.log("some error happened while connecting DB");
    })
}

export default connectToDB;