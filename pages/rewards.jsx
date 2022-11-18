import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/foot/Footer";
import { Button } from "reactstrap";
import Newsletter from "../components/foot/Newsletter";
import Head from 'next/head'
const Rewards = () => {
    return(
        <>
          <Head>
        <title>Rewards</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
          rel="stylesheet"
        />
      </Head>
        <Navbar/>
        <Container>
         <Flex>
             <Icon>
              <Img src='https://cdn.shopify.com/s/files/1/2337/7003/files/New_Project_26.png?v=1628161929'>
              </Img>
              <H>
              Rewards & Cashback
           
              </H> 
              <H2>
              Shop. Earn. Redeem.
              </H2>
             </Icon>
           <Icon>
             <H>About Rewards</H>
             <P>PERNIA rewards are there to make sure your journey of navigating our breadth of brands is always fruitful, fun and meaningful.</P>
             <P>
             Earn rewards on everyday purchases and by completing actions. Then use these points to get discounts on your next purchases.
               </P>
               <P>
               We aim to be your one stop shop for all fashion needs and this is our way of thanking you for sticking with us 
                 </P>          
           </Icon>
         </Flex>
        </Container>
        <Newsletter/>
        <Footer/>

        </>
    )
}
export default Rewards;
const Container = styled.div`
    background-color:white;
    margin-top:98px;
    margin-bottom:90px;
  `;

const Img = styled.img`
 margin-left:160px;
 height:130px;

`;
const H = styled.h3`
color:black;
text-align:center;
`;

const P = styled.div`
color:black;
text-align:center;
margin-left:50px;
margin-top:20px;
`;


const H2 = styled.h4`
color:black;
text-align:center;

`;
  const Flex = styled.div`
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  margin-left:200px;
  margin-right:200px;
  margin-top:140px;
 `;

const Icon= styled.div`
margin-right:30px;
background-color:white;
width:500px;
height:250px;   
  `;