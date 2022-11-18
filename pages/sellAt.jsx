import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";

// import { mobile } from "../pages/responsive";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/foot/Footer";
import Head from 'next/head'
import { Button } from "reactstrap";
import Newsletter from "../components/foot/Newsletter";
const SellAt = () => {
    return(
        <>
          <Head>
        <title>Sell At</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
          rel="stylesheet"
        />
      </Head>
        <Navbar/>
        <Container>
         <ImgWrap src='https://cdn.shopify.com/s/files/1/2337/7003/files/Cover-Desktop_1_1500x.progressive.jpg?v=1629117255'>
         </ImgWrap> 
         <H2>OUR THREE EASY STEPS</H2>
         <Flex>
             <div>
         <ImgWrap2 src='https://cdn.shopify.com/s/files/1/2337/7003/files/1_06259c75-4952-4d24-af55-b7a39e6a7b98_400x.png?v=1628769113'>
         </ImgWrap2>
         <P>Fill the Form</P>
         </div>
         <div>
         <ImgWrap2 src='https://cdn.shopify.com/s/files/1/2337/7003/files/2_3b342d5c-ac3b-4ce9-9313-866b9838603a_400x.png?v=1628769113'>
         </ImgWrap2>
         <P>Qualifying Process</P>
         </div>
         <div>
         <ImgWrap2 src='https://cdn.shopify.com/s/files/1/2337/7003/files/3_1_400x.png?v=1628769113'>
         </ImgWrap2>
         <P>Start Selling</P>
         </div>
  
         </Flex>
         <Button1>Sign Up Now</Button1>
        </Container>
        <Container2>
         <Flex2>
         <Icon>
         <img style={{marginLeft:'150px'}} height='60px' src='https://cdn.shopify.com/s/files/1/2337/7003/files/7_200x.png?v=1629117487'></img> 
         <h4 style={{textAlign:'center',marginTop:'30px'}}>Nationwide Network</h4>
         <P>We have one of the biggest nationwide ecommerce operations</P>
         </Icon>
         <Icon>
         <img style={{marginLeft:'150px'}}  height='60px' src='https://cdn.shopify.com/s/files/1/2337/7003/files/5_200x.png?v=1629117600'></img> 
         <h4 style={{textAlign:'center',marginTop:'30px'}}>Easy Payment</h4>
         <P>LAAM pays sellers conveniently via IBFT on mutually agreed credit days whenever their product is sold through our website.</P>
         </Icon>
         <Icon>
         <img style={{marginLeft:'150px'}}  height='60px' src='https://cdn.shopify.com/s/files/1/2337/7003/files/3_d1ebfe34-37e4-496b-bb7a-43dd38e77d2c_200x.png?v=1629117853'></img> 
         <h4 style={{textAlign:'center',marginTop:'30px'}}>Delivery Option</h4>
         <P>You have the choice to deliver your products to the customers yourself or let LAAM manage the delivery of the orders to customers.</P>
         </Icon>
         </Flex2>
        </Container2>
        <Newsletter/>
        <Footer/>
        </>
    )
}
export default SellAt;

const Container = styled.div`
    background-color:whitesmoke;
    margin-top:98px;
    
  `;
  const Container2 = styled.div`
  background-color:white;

  
`;
const ImgWrap = styled.img`
 
  
`;
const ImgWrap2 = styled.img`
 height:170px;

`;

const Flex2 = styled.div`
display:flex;
flex-direction:row;
margin-left:200px;
margin-right:200px;
`
const Flex = styled.div`
 display:flex;
 flex-direction:row;
 margin-top:20px;
 margin-left:500px;
 margin-right:500px;
 margin-bottom:20px;

`;
const H2=styled.div`
    text-align:center;
    font-weight:1000px;
    font-size:38px;
`
const P = styled.div`
 
  text-align:center;
`;
const Button1 = styled.button`
  width:200px;
  background-color:black;
  color:white;
  padding:10px;
  margin-left:700px;
  margin-right:700px;
  margin-bottom:30px;
  margin-top:20px;
`;

const Icon= styled.div`
margin-right:30px;
background-color:whitesmoke;
width:800px;
height:250px; 
    
  `;