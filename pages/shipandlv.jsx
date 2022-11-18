import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";

// import { mobile } from "../pages/responsive";
import Link from "next/link";
import Head from 'next/head'
import Navbar from "../components/Navbar";
import Footer from "../components/foot/Footer";
import { Button } from "reactstrap";
import Newsletter from "../components/foot/Newsletter";
const ShipAndDlv = () => {
return(
    <>
      <Head>
        <title>Ship and Dlv</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
          rel="stylesheet"
        />
      </Head>
    <Navbar/>
    <Container1>
        <Img src='https://cdn.shopify.com/s/files/1/2337/7003/files/New_Project_8_256x256_crop_center.png?v=1623912436'></Img>
      <H>
      SHIPPING 
      </H>
        
        <P>
        We strive to deliver products purchased from Pernia in a highly specialized manner along with 
        ensuring that the outfit is sanitized, packed modestly, and is delivered at your doorsteps in the shortest 
        time possible.
        </P>
        <Img2 src='https://cdn.shopify.com/s/files/1/2337/7003/files/New_Project_9_256x256_crop_center.png?v=1623912436'></Img2>
        <H2>ZONE DIVISIONS</H2>
     <Div>
       
           <Icon>
             <P1>Zone1</P1>
             <P2>Australia</P2>
             <hr/>
             <Button1>More</Button1>
           </Icon>
           <Icon>
             <P1>Zone2</P1>
             <P2>Europe</P2>
             <hr/>
             <Button1>More</Button1>
           </Icon>
           <Icon>
             <P1>Zone3</P1>
             <P2>India</P2>
             <hr/>
             <Button1>More</Button1>
           </Icon>
           <Icon>
             <P1>Zone4</P1>
             <P2>Gulf</P2>
             <hr/>
             <Button1>More</Button1>
           </Icon> 
     </Div>
     <Img2 src='https://cdn.shopify.com/s/files/1/2337/7003/files/New_Project_10_256x256_crop_center.png?v=1623931521'></Img2>
        <H2>DELIVERY TIMELINE</H2>
      <SmallDiv>
      <Icon1>
         <P3>Luxury Pret</P3> 
         <P4>4-5 weeks</P4>
      </Icon1>
      <Icon1>
         <P3>Formals</P3> 
         <P4>6-8 weeks</P4>
      </Icon1>
      <Icon1>
         <P3>Bridals</P3> 
         <P4>8-12 weeks</P4>
      </Icon1>
      <Icon1>
         <P3>Unstitched</P3> 
         <P4>7 days</P4>
      </Icon1>
      </SmallDiv>
    </Container1>
    <Newsletter/>
    <Footer/>
    </>
)
}
export default ShipAndDlv;
const Icon= styled.div`
margin-right:30px;
background-color:whitesmoke;
width:600px;
height:180px;
margin-bottom:30px;   
  `;

const Icon1= styled.div`
margin-right:30px;
background-color:whitesmoke;
width:140px;
height:50px;
margin-bottom:30px;   
  `;
const Container1 = styled.div`
    background-color:white;
    margin-top:98px;
    
  `;
  const Div= styled.div`
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  margin-left:150px;
  margin-right:100px;
  
  `;
  const SmallDiv= styled.div`
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  margin-left:400px;
  margin-right:400px;
  justify-content:;
  
  `;
   const H2 = styled.div`
   color:black;
   font-weight:600px;
   font-size:24px;
   margin-top:10px;
   margin-bottom:30px;
   text-align:center;
   
   `;
   const H = styled.div`
   color:black;
   font-weight:700;
   font-size:20px;
   margin-top:10px;
   margin-bottom:20px;
   text-align:center;
   
   `;
    const P = styled.div`
    color:grey;

    justify-content:justify;
    width:800px;
    margin-left:auto;
    margin-right:auto;
    margin-bottom:20px;
    
    `;
     const P1 = styled.div`
    
     font-weight:600;
     margin-top:20px;
     width:800px;
    
     margin-right:270px;
     margin-left:280px;
     
     
     `;
      const P3 = styled.div`
    
      font-weight:600;
      margin-left:30px;
      margin-right:30px;
      width:800px;
      
      
      
      `;
       const P4 = styled.div`
    
       font-weight:400;
       margin-left:30px;
       margin-right:30px;
       width:600px;
       
       
       
       `;
      const P2 = styled.div`
      color:grey;
      text-align:center;
      font-weight:500
      width:800px;
      margin-left:auto;
      margin-right:auto;
      margin-bottom:20px;
      
      `;
     const Input = styled.input`
     
     padding:4px;
     border-radius:4px;
     border-style:groove;
     height:40px;
     margin-right:10px;
     margin-top:20px;
     margin-bottom:10px;
     
     `;
     const Select = styled.select`
     
     padding:4px;
     border-radius:4px;
     border-style:groove;
     height:40px;
     margin-top:20px;
     margin-bottom:10px;
     
     `;
     const Img = styled.img`
     
     margin-left:730px;
     margin-right:600px;
     height:50px;
     margin-top:20px;
     margin-bottom:10px;
     
     `;

const Img2 = styled.img`
     
margin-left:740px;
margin-right:600px;
height:50px;
margin-top:10px;
margin-bottom:10px;

`;

const Button1 = styled.button`
width:50px;
background-color:transparent;
color:black;
border-radius:4px;
padding:2px;
margin-left:280px;
margin-right:260px;

margin-top:10px;
`;