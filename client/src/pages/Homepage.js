import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { Checkbox, Radio } from "antd";
import { Prices } from '../components/Prices';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import axios from 'axios';
import banner from '../pic/bannerr.jpeg'
import bike from '../pic/bike.jpg'
import bike1 from '../pic/bike1.jpg'
import gloves from '../pic/gloves.png'
import jacket from '../pic/jacket.png'
import pant from '../pic/pant.png'
import center2 from '../pic/center2.jpg'
import "../styles/AuthStyle.css"
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import { Carousel, Container, Row, Col } from 'react-bootstrap';

const Homepage = () => {

  const [cart, setCart] = useCart()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);



  //Get All Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/allcategory`)
      if (data?.success) {
        setCategories(data.category)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, [])

  //Get All Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      setLoading(false);
      setProducts(data?.products)
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length)
      getAllProducts();
  }, [checked.length, radio.length])

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();

  }, [checked, radio])

  //get Filter Products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`http://localhost:8080/api/v1/product/product-filters`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  //yet not working
  useEffect(() => {
    if (page === 1) return;
    loadMore();

  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  return (
    <Layout title={'All Product - Best Offers'}>
      {/* banner image */}
      <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={bike} alt="Product 1" className='d-block w-100' />
          </div>
          <div class="carousel-item">
            <img src={bike1} alt="Product 2" className='d-block w-100' />
          </div>
          <div class="carousel-item">
            <img src={banner} alt="Product 3" className='d-block w-100' />
          </div>
          <div class="carousel-item">
            <img src={bike1} alt="Product 4" className='d-block w-100' />
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>


      <div >
        <div className="row">
          <div className="col-md-3 mb-3">
            <img src={gloves} alt="Product 1" className="img-fluid" />
          </div>
          <div className="col-md-3 mb-3">
            <img src={jacket} alt="Product 2" className="img-fluid" />
          </div>
          <div className="col-md-3 mb-3">
            <img src={pant} alt="Product 3" className="img-fluid" />
          </div>
          <div className="col-md-3 mb-3">
            <img src={gloves} alt="Product 4" className="img-fluid" />
          </div>

        </div>




        <div class="container">
          <div class="row">
            <div class="col-6 text-center" style={{ alignSelf: 'center' }}>
              {/* <h1 class="text ">About</h1> */}
              <h1 class="text ">SMART RACING WEARS</h1>
              <text>"Our loyal customer base exemplifies the profound trust they place in our brand. Their unwavering faith inspires us to consistently deliver exceptional products and services. With each purchase, they experience not just satisfaction, but also a genuine sense of contentment. Our commitment to quality and reliability has forged an unbreakable bond with our customers, fostering enduring relationships built on integrity and excellence. Their trust is not merely earned but consistently reinforced with every interaction, making us proud of the enduring partnerships we have established. Their unshakable belief in us serves as the cornerstone of our success, propelling us forward with unwavering dedication to their continued satisfaction."
              </text>
            </div>
            <div class="col-6">
              <img src={gloves} alt="Product 4" className="img-fluid" />

            </div>
          </div>
        </div>




        <br />
        {/* <div className="col-md-7" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
          <img src={center2} alt="Product 4" className="img-fluid" />
        </div>  */}
        </div>

      <div className="row m-3">
        <div className="col-md-3 ">
          <h4 className='text-center'>Filters By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div> */}
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          {/* {JSON.stringify(checked,null,4)}
          {JSON.stringify(radio,null,4)} */}
          <h1 className='text-center' style={{ backgroundColor: 'white' }}>All products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2 " style={{ width: '18rem', height: '25rem' }} >
                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top h-100" style={{ width: '18rem', height: '10rem' }} alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  {/* <p className="card-text"> $ {p.price}</p> */}
                  {/* <button class="btn btn-primary ms-1">More Detail</button> */}
                  {/* <button class="btn btn-primary ms-1 center" onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success('Item Added')
                  }}>Add to Cart</button> */}
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Homepage
