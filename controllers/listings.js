const Listing = require("../models/listing");
const fetch = require("node-fetch");


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });

};


module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
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
    // console.log(listing);
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
            throw new Error("Location not found. Try a more specific place.");
        }

        else return data;
    };

    let data = await geocodeLocation(req.body.listing.location);
    console.log(data[0]);
    console.log(data[0].lon, data[0].lat);


    let geo = {
        type: "Point",
        coordinates: [
            data[0].lon,  // FIRST longitude
            data[0].lat,  // SECOND latitude
        ]
    };

    const url = req.file.secure_url;
    const filename = req.file.public_id;

    // console.log(url);
    // console.log(filename);


    const newListing = new Listing(req.body.listing);// creating document
    newListing.owner = req.user._id;

    newListing.image = { url, filename };

    newListing.geometry = geo;

   let saveListing =  await newListing.save();
   console.log(saveListing);

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
    originaImageUrl = originaImageUrl.replace("/upload", "/upload/h_300,w_300,r_max,f_auto"); // using cloudinary api to show image in listing
    return res.render("listings/edit.ejs", { listing, originaImageUrl });

}


module.exports.updateListing = async (req, res) => {
    // if(!req.body.listing){
    //   throw new ExpressError(402, "no matched data to update");
    // }

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
    // console.log(deleteData);
    req.flash("success", "Listing deleted");
    res.redirect("/listings");
}