import { Carousel } from "@trendyol-js/react-carousel";
//import Carousel from "react-bootstrap/Carousel";
import Highlight from "react-highlight";
import { useState, useEffect } from "react";
import Link from 'next/link'
import Arrival_Item from "./Arrival_Item";
import Arrival_ItemRight from "./Arrival_ItemRight";
import { useRouter } from 'next/router';
import { DeleteOutline, Edit } from '@material-ui/icons';
import axios from "axios";
import { List } from "reactstrap";
import nav from '../../styles/navbar.module.css'
import Left from "./Left";
import Right from "./Right";
const ASlide = (props) => {
  const [tagid, setTagId] = useState(null)
  const [bname, setBName] = useState([])
  const [deals, setDeals] = useState([])
  const [box, setBox] = useState([
    {
      id: 1,
      text: "ABBB",
      img: "https://cdn.shopify.com/s/files/1/2337/7003/products/69_af682a68-5175-4fec-a69a-d89f055e57cf_300x.jpg?v=1645774308",
    },
   
  ]);

  
  useEffect(() => {
        console.log("props",props)
        // let list=[]
        // props.deal.map(it=>{
        //   axios.get(`https://perniacouture.pk/pernia-api/suppliers/${it.brand_id}`)
        // .then(res=>{
        //   it['brand']=res.data.data.name
        //   list.push(res.data.data.name)
        //   console.log("data",res.data.data.name)
        // }
        //   )
        // .catch(err=>console.log(err))
        // })
       
        // setBName(list)
           
  }, [])


 
  return (
    <>
          <div className={nav.lgSc}>
          <Carousel  show={3.5} slide={1} swiping={true} leftArrow={<Arrival_Item/>} rightArrow={<Arrival_ItemRight/>}>
              {
              props.deal.map((it,i) => (
             
                <Link key={it.id} href="/category/[id]" as={`/category/${it.id}`}>
                  <div>
                  <img src={it.path} style={{ height: "450px",width:'350px'}}/>
                  <div style={{backgroundColor:'white',height:'70px',width:'300px',border:'2px solid whitesmoke',marginLeft:'25px'}}>
                  <h4 style={{textAlign:'center',marginTop:'8px'}}>{it.brand}</h4>
                  <h5 style={{textAlign:'center',marginTop:'15px'}}>{it.name}</h5>
              
                  </div>
                  </div> 
                 
                  
                  </Link>     
          
              ))
              }
          </Carousel>
          </div>   

          <div className={nav.smallSc}>
          <Carousel  show={1} slide={1} swiping={true} leftArrow={<Left/>} rightArrow={<Right/>}>
              {
              props.deal.map((it,i) => (
             
                <Link key={it.id} href="/category/[id]" as={`/category/${it.id}`}>
                  <div>
                  <img src={it.path} style={{width:'100%',height:'500px'}}/>
                  <div style={{backgroundColor:'white',height:'60px',border:'2px solid whitesmoke',marginLeft:'25px'}}>
                  <h4 style={{textAlign:'center',marginTop:'8px'}}>{it.brand}</h4>
                  <h5 style={{textAlign:'center',marginTop:'15px'}}>{it.name}</h5>
              
                  </div>
                  </div> 
                 
                  
                  </Link>     
          
              ))
              }
          </Carousel>
          </div>
      
    </>
  );
};
export default ASlide;
