import { Carousel } from "@trendyol-js/react-carousel";
//import Carousel from "react-bootstrap/Carousel";
import Highlight from "react-highlight";
import { useState, useEffect } from "react";
import Link from 'next/link'
import B_ItemLeft from "./B_Item";
import B_ItemRight from "./B_ItemRight";
import { useRouter } from 'next/router';
import { DeleteOutline, Edit } from '@material-ui/icons';
import axios from "axios";
import { List } from "reactstrap";
import BSlide from "./BSlide";
const BCarosel = ({products}) => {
  const [tagid, setTagId] = useState(null)
  const [pro, setPro] = useState([])
  const [box, setBox] = useState([
    {
      id: 1,
      text: "ABBB",
      img: "https://cdn.shopify.com/s/files/1/2337/7003/products/4_0e4658b5-1f08-4ce6-a0d8-de83e307dd47_300x.jpg?v=1616074588",
    },
    {
      id: 2,
      text: "Sohail",
      img: "https://cdn.shopify.com/s/files/1/2337/7003/products/1_029e3c5c-dbf5-45a5-86d8-1cc7694a7986_300x.jpg?v=1609503175",
    },
    {
      id: 3,
      text: "Areebb",
      img: "https://cdn.shopify.com/s/files/1/2337/7003/products/IMG_4278_300x.jpg?v=1634137112",
    },
    {
      id: 4,
      text: "WirdanB",
      img: "https://cdn.shopify.com/s/files/1/2337/7003/products/4676756_300x.jpg?v=1607499742",
    },
  ]);

  useEffect(() => {


    console.log("productss",products)
    setPro(products)
    //     let list=[]
    //  axios.get(`http://localhost:8080/ecom-api/tag`)
    //  .then(res=>{
    //     res.data.data.map(tt=>{
    //       if(tt.name=='Deals of the Day'||tt.name=='deals of the day'||tt.name=='Deals of the day')
    //       {
    //       setTagId(tt.id)
    //       axios.get(`http://localhost:8080/ecom-api/collections`)
    //  .then(resp=>{
    //    console.log("res",resp.data.data)
    //     resp.data.data.map(it=>{
    //       if(it.tag_id==tt.id)
    //       {
    //         list.push(it)
    //       }
        
    //     })
    //     console.log("list",list)
    //     setDeals(list)
    //  }).catch(err=>console.log(err))
    //       console.log("id",tt.id)
    //       }
    //     })
    //  }).catch(err=>console.log(err))
     
           
  }, [])


  const borderstyle={
    borderTop:'20px solid #F7F7F7',
  }
  return (
    <>
      <div
        style={{
          backgroundColor: "white",
         
        }}
      >
        {/* <BSlide deal={box} /> */}

          {pro.length!=0 && pro.length>=4?

             <Carousel style={{ width: "400px!important" }} show={3.9} slide={1} swiping={true} leftArrow={<B_ItemLeft/>} rightArrow={<B_ItemRight/>}>
             {
             pro.map((it,i) => (
               <div key={i} style={{width:'360px'}}>
               <Link href="/product/[id]" as={`/product/${it.id}`}> 
                 <img src={it.image_paths} style={{ height: "450px" }}/>
                 </Link>     
              </div>
             ))
             }
         </Carousel>:
         <div style={{display:'flex',flexDirection:'row',width:'90%',marginLeft:'auto',marginRight:'auto'}}>
         { pro.map((it,i) => (
               <div key={i} style={{cursor:'pointer'}} >
               <Link href="/product/[id]" as={`/product/${it.id}`}> 
                 <img src={it.image_paths} style={{ height: "450px",width:'310px',margin:'15px' }}/>
                 </Link>     
              </div>
             ))
         }
         </div>
           
            }
   
      </div>
    </>
  );
};
export default BCarosel;
