const mongoose=require("mongoose");
const { Schema } = mongoose;

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
    },
    author:{

        type:Schema.ObjectId,
        ref:"User"
    }

});

const Review= mongoose.model("Review", reviewSchema);

module.exports=Review;