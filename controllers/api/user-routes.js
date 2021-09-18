const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // Logic to get all users and associated posts and comments
    User.findAll({
        attributes: [
            'id',
            'username',
            'email'
        ],
        include: [
            {
                model: Post,
                attributes: [
                    'id',
                    'title',
                    'post_content',
                    'created_at'
                ],
                include: [
                    {
                        model: User,
                        attributes: [
                            'id',
                            'username'
                        ]
                    },
                    {
                        model: Comment,
                        attributes: [
                            'id',
                            'comment_content',
                            'created_at'
                        ],
                        include: [
                            {
                                model: User,
                                attributes: [
                                    'id',
                                    'username'
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_content',
                    'created_at'
                ],
                include: [
                    {
                        model: User,
                        attributes: [
                            'id',
                            'username'
                        ]
                    }
                ]
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
            'id',
            'username',
            'email'
        ],
        include: [
            {
                model: Post,
                attributes: [
                    'id',
                    'title',
                    'post_content',
                    'created_at'
                ],
                include: [
                    {
                        model: User,
                        attributes: [
                            'id',
                            'username'
                        ]
                    },
                    {
                        model: Comment,
                        attributes: [
                            'id',
                            'comment_content',
                            'created_at'
                        ],
                        include: [
                            {
                                model: User,
                                attributes: [
                                    'id',
                                    'username'
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_content',
                    'created_at'
                ],
                include: [
                    {
                        model: User,
                        attributes: [
                            'id',
                            'username'
                        ]
                    }
                ]
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
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// POST /api/users/login
router.post('/login', (req, res) => {
    // logic for an existing user to login
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with that email address!' });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect Password!' });
            return;
        }

        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        })
    })
});

// POST /api/users/logout
router.post('/logout', (req, res) => {
    // logic for a user to log out
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
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