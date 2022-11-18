import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CheckoutItems from '../components/checkout/items';
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Link from 'next/link'
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { removeProduct } from '../components/redux/action';
import { setCount } from '../components/redux/action';
import {   ModalBody, ModalFooter ,ModalHeader, } from "reactstrap";
import { ArrowDropDown, Home, HouseOutlined, Payment, ShoppingBasket,DeleteOutline, Edit,LocalShippingOutlined } from '@material-ui/icons';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import Footer from "../components/foot/Footer"
import Navbar2 from "../components/Navbar"
import Head from 'next/head'
import router from 'next/router';
import Spin from './spin';
import CreditCard from '../components/CreditCard';
import DropIn from "braintree-web-drop-in-react";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  // const stripe = useStripe();
  //   const elements = useElements();
  const removeFromCart = (pid) => {
    dispatch(removeProduct(
      {
        id: pid,

      }
    ))
  }

  const [values,setValues]=useState({
    clientToken:null,
    error:'',
    done:'',
    instance:''
  })
  const {clientToken,error,done,instance}=values
  const itemss = useSelector(state => state.cart.cartItems);
  const [radio, setRadiobtn] = useState({
    selected: '',
  });
  const [billinfo,setBillInfo]=useState()
  const [list,setList]=useState(false)
  const [creditcard,setCreditCard]=useState(false)
  const [shipinfo,setShipInfo]=useState()
  const [shipp, setShipping] = useState([]);
  const [standard, setStandard] = useState();
  const [premium, setPremium] = useState();
  const [shipprice, setShipPrice] = useState();
  const [put_s,setPut]=useState()
  const [billput,setBillPut]=useState()
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const [mydate, setMyDate] = useState('');
  const [user_Id, setUserId] = useState({});
  const [title, setTitle] = useState(false);
  const [sum, setSum] = useState(0);
  const [cval, setCVal] = useState(0);
  const [user, setuser] = useState({});
  const [bol, setBol] = useState(false);
  const [account, setAccount] = useState(false);
  const [editdiv, setEditDiv] = useState(false);
  const [editbilling, setEditBilling] = useState(false);
  const [adddiv, setAddDiv] = useState(false);
  const [billlist, setBillList] = useState(false);
  const [passchecked, setpassChecked] = useState(false);
  const [billing, setBilling] = useState(true);
  const [discount, setDiscount] = useState(false);
  const [pro, setPro] = useState([]);
  const [coupon_code, setCoupon] = useState();
  const [coupon_error, setError] = useState();
  const [success, setSuccess] = useState();
  const [errordiv, setErrorDiv] = useState(false);
  const [payment, setPayment] = useState('');
  const [spin, setSpinner] = useState(false);
  const [ptotal, setPTotal] = useState(null);
  const[shipmethod,setShipMethod]=useState('');
  const [editship, setEditShip] = useState({
    id:null,
    user_address:'STP Islamabad',
    type:'',
    name:'',
    city:'',
    province:'',
    postal_code:'',
    country:''
});
const [addship, setAddShip] = useState({
  id:null,
  user_address:'',
  type:'',
  name:'',
  city:'',
  province:'',
  postal_code:'',
  country:''
});
const [adderror, setAddError] = useState({
  
  user_address:'',
  city:'',
  province:'',
  postal_code:'',
  country:''
});

const [addbillerror, setAddBillError] = useState({
  
  user_address:'',
  city:'',
  province:'',
  postal_code:'',
  country:''
});
const [defaultship, setDefaultShip] = useState({
  id:null,
  user_address:'',
  type:'',
  name:'',
  city:'',
  province:'',
  postal_code:'',
  country:''
});

const [address, setBill] = useState({
  id:null,
  user_address:'',
  type:'',
  name:'',
  city:'',
  province:'',
  postal_code:'',
  country:''
});

const [accountship, setAccountShip] = useState({
  id:null,
  user_address:'',
  type:'shipping',
  name:'',
  city:'',
  province:'',
  postal_code:'',
  country:''
});
const [accountbill, setAccountBill] = useState({
  id:null,
  user_address:'',
  type:'billing',
  name:'',
  city:'',
  province:'',
  postal_code:'',
  country:''
});

  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = data => {
    var total_item=0
    var o_info = {}
    var u_info={}
    var s_info = {}
    var b_info = {}
    let product_o=[];
    setSpinner(true)
    console.log("data",data)

    itemss.map(it=>{
      // if(it.id==undefined)
      // {
      //   product_o.push({
      //     product_variant_id:null,
      //     product_id:null,
      //     product_variant_name:it.variant_name,
      //     product_name:it.name,
      //     price:it.price,
      //     path:it.image,
      //     quantity:it.count
      //   })
      // }
      let x=it.image;
      x=x.substring(5)
      console.log("img is",x)
      product_o.push({
        product_variant_id:null,
        product_id:it.id,
        product_variant_name:it.variant_name==undefined?'':it.product_variant_id,
        product_name:it.name,
        price:it.price,
        path:x,
        quantity:it.count
      })
      
      total_item=total_item+it.count
    })
    setSum(total_item)
    setPayment(data.payment)

    if(account==true)
    {
    u_info = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      password: 'agag'
    }

    o_info = {
      total_amount: priceTotal,
      total_items: total_item,
      delivery_method: 'standard',//shipmetod should be replaced
      payment_method: data.payment,
    }

    s_info = {
      id: defaultship.id,
      name: defaultship.user_address,
      mobile:'9363939370',
      phone: '3927966372',
      user_address: defaultship.user_address,
      country: defaultship.country,
      province: defaultship.province,
      city: defaultship.city,
      postal_code: defaultship.postal_code,
    }

    b_info = {
      id: address.id,
      name:address.user_address,
      mobile: '17282882',
      phone: '2863883828',
      user_address: address.user_address,
      country: address.country,
      province: address.province,
      city: address.city,
      postal_code: address.postal_code,
    }
    let order_json={}
    if(billing==true)
    {
        order_json = {
        userId:user_Id,
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
        userId:user_Id,
        createUserAccount:0,
        orderInfo: o_info,
        products: product_o,
        userInfo: u_info,
        shipping_info: s_info,
        billing_info: b_info,
  
      };
     
    }
  }
  else{
    u_info = {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      password: 'agag'
    }

    o_info = {
      total_amount: priceTotal,
      total_items: total_item,
      delivery_method: 'standard',
      payment_method: data.payment,
    }

    s_info = {
      id: accountship.id,
      name: accountship.user_address,
      mobile:'9363939370',
      phone: '3927966372',
      user_address: accountship.user_address,
      country: accountship.country,
      province: defaultship.province,
      city: accountship.city,
      postal_code: accountship.postal_code,
    }

    b_info = {
      id: accountbill.id,
      name:accountbill.user_address,
      mobile: '17282882',
      phone: '2863883828',
      user_address: accountbill.user_address,
      country: accountbill.country,
      province: accountbill.province,
      city: accountbill.city,
      postal_code: accountbill.postal_code,
    }
    order_json = {
      userId:user_Id,
      createUserAccount:0,
      orderInfo: o_info,
      products: product_o,
      userInfo: u_info,
      shipping_info: s_info,
      billing_info: b_info,

    };

  }

    if(data.payment=='credit card')
    {
      setCreditCard(true)
    }
    
    else{
    console.log('json',order_json);
    setModal(true)
  
    axios.post(`https://api.perniacouture.pk/pernia-api/orders`,order_json)
    .then(res=>{
      console.log('order postation fhfhftch',res.data)
      toggle()
      setModal(!modal)
    
    }).catch(err=>console.log(err))
  }
  }
  
  
  
  const handleDiscount = () => {
    setDiscount(!discount)
    setErrorDiv(false)
    setError('')
    setSuccess('')
  }



  const handleChangepass = () => {
    // Change state to the opposite (to ture) when checkbox changes

    setpassChecked(!passchecked);
  };

  const handleChangebill = () => {
    // Change state to the opposite (to ture) when checkbox changes
    if(address.id==null)
    {
    setBilling(!billing);
    }
    else{
      setBilling(!billing)
      setBillList(true)
    }
  };
  const handleChangebillingList = () => {
    // Change state to the opposite (to ture) when checkbox changes
  
    setBilling(!billing);
    setBillList(false)
    
     
    
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log("valueffuyffuf",value);
    console.log('editShip',editship)
    setPut({
        [name]: value
    })
    setEditShip({
      ...editship,  
      [name]: value
  })
   
  }
  
  const handleAChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log("valueffuyffuf",value);
    console.log('editShip',account)
    setAccountShip({
      ...accountship,  
      [name]: value
  })
   
  }


  const handleAddChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log("valueffuyffuf",value);
    console.log('editShip',editship)
  
    setAddShip({
      ...addship,  
      [name]: value
  })
   
  }
  const handleEditChange =(name)=> (e) => {
    //const name = e.target.name;
    const value = e.target.value;
    console.log("valueffuyffuf",value);
    console.log('editShip',editship)
    if(address.id!=null)
    {
    setBillPut({
      [name]: value
    })
  }
    setBill({
      ...address,  
      [name]: value
  })
   
  }
  
  const handleEditAChange =(name)=> (e) => {
    //const name = e.target.name;
    const value = e.target.value;
    console.log("valueffuyffuf",value);
    console.log('editShip',editship)
    setAccountBill({
      ...accountbill,
      [name]:value
    })
   
  } 



  const getToken=()=>{
   axios.get(`https://api.perniacouture.pk/pernia-api/payment`)
   .then(res=>{
    // console.log("res",res.data.clientToken)
     if(res.err)
     {
       setValues({
         ...values,error:res.err
       })
     }
     else{
       setValues({
         ...values,
         clientToken:res.data.clientToken
       })
     }
  })
  }

  const { cartItems } = useSelector(state => state.cart);

  const priceTotal = useSelector(state => {
    const cartItems = state.cart.cartItems;
    let totalPrice = 0;
    let tt=0;
    if (cartItems.length > 0) {
      cartItems.map(item => {
        totalPrice += item.price * item.count;
        tt+=tt+item.count
        console.log("tttttttt",tt)
      });
      
    }

    return totalPrice;
  })

  const handleApply = () => {
    
    axios.get(`https://api.perniacouture.pk/pernia-api/coupons/byuser`)
    .then(res=>{
      let curr=new Date()
      setErrorDiv(true)
      let status=false
      
       res.data.data.map(coupon=>{
          if(coupon.coupon_code==coupon_code)
          {
            let date=''
            status=true
            
            console.log('expiry date',date)
            const d = new Date(coupon.expiry_date);
            coupon.expiry_date=d;
            console.log('curr',curr)
            console.log('expiry',d)
            let ucid=''
            ucid=ucid+user_Id+coupon.id
            ucid=parseInt(ucid)
            console.log('iididididi',ucid)
            if(curr.getTime()>d.getTime())
            {
              setError('Coupon Expired')
              setSuccess('')
            }
            else if(coupon.usage_limit_per_coupon==coupon.total_usage)
            {
              setError('Sorry You are too late to use this')
              setSuccess('')
            }
            else{
              console.log('heloooo',ucid)
              axios.get(`https://perniacouture.pk/pernia-api/coupons/user_coupon_id/${ucid}`)
              .then(resp=>{
                console.log(resp)
                if(resp.data.success==0)
                {
                  
                  // let ucid=''
                  // ucid=ucid+user_Id+coupon.id
                  // ucid=parseInt(ucid)
                  console.log('uciddryd',coupon.id)
                  axios.post(`https://perniacouture.pk/pernia-api/coupons/user_coupon_id`,{id:ucid, cid:coupon.id,usage:coupon.total_usage},
                  { headers: { 'content-type': 'application/json' } },
                  )
                  .then(res=>{
                    console.log('inif',res.data)
                    setSuccess('coupon applied successfully')
                    setDiscount(true)
                    if(coupon.discount_type=='percentage')
                    {
                      let dval=(coupon.discount_value/100)*priceTotal
                      let tt=(priceTotal-(dval)+shipprice)
                      setPTotal(tt)
                      setCVal(dval)
                    }
                    else{
                      console.log('helooo',priceTotal)
                    let tt= (priceTotal-coupon.discount_value)+shipprice
                     console.log('helooo',priceTotal)
                     setPTotal(tt)
                     setCVal(coupon.discount_value)
                    }
                  }).catch(error=>console.log(error))

                }
                else{
                  if(coupon.usage_limit_per_user==resp.data.data.user_limit)
                  setError('Your limit to use Coupon is already completed')
                  else{
                    let lim=resp.data.data.user_limit;
                    console.log('lim',lim,'and res .dataa',resp.data.limit)
                    lim=lim+1
                    axios.put(`https://api.perniacouture.pk/pernia-api/coupons/user_coupon_id/${ucid}`,{limit:lim,cid:coupon.id,usage:coupon.total_usage},
                    { headers: { 'content-type': 'application/json' } },)                
                    .then(response=>{
                      setSuccess('coupon applied successfully')
                      setDiscount(true)
                    if(coupon.discount_type=='percentage')
                    {
                      let dval=(coupon.discount_value/100)*priceTotal
                      let tt=(priceTotal-(dval)+shipprice)
                      setPTotal(tt)
                      setCVal(dval)
                    }
                    else{
                      console.log('helooo',priceTotal)
                      let tt= priceTotal-coupon.discount_value+shipprice
                      console.log('helooo',priceTotal)
                      setPTotal(tt)
                      setCVal(coupon.discount_value)
                    }
                                     // console.warn("rsponse",response)
                                    })
                      .catch(err=>console.log(err))
                  }
                }
              }).catch(err=>console.log(err))

             // setSuccess('coupon applied suuceesfully')
            }
          }
       })
       if(status==false)
       {
    setError('Invalid coupon code')
    setSuccess('')
       }
       
    }).catch(err=>console.log(err))
    

  }
  const handleCoupon = (e) => {
    console.log('val',e.target.value)
   setCoupon(e.target.value)
   setErrorDiv(false)
  }
  const handleCredit = (value) => {
    console.log('heloo',value)
    setCreditCard(true)
  }
  const handleSMethod= (name) => {
     let p;
    if(ptotal==null)
    {
    p=priceTotal
    }
    else
    {
    p=ptotal
    }
    if(name=='premium')
    {
      if(priceTotal>=premium.cartlimit)
      {
        p=(priceTotal-cval)+0
        setShipPrice('free ship')
        setShipMethod('premium')
        setPTotal(p)
      }
      else{
        p=(priceTotal-cval)+premium.price
        setShipPrice(premium.price)
        setShipMethod('premium')
        setPTotal(p)
      }
      

    }
    else{

      if(priceTotal>=standard.cartlimit)
      {
        p=(priceTotal-cval)+0
        setShipPrice('free ship')
        setShipMethod('standard')
        setPTotal(p)
      }
      else{
        p=(priceTotal-cval)+standard.price
        setShipPrice(standard.price)
        setShipMethod('standard')
        setPTotal(p)
      }
    }
  }

  const handleradioChange = item => e => {
    setRadiobtn({
      selected: e.target.value,
    });
    setDefaultShip(item)
    console.log(e.target.value);
  };
  function editshipdetails(id) {
    shipp.map(item => {
    if (item.id == id){ 
    setEditShip(item);
    setEditDiv(true)
    setTitle(true)
    }
  });
  
}

