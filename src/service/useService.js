import { useEffect } from "react";
import { useHttp } from "./http.hook"

const UseService = () => {
    const {loading, request, error, clearError} = useHttp();

    const url = 'https://jsonplaceholder.typicode.com/users'


    const _getFullInfo = user => {
        return {
            id: user.id,
            name: user.name,
            city: user.address.city,
            company: user.company.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            website: user.website,
            street: user.address.street,
            zipcode: user.address.zipcode
        }
    }

    const getAllUsers = async () => {
        const res = await request(url);
        return res.map(item => _getFullInfo(item))
    }

    const getUser = async (index) => {
        const res = await request(url);
        const user = _getFullInfo(res[index])
        return user
    }

    useEffect(() => {
        console.log(getUser(0))
    },[])



    return {loading, error, getAllUsers, getUser}
}



export default UseService