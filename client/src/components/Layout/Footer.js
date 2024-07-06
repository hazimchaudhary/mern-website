import React from 'react';
import { Link } from 'react-router-dom';
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import { AiOutlineShop } from 'react-icons/ai';

const Footer = () => {

  const lightColorStyle = { color: '#808080' };
  return (
   <> <div className='Footer bg-dark text-white'>
      <div className="container text-center">
        <div className="row">
          <div className="col-md-3">
            <h6 className="text-uppercase fw-bold mb-4">About SMART RACING WEARS</h6>
            <p style={lightColorStyle}>
              We provide the best Motorbike Accessories all over the world. We are the world's best Manufacturer and Exporter. Stop by today. Our talented staff will be happy to serve you and find what you're searching for.
            </p>
          </div>
          <div className="col-md-3">
            <h6 className="text-uppercase fw-bold mb-4">USEFUL LINKS</h6>
            <Link to='/' className="text-white"><text style={lightColorStyle}>Home</text></Link><br /><br />
            <Link to='/about' className="text-white"><text style={lightColorStyle}>About Us</text></Link><br /><br />
            <Link to='/contact' className="text-white"><text style={lightColorStyle}>Contact Us</text></Link><br /><br />
          </div>
          <div className="col-md-3">
            <h6 className="text-uppercase fw-bold mb-4">OFFICE</h6>
            <p style={lightColorStyle}><AiOutlineShop /> Sialkot, Punjab, Pakistan</p>
            <p style={lightColorStyle}><BiMailSend /> Sales.davidsports@gmail.com</p>
            <p style={lightColorStyle}><BiPhoneCall /> +79 014 096 422</p>
          </div>
          <div className="col-md-3">
            <h6 className="text-uppercase fw-bold mb-4">OUR Location</h6>
            <img src="https://grandprix.qodeinteractive.com/wp-content/uploads/2019/09/footer-img-5-300x171.png" alt="Location" className="img-fluid" />
          </div>
        </div>
      </div>
      <h4 className='text-center pt-3'>All Right Reserved by &copy; David bikegear Developed by Usama Malik</h4>
     
    </div> 
    </>
  );
}

export default Footer;
