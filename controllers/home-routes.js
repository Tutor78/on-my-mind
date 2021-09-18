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
        res.redirect('/');
        return;
    }

    res.render('login');
})

module.exports = router;