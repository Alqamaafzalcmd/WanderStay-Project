if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


const ExpressError = require("./utils/ExpressError.js");

const session = require("express-session");
const {MongoStore} = require('connect-mongo');
const flash = require("connect-flash");


const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");


// Router 
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; //database -> wanderlust
// const dbURL = process.env.ATLASDB_USER;



async function main() {
    await mongoose.connect(MONGO_URL);
    // await mongoose.connect(dbURL);
}


app.engine("ejs", ejsMate);

// to override method
app.use(methodOverride("_method"));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// to serve static files 
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));



// connecting with database -----------
main()
    .then(() => {
        console.log("connection successfull !!");
    })
    .catch((err) => {
        console.log(err);
    });



// const store = MongoStore.create({
//     mongoUrl: dbURL,
//     crypto : {
//         secret: process.env.SECRET,
//     },
//     touchAfter: 24 * 3600 ,// time period in seconds
//     ttl: 60 * 60 * 24 * 7,
// });


// store.on("error", () => {
//     console.log("ERROR IN MONGO SESSION STORE", err);
// });


const sessionOptions = {
    // store,// session storage
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,// for security purpose , to prevent from crossscripting attack
    }
};




app.use(session(sessionOptions));
app.use(flash());


// authentication ---------------------
app.use(passport.initialize());


app.use(passport.session());

// User are now being authenticate be localStrategy by method authenticate
passport.use(new localStrategy(User.authenticate()));


// using static serialize and deserialize of model for passport session support ----
// serializeUser — “What do I store in the session?”
passport.serializeUser(User.serializeUser());
// deserializeUser — “How do I get the user back?”
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();

});


app.get("/", (req, res) => {
    // console.log("in root path");
    // res.send("in root path")
    res.redirect("/listings");
});


app.get("/demouser", async (req, res) => {
    let fakeUser = new User({
        email: "studen@gmail.com",
        username: "student",
    });

    const registerUser = await User.register(fakeUser, "helloworld");
    console.log(registerUser);
    res.send(registerUser);


});

// router -----------
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);



// if no one route matched  then it will match
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});



app.use((err, req, res, next) => {
    // console.log(err);
    let { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).render("listings/error.ejs", { err });
  
});




app.listen(port, () => {
    console.log(`app is listening on ${port} ....`);
});

