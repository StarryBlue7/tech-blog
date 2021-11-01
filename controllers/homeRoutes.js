const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                { model: User, attributes: ['name'] },
                { model: Comment }
            ],
            attributes: {
                include: [
                    [
                        sequelize.literal(
                        '(SELECT COUNT(comment.id) FROM comment WHERE comment.blog_id = blog.id)'
                        ),
                        'totalComments',
                    ]
                ]
            }
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render('homepage', { 
            blogs, 
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['name'] },
                { model: Comment }
            ],
            attributes: {
                include: [
                    [
                        sequelize.literal(
                        '(SELECT COUNT(comment.id) FROM comment WHERE comment.blog_id = blog.id)'
                        ),
                        'totalComments',
                    ]
                ]
            }
        });

        const blog = blogData.get({ plain: true });
        blog.comments.forEach(comment => {
            comment.isOwner = comment.user_id === req.session.user_id;
        });
        
        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Blog }
            ]
        });

        const user = userData.get({ plain: true });

        // res.json(user)
        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

module.exports = router;