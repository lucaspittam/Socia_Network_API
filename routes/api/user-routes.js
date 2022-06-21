const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
} = require('../../controllers/user-controller');

//GET and POST routes
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)


//GET, PUT, and DELETE
router
    .route('/:id')
    .get(getUserById)




module.exports = router; 
