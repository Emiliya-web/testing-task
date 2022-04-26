import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/spinner';
import './users-list.scss';

const UsersList = ({filter, onUpdateUserId}) => {
    const url = 'https://jsonplaceholder.typicode.com/users';

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect (() => {
      const fetchData = async () => {
        let res = await fetch(url);
        let response = await res.json();

        const result = response.sort(sortItems)
        setLoading(false)
        setData(result)
      }
      fetchData();
    }, []);

    const sortItems = (prev, next) => {
        if(filter == 'city') {
            if(prev.address.city < next.address.city) {return -1}
            if(prev.address.city > next.address.city) {return 1}
            return 0
        }
        if(filter == 'company') {
            if(prev.company.name < next.company.name) {return -1}
            if(prev.company.name > next.company.name) {return 1}
            return 0
        }
    }

    const logger = (item) => {
        console.log(item.id)
    }

    useEffect(() => {
        const result = [...data].sort(sortItems)
        setData(result)
        console.log(result)
    }, [filter])


    const renderList = (arr) => {
        const users = arr.map(item => {
            return (
                <li className='users-list-item' key={item.id} >
                    <p className='users-list-item__name'>
                        <span>ФИО:</span>{item.name}
                    </p>
                    <p className='users-list-item__city'>
                        <span>Город:</span>{item.address.city}
                    </p>
                    <p className='users-list-item__company'>
                        <span>Компания:</span>{item.company.name}
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