const submitShipHandler=(e)=>{
  //e.preventDefault();
  
  editship.type='shipping'
  console.log('ship_details details',editship)
  setEditDiv(false)
  setTitle(false)
  let ship_arr=[]
  shipp.map(it=>{
    if(it.id==editship.id)
    {
      ship_arr.push(editship);
      setShipInfo({
        id:it.id
      })
    
     setRadiobtn({
       selected:it.id
     })
     setDefaultShip(it)

   }
   else{
     ship_arr.push(it);
   }
    
  })
  setShipping(ship_arr)
  console.warn("rsponsegsffsdfd")
  axios.put(`https://api.perniacouture.pk/pernia-api/addresses/${editship.id}`,put_s)
  .then(response=>{
    console.warn("rsponse",response)
  })
  .catch(err=>console.log(err))
      // console.log("Add Search")
      // const config = {
      //   headers: {
      //     Authorization: 'Bearer ' + localStorage.getItem('token'),
      //   },
      // };
    
      // const ship_arr = [];
      // axios
      //   .get(`https://perniacouture.pk/pernia-api/addresses/${user_Id}`, config)
      //   .then(response => {
      //     var i = 0;
      //     response.data.data.map(item => {
      //       if (item.type == 'shipping') {
      //         if (i == 0) {
               
      //           ship_arr.push(item);
      //            setShipInfo({
      //              id:item.id
      //            })
               
      //           setRadiobtn({
      //             selected:item.id
      //           })
                
      //           i = i + 1;
      //         }
      //         else{
      //           ship_arr.push(item);
      //         }
              
      //       } else setBill(item);
      //     });
      //     setShipping(ship_arr);
      
      //   })
      //   .catch(err => console.log(err));
      // }).catch(err=>console.log(err))
  
  
}


const submitEditBillHandler=(e)=>{
  //e.preventDefault();
  
  
  console.log('ship_details details',address)
  setEditBilling(false)
 // setTitle(false)
  axios.put(`https://api.perniacouture.pk/pernia-api/addresses/${address.id}`,billput)
  .then(response=>{
    setBill(address)
    console.warn("rsponse",response)
  })
  .catch(err=>console.log(err))
      // console.log("Add Search")
      // const config = {
      //   headers: {
      //     Authorization: 'Bearer ' + localStorage.getItem('token'),
      //   },
      // };
    
      // const ship_arr = [];
      // axios
      //   .get(`https://perniacouture.pk/pernia-api/addresses/${user_Id}`, config)
      //   .then(response => {
      //     var i = 0;
      //     response.data.data.map(item => {
      //       if (item.type == 'shipping') {
      //         if (i == 0) {
               
      //           ship_arr.push(item);
      //            setShipInfo({
      //              id:item.id
      //            })
               
      //           setRadiobtn({
      //             selected:item.id
      //           })
                
      //           i = i + 1;
      //         }
      //         else{
      //           ship_arr.push(item);
      //         }
              
      //       } else setBill(item);
      //     });
      //     setShipping(ship_arr);
      
      //   })
      //   .catch(err => console.log(err));
      // }).catch(err=>console.log(err))
  
  
}


const submitAddShipHandler=(e)=>{
  e.preventDefault();
  
  if(addship.user_address=='')
  {
    setAddError({
      ['user_address']:'Required',
     
  })
 
  }
   else if(addship.country=='')
   {
  setAddError({
    ['country']:'Required'})
  }
   else if(addship.city=='')
   {
  setAddError({...adderror,['city']:'Required'})
   }
   else if(addship.postal_code=='')
   {
  setAddError({...adderror,['postal_code']:'Required'})
   }
  else if(addship.province=='')
  {
  setAddError({...adderror,['province']:'Required'})
  }

else{
  addship.type='shipping'

  axios.post(`https://api.perniacouture.pk/pernia-api/addresses/${user_Id}`,addship,

{headers: { 'content-type': 'application/json' }}
)
.then(response=>{
  console.log("rsponse",response.data);
  setAddDiv(false)
  setAddShip({
    id:null,
    user_address:'',
    type:'',
    name:'',
    city:'',
    province:'',
    postal_code:'',
    country:''
  })
  console.log("Add Search")
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };
  const ship_arr = [];
  const selected_ship = [];
  axios
    .get(`https://api.perniacouture.pk/pernia-api/addresses/${user_Id}`, config)
    .then(response => {
      var i = 0;
      response.data.data.map(item => {
        if (item.type == 'shipping') {
          if (i == 0) {
           
            ship_arr.push(item);
            setShipInfo({
              id:item.id
            })
            
            setRadiobtn({
              selected:item.id
            })
            
            i = i + 1;
            setDefaultShip(item)
          }
          else{
            ship_arr.push(item);
          }
          
        } else{ setBill(item);
          setBillInfo({
            id:item.id
          })
          
        }
      });
      setShipping(ship_arr);
      
      
      
    })
    .catch(err => console.log(err));

} 
)
.catch(error=>{
  console.log(error)
})
}

}


const submitAddBillHandler=(e)=>{
  e.preventDefault();
  
  if(address.user_address=='')
  {
    setAddBillErrorError({
      ['user_address']:'Required',
      ['country']:'Required',
      ['province']:'Required',
      ['city']:'Required',
      ['postal_code']:'Required',

  })
  }
  else if(address.country=='')
  setAddBillError({
    ['country']:'Required'})
  else if(address.city=='')
  setAddBillError({...address,['city']:'Required'})
  else if(address.postal_code=='')
  setAddBillError({...address,['postal_code']:'Required'})
  else if(address.province=='')
  setAddBillError({...address,['province']:'Required'})

else{


  address.type='billing'

  axios.post(`https://api.perniacouture.pk/pernia-api/addresses/${user_Id}`,address,

{headers: { 'content-type': 'application/json' }}
)
.then(response=>{
  console.log("rsponse",response.data);
  setList(true)
  setBillList(true)
    

} 
)
.catch(error=>{
  console.log(error)
})
}
}

const handleModal = child => {
   setModal(true)
   setCreditCard(false);
  
};




const move=()=>{
  console.log('in move ')
  while(itemss.length!=0)
    {
     itemss.map(it=>{
      dispatch(removeProduct(
        {
          id: it.id,
  
        }
      ))
     })
      
    }
    router.push('/')
}


  useEffect(() => {
    
    setEditBilling(false)
    if (!localStorage.getItem('token')) {
      setuser({})
      setBol(true)
      setAccount(false)
    }
    else {
      
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };
      getToken();
       setSum(5)
       let date=new Date()
       date=date.toString()
       let dd=''
       for(let i=0;i<15;i++)
       dd=dd+date[i]
       setMyDate(dd)
      setBol(false)
      setAccount(true)
      var token = localStorage.getItem('token')
      var decoded = jwt_decode(token);
      
      const u_id = decoded.result.id;
      setUserId(u_id)
      axios.get(`https://api.perniacouture.pk/pernia-api/users/${u_id}`,

        { headers: { "Authorization": `Bearer ${token}` } }
      )
        .then(response => {
          console.log('user',response.data.data)
          setuser(response.data.data)
          console.log(user)
        }).catch((err) => {

          console.log(err)
        });
        const ship_arr = [];
     
        axios.get(`https://api.perniacouture.pk/pernia-api/shipping`)
        .then(response => {
          console.log('shipping',response.data.data)
          response.data.data.map(sh=>{
            if(sh.category=='standard')
            setStandard(sh)
            else
            setPremium(sh)
          })
          console.log(user)
        }).catch((err) => {

          console.log(err)
        });
    
    axios
      .get(`https://api.perniacouture.pk/pernia-api/addresses/${u_id}`, config)
      .then(response => {
        
         var i = 0;
         setPro(itemss)
         
        // setUserId(item.user_id)
        // state.userId=item.user_id
        response.data.data.map(item => {
          if (item.type ==='shipping') {
            if (i === 0) {
              setShipInfo({
                id:item.id
              })
             
              
              ship_arr.push(item);
              setRadiobtn({
                selected:item.id
              })
              
              i = i + 1;
              
              setDefaultShip(item)
            }
            else{
              ship_arr.push(item);
              
            }
            
          } 
          if(item.type==='billing') {
           
            setBillInfo({
              id:item.id
            })
           
         
            setBill(item);
            setList(true)
          }
        });
        setShipping(ship_arr);
        
        
        
      })
      .catch(err => console.log(err))

    }

  }, [])

