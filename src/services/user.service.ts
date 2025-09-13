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

export { handleCreateUser, getAllUsers }