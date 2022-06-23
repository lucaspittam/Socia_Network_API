const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

//POST route for thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought)


//set up for thoughts
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

module.exports = router;