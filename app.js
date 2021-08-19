const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
const authRoutes = require('./routes/auth');

const errorMiddleware = require('./middlewares/error');
const notFoundMiddleware = require('./middlewares/notFound');

const { makeRequestLogger, makeErrorLogger } = require('./middlewares/logger');
const { createRateLimiter } = require('./middlewares/rateLimiter');
const {
  FRONTEND_ORIGIN, IS_PRODUCTION, LISTEN_PORT, DB_ADDRESS,
} = require('./utils/constants');

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200,
}));

if (IS_PRODUCTION) {
  app.use(makeRequestLogger());
  app.use(helmet());

  app.use(createRateLimiter());
}

app.use('/users', usersRoutes);
app.use('/movies', moviesRoutes);
app.use(authRoutes);

if (IS_PRODUCTION) {
  app.use(makeErrorLogger());
}

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(LISTEN_PORT);
