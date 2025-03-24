const mongoose=require("mongoose");
const { Schema } = mongoose;
const Review=require("./review.js");

const listingData=new mongoose.Schema({

    title:{

        type:String,
        required:true
    },
    description:{

        type:String
    },
    image:{
        
        filename:{

            type:String,
        },    
        url:{
            
            type:String,
            default:"https://res.cloudinary.com/dtnurxivv/image/upload/v1742463839/InstaStay_Dev/jh1xjuqlipdnd3rd1yzh.jpg",
            set:(v)=>v===""?"https://res.cloudinary.com/dtnurxivv/image/upload/v1742463839/InstaStay_Dev/jh1xjuqlipdnd3rd1yzh.jpg":v,
        }    

    },
    price:{

        type:Number
    },
    location:{

        type:String
    },
    country:{

        type:String
    },

    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],

    owner:{

        type:Schema.Types.ObjectId,
        ref:"User"
    },
    geometry:{

        type: {

          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true

        },
        coordinates: {

          type: [Number],
          required: true
          
        }
    },

});

listingData.post("findOneAndDelete", async(listing)=>{
    
    if(listing){

        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});

const Listing= mongoose.model("Listing", listingData);

module.exports=Listing;


