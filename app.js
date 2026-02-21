if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

// console.log(process.env);
// console.log(process.env.secret);


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");




// const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

const session = require("express-session");
const {MongoStore} = require('connect-mongo');
const flash = require("connect-flash");


const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

// const joi = require("joi");
// const {listingSchema, reviewSchema} = require("./JoiSchema.js");// joi schema for validation of listing / reviews


// Router 
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; //database -> wanderlust
const dbURL = process.env.ATLASDB_USER;




// const Listing = require("./models/listing.js"); // listing model(collection)
// const Review = require("./models/review.js");// review model (collection)




async function main() {
    // await mongoose.connect(MONGO_URL);
    await mongoose.connect(dbURL);
}


app.engine("ejs", ejsMate);

// to override method
app.use(methodOverride("_method"));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// to serve static files 
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "public/js")))

app.use(express.urlencoded({ extended: true }));



// connecting with database -----------
main()
    .then(() => {
        console.log("connection successfull !!");
    })
    .catch((err) => {
        console.log(err);
    });



const store = MongoStore.create({
    mongoUrl: dbURL,
    crypto : {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600 ,// time period in seconds
    ttl: 60 * 60 * 24 * 7,
});


store.on("error", () => {
    console.log("ERROR IN MONGO SESSION STORE", err);
});


const sessionOptions = {
    store,// session storage
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,// for security purpose , to prevent from crossscripting attack
    }
};


app.get("/", (req, res) => {
    res.redirect("/listings");
});




app.use(session(sessionOptions));
app.use(flash());


// authentication ---------------------
app.use(passport.initialize());

/* A web application needs the ability to identify 
users  as they browse from page to page . This series of requests
and responses, each associated with the same user, is known as a session */
app.use(passport.session());

// User are now being authenticate be localStrategy by method authenticate
passport.use(new localStrategy(User.authenticate()));


// use static serialize and deserialize of model for passport session support ----
// serializeUser — “What do I store in the session?”
passport.serializeUser(User.serializeUser());
// deserializeUser — “How do I get the user back?”
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {

    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    // console.log(res.locals.success);
    next();

});


app.get("/demouser", async (req, res) => {
    let fakeUser = new User({
        email: "studen@gmail.com",
        username: "student",
    });


    /* register(user, password, cb) Convenience method to
     register a new user instance with a given password.
      Checks if username is unique. */
    const registerUser = await User.register(fakeUser, "helloworld");
    console.log(registerUser);
    res.send(registerUser);


});

// router -----------
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);






//  ---------------------------------------------------------------------------------------------------
// app.get("/testListing", (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "New Delhi, India",
//         country:"India",
//     });

//     sampleListing.save()
//        .then((res) => {
//         console.log(res);
//        })
//        .catch((err) => {
//         console.log(err);
//        });

//      res.send("successful test");

// });
//----------------------------------------------------------------------------------------------------




// if no one route matched  then it will match
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});



app.use((err, req, res, next) => {
    // res.send("something went wrong");

    let { statusCode = 500, message = "something went wrong" } = err;
    // res.status(statusCode).send(message);
    // res.send(err);

    res.status(statusCode).render("listings/error.ejs", { err });
    // res.send(err);
});




app.listen(port, () => {
    console.log(`app is listening on ${port} ....`);
});

