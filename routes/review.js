const express=require("express");
const router=express.Router({mergeParams:true});
const reviewController=require("../controllers/review.js");

const wrapAsync= require("../utils/wrapAsync.js");
const {reviewSchema} =require("../validateSchema.js");
const { isLogedIn, isAuthor, starCheck } = require("../middleware.js");

const validateReview=((req, res, next)=>{

    let{error}=reviewSchema.validate(req.body);

    if(error){
       
        throw new ExpressError(400, error);
    }
    else{

        next();
    }

});

// new reviews add route

router.post("/",
    isLogedIn,
    validateReview,
    wrapAsync(reviewController.addReview)
);

// delete reviews route

router.delete("/:reviewId", 
    isLogedIn, 
    isAuthor, 
    wrapAsync(reviewController.deleteReview)
);

module.exports=router;