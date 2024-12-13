const mongoose=require("mongoose");
const Listing=require("../modals/model.js");
const sampleListings=require("./data.js");

main().then(()=>{

    console.log("successfully start mongoose");
}).catch((err)=>{

    console.log(err);
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/InstaStay");

};

const initDB=async()=>{

    await Listing.insertMany(sampleListings.data);
    console.log("data was initialized");
};

initDB();


