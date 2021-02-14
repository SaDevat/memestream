import express from 'express';
import mongoose from 'mongoose';

import MemeMessage from '../models/memeMessage.js';

const router = express.Router();

export const getMemes = async (req, res) => { 
    try {
        const memeMessages = await MemeMessage.find();
                
        res.status(200).json(memeMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getMeme = async (req, res) => { 
    const { id } = req.params;

    try {
        const meme = await MemeMessage.findById(id);
        
        res.status(200).json(meme);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createMeme = async (req, res) => {
    const { title, message, selectedFile, url, tags } = req.body;

    const newMemeMessage = new MemeMessage({ title, message, selectedFile, url, tags })

    try {
        await newMemeMessage.save();

        res.status(201).json(newMemeMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateMeme = async (req, res) => {
    const { id } = req.params;
    const { title, message, url, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedMeme = { url, title, message, tags, selectedFile, _id: id };

    await MemeMessage.findByIdAndUpdate(id, updatedMeme, { new: true });

    res.json(updatedMeme);
}

export const deleteMeme = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await MemeMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likeMeme = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const meme = await MemeMessage.findById(id);

    const updatedMeme = await MemeMessage.findByIdAndUpdate(id, { likeCount: meme.likeCount + 1 }, { new: true });
    
    res.json(updatedMeme);
}


export default router;