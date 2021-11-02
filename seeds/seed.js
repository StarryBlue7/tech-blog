const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const blogs = [];
    for (const blog of blogData) {
        const newBlog = await Blog.create({
            ...blog,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
        blogs.push(newBlog);
    }

    for (const comment of commentData) {
        const randUserId = Math.floor(Math.random() * users.length);
        await Comment.create({
            ...comment,
            user_id: users[randUserId].id,
            commenter: users[randUserId].name,
            blog_id: blogs[Math.floor(Math.random() * blogs.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();
