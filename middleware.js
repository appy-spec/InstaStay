const Listing=require("./modals/listing.js");
const Review = require("./modals/review.js");

module.exports.isLogedIn=(req, res, next)=>{

    if(!req.isAuthenticated()){

        req.session.redirectUrl=req.originalUrl;
        req.flash("error", "You must be logged-in !!");
        return res.redirect("/login");
    }

    next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{

    if(req.session.redirectUrl){

        res.locals.redirectUrl=req.session.redirectUrl;
    }

    next();
};

module.exports.isOwner=async(req,res,next)=>{

    let{id}=req.params;
    let listing=await Listing.findById(id);

    if(!listing.owner.equals(res.locals.currUser._id)){

        req.flash("Failure", "You are not the owner of this listing !!");
        return res.redirect(`/listings/${id}`);
    }

    next();

};

module.exports.isAuthor=async(req, res,next)=>{

    let{id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
   
    if(!review.author.equals(res.locals.currUser._id)){

        req.flash("Failure", "You are not the owner of this review !!");
        return res.redirect(`/listings/${id}`);
    }
    next();

};

// this is for review star check

module.exports.starCheck=(req, res, next)=>{

    let{id}=req.params;
    let{review}=req.body;
    
    if(review.rating==0){

        req.flash("Failure", "Select a valid star number !!");
        return res.redirect(`/listings/${id}`);
    }

    next();
};