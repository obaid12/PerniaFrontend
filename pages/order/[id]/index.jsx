import styled from "styled-components";
import Sidebar from "../../userProfile/Sidebar";

// import Footer from "../components/Footer";
import OrderProduct from "./OrderProduct";
import { useEffect, useState } from "react";
import {DataGrid} from "@material-ui/data-grid";
import React, { memo } from 'react';
import jwt_decode from 'jwt-decode';
import {  Button,Modal, ModalBody, ModalFooter ,ModalHeader, } from "reactstrap";
import axios from 'axios';
import { useRouter } from 'next/router';
import { DeleteOutline, Edit,EmailOutlined, Phone ,LocationCity, SettingsInputSvideoRounded} from '@material-ui/icons';
import {
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink,
  UncontrolledCollapse,
} from "reactstrap";
import Head from 'next/head'




const Index = () => {
 
  const router = useRouter();
  const { id } = router.query;
  const [radio, setRadiobtn] = useState({
    selected: '',
  });
  const [rows,setRows]=useState([])
  const [user_id,setUserId]=useState(null)
  const[detail,setDetail]=useState({
    
  })
  const[shipdetail,setShipDetail]=useState({
    user_address:'',
    country:'',
    city:'',
    postal_code:''
  })
  const[user,setUser]=useState({
    
  })
  const [s_id,setSId]=useState(null)
  
  
 
  
  useEffect(() => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    var decoded = jwt_decode(localStorage.getItem('token'));
  
    setUserId(decoded.result.id)
    axios.get(`http://localhsot:8080/ecom-api/orders/${id}`, config)
    .then(res=>{
      setDetail(res.data.data)
      setShipDetail(res.data.data.ship_details)
      console.log('order',res.data.data.products)

      setRows(res.data.data.products)
    }).catch(err=>console.log(err))    
    axios.get(`http://localhost:8080/ecom-api/users/${decoded.result.id}`, config)
    .then(res=>{
      setUser(res.data.data)
    }).catch(err=>console.log(err))    
  }, []);

  return (
    <Container>
        <Head>
        <title>Order</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Sidebar />
      <Address>Order Details</Address>
    <UserDiv>
    <OrderInfo>
     <h3 style={{margin:'4px'}}>Order Information</h3>
    </OrderInfo>
    <BuyerInfo>
     <Label>{user.first_name} {user.last_name}</Label>
     <Label>{user.email}</Label>  
     <Label>{user.phone}</Label> 
     <div style={{display:'flex',flexDirection:'row'}}><Label>Shippied at: </Label>
      <Label style={{marginLeft:'4px'}} >{shipdetail.user_address}</Label>
      </div> 
      <div style={{display:'flex',flexDirection:'row'}}>
       <h4 style={{marginTop:'8px'}}>Total Items:</h4>  
        <label style={{marginLeft:'10px',marginTop:'8px'}}>{detail.total_items}</label> 
      </div> 
      <div style={{display:'flex',flexDirection:'row'}}>
       <label style={{fontWeight:'600'}}>Total Amount:</label>  
       <label style={{marginLeft:'10px'}}>{detail.total_amount}</label> 
      </div> 
    </BuyerInfo>    
      
    <ProductInfo>
     <h3 style={{margin:'4px'}}>Products</h3>
    </ProductInfo>
    <ProductDetail>
     {rows.length===0?'': 
     <OrderProduct products={rows}/>}
    </ProductDetail>

    </UserDiv>   
      
      
    
    </Container>
  );
};

export default Index;

const Container = styled.div``;
const Details = styled.div``;
const Address = styled.div`
  margin-left: 550px;
  margin-top: 60px;
  font-size: 24px;
  font-weight: bold;
`;
const ImgCon = styled.div`
  /* margin-top: 30px;
  background-color: #f0f0f0ef;
  height: 46vh;
  position: fixed;
  width: 240px;
  border: 1px solid red; */
  display:flex;
  flex-direction: row;
  //align-content:space-between ;
  //margin: auto;
`;
const Image = styled.img`
   height:80px;
   /* margin-top: -20px; */
   margin-left: 80px;
   margin-right: -20px;
   background-color: grey;
  
`;
const P = styled.p`
color:green;
margin-top: -30px;
cursor:pointer;
font-size: 14px;
`
const Label = styled.div`
margin-top: 6px;
`
const OrderInfo = styled.div`
width:840px;
background-color:red ;
background-color: #f1ebebf6;
`
const ProductInfo = styled.div`
width:830px;
margin-top:40px;
background-color:red ;
background-color: #f1ebebf6;
`
const BuyerInfo = styled.div`
display: flex;
flex-direction: column;
margin-top: 8px;
margin-left: 10px;

`
const ImageArea = styled.div`
 height:85px;
 width:150px;
 background-color:#f1ebebf6;;
 margin-left:auto;
 margin-right: -10px;
 margin-top: -20px;
`;
const Input = styled.input`
 width:160px;
 height:20px;
 padding: 5px;
 text-align: center;
 border-style: 1px  grey;
 box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Form = styled.form`
  padding: 20px;
  /* display: flex;
  flex-wrap: wrap; */
  // background-color: red;
  /* flex-direction: column; */
  margin-top: -20px;
  margin-left:-20px ;
  width: 150px;
  /* -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75); */
  /* margin-left: 40px; */
`;
const ProductDetail = styled.div`

`

const UserDiv = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
   
   width:830px;
 
   box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  //flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 30px;
  /* -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75); */
  margin-left: 540px;
`;
const ShippingData = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;

  flex-direction: column;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 150px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin-left: 40px;
`;
const Title = styled.h1`
  margin: 20px;
  text-align: center;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const Productshow = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
