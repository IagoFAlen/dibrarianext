const { pool } = require("../config");
const Player = require("../entities/players");

const getPlayersDB = async () => {
  try {
    const { rows } = await pool.query(`SELECT * FROM players ORDER BY id`);
    return rows.map(
      (player) =>
        new Player(
          player.id,
          player.username,
          player.gender,
          player.team
        )
    );
  } catch (err) {
    throw "Error: " + err;
  }
};

const addPlayerDB = async (body) => {
  try {
    const {
      username,
      gender,
      team
    } = body;
    const results = await pool.query(
      `INSERT INTO players 
          (username, gender, team) 
          values ($1, $2, $3) 
          RETURNING id, username, gender, team`,
      [
        username,
        gender,
        team,
      ]
    );
    const player = results.rows[0];
    return new Player(
      player.id,
      player.username,
      player.gender,
      player.team
    );
  } catch (err) {
    throw "Error adding player: " + err;
  }
};

const updatePlayerDB = async (body) => {
  try {
    const {
      id,
      username,
      gender,
      team
    } = body;

    const results = await pool.query(
      `UPDATE players SET 
            username=$1, gender=$2, team=$3
            WHERE id=$4
            RETURNING id, username, gender, team`,
      [
        username,
        gender,
        team,
        id,
      ]
    );

    if (results.rowCount == 0) {
      throw `No record found with code ${id} to be updated`;
    }

    const player = results.rows[0];
    return new Player(
      player.id,
      player.username,
      player.gender,
      player.team,
    );
  } catch (err) {
    throw "Error updating player: " + err;
  }
};

const deletePlayerDB = async (id) => {
  try {
    const results = await pool.query(
      `DELETE FROM players WHERE id=$1 RETURNING id`,
      [id]
    );

    if (results.rowCount == 0) {
      throw `No record found with code ${id} to be deleted`;
    }

    return results.rows[0].id;
  } catch (err) {
    throw "Error deleting player: " + err;
  }
};

const getPlayerByCodeDB = async (id) => {
  try {
    const results = await pool.query(`SELECT * FROM players WHERE id=$1`, [id]);
    if (results.rowCount == 0) {
      throw `No record found with id ${id}`;
    } else {
      const player = results.rows[0];
      return new Player(
        player.id,
        player.username,
        player.gender,
        player.team,
      );
    }
  } catch (err) {
    throw "Error finding player: " + err;
  }
};

const getTeamPlayersByCodeDB = async (teamId) => {
  try {
    const results = await pool.query(`SELECT * FROM players WHERE team=$1`, [teamId]);
    if (results.rowCount == 0) {
      throw `No players found with team id ${teamId}`;
    }
    const playerData = results.rows.map(player => new Player(
        player.id,
        player.username,
        player.gender,
        player.team,
    ));
    return playerData;
  } catch (err) {
    throw "Error: " + err;
  }
};


module.exports = {
  getPlayersDB,
  addPlayerDB,
  updatePlayerDB,
  deletePlayerDB,
  getPlayerByCodeDB,
  getTeamPlayersByCodeDB
}