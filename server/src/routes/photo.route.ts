//POST /api/favorites: Save a photo to the user's favorites
// GET /api/favorites: Get all favorite photos for the logged-in user
// DELETE /api/favorites/:id: Remove a photo from favorites
import express from 'express';


const router = express.Router();

router.get("/", getDailyPhoto); //fetch API from NASA API 

router.get("/", getPhotos);
    
router.post("/", savePhoto);

router.delete("/:id", deletePhoto);

