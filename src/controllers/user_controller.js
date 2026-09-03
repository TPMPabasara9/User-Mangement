const express = require('express');
const router = express.Router();
const User = require('../../models/user_model');
const Role = require('../../models/role_model');

// Create a new user
const createUser = async (req,res) =>{
    try{
        const {username, email , password , role } = req.body;
        const newUser = new User({username, email, password, role});
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}