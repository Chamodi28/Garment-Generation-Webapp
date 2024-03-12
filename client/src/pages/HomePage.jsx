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

  return (
    <>
      <div className="h-screen flex-col justify-center items-center bg-blue-950 py-10">
        <h1 className='text-white text-5xl font-bold text-center mb-10'>Unleash the power of AI to create and edit images🪄</h1>
        <div className="w-full flex justify-center items-center gap-10">
            <ImgCard image={image2} link="/text-to-image" title="Generate Image" desc="lodsfadsafdasfdsafadsfdsafdsafdsafafdsafsafds"/>
            <ImgCard image={image2} link="/image-to-image-edit" title="Edit Image to Image" desc="lodsfadsafdasfdsafadsfdsafdsafdsafafdsafsafds"/>
            <ImgCard image={image2} link="/image-to-image-detail-edit" title="Edit Image to Image detail" desc="lodsfadsafdasfdsafadsfdsafdsafdsafafdsafsafds"/>
        </div>
      </div>


    </>
  )
}