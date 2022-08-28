const insert_query = "INSERT INTO users(name, username) VALUES ($1, $2)";

async function getAllUsers(client) {
    return await client.query('SELECT * FROM users')
}

async function insertMultipleRows(client, rows) {
    try {
        await client.query('BEGIN')
        // await client.query(insert_query, rows)

        for await (const row of rows) {
            await client.query(insert_query, [row.name, row.username])
        }
        await client.query('COMMIT')
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    }
}

module.exports = {
    getAllUsers,
    insertMultipleRows
}