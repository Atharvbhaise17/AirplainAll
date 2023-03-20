const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./model/userSchema");


const OPENAI_API_KEY = "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";
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
app.use(cors());

app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({
    message: "pong",
  });
});
app.post("/chat", (req, res) => {
  const question = req.body.question;

  openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: question,
      max_tokens: 4000,
      temperature: 0,
    })
    .then((response) => {
      console.log({ response });
      return response?.data?.choices?.[0]?.text;
    })
    .then((answer) => {
      console.log({ answer });
      const array = answer
        ?.split("\n")
        .filter((value) => value)
        .map((value) => value.trim());

      return array;
    })
    .then((answer) => {
      res.json({
        answer: answer,
        propt: question,
      });
    });
  console.log({ question });
});







const DB = "mongodb+srv://Shopisy:7588222499@cluster0.ktxlsew.mongodb.net/Airdetails?retryWrites=true&w=majority" 

mongoose.connect(DB).then(()=>{
    console.log("connection successfull");
}).catch((err) => console.log(err));

app.use(express.json());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
 }));

 app.use(require("./router/auth"))

const middleware = (req,res,next) =>{
    console.log('hello my middleware') ;
    next();
}



app.get('/' ,(req,res)=>{
    res.send("hello atharv this side");
 })

 app.get('/getAllUser' ,async (req,res)=>{
    try{
      const allUser = await User.find({});
      res.send({status:"ok ", data :allUser})
    }catch(error){
        console.log(error);
    }
 })



//  app.post("/register" ,async (req,res)=>{

//     const {flightNo ,airline , destination ,  dptime ,terminal ,gateNo} = req.body ;
    
//     // if(!flightNo  || !airline  ||  !destination   ||  !dptime  || !terminal ||  !gateNo){
//     //     return res.json({error : "plzz fill all the details"}); 
//     // }

//     const user = new User({flightNo ,airline , destination ,  dptime ,terminal ,gateNo}) ;

//    const registerUser = await  user.save() ;
   
//    if(registerUser){
//     res.status(201).json({message: "user submmited successfully "});
//    }else{
//     res.status(500).json({error : "failed to submit"})
//    }
// });

//  app.get("/web2" ,(req,res)=>{
//     res.send("hello atharv web2 side");
//  })

//  app.get("/web3" ,(req,res)=>{
//     res.send("hello atharv web3 side");
//  })





 console.log("subscribe");

 app.listen(8000 , ()=>{
    console.log(`connection is successful at 8000 `);
})


