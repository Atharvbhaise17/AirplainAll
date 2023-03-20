const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    // flightNo airline  destination   dptime terminal gateNo
    flightNo : {                    
        type : String,
        require : true ,
        trim : true
    },

     airline : {
        type : String,
        require : true ,
        trim : true
    },

    destination : {
        type : String,
        require : true ,
        trim : true
    },

    dptime : {
        type : String,
        require : true ,
        trim : true
    },


    terminal : {
        type : String ,
        require : true 
    },

    gateNo : {
        type : String ,
        require : true 
    }


});


const User = mongoose.model("USER" , userSchema);


module.exports = User;