//   const onPurchase=()=>{
//     console.log("in purchase",instance)
//     if(instance)
//     {
//     instance.requestPaymentMethod()
//     .then(data=>{
//       let nonce=data.nonce;
//       let paymentData={
//         payment_method_nonce:nonce,
//         amount:ptotal
//       }
//     axios.post(`https://perniacouture.pk/pernia-api/payment`,paymentData)
//     .then(res=>{
//       console.log('payment response',res)
//       if(res.err)
//       {
//         setValues({...values,error:res.error})
//       }
//       else{
//         setValues({...values,error:'',done:res.data.success})
//       }
//     }).catch(error=>console.log(error))
//     }).catch(err=>console.log(err))
//   }
//   else console.log('heloooooooososososo')
// }

  // const setInstance=()=>{
  //   console.log('instanceee',instance)
  //   // setValues({
  //   //   ...values,
  //   //   instance:inst
  //   // })
  // }

  return (
    <Body>
   
   <TopLinks>
   <StyledLink href="/"><Logo src='./pernia.png'></Logo></StyledLink>
   <StyledLink href="/cart"><TopBtn>Back to Cart</TopBtn></StyledLink>
   </TopLinks>
       <div style={modal==true?{opacity: '0'}:null}>
   
      
      <Top>Checkout</Top>
      {account==false?
      <StyledLink href="/account/login"><Login>Already have an account? Click here to login</Login></StyledLink>:''
      }
      </div>
      {clientToken && creditcard?
     
    //   <Popup>
    //   <DropIn
    //   options={{ authorization: clientToken }}
    //   onInstance={(instance)=>{setValues({...values,instance:instance})}}
    // />
    // <PayBtn onClick={onPurchase()} >Pay</PayBtn>
    // </Popup>
     <CreditCard 
         values={values}
         user={user}
         itemss={itemss}
         ship={defaultship}
         bill={address}
         billing={billing}
         total={ptotal}
         user_Id={user_Id}
         method={shipmethod}
         parentCall={handleModal}
         />
   
    :
    ''
        //  <CreditCard 
        //  user={user}
        //  itemss={itemss}
        //  ship={defaultship}
        //  bill={address}
        //  billing={billing}
        //  total={ptotal}
        //  user_Id={user_Id}
        //  method={shipmethod}
        //  parentCall={handleModal}
        //  />
          

                  }
       {modal &&
       <>
            <Modal>
              <Detail>
                <h3>Thank You for your Order</h3>
                <OrderList>
                  <label>Order Id</label>
                  <label style={{marginLeft:'100px'}}>2627</label>
                </OrderList>
                <OrderList>
                  <label>Order Date</label>
                  <label style={{marginLeft:'80px'}}>{mydate}</label>
                </OrderList>
                <OrderList>
                  <label>Customer Name</label>
                  {console.log('user',user)}
                  <label style={{marginLeft:'50px'}}>{user.first_name}</label>
                </OrderList>
                <p>
                  Please keep the above numbers for your reference. We will also send the conformation  to the email address
                   you used for this order. Please allow up to 24 hours for us to process your order for shipment 
                </p>
               <Address>
                 <div>
                 <h4 >Shipping Address</h4>
                 <div style={{display:'flex',flexDirection:'column',marginTop:'-30px'}}>
                 <h4>{user.first_name}</h4>
                 <label style={{marginTop:'-15px'}}>{defaultship.user_address}</label>
                 </div>
                 </div>
                 <div style={{marginLeft:'80px'}}>
                 <h4>Payment Method</h4>
                 <label style={{marginTop:'-15px'}}>{payment}</label>
                 </div>
               </Address>
               <Address>
                 <div>
                 <h4>Billling Address</h4>
                 <div style={{display:'flex',flexDirection:'column',marginTop:'-30px'}}>
                 <h4>{user.first_name}</h4>
                 {address.user_address!='' && billing==false?
                 <label style={{marginTop:'-15px'}}>{address.user_address}</label>:
                 <label style={{marginTop:'-15px'}}>{defaultship.user_address}</label>
                }
                 </div>
                 </div>
                 <div style={{marginLeft:'90px'}}>
                 <h4>Shipping Method</h4>
                 <label style={{marginTop:'-15px'}}>Standard</label>
                 </div>
               </Address>
              </Detail>  
                  
                  <OSummary style={{marginLeft:'100px',height:'330px',marginTop:'20px'}}>
                  <SummaryItemTitle style={{marginLeft:'60px',fontWeight:'800'}}>Order Summary</SummaryItemTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>${priceTotal.toFixed(2)}</SummaryItemPrice>
                </SummaryItem><hr/>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice> {shipprice} Rs</SummaryItemPrice>
                </SummaryItem><hr/>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>0 Rs</SummaryItemPrice>
                </SummaryItem><hr/>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  {/* this must be placed here after shipping is added {ptotal.toFixed(2)} */}
                  <SummaryItemPrice ><strong>{priceTotal.toFixed(2)} Rs</strong></SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                <GoButton color="primary" type='button' onClick={()=>move()}>Okay</GoButton>
                </SummaryItem>

              </OSummary>
                        
            </Modal>
</>
}

     

      <Container style={modal==true || creditcard==true?{opacity: '0'}:null}>
 
        <Form  onSubmit={handleSubmit(onSubmit)}>

          <Left>
           
          {editdiv &&

      <FormDiv>
        <TitleBlock><HouseOutlined style={{ paddingRight: '50px' }} />   Shipping Address</TitleBlock>
                  <div >
              
              <InputDiv> <label>Street Address:</label>
                <Input name='user_address' onChange={()=>handleChange} placeholder="Street Address: Line 1" value={editship.user_address}  />
                <Error >{errors.user_address?.type === 'required' && "Street Address is required"}</Error>

                <Input placeholder="Line 2" {...register("street_address2")} />
              </InputDiv>

              <InputDivC>
                <InputDivS>
                  <Select name='country' {...register("country", { required: true })} onChange={()=>handleChange} >
                    <option value={editship.country} disabled selected>{editship.country}</option>
                    <option value="AF">Afghanistan</option>
                    <option value="AX">Åland Islands</option>
                    <option selected value="PK">PaKistan</option>
                    <option value="DZ">Algeria</option>
                    <option value="AS">American Samoa</option>
                    <option value="AD">Andorra</option>
                    <option value="AO">Angola</option>
                    <option value="AO">UK</option>
                  </Select>
                  <Error >{errors.country?.type === 'required' && "Country is required"}</Error>
                </InputDivS>

                <InputDivS>
                  <Select name='province' {...register("province", { required: true })} onChange={()=>handleChange}>
                    <option value={editship.province} disabled selected>{editship.province}</option>
                    <option value="Azad Kashmir">Azad Kashmir</option>
                    <option value="Balochistan">Balochistan</option>
                    <option value="Islamabad">Islamabad </option>
                    <option value="Khyber-Pakhtunkhwa">Khyber-Pakhtunkhwa</option>
                    <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                    <option value="Punjab ">Punjab</option>
                    <option value="Sindh">Sindh</option>
                  </Select>
                  <Error >{errors.province?.type === 'required' && "State is required"}</Error>
                </InputDivS>


              </InputDivC>


              <InputDivC>
                <InputDivS>
                  <Select name='city'{...register("city", { required: true })} onChange={()=>handleChange}>
                    <option value={editship.city} disabled selected>{editship.city} </option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="" disabled>Punjab Cities</option>
                    <option value="Ahmed Nager Chatha">Ahmed Nager Chatha</option>
                    <option value="Ahmadpur East">Ahmadpur East</option>
                    <option value="Ali Khan Abad">Ali Khan Abad</option>
                    <option value="Alipur">Alipur</option>
                    <option value="Arifwala">Arifwala</option>
                    <option value="Attock">Attock</option>
                    <option value="Bhera">Bhera</option>
                    <option value="Bhalwal">Bhalwal</option>
                    <option value="Bahawalnagar">Bahawalnagar</option>
                    <option value="Bahawalpur">Bahawalpur</option>
                    <option value="Bhakkar">Bhakkar</option>
                    <option value="Burewala">Burewala</option>
                    <option value="Chillianwala">Chillianwala</option>
                    <option value="Chakwal">Chakwal</option>
                    <option value="Chichawatni">Chichawatni</option>
                    <option value="Chiniot">Chiniot</option>
                    <option value="Chishtian">Chishtian</option>
                    <option value="Daska">Daska</option>
                    <option value="Darya Khan">Darya Khan</option>
                    <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
                    <option value="Dhaular">Dhaular</option>
                    <option value="Dina">Dina</option>
                    <option value="Dinga">Dinga</option>
                    <option value="Dipalpur">Dipalpur</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Ferozewala">Ferozewala</option>
                    <option value="Fateh Jhang">Fateh Jang</option>
                    <option value="Ghakhar Mandi">Ghakhar Mandi</option>
                    <option value="Gojra">Gojra</option>
                    <option value="Gujranwala">Gujranwala</option>
                    <option value="Gujrat">Gujrat</option>
                    <option value="Gujar Khan">Gujar Khan</option>
                    <option value="Hafizabad">Hafizabad</option>
                    <option value="Haroonabad">Haroonabad</option>
                    <option value="Hasilpur">Hasilpur</option>
                    <option value="Haveli Lakha">Haveli Lakha</option>
                    <option value="Jatoi">Jatoi</option>
                    <option value="Jalalpur">Jalalpur</option>
                    <option value="Jattan">Jattan</option>
                    <option value="Jampur">Jampur</option>
                    <option value="Jaranwala">Jaranwala</option>
                    <option value="Jhang">Jhang</option>
                    <option value="Jhelum">Jhelum</option>
                    <option value="Kalabagh">Kalabagh</option>
                    <option value="Karor Lal Esan">Karor Lal Esan</option>
                    <option value="Kasur">Kasur</option>
                    <option value="Kamalia">Kamalia</option>
                    <option value="Kamoke">Kamoke</option>
                    <option value="Khanewal">Khanewal</option>
                    <option value="Khanpur">Khanpur</option>
                    <option value="Kharian">Kharian</option>
                    <option value="Khushab">Khushab</option>
                    <option value="Kot Addu">Kot Addu</option>
                    <option value="Jauharabad">Jauharabad</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Lalamusa">Lalamusa</option>
                    <option value="Layyah">Layyah</option>
                    <option value="Liaquat Pur">Liaquat Pur</option>
                    <option value="Lodhran">Lodhran</option>
                    <option value="Malakwal">Malakwal</option>
                    <option value="Mamoori">Mamoori</option>
                    <option value="Mailsi">Mailsi</option>
                    <option value="Mandi Bahauddin">Mandi Bahauddin</option>
                    <option value="Mian Channu">Mian Channu</option>
                    <option value="Mianwali">Mianwali</option>
                    <option value="Multan">Multan</option>
                    <option value="Murree">Murree</option>
                    <option value="Muridke">Muridke</option>
                    <option value="Mianwali Bangla">Mianwali Bangla</option>
                    <option value="Muzaffargarh">Muzaffargarh</option>
                    <option value="Narowal">Narowal</option>
                    <option value="Nankana Sahib">Nankana Sahib</option>
                    <option value="Okara">Okara</option>
                    <option value="Renala Khurd">Renala Khurd</option>
                    <option value="Pakpattan">Pakpattan</option>
                    <option value="Pattoki">Pattoki</option>
                    <option value="Pir Mahal">Pir Mahal</option>
                    <option value="Qaimpur">Qaimpur</option>
                    <option value="Qila Didar Singh">Qila Didar Singh</option>
                    <option value="Rabwah">Rabwah</option>
                    <option value="Raiwind">Raiwind</option>
                    <option value="Rajanpur">Rajanpur</option>
                    <option value="Rahim Yar Khan">Rahim Yar Khan</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Sadiqabad">Sadiqabad</option>
                    <option value="Safdarabad">Safdarabad</option>
                    <option value="Sahiwal">Sahiwal</option>
                    <option value="Sangla Hill">Sangla Hill</option>
                    <option value="Sarai Alamgir">Sarai Alamgir</option>
                    <option value="Sargodha">Sargodha</option>
                    <option value="Shakargarh">Shakargarh</option>
                    <option value="Sheikhupura">Sheikhupura</option>
                    <option value="Sialkot">Sialkot</option>
                    <option value="Sohawa">Sohawa</option>
                    <option value="Soianwala">Soianwala</option>
                    <option value="Siranwali">Siranwali</option>
                    <option value="Talagang">Talagang</option>
                    <option value="Taxila">Taxila</option>
                    <option value="Toba Tek Singh">Toba Tek Singh</option>
                    <option value="Vehari">Vehari</option>
                    <option value="Wah Cantonment">Wah Cantonment</option>
                    <option value="Wazirabad">Wazirabad</option>
                    <option value="" disabled>Sindh Cities</option>
                    <option value="Badin">Badin</option>
                    <option value="Bhirkan">Bhirkan</option>
                    <option value="Rajo Khanani">Rajo Khanani</option>
                    <option value="Chak">Chak</option>
                    <option value="Dadu">Dadu</option>
                    <option value="Digri">Digri</option>
                    <option value="Diplo">Diplo</option>
                    <option value="Dokri">Dokri</option>
                    <option value="Ghotki">Ghotki</option>
                    <option value="Haala">Haala</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Islamkot">Islamkot</option>
                    <option value="Jacobabad">Jacobabad</option>
                    <option value="Jamshoro">Jamshoro</option>
                    <option value="Jungshahi">Jungshahi</option>
                    <option value="Kandhkot">Kandhkot</option>
                    <option value="Kandiaro">Kandiaro</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Kashmore">Kashmore</option>
                    <option value="Keti Bandar">Keti Bandar</option>
                    <option value="Khairpur">Khairpur</option>
                    <option value="Kotri">Kotri</option>
                    <option value="Larkana">Larkana</option>
                    <option value="Matiari">Matiari</option>
                    <option value="Mehar">Mehar</option>
                    <option value="Mirpur Khas">Mirpur Khas</option>
                    <option value="Mithani">Mithani</option>
                    <option value="Mithi">Mithi</option>
                    <option value="Mehrabpur">Mehrabpur</option>
                    <option value="Moro">Moro</option>
                    <option value="Nagarparkar">Nagarparkar</option>
                    <option value="Naudero">Naudero</option>
                    <option value="Naushahro Feroze">Naushahro Feroze</option>
                    <option value="Naushara">Naushara</option>
                    <option value="Nawabshah">Nawabshah</option>
                    <option value="Nazimabad">Nazimabad</option>
                    <option value="Qambar">Qambar</option>
                    <option value="Qasimabad">Qasimabad</option>
                    <option value="Ranipur">Ranipur</option>
                    <option value="Ratodero">Ratodero</option>
                    <option value="Rohri">Rohri</option>
                    <option value="Sakrand">Sakrand</option>
                    <option value="Sanghar">Sanghar</option>
                    <option value="Shahbandar">Shahbandar</option>
                    <option value="Shahdadkot">Shahdadkot</option>
                    <option value="Shahdadpur">Shahdadpur</option>
                    <option value="Shahpur Chakar">Shahpur Chakar</option>
                    <option value="Shikarpaur">Shikarpaur</option>
                    <option value="Sukkur">Sukkur</option>
                    <option value="Tangwani">Tangwani</option>
                    <option value="Tando Adam Khan">Tando Adam Khan</option>
                    <option value="Tando Allahyar">Tando Allahyar</option>
                    <option value="Tando Muhammad Khan">Tando Muhammad Khan</option>
                    <option value="Thatta">Thatta</option>
                    <option value="Umerkot">Umerkot</option>
                    <option value="Warah">Warah</option>
                    <option value="" disabled>Khyber Cities</option>
                    <option value="Abbottabad">Abbottabad</option>
                    <option value="Adezai">Adezai</option>
                    <option value="Alpuri">Alpuri</option>
                    <option value="Akora Khattak">Akora Khattak</option>
                    <option value="Ayubia">Ayubia</option>
                    <option value="Banda Daud Shah">Banda Daud Shah</option>
                    <option value="Bannu">Bannu</option>
                    <option value="Batkhela">Batkhela</option>
                    <option value="Battagram">Battagram</option>
                    <option value="Birote">Birote</option>
                    <option value="Chakdara">Chakdara</option>
                    <option value="Charsadda">Charsadda</option>
                    <option value="Chitral">Chitral</option>
                    <option value="Daggar">Daggar</option>
                    <option value="Dargai">Dargai</option>
                    <option value="Darya Khan">Darya Khan</option>
                    <option value="Dera Ismail Khan">Dera Ismail Khan</option>
                    <option value="Doaba">Doaba</option>
                    <option value="Dir">Dir</option>
                    <option value="Drosh">Drosh</option>
                    <option value="Hangu">Hangu</option>
                    <option value="Haripur">Haripur</option>
                    <option value="Karak">Karak</option>
                    <option value="Kohat">Kohat</option>
                    <option value="Kulachi">Kulachi</option>
                    <option value="Lakki Marwat">Lakki Marwat</option>
                    <option value="Latamber">Latamber</option>
                    <option value="Madyan">Madyan</option>
                    <option value="Mansehra">Mansehra</option>
                    <option value="Mardan">Mardan</option>
                    <option value="Mastuj">Mastuj</option>
                    <option value="Mingora">Mingora</option>
                    <option value="Nowshera">Nowshera</option>
                    <option value="Paharpur">Paharpur</option>
                    <option value="Pabbi">Pabbi</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Saidu Sharif">Saidu Sharif</option>
                    <option value="Shorkot">Shorkot</option>
                    <option value="Shewa Adda">Shewa Adda</option>
                    <option value="Swabi">Swabi</option>
                    <option value="Swat">Swat</option>
                    <option value="Tangi">Tangi</option>
                    <option value="Tank">Tank</option>
                    <option value="Thall">Thall</option>
                    <option value="Timergara">Timergara</option>
                    <option value="Tordher">Tordher</option>
                    <option value="" disabled>Balochistan Cities</option>
                    <option value="Awaran">Awaran</option>
                    <option value="Barkhan">Barkhan</option>
                    <option value="Chagai">Chagai</option>
                    <option value="Dera Bugti">Dera Bugti</option>
                    <option value="Gwadar">Gwadar</option>
                    <option value="Harnai">Harnai</option>
                    <option value="Jafarabad">Jafarabad</option>
                    <option value="Jhal Magsi">Jhal Magsi</option>
                    <option value="Kacchi">Kacchi</option>
                    <option value="Kalat">Kalat</option>
                    <option value="Kech">Kech</option>
                    <option value="Kharan">Kharan</option>
                    <option value="Khuzdar">Khuzdar</option>
                    <option value="Killa Abdullah">Killa Abdullah</option>
                    <option value="Killa Saifullah">Killa Saifullah</option>
                    <option value="Kohlu">Kohlu</option>
                    <option value="Lasbela">Lasbela</option>
                    <option value="Lehri">Lehri</option>
                    <option value="Loralai">Loralai</option>
                    <option value="Mastung">Mastung</option>
                    <option value="Musakhel">Musakhel</option>
                    <option value="Nasirabad">Nasirabad</option>
                    <option value="Nushki">Nushki</option>
                    <option value="Panjgur">Panjgur</option>
                    <option value="Pishin Valley">Pishin Valley</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Sherani">Sherani</option>
                    <option value="Sibi">Sibi</option>
                    <option value="Sohbatpur">Sohbatpur</option>
                    <option value="Washuk">Washuk</option>
                    <option value="Zhob">Zhob</option>
                    <option value="Ziarat">Ziarat</option>
                  </Select>
                  <Error >{errors.city?.type === 'required' && "City is required"}</Error>
                </InputDivS>

                <InputDivS>
                  <Input name='postal_code' placeholder="Zip/ Postal code" {...register("postal_code", { required: true })} value={editship.postal_code} onChange={()=>handleChange}/>
                  <Error >{errors.postal_code?.type === 'required' && "Zip/ Postal code is required"}</Error>
                </InputDivS>
              </InputDivC>
              <DoneButton  onClick={()=>submitShipHandler} > OK</DoneButton>
              </div>
              </FormDiv>
}
{adddiv &&

<FormDiv>
  <TitleBlock><HouseOutlined style={{ paddingRight: '50px',color:'white' }} />   Shipping Address</TitleBlock>
            <div >
        
        <InputDiv> <label>Street Address:</label>
          <Input name='user_address' onChange={()=>handleAddChange} placeholder="Street Address: Line 1" value={addship.user_address}  />
          <Error >{adderror.user_address}</Error>

          <Input placeholder="Line 2" {...register("street_address2")} />
        </InputDiv>

        <InputDivC>
          <InputDivS>
            <Select name='country' {...register("country", { required: true })} onChange={()=>handleAddChange} >
              <option value='' disabled selected>Select Country</option>
              <option value="AF">Afghanistan</option>
              <option value="AX">Åland Islands</option>
              <option selected value="PK">PaKistan</option>
              <option value="DZ">Algeria</option>
              <option value="AS">American Samoa</option>
              <option value="AD">Andorra</option>
              <option value="AO">Angola</option>
            </Select>
            <Error >{adderror.country}</Error>
          </InputDivS>

          <InputDivS>
            <Select name='province' {...register("province", { required: true })} onChange={()=>handleAddChange}>
              <option value='' disabled selected>Your Province</option>
              <option value="Azad Kashmir">Azad Kashmir</option>
              <option value="Balochistan">Balochistan</option>
              <option value="Islamabad">Islamabad </option>
              <option value="Khyber-Pakhtunkhwa">Khyber-Pakhtunkhwa</option>
              <option value="Punjab ">Punjab</option>
              <option value="Sindh">Sindh</option>
            </Select>
            <Error >{adderror.province}</Error>
          </InputDivS>


        </InputDivC>


        <InputDivC>
          <InputDivS>
            <Select name='city'{...register("city", { required: true })} onChange={()=>handleAddChange}>
              <option value='' disabled selected>Select City </option>
              <option value="Islamabad">Islamabad</option>
              <option value="" disabled>Punjab Cities</option>
              <option value="Ahmed Nager Chatha">Ahmed Nager Chatha</option>
              <option value="Ahmadpur East">Ahmadpur East</option>
              <option value="Ali Khan Abad">Ali Khan Abad</option>
              <option value="Alipur">Alipur</option>
              <option value="Arifwala">Arifwala</option>
              <option value="Attock">Attock</option>
              <option value="Bhera">Bhera</option>
              <option value="Bhalwal">Bhalwal</option>
              <option value="Bahawalnagar">Bahawalnagar</option>
              <option value="Bahawalpur">Bahawalpur</option>
              <option value="Bhakkar">Bhakkar</option>
              <option value="Burewala">Burewala</option>
              <option value="Chillianwala">Chillianwala</option>
              <option value="Chakwal">Chakwal</option>
              <option value="Chichawatni">Chichawatni</option>
              <option value="Chiniot">Chiniot</option>
              <option value="Chishtian">Chishtian</option>
              <option value="Daska">Daska</option>
              <option value="Darya Khan">Darya Khan</option>
              <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
              <option value="Dhaular">Dhaular</option>
              <option value="Dina">Dina</option>
              <option value="Dinga">Dinga</option>
              <option value="Dipalpur">Dipalpur</option>
              <option value="Faisalabad">Faisalabad</option>
              <option value="Ferozewala">Ferozewala</option>
              <option value="Fateh Jhang">Fateh Jang</option>
              <option value="Ghakhar Mandi">Ghakhar Mandi</option>
              <option value="Gojra">Gojra</option>
              <option value="Gujranwala">Gujranwala</option>
              <option value="Gujrat">Gujrat</option>
              <option value="Gujar Khan">Gujar Khan</option>
              <option value="Hafizabad">Hafizabad</option>
              <option value="Haroonabad">Haroonabad</option>
              <option value="Hasilpur">Hasilpur</option>
              <option value="Haveli Lakha">Haveli Lakha</option>
              <option value="Jatoi">Jatoi</option>
              <option value="Jalalpur">Jalalpur</option>
              <option value="Jattan">Jattan</option>
              <option value="Jampur">Jampur</option>
              <option value="Jaranwala">Jaranwala</option>
              <option value="Jhang">Jhang</option>
              <option value="Jhelum">Jhelum</option>
              <option value="Kalabagh">Kalabagh</option>
              <option value="Karor Lal Esan">Karor Lal Esan</option>
              <option value="Kasur">Kasur</option>
              <option value="Kamalia">Kamalia</option>
              <option value="Kamoke">Kamoke</option>
              <option value="Khanewal">Khanewal</option>
              <option value="Khanpur">Khanpur</option>
              <option value="Kharian">Kharian</option>
              <option value="Khushab">Khushab</option>
              <option value="Kot Addu">Kot Addu</option>
              <option value="Jauharabad">Jauharabad</option>
              <option value="Lahore">Lahore</option>
              <option value="Lalamusa">Lalamusa</option>
              <option value="Layyah">Layyah</option>
              <option value="Liaquat Pur">Liaquat Pur</option>
              <option value="Lodhran">Lodhran</option>
              <option value="Malakwal">Malakwal</option>
              <option value="Mamoori">Mamoori</option>
              <option value="Mailsi">Mailsi</option>
              <option value="Mandi Bahauddin">Mandi Bahauddin</option>
              <option value="Mian Channu">Mian Channu</option>
              <option value="Mianwali">Mianwali</option>
              <option value="Multan">Multan</option>
              <option value="Murree">Murree</option>
              <option value="Muridke">Muridke</option>
              <option value="Mianwali Bangla">Mianwali Bangla</option>
              <option value="Muzaffargarh">Muzaffargarh</option>
              <option value="Narowal">Narowal</option>
              <option value="Nankana Sahib">Nankana Sahib</option>
              <option value="Okara">Okara</option>
              <option value="Renala Khurd">Renala Khurd</option>
              <option value="Pakpattan">Pakpattan</option>
              <option value="Pattoki">Pattoki</option>
              <option value="Pir Mahal">Pir Mahal</option>
              <option value="Qaimpur">Qaimpur</option>
              <option value="Qila Didar Singh">Qila Didar Singh</option>
              <option value="Rabwah">Rabwah</option>
              <option value="Raiwind">Raiwind</option>
              <option value="Rajanpur">Rajanpur</option>
              <option value="Rahim Yar Khan">Rahim Yar Khan</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Sadiqabad">Sadiqabad</option>
              <option value="Safdarabad">Safdarabad</option>
              <option value="Sahiwal">Sahiwal</option>
              <option value="Sangla Hill">Sangla Hill</option>
              <option value="Sarai Alamgir">Sarai Alamgir</option>
              <option value="Sargodha">Sargodha</option>
              <option value="Shakargarh">Shakargarh</option>
              <option value="Sheikhupura">Sheikhupura</option>
              <option value="Sialkot">Sialkot</option>
              <option value="Sohawa">Sohawa</option>
              <option value="Soianwala">Soianwala</option>
              <option value="Siranwali">Siranwali</option>
              <option value="Talagang">Talagang</option>
              <option value="Taxila">Taxila</option>
              <option value="Toba Tek Singh">Toba Tek Singh</option>
              <option value="Vehari">Vehari</option>
              <option value="Wah Cantonment">Wah Cantonment</option>
              <option value="Wazirabad">Wazirabad</option>
              <option value="" disabled>Sindh Cities</option>
              <option value="Badin">Badin</option>
              <option value="Bhirkan">Bhirkan</option>
              <option value="Rajo Khanani">Rajo Khanani</option>
              <option value="Chak">Chak</option>
              <option value="Dadu">Dadu</option>
              <option value="Digri">Digri</option>
              <option value="Diplo">Diplo</option>
              <option value="Dokri">Dokri</option>
              <option value="Ghotki">Ghotki</option>
              <option value="Haala">Haala</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Islamkot">Islamkot</option>
              <option value="Jacobabad">Jacobabad</option>
              <option value="Jamshoro">Jamshoro</option>
              <option value="Jungshahi">Jungshahi</option>
              <option value="Kandhkot">Kandhkot</option>
              <option value="Kandiaro">Kandiaro</option>
              <option value="Karachi">Karachi</option>
              <option value="Kashmore">Kashmore</option>
              <option value="Keti Bandar">Keti Bandar</option>
              <option value="Khairpur">Khairpur</option>
              <option value="Kotri">Kotri</option>
              <option value="Larkana">Larkana</option>
              <option value="Matiari">Matiari</option>
              <option value="Mehar">Mehar</option>
              <option value="Mirpur Khas">Mirpur Khas</option>
              <option value="Mithani">Mithani</option>
              <option value="Mithi">Mithi</option>
              <option value="Mehrabpur">Mehrabpur</option>
              <option value="Moro">Moro</option>
              <option value="Nagarparkar">Nagarparkar</option>
              <option value="Naudero">Naudero</option>
              <option value="Naushahro Feroze">Naushahro Feroze</option>
              <option value="Naushara">Naushara</option>
              <option value="Nawabshah">Nawabshah</option>
              <option value="Nazimabad">Nazimabad</option>
              <option value="Qambar">Qambar</option>
              <option value="Qasimabad">Qasimabad</option>
              <option value="Ranipur">Ranipur</option>
              <option value="Ratodero">Ratodero</option>
              <option value="Rohri">Rohri</option>
              <option value="Sakrand">Sakrand</option>
              <option value="Sanghar">Sanghar</option>
              <option value="Shahbandar">Shahbandar</option>
              <option value="Shahdadkot">Shahdadkot</option>
              <option value="Shahdadpur">Shahdadpur</option>
              <option value="Shahpur Chakar">Shahpur Chakar</option>
              <option value="Shikarpaur">Shikarpaur</option>
              <option value="Sukkur">Sukkur</option>
              <option value="Tangwani">Tangwani</option>
              <option value="Tando Adam Khan">Tando Adam Khan</option>
              <option value="Tando Allahyar">Tando Allahyar</option>
              <option value="Tando Muhammad Khan">Tando Muhammad Khan</option>
              <option value="Thatta">Thatta</option>
              <option value="Umerkot">Umerkot</option>
              <option value="Warah">Warah</option>
              <option value="" disabled>Khyber Cities</option>
              <option value="Abbottabad">Abbottabad</option>
              <option value="Adezai">Adezai</option>
              <option value="Alpuri">Alpuri</option>
              <option value="Akora Khattak">Akora Khattak</option>
              <option value="Ayubia">Ayubia</option>
              <option value="Banda Daud Shah">Banda Daud Shah</option>
              <option value="Bannu">Bannu</option>
              <option value="Batkhela">Batkhela</option>
              <option value="Battagram">Battagram</option>
              <option value="Birote">Birote</option>
              <option value="Chakdara">Chakdara</option>
              <option value="Charsadda">Charsadda</option>
              <option value="Chitral">Chitral</option>
              <option value="Daggar">Daggar</option>
              <option value="Dargai">Dargai</option>
              <option value="Darya Khan">Darya Khan</option>
              <option value="Dera Ismail Khan">Dera Ismail Khan</option>
              <option value="Doaba">Doaba</option>
              <option value="Dir">Dir</option>
              <option value="Drosh">Drosh</option>
              <option value="Hangu">Hangu</option>
              <option value="Haripur">Haripur</option>
              <option value="Karak">Karak</option>
              <option value="Kohat">Kohat</option>
              <option value="Kulachi">Kulachi</option>
              <option value="Lakki Marwat">Lakki Marwat</option>
              <option value="Latamber">Latamber</option>
              <option value="Madyan">Madyan</option>
              <option value="Mansehra">Mansehra</option>
              <option value="Mardan">Mardan</option>
              <option value="Mastuj">Mastuj</option>
              <option value="Mingora">Mingora</option>
              <option value="Nowshera">Nowshera</option>
              <option value="Paharpur">Paharpur</option>
              <option value="Pabbi">Pabbi</option>
              <option value="Peshawar">Peshawar</option>
              <option value="Saidu Sharif">Saidu Sharif</option>
              <option value="Shorkot">Shorkot</option>
              <option value="Shewa Adda">Shewa Adda</option>
              <option value="Swabi">Swabi</option>
              <option value="Swat">Swat</option>
              <option value="Tangi">Tangi</option>
              <option value="Tank">Tank</option>
              <option value="Thall">Thall</option>
              <option value="Timergara">Timergara</option>
              <option value="Tordher">Tordher</option>
              <option value="" disabled>Balochistan Cities</option>
              <option value="Awaran">Awaran</option>
              <option value="Barkhan">Barkhan</option>
              <option value="Chagai">Chagai</option>
              <option value="Dera Bugti">Dera Bugti</option>
              <option value="Gwadar">Gwadar</option>
              <option value="Harnai">Harnai</option>
              <option value="Jafarabad">Jafarabad</option>
              <option value="Jhal Magsi">Jhal Magsi</option>
              <option value="Kacchi">Kacchi</option>
              <option value="Kalat">Kalat</option>
              <option value="Kech">Kech</option>
              <option value="Kharan">Kharan</option>
              <option value="Khuzdar">Khuzdar</option>
              <option value="Killa Abdullah">Killa Abdullah</option>
              <option value="Killa Saifullah">Killa Saifullah</option>
              <option value="Kohlu">Kohlu</option>
              <option value="Lasbela">Lasbela</option>
              <option value="Lehri">Lehri</option>
              <option value="Loralai">Loralai</option>
              <option value="Mastung">Mastung</option>
              <option value="Musakhel">Musakhel</option>
              <option value="Nasirabad">Nasirabad</option>
              <option value="Nushki">Nushki</option>
              <option value="Panjgur">Panjgur</option>
              <option value="Pishin Valley">Pishin Valley</option>
              <option value="Quetta">Quetta</option>
              <option value="Sherani">Sherani</option>
              <option value="Sibi">Sibi</option>
              <option value="Sohbatpur">Sohbatpur</option>
              <option value="Washuk">Washuk</option>
              <option value="Zhob">Zhob</option>
              <option value="Ziarat">Ziarat</option>
            </Select>
            <Error >{adderror.city}</Error>
          </InputDivS>

          <InputDivS>
            <Input name='postal_code' placeholder="Zip/ Postal code" {...register("postal_code", { required: true })} value={addship.postal_code} onChange={()=>handleAddChange}/>
            <Error >{adderror.postal_code}</Error>
          </InputDivS>
        </InputDivC>
        <DoneButton  onClick={()=>submitAddShipHandler} > OK</DoneButton>
        <CloseButton  onClick={()=>setAddDiv(false)} > Close</CloseButton>
        </div>
        </FormDiv>
}


            <FormDiv>
            {bol==true?
            <>
              <TitleBlock><HouseOutlined style={{ paddingRight: '50px' }} /> Shipping Address</TitleBlock>
             
            
              <label>Email:</label>
              <InputDiv>
                <Input placeholder="Email" value={user.email} {...register("email", { pattern: { value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i }, required: true })} />
                <Error>{errors.email?.type === 'required' && "Email is required"}</Error>
                <Error>{errors.email?.type === 'pattern' && "Email must be a valid email"}</Error>

              </InputDiv>


              <br /><label>Full Name:</label>
              <InputDivC>
                <InputDivS>
                  <Input placeholder="First Name" value={user.first_name} {...register("firstName", { required: true })} />
                  <Error> {errors.firstName?.type === 'required' && "First name is required"}</Error></InputDivS>

                <InputDivS> <Input placeholder="Last Name" value={user.last_name} {...register("lastName", { required: true })} />
                  <Error> {errors.lastName?.type === 'required' && "Last name is required"}</Error></InputDivS>

              </InputDivC>


              <br />
              
             
              <InputDiv> <label>Street Address:</label>
                <Input name='user_address'  {...register("user_address", { required: true })} 
                 placeholder="Street Address: Line 1" value={accountship.user_address} onChange={()=>handleAChange} />
                <Error >{errors.user_address?.type === 'required' && "Street Address is required"}</Error>

                <Input placeholder="Line 2" {...register("street_address2")} />
              </InputDiv>

              <InputDivC>
                <InputDivS>
                  <Select name='country' {...register("country", { required: true })} onChange={()=>handleAChange}  >
                    <option value={accountship.country} disabled selected>{accountship.country}</option>
                    <option value="AF">Afghanistan</option>
                    <option value="AX">Åland Islands</option>
                    <option selected value="PK">PaKistan</option>
                    <option value="DZ">Algeria</option>
                    <option value="AS">American Samoa</option>
                    <option value="AD">Andorra</option>
                    <option value="AO">Angola</option>
                  </Select>
                  <Error >{errors.country?.type === 'required' && "Country is required"}</Error>
                </InputDivS>

                <InputDivS>
                  <Select name='province' {...register("province", { required: true })} onChange={()=>handleAChange} >
                    <option value={accountship.province} disabled selected>{accountship.province}</option>
                    <option value="Azad Kashmir">Azad Kashmir</option>
                    <option value="Balochistan">Balochistan</option>
                    <option value="Islamabad">Islamabad </option>
                    <option value="Khyber-Pakhtunkhwa">Khyber-Pakhtunkhwa</option>
                    <option value="Punjab ">Punjab</option>
                    <option value="Sindh">Sindh</option>
                  </Select>
                  <Error >{errors.province?.type === 'required' && "State is required"}</Error>
                </InputDivS>


              </InputDivC>


              <InputDivC>
                <InputDivS>
                  <Select name='city'{...register("city", { required: true })} >
                    <option value={editship.city} disabled selected>{editship.city} </option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="" disabled>Punjab Cities</option>
                    <option value="Ahmed Nager Chatha">Ahmed Nager Chatha</option>
                    <option value="Ahmadpur East">Ahmadpur East</option>
                    <option value="Ali Khan Abad">Ali Khan Abad</option>
                    <option value="Alipur">Alipur</option>
                    <option value="Arifwala">Arifwala</option>
                    <option value="Attock">Attock</option>
                    <option value="Bhera">Bhera</option>
                    <option value="Bhalwal">Bhalwal</option>
                    <option value="Bahawalnagar">Bahawalnagar</option>
                    <option value="Bahawalpur">Bahawalpur</option>
                    <option value="Bhakkar">Bhakkar</option>
                    <option value="Burewala">Burewala</option>
                    <option value="Chillianwala">Chillianwala</option>
                    <option value="Chakwal">Chakwal</option>
                    <option value="Chichawatni">Chichawatni</option>
                    <option value="Chiniot">Chiniot</option>
                    <option value="Chishtian">Chishtian</option>
                    <option value="Daska">Daska</option>
                    <option value="Darya Khan">Darya Khan</option>
                    <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
                    <option value="Dhaular">Dhaular</option>
                    <option value="Dina">Dina</option>
                    <option value="Dinga">Dinga</option>
                    <option value="Dipalpur">Dipalpur</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Ferozewala">Ferozewala</option>
                    <option value="Fateh Jhang">Fateh Jang</option>
                    <option value="Ghakhar Mandi">Ghakhar Mandi</option>
                    <option value="Gojra">Gojra</option>
                    <option value="Gujranwala">Gujranwala</option>
                    <option value="Gujrat">Gujrat</option>
                    <option value="Gujar Khan">Gujar Khan</option>
                    <option value="Hafizabad">Hafizabad</option>
                    <option value="Haroonabad">Haroonabad</option>
                    <option value="Hasilpur">Hasilpur</option>
                    <option value="Haveli Lakha">Haveli Lakha</option>
                    <option value="Jatoi">Jatoi</option>
                    <option value="Jalalpur">Jalalpur</option>
                    <option value="Jattan">Jattan</option>
                    <option value="Jampur">Jampur</option>
                    <option value="Jaranwala">Jaranwala</option>
                    <option value="Jhang">Jhang</option>
                    <option value="Jhelum">Jhelum</option>
                    <option value="Kalabagh">Kalabagh</option>
                    <option value="Karor Lal Esan">Karor Lal Esan</option>
                    <option value="Kasur">Kasur</option>
                    <option value="Kamalia">Kamalia</option>
                    <option value="Kamoke">Kamoke</option>
                    <option value="Khanewal">Khanewal</option>
                    <option value="Khanpur">Khanpur</option>
                    <option value="Kharian">Kharian</option>
                    <option value="Khushab">Khushab</option>
                    <option value="Kot Addu">Kot Addu</option>
                    <option value="Jauharabad">Jauharabad</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Lalamusa">Lalamusa</option>
                    <option value="Layyah">Layyah</option>
                    <option value="Liaquat Pur">Liaquat Pur</option>
                    <option value="Lodhran">Lodhran</option>
                    <option value="Malakwal">Malakwal</option>
                    <option value="Mamoori">Mamoori</option>
                    <option value="Mailsi">Mailsi</option>
                    <option value="Mandi Bahauddin">Mandi Bahauddin</option>
                    <option value="Mian Channu">Mian Channu</option>
                    <option value="Mianwali">Mianwali</option>
                    <option value="Multan">Multan</option>
                    <option value="Murree">Murree</option>
                    <option value="Muridke">Muridke</option>
                    <option value="Mianwali Bangla">Mianwali Bangla</option>
                    <option value="Muzaffargarh">Muzaffargarh</option>
                    <option value="Narowal">Narowal</option>
                    <option value="Nankana Sahib">Nankana Sahib</option>
                    <option value="Okara">Okara</option>
                    <option value="Renala Khurd">Renala Khurd</option>
                    <option value="Pakpattan">Pakpattan</option>
                    <option value="Pattoki">Pattoki</option>
                    <option value="Pir Mahal">Pir Mahal</option>
                    <option value="Qaimpur">Qaimpur</option>
                    <option value="Qila Didar Singh">Qila Didar Singh</option>
                    <option value="Rabwah">Rabwah</option>
                    <option value="Raiwind">Raiwind</option>
                    <option value="Rajanpur">Rajanpur</option>
                    <option value="Rahim Yar Khan">Rahim Yar Khan</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Sadiqabad">Sadiqabad</option>
                    <option value="Safdarabad">Safdarabad</option>
                    <option value="Sahiwal">Sahiwal</option>
                    <option value="Sangla Hill">Sangla Hill</option>
                    <option value="Sarai Alamgir">Sarai Alamgir</option>
                    <option value="Sargodha">Sargodha</option>
                    <option value="Shakargarh">Shakargarh</option>
                    <option value="Sheikhupura">Sheikhupura</option>
                    <option value="Sialkot">Sialkot</option>
                    <option value="Sohawa">Sohawa</option>
                    <option value="Soianwala">Soianwala</option>
                    <option value="Siranwali">Siranwali</option>
                    <option value="Talagang">Talagang</option>
                    <option value="Taxila">Taxila</option>
                    <option value="Toba Tek Singh">Toba Tek Singh</option>
                    <option value="Vehari">Vehari</option>
                    <option value="Wah Cantonment">Wah Cantonment</option>
                    <option value="Wazirabad">Wazirabad</option>
                    <option value="" disabled>Sindh Cities</option>
                    <option value="Badin">Badin</option>
                    <option value="Bhirkan">Bhirkan</option>
                    <option value="Rajo Khanani">Rajo Khanani</option>
                    <option value="Chak">Chak</option>
                    <option value="Dadu">Dadu</option>
                    <option value="Digri">Digri</option>
                    <option value="Diplo">Diplo</option>
                    <option value="Dokri">Dokri</option>
                    <option value="Ghotki">Ghotki</option>
                    <option value="Haala">Haala</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Islamkot">Islamkot</option>
                    <option value="Jacobabad">Jacobabad</option>
                    <option value="Jamshoro">Jamshoro</option>
                    <option value="Jungshahi">Jungshahi</option>
                    <option value="Kandhkot">Kandhkot</option>
                    <option value="Kandiaro">Kandiaro</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Kashmore">Kashmore</option>
                    <option value="Keti Bandar">Keti Bandar</option>
                    <option value="Khairpur">Khairpur</option>
                    <option value="Kotri">Kotri</option>
                    <option value="Larkana">Larkana</option>
                    <option value="Matiari">Matiari</option>
                    <option value="Mehar">Mehar</option>
                    <option value="Mirpur Khas">Mirpur Khas</option>
                    <option value="Mithani">Mithani</option>
                    <option value="Mithi">Mithi</option>
                    <option value="Mehrabpur">Mehrabpur</option>
                    <option value="Moro">Moro</option>
                    <option value="Nagarparkar">Nagarparkar</option>
                    <option value="Naudero">Naudero</option>
                    <option value="Naushahro Feroze">Naushahro Feroze</option>
                    <option value="Naushara">Naushara</option>
                    <option value="Nawabshah">Nawabshah</option>
                    <option value="Nazimabad">Nazimabad</option>
                    <option value="Qambar">Qambar</option>
                    <option value="Qasimabad">Qasimabad</option>
                    <option value="Ranipur">Ranipur</option>
                    <option value="Ratodero">Ratodero</option>
                    <option value="Rohri">Rohri</option>
                    <option value="Sakrand">Sakrand</option>
                    <option value="Sanghar">Sanghar</option>
                    <option value="Shahbandar">Shahbandar</option>
                    <option value="Shahdadkot">Shahdadkot</option>
                    <option value="Shahdadpur">Shahdadpur</option>
                    <option value="Shahpur Chakar">Shahpur Chakar</option>
                    <option value="Shikarpaur">Shikarpaur</option>
                    <option value="Sukkur">Sukkur</option>
                    <option value="Tangwani">Tangwani</option>
                    <option value="Tando Adam Khan">Tando Adam Khan</option>
                    <option value="Tando Allahyar">Tando Allahyar</option>
                    <option value="Tando Muhammad Khan">Tando Muhammad Khan</option>
                    <option value="Thatta">Thatta</option>
                    <option value="Umerkot">Umerkot</option>
                    <option value="Warah">Warah</option>
                    <option value="" disabled>Khyber Cities</option>
                    <option value="Abbottabad">Abbottabad</option>
                    <option value="Adezai">Adezai</option>
                    <option value="Alpuri">Alpuri</option>
                    <option value="Akora Khattak">Akora Khattak</option>
                    <option value="Ayubia">Ayubia</option>
                    <option value="Banda Daud Shah">Banda Daud Shah</option>
                    <option value="Bannu">Bannu</option>
                    <option value="Batkhela">Batkhela</option>
                    <option value="Battagram">Battagram</option>
                    <option value="Birote">Birote</option>
                    <option value="Chakdara">Chakdara</option>
                    <option value="Charsadda">Charsadda</option>
                    <option value="Chitral">Chitral</option>
                    <option value="Daggar">Daggar</option>
                    <option value="Dargai">Dargai</option>
                    <option value="Darya Khan">Darya Khan</option>
                    <option value="Dera Ismail Khan">Dera Ismail Khan</option>
                    <option value="Doaba">Doaba</option>
                    <option value="Dir">Dir</option>
                    <option value="Drosh">Drosh</option>
                    <option value="Hangu">Hangu</option>
                    <option value="Haripur">Haripur</option>
                    <option value="Karak">Karak</option>
                    <option value="Kohat">Kohat</option>
                    <option value="Kulachi">Kulachi</option>
                    <option value="Lakki Marwat">Lakki Marwat</option>
                    <option value="Latamber">Latamber</option>
                    <option value="Madyan">Madyan</option>
                    <option value="Mansehra">Mansehra</option>
                    <option value="Mardan">Mardan</option>
                    <option value="Mastuj">Mastuj</option>
                    <option value="Mingora">Mingora</option>
                    <option value="Nowshera">Nowshera</option>
                    <option value="Paharpur">Paharpur</option>
                    <option value="Pabbi">Pabbi</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Saidu Sharif">Saidu Sharif</option>
                    <option value="Shorkot">Shorkot</option>
                    <option value="Shewa Adda">Shewa Adda</option>
                    <option value="Swabi">Swabi</option>
                    <option value="Swat">Swat</option>
                    <option value="Tangi">Tangi</option>
                    <option value="Tank">Tank</option>
                    <option value="Thall">Thall</option>
                    <option value="Timergara">Timergara</option>
                    <option value="Tordher">Tordher</option>
                    <option value="" disabled>Balochistan Cities</option>
                    <option value="Awaran">Awaran</option>
                    <option value="Barkhan">Barkhan</option>
                    <option value="Chagai">Chagai</option>
                    <option value="Dera Bugti">Dera Bugti</option>
                    <option value="Gwadar">Gwadar</option>
                    <option value="Harnai">Harnai</option>
                    <option value="Jafarabad">Jafarabad</option>
                    <option value="Jhal Magsi">Jhal Magsi</option>
                    <option value="Kacchi">Kacchi</option>
                    <option value="Kalat">Kalat</option>
                    <option value="Kech">Kech</option>
                    <option value="Kharan">Kharan</option>
                    <option value="Khuzdar">Khuzdar</option>
                    <option value="Killa Abdullah">Killa Abdullah</option>
                    <option value="Killa Saifullah">Killa Saifullah</option>
                    <option value="Kohlu">Kohlu</option>
                    <option value="Lasbela">Lasbela</option>
                    <option value="Lehri">Lehri</option>
                    <option value="Loralai">Loralai</option>
                    <option value="Mastung">Mastung</option>
                    <option value="Musakhel">Musakhel</option>
                    <option value="Nasirabad">Nasirabad</option>
                    <option value="Nushki">Nushki</option>
                    <option value="Panjgur">Panjgur</option>
                    <option value="Pishin Valley">Pishin Valley</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Sherani">Sherani</option>
                    <option value="Sibi">Sibi</option>
                    <option value="Sohbatpur">Sohbatpur</option>
                    <option value="Washuk">Washuk</option>
                    <option value="Zhob">Zhob</option>
                    <option value="Ziarat">Ziarat</option>
                  </Select>
                  <Error >{errors.city?.type === 'required' && "City is required"}</Error>
                </InputDivS>

                <InputDivS>
                  <Input name='postal_code' placeholder="Zip/ Postal code" {...register("postal_code", { required: true })} value={accountship.postal_code} onChange={()=>handleAChange}/>
                  <Error >{errors.postal_code?.type === 'required' && "Zip/ Postal code is required"}</Error>
                </InputDivS>
              </InputDivC>
              

              <br /><label>Contact</label>
              <InputDivC>
                <InputDivS>
                  <Input placeholder="Mobile no." value={accountship.mobile} {...register("mobile", { required: true })} onChange={()=>handleAChange}  />
                  <Error >{errors.mobile?.type === 'required' && "mobile no. is required"}</Error>
                </InputDivS>
                <InputDivS>
                  <Input placeholder="Phone no." value={accountship.phone} {...register("phone", { required: true })}  onChange={()=>handleAChange}  />
                  <Error >{errors.phone?.type === 'required' && "Phone no. is required"}</Error>
                </InputDivS>
              </InputDivC>
              </>
              :
              
              <>
              {title==false?
              <>
              <TitleBlock><HouseOutlined style={{ paddingRight: '50px' }} />   Shipping Address</TitleBlock>
              {shipp.map((item,i) => {
                      return (
                          <Ship key={item.id}>
                             <div >
                            <input
                              type="radio"
                          div key={i} style={{cursor:'pointer',display:'flex',flexDirection:'row'}}    name="address"
                              value={item.id}
                              checked={radio.selected === item.id?true:radio.selected==item.id}
                              onChange={()=>handleradioChange(item)}
                            />
                            <label >
                              {item.user_address}
                            </label>
                          </div>
                          <div style={{marginLeft:'auto',cursor:'pointer'}}>
                            <Edit
                              onClick={() => editshipdetails(item.id)}
                            ></Edit>
                            {/* <label style={{marginTop:'-99px'}}>Edit</label> */}
                          </div>
                        </Ship>
                      );
                    })}
                  <DoneButton style={{marginLeft:'630px',marginTop:'20px'}} onClick={()=>setAddDiv(true)}>Add New</DoneButton>

                    </>:''
                  }
              </>             
}
</FormDiv>


           {account==true?<></>:
            <label style={{ margin: '20px' }} >
              <input type="checkbox"
                name="checkbox"
                value="Geeks" checked={passchecked} onChange={()=>handleChangepass} />
              Create account
            </label>
}
            {/* <input id="inputVacationPercentage" type="checkbox" placeholder="Create account" checked={checked} onChange={handleChange} /> */}
            {passchecked && (

              <FormDiv>
                <label>Password </label>
                <InputDivC>
                  <InputDivS>
                    <Input placeholder="Password" {...register("password", { required: true })} />
                    <Error >{errors.password?.type === 'required' && "Password is required"}</Error>
                  </InputDivS>

                  <InputDivS>
                    <Input placeholder="Confirm Password" {...register("password2", { required: true })} />
                    <Error >{errors.password2?.type === 'required' && "Confirm Password is required"}</Error>
                  </InputDivS>


                </InputDivC>
              </FormDiv>

            )}

            <br />
            {account && billlist==false &&
            <label style={{ margin: '20px' }} >
              <input type="checkbox"
                name="checkbox"
                value="billing" checked={billing} onChange={()=>handleChangebill} />
              My billing and shipping address are the same
            </label>
}

  {account==true && billing==false ?
    <>
    <FormDiv>
    <TitleBlock><Home style={{ paddingRight: '50px' }} />Billing Address</TitleBlock>
    <Ship>
      <label>{address.user_address}</label>
      <Edit style={{marginLeft:'auto',cursor:'pointer'}} onClick={()=>setEditBilling(true)} />
      
    </Ship>
  </FormDiv>
  <FormDiv>
     
  <label style={{ margin: '20px' }} >
    <input type="checkbox"
      name="checkbox"
      value="billing" checked={billing} onChange={()=>handleChangebillingList} />
    My billing and shipping address are the same
  </label>
  </FormDiv>
   </>   
  :''
  }
  {account==false ?
  <FormDiv>
  <TitleBlock><Home style={{ paddingRight: '50px' }} />Billing Address</TitleBlock>


  <br />
  <InputDiv> <label>Street Address:</label>
  {/* {...register("Bstreet_address1", { required: true })} */}
    <Input name='user_address' placeholder="Street Address: Line 1" value={accountbill.user_address} onChange={()=>handleEditAChange('user_address')} />
    <Error >{accountbill.user_address}</Error>

    <Input placeholder="Line 2" {...register("Bstreet_address2")} />
  </InputDiv>

  <InputDivC>
    <InputDivS>
    {/* {...register("Bcountry", { required: true })}  */}
      <Select name='country' onChange={()=>handleEditAChange('country')} >
        <option value="" disabled selected>Country</option>
        <option value="AF">Afghanistan</option>
        <option value="AX">Åland Islands</option>
        <option selected value="PK">PaKistan</option>
        <option value="DZ">Algeria</option>
        <option value="AS">American Samoa</option>
        <option value="AD">Andorra</option>
        <option value="AO">Angola</option>
      </Select>
      <Error >{accountbill.country}</Error>
    </InputDivS>

    <InputDivS>
    {/* {...register("Bstate", { required: true })} */}
      <Select name='province' onChange={()=>handleEditAChange('province')} >
        <option value="" disabled selected>State/Province</option>
        <option value="Azad Kashmir">Azad Kashmir</option>
        <option value="Balochistan">Balochistan</option>
        <option value="Islamabad">Islamabad </option>
        <option value="Khyber-Pakhtunkhwa">Khyber-Pakhtunkhwa</option>
        <option value="Punjab ">Punjab</option>
        <option value="Sindh">Sindh</option>
      </Select>
      <Error >{accountbill.province}</Error>
    </InputDivS>


  </InputDivC>


  <InputDivC>
    <InputDivS>
    {/* {...register("Bcity", { required: true })} */}
      <Select name='city' onChange={()=>handleEditAChange('city')} >
        <option value="" disabled selected>City</option>
        <option value="Islamabad">Islamabad</option>
        <option value="" disabled>Punjab Cities</option>
        <option value="Ahmed Nager Chatha">Ahmed Nager Chatha</option>
        <option value="Ahmadpur East">Ahmadpur East</option>
        <option value="Ali Khan Abad">Ali Khan Abad</option>
        <option value="Alipur">Alipur</option>
        <option value="Arifwala">Arifwala</option>
        <option value="Attock">Attock</option>
        <option value="Bhera">Bhera</option>
        <option value="Bhalwal">Bhalwal</option>
        <option value="Bahawalnagar">Bahawalnagar</option>
        <option value="Bahawalpur">Bahawalpur</option>
        <option value="Bhakkar">Bhakkar</option>
        <option value="Burewala">Burewala</option>
        <option value="Chillianwala">Chillianwala</option>
        <option value="Chakwal">Chakwal</option>
        <option value="Chichawatni">Chichawatni</option>
        <option value="Chiniot">Chiniot</option>
        <option value="Chishtian">Chishtian</option>
        <option value="Daska">Daska</option>
        <option value="Darya Khan">Darya Khan</option>
        <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
        <option value="Dhaular">Dhaular</option>
        <option value="Dina">Dina</option>
        <option value="Dinga">Dinga</option>
        <option value="Dipalpur">Dipalpur</option>
        <option value="Faisalabad">Faisalabad</option>
        <option value="Ferozewala">Ferozewala</option>
        <option value="Fateh Jhang">Fateh Jang</option>
        <option value="Ghakhar Mandi">Ghakhar Mandi</option>
        <option value="Gojra">Gojra</option>
        <option value="Gujranwala">Gujranwala</option>
        <option value="Gujrat">Gujrat</option>
        <option value="Gujar Khan">Gujar Khan</option>
        <option value="Hafizabad">Hafizabad</option>
        <option value="Haroonabad">Haroonabad</option>
        <option value="Hasilpur">Hasilpur</option>
        <option value="Haveli Lakha">Haveli Lakha</option>
        <option value="Jatoi">Jatoi</option>
        <option value="Jalalpur">Jalalpur</option>
        <option value="Jattan">Jattan</option>
        <option value="Jampur">Jampur</option>
        <option value="Jaranwala">Jaranwala</option>
        <option value="Jhang">Jhang</option>
        <option value="Jhelum">Jhelum</option>
        <option value="Kalabagh">Kalabagh</option>
        <option value="Karor Lal Esan">Karor Lal Esan</option>
        <option value="Kasur">Kasur</option>
        <option value="Kamalia">Kamalia</option>
        <option value="Kamoke">Kamoke</option>
        <option value="Khanewal">Khanewal</option>
        <option value="Khanpur">Khanpur</option>
        <option value="Kharian">Kharian</option>
        <option value="Khushab">Khushab</option>
        <option value="Kot Addu">Kot Addu</option>
        <option value="Jauharabad">Jauharabad</option>
        <option value="Lahore">Lahore</option>
        <option value="Lalamusa">Lalamusa</option>
        <option value="Layyah">Layyah</option>
        <option value="Liaquat Pur">Liaquat Pur</option>
        <option value="Lodhran">Lodhran</option>
        <option value="Malakwal">Malakwal</option>
        <option value="Mamoori">Mamoori</option>
        <option value="Mailsi">Mailsi</option>
        <option value="Mandi Bahauddin">Mandi Bahauddin</option>
        <option value="Mian Channu">Mian Channu</option>
        <option value="Mianwali">Mianwali</option>
        <option value="Multan">Multan</option>
        <option value="Murree">Murree</option>
        <option value="Muridke">Muridke</option>
        <option value="Mianwali Bangla">Mianwali Bangla</option>
        <option value="Muzaffargarh">Muzaffargarh</option>
        <option value="Narowal">Narowal</option>
        <option value="Nankana Sahib">Nankana Sahib</option>
        <option value="Okara">Okara</option>
        <option value="Renala Khurd">Renala Khurd</option>
        <option value="Pakpattan">Pakpattan</option>
        <option value="Pattoki">Pattoki</option>
        <option value="Pir Mahal">Pir Mahal</option>
        <option value="Qaimpur">Qaimpur</option>
        <option value="Qila Didar Singh">Qila Didar Singh</option>
        <option value="Rabwah">Rabwah</option>
        <option value="Raiwind">Raiwind</option>
        <option value="Rajanpur">Rajanpur</option>
        <option value="Rahim Yar Khan">Rahim Yar Khan</option>
        <option value="Rawalpindi">Rawalpindi</option>
        <option value="Sadiqabad">Sadiqabad</option>
        <option value="Safdarabad">Safdarabad</option>
        <option value="Sahiwal">Sahiwal</option>
        <option value="Sangla Hill">Sangla Hill</option>
        <option value="Sarai Alamgir">Sarai Alamgir</option>
        <option value="Sargodha">Sargodha</option>
        <option value="Shakargarh">Shakargarh</option>
        <option value="Sheikhupura">Sheikhupura</option>
        <option value="Sialkot">Sialkot</option>
        <option value="Sohawa">Sohawa</option>
        <option value="Soianwala">Soianwala</option>
        <option value="Siranwali">Siranwali</option>
        <option value="Talagang">Talagang</option>
        <option value="Taxila">Taxila</option>
        <option value="Toba Tek Singh">Toba Tek Singh</option>
        <option value="Vehari">Vehari</option>
        <option value="Wah Cantonment">Wah Cantonment</option>
        <option value="Wazirabad">Wazirabad</option>
        <option value="" disabled>Sindh Cities</option>
        <option value="Badin">Badin</option>
        <option value="Bhirkan">Bhirkan</option>
        <option value="Rajo Khanani">Rajo Khanani</option>
        <option value="Chak">Chak</option>
        <option value="Dadu">Dadu</option>
        <option value="Digri">Digri</option>
        <option value="Diplo">Diplo</option>
        <option value="Dokri">Dokri</option>
        <option value="Ghotki">Ghotki</option>
        <option value="Haala">Haala</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Islamkot">Islamkot</option>
        <option value="Jacobabad">Jacobabad</option>
        <option value="Jamshoro">Jamshoro</option>
        <option value="Jungshahi">Jungshahi</option>
        <option value="Kandhkot">Kandhkot</option>
        <option value="Kandiaro">Kandiaro</option>
        <option value="Karachi">Karachi</option>
        <option value="Kashmore">Kashmore</option>
        <option value="Keti Bandar">Keti Bandar</option>
        <option value="Khairpur">Khairpur</option>
        <option value="Kotri">Kotri</option>
        <option value="Larkana">Larkana</option>
        <option value="Matiari">Matiari</option>
        <option value="Mehar">Mehar</option>
        <option value="Mirpur Khas">Mirpur Khas</option>
        <option value="Mithani">Mithani</option>
        <option value="Mithi">Mithi</option>
        <option value="Mehrabpur">Mehrabpur</option>
        <option value="Moro">Moro</option>
        <option value="Nagarparkar">Nagarparkar</option>
        <option value="Naudero">Naudero</option>
        <option value="Naushahro Feroze">Naushahro Feroze</option>
        <option value="Naushara">Naushara</option>
        <option value="Nawabshah">Nawabshah</option>
        <option value="Nazimabad">Nazimabad</option>
        <option value="Qambar">Qambar</option>
        <option value="Qasimabad">Qasimabad</option>
        <option value="Ranipur">Ranipur</option>
        <option value="Ratodero">Ratodero</option>
        <option value="Rohri">Rohri</option>
        <option value="Sakrand">Sakrand</option>
        <option value="Sanghar">Sanghar</option>
        <option value="Shahbandar">Shahbandar</option>
        <option value="Shahdadkot">Shahdadkot</option>
        <option value="Shahdadpur">Shahdadpur</option>
        <option value="Shahpur Chakar">Shahpur Chakar</option>
        <option value="Shikarpaur">Shikarpaur</option>
        <option value="Sukkur">Sukkur</option>
        <option value="Tangwani">Tangwani</option>
        <option value="Tando Adam Khan">Tando Adam Khan</option>
        <option value="Tando Allahyar">Tando Allahyar</option>
        <option value="Tando Muhammad Khan">Tando Muhammad Khan</option>
        <option value="Thatta">Thatta</option>
        <option value="Umerkot">Umerkot</option>
        <option value="Warah">Warah</option>
        <option value="" disabled>Khyber Cities</option>
        <option value="Abbottabad">Abbottabad</option>
        <option value="Adezai">Adezai</option>
        <option value="Alpuri">Alpuri</option>
        <option value="Akora Khattak">Akora Khattak</option>
        <option value="Ayubia">Ayubia</option>
        <option value="Banda Daud Shah">Banda Daud Shah</option>
        <option value="Bannu">Bannu</option>
        <option value="Batkhela">Batkhela</option>
        <option value="Battagram">Battagram</option>
        <option value="Birote">Birote</option>
        <option value="Chakdara">Chakdara</option>
        <option value="Charsadda">Charsadda</option>
        <option value="Chitral">Chitral</option>
        <option value="Daggar">Daggar</option>
        <option value="Dargai">Dargai</option>
        <option value="Darya Khan">Darya Khan</option>
        <option value="Dera Ismail Khan">Dera Ismail Khan</option>
        <option value="Doaba">Doaba</option>
        <option value="Dir">Dir</option>
        <option value="Drosh">Drosh</option>
        <option value="Hangu">Hangu</option>
        <option value="Haripur">Haripur</option>
        <option value="Karak">Karak</option>
        <option value="Kohat">Kohat</option>
        <option value="Kulachi">Kulachi</option>
        <option value="Lakki Marwat">Lakki Marwat</option>
        <option value="Latamber">Latamber</option>
        <option value="Madyan">Madyan</option>
        <option value="Mansehra">Mansehra</option>
        <option value="Mardan">Mardan</option>
        <option value="Mastuj">Mastuj</option>
        <option value="Mingora">Mingora</option>
        <option value="Nowshera">Nowshera</option>
        <option value="Paharpur">Paharpur</option>
        <option value="Pabbi">Pabbi</option>
        <option value="Peshawar">Peshawar</option>
        <option value="Saidu Sharif">Saidu Sharif</option>
        <option value="Shorkot">Shorkot</option>
        <option value="Shewa Adda">Shewa Adda</option>
        <option value="Swabi">Swabi</option>
        <option value="Swat">Swat</option>
        <option value="Tangi">Tangi</option>
        <option value="Tank">Tank</option>
        <option value="Thall">Thall</option>
        <option value="Timergara">Timergara</option>
        <option value="Tordher">Tordher</option>
        <option value="" disabled>Balochistan Cities</option>
        <option value="Awaran">Awaran</option>
        <option value="Barkhan">Barkhan</option>
        <option value="Chagai">Chagai</option>
        <option value="Dera Bugti">Dera Bugti</option>
        <option value="Gwadar">Gwadar</option>
        <option value="Harnai">Harnai</option>
        <option value="Jafarabad">Jafarabad</option>
        <option value="Jhal Magsi">Jhal Magsi</option>
        <option value="Kacchi">Kacchi</option>
        <option value="Kalat">Kalat</option>
        <option value="Kech">Kech</option>
        <option value="Kharan">Kharan</option>
        <option value="Khuzdar">Khuzdar</option>
        <option value="Killa Abdullah">Killa Abdullah</option>
        <option value="Killa Saifullah">Killa Saifullah</option>
        <option value="Kohlu">Kohlu</option>
        <option value="Lasbela">Lasbela</option>
        <option value="Lehri">Lehri</option>
        <option value="Loralai">Loralai</option>
        <option value="Mastung">Mastung</option>
        <option value="Musakhel">Musakhel</option>
        <option value="Nasirabad">Nasirabad</option>
        <option value="Nushki">Nushki</option>
        <option value="Panjgur">Panjgur</option>
        <option value="Pishin Valley">Pishin Valley</option>
        <option value="Quetta">Quetta</option>
        <option value="Sherani">Sherani</option>
        <option value="Sibi">Sibi</option>
        <option value="Sohbatpur">Sohbatpur</option>
        <option value="Washuk">Washuk</option>
        <option value="Zhob">Zhob</option>
        <option value="Ziarat">Ziarat</option>
      </Select>
      <Error >{addbillerror.city}</Error>
    </InputDivS>

    <InputDivS>
    {/* {...register("Bzip", { required: true })}  */}
      <Input placeholder="Zip/ Postal code" name='postal_code' onChange={handleEditAChange('postal_code')}  />
      <Error >{accountbill.postal_code}</Error>
    </InputDivS>
  </InputDivC>

 {/* <DoneButton  onClick={submitAddBillHandler} > OK</DoneButton> */}
 
</FormDiv>
  :'' }

         

            {editbilling && (
              <FormDiv>
                <br />
                {/* {...register("user_address", { required: true })} */}
                <InputDiv> <label>Street Address:</label>
                  <Input name='user_address' value={address.user_address} placeholder="Street Address: Line 1" onChange={handleEditChange('user_address')} />
                  <Error >{errors.user_address1?.type === 'required' && "Street Address is required"}</Error>

                  <Input placeholder="Line 2" {...register("Bstreet_address2")} />
                </InputDiv>

                <InputDivC>
                  <InputDivS>
                  {/* {...register("country", { required: true })}  */}
                    <Select name='country' onChange={handleEditChange('country')} >
                      <option value={address.country}  disabled selected>{address.country} </option>
                      <option value="AF">Afghanistan</option>
                      <option value="AX">Åland Islands</option>
                      <option selected value="PK">PaKistan</option>
                      <option value="DZ">Algeria</option>
                      <option value="AS">American Samoa</option>
                      <option value="AD">Andorra</option>
                      <option value="AO">Angola</option>
                    </Select>
                    <Error >{errors.country?.type === 'required' && "Country is required"}</Error>
                  </InputDivS>

                  <InputDivS>
                  {/* {...register("province", { required: true })} */}
                    <Select name='province' onChange={handleEditChange('province')}>
                      <option value={address.province}  disabled selected>{address.province} </option>
                      <option value="Azad Kashmir">Azad Kashmir</option>
                      <option value="Balochistan">Balochistan</option>
                      <option value="Islamabad">Islamabad </option>
                      <option value="Khyber-Pakhtunkhwa">Khyber-Pakhtunkhwa</option>
                      <option value="Punjab ">Punjab</option>
                      <option value="Sindh">Sindh</option>
                    </Select>
                    <Error >{errors.province?.type === 'required' && "State is required"}</Error>
                  </InputDivS>


                </InputDivC>


                <InputDivC>
                  <InputDivS>
                    <Select name='city' onChange={handleEditChange('city')} {...register("city", { required: true })}>
                      <option value={address.city}  disabled selected>{address.city} </option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="" disabled>Punjab Cities</option>
                      <option value="Ahmed Nager Chatha">Ahmed Nager Chatha</option>
                      <option value="Ahmadpur East">Ahmadpur East</option>
                      <option value="Ali Khan Abad">Ali Khan Abad</option>
                      <option value="Alipur">Alipur</option>
                      <option value="Arifwala">Arifwala</option>
                      <option value="Attock">Attock</option>
                      <option value="Bhera">Bhera</option>
                      <option value="Bhalwal">Bhalwal</option>
                      <option value="Bahawalnagar">Bahawalnagar</option>
                      <option value="Bahawalpur">Bahawalpur</option>
                      <option value="Bhakkar">Bhakkar</option>
                      <option value="Burewala">Burewala</option>
                      <option value="Chillianwala">Chillianwala</option>
                      <option value="Chakwal">Chakwal</option>
                      <option value="Chichawatni">Chichawatni</option>
                      <option value="Chiniot">Chiniot</option>
                      <option value="Chishtian">Chishtian</option>
                      <option value="Daska">Daska</option>
                      <option value="Darya Khan">Darya Khan</option>
                      <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
                      <option value="Dhaular">Dhaular</option>
                      <option value="Dina">Dina</option>
                      <option value="Dinga">Dinga</option>
                      <option value="Dipalpur">Dipalpur</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Ferozewala">Ferozewala</option>
                      <option value="Fateh Jhang">Fateh Jang</option>
                      <option value="Ghakhar Mandi">Ghakhar Mandi</option>
                      <option value="Gojra">Gojra</option>
                      <option value="Gujranwala">Gujranwala</option>
                      <option value="Gujrat">Gujrat</option>
                      <option value="Gujar Khan">Gujar Khan</option>
                      <option value="Hafizabad">Hafizabad</option>
                      <option value="Haroonabad">Haroonabad</option>
                      <option value="Hasilpur">Hasilpur</option>
                      <option value="Haveli Lakha">Haveli Lakha</option>
                      <option value="Jatoi">Jatoi</option>
                      <option value="Jalalpur">Jalalpur</option>
                      <option value="Jattan">Jattan</option>
                      <option value="Jampur">Jampur</option>
                      <option value="Jaranwala">Jaranwala</option>
                      <option value="Jhang">Jhang</option>
                      <option value="Jhelum">Jhelum</option>
                      <option value="Kalabagh">Kalabagh</option>
                      <option value="Karor Lal Esan">Karor Lal Esan</option>
                      <option value="Kasur">Kasur</option>
                      <option value="Kamalia">Kamalia</option>
                      <option value="Kamoke">Kamoke</option>
                      <option value="Khanewal">Khanewal</option>
                      <option value="Khanpur">Khanpur</option>
                      <option value="Kharian">Kharian</option>
                      <option value="Khushab">Khushab</option>
                      <option value="Kot Addu">Kot Addu</option>
                      <option value="Jauharabad">Jauharabad</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Lalamusa">Lalamusa</option>
                      <option value="Layyah">Layyah</option>
                      <option value="Liaquat Pur">Liaquat Pur</option>
                      <option value="Lodhran">Lodhran</option>
                      <option value="Malakwal">Malakwal</option>
                      <option value="Mamoori">Mamoori</option>
                      <option value="Mailsi">Mailsi</option>
                      <option value="Mandi Bahauddin">Mandi Bahauddin</option>
                      <option value="Mian Channu">Mian Channu</option>
                      <option value="Mianwali">Mianwali</option>
                      <option value="Multan">Multan</option>
                      <option value="Murree">Murree</option>
                      <option value="Muridke">Muridke</option>
                      <option value="Mianwali Bangla">Mianwali Bangla</option>
                      <option value="Muzaffargarh">Muzaffargarh</option>
                      <option value="Narowal">Narowal</option>
                      <option value="Nankana Sahib">Nankana Sahib</option>
                      <option value="Okara">Okara</option>
                      <option value="Renala Khurd">Renala Khurd</option>
                      <option value="Pakpattan">Pakpattan</option>
                      <option value="Pattoki">Pattoki</option>
                      <option value="Pir Mahal">Pir Mahal</option>
                      <option value="Qaimpur">Qaimpur</option>
                      <option value="Qila Didar Singh">Qila Didar Singh</option>
                      <option value="Rabwah">Rabwah</option>
                      <option value="Raiwind">Raiwind</option>
                      <option value="Rajanpur">Rajanpur</option>
                      <option value="Rahim Yar Khan">Rahim Yar Khan</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Sadiqabad">Sadiqabad</option>
                      <option value="Safdarabad">Safdarabad</option>
                      <option value="Sahiwal">Sahiwal</option>
                      <option value="Sangla Hill">Sangla Hill</option>
                      <option value="Sarai Alamgir">Sarai Alamgir</option>
                      <option value="Sargodha">Sargodha</option>
                      <option value="Shakargarh">Shakargarh</option>
                      <option value="Sheikhupura">Sheikhupura</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Sohawa">Sohawa</option>
                      <option value="Soianwala">Soianwala</option>
                      <option value="Siranwali">Siranwali</option>
                      <option value="Talagang">Talagang</option>
                      <option value="Taxila">Taxila</option>
                      <option value="Toba Tek Singh">Toba Tek Singh</option>
                      <option value="Vehari">Vehari</option>
                      <option value="Wah Cantonment">Wah Cantonment</option>
                      <option value="Wazirabad">Wazirabad</option>
                      <option value="" disabled>Sindh Cities</option>
                      <option value="Badin">Badin</option>
                      <option value="Bhirkan">Bhirkan</option>
                      <option value="Rajo Khanani">Rajo Khanani</option>
                      <option value="Chak">Chak</option>
                      <option value="Dadu">Dadu</option>
                      <option value="Digri">Digri</option>
                      <option value="Diplo">Diplo</option>
                      <option value="Dokri">Dokri</option>
                      <option value="Ghotki">Ghotki</option>
                      <option value="Haala">Haala</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Islamkot">Islamkot</option>
                      <option value="Jacobabad">Jacobabad</option>
                      <option value="Jamshoro">Jamshoro</option>
                      <option value="Jungshahi">Jungshahi</option>
                      <option value="Kandhkot">Kandhkot</option>
                      <option value="Kandiaro">Kandiaro</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Kashmore">Kashmore</option>
                      <option value="Keti Bandar">Keti Bandar</option>
                      <option value="Khairpur">Khairpur</option>
                      <option value="Kotri">Kotri</option>
                      <option value="Larkana">Larkana</option>
                      <option value="Matiari">Matiari</option>
                      <option value="Mehar">Mehar</option>
                      <option value="Mirpur Khas">Mirpur Khas</option>
                      <option value="Mithani">Mithani</option>
                      <option value="Mithi">Mithi</option>
                      <option value="Mehrabpur">Mehrabpur</option>
                      <option value="Moro">Moro</option>
                      <option value="Nagarparkar">Nagarparkar</option>
                      <option value="Naudero">Naudero</option>
                      <option value="Naushahro Feroze">Naushahro Feroze</option>
                      <option value="Naushara">Naushara</option>
                      <option value="Nawabshah">Nawabshah</option>
                      <option value="Nazimabad">Nazimabad</option>
                      <option value="Qambar">Qambar</option>
                      <option value="Qasimabad">Qasimabad</option>
                      <option value="Ranipur">Ranipur</option>
                      <option value="Ratodero">Ratodero</option>
                      <option value="Rohri">Rohri</option>
                      <option value="Sakrand">Sakrand</option>
                      <option value="Sanghar">Sanghar</option>
                      <option value="Shahbandar">Shahbandar</option>
                      <option value="Shahdadkot">Shahdadkot</option>
                      <option value="Shahdadpur">Shahdadpur</option>
                      <option value="Shahpur Chakar">Shahpur Chakar</option>
                      <option value="Shikarpaur">Shikarpaur</option>
                      <option value="Sukkur">Sukkur</option>
                      <option value="Tangwani">Tangwani</option>
                      <option value="Tando Adam Khan">Tando Adam Khan</option>
                      <option value="Tando Allahyar">Tando Allahyar</option>
                      <option value="Tando Muhammad Khan">Tando Muhammad Khan</option>
                      <option value="Thatta">Thatta</option>
                      <option value="Umerkot">Umerkot</option>
                      <option value="Warah">Warah</option>
                      <option value="" disabled>Khyber Cities</option>
                      <option value="Abbottabad">Abbottabad</option>
                      <option value="Adezai">Adezai</option>
                      <option value="Alpuri">Alpuri</option>
                      <option value="Akora Khattak">Akora Khattak</option>
                      <option value="Ayubia">Ayubia</option>
                      <option value="Banda Daud Shah">Banda Daud Shah</option>
                      <option value="Bannu">Bannu</option>
                      <option value="Batkhela">Batkhela</option>
                      <option value="Battagram">Battagram</option>
                      <option value="Birote">Birote</option>
                      <option value="Chakdara">Chakdara</option>
                      <option value="Charsadda">Charsadda</option>
                      <option value="Chitral">Chitral</option>
                      <option value="Daggar">Daggar</option>
                      <option value="Dargai">Dargai</option>
                      <option value="Darya Khan">Darya Khan</option>
                      <option value="Dera Ismail Khan">Dera Ismail Khan</option>
                      <option value="Doaba">Doaba</option>
                      <option value="Dir">Dir</option>
                      <option value="Drosh">Drosh</option>
                      <option value="Hangu">Hangu</option>
                      <option value="Haripur">Haripur</option>
                      <option value="Karak">Karak</option>
                      <option value="Kohat">Kohat</option>
                      <option value="Kulachi">Kulachi</option>
                      <option value="Lakki Marwat">Lakki Marwat</option>
                      <option value="Latamber">Latamber</option>
                      <option value="Madyan">Madyan</option>
                      <option value="Mansehra">Mansehra</option>
                      <option value="Mardan">Mardan</option>
                      <option value="Mastuj">Mastuj</option>
                      <option value="Mingora">Mingora</option>
                      <option value="Nowshera">Nowshera</option>
                      <option value="Paharpur">Paharpur</option>
                      <option value="Pabbi">Pabbi</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Saidu Sharif">Saidu Sharif</option>
                      <option value="Shorkot">Shorkot</option>
                      <option value="Shewa Adda">Shewa Adda</option>
                      <option value="Swabi">Swabi</option>
                      <option value="Swat">Swat</option>
                      <option value="Tangi">Tangi</option>
                      <option value="Tank">Tank</option>
                      <option value="Thall">Thall</option>
                      <option value="Timergara">Timergara</option>
                      <option value="Tordher">Tordher</option>
                      <option value="" disabled>Balochistan Cities</option>
                      <option value="Awaran">Awaran</option>
                      <option value="Barkhan">Barkhan</option>
                      <option value="Chagai">Chagai</option>
                      <option value="Dera Bugti">Dera Bugti</option>
                      <option value="Gwadar">Gwadar</option>
                      <option value="Harnai">Harnai</option>
                      <option value="Jafarabad">Jafarabad</option>
                      <option value="Jhal Magsi">Jhal Magsi</option>
                      <option value="Kacchi">Kacchi</option>
                      <option value="Kalat">Kalat</option>
                      <option value="Kech">Kech</option>
                      <option value="Kharan">Kharan</option>
                      <option value="Khuzdar">Khuzdar</option>
                      <option value="Killa Abdullah">Killa Abdullah</option>
                      <option value="Killa Saifullah">Killa Saifullah</option>
                      <option value="Kohlu">Kohlu</option>
                      <option value="Lasbela">Lasbela</option>
                      <option value="Lehri">Lehri</option>
                      <option value="Loralai">Loralai</option>
                      <option value="Mastung">Mastung</option>
                      <option value="Musakhel">Musakhel</option>
                      <option value="Nasirabad">Nasirabad</option>
                      <option value="Nushki">Nushki</option>
                      <option value="Panjgur">Panjgur</option>
                      <option value="Pishin Valley">Pishin Valley</option>
                      <option value="Quetta">Quetta</option>
                      <option value="Sherani">Sherani</option>
                      <option value="Sibi">Sibi</option>
                      <option value="Sohbatpur">Sohbatpur</option>
                      <option value="Washuk">Washuk</option>
                      <option value="Zhob">Zhob</option>
                      <option value="Ziarat">Ziarat</option>
                    </Select>
                    <Error >{errors.Bcity?.type === 'required' && "City is required"}</Error>
                  </InputDivS>

                  <InputDivS>
                  {/* {...register("postal_code", { required: true })} */}
                    <Input name='postal_code'  value={address.postal_code} onChange={handleEditChange('postal_code')} placeholder="Zip/ Postal code"  />
                    <Error >{errors.postal_code?.type === 'required' && "Zip/ Postal code is required"}</Error>
                  </InputDivS>
                </InputDivC>


                {/* <br /><label>Contact</label>
                <InputDivC>
                  <InputDivS>
                    <Input value={address.mobile}  onChange={handleEditChange} name='mobile' placeholder={address.mobile}  {...register("mobile", { required: true })} />
                    <Error >{errors.mobile?.type === 'required' && "mobile no. is required"}</Error>
                  </InputDivS>
                  <InputDivS>
                    <Input value={address.phone}  onChange={handleEditChange}  name='phone'placeholder={address.phone}  {...register("phone", { required: true })} />
                    <Error >{errors.phone?.type === 'required' && "Phone no. is required"}</Error>
                  </InputDivS>
                </InputDivC> */}
                
                <DoneButton style={{margin:'10px'}} onClick={submitEditBillHandler} > OK</DoneButton> 
              </FormDiv>

            )}
           

          </Left>

          <Right>
            <FormDiv>

              <TitleBlock><Payment style={{ paddingRight: '50px' }} /> Payment methods</TitleBlock>

              <InputDivS>
              
                  <div>
                  
                  {/* onChange={handleCredit('creditcard')} */}
                  {/* onChange={handleCredit('COD')} */}
                  <Label> <input  {...register("payment", { required: true })} type="radio" value="COD" /> <p style={{marginTop:'-6px',marginLeft:'4px'}}>Cash On Delivery</p></Label>
                  {/* <Label style={{width:'600px'}}> <input required  {...register("payment", { required: true })}   type="radio" value="credit card" />
                   For Credit Card (Visa ,Master Card and Amercian Express)
                   <img style={{width:'40px',height:'25px',marginLeft:'10px'}} src="https://www.pngfind.com/pngs/m/471-4717614_visa-logo-png-transparent-visa-card-vector-png.png"/>
                   <img style={{width:'50px',height:'25px'}} src="https://freepngimg.com/thumb/mastercard/70535-credit-vector-card-mastercard-logo-free-frame.png"/>
                   </Label> */}
                  <Error >{errors.payment?.type === 'required' && "Payment method is required"}</Error>
              
                </div>
                
               
                {account ==true?
                <>
                <LabelD onClick={handleDiscount} style={{ paddingLeft: '10px' }}>
                  <strong><h3>Apply Discount Coupon</h3></strong>
                </LabelD>
                
                {/* // <ArrowDropDown style={{ paddingLeft: '20px' }} /> */}
                  
                    <InputDivC>
                    {/* {...register("coupon_code", { required: true })} */}
                      <Input name='coupon_code' placeholder="Coupon code"  onChange={handleCoupon} />

                      {discount ==true?
                      <img src='https://www.kindpng.com/picc/m/721-7212637_done-icon-white-png-transparent-png.png' style={{width:'80px',height:'50px'}}/>:
                      <ButtonA onClick={handleApply}>Apply</ButtonA>
                       }
                     </InputDivC>
                    <Error >{errors.coupon_code?.type === 'required' && "Coupon is required"}</Error>
                    {errordiv &&
                       success?
                       <Success>{success}</Success>:
                       <Error >{coupon_error}</Error>
                    }
                  </>:''}
                  {/* <div >
                  <TitleBlock><LocalShippingOutlined style={{ paddingRight: '50px' }} /> Shipping Method</TitleBlock>
                  <Label> <input {...register("shippers", { required: true })} type="radio" value="standard" 
                  onChange={handleSMethod('strandard')} />Standard</Label>
                  <Label> <input {...register("shippers", { required: true })} type="radio" value="premium"
                   onChange={handleSMethod('premium')}/>Premium</Label>
                  <Error >{errors.shippers?.type === 'required' && "Shipper method is required"}</Error>
                </div> */}
                

              </InputDivS>


            </FormDiv>

            <FormDiv>
              <TitleBlock><ShoppingBasket style={{ paddingRight: '50px' }} />   Order Summary</TitleBlock>
              {cartItems.map(item => (
                  <>
                  {console.log('cartItems',item)}
                  <CheckoutItems
                    key={item.id}
                    id={item.id}
                    //desc={item.desc}
                    name={item.name}
                    price={item.price}
                    sum={sum}
                    count={item.count}
                    variant={item.variant}
                    image={item.image}
                   // parentCall={handleSum}
                  />
                  </>
                ))}


              <Summary>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>{priceTotal.toFixed(2)} Rs</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Total Items</SummaryItemText>
                  <SummaryItemPrice>{sum}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice> {shipprice}</SummaryItemPrice>
                </SummaryItem>
                {/* <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                </SummaryItem> */}
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  {ptotal===null? 
                  // <>
                  <SummaryItemPrice ><strong>{priceTotal.toFixed(2)} Rs</strong></SummaryItemPrice>:
                  <SummaryItemPrice ><strong>{ptotal.toFixed(2)} Rs</strong></SummaryItemPrice>
              }
                  {/* </> */}
                   
                </SummaryItem>
              </Summary>
            </FormDiv>

            {spin==false?
            <OrderButton type="submit">Place Order</OrderButton>:''
            }
            {spin &&
           
              <Spin>
                   
              </Spin>
              
            }

          </Right>
        </Form>
      


            {/* <Modal isOpen={modal} toggle={toggle}> */}
       
      </Container>
      {/* <Footer /> */}
    </Body>
  )
};


