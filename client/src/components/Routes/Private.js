import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios"
import Spinner from "../Spinner";

export default function PrivateRoute(){
    const[ok,setok]=useState(false)
    const[auth]=useAuth()

    useEffect(()=>{
        const authCheck=async()=>{
            const res=await  axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`)
            if (res.data.ok) {
                setok(true)
            }else{
                setok(false)
            }
        }
        if (auth?.token) authCheck()
    },[auth?.token])
    return ok ? <Outlet/> : <Spinner/>
}