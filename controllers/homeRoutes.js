const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
 
});

router.get('/blog/:id', async (req, res) => {
 
});

router.get('/dashboard', withAuth, async (req, res) => {
 
});

router.get('/login', (req, res) => {
 
});

module.exports = router;