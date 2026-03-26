const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

let category_options = [
  "rooms",
  "villa",
  "apartment",
  "hostel",
  "hotel",
  "resort",
  "cabin",
  "treehouse",
  "beach",
  "mountains",
  "cities",
  "countryside",
  "forest",
  "island",
  "desert",
  "lake",
  "budget",
  "mid-range",
  "luxury",
  "adventure",
  "romantic",
  "family",
  "nature",
  "eco",
  "wildlife",
  "camping",
  "historic",
  "trending",
  "unique",
  "offbeat",
  "farmstay",
  "domes",
  "castles",
  "arctic",
  "pools",
  "farms"
];


const listingSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
    },

    image: {
        url: String,
        filename: String,
    },

    price: {
        type: Number,
    },

    location: {
        type: String,
    },

    country: {
        type: String,
    },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },

    // build this own for filter options --------------------
    category: {
        type: [String],
        enum: category_options,
        default: ["rooms","hotel"]
    }

});


listingSchema.post("findOneAndDelete", async (listing) => {// listing is data which is deleted 
    // console.log(listing);
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

// creating model Listing (Collections)
const Listing = mongoose.model("Listing", listingSchema);
module.exports = {Listing,category_options};


