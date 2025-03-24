const Listing=require("../modals/listing.js");
const Review=require("../modals/review.js");

//add a review

module.exports.addReview= async(req, res, next)=>{

    let{id}=req.params;
    let{review}=req.body;
    
    let listing= await Listing.findById(id);
    let addReview=new Review(review);
    addReview.author=(req.user._id);

    listing.reviews.push(addReview);
    await addReview.save();
    await listing.save();

    req.flash("Success", "New review is added !!");
    res.redirect(`/listings/${id}`);

};

//delete a review

module.exports.deleteReview=async(req, res, next)=>{

    let{id,reviewId}=req.params;

    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);

};