const express = require('express')

exports.demo = async(req, res) =>{
    try{
    res.status(200).json({status: 'success', data: "Shut up! Don't hit my api."})
    }catch(e){
        res.status(400).json({status: 'failed'})

    }
}
