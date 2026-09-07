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
        const userId = req.query.id;
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

const updateUser = async (req, res) => {
    try{
        const userId = req.params.id;
        const userData = req.body;
        if(!userId) {
            return res.status(400).json({
                message: 'User ID is required'
            });
        }
        if(!userData || Object.keys(userData).length === 0) {
            return res.status(400).json({
                message: 'User data is required'
            });
        }
        const updatedUser = await userService.updateUser(userId, userData);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(error.message === 'User not found' ? 404 : 400).json({
            message: error.message
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if(!userId) {
            return res.status(400).json({
                message: 'User ID is required'
            });
        }

        const deletedUser = await userService.deleteUser(userId);
        if(!deletedUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            message: 'User deleted successfully',
            data: deletedUser
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };