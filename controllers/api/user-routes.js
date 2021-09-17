const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // Logic to get all users and associated posts and comments
    User.findAll({
        attributes: [
            'username',
            'email'
        ],
        include: [
            {
                model: Post,
                attributes: [
                    'title',
                    'post_content',
                    'created_at'
                ],
                include: [
                    {
                        model: User,
                        attributes: [
                            'username'
                        ]
                    }
                ]
            },
            {
                model: Comment
            }
        ]
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
    // logic to get on user with all posts and comments
    User.findOne({
        where: {
            id: req.params.id   
        },
        attributes: [
            'username',
            'email'
        ],
        include: [
            {
                model: Post,
                attributes: [
                    'title',
                    'post_content',
                    'created_at'
                ],
                include: [
                    {
                        model: User,
                        attributes: [
                            'username'
                        ]
                    }
                ]
            },
            {
                model: Comment
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'There is no user with that id!' });
            return;
        }

        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err)
    })
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
    
    User.create(req.body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
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
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'There is no user with that id!' });
            return;
        }

        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
    // logic to delete  user
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }

        res.json(dbUserData);
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;