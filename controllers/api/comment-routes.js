const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET /api/comments/
router.get('/', (req, res) => {
    // logic to get all comments
    Comment.findAll({
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
            },
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
                    }
                ]
            }
        ]
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// POST /api/comments
router.post('/', (req, res) => {
    // logic to create a comment
    /*
        example json to create a comment
        {
            "comment_content": "This is a dope blog post",
            "user_id": 1,
            "post_id": 3
        }
    */
   Comment.create(req.body)
   .then(dbCommentData => res.json(dbCommentData))
   .catch(err => {
       console.log(err);
       res.status(500).json(err);
   })
});

// DELETE /api/comments/:id
router.delete('/:id', (req, res) => {
    // logic to delete a comment
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'There is no comment with that id!' });
            return;
        }

        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;