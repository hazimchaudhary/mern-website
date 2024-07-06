import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout.js'
import toast from 'react-hot-toast';
import { useNavigate, useLocation, } from 'react-router-dom';
import axios from 'axios';
import "../../styles/AuthStyle.css";
import { useAuth } from '../../context/auth.js';


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPasswod] = useState("")
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation()
    //Form Function

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem("auth", JSON.stringify(res.data));

                navigate(location.state || "/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something Went Wrong');
        }
    }

    return (
        <Layout title={'Sign Up - Ecommerce App'}  >
            <div className="form-container" >
                <h1 >LOGIN-FORM</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="email" value={email} className="form-control" id="exampleInputEmail1" placeholder='Entre Your Email' onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={password} className="form-control" id="exampleInputPassword1" placeholder='Entre Your Password' onChange={(e) => setPasswod(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        {/* <button type="submit" className="btn btn-primary" onClick={()=>{navigate('/forget-password')}}>Forget Password</button> */}
                    </div>
                    <button type="submit" className="btn btn-primary">LOGIN</button>
                </form>


            </div>
        </Layout>
    )
}

export default Login
