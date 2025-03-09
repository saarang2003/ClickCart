import React from 'react'
import banner1 from '../../assets/banner1.webp';
import banner2 from '../../assets/banner2.webp';
import banner3 from '../../assets/banner3.webp';



function ShoppingHome() {

  const [banner1, banner2, banner3] = slider;
  return (
    <div className="flex flex-col min-h-screen">
       <div className="relative w-full h-[600px] overflow-hidden">

       {slides.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          }
       </div>
    </div>
  )
}

export default ShoppingHome