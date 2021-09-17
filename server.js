const express = require('express');
const session = require('express-session');

const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sets the routes to active
app.use(routes);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});