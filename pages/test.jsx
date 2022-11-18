import Link from "next/link";
import styled from "styled-components";
import Head from "next/head";
import Navbar2 from "../components/Navbar";
import Slider from '../components/Slider';
import Deals_Carosel  from  "../components/Deals_of_Day/Deals_Carosel";
import Features from "../components/Featured _Brands/Features";
import Shop_By_Price from '../components/Shop_By_Price/Shop_By_Price';
import Footer from '../components/foot/Footer';
import ArrivalCarosel from '../components/New_Arrival/ArrivalCarosel';
export default function Home() {
  return (
    <>
    <Head>
        <title>Pernia</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
          rel="stylesheet"
        />
      </Head>
    <div className={styled.container}>
     <Navbar2/>
     <Slider/>
      <ArrivalCarosel/>
      <Deals_Carosel/>
      <Features/>
      {/* <Finish_Touch/> */}
      <Shop_By_Price/>
      {/* <Newsletter/> */}

      <Footer />
    </div>
    </>
  )
}
