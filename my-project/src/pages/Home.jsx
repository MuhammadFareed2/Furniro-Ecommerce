import React from 'react';
import { Link } from 'react-router-dom';
import HomeImage from "../assets/images/homePage.jpg";
import Living from "../assets/images/living.png";
import Bedroom from "../assets/images/bedroom.png";
import Dining from "../assets/images/dining.png";
import items from "../constants/items.json";
import CustomButton from '../components/CustomButton';
import Image from "../assets/images/image.png";
import ProductCard from '../components/ProductCard'; 

const Home = () => {
  return (
    <>
      <div className='flex items-center justify-center overflow-hidden w-full aspect-[1440/716]'>
        <img src={HomeImage} alt="Home" className='w-full h-full object-cover' />
      </div>

      <div className='text-center p-6 md:p-14'>
        <h1 className='text-[24px] md:text-[32px] font-bold'>
          Browse The Range
        </h1>
        <p className='text-lg md:text-xl font-normal'>
          Browse The Large Range Of Categories
        </p>
      </div>

      <div className='flex flex-col md:flex-row justify-between items-center gap-6 mx-6 md:mx-[100px]'>
        <Link to='/shop' className='flex flex-col items-center'>
          <div className='w-[90%] sm:w-[381px] h-[300px] sm:h-[481px] bg-white'>
            <img src={Dining} alt="Dining" className='w-full h-full object-cover' />
          </div>
          <h1 className='pt-5 text-xl sm:text-2xl font-semibold'>Dining</h1>
        </Link>

        <Link to='/shop' className='flex flex-col items-center'>
          <div className='w-[90%] sm:w-[381px] h-[300px] sm:h-[481px] bg-white'>
            <img src={Living} alt="Living" className='w-full h-full object-cover' />
          </div>
          <h1 className='pt-5 text-xl sm:text-2xl font-semibold'>Living</h1>
        </Link>

        <Link to='/shop' className='flex flex-col items-center'>
          <div className='w-[90%] sm:w-[381px] h-[300px] sm:h-[481px] bg-white'>
            <img src={Bedroom} alt="Bedroom" className='w-full h-full object-cover' />
          </div>
          <h1 className='pt-5 text-xl sm:text-2xl font-semibold'>Bedroom</h1>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-12 bg-white">
        {
          items.slice(0, 8).map((item, index) => (
            <ProductCard 
              key={index} 
              index={index} 
              image={item.image} 
              imageAlt={item.imageAlt} 
              name={item.name} 
              currency={item.price.currency} 
              currentPrice={item.price.currentPrice} 
              typeName={item.typeName} 
            />
          ))
        }
      </div>

      <div className='flex items-center justify-center'>
        <CustomButton 
          text="Show More" 
          styles="flex items-center justify-center border-2 border-[#B88E2F] text-[#B88E2F] w-[200px] md:w-[245px] h-[48px] mb-12" 
          to="/shop" // Set the link path here
        />
      </div>

      <img src={Image} alt="Footer" className='w-full object-cover mb-20' />
    </>
  );
};

export default Home;
