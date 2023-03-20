const express = require("express");
const router = express.Router() ;
const User  = require("../model/userSchema")

router.get('/',(req,res)=>{
    res.send(User.find({}));
 })

router.post("/register" ,async (req,res)=>{

    const {flightNo ,airline , destination ,  dptime ,terminal ,gateNo} = req.body ;
    
    // if(!flightNo  || !airline  ||  !destination   ||  !dptime  || !terminal ||  !gateNo){
    //     return res.json({error : "plzz fill all the details"}); 
    // }

    const user = new User({flightNo ,airline , destination ,  dptime ,terminal ,gateNo}) ;

   const registerUser = await  user.save() ;
   
   if(registerUser){
    res.status(201).json({message: "user submmited successfully "});
    router.route('/web2');
   }else{
    res.status(500).json({error : "failed to submit"})
   }
});

 module.exports = router ;
