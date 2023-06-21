const { pool } = require("../config");
const Team = require("../entities/teams");

const getTeamsDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM teams ORDER BY id`);
        return rows.map(
            (team) =>
                new Team(
                    team.id,
                    team.teamname,
                    team.cresturl
                )
        );
    } catch (err) {
        throw "Error: " + err;
    }
};

const addTeamDB = async (body) => {
    try {
        const team = new Team(body);
        const results = await pool.query(
            `INSERT INTO teams
          (teamName, crestURL) 
          values ($1, $2) 
          RETURNING *`,
            [
                team.teamname,
                team.cresturl
            ]
        );
        return new Team(results.rows[0]);
    } catch (err) {
        throw "Error adding team: " + err;
    }
};

const updateTeamDB = async (body) => {
    try {
        const team = new Team(body);
        const results = await pool.query(
            `UPDATE teams SET 
                teamName=$1, 
                crestURL=$2
             WHERE id=$3
             RETURNING *`,
            [
                team.teamname,
                team.cresturl,
                team.id,
            ]
        );

        if (results.rowCount == 0) {
            throw `No record found with code ${team.id} to be updated`;
        }

        return new Team(results.rows[0]);
    } catch (err) {
        throw "Error updating team: " + err;
    }
};

const deleteTeamDB = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM teams WHERE id=$1`, [id]);

        if (results.rowCount == 0) {
            throw `No record found with id ${id} to be removed`;
        } else {
            return "Team successfully deleted";
        }
    } catch (err) {
        throw "Error deleting team: " + err;
    }
};

const getTeamByCodeDB = async (id) => {
    try {
        const results = await pool.query(`SELECT * FROM teams WHERE id=$1`, [id]); // Update the SQL query to select all fields
        if (results.rowCount == 0) {
            throw `No record found with id ${id}`;
        } else {
            const team = results.rows[0];
            return new Team(
                team.id,
                team.teamname,
                team.cresturl,
            ); // Return a new Team object with all the fields
        }
    } catch (err) {
        throw "Error finding team: " + err;
    }
};

module.exports = {
    getTeamsDB,
    addTeamDB,
    updateTeamDB,
    deleteTeamDB,
    getTeamByCodeDB,
}