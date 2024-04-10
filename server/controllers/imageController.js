import fs from 'fs'
import client from "../utils/monster_api.cjs";
import { uploadImage } from '../utils/cloudinaryUtil.js';

export const generateImage = async (req, res) => {
  const { prompt } = req.body;

  const url = "https://api.getimg.ai/v1/stable-diffusion-xl/text-to-image";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",

      Authorization: `Bearer ${process.env.GET_IMG_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'stable-diffusion-xl-v1-0',
      negative_prompt: 'Disfigured, cartoon, blurry, nude, violent',
      negative_prompt_2: 'Disfigured, cartoon, blurry, nude, violent',
      width: 768,
      height: 768,
      steps: 25,
      guidance: 9,
      prompt: prompt,
    })
//     body: JSON.stringify({ prompt: prompt }),

  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return res.json({ status: "ok", api_data: data });
  } catch (error) {
    return res.json({ status: "fail", message: error.message });
  }
};

export const editImageUsingImage = async (req, res) => {
  const {prompt} = req.body
  const imageStream = fs.readFileSync(req.file.path);

  const uploadResult = await uploadImage(imageStream, 'temp_img')

  console.log(uploadResult);

  // const model = "img2img";
  const model = "pix2pix";
  const input = {
    prompt: prompt,
    init_image_url: uploadResult.secure_url,
    negprompt: 'deformed, bad anatomy, disfigured, poorly drawn face',
    steps: 30,
    guidance_scale: 12.5,
    image_guidance_scale: 1.5,
    seed: 2414,
    //// changed here
  };

  client
    .get_response(model, input)
    .then((result) => {
      console.log("Generated Data:", result);

      client
        .wait_and_get_result(result.process_id)
        .then((result) => {
          // Handle the generated content result
          fs.unlinkSync(req.file.path);
          return res.json({ status: "ok", api_data: result });
        })
        .catch((error) => {
          fs.unlinkSync(req.file.path);
          return res.json({ status: "fail", message: error.message });
        });
    })
    .catch((error) => {
      fs.unlinkSync(req.file.path);
      return res.json({ status: "fail", message: error.message });
    });
};

export const detailEditImageUsingImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const base64Image = fs.readFileSync(req.file.path, { encoding: 'base64' });

    const url = "https://api.getimg.ai/v1/stable-diffusion-xl/image-to-image";
    // const url = "https://api.getimg.ai/v1/stable-diffusion/image-to-image";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.GET_IMG_API_KEY}`,
      },

      body: JSON.stringify({ 
      prompt: prompt, image: base64Image,
      model: 'stable-diffusion-xl-v1-0', //'realistic-vision-v5-1', //'stable-diffusion-v1-5' , 
      negative_prompt: 'Disfigured, cartoon, blurry',
      strength: 0.36,                    // 0.61,          //0.6 was there   0.4      0.74   worked 0.61
      steps: 32,                         //65,             // 25 was there
      guidance: 12,                      // 9,             // 18 was there       9      9    worked 18 
      scheduler: 'euler'                 // 'dpmsolver++', // 'lms' 'euler' ,
      
      }),

//       body: JSON.stringify({ prompt: prompt, image: base64Image});


    };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    // Delete the temporary image file
    fs.unlinkSync(req.file.path);

    return res.json({ status: "ok", api_data: data });
  } catch (error) {
    
    // Delete the temporary image file
    fs.unlinkSync(req.file.path);
    return res.json({ status: "fail", message: error.message });
  }
};
