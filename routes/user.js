const express=require("express");
const router=express.Router();
const userController=require("../controllers/user.js");

const wrapAsync= require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js");

// signup routes

router.get("/signup",

    userController.renderSignupPage
);

router.post("/signup",

    wrapAsync(userController.signupUser)
);

//login users

router.get("/login", 
    
    userController.renderLoginPage
);

router.post("/login",

    saveRedirectUrl,
    passport.authenticate('local', { 
        
        failureRedirect: '/login', failureFlash:true 
    }),
    userController.loginUser
);

//logout user

router.get("/logout", 
    
    userController.logoutUser
);


module.exports=router;