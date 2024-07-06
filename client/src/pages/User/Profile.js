import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

import { useAuth } from '../../context/auth'

const Profile = () => {
    const [auth] = useAuth()
    return (
        <Layout title={'Your Profile'}>
            <div className="conatine-fluid p-3 m-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Your Profile</h1>
                        <div className="card w-75 p-3">
                            <h3>Name : {auth?.user?.name}</h3>
                            <h3>Email : {auth?.user?.email}</h3>
                            <h3>Address : {auth?.user?.address}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
