//GET /api/photos/nasa → fetch from NASA API (via axios)
//POST /api/favorites: Save a photo to the user's favorites
// GET /api/favorites: Get all favorite photos for the logged-in user
// DELETE /api/favorites/:id: Remove a photo from favorites
import mongoose from 'mongoose';
import { Photo} from "../models/photo.ts";
import axios from 'axios';

//GET /api/photos/nasa → fetch from NASA API (via axios)
export const getDailyPhoto = async (req, res) => {
    try {
      const response = await axios.get('https://api.nasa.gov/planetary/apod', {
        params: {
          api_key: process.env.NASA_API_KEY, // key stored in .env
          date: req.query.date || undefined, // Optional: support date-specific requests
        },
      });
  
      res.json(response.data); // Forward data to frontend
    } catch (error) {
      console.error('Error fetching from NASA API:', error.message);
      res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
  };
  




//GET- get all the photos from the gallery 
export const getPhotos = async (req, res) => {
    try {
       const photos = await Photo.find({});
       res.status(200).json(photos);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


//POST-save a photo to the gallery 
export const savePhoto = async (req, res) => {
    try {
       const photo= await Photo.create(req.body);
       res.status(200).json(photo);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};


//DELETE- remove a photo from the gallery
export const deletePhoto = async (req, res) => {
    // const { id } = req.params; => is it better to put it outside the try/catch?

    try {
        const { id } = req.params;
        const photo = await Photo.findByIdAndDelete(id);
        if (!photo) {
            return res.status(404).json ({message: "Photo not found"});
        }
        res.status(200).json(`${photo} has been deleted`);
        
    } catch (error) {
        res.status(500).json({ message: error.message});       
    }
};


