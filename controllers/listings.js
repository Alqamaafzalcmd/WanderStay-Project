const {Listing, category_options} = require("../models/listing");
const fetch = require("node-fetch");
const ExpressError = require("../utils/ExpressError");


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });

};

module.exports.listingSearch = async (req, res) => {
    let { category } = req.body;
    category = category.toLowerCase();

    // for cateogory
    let allListings = await Listing.find({
        category: { $in: [`${category}`] }
    });

    // for destination (location)
    if (allListings.length == 0) {
        let{ category : dest} = req.body;
        allListings = await Listing.find({ location: {$regex : `${dest}`,$options:"i"} });
    }

      // for destination (country)
     if (allListings.length == 0) {    
        let {category : cntry } = req.body;
        allListings = await Listing.find({ country: {$regex : `${cntry}`,$options:"i"} });
    }


    // console.log(allListings);

    if (allListings.length === 0) {
        req.flash("error", ` '${category}' not found please search another category`);
    }
    // res.send(targetListings);
    res.render("listings/index.ejs", { allListings });
}


module.exports.filterCategory = async (req, res) => {

    let { category } = req.query;
    category = category.toLowerCase();
    const allListings = await Listing.find({
        category: { $in: [`${category}`] }
    });

    // console.log(allListings);

    if (allListings.length === 0) {
        req.flash("error", ` '${category}' not found please search another category`);
    }
    // res.send(targetListings);
    res.render("listings/index.ejs", { allListings });

}




module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs",{category_options});
};



module.exports.showAllListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews", populate: {
                path: "author",
            }
        })
        .populate('owner');

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    else res.render("listings/show.ejs", { listing });
}


module.exports.createListing = async (req, res, next) => {

    async function geocodeLocation(place) {
        const url =
            `https://nominatim.openstreetmap.org/search?format=json&q=${(place)}&limit=1`;
        const response = await fetch(url, {
            headers: {
                "User-Agent": "wanderlust-project"
            }
        });
        const data = await response.json();
        if (!data || data.length === 0) {
            throw new ExpressError("Location not found. Try a more specific place.");
        }

        else return data;
    };

    let data = await geocodeLocation(req.body.listing.location);
    // console.log(data[0]);
    // console.log(data[0].lon, data[0].lat);


    let geo = {
        type: "Point",
        coordinates: [
            data[0].lon,  // FIRST longitude
            data[0].lat,  // SECOND latitude
        ]
    };

    const url = req.file.secure_url;
    const filename = req.file.public_id;


    const newListing = new Listing(req.body.listing);// creating document
    // console.log(newListing.category);

    newListing.owner = req.user._id;

    newListing.image = { url, filename };

    newListing.geometry = geo;

    let saveListing = await newListing.save();
    // console.log(saveListing);

    req.flash("success", "New listing Created");
    res.redirect("/listings");

}




module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }

    let originaImageUrl = listing.image.url;
    originaImageUrl = originaImageUrl.replace("/upload", "/upload/h_300,w_300,r_20,f_auto"); // using cloudinary api to show image in listing
    return res.render("listings/edit.ejs", { listing, originaImageUrl, category_options });

}


module.exports.updateListing = async (req, res) => {

    let { id } = req.params;
    let listing = await Listing.findById(id);


    let newListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });// destructing obj and send for updation

    if (typeof req.file != "undefined") {// if was uploaded then do this
        const url = req.file.secure_url;
        const filename = req.file.public_id;

        newListing.image = { url, filename };
        await newListing.save();
    }




    req.flash("success", "Listing updated");
    res.redirect(`/listings/${id}`);
}



module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deleteData = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted");
    res.redirect("/listings");
}