import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
  } from "@material-ui/icons";
  import styled from "styled-components";
  import Link from "next/link";
  import { useEffect, useState } from 'react';
//   import StripeCheckout from 'react-stripe-checkout';
  import axios from "axios";
  import {  Spinner } from 'react-bootstrap'
//   import 'bootstrap/dist/css/bootstrap.css';
  
  const Load = () => {
    
    return (
  
  
     <Loader/>
          
                //    <Spinner
                //    as="span"
                //    variant="light"
                //    size="lg"
                //    role="status"
                //    aria-hidden="true"
                //    style={{textAlign:'center'}}
                //    animation="border"/>
                   
                   
       
    );
  };
  
  export default Load;
  
  
  const Loader = styled.div`
    border:16px solid #f3f3f3;
    border-top:16px solid #3498db;
    border-radius:50%;
    width:120px;
    height:120px;
    animation: spin 2s linear infinite;
    @keyframes spin{
      0% {transform: rotate(0deg);}
      100% {transform: rotate(360deg);}
    }
  `;