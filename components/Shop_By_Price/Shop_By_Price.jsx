//import Carousel from "react-bootstrap/Carousel";
import Highlight from "react-highlight";
import { useState, useEffect } from "react";
import shop from "../../styles/shopbypri.module.css";
import Link from 'next/link';
const Shop_By_Price = () => {
  const [box, setBox] = useState([
    {
      id: 1,
      text: "ABBB",
      img: "//cdn.shopify.com/s/files/1/2337/7003/files/Footwear_29.jpg?v=1646405401",
    },
    {
      id: 2,
      text: "Sohail",
      img: "https://cdn.shopify.com/s/files/1/2337/7003/files/Kurta-Set_12_c4d6cd59-a835-465b-aeaa-b6285ba69a4c.jpg?v=1646405412",
    },
    {
      id: 3,
      text: "Areebb",
      img: "https://cdn.shopify.com/s/files/1/2337/7003/files/Summer-Lawn_11_dc70445b-1449-42be-be15-e7c6d9e4ccb4.jpg?v=1646405423",
    },
    {
      id: 4,
      text: "WirdanB",
      img: "https://cdn.shopify.com/s/files/1/2337/7003/files/Jewellery_7.jpg?v=1646405433",
    },
  
    {
      id: 5,
      text: "Wirdanc",
      img: "https://cdn.shopify.com/s/files/1/2337/7003/files/Jewellery_7.jpg?v=1646405433",
    },
  
   
  ]);
  const borderstyle = {
    borderTop: "20px solid #F7F7F7",
  };

  return (
    <>
      <div className={shop.outline}>
        <div className={shop.borderstyle}>
          <h2 className={shop.spacing}>Shop By Price</h2>
          <div className={shop.alignment}>
            {box.map((it) => (
              <img key={it.id} src={it.img} className={shop.shopPrice}/>
            ))}
          </div>
        </div>
      </div>
      <Link href='/categoryImg/[id]' as={`/categoryImg/${1}`} >
      <div className={shop.outline}>
        <div className={shop.borderstyle}>
          <h2 className={shop.spacing}>Menswear Store</h2>
          <div className={shop.alignment}>
            
              <img  src="https://cdn.shopify.com/s/files/1/2337/7003/files/Menswear-Store-Desktop_28_1500x.jpg?v=1661534432" className={shop.shopPrice}
             style={{ width:'100%',height:'50%'}} />
            
          </div>
        </div>
      </div>
      </Link>
      <Link href='/categoryImg/[id]' as={`/categoryImg/${2}`} >
      <div className={shop.outline}>
        <div className={shop.borderstyle}>
          <h2 className={shop.spacing}>Unstriched Store</h2>
          <div className={shop.alignment}>
            
              <img  src="https://cdn.shopify.com/s/files/1/2337/7003/files/Unstitched-Store-Desktop_17_1500x.jpg?v=1661534216" className={shop.shopPrice}
             style={{ width:'100%',height:'50%'}} />
            
          </div>
        </div>
      </div>
      </Link>
      <Link href='/categoryImg/[id]' as={`/categoryImg/${3}`} >
      <div className={shop.outline}>
        <div className={shop.borderstyle}>
          <h2 className={shop.spacing}>Kidswear Store</h2>
          <div className={shop.alignment}>
            
              <img  src="https://cdn.shopify.com/s/files/1/2337/7003/files/Kidswear-Store-Desktop_33_1500x.jpg?v=1661534415" className={shop.shopPrice}
             style={{ width:'100%',height:'50%'}} />
            
          </div>

        </div>
      </div>
      </Link>
      <Link href='/categoryImg/[id]' as={`/categoryImg/${4}`} >
      <div className={shop.outline}>
        <div className={shop.borderstyle}>
          <h2 className={shop.spacing}>Designer Luxry Store</h2>
          <div className={shop.alignment}>
            
              <img  src="https://cdn.shopify.com/s/files/1/2337/7003/files/Designer-Luxury-Store-Desktop_10_1500x.jpg?v=1661534344" className={shop.shopPrice}
             style={{ width:'100%',height:'50%'}} />
            
          </div>
          
        </div>
      </div>
      </Link>
      <Link href='/categoryImg/[id]' as={`/categoryImg/${5}`} > 
      <div className={shop.outline}>
        <div className={shop.borderstyle}>
          <h2 className={shop.spacing}>Weeding Store</h2>
          <div className={shop.alignment}>
            
              <img  src="https://cdn.shopify.com/s/files/1/2337/7003/files/Wedding-Store-Desktop_28_1500x.jpg?v=1661534373" className={shop.shopPrice}
             style={{ width:'100%',height:'50%'}} />
            
          </div>
          
        </div>
      </div> 
      </Link>
      <Link href='/categoryImg/[id]' as={`/categoryImg/${6}`} >
      <div className={shop.outline}>
        <div className={shop.borderstyle}>
          <h2 className={shop.spacing}>Pretwear Store</h2>
          <div className={shop.alignment}>
            
              <img  src="https://cdn.shopify.com/s/files/1/2337/7003/files/Pret-Wear-Store-Desktop_15_3d26d2d7-83ef-41e5-8b09-0f6d5459dd21_1500x.jpg?v=1661534286" className={shop.shopPrice}
             style={{ width:'100%',height:'50%'}} />
            
          </div>
          
        </div>
      </div> 
     </Link>
      
      
      <div className={shop.outline}>
          <div  className={shop}>
          <img src='https://cdn.shopify.com/s/files/1/2337/7003/files/Text-Strip-Desktop-1_7_1500x.jpg?v=1660149629'
           style={{ width:'100%'}}/>
          </div>
      </div>
 
    </>
  );
};

export default Shop_By_Price;
