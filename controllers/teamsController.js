const { getTeamsDB, addTeamDB, updateTeamDB, deleteTeamDB,
    getTeamByCodeDB } = require('../useCases/teamsUseCases.js');

const getTeams = async (request, response) => {
    await getTeamsDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Error consulting team: ' + err
        }))
}

const addTeam = async (request, response) => {
    await addTeamDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Team created sucessfully',
            object: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }))
}

const updateTeam = async (request, response) => {
    await updateTeamDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Team updated sucessfully',
            object: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }))
}

const deleteTeam = async (request, response) => {
    await deleteTeamDB(parseInt(request.params.id))
        .then(data => response.status(200).json({
            status: 'success',
            message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }))
}

const getTeamByCode = async (request, response) => {
    await getTeamByCodeDB(parseInt(request.params.id))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }))
}

module.exports = {
    getTeams, addTeam, updateTeam,
    deleteTeam, getTeamByCode
}
