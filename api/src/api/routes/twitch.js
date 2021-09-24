// Library
const express = require('express');
// Controllers
const twitchController = require('../controllers/twitchController');

class Twitch
{
    constructor()
    {
        this.router = express.Router();
        this.config();
    }

    config()
    {
        this.router.get('/users', twitchController.getUsersData);
        this.router.get('/user/:id', twitchController.getUser);
        this.router.get('/users/count', twitchController.getUsersLength);
        this.router.get('/rewards', twitchController.getRewardsData);
        this.router.get('/rewards/count', twitchController.getRewardsLength);
        this.router.put('/rewards/:id', twitchController.updateReward);
        this.router.delete('/rewards/:id', twitchController.deleteRewardsData);
    }
}
module.exports = new Twitch().router;