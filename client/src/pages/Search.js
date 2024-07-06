import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/Search'
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';



const Search = () => {
  const [values] = useSearch()
  const [cart, setCart] = useCart()
  return (
    <Layout title={"Seach results"}>
      <div className='container'>
        <div className="text-center">
          <h2>Search Result</h2>
          <h6>{values?.results.length < 1 ? 'No Product Found' : `Found ${values?.results.length}`}</h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: '18rem' }} >
                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top h-100" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  {/* <p className="card-text"> $ {p.price}</p> */}
                  {/* <button class="btn btn-primary ms-1">More Detail</button> */}
                  {/* <button class="btn btn-primary ms-1 center" onClick={()=>{setCart([...cart, p]);
                  localStorage.setItem("cart",JSON.stringify([...cart,p]));
                    toast.success('Item Added') }}>Add to Cart</button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Search
