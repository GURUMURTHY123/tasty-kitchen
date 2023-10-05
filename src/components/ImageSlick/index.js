import React from "react";
import Slider from "react-slick";
import "./index.css";

const ImageSlick = props => {
  const {offers} = props
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear"
  }
  
  return(
    <div className="carousel-bg-container">
      <div className='carousel-container'>
        <Slider {...settings}>
          {offers.map(eachOffer=>(
            <div id={eachOffer.id} key={eachOffer.id}>
              <img src={eachOffer.image_url} alt="offer-Image" className='offer-image' />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default ImageSlick
