import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";

// import { mobile } from "../pages/responsive";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/foot/Footer";
import { Button } from "reactstrap";
import Head from 'next/head'
import Newsletter from "../components/foot/Newsletter";
const Connect_With_Us = () => {
return(
    <>
      <Head>
        <title>Connect</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
          rel="stylesheet"
        />
      </Head>
    <Navbar/>
    <Container>
    <div style={{marginTop:'160px',marginLeft:'140px'}}>
    <h5 >CONTACT US</h5>
    </div>
    <Contact>
        <P>To become a partner email us at <strong>partners@pernia.pk</strong></P>
        <P>For any customer inquires, write our <strong>customercare@pernia.pk</strong></P>
    </Contact>
    <ButtonC>Connect on WhatsApp</ButtonC>
    </Container>
    {/* <Newsletter/> */}
    <Footer/>
    </>
)

}
export default Connect_With_Us;
const Container = styled.div`
    background-color:whitesmoke;
    margin-top:-68px;
    margin-bottom:20px;
  `;
  const Contact = styled.div`
  margin-left:170px;
  margin-top:70px;
  
`;
const ButtonC = styled.button`
  width:1000px;
  height:40px;
  background-color:green;
  margin-bottom:40px;
  color:white;
  margin-left:230px;
`;
const P= styled.div`
color:grey;
margin-bottom:50px;

`;