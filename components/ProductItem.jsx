import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
  } from "@material-ui/icons";
  import styled from "styled-components";
  import Link from "next/link";
  import { useEffect, useState } from 'react';
import { ItemAssignmentContext } from "twilio/lib/rest/numbers/v2/regulatoryCompliance/bundle/itemAssignment";
  
  
  
  
  const ProductItem = ({ item }) => {
    const [path,setPath]=useState('')
   
  
    // const [items, setItems] = useState([])
    useEffect(() => {
      
      
     
    }, [])
    return (
  
  
      <Container>
        
        
        <Link href='/product/[id]' as={`/product/${item.id}`} >
          <div>
        <Border>
        <Image src={item.image}   height='370px' width='250px'/>
        <Context >
        <ReadyToShip>
          <center>Ready to Ship</center>
        </ReadyToShip>  
        <h5>{item.name}</h5>
        <p>PKR. {item.price} </p> 
        </Context>
        </Border>
       
        <Info>
          
          
            <Icon >
              <SearchOutlined />
            </Icon>
         
          
        </Info>
        </div>
        </Link>
        
      </Container>
    );
  };
  
  export default ProductItem;
  
  const Context = styled.div`
   background:white;
   /* border:1px solid lightgrey; */
  
   
   align-items:space-between;
   
`;

const ReadyToShip= styled.div`

background:  #000536;
color:white;
font-weight:700px;
padding:4px;

`;
  
  
  const Border = styled.div`
  display:flex;
  
  flex-direction:column;
   /* border:1px solid lightgrey; */
   margin-top:0px; 
   min-width: 250px;
`;

  const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
  `;
  
  const Container = styled.div`

    margin: 10px;
    margin-left:0px;
    margin-top:0px;
    margin-bottom:10px;
    min-width: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    /* &:hover ${Info}{
      opacity: 1;
      
    } */
  `;
  
  const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
  `;

const PriceCol = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
  `;

  
  const Image = styled.img`
    
    z-index: 2;
  `;
  
  const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
  `;
  const Title = styled.p`
  font-size: 14px;
  /* display: flex; */
  margin-top: 300px;
  margin-left: 300px;
  align-items: center;
  justify-content: space-between;
  
  `;
  const TInfo = styled.div`
  position: absolute;
  margin-right: 100%;
 
  `;
  
  const StyledLink = styled(Link)`
                  color: #000000;
                  &:focus, &:hover, &:visited, &:link, &:active {
                      text-decoration: none;
      }
                  `;
  