import { Add, PanToolSharp, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Carousel from "../../../components/Carosel";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/foot/Footer";
import { ArrowLeftOutlined, ArrowRightOutlined,Details,Description } from "@material-ui/icons";
import { useEffect, useState} from "react";
//import { useParams } from "react-router-dom";
import axios from "axios";
import { addProduct } from '../../../components/redux/action';
import { useRouter } from "next/router";
import React, { memo } from "react";
import { sliderItems } from "../../../data";
//import { useLocation } from "react-router";
// import { publicRequest } from "../requestMethods";
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
//import { Carousel } from 'react-responsive-carousel';
import router from "next/router";
import Head from 'next/head'

import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//toast.configure()
import ImageMagnifier from "./ImageMagnifier";
//import Rating from '@material-ui/lab/Rating';
import Typography from "@material-ui/core/Typography";
//import Box from '@material-ui/core/Box';
import css from "../index.module.css";
import Newsletter from "../../../components/foot/Newsletter";
const Product = () => {
  const [ratingValue, setRatingValue] = useState(0);
  const [review, setReview] = useState(0);
  const [votes, setVotes] = useState(0);
  const [modal, setModal] = React.useState(false);
  const [togglediv, settoggle] = React.useState(false);
  const toggle = () => setModal(!modal);
  const [slideIndex, setSlideIndex] = useState(0);
  const [path, setPath] = useState([
   
  ]);

  const [icon, setIcon] = useState([
    {id:1, name: "S", status: false },
    {id:2, name: "M", status: false },
    {id:3, name: "L", status: false },
    {id:4, name: "XL", status: false },
    {id:5, name: "XS", status: false },
  ]);
  const [carddiv, setCardDiv] = useState(false);
  const handleClick = (direction) => {
    console.log("hello");
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : path.length);
    } else {
      setSlideIndex(slideIndex < path.length ? slideIndex + 1 : 0);
    }
  };

  const RadioInput = ({ label, value, checked, setter, name }) => {
    const handelChange = (name) => (e) => {};
    //     let list = [...state]

    //     console.log("valueeee", e.target.value);
    //     // console.log('before list', list)

    //     for (var i = 0; i < state.length; i++) {

    //       if (name === (state[i].name)) {

    //         setter(e.target.value)
    //         state[i].value = e.target.value
    //         console.log("listttt", state)
    //         // setstate(list)
    //       }

    //     }

    //     setstate(state)
    //     console.log('RESultttttttt', state)
    //     state.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
    //     var str = ''
    //     state.map(item => {
    //       str = str + item.value + ' '
    //     })
    //     var str_join = str.split(" ").join("_")
    //     var string = str_join.slice(0, -1);
    //     string = string.toLowerCase()
    //     setstrr(string)

    //     console.log(string)

    //     item.combinations.map((v) => {
    //       if (string === (v.product_variant_name)) {

    //         setcomb(v.regular_price)
    //         setCardDiv(true)
    //         setstrr(state)
    //         setvariant_name(v.product_variant_name)
    //         setvid(v.id)
    //       }
    //       // if(comb!='')

    //       // else
    //       // setCardDiv(false)

    //     })
    //     // console.log("price", comb)
    //   }

    return (
      <label>
        <input
          type="radio"
          checked={checked == value}
          value={value}
          onChange={handelChange(name)}
        />
        <span>{label}</span>
      </label>
    );
  };

  //   const [state, setstate] = useState([{
  //     id: null,
  //     name: '',
  //     value: ''
  //   }]);

  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };
  const ChangeStatus = (recieved_id) => {
    let list=[]
    icon.map(ic=>{
      let flag=false;
      if(ic.id==recieved_id)
      {
        console.log("in change status",ic.status)
        ic['status']=true;
        console.log("after changed",ic.status)
        flag=true
      }
      if(flag==false)
      ic['status']=false;
   
      list.push(ic)
      // router.push(`/product/${id}`);
    })
    console.log("list",list)
    setIcon(list)
  };
  const decCount = () => {
    setCount(count - 1);
  };
  
  const [sizeImg ,setSizeImg] = useState(false);
  const [thrddiv, setThrdDiv] = useState(false);
  const [pdescription, setPDescription] = useState(false);
  const [color, setColor] = React.useState();
  const [mat, setMaterial] = React.useState();
  const [size, setSize] = React.useState();
  const [colName, setColName] = React.useState('');
  const [suppName, setSuppName] = React.useState('');
    const [item, setItem] = useState({
      name: '',
      // supplier_id: null,
      // category_id: null,
      collection_id:null,
      price:null,
      variants: [],
      combinations: [],
      images: [],
    });
  // const [item, setItem] = useState({
  //   id: 1,
  //   name: "ABC",
  //   img: "https://cdn.shopify.com/s/files/1/2337/7003/products/16_0e6df57b-33fd-4c82-9f77-7caf40d1bdc9_700x.jpg?v=1631001480",
  // });
  const router = useRouter();
  const { id } = router.query;

  const handleCount = () => {
    if (count ==1 || count==0) {
      setCount(count);
    } else {
      let x = count;
      x = x - 1;
      setCount(x);
    }
  };

  const [comb, setcomb] = useState("");
  const [viewcart, setViewCart] = useState(false);
  const [vid, setvid] = useState();
  const [strr, setstrr] = useState("");
  const [variant_name, setvariant_name] = useState("");
  const [radio, setRadiobtn] = useState({
    selected: "",
    name: "",
  });
  const [radio2, setRadio2btn] = useState({
    selected: "",
    name: "",
  });
  const [radio3, setRadio3btn] = useState({
    selected: "",
    name: "",
  });
  const ChkCount = () => {
    if(count===15)
    setCount(count)
    else
    setCount(count=>count+1)
 }
 

 const viewCart = () => {
  router.push('/cart')
 }


 const handleSizeImg = () => {

  console.log('helooo image')
  setSizeImg(!sizeImg)
 }

 const addToCart = () => {
    
  dispatch(addProduct(
    {
      id:   id,
      name: item.name,
      price: item.price,
      count: count,
      variant:item.variants,
      image:path[0]

    }
  ))
  // settoggle(true)
 toast(`${item.name} Added Successfully`)
 setViewCart(true)
  //router.push('/cart')
}
  useEffect(() => {
    let list=[]
 axios.get(`https://api.perniacouture.pk/pernia-api/products/${id}`)
 .then(res=>{
   let path_list=[]
   res.data.data.images.map(im=>{
    let pp = 'https://api.perniacouture.pk/pernia-api/' + im;
    path_list.push(pp)
   })
  setPath(path_list)
  console.log("name",path_list)

   setItem(res.data.data)  
      axios.get(`https://api.perniacouture.pk/pernia-api/collections/${res.data.data.collection_id}`)
 .then(resp=>{
  
       setColName(resp.data.data.name)
       axios.get(`https://api.perniacouture.pk/pernia-api/suppliers/${resp.data.data.brand_id}`)
       .then(resp=>{
             setSuppName(resp.data.data.name)
          
          }).catch(err=>console.log(err))
       
    }).catch(err=>console.log(err))
   



 }).catch(err=>console.log(err))
  
 
       
}, [])




  return (
    <>
     <Head>
        <title>Product Description</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
          rel="stylesheet"
        />
      </Head>
     <Navbar />
    <Container>
     <ToastContainer/>
      <Wrapper>
        <Boxx>
          <Arrow direction="left" onClick={() => handleClick("left")}>
            <ArrowLeftOutlined />
          </Arrow>
          <ImgWrapper slideIndex={slideIndex}>
            {path.map((pa, i) => (
              <Slide bg={item.id} key={i}>
                <ImgContainer>
                  <ImageMagnifier img={pa} />
                </ImgContainer>
              </Slide>
            ))}
          </ImgWrapper>
          <Arrow direction="right" onClick={() => handleClick("right")}>
            <ArrowRightOutlined />
          </Arrow>
        </Boxx>

        <InfoContainer>
          <Title>
            {item.name}
          </Title>
          <Desc>
            {/* <div style={{ display: "flex", flexDirection: "row" }}>
              <p>Brand :</p>
              <p style={{ color: "skyblue" }}>HEM</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p>Collection :</p>
              <p style={{ color: "skyblue" }}>HEM</p>
            </div> */}
            <p>Brand : {suppName}</p>
            <p>Collection : {colName}</p>
          </Desc>

          <AddContainer>
          <AmountContainer>
          <p
                style={{
                  fontWeight: "800",
                  fontSize: "20px",
                  marginLeft: "20px",
                  color:'red',
                  width:'150px'
                }}
              >
                {count!=0?item.price*count:item.price} Rs
              </p>
              <span>
              <button className={css.minus_btn}onClick={() => handleCount()} >
                  -
              </button>
              </span>
    
              <span>
                <p style={{marginTop:'13px'}} className={css.counter}>{count}</p>
              </span>
              <span>
                <button className={css.add_btn} onClick={() => ChkCount()} >
                  +
                </button>
                
              </span>
              <p style={{paddingLeft:'8px',marginTop:'18px',fontWeight:'500'}}>Quantity</p>
            </AmountContainer>
            {/* <AmountContainer>
         
              <p
                style={{
                  fontWeight: "600",
                  fontSize: "20px",
                  marginLeft: "20px",
                }}
              >
                {item.price} Rs
              </p>
              <span>
                <button className={css.minus_btn} onClick={decCount}>
                  -
                </button>
              </span>
              <span>
                <p className={css.counter}>{count}</p>
              </span>
              <span>
                <button className={css.add_btn} onClick={incrementCount}>
                  +
                </button>
              </span>
</AmountContainer> */}
            
         
          
          </AddContainer>
          <Desc>
            <p style={{ fontSize: "16px", fontStyle: "italic" }}>
              Estimated shipping date: <b>April 27, 2022</b> <br />
              <br />
              Note:Delivery will vary as per customer location.
            </p>
          </Desc>

          <Size>
            <h4>Size</h4>
            <SizeArea>
              {icon.map((ic, i) => (
                <Icon key={i}
                  onClick={() => ChangeStatus(ic.id)}
                  style={
                    ic.status == true
                      ? { backgroundColor: "black", color: "white" }
                      : { backgroundColor: "white", color: "black" }
                  }
                >
                  <small style={{textAlign:'center'}}>{ic.name}</small>
                </Icon>
              ))}
            </SizeArea>
          </Size>
          {count==0?'':<Button onClick={() => addToCart()}>Add To Cart</Button>}
          
          {viewcart==true?
          <Button onClick={() => viewCart()}>View Cart</Button>:''

          }
         
          <hr width="580px" />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "40px",
            }}
          >
            <Details  style={{marginTop:'15px'}}/>
            <h6 style={{marginLeft:'6px',marginTop:'15px'}}>Size Guide</h6>
            {sizeImg!=true?
            <h2
              style={{
                marginLeft: "auto",
                marginRight: "20px",
                cursor:'pointer'
              }}
              onClick={()=>handleSizeImg()}
            >
              +
            </h2>:
             <h2
             style={{
               marginLeft: "auto",
               marginRight: "20px",
               cursor:'pointer'
             }}
             onClick={()=>handleSizeImg()}
           >
             -
           </h2>
}

          </div>
          {sizeImg?
           <img src="/sizes.PNG" style={{width:'80%',margin:'20px',marginLeft:'60px'}}></img>:''
           }
          <hr width="580px" />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "40px",
            }}
          >
            <Description style={{marginTop:'15px'}}/>
            <h6 style={{marginLeft:'6px',marginTop:'15px'}}>Product Description</h6>
            {pdescription!=true?
            <h2
              style={{
                marginLeft: "auto",
                marginRight: "20px",
                cursor:'pointer',
                transitionDelay:'2s'
              }}
              onClick={()=>setPDescription(!pdescription)}
            >
              +
            </h2>:
             <h2
             style={{
               marginLeft: "auto",
               marginRight: "20px",
               cursor:'pointer'
             }}
             onClick={()=>setPDescription(!pdescription)}
           >
             -
           </h2>
}
          </div>
          {pdescription&&
          <div style={{width:'80%',padding:'20px',margin:'20px',transitionDelay:'15s'}} >
          <p style={{marginLeft:'auto',marginRight:'auto'}}>{item.product_description}</p>
          </div>
}
          <hr width="580px" />
          
        </InfoContainer>

        {/* {localStorage.getItem('token') &&
          <>
          {ratingValue==0?
          <Box component="fieldset" mb={3} borderColor="transparent" 
          style={{borderColor:'transparent',marginTop:'100px',marginLeft:'100px'}}>
        <Typography component="legend" >
           <Rate>Rate Product</Rate> 
        </Typography>
        <Rating
       // style={{marginLeft:'20px'}}
          name="Rating Label"
          value={ratingValue}
          onChange={(event, newValue) => {
            handleRating(newValue);
          }}
        />
      </Box>:
      <div style={{borderColor:'transparent',marginTop:'100px',marginLeft:'100px'}}> 
      <Rate>Thanks for Rating Us.</Rate>
      <Rating
      value={ratingValue}
        />
      </div>}
      </>
}
        </InfoContainer>
        {localStorage.getItem('token') &&
        <Review >
        <h4>Customer Reviews</h4>
        <Rating
          value={review}  
        />
       <h5 style={{marginTop:'-1px'}}>{review} out of 5  <label>({votes} votes)</label></h5>
       
      </Review>
}*/}
      </Wrapper>

      {/* carousel showed in product page */}
      <h2
        style={{
          marginLeft: "30px",
          fontSize: "1.8em",
          letterSpacing: ".15em",
        }}
      >
        Related Products
      </h2>

      <Carousel />
     
    </Container>
    {/* <Newsletter/> */}
    <Footer />
    </>
  );
};

