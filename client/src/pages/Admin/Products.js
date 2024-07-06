import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import Toast from 'react-hot-toast'
import { NavLink } from 'react-router-dom'


const Products = () => {
  const [products, setProducts] = useState([])


  //Get All Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`)
      setProducts(data.products)
    } catch (error) {
      console.log(error)
      Toast.error('Something Went Wrong')
    }
  }

  // lifeCycle Method
  useEffect(() => {
    getAllProducts();
  }, [])

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className='text-center '>All Product List</h1>
          <div className="d-flex flex-wrap h-100">
            {products?.map(p => (
              <NavLink key={p._id} to={`${process.env.REACT_APP_API}/dashboard/admin/products/${p.slug}`}
                className='product-link'>
                <div className="card m-2 h-100" style={{ width: '18rem', height: '18rem' }} >
                  <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top h-100" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </NavLink>

            ))}</div>

        </div>
      </div>
    </Layout>
  )
}

export default Products
