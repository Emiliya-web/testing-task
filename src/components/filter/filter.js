import { useEffect, useState } from 'react';
import './filter.scss'

const Filter = (props) => {

    const [disable, setDisable] = useState(false)

    const onClick = (e) => {
        const attr = e.target.getAttribute('name');
        props.onUpdateFilter(attr)
    }

    useEffect(() => {
        const disableButton = () => {
            const initialUrl = document.location.href;

            if (initialUrl == 'http://localhost:3000/user-profile') {
                setDisable(true)
            } else {
                setDisable(false)
            }
        }
        disableButton();
    }, [])



    return (
        <aside className="filter-sidebar">
            <p className="filter-sidebar__name">Сортировка</p>
            <button className="filter-sidebar__btn btn"
                    name='city'
                    onClick={onClick}
                    disabled={disable}>
                        По городу
            </button>
            <button className="filter-sidebar__btn btn" 
                    name='company'
                    onClick={onClick}
                    disabled={disable}>
                        По компании
            </button>
        </aside>
    )
}

export default Filter