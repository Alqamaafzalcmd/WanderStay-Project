const Joi = require("joi");

// listing ---------
const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().min(0).required(),
        description: Joi.string().required(),

        image: Joi.string().allow("", null),

        // image: Joi.object({
        //     filename: Joi.string().required(),
        //     url: Joi.string().required(),
        // })
    }).required(),
});


// review  ---------------
const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required(),
    }).required(),
});

module.exports = { listingSchema, reviewSchema };
