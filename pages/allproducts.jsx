import styled from "styled-components";
//import Announcement from "../../../components/Announcement";
import Navbar2 from "../components/Navbar"
import Footer from "../components/foot/Footer";
import { useEffect, useState } from 'react';
 import css from '../styles/index.module.css';

import {
    HomeOutlined,Info
  } from "@material-ui/icons";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import Head from 'next/head'
import { useRouter } from 'next/router'
import Newsletter from "../components/foot/Newsletter";
import { FlexFlowContext } from "twilio/lib/rest/flexApi/v1/flexFlow";
import { Button } from "@material-ui/core";

const All_Products = () => {
    const router = useRouter();
    const [priceSelected, setPrice] = useState('')
    const [items, setItems] = useState([])
    const [colname, setColName] = useState('')
    const [catname, setCatName] = useState('')
    const [allProducts, setAllProducts] = useState([])
    const [cat, setCategory] = useState({
        id:null,
        name:'',
        parent:'',
        status:0
    })
    useEffect(() => {
        // let list=[]
        // axios.get(`https://api.perniacouture.pk/pernia-api/collections/${id}`)
        // .then(res=>{
        //    setColName(res.data.data.name)
        //    axios.get(`https://a[i.perniacouture.pk/pernia-api/categories/${res.data.data.category_id}`)
        //    .then(respo=>setCatName(respo.data.data.name))
        // }).catch(err=>console.log(err))
        if(router.query.text==''|| router.query.text==undefined)
        {
            setItems([])
        }
        else if(router.query.text=='cart')
        {
          axios.get(`https://api.perniacouture.pk/pernia-api/products`)
      .then(resp=>{
        let list1=[]
         resp.data.data.map(it=>{
           
            let pat = 'https://api.perniacouture.pk/pernia-api/' + it.path;
            pat=pat.toString();
            it['path']=pat
            
             list1.push(it)
             
           
         
         })
        
         setItems(list1)
         setAllProducts(list1)
      }).catch(err=>console.log(err))
        }
        else{
      axios.get(`https://api.perniacouture.pk/pernia-api/products`)
      .then(resp=>{
        let list=[]
         resp.data.data.map(it=>{
            console.log("name",it.name)
            console.log("text",router.query.text)
           if(it.name==router.query.text)
           {
            let pp = 'https://api.perniacouture.pk/pernia-api/' + it.path;
            pp=pp.toString();
            it['path']=pp
            console.log("ppp",pp)
             list.push(it)
             
           }
         
       })
         console.log("list",list)
         setItems(list)
         setAllProducts(list)
      }).catch(err=>console.log(err))
    }      
    }, [router.query.text])

    const onValueChange=(value)=>{     
      setPrice(value)
      console.log("value",value)
      let list=[]
      let price1,price2;
      if(value=='5-10')
      {  
      price1=5000;
      price2=10000
      }
      else if(value=='10-20')
      {
        price1=11000;
      price2=20000
      }
      else{
        price1=30000;
      price2=40000
      }


      allProducts.map(it=>{
        if(it.price==price1 || it.price==price2)
        {
          list.push(it)
        }
      })
      console.log("list",list,allProducts)
        setItems(list)
    }
    function move()
    {
      setPrice('')
      setItems(allProducts);
    }

  const handleSelling=e=>{
    
    console.log("in asending")
    if(e.target.value=="asc")
    {
    let list=items
    let sortedData = items.slice().sort((a, b) => a.price - b.price);
    list.sort(function(a, b){
      if(a.price<b.price)
      return 1;
  });
  console.log("list",sortedData)
  setItems(sortedData)
}
else{
  let list=items
    let sortedData = items.slice().sort((a, b) => b.price - a.price);
    list.sort(function(a, b){
      if(a.price<b.price)
      return 1;
  });
  console.log("list",sortedData)
  setItems(sortedData)

}
  }

{/* {items.length==0? <div style={{marginLeft:'auto',marginRight:'auto',marginTop:'200px',fontSize:'22px'}}>
                Sorry! ..Stock is Empty of this Category</div>:
                <> */}

       {/* {
                 spro.map((item) => (
                    <ProductItem item={item} key={item.id} />

                ))} */}          

    return (
      <>
        <Head>
        <title> Products</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar2/>
        <Container>
           
           {items.length!=0?
            <FilterContainer>
            
            <FilterHome>
                <FilterHomeText>
                    <HomeOutlined/>
                    </FilterHomeText>
                    <FilterHomeText>
                        
                    </FilterHomeText>
            </FilterHome>
                
                
                    <SortText></SortText>
                    <Select onChange={(e)=>handleSelling(e)}>
                        <Option selected disabled>Best Selling</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
               
            </FilterContainer>:''}


            {items.length!=0?
            <GridArea>
            <LeftBar>
            <Filter>  
            <FilterTitle style={{backgroundColor:'white'}}>FILTER PRODUCTS</FilterTitle>
            </Filter> 
            
            
            
            <Filter>
            <FilterTitle>Price</FilterTitle> 
              <FilterText> 
              <input className={css.pricein} type='radio'
                   value='5-10'  
                   name="price"
                   checked={priceSelected==='5-10'}
                   onChange={()=>onValueChange('5-10')}
                  />
                    <label style={{marginLeft:'10px'}} className={css.pricela} htmlFor="5-10">Rs. 5,000-10,000</label>  <br/>
                  <input className={css.pricein} type='radio' value='10-20'
                    name="price"  checked={priceSelected==='10-20'}  onChange={()=>onValueChange('10-20')}/>
                    <label style={{marginLeft:'10px'}} className={css.pricela} htmlFor="10-20" >Rs. 10,000-20,000</label> <br/>
                  <input  className={css.pricein} type='radio' value='30-40' 
                   name="price"  checked={priceSelected==='30-40'}  onChange={()=>onValueChange('30-40')}/>
                    <label style={{marginLeft:'10px'}} className={css.pricela} htmlFor="30-40" >Rs. 30,000-40,000</label>
              </FilterText>  
            </Filter>

            <Filter>
            <FilterTitle>Size</FilterTitle> 
              <FilterText>
                  <input className={css.pricein} type='checkbox' id='price'/><label className={css.pricela} htmlFor="price">XL</label> <br />
                  <input className={css.pricein} type='checkbox' id='price'/><label className={css.pricela} htmlFor="price">L</label> <br />
                  <input className={css.pricein} type='checkbox' id='price'/><label className={css.pricela} htmlFor="price">M</label> <br />
                  <input className={css.pricein} type='checkbox' id='price'/><label className={css.pricela} htmlFor="price">S</label> <br />
                  <input className={css.pricein} type='checkbox' id='price'/><label className={css.pricela} htmlFor="price">XS</label> 
              </FilterText>  
            </Filter>

            </LeftBar>   
            <Productshow>
              {items.map((it,key)=>(
                 <ProductItem item={it} key={key}/>
                 
              ))

              }         
       
            </Productshow>


            </GridArea>:
            <center style={{marginBottom:'60px'}}>
            <div style={{marginBottom:'100px',marginTop:'40px'}}>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'center',width:'100%'}}>
                <Info style={{fontSize:'28px'}}/>
                <p>No Product Found...</p>
                
                </div>
                </div>

                <Button onClick={()=>move()}>Back To All Products</Button>
                </center>
                }
            
            {/* <Newsletter/> */}
            <Footer/>
           
        </Container>
        
       </>
    );
};

export default All_Products;






const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  text-align: center;
`;

const FilterContainer = styled.div`
  margin-top:60px;
  display: flex;
  justify-content: space-between;
`;
const GridArea = styled.div`
  display: flex;
  flex-direction:row;
   
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
  flex:1;
 
  height:700px;
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
  
  margin-right: 5%;
`;
const Option = styled.option``;

const Productshow = styled.div`
    padding: 10px;

    flex:4;
    display: flex;
    flex-direction:row;
    flex-wrap: wrap;
    margin-left:70px;
`;