export default CheckoutPage


              const Popup= styled.div`
              width:500px;
              margin-left:auto;
              margin-right:auto; 
             
              `;
              const TopLinks= styled.div`
              display:flex;
              flex-direction:row;
              align-items:space-between;
             
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
              margin-top: -50px;
              max-width: 100%;
                 
              `;

const Body = styled.div`
   
              `;

const CreditCardNo = styled.input`
-webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  background-color:whitesmoke;
  height:30px;
  margin-top:12px;
  text-align:center;
  width:220px;
  border-style:none;
   
              `;
 const CreditCardBase = styled.input`
 -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
   box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
   background-color:whitesmoke;
   height:30px;
   margin-right:10px;
   margin-top:14px;
   text-align:center;
   width:100px;
   border-style:none;
    
               `;             
const Modal = styled.div`
margin-top: 50px;
display:flex;
flex-direction:row;
max-width: 80%;
margin-left:150px;
/* border-style: groove; */
 
  // height:200px;
  /* -webkit-box-shadow: 0px 0px 15px -10px rgba(2, 2, 2, 0.75);
 box-shadow: 0px 0px 15px -10px rgba(85, 52, 52, 0.75); */
            
`;




const OrderButton = styled.button`
              transition: all .5s ease;
              color: #000000;
              border: 2px solid black;
              min-width: 95%;
              text-transform: uppercase;
              text-align: center;
              margin-left:3%;
              line-height: 1;
              margin-bottom:15px;
              font-size: 20px;
              background-color : transparent;
              padding: 15px;
              outline: none;
              border-radius: 4px;

              &:hover {
                color: #ffffff;
              background-color: teal;
              border: 2px solid teal;
}

              `;



              



              const DoneButton = styled.button`
              transition: all .5s ease;
              color: #000000;
              border: 2px solid black;
              min-width: 10%;
              text-transform: uppercase;
              text-align: center;
              line-height: 1;
              font-size: 12px;
              background-color : transparent;
              padding: 8px;
              outline: none;
              border-radius: 4px;

              &:hover {
                color: #ffffff;
              background-color: teal;
              border: 2px solid teal;
}
              `;

