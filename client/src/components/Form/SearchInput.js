import React from 'react'
import { useSearch } from '../../context/Search.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SearchInput = () => {
  const [values, setValue] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`);
      setValue({ ...values, results: data })
      navigate("/search")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" background="red"
          value={values.keyword} onChange={(e) => setValue({ ...values, keyword: e.target.value })} />
        {/* <button className="btn btn-outline-success" type="submit" style={{ backgroundColor: 'white' }}>Search</button> */}
      </form>

    </div>
  )
}

export default SearchInput
