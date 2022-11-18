import styled from "styled-components";
//import Announcement from "../../../components/Announcement";
import Navbar2 from "../../../components/Navbar"

import { useEffect, useState } from 'react';
//import css from '../index.module.css';

import {
    HomeOutlined
  } from "@material-ui/icons";
import axios from "axios";
import BCarosel from "../BCarosel";
import Newsletter from "../../../components/foot/Newsletter";
import Footer from "../../../components/foot/Footer";
import { useRouter } from 'next/router'
import Head from 'next/head'
const Move = ({id}) => {
    // const router = useRouter();
    // const { id } = router.query;
  
      const [prod,setPro]=useState([])

    useEffect(() => {
        let list=[]
      
             axios.get(`https://api.perniacouture.pk/pernia-api/products/collection/${id}`).then(ress=>{
               ress.data.data.map(pr=>{

                let pp = 'https://api.perniacouture.pk/pernia-api/' + pr.image_paths;
                pp=pp.toString();
                if(pp.includes(','))
                {
                    let pt=pp.split(',')
                    pp=pt[0]
                    pr['image_paths']=pt[0]
                }
                else{
                pr['image_paths']=pp
                }
                console.log("ppp",pp)
                list.push(pr)
               })
               setPro(list)
             }).catch(err=>console.log(err))
            
        
           
    }, [])

       

    return (
      <>
    
          {prod.length!=0?
          <>
          {console.log('proo',prod)}
          <BCarosel products={prod} />
          </>:''}  
      
       </>
    );
};

export default Move;






const Container = styled.div`
display:flex;
flex-direction:column;
`;

const Title = styled.h1`
  margin: 20px;
  text-align: center;
`;

const FilterContainer = styled.div`
margin-top:80px;
  display: flex;
  justify-content: space-between;
`;
const GridArea = styled.div`
  display: flex;
  flex-direction:row;
  height:200px;
  
  
`;

const Filter = styled.div`
  //margin: 20px;
  display:flex;
  flex-direction:column;
  
  //height:40px;
  // background-color:white;
`;

const FilterHome = styled.div`
  //margin: 20px;
  display:flex;
  flex-direction:row;
  margin-left:30px
  //height:40px;
  
`;
const LeftBar = styled.div`
  margin-left:30px;
  margin-top:25px;
  width:350px;
  height:800px;
  margin-right:30px;
  // border-style:groove;
  box-shadow: 0 2px 2px rgb(11 25 28 / 10%);
`;

const FilterText = styled.span`
  font-size: 14px;
  padding:20px;
  margin-left:20px
`;
const FilterHomeText = styled.span`
  font-size: 14px;
  padding:6px;
  /* padding:20px;
  margin-top: 10px;
  margin-left:20px */
`;
const SortText = styled.span`
  font-size: 14px;
  
  
`;
const FilterTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  padding:20px;
  background-color:whitesmoke;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const Productshow = styled.div`
    padding: 20px;
    display: flex;
    flex-direction:row;
    
    flex-wrap: wrap;
    justify-content: space-between;
`;