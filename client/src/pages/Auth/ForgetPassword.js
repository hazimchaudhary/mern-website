import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout.js'
import toast from 'react-hot-toast';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import "../../styles/AuthStyle.css";


const ForgetPassword = () => {
    const [email, setEmail] = useState("")
    const [newpassword, setNewPasswod] = useState("")
    const [answer,setAnswer]=useState("")
    const navigate = useNavigate();

    //Form Function

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forget-password`, { email, newpassword,answer });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message)
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something Went Wrong');
        }
    }

    return (
        <Layout title={'Forget Password - Ecommerce APP'}>
            <div className="form-container">
                <h1>RESET PASSWORD</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="email" value={email} className="form-control" id="exampleInputEmail1" placeholder='Entre Your Email' onChange={(e) => setEmail(e.target.value)} required />
                    </div> 
                    <div className="mb-3">
                        <input type="text" value={answer} className="form-control" id="exampleInputPassword1" placeholder='Entre Your Nick Name' onChange={(e) => setAnswer(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={newpassword} className="form-control" id="exampleInputPassword1" placeholder='Entre Your New Password' onChange={(e) => setNewPasswod(e.target.value)} required />
                    </div>
                   
                    <button type="submit" className="btn btn-primary" >RESET PASSWORD</button>
                </form>


            </div>
        </Layout>
    )
}

export default ForgetPassword
