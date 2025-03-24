const User=require("../modals/user.js");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js");

//signup user

module.exports.renderSignupPage= (req,res)=>{

    res.render("users/signup.ejs");
};

module.exports.signupUser=async(req,res,next)=>{

    try{

        let{username, email, password}=req.body;
        let newUser=new User({username, email});
        const registerUser=await User.register(newUser , password);

        req.login(registerUser,(err)=>{

            if(err){

               return next(err);
            }

            req.flash("Success", "Welcome to InstaStay");
            res.redirect("/listings");
            
        });
    }
    catch(err){

        req.flash("Failure", err.message);
        res.redirect("/signup");
    };


};

//login user

module.exports.renderLoginPage=(req,res)=>{

    res.render("../views/users/login.ejs", {failure: req.flash("error")});
};

module.exports.loginUser= async(req,res,next)=>{

    req.flash("Success", "Welcome back to InstaStay !!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

//logout user

module.exports.logoutUser=(req, res, next)=>{

    req.logout((err)=>{

        if(err){

           return next(err);
        }

        req.flash("Success", "You are logged-out !!");
        res.redirect("/listings");
    });
};