export default Product;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const Review = styled.div`
  margin-top: 450px;
`;
const Size = styled.div`
  margin-left: 20px;
  padding: 20px;
`;

const Icon = styled.div`
  height: 35px;
  width: 40px;
  cursor: pointer;
  margin-right: 6px;
  
  border-radius: 10px;
  text-align: center;
  border-style: groove;
`;
const SizeArea = styled.div`
  display: flex;
  flex-direction: row;
`;

const Rate = styled.div`
  font-weight: 600;
  font-size: 22px;
  font-family: Times New Roman;
`;

const FilterContainer = styled.div`
  max-width: 40%;
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  max-width: 50%;
  min-width: 50%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const FilterSize = styled.span`
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
`;

const FilterSizeOpt = styled.span`
  padding-left: 20px;
`;
const Container = styled.div`
  background-color: whitesmoke;
  margin-top:10px;
  margin-bottom:80px;
`;

const Wrapper = styled.div`
  padding: 50px;
  padding-top:10px;
  margin-left: 150px;
  margin-right: 150px;
  display: flex;
`;
const Boxx = styled.div`
  padding-top: -200px;
  width: 500px;
  height: 100vh;
  display: flex;
  position: relative;
  margin-top: 30px;
  overflow: hidden;
`;

const ImgWrapper = styled.div`
  height: 100%;
  width: auto;
  margin-top: -60px;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -500}px);
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 500px;

  object-fit: fill;
