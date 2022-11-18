import { useDispatch } from 'react-redux';
import { removeProduct } from './../../redux/action';
import React from 'react';
import { setCount } from './../../redux/action';
import { Add, Remove, DeleteOutline } from "@material-ui/icons";
import styled from "styled-components";
//import { mobile } from "../../../pages/responsive";
//import Rating from '@material-ui/lab/Rating';
//import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
const CheckoutItems = ({ name, id, count, price, variant,image,sum }) => {
  const dispatch = useDispatch();

  const [ratingValue, setRatingValue] = React.useState(0);
  const removeFromCart = () => {
    dispatch(removeProduct(
      {
        id: id,

      }
    ))
  }

  const setProductCount = (count) => {
    if (count <= 0) {
      return false;
    }

    dispatch(setCount(
      {
        id: id,

        count: count,
      }
    ))
  }

  return (

    <Product>
      <ProductDetail>
        {/* <Image src={image}/> */}
        <Image src={image} /> 
        <Details>
          <ProductName>
            <b>Product:</b> {name}
          </ProductName>
          <ProductId>
            <b>ID:</b> {id}
          </ProductId>
          
           {variant.length!=0 || variant!=null || variant==undefined?
          variant.map((v) => (
            <ProductId key={v.id}>
              <b>{v.name.charAt(0).toUpperCase() + v.name.slice(1)}:</b> {v.value}<br />
            </ProductId>
          )):null}
        </Details>
      </ProductDetail>
      <PriceDetail>
        <ProductAmountContainer>
          {/* <AmountBtn> <Remove onClick={() => setProductCount(count - 1)} /></AmountBtn> */}
          <Amount><strong>{count}</strong></Amount>
          {/* <AmountBtn> <Add onClick={() => setProductCount(count + 1)} /></AmountBtn>
          <AmountBtnDel> <DeleteOutline onClick={() => removeFromCart()} /></AmountBtnDel> */}

        </ProductAmountContainer>
        <ProductPrice>{price * count} Rs</ProductPrice>
      </PriceDetail>
      
      {/* <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">
            Please Rate our app
        </Typography>
        <Rating
          name="Rating Label"
          value={ratingValue}
          onChange={(event, newValue) => {
            setRatingValue(newValue);
          }}
        />
      </Box> */}

    </Product>

  )
};


export default CheckoutItems


  /* ${mobile({ flexDirection: "column" })} */

const Product = styled.div`
  display: flex;
  justify-content: space-between;

`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

 /* ${mobile({ margin: "5px 15px" })} */
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
 
`;

  /* ${mobile({ marginBottom: "20px" })} */
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

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
const AmountBtnDel = styled.span`
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