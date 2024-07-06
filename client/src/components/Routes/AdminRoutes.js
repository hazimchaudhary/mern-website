import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios"
import Spinner from "../Spinner";

export default function AdminRoute(){
    const[ok,setok]=useState(false)
    // eslint-disable-next-line
    const[auth,setAuth]=useAuth()

    useEffect(()=>{
        const authCheck=async()=>{
            const res=await  axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`)
            if (res.data.ok) {
                setok(true)
            }else{
                setok(false)
            }
        }
        if (auth?.token) authCheck()
    },[auth?.token])
    return ok ? <Outlet/> : <Spinner path="" />
}