const CloseButton = styled.button`
              transition: all .5s ease;
              color: #000000;
              border: 2px solid black;
              min-width: 10%;
              text-transform: uppercase;
              text-align: center;
              line-height: 1;
              float:right;
              
              font-size: 12px;
              background-color : transparent;
              padding: 8px;
              outline: none;
              border-radius: 4px;

              &:hover {
                color: #ffffff;
              background-color: teal;
              border: 2px solid teal;
}
              `;




const Top = styled.h1`
              font-weight: lighter;
              padding-left: 20px;
              `;
const Login = styled.text`

              color: #ff1e1e;
              font-weight: bold;
              padding-left: 20px;
              cursor: pointer;
              
              :hover&{
                text-decoration: underline;
              }
              `;
const TitleBlock = styled.h2`
              text-align: center;
              display: flex;
              align-items : center;
              padding: 10px;
              background-color :black;
              color:white;
              `

const FormDiv = styled.div`

              margin: 20px 0px 20px 0px;
              padding: 20px;
              opacity: 80%;

              `;
              const Ship = styled.div`
              display:flex;
              flex-direction:row;
              margin: 20px 0px 20px 0px;
              margin-bottom:0px;
              padding: 6px;
              opacity: 80%;

              `;
 const Detail = styled.div`
 border-style:groove;
 margin-right:200px;
 width:500px;
 background-color:rgb(245, 249, 255);
  // margin: 20px;
 margin: 20px 0px 20px 0px;
 padding: 20px;
 opacity: 80%;
 `;
 const OrderList= styled.div`
  display:flex;
  flex-direction:row;
 /* margin: 20px 0px 20px 0px;
 padding: 20px;
 opacity: 80%; */
 `;
 const Address = styled.div`
  display:flex;
  flex-direction:row;
  
  margin-bottom:30px;
 
 /* margin: 20px 0px 20px 0px;
 padding: 20px;
 opacity: 80%; */

 `;
