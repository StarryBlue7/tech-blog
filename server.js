const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const app = express();
const PORT = process.env.PORT || 3001;

const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Secret tech blog',
    cookie: {
        expires: 600 * 1000
    },
    resave: true,
    rolling: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
