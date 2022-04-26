import { useHttp } from "./http.hook"

const UseService = () => {
    const {loading, request, error, clearError} = useHttp();

    const url = 'https://jsonplaceholder.typicode.com/users'


    const _getShortInfo = user => {
        return {
            name: user.name,
            city: user.address.city,
            company: user.company.name
        }
    }

    const getAllUsers = async () => {
        const res = await request(url);
        return res.map(item => _getShortInfo(item))
    }

    return {loading, error, getAllUsers}
}



export default UseService