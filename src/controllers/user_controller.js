const express = require('express');
const userService = require('../service/user_service');
const User = require('../models/user_model');



// Create a new user
const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }

}

const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const users = await userService.getAllUsers(page, limit);
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getUserById = async (req, res) =>{
    try{
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        if(!user){
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

module.exports = { createUser, getAllUsers, getUserById };