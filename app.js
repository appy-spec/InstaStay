const express= require("express");
const ejs=require("ejs");
const path=require("path");
const mongoose=require("mongoose");
const Listing=require("./modals/model.js");
const methodoverride=require("method-override");
const ejsmate=require("ejs-mate");

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

app.get("/", (req,res)=>{

    res.send("this is trail page");
});

app.get("/listings", async(req,res)=>{
    
    let allListing=await Listing.find({});
    res.render("listings/index.ejs", {allListing});
});

app.get("/listings/new", (req,res)=>{

    res.render("listings/new.ejs");
});

app.post("/listings", (req,res)=>{

    let{newlisting}=req.body;

    let addlisting=new Listing(newlisting);
    addlisting.save().then(()=>{

        console.log("saved successfully!!!!");
    }).catch((err)=>{

        console.log(err);
    });

    res.redirect("/listings");

});

app.get("/listings/:id", async(req,res)=>{

    let{id}=req.params;

    let listing=await Listing.findById(id);
    res.render("listings/show.ejs", {listing});

});

app.get("/listings/:id/edit", async(req,res)=>{

    let{id}=req.params;
    
    let listing=await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});

});

app.put("/listings/:id", async(req,res)=>{

    let{id}=req.params;
    let{newlisting}=req.body;
    
    await Listing.findByIdAndUpdate(id,{...newlisting},{ runValidators: true });
    res.redirect("/listings");
    
});

app.delete("/listings/:id", async(req,res)=>{

    let {id}=req.params;

    let deleteListing=await Listing.findByIdAndDelete(id);
    console.log(deleteListing);

    res.redirect("/listings");

});









