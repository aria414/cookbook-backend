const express = require('express')
const router = express.Router()
// IMPORT mongoose
const mongoose = require('../db/connection')
// IMPORT THE MODELs COOKBOOK AND AUTHOR
const Author = require('../models/Author')
const Cookbook = require('../models/Cookbook')
// CONNECT TO THE DB
const db = mongoose.connection


// Write the route to list all authors
router.get('/', (req, res) => {
    //....Use the model/collection we imported and display its documents
    Author.find({}).then(allAuthors => {
        res.json({
            status: 200,
            authors: allAuthors
        })
    }).catch(err => res.json({
        status: 400,
        err: err
    }))
})

// Write the route to get authors by firstname
// router.get('/:firstname', (req, res) => {
//     Author.findOne({firstName: req.params.firstname})
//         .then((author) => 
//             res.json({
//                 data:author
//             })
//         )
//         .catch( (err) => res.json( {status: 400, err: err } ) )
// })

// Write the route to create an author:
router.post('/', (req, res) => {
    const newAuthor = req.body
    console.log("newAuthor is: ", req.body)

    Author.create((newAuthor))
        .then((newAuthor) =>
            res.json( { data: newAuthor } )
        )
        .catch( (err) => res.json( { status: 400, err: err} ) )
})


// Write the route to update an author ... 
// Take in authorID and bookID . Find the autor by ID and push the book into the 'cookbooks' property with the cookbook ID
// http://localhost:4000/api/authors/60160122e2b1ea0b1bc30b32/addBook/60160203ee36110b5cd823b5
router.put('/:authorID/addBook/:bookID', async (req, res) => {
    const cookbook = await Cookbook.findById(req.params.bookID)
    const author = await Author.findByIdAndUpdate(
        req.params.authorID,
        { $push: {cookbooks: cookbook.id}, new: true}
    )
    res.json({status: 200, data: author})
})

// Update the cookbook using Postman.

// Bonus: Write the route to delete cookbooks by author name. (hint: There are a couple on different ways to do this and you may have to change/add code in other files)
/* ---------------------------------
++++++++++ BONUS WITH .THEN() FUNCTIONS ++++++++++
 [DELETE]  http://localhost:4000/api/authors/meera
 - Find the author's first name. 
 - Loop through each of the items in the author.cookbooks property to get the ID of the books
 - Using Cookbook collection, find the items by the ID in the loop, delete them
--------------------------------- */
/* ---------------------------------
router.delete('/:name', (req, res) => {
    Author.findOne({firstName: req.params.name})
        .then((author) => {
                res.json(author)

                console.log(`Author has ${author.cookbooks.length} books`)

                author.cookbooks.forEach ( (bookID) => {
                    console.log("book ID: ", bookID)
                    Cookbook.findByIdAndDelete(bookID)
                    .then((cookbook) =>
                        res.json({
                            status: 200,
                            msg: 'item deleted'
                        })
                    )
                    .catch((err) => res.json({ status: 400, err: err }));
                }) // -----END OF FOREACH -----
            }
        )
        .catch( (err) => res.json( {status: 400, err: err } ) )
})
--------------------------------- */


/* ---------------------------------
++++++++++  BONUS WITH ASYNC/AWAIT FUNCTIONS ++++++++++
[DELETE]  http://localhost:4000/api/authors/meera
- Find the author's first name. 
- Loop through each of the items in the author.cookbooks property to get the ID of the books 
- author.cookbooks =  [60160203ee36110b5cd823b5, 60160122e2b1ea0b1bc30b32 ]
- Using Cookbook collection, find the items by the ID in the loop, delete them
--------------------------------- */
router.delete('/:name', async (req, res) => {
    const author = await Author.findOne({firstName: req.params.name})
    console.log(`Author has ${author.cookbooks.length} books`)

    author.cookbooks.forEach ( async (bookID) => { 
        await Cookbook.findByIdAndDelete(bookID)
            res.json({
            msg: "item deleted",
            data: author
        })

    })
})

module.exports = router