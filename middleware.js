const {Listing} = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js");
const { listingSchema, reviewSchema } = require("./JoiSchema.js");


// validation for schema of listings 
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    }
    next();
};




// validating review data --------------- 
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((ele) => ele.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
};


module.exports.isLoggedIn = (req, res, next) => {

    if (!req.isAuthenticated()) {
        // storing redirecturl into session -------------
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create to create listing");
        return res.redirect("/login");
    }
    next();
};




module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};


module.exports.isReviewAuthor = async (req, res, next) => {
    let { id ,reviewId } = req.params;
    let review = await Review.findById(reviewId);

    // authorization on listing to prevent api injection  from hopscotch -------
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not author of this review");
        return res.redirect(`/listings/${id}`);
    }

    next();
};



module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    // authorization on listing to prevent api injection  from hopscotch -------
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You don't have permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();

};