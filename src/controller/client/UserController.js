var express = require('express');
const UserModel = require('../../models/UserModel');
const checkDuplicateUser = require('../../middleware/checkDuplicateUser');

exports.addUsers = async (req, res) => {
    try {
        const user = req.body;
        const existingUser = await checkDuplicateUser(user)
        if (existingUser) {
            return res.send({ message: ' user already exists' })
        }
        const result = await UserModel.create(user);
        res.status(200).json({ status: 'success', data: result })
    } catch (e) {
        console.log(e)
        res.status(400).json({ status: 'failed' })
    }
}

exports.getSingleUser = async (req, res) => {
    try {
        const email = req.params.email;
        const query = { email: email }
        const result = await UserModel.findOne(query);
        res.status(200).json({ status: 'success', data: result })
    } catch (e) {
        res.status(400).json({ status: 'failed' })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const result = await UserModel.find()
        res.status(200).json({ status: 'success', data: result })
    } catch (error) {
        res.status(400).json({ status: 'failed' })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const updatedData = req.body;
        const result = await UserModel.findByIdAndUpdate(id, updatedData, { new: true })
        res.status(200).json({ status: 'success', data: result })
    } catch (error) {
        res.status(400).json({ status: 'failed' })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const result = await UserModel.findByIdAndDelete(id)
        res.status(200).json({ status: 'data delete success', data: result })
    } catch (error) {
        res.status(400).json({ status: 'failed' })
    }
}