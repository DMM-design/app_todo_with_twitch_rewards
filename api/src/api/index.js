// Library
const express = require('express');

// Routes
const twitch = require('./routes/twitch');


class Index
{
  constructor()
  {
    this.router = express.Router();
    this.config();
  }

  config()
  {
    this.router.get('/', (req, res) => {
      res.json({
        message: 'API - 👋🌎🌍🌏'
      });
    });
    this.router.use('/chat', twitch);
  }
}
// TwitchChat
const index = new Index();
module.exports = index.router;
