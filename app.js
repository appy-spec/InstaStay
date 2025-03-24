if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}

const express= require("express");
const ejs=require("ejs");
const path=require("path");
const mongoose=require("mongoose");
const methodoverride=require("method-override");
const ejsmate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const wrapAsync= require("./utils/wrapAsync.js");
const Joi= require("joi");
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");

const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const passportLocalMongoose=require("passport-local-mongoose");
const User=require("./modals/user.js");

const app=express();
const port=3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsmate);

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodoverride("_method"));

// url for both mongo and mong-Atlas database

const mongo_url="mongodb://127.0.0.1:27017/InstaStay";
const dbUrl=process.env.ATLASDB_URL;

// this is used in mongo-connect or mongo session

const store= MongoStore.create({

    mongoUrl:dbUrl,
    crypto:{

        secret:process.env.SECRET,
    },
    touchAfter:24*3600,

});

store.on("error", ()=>{

    console.log("Error in mongo session store", err);
});

// this is used in express-session

const sessionOption={
    
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized: true,
    cookie:{
        
      expires:Date.now()+7*24*60*60*1000,
      maxAge:7*24*60*60*1000,
      httpOnly:true,
      
    }
};

app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// middleware for flash

app.use((req,res,next)=>{

    res.locals.success=req.flash("Success");
    res.locals.failure=req.flash("Failure");
    res.locals.currUser=req.user;
    next();
});

app.listen(port, ()=>{

    console.log("server is running on port 3000");
});

// this is for mongoose startup

main().then(()=>{

    console.log("successfully connect to mongoAtlas");
}).catch((err)=>{

    console.log(err);
});

async function main() {

  await mongoose.connect(dbUrl);

};

// this routes goes to routes files

app.use("/listings", listingRouter);

app.use("/listings/:id/reviews", reviewRouter);

app.use("/", userRouter); 

app.get("/", (req,res)=>{

    res.send("this is trail page");
});

// error handling route

app.all("*", (req,res, next)=>{

    next(new ExpressError(400, "Page not found!!"));

});

app.use((err, req, res, next)=>{

    let{statusCode=500, message="something went wrong"}=err;

    res.render("listings/error.ejs", {message});
});