`;

const InfoContainer = styled.div`
  margin-left: 30px;
  width: 600px;
  height:auto;
  margin-top: 30px;
  background-color: white;
`;

const Title = styled.h1`
  font-weight: 700;
  width: 430px;
  margin-top:10px;
  padding-left: 20px;
  font-size: 20px;
`;

const Desc = styled.p`
  margin: 20px 0px;
  padding-left: 20px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const AmountBtn = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  cursor: pointer;
`;
const Slide = styled.div`
  width: 500px;
  
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const Button = styled.button`
  cursor: pointer;
  width: 500px;
  margin-bottom: 30px;
  margin-left: 50px;
  margin-right: 50px;
  transition: all 0.5s ease;
  color: #000000;
  border: 1px solid teal;
  text-align: center;
  background-color: transparent;
  padding: 8px;
  outline: none;
  font-weight: bold;
  border-radius: 1px;
  &:hover {
    color: #ffffff;
    background-color: teal;
    border: 1px solid teal;
  }
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #b6b6b6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

{
  /* 
            {item.variants.map((v) => (
              <Filter>
                <FilterTitle >{v.name.charAt(0).toUpperCase() + v.name.slice(1)}:</FilterTitle>
                <FilterSize onChange={handelChange(v.name)}>
                  <FilterSizeOption value='' selected disabled>Select Values</FilterSizeOption>
                  {v.values.map((opt) => (

                    <FilterSizeOption value={opt}>{opt}</FilterSizeOption>

                  ))}

                </FilterSize><br />
              </Filter>
            ))} */
}
