import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async(req,res,next) => {     //whenever we get request, next object  will validate and response will be send further
       try{
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);  //For token base pass the middleware requiredSignIn function after the test url and before the test controller,you can add many middleware in between, first import the function in route and then add the function in between
        req.user = decode; // we pass decode here to define/get the id   //decrypting here
        next();
       }
       catch(error){
        console.log(error);
       }       //execution will be pause if next is not there
};     //verify function used to compare, getting the token from headers, decoding using secret key from environment file

//Admin access
export const isAdmin = async(req,res,next) => {          //Callback Middleware function
       try{          //we async this function to compare user is admin or not
              const user = await userModel.findById(req.user._id) //finding user    //we passed the user in login controller //id comes from login Clontroller
              if(user.role !== 1){
                 res.status(401).send({
                     success:false,
                     message: "unauthorized access",
                 })   
              }
              else{
                     next();    //calling next funtion to continue further execution
              }
       }
       catch(error){
              console.log(error);
              res.status(401).send({
                     success:false,
                     error,
                     message:"error in admin middleware"
              })   
       }
}