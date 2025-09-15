import getConnection from "../config/database"

const handleCreateUser = async (
    fullName: string,
    Email: string,
    Address: string) => {

    // insert into database
    const connection = await getConnection();
    try {

        const sql = 'INSERT INTO `users`(`name`, `email`,`address`) VALUES (?, ?, ?)';
        const values = [fullName, Email, Address];
        const [result, fields] = await connection.execute(sql, values);
        return result
    } catch (err) {
        console.log(err);
        return []
    } finally {
        await connection.end();
    }

    // return result


}
const getAllUsers = async () => {
    const connection = await getConnection();
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `users`'
        );

        return results
    } catch (err) {
        console.log(err);
        return []
    }

}

const handleDeleteUser = async (ID: string) => {
    try {
        const connection = await getConnection();
        const sql = "DELETE FROM users WHERE `ID` = ? ";
        const values = [ID];

        const [result, fields] = await connection.execute(sql, values);
        await connection.end();

        return result
    } catch (err) {
        console.log(err);
        return [];

    }

}

const getUserByID = async (ID: string) => {
    try {
        const connection = await getConnection();
        const sql = "SELECT * FROM users WHERE `ID` = ? ";
        const values = [ID];

        const [result, fields] = await connection.execute(sql, values);
        await connection.end();
        return result[0];
    } catch (err) {
        console.log(err);
        return [];

    }

}

const updateUserByID = async (
    ID: string, email: string, address: string, fullName: string
) => {
    try {
        const connection = await getConnection();
        const sql = "UPDATE `users` SET `name`= ?,`email`= ?,`address`= ? WHERE `ID` = ? ";
        const values = [fullName, email, address, ID];

        const [result, fields] = await connection.execute(sql, values);
        await connection.end();
        return result;
    } catch (err) {
        console.log(err);
        return [];

    }

}


export { handleCreateUser, getAllUsers, handleDeleteUser, getUserByID, updateUserByID }