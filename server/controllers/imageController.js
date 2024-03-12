// import multer from 'multer'
import fs from 'fs'
import client from "../utils/monster_api.cjs";

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
    body: JSON.stringify({ prompt: prompt }),
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
  console.log(req.file.path);

  const model = "img2img";
  const input = {
    prompt: prompt,
    init_image_url: "https://resanskrit.com/cdn/shop/products/Sanatani_black_front-hanger_1024x1024.jpg?v=1655540844",
  };

  client
    .get_response(model, input)
    .then((result) => {
      // Handle the status response from the API
      console.log("Generated Data:", result);

      client
        .wait_and_get_result(result.process_id)
        .then((result) => {
          // Handle the generated content result
          console.log("Generated content result:", result);
          return res.json({ status: "ok", api_data: result });
        })
        .catch((error) => {
          // Handle API errors or timeout
          console.error("Error:", error);
          return res.json({ status: "fail", message: error.message });
        });
    })
    .catch((error) => {
      // Handle API errors
      console.error("Error:", error.message);
      return res.json({ status: "fail", message: error.message });
    });
};

export const detailEditImageUsingImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const base64Image = fs.readFileSync(req.file.path, { encoding: 'base64' });

    const url = "https://api.getimg.ai/v1/stable-diffusion-xl/image-to-image";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.GET_IMG_API_KEY}`,
      },
      body: JSON.stringify({ prompt: prompt, image: base64Image }),
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
