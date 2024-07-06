import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd'
import { useNavigate,useParams } from 'react-router-dom';

const { Option } = Select



const UpdateProduct = () => {
    const navigate = useNavigate()
    const params=useParams()
    const [categories, setcategories] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [shipping,setShipping] = useState('')
    const [photo, setphoto] = useState('')
    const [category, setCategory] = useState("");
    const [id,setId]=useState("")


    //Get Single Product
    const getSingleProduct = async () => {
        try {
            const {data}=await axios.get(`http://localhost:8080/api/v1/product/getsinge-product/${params.slug}`)
            setName(data.product.name);
            setId(data.product._id)
            setDescription(data.product.description)
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setCategory(data.product.category._id)
            setShipping(data.product.shipping)
           
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
      getSingleProduct();    
      // eslint-disable-next-line  
    }, [])
    

    //Get All Category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/allcategory`)
            if (data.success) {
                setcategories(data.category)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something Went wrong in geting Category')
        }
    }
    useEffect(() => {
        getAllCategory();
    }, [])

    //Create Product 
    const handleUpdate=async  (e) => {
        e.preventDefault();
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            photo && productData.append("photo", photo)
            productData.append("category", category)
            const { data } = axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productData)
            if (data?.success) {
                toast.error(data.message)
            } else {
                
            }toast.success('Product Updated Successfully')
                navigate('/dashboard/admin/products')
        } catch (error) {
            console.log(error)
            toast.error('Something Went Wrong')
        }
    }

    // delete buttonhandle
    const handleDelete = async () => {
        try {
          let answer = window.prompt("Are You Sure want to delete this product ? ");
          if (!answer) return;
          const { data } = await axios.delete(
            `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
          );
          toast.success("Product DEleted Succfully");
          navigate("/dashboard/admin/products");
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };
    return (
        <Layout title={"Dashboard - Create Product"}>
            <div className="container.fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Product</h1>
                        <div className="m-1 w-75">
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                                value={category}
                            >
                                {categories.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label
                                    className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input type="file"
                                        name="Photo"
                                        accept='image/*'
                                        onChange={(e) => setphoto(e.target.files[0])} hidden>
                                    </input></label>
                            </div>
                            <div className="mb-3">
                                {photo ? (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)} alt="product_photo" height={'200px'}
                                            className="img img-responsive" />
                                    </div>
                                ): (
                                    <div className="text-center">
                                    <img  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}  alt="product_photo" height={'200px'}
                                        className="img img-responsive" />
                                </div> 
                                )}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="write a name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="write a description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="write a Price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="write a quantity"
                                    className="form-control"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping "
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                    value={shipping?"Yes":"No"}
                                >

                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className='btn btn-primary' onClick={handleUpdate}>
                                    Update Product
                                </button>
                            </div>
                            <div className="mb-3">
                                <button className='btn btn-danger' onClick={handleDelete}>
                                    Delete Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct
