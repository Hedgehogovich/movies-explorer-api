const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const router = require('./routes');

const { errorMiddleware } = require('./middlewares/error');

const { makeRequestLogger, makeErrorLogger } = require('./middlewares/logger');
const { makeRateLimiter } = require('./middlewares/rateLimiter');
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

app.use(makeRequestLogger());
if (IS_PRODUCTION) {
  app.use(helmet());

  app.use(makeRateLimiter());
}

app.use(router);

app.use(makeErrorLogger());
app.use(errorMiddleware);

app.listen(LISTEN_PORT);
