const Listing=require("../modals/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const geocodingClient = mbxGeocoding({ accessToken:process.env.MAP_TOKEN });

// show all listing controller

module.exports.index=async(req,res, next)=>{
    
    let allListing=await Listing.find({});
    res.render("listings/index.ejs", {allListing});
}; 

// add new listing

module.exports.renderNewForm=(req,res,next)=>{

    res.render("listings/new.ejs");
};

module.exports.addListing=async(req,res, next)=>{
    
    let address=req.body.newlisting.location+","
                +req.body.newlisting.country;

    let geoCode=await geocodingClient.forwardGeocode({
        query: address,
        limit: 1
      })
      .send()
    
    let{newlisting}=req.body;
    newlisting.owner=req.user._id;
    newlisting.geometry=(geoCode.body.features[0].geometry);
    
    if(typeof req.file!=="undefined"){

        let url=req.file.path;
        let filename=req.file.filename;
        newlisting.image={url, filename};

    } 

    let addlisting=new Listing(newlisting);
    await addlisting.save();
    
    req.flash("Success", "New listing created !!");
    res.redirect("/listings");

};

// show a particular listing

module.exports.showListing= async(req,res, next)=>{

    let{id}=req.params;

    let listing=await Listing.findById(id)
        .populate({ 
            path:"reviews",
            populate:{
                path:"author",
            }
        }).populate("owner");

    if(!listing){

        req.flash("Failure","Requested listing doesnot exit !!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});

};

//edit the listing

module.exports.renderEditFrom=async(req,res)=>{

    let{id}=req.params;
    
    let listing=await Listing.findById(id);
    let originalUrl=listing.image.url;
    
    originalUrl=originalUrl.replace("upload","upload/h_166,w_250");
    res.render("listings/edit.ejs", {listing, originalUrl});
};

module.exports.updateListing=async(req,res)=>{

    let{id}=req.params;
    let{newlisting}=req.body;
    let listing=await Listing.findByIdAndUpdate(id,{...newlisting},{ runValidators: true });
    
    if(typeof req.file!=="undefined"){

        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url, filename};
        await listing.save();
    }
    
    req.flash("Success", "Listing is updated !!");
    res.redirect("/listings");

};

// delete the listing

module.exports.deleteListing=async(req,res)=>{

    let {id}=req.params;

    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");

};
