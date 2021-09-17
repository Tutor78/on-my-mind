const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');

// GET /api/posts/
router.get('/', (req, res) => {
    // logic to get all posts and related user and comment data
    Post.findAll({
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
            },
            {
                model: Comment,
                attributes: [
                    'comment_content'
                ],
                include: {
                    model: User,
                    attributes: [
                        'username'
                    ]
                }
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// GET /api/posts/:id
router.get('/:id', (req, res) => {
    // logic to retrieve one post and related user and comment data
    Post.findOne({
        where: {
            id: req.params.id
        },
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
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'There is no post with that id!' });
            return;
        }

        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// POST /api/posts/
router.post('/', (req, res) => {
    // logic to create a new post
    /* 
        An example of information needed would be :
        {
            "title": "This is a good blog",
            "post_content": "lorem ipsum blah blah blah",
            "user_id": "1"
        }
    */

    Post.create(req.body)
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// PUT /api/posts/:id
router.put('/:id', (req, res) => {
    // logic to update a post
    Post.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'There is no post with that id!' });
            return;
        }

        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// DELETE /api/posts/:id
router.delete('/:id', (req, res) => {
    // logic to delete a post
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'There is no post with this id!' });
            return;
        }

        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;