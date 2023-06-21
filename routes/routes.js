const { Router } = require('express');

const playersController = require('../controllers/playersController')
const teamsController = require('../controllers/teamsController')

const routes = new Router();

/// PLAYERS ROUTES
routes.route('/players')
     .get(playersController.getPlayers)
     .post(playersController.addPlayer)
     .put(playersController.updatePlayer)

routes.route('/players/:id')
     .delete(playersController.deletePlayer)
     .get(playersController.getPlayerByCode)

routes.route(('/players/team/:id'))
     .get(playersController.getTeamPlayersByCode)


/// TEAMS ROUTES
routes.route('/teams')
    .get(teamsController.getTeams)
    .post(teamsController.addTeam)
    .put(teamsController.updateTeam)

routes.route('/teams/:id')
    .delete(teamsController.deleteTeam)
    .get(teamsController.getTeamByCode)
    

module.exports = routes;

