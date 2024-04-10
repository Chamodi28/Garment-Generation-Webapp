import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ImgCard from '../components/ImgCard'

import image1 from '../assets/img1.jpg'
import image2 from '../assets/img2.jpg'
import image3 from '../assets/img3.jpg'



export const HomePage = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get("http://localhost:3000/auth/verify");
        if (res.data.status === "ok") {
          console.log("user verified..");
        } else {
          navigate("/signin");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    verify();
  }, []);

/*
  return (
    <>
      <div className="h-screen flex-col justify-center items-center bg-black py-10">
        <h1 className='text-white text-5xl font-futura text-center mb-10'><span className="bg-gradient-to-r from-red-500 to-blue-700 text-transparent bg-clip-text">Unleash the power of AI to create and edit images🪄</span></h1>
        <div className="w-full flex justify-center items-center gap-10">
            <ImgCard image={image1} link="/text-to-image" title="Text To Image" desc="Transform Words into Visual Wonders!"/>  
            <ImgCard image={image3} link="/image-to-image-edit" title="Text + Image" desc="Merge Photos and Words into Art!"/>
            <ImgCard image={image2} link="/image-to-image-detail-edit" title="Image Editing" desc="Elevate Images to Perfection!"/>
        </div>
      </div>


    </>
  )

  */
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center bg-black py-10">
        <h1 className='text-white text-5xl md:text-4xl sm:text-3xl font-futura text-center mb-10'>
          <span className="bg-gradient-to-r from-red-500 to-blue-700 text-transparent bg-clip-text">
            Unleash the power of AI to create and edit images🪄
          </span>
        </h1>
        <div className="w-full flex flex-wrap justify-center items-center gap-10 px-5">
          <ImgCard image={image1} link="/text-to-image" title="Text To Image" desc="Transform Words into Visual Wonders!"/>  
          <ImgCard image={image3} link="/image-to-image-edit" title="Text + Image" desc="Merge Photos and Words into Art!"/>
          <ImgCard image={image2} link="/image-to-image-detail-edit" title="Image Editing" desc="Elevate Images to Perfection!"/>
        </div>
      </div>
    </>
  );
}


