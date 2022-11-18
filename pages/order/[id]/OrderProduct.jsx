import styled from "styled-components";
//import Sidebar from "../../userProfile/Sidebar";

// import Footer from "../components/Footer";
import { useEffect, useState } from "react";

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
import { DataGrid } from '@material-ui/data-grid'



const OrderProduct = (props) => {
 
  const router = useRouter();
  const { id } = router.query;
  const [radio, setRadiobtn] = useState({
    selected: '',
  });
  const [products,setProducts]=useState([])
  const [user_id,setUserId]=useState(null)
  const[detail,setDetail]=useState({
    
  })
  const[user,setUser]=useState({
    
  })
  const [s_id,setSId]=useState(null)
  
  
  const columns = [
    { field:"id", headerName: "ID", width: 140 },
    { field:"product_variant_id", headerName: "VID", width: 140 },
    { field: "product_name", headerName: " Name", width: 150 },
    { field: "product_variant_name", headerName: "Variant_Name", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 150 },
    {field:"path",headerName: "Image", width: 150 },
   { field: "sub_total", headerName: "SubTotal", width: 150 },
   
   
  ]
  
  useEffect(() => {
      var i=1
     props.products.map((item)=>{
        item['id']=i;
        item['sub_total']=item.price*item.quantity
        i++
     }) 
    setProducts(props.products)
      console.log('props',props.products)
  }, []);

  return (
    
     
      
    
    <DataGrid
    rows={products}
    disableSelectionOnClick
    columns={columns}
    pageSize={8}
    autoHeight={true}
    checkboxSelection 
 /> 
    
      
      
    
  
  );
};

export default OrderProduct;

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
width:840px;
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
