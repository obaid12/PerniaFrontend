import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import Head from 'next/head'
// import { mobile } from "../pages/responsive";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/foot/Footer";
import { Button } from "reactstrap";
import Newsletter from "../components/foot/Newsletter";
const Blog = () => {
    return(
        <>
          <Head>
        <title>Blog</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
          rel="stylesheet"
        />
      </Head>
        <Navbar/>
        <Container>
            <div style={{display:'flex',flexDirection:'row'}}>
         <ImgWrap src='https://cdn.shopify.com/s/files/1/2337/7003/files/666_1500x.jpg?v=1646047765'>
         </ImgWrap>
           <Right>
             <H2>
                LAWN BRANDS YOU NEED
             </H2>
             <P>
            To request for an order cancellation please email us the order with product name, 
            original proof of purchase receipt and issue at customercare@laam.pk and our customer care agent will get in contact with you.
             Alternatively you can call us on +92 316 7776158 from Monday to Saturday between 10:00 am - 6:00 pm (Pakistan Standard Time). Further, to proceed with the case,
             your purchase should be sent back to us within 14 days of receiving your order.
             </P>
            </Right> 
         </div>
         <H2>EXPLORE</H2>
         <Flex>
             <Div>
                 
                <Img src='https://cdn.shopify.com/s/files/1/2337/7003/articles/7_Celebrities_Giving_Us_Fashion_Inspiration_in_HEM_1500x.jpg?v=1644396160'>
                </Img>
                <Text>
                  <Date>February 21, 2022</Date>
                  <Tag>These Lawn Brands is Exactly What You...</Tag>
                  <Name>By:Fatima Farooq</Name>
                  <Read>Continue Reading</Read>
                </Text> 
                
               </Div>
               <Div>
                <Img src='https://cdn.shopify.com/s/files/1/2337/7003/articles/Chic_Ways_to_Wear_Velvet_This_Winter_Season_1500x.jpg?v=1638338177'>
                </Img>
                <Text>
                <Date>December 30, 2021</Date>
                  <Tag>7 Celebrities Giving Us Fashion Inspi...</Tag>
                  <Name>By:Fatima Farooq</Name>
                  <Read>Continue Reading</Read>
                </Text> 
                
                </Div>
                <Div>
                <Img src='https://cdn.shopify.com/s/files/1/2337/7003/articles/Pakistani_Wedding_Traditions_1500x.jpg?v=1642511819'>
                </Img>
                <Text>
                <Date>January 19, 2022</Date>
                  <Tag>Pakistani Wedding Traditions; The Eve...</Tag>
                  <Name>By:Fatima Farooq</Name>
                  <Read>Continue Reading</Read>
                </Text> 
                </Div>
                <Div>
                <Img src='https://cdn.shopify.com/s/files/1/2337/7003/articles/Timeless_Pakistani_Suits_For_Every_Occasion_1500x.jpg?v=1640760688'>
                </Img>
                <Text>
                <Date>December 28, 2021</Date>
                  <Tag>Timeless Pakistani Suits For Every Oc..</Tag>
                  <Name>By:Fatima Farooq</Name>
                  <Read>Continue Reading</Read>
                </Text> 
                
             </Div>
         </Flex>
         </Container>
         <Newsletter/>
        <Footer/>
        </>
      
        
        
    )
}
export default Blog;


const Date= styled.div`
    font-weight:300;
    padding:10px;
    font-size:12px;
    color:grey;
    
  `;
  const Tag= styled.div`
  font-weight:700;
  font-size:28px;
  padding:6px;
  
  
`;
const Name= styled.div`
    font-weight:800;
    padding:6px;
    font-size:16px;
    color:grey;
   
    
  `;
  const Read= styled.div`
  font-weight:800;
  padding:6px;
  font-size:20px;
  
  margin-top:10px;
  
`;


const Container = styled.div`
    background-color:white;
    margin-top:98px;
    
  `;
  const Container2 = styled.div`
  background-color:white;

  
`;
const ImgWrap = styled.img`
 width:1000px;
  
`;
const ImgWrap2 = styled.img`
 height:170px;

`;
const Img= styled.img`
 height:390px;

`;
const Text= styled.div`
 height:180px;
 background-color:whitesmoke;

`;

const Div = styled.div`
display:flex;
flex-direction:column;
margin-bottom:40px;

`
const Flex = styled.div`
 display:flex;
 flex-direction:row;
 flex-wrap:wrap;
 margin-top:20px;
 margin-left:100px;
 margin-right:100px;
 justify-content:space-between;
 margin-bottom:20px;

`;
const H2=styled.div`
    text-align:center;
    font-weight:1000;
    font-size:38px;
    margin-top:40px;
    margin-left:40px;
    font-size:38px;
`
const P = styled.div`
 
  
  justify-content:justify;
  padding:18px;
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
  const Right= styled.div`

  background-color:whitesmoke;
 
      
    `;

    
         {/* <H2>OUR THREE EASY STEPS</H2>
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
        </Container2> */}