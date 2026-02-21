const User = require("../models/user.js");

module.exports.rendersignupForm = (req, res) => {
    res.render("users/signup.ejs");
};


module.exports.signupForm = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });

        const registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);

        //login after signup automatically --------
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "welcome to wanderlust!");
            res.redirect("/listings");
        });
    }

    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};


module.exports.login = async (req, res) => {
    req.flash("success", "welcome to wanderlust");
    // res.redirect("/listings");
    // to redirect user after login where user wants to after login
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};


module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    });
};