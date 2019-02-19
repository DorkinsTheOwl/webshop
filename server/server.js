require('./config/config');

const _ = require('lodash');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db/mongoose');
const { Item } = require('./models/item');
const { User } = require('./models/user');
const { authenticate, authenticateForItem } = require('./middleware/authenticate');

const app = express();
const publicPath = path.join(__dirname, '../dist');
const port = process.env.PORT || 3000;

const corsOptions = {
    exposedHeaders: 'x-auth'
};

app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use(cors(corsOptions));

app.post('/items', authenticateForItem, (req, res) => {
    const body = _.pick(req.body, ['name','description', 'image', 'quantity', 'price']);
    const item = new Item(body);

    item.save().then(doc => {
        res.send(doc);
    }, err => {
        res.status(400).send(err);
    });
});

app.get('/items', (req, res) => {
    Item.find({}).then(items => {
        res.send({items})
    }, err => {
        res.status(400).send(err);
   });
});

app.post('/users', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        body.level = req.body.level || 1;
        const user = new User(body);
        await user.save();
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (e) {
        res.status(400).send({error: e, message: 'Lietotājs ar šādu e-pastu jau eksistē!'});
    }
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});


app.post('/users/login', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (message) {
        res.status(400).send({message});
    }
});

app.delete('/users/me/token', authenticate, async (req, res) => {
    try {
        await req.user.removeToken(req.token);
        res.status(200).send()
    } catch (e) {
        res.status(400).send();
    }
});

app.get('/*', (req, res) => {
    res.sendFile(publicPath + '/index.html');
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app
};