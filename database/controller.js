// Controller
import Users from '../model/user';

export async function getUsers(req, res) {
    try {
        const user = await Users.find({})

        if(!user) {
            return res.status(404).json({ error : "Data not found"})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ error : "Error while fetching data"})
    }
}