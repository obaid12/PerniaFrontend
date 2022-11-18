import React, { Component } from 'react'
// import css  from './newsletter.module.css';
import Image from 'next/image'
const Newsletter = () => {
    return (
        <>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" ></link>
        
        <div className="container footer_text" style={{marginTop:'20px',padding:'20px 0 20px 0'}}>
        <div className="row footer_row news-row">
            <div className="col-lg-7 col-md-6 col-sm-12 col-xs-12 ">
                <div className="logo-social-area">
                <span><Image alt="Pernia " className="footer-logo"  src="/pernia.png" height={150} width={150}/></span>
                <div className="footer-newletter-wrapper" style={{display:'inlne',float:'right',marginLeft:'-20px'}}>
                    <h2> Hey, wait...</h2>
                    <h3>Subscribe to our newsletter!</h3>
                    <p>Stay up to date with the latest in fashion
                        trends and LAAM exclusive offers.
                    </p>
                </div>
                </div>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12 col-xs-12 inner-new-row">
                <div className="news-area" style={{marginTop:'30px', marginLeft:'auto'}}>
                <div className="email_box">
                    <form method="post" action="/contact#contact_form" id="contact_form" acceptCharset="UTF-8" className="contact-form" data-omnisend-captured-form="true">
                        <input type="hidden" name="form_type" value="customer"/>
                        <input type="hidden" name="utf8" value="✓"/>
                    
                    
                    <input name="contact[tags]" type="hidden" value="newsletter"/>
                    <div className="news-field-area" > 
                    <input type="email" value="" placeholder="Email address" name="contact[email]" id="Email" className="txtbox" aria-label="email@example.com" autoCorrect="off" autoCapitalize="off" style={{width:'300px',height:'40px'}}/>
                        <button className="btn btn-link" type="submit" value="Subscribe" name="commit" id="Subscribe">
                            <img src="https://cdn.shopify.com/s/files/1/2337/7003/files/New_Project_27.png?v=1628161930" alt="IMG" width={30} style={{marginLeft:'-80px'}}/></button>
                    </div>
                    
                    </form>
                </div>
                <p style={{fontSize:'15px'}}>By signing up, you agree to LAAM’s <a href="#">Privacy Policy</a> and <a href="#">Terms &amp; Conditions</a>.</p>
                </div>
            </div>
        </div>
        </div>
        
        {/* <div c\ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script> */}
        </>
      );
}
export default Newsletter;
