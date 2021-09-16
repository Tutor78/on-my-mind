const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // Logic to get all users and associated posts and comments
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
    // logic to get on user with all posts and comments
});

// POST /api/users
router.post('/', (req, res) => {
    // logic to create a new user
    /* 
        req.body must look lik:
        {
            "username": "SomeName73",
            "email": "totallylegitemail@email.com",
            "password": "supersecurepassword"
        }
    */
});

// POST /api/users/login
router.post('/login', (req, res) => {
    // logic for an existing user to login
});

// POST /api/users/logout
router.post('/logout', (req, res) => {
    // logic for a user to log out
});

// PUt /api/users/:id
router.put('/:id', (req, res) => {
    // logic to update a user's information
});

// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
    // logic to delete  user
});

module.exports = router;