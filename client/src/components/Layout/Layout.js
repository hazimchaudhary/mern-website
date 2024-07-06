import React from 'react'
import Footer from '../Layout/Footer.js'
import Header from '../Layout/Header.js'
import { Helmet } from 'react-helmet';
import  { Toaster } from 'react-hot-toast';


const Layout = ({ children, title, description, keyword, author }) => {
  return (
    <div>
      <Header />
      <Helmet>
        
          <meta charset="UTF-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keyword} />
          <meta name="author" content={ author} />
      
        <title>{title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <main style={{ minHeight: '74vh' }}>
      <Toaster />
        {children}</main>
      <Footer />
    </div>
  )
}
Layout.defaultProps={
  title:"Ecommerce app -show now",
  description:'MERN Stack Project',
  keyword:"Mern,React Js,Node,Mongodb",
  author:"Usama Malik"
}

export default Layout
