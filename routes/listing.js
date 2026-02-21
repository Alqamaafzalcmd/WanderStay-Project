const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../JoiSchema.js");// joi schema for validation of listing / reviews

const Listing = require("../models/listing.js"); // listing model(collection)

const { isLoggedIn, validateListing, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");


const multer = require('multer');

const { storage } = require("../cloudConfig.js");

// const upload = multer({ dest: 'uploads/' })
const upload = multer({ storage });// multer will save our file to cloudinary storage



// #######################################
// common part is   /listings
// #######################################

router.route("/")
    // index route 
    .get(wrapAsync(listingController.index))

    // adding new list recieved from form --------- 
    .post(isLoggedIn, validateListing, upload.single('listing[image]'), wrapAsync(listingController.createListing));

//    .post(upload.single('listing[image]'),  (req, res) => {
//          res.send(req.file);
//     })



// router.route("/")
//     // index route 
//     .get(wrapAsync(listingController.index))
//     // adding new list recieved from form --------- 
//     .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));



// sending a form to add new data 
router.get("/new", isLoggedIn, listingController.renderNewForm);



router.route("/:id")
    // update route (edit listing)----------------------
    .put(isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(
            listingController.updateListing
        )
    )

    // delete the specifc listing with particular id
    .delete(isLoggedIn, isOwner,
        wrapAsync(
            listingController.destroyListing
        )
    )

    // show route for specific id --------------------
    .get(wrapAsync(listingController.showAllListing));




// sending a from to edit --------
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));








module.exports = router;