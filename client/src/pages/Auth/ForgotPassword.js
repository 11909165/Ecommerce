import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from "axios"
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";
import {useNavigate} from "react-router-dom"  

const ForgotPassword = () => {

    const[email,setEmail] = useState("")    
    const[newPassword,setNewPassword] = useState("")   
    const[answer,setAnswer] = useState("")   
    const navigate = useNavigate()

  
  
    //Form Function
    const handleSubmit = async(e) => {
      e.preventDefault();
      try{
              const res = await axios.post("/api/v1/auth/forgot-password",
              {email,
                newPassword,
                answer});
              if(res && res.data.success){                  //getting message from authController registerCobtroller success 
                toast.success(res.data && res.data.message);
            
                navigate("/login");
              }
              else{
                toast.error(res.data.message);
              }
      }
      catch(error){
        console.log(error);
        toast.error("Something went wrong");
      }
  };
  


  return (
    <Layout title={"Forgot Password - Ecommerce App"}>
    <div className="form-container">
      <h1>Reset Password</h1>
      <form onSubmit = {handleSubmit}>
    <div className="mb-3">
        <input type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        className="form-control" 
        placeholder="Enter your E-mail" 
        id="exampleInputEmail1"  
        required/>
    </div>
    <div className="mb-3">
        <input type="text" 
        value={answer} 
        onChange={(e) => setAnswer(e.target.value)} 
        className="form-control" 
        placeholder="Enter your Favourite Subject" 
        id="exampleInputEmail1"  
        required/>
    </div>
    <div className="mb-3">
        <input type="password" 
        value={newPassword} 
        onChange={(e) => setNewPassword(e.target.value)} 
        className="form-control" 
        placeholder="Enter New Password" 
        id="exampleInputPassword1" 
        required/>
    </div>

    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
    </Layout>
  )
}

export default ForgotPassword;