//  const Ship = styled.div`
//  display:flex;
//  flex-direction:row;
//  margin: 20px 0px 20px 0px;
//  margin-bottom:0px;
//  padding: 6px;
//  opacity: 80%;

//  `;
 
         

const Form = styled.form`
              display:flex;
              flex-direction:row;
              max-width:100%;

              `;
const InputDiv = styled.form`
              min-width: 100%;
              display: flex;
              flex-direction: column;

              `;
const InputDivC = styled.form`

              display: flex;
              flex-direction: row;

              `;
const InputDivS = styled.form`
              max-width: 50%;
              min-width: 50%;
              display: flex;
              flex-direction: column;

              `;
const Label = styled.label`
display: flex;
flex-direction: row;
padding: 10px;
`;
const LabelD = styled.div`
display: flex;
cursor: pointer;

  border-radius: 5px;
  flex-direction: row;
  align-items : center;       
         text-align: center;

/* padding: -10px;
padding-left  : 20px; */

`;
const Input = styled.input`
              flex: 1;
              min-width: 40%;
              padding: 10px;
              margin: 10px;
              border: 1px solid grey;
              border-radius: 5px;

              `;
const ButtonA = styled.div`
              flex: 1;
              color: white;
              cursor: pointer;            
              text-align: center;
              background: #000;
              max-width: 20%;
              padding: 10px;
              margin: 10px;
              border: 1px solid grey;
              border-radius: 5px;

              `;
              const TopBtn= styled.button`
              margin-left:auto;
              border: 1px solid grey;
              height:40px;
              background-color:black;
              color:white;
              padding:8px;
              margin-right:60px;
              margin-top:30px;
              border-radius: 5px;
              `
