
  import styled from "styled-components";
 
  import { useEffect, useState } from 'react';
  
  import axios from "axios";
  import Load from "./Load";
  //import {  Spinner } from 'react-bootstrap'
  import DropIn from "braintree-web-drop-in-react";
//   import 'bootstrap/dist/css/bootstrap.css';
  
  const CreditCard = props => {
    // const itemss=[{name:'ansksksk',price:10}]
  const [spin,setSpin]=useState(false)
  const [btn,setBtn]=useState(true)
  const [values,setValues]=useState({
    clientToken:null,
    error:'',
    done:'',
    instance:''
  })
  const {clientToken,error,done,instance}=values
    const makepayment=()=>{
       setSpin(true)
        
        let o_info,u_info,s_info,b_info;
        let product_o=[];
        let total_item=0
        props.itemss.map(it=>{
            if(it.id==undefined)
            {
              product_o.push({
                product_variant_id:null,
                product_id:null,
                product_variant_name:it.variant_name,
                product_name:it.name,
                price:it.price,
                quantity:it.count
              })
            }
            product_o.push({
              product_variant_id:null,
              product_id:null,
              product_variant_name:it.variant_name,
              product_name:it.name,
              price:it.price,
              quantity:it.count
            })
            
            total_item=total_item+it.count
          })
          u_info = {
            email: props.user.email,
            first_name: props.user.first_name,
            last_name: props.user.last_name,
            password: 'agag'
          }
      
          o_info = {
            total_amount: props.total,
            total_items: total_item,
            delivery_method: props.method,
            payment_method: "credit card",
          }
      
          s_info = {
            id: props.ship.id,
            name: props.ship.user_address,
            mobile:'9363939370',
            phone: '3927966372',
            user_address: props.ship.user_address,
            country: props.ship.country,
            province: props.ship.province,
            city: props.ship.city,
            postal_code: props.ship.postal_code,
          }
      
          b_info = {
            id: props.bill.id,
            name:props.bill.user_address,
            mobile: '17282882',
            phone: '2863883828',
            user_address: props.bill.user_address,
            country: props.bill.country,
            province: props.bill.province,
            city: props.bill.city,
            postal_code: props.bill.postal_code,
          }
          let order_json={}
          if(props.billing==true)
          {
              order_json = {
              userId:props.user_Id,
              createUserAccount:0,
              orderInfo: o_info,
              products: product_o,
              userInfo: u_info,
              shipping_info: s_info,
              billing_info: s_info,
        
            };
          }
          else{
              order_json = {
              userId:props.user_Id,
              createUserAccount:0,
              orderInfo: o_info,
              products: product_o,
              userInfo: u_info,
              shipping_info: s_info,
              billing_info: b_info,
        
            };
            
          } 
          // const body={
          //   token,
          //   product_o
          // }

        // axios.post(`http://95.111.240.143:8080/ecom-api/payment`,body)
        //   .then(res=>{
        //     console.log('order postation fhfhftch',res.data)

            axios.post(`http://95.111.240.143:8080/ecom-api/orders`,order_json)
            .then(res=>{
              console.log('order postation fhfhftch',res.data)
               // toggle()
              props.parentCall('heloo')
            
            }).catch(err=>console.log(err))
             // toggle()
          
       //   }).catch(err=>console.log(err))
        }

        const onPurchase=()=>{
          console.log("in purchase",instance)
          if(instance!='')
          {
          instance.requestPaymentMethod()
          .then(data=>{
            let nonce=data.nonce;
            let paymentData={
              payment_method_nonce:nonce,
              amount:props.total
            }
          axios.post(`http://95.111.240.143:8080/ecom-api/payment`,paymentData)
          .then(res=>{
            console.log('payment response',res)
            if(res.err)
            {
              setValues({...values,error:res.error})
            }
            else{
              setBtn(false)
              makepayment()
              setValues({...values,error:'',done:res.data.success})
            }
          })
          }).catch(err=>console.log(err))
        }
        else console.log('heloooooooososososo')
      }



    useEffect(() => {
     console.log('info',props.values.clientToken)
     setValues(props.values)
     setSpin(false)
          
    }, [])
    return (
      <Container >
      
        {clientToken && spin ==false?
        <Popup>
      <DropIn
      options={{ authorization: clientToken }}
      onInstance={(instance)=>{setValues({...values,instance:instance})}}
      />
     {btn && 
     <PayBtn onClick={()=>onPurchase()} >Pay</PayBtn> 
  }
    </Popup>:<Load/> }
    </Container>
        // spin==true?
        // style={{opacity:'0.7',backgroundColor:'white'}}
      
          /* {spin==false?
           */
      

          /* // <StripeCheckout
          //          token={makepayment}
          //          stripeKey='pk_test_51KDmTcF2qtCPGsPVg6Kf09HgXMweOjjQqN9ggmA6ag0rWvRYITKVBMT8uBaZzfn6muf9FuHJ9mI9VmfU5501fTyd00KN1mdTXR'
          //          />
                  // :
                
                 //<Load/> 
                //    <Spinner
                //    as="span"
                //    variant="light"
                //    size="lg"
                //    role="status"
                //    aria-hidden="true"
                //    style={{textAlign:'center'}}
                //    animation="border"/>
                   
                   
         } */
      
    );
  };
  
  export default CreditCard;
  
  
  
const Popup= styled.div`
width:500px;
height:400px;
margin-left:auto;
margin-right:auto; 


`;
const PayBtn= styled.button`
width:500px;
margin-left:auto;
color:white;
font-size:24px;
font-weight:bold;
font-style:italic;
margin-right:auto;
height:7vh;
border-radius:8px;
cursor:pointer; 
background-color:teal;  
`;
  
  const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
   
  `;
 
  