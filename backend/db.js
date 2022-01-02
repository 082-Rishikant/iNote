const mongoose=require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo=()=>{
  //it is a inbuilt function to connect to mongoose with some arguments
  mongoose.connect(mongoURI, 
    // callback function to deal with async functionality and it is passed as argument
    ()=>{
      console.log("Connected to mongo successfully");
  })
}

module.exports=connectToMongo;