import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/spinner';
import UseService from '../../service/useService';
import './users-list.scss';

const UsersList = ({filter, onUpdateUserId}) => {

    const [data, setData] = useState([]);

    const {loading, error, getAllUsers} = UseService();

    useEffect (() => {
        getAllUsers().then(onUsersListLoaded)
    }, []);

    const onUsersListLoaded = (arr) => {
        const sortArr = arr.sort(sortItems);
        setData(sortArr);
    }

    const sortItems = (prev, next) => {
        if(filter == 'city') {
            if(prev.city < next.city) {return -1}
            if(prev.city > next.city) {return 1}
            return 0
        }
        if(filter == 'company') {
            if(prev.company < next.company) {return -1}
            if(prev.company > next.company) {return 1}
            return 0
        }
    }

    useEffect(() => {
        const result = [...data].sort(sortItems)
        setData(result)
    }, [filter])


    const renderList = (arr) => {
        const users = arr.map(item => {
            return (
                <li className='users-list-item' key={item.id} >
                    <p className='users-list-item__name'>
                        <span>ФИО:</span>{item.name}
                    </p>
                    <p className='users-list-item__city'>
                        <span>Город:</span>{item.city}
                    </p>
                    <p className='users-list-item__company'>
                        <span>Компания:</span>{item.company}
                    </p>
                    <Link to="/user-profile"
                          className='users-list-item__link'
                          onClick={() => onUpdateUserId(item.id)}>
                              Подробнее
                    </Link>
                </li>
            )
        })

        return users
    }

    const items = renderList(data)
    const content = !loading ? items : null
    const spinner = loading ? <Spinner/> : null

    return (
        <div className='users'>
            <h3 className='users-list-title title_h3'>Список пользователей</h3>
            <ul className='users-list'>
                {spinner}
                {content}
            </ul>
            <p className='users-list__count'>Найдено {data.length} пользователей</p>
        </div>

    )
}

export default UsersList