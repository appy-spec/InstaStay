const mongoose=require("mongoose");
const { Schema } = mongoose;

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
            default:"https://img.freepik.com/free-photo/travel-concept-with-baggage_23-2149153260.jpg?t=st=1732821304~exp=1732824904~hmac=32cae5a501a9c99fafb4bdd965b79bf14a5cde0814af0858f05e33f8c55d2f2a&w=826",
            set:(v)=>v===""?"https://img.freepik.com/free-photo/travel-concept-with-baggage_23-2149153260.jpg?t=st=1732821304~exp=1732824904~hmac=32cae5a501a9c99fafb4bdd965b79bf14a5cde0814af0858f05e33f8c55d2f2a&w=826":v,
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
    ]

});

const Listing= mongoose.model("Listing", listingData);

module.exports=Listing;


