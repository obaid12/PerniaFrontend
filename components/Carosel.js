import { Carousel } from "@trendyol-js/react-carousel";
//import Carousel from "react-bootstrap/Carousel";
import Highlight from "react-highlight";
import { useState, useEffect } from "react";
import nav from "../styles/navbar.module.css";

import ItemLeft from "./Item";
import ItemRight from "./ItemRight";
const Carosel = () => {
  const [box, setBox] = useState([
    {
      id: 1,
      text: "ABBB",
      img: "https://cdn.shopify.com/s/files/1/2337/7003/files/Asifa-_-Nabeel_4fc01449-2411-4a63-9760-65c5d5441068_540x.jpg?v=1646579962",
    },
    {
      id: 2,
      text: "Sohail",
      img: "https://cdn.shopify.com/s/files/1/2337/7003/files/MARIA.B_640c3932-3eb0-4b15-9b93-93547fbca9b3_540x.jpg?v=1646724914",
    },
    {
      id: 3,
      text: "Areebb",
      img: "https://cdn.shopify.com/s/files/1/2337/7003/files/Noor-By-Sadia-Asad_20_540x.jpg?v=1646470367",
    },
    {
      id: 4,
      text: "WirdanB",
      img: "https://cdn.shopify.com/s/files/1/2337/7003/files/Sable-Vogue_86e7fba4-c857-4c0e-9339-4d0e318d04fe_540x.jpg?v=1646660689",
    },
  ]);

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
        <div style={borderstyle}>
          {/* <h2 style={{marginLeft:'30px',fontSize:'1.8em',letterSpacing:'.15em'}}>New Arrivals</h2> */}


          <Carousel show={3.5} slide={1} swiping={true} leftArrow={<ItemLeft/>} rightArrow={<ItemRight/>}>
            
              {box.map((it) => (
                <img  key={it.id}src={it.img} style={{ height: "550px" }} />
          
              ))}
            
          </Carousel>
         
        </div>
      </div>
    </>
  );
};
export default Carosel;
