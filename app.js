const express= require("express");
const ejs=require("ejs");
const path=require("path");
const mongoose=require("mongoose");
const Listing=require("./modals/model.js");
const Review=require("./modals/review.js");
const methodoverride=require("method-override");
const ejsmate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const wrapAsync= require("./utils/wrapAsync.js");
const Joi= require("joi");
const {listingSchema, reviewSchema} =require("./validateSchema.js");

const app=express();
const port=3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsmate);

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodoverride("_method"));

app.listen(port, ()=>{

    console.log("server is running on port 3000");
});

main().then(()=>{

    console.log("successfully start mongoose");
}).catch((err)=>{

    console.log(err);
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/InstaStay");

};

const validateListing=((req, res, next)=>{

    let{error}=listingSchema.validate(req.body);

    if(error){

        throw new ExpressError(400, error);
    }
    else{

        next();
    }

});

const validateReview=((req, res, next)=>{

    let{error}=reviewSchema.validate(req.body);

    if(error){
       
        throw new ExpressError(400, error);
    }
    else{

        next();
    }

});

app.get("/", (req,res)=>{

    res.send("this is trail page");
});

// view all listing route

app.get("/listings", wrapAsync(async(req,res, next)=>{
    
    let allListing=await Listing.find({});
    res.render("listings/index.ejs", {allListing});
}));

// new listing add route

app.get("/listings/new", (req,res)=>{

    res.render("listings/new.ejs");
});

app.post("/listings", validateListing, (req,res, next)=>{

    let{newlisting}=req.body;
    let addlisting=new Listing(newlisting);
    addlisting.save().then(()=>{

        console.log("saved successfully!!!!");
    }).catch((err)=>{

        next(err);
    });

    res.redirect("/listings");

});

// particular listing view route

app.get("/listings/:id", wrapAsync(async(req,res, next)=>{

    let{id}=req.params;

    let listing=await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", {listing});

}));

// listing update route

app.get("/listings/:id/edit", wrapAsync(async(req,res)=>{

    let{id}=req.params;
    
    let listing=await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});

}));

app.put("/listings/:id", validateListing, wrapAsync(async(req,res)=>{

    let{id}=req.params;
    let{newlisting}=req.body;
    
    await Listing.findByIdAndUpdate(id,{...newlisting},{ runValidators: true });
    res.redirect("/listings");
    
}));

// listing delete route

app.delete("/listings/:id", wrapAsync(async(req,res)=>{

    let {id}=req.params;

    let deleteListing=await Listing.findByIdAndDelete(id);
    console.log(deleteListing);

    res.redirect("/listings");

}));

// new reviews add route

app.post("/listings/:id/reviews",validateReview, wrapAsync(async(req, res, next)=>{

    let{id}=req.params;
    let{review}=req.body;
    let listing= await Listing.findById(id);
    let addReview=new Review(review);

    listing.reviews.push(addReview);
    await addReview.save();
    await listing.save();

    res.redirect(`/listings/${id}`);
}));

// delete reviews route

app.delete("/listings/:id/reviews/:reviewId", async(req, res, next)=>{

    let{id,reviewId}=req.params;

    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);

});

// error handling route

app.all("*", (req,res, next)=>{

    next(new ExpressError(400, "Page not found!!"));

});

app.use((err, req, res, next)=>{

    let{statusCode=500, message="something went wrong"}=err;

    res.render("listings/error.ejs", {message});
});













