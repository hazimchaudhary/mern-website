import React from "react";
import Layout from "./../components/Layout/Layout";
import Aboutpic from "../pic/about1.jpg";
import './About.css'; // Import your CSS file for the About component.

const About = () => {
  return (
    <Layout title={"About us - Ecommerce app"}>
      <div className="about-container">
        <img
          src={Aboutpic}
          alt="About Us"
          className="background-image"
        />
        <div className="text-container col-4" style={{ marginTop: '100px', marginRight: '30px' }}>
          <p className="text-content">
            <b style={{ color: '#EE1C25' }}>SMART RACING WEARS</b> is specialized in exporting Motor Bike Wear. Our main products are Motor bike Cordura Jacket, Cordura trousers, Motor bike Boot, and Gloves, and Waterproof Jackets. At the same time, we can design and manufacture based on the customer's requirement.
            <br />
            If you are interested in the price list, samples, do not hesitate and feel free to contact us. We hope to have many opportunities to serve you and have a long-term business in trade with you in the future.
            <br />
            We will surely appreciate your kind inquiries and orders.
            <br /><br />
            <b style={{ color: '#EE1C25' }}>SMART RACING WEARS</b> are aiming to provide a better and safer place for our team. Trying to educate and improve their quality of life. Aiming to give them a better future and a prosperous life.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
