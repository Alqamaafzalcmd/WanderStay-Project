const  mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main(){
    await mongoose.connect(MONGO_URL);
}


// connecting with database -----------
main()
 .then(() => {
    console.log("connection successfull !!");
 })
 .catch((err) => {
    console.log(err);
 });


 // cleaning data and inserting exported from data.js
 const initDB = async () => {
    await Listing.deleteMany(); // cleaning data


    //adding owner to individual listings
    initData.data = initData.data.map(
      (obj) => ({...obj, owner:"698ad61a13f0baaaf1459a9c",}));
      
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
 }

 initDB();