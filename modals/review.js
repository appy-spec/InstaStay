const mongoose=require("mongoose");

const reviewSchema=new mongoose.Schema({

    rating:{

        type:Number
    },    
    comment:{

        type:String
    },
    createAt:{
       
        type:Date,
        default:Date()
    }

});

const Review= mongoose.model("Review", reviewSchema);

module.exports=Review;