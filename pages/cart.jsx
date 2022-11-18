//import Announcement from "../components/Announcement"
import Footer from '../components/foot/Footer'
import Newsletter from "../components/foot/Newsletter"
import Navbar from "../components/Navbar"
import ShoppingCart from "../components/shopping-cart/index"
import Head from 'next/head'



const cart = () => {

return(
  <>
    <Head>
        <title>Cart</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
          rel="stylesheet"
        />
      </Head>
    
    <Navbar />
    <ShoppingCart />
    {/* <Newsletter/> */}
    <Footer />

  </>
)
}

export default cart
