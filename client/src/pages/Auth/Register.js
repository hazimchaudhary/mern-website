import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import "../../styles/AuthStyle.css";


const Register = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPasswod]=useState("")
    const [phone,setPhone]=useState("")
    const [address,setAddress]=useState("")
    const [answer,setAnswer]=useState("");
    const navigate=useNavigate()

    //Form Function
   
    const handleSubmit = async (e) => {
        e.preventDefault();
       try {
        const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address,answer});
        if (res && res.data.success) {
            toast.success(res.data && res.data.message)
            navigate('/login');
        }else{
            toast.error(res.data.message)
        }
       } catch (error) {
        console.log(error);
        toast.error('Something Went Wrong');

    }
    }
    return (
        <Layout title={'Sign Up - Ecommerce App'}>
            <div className="form-container">
                <h1>REGISTER PAGE</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" value={name} className="form-control" id="exampleInputEmail1" placeholder='Entre Your Name' onChange={(e)=>setName(e.target.value)} required/>
                    </div>
                    <div className="mb-3">                     
                        <input type="email" value={email} className="form-control" id="exampleInputEmail1"  placeholder='Entre Your Email' onChange={(e)=>setEmail(e.target.value)} required/>
                    </div>
                    <div className="mb-3">                        
                        <input type="password" value={password} className="form-control" id="exampleInputPassword1" placeholder='Entre Your Password' onChange={(e)=>setPasswod(e.target.value)} required/>
                    </div>
                    <div className="mb-3">                      
                        <input type="text" value={phone} className="form-control" id="exampleInputEmail1" placeholder='Entre Your Phone'  onChange={(e)=>setPhone(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <input type="text" value={address} className="form-control" id="exampleInputEmail1" placeholder='Entre Your Address'  onChange={(e)=>setAddress(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <input type="text" value={answer} className="form-control" id="exampleInputEmail1" placeholder='What is Your Nick Name'  onChange={(e)=>setAnswer(e.target.value)} required/>
                    </div>
                    <button type="submit" className="btn btn-primary">REGISTER</button>
                </form>


            </div>
        </Layout>

    )

}
export default Register
