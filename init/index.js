const  mongoose = require("mongoose");
const initData = require("./data.js");
const {Listing} = require("../models/listing.js");
const fetch = require("node-fetch");

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


async function geocodeLocation(place) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${(place)}&limit=1`;
    const response = await fetch(url, {
        headers: {
            "User-Agent": "WanderStay-Project"
        }
    });
    const data = await response.json();
    if (!data || data.length === 0) {
        throw new Error(`Location not found: ${place}`);
    }
    return data[0];
}

 // cleaning data and inserting exported from data.js
 const initDB = async () => {
    await Listing.deleteMany(); // cleaning data

    //adding owner and geometry to individual listings
    const listingsWithGeo = [];
    for (let obj of initData.data) {
        try {
            const geoData = await geocodeLocation(obj.location);
            // console.log(geoData);
            const geometry = {
                type: "Point",
                coordinates: [parseFloat(geoData.lon), parseFloat(geoData.lat)]
            };
            listingsWithGeo.push({ ...obj, owner: "698ad61a13f0baaaf1459a9c", geometry });
        } catch (error) {
            console.error(`Error geocoding ${obj.location}:`, error.message);
            // Skip or use default
            listingsWithGeo.push({ ...obj, owner: "698ad61a13f0baaaf1459a9c", geometry: { type: "Point", coordinates: [0, 0] } });
        }
        // break;
    }
      
    await Listing.insertMany(listingsWithGeo);
    console.log("data is initialized now!!");
    
 }
 
 initDB();



 