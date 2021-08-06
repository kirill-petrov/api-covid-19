const express = require('express');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const indexRouter = require('./routes/index.router');

const PORT = process.env.PORT || 3001;
const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'views'));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  store: new FileStore(),
  name: 'user_sid',
  secret: 'process.env.SESSION_SECRET',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // 12 hours
  },
}));

app.use('/', indexRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server listened PORT:', PORT);
});
