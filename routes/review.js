const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {Listing} = require("../models/listing.js"); // listing model(collection)
const Review = require("../models/review.js");// review model (collection)
const {listingSchema, reviewSchema} = require("../JoiSchema.js");// joi schema for validation of listing / reviews
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")


const reviewController = require("../controllers/reviews.js");


// Post review route  -----  adding a review
router.post("/", 
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview)
);  

 

// delete a review  -------
router.delete("/:reviewId", isLoggedIn, isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);


module.exports = router;


