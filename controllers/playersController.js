const { getPlayersDB, addPlayerDB, updatePlayerDB, deletePlayerDB,
    getPlayerByCodeDB, getTeamPlayersByCodeDB } = require('../useCases/playersUseCases.js');

const getPlayers = async (request, response) => {
    await getPlayersDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Error consulting player: ' + err
        }))
}

const addPlayer = async (request, response) => {
    await addPlayerDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Player created sucessfully',
            object: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }))
}

const updatePlayer = async (request, response) => {
    await updatePlayerDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Player updated sucessfully',
            object: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }))
}

const deletePlayer = async (request, response) => {
    await deletePlayerDB(parseInt(request.params.id))
        .then(data => response.status(200).json({
            status: 'success',
            message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }))
}

const getPlayerByCode = async (request, response) => {
    await getPlayerByCodeDB(parseInt(request.params.id))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }))
}


const getTeamPlayersByCode = async (request, response) => {
    const teamId = parseInt(request.params.id);
    await getTeamPlayersByCodeDB(teamId)
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Error consulting player: ' + err
        }))
}

module.exports = {
    getPlayers, addPlayer, updatePlayer,
    deletePlayer, getPlayerByCode,
    getTeamPlayersByCode
}