const Select = styled.select`
              flex: 1;
              min-width: 40%;
              padding: 10px;
              margin: 10px;
              border: 1px solid grey;
              border-radius: 5px;

              `;
const Error = styled.h1`
              color: red;
              padding-left: 10px;
              margin-top: -10px;
              font-size: small;
              flex: 1;
              `;
const Success = styled.h1`
color:green;
padding-left: 10px;
margin-top: -10px;
font-size: small;
flex: 1;
`;

const GoButton = styled.button`
              width: 90%;
              border: none;
              margin-top: 5px;
              margin-left:15px;
              height:30px;
              //padding: 15px 20px;
              background-color: teal;
              color: white;
              cursor: pointer;
              //margin-bottom: 10px;
              `;

// const Link = styled.a`
//               margin: 5px 0px;
//               font-size: 12px;
//               text-decoration: underline;
//               cursor: pointer;
//               `;

const Right = styled.div`

              margin-top:0px;
              min-width: 50%;
              float: right;

              `;
const Left = styled.div`

              float: left;
              min-width: 50%;
              `;



const OSummary = styled.div`
              
              //width:340px;
              height:100px
              margin-left:300px;
              background-color:rgb(245, 249, 255);
  // margin: 20px;
              border: 0.5px solid lightgray;
              border-radius: 10px;
              padding: 20px;

              `;
const Summary = styled.div`
flex: 1;

margin-top:6px;
border: 0.5px solid lightgray;
border-radius: 10px;
padding: 20px;

`;


const SummaryItem = styled.div`
              margin: 30px 0px;
              margin-bottom:4px;
              display: flex;
              justify-content: space-between;
              font-weight: ${(props) => props.type === "total" && "800"};
              font-size: ${(props) => props.type === "total" && "32px"};
              `;

const SummaryItemTitle = styled.span`
text-align:center;
font-weight:500;
`;

const SummaryItemPrice = styled.span``;
const SummaryItemText = styled.span``;

const StyledLink = styled(Link)`
              text-decoration: none;
              color: #000000;
              cursor: pointer;
              `;

const Logo = styled.img`
              font-weight: bold;
              font-size: 22px;
               width:200;
               height:160px;
              `;