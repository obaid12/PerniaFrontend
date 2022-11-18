import { useState, useEffect } from "react";
import finish from "../../styles/finishtouch.module.css"

const Finish_Touch = () => {
  const [box, setBox] = useState([
    {
      id: 1,
      text: "Areebb",
      img: "//cdn.shopify.com/s/files/1/2337/7003/files/Khussas_200x.jpg?v=1646405242",
    },
    
    {
      id: 2,
      text: "Sohail",
      img: "//cdn.shopify.com/s/files/1/2337/7003/files/Bags_6_200x.jpg?v=1646405234",
    },
    {
      id: 3,
      text: "ABBB",
      img: "//cdn.shopify.com/s/files/1/2337/7003/files/Jewellery_6_200x.jpg?v=1646405225",
    },
    {
      id: 4,
      text: "WirdanB",
      img: "//cdn.shopify.com/s/files/1/2337/7003/files/Open-Flats_200x.jpg?v=1646405248",
    },
    {
      id: 5,
      text: "WirdanB",
      img: "//cdn.shopify.com/s/files/1/2337/7003/files/Heels_200x.jpg?v=1646405255",
    },
    {
      id: 6,
      text: "WirdanB",
      img: "//cdn.shopify.com/s/files/1/2337/7003/files/Pumps_200x.jpg?v=1646405268",
    },
  
   
  ]);
  const borderstyle = {
    borderTop: "20px solid #F7F7F7",
  };

  return (
    <>
      <div className={finish.outline}>
        <div className={finish.borderstyle}>
          <h2 className={finish.spacing}>Finishing Touches</h2>
          <div className={finish.alignment}>
            {box.map((it) => (
              <img key={it.id} src={it.img} className={finish.imgSize} />
            ))}
          </div>
        </div>
      </div>
     

    </>
  );
};
export default Finish_Touch;
