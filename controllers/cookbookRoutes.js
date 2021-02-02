const express = require('express')
const router = express.Router()
// IMPORT mongoose
const mongoose = require('../db/connection')
// CONNECT TO THE DB
const db = mongoose.connection
// Require the model Cookbook
const Cookbook = require('../models/Cookbook')

// Write the route to list all cookbooks - http://localhost:4000/api/cookbooks/
router.get('/', (req, res) => {
    //....Use the model/collection we imported and display its documents
    Cookbook.find({}).then(allCookbooks => {
        res.json({
            status: 200,
            cookbooks: allCookbooks
        })
    }).catch(err => res.json({
        status: 400,
        err: err
    }))
})
// Write the route to get cookbook by title -  http://localhost:4000/api/cookbooks/fate cooking materials

router.get('/:title', (req, res) => {
    Cookbook.findOne({title: req.params.title})
        .then((cookbook) => 
            res.json({
                data:cookbook
            })
        )
        .catch( (err) => res.json( {status: 400, err: err } ) )
})

// Write the route to get cookbook by year published

// Write the route to create a cookbook
router.post('/', (req, res) => {
    const newCook = req.body

    Cookbook.create((newCook))
        .then((newCook) =>
            res.json( { data: newCook } )
        )
        .catch( (err) => res.json( { status: 400, err: err} ) )
})
// Write the route to update a cookbook  - http://localhost:4000/api/cookbooks/60160203ee36110b5cd823b5
router.put('/:id', (req, res) => {
    Cookbook.findByIdAndUpdate( req.params.id, req.body, {new: true})
        .then((cookbook) =>
            res.json({
                status: 200,
                msg: 'item updated',
                data: cookbook
            })
        )
        .catch((err) => res.json({ status: 400, err: err }));
});

// Write the route to delete the cookbook by title - http://localhost:4000/api/cookbooks/made in india
// router.delete('/:title', (req, res) => {
//     Cookbook.deleteOne( { title: req.params.title } )
// 			.then((cookbook) =>
// 				res.json({
// 					status: 200,
//                     msg: 'item deleted'
// 				})
// 			)
// 			.catch((err) => res.json({ status: 400, err: err }));
// });

// Delete by ID - http://localhost:4000/api/cookbooks/id/6018ac91891db01e63678109
router.delete('/id/:id', (req, res) => {
    Cookbook.findByIdAndDelete( req.params.id )
			.then((cookbook) =>
				res.json({
					status: 200,
                    msg: 'item was deleted'
				})
			)
			.catch((err) => res.json({ status: 400, err: err }));
});

module.exports = router;