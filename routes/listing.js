const express=require("express");
const router=express.Router();
const listingController=require("../controllers/listing.js");

const wrapAsync= require("../utils/wrapAsync.js");
const {listingSchema} =require("../validateSchema.js");
const {isLogedIn, isOwner} =require("../middleware.js");

const multer  = require('multer');
const {storage} =require("../cloudConfig.js");
const upload = multer({storage});

const validateListing=((req, res, next)=>{

    let{error}=listingSchema.validate(req.body);

    if(error){

        throw new ExpressError(400, error);
    }
    else{

        next();
    }

});

// view all listing route

router.get("/", 
    wrapAsync(listingController.index)
);

// new listing add route

router.get("/new",
    isLogedIn, 
    listingController.renderNewForm
);

router.post("/", 
    upload.single("newlisting[image]"),
    validateListing, 
    listingController.addListing
);

// particular listing show route

router.get("/:id", 
    wrapAsync(listingController.showListing)
);

// listing update route

router.get("/:id/edit",
    isLogedIn,
    isOwner, 
    wrapAsync(listingController.renderEditFrom)
);

router.put("/:id",
    upload.single("newlisting[image]"),
    validateListing, 
    wrapAsync(listingController.updateListing)
);

// listing delete route

router.delete("/:id", 
    isLogedIn, 
    isOwner, 
    wrapAsync(listingController.deleteListing)
);

module.exports=router;