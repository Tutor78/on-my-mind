const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');

const helpers = require('./utils/helpers');
const routes = require('./controllers');
const sequelize = require('./config/connection');

const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Aoskdiel!23i*930{',
    cookie: {
        expires: 15 * 60000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// sets the routes to active
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});