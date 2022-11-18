import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
// import { mobile } from "../pages/responsive";
import Link from "next/link";
import Image from "next/image";
import Head from 'next/head'
import "react-responsive-carousel/lib/styles/carousel.min.css";
//import { Carousel } from 'react-responsive-carousel';
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.css';

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <div style={{marginBottom:'60px'}}>
    <Carousel>
      <Carousel>
   {sliderItems.map((it,key)=>(
     <Carousel.Item key={key} interval={5000}>
     <img
       style={{width:'100%',vh:'100'}}
       src={it.img}
       alt="First slide"
     /> 
     </Carousel.Item>
   ))}     
  
  
</Carousel>
    </Carousel>
</div>
      {/* <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
           
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow> */}
    </Container>
  );
};

export default Slider;



const Container = styled.div`
  width: 110% !important;
  display: flex;
  
  height:60vh;
  position: relative;
  overflow: hidden;
  
  `;
