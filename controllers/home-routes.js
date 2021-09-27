const router = require('express').Router();

const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
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
                    'comment_content'
                ],
                include: {
                    model: User,
                    attributes: [
                        'id',
                        'username'
                    ]
                }
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));

        res.render('index', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

router.get('/dashboard', (req, res) => {
    // if the user is not signed in they are redirected to sign up
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }

    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
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
                    'comment_content'
                ],
                include: {
                    model: User,
                    attributes: [
                        'id',
                        'username'
                    ]
                }
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));

        res.render('dashboard', { 
            posts,
            loggedIn: req.session.loggedIn     
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
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
                include: {
                    model: User,
                    attributes: [
                        'id',
                        'username'
                    ]
                }
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id!'});
            return;
        }

        const post = dbPostData.get({ plain: true });

        let owner = false;

        if (post.user.id == req.session.user_id) {
            owner = true;
        }
        
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn,
            owner: owner
        });

    })
})

module.exports = router;