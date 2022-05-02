import { useEffect, useState } from 'react'
import UseService from '../../service/useService';
import './userProfile.scss' 

const useInput = (initialValue) => {
	const [value, setValue] = useState(initialValue);

	const onChange = (e) => {
		setValue(e.target.value)
	}

	return {value, onChange}
}

const UserProfile = (props) => {
	const url = 'https://jsonplaceholder.typicode.com/users'

	const [readOnlyToggle, setReadOnlyToggle] = useState(true);
	const {loading, error} = UseService();
	const [data, setData] = useState({})

	let name = useInput(props.user.name);
	let username = useInput(props.user.username);
	let email = useInput(props.user.email);
	let phone = useInput(props.user.phone);
	let website = useInput(props.user.website);
	let street = useInput(props.user.street);
	let city = useInput(props.user.city);
	let zipcode = useInput(props.user.zipcode);
	let comment = useInput(props.user.comment);

	// (function logger(user) {
	// 	const json = JSON.stringify(user, null, 2)
	// 	console.log(json)
	// })(props)

	// const {...itemProps} = data

	// console.log(name.value)

	const editProfile = () => setReadOnlyToggle(false);

	const onSubmit = async (e) => {
		e.preventDefault();

		const data = new FormData(e.target)

		let response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(data)
		});
	}

	const onClick = (e) => {
		const data = new FormData(e.target)
		console.log(data)
	}

    return(
        <div className="user-profile">
            <div className="wrapper">
            <h3 className="user-profile__title title_h3">Профиль пользователя</h3>
            <button className="user-profile__btn btn"
					type="button"
					onClick={editProfile}>
						Редактировать
			</button>
            </div>
            <form id="form" className="user-profile__form" onSubmit={e => onSubmit(e)}>
                <label htmlFor="input_name">Name</label>
                <input id="input_name" 
                       type="text"
                       name="name" 
					   readOnly = {readOnlyToggle ? true : false}
					   disabled = {readOnlyToggle ? true : false}
					   onChange={e => name.onChange(e)}
					   value={name.value}/>
                <label htmlFor="input_user_name">User Name</label>
                <input id="input_user_name"
                       type="text"
                       name="user_name"
					   value={username.value}
					   readOnly={readOnlyToggle ? true : false}
					   disabled = {readOnlyToggle ? true : false}
					   onChange={e => username.onChange(e)}/>
                <label htmlFor="input_user_email">Email</label>
                <input id="input_user_email"
                       type="email"
                       name="email"
					   value={email.value}
					   readOnly={readOnlyToggle ? true : false}
					   disabled = {readOnlyToggle ? true : false}
					   onChange={e => email.onChange(e)}/>
                <label htmlFor="input_user_street">Street</label>
                <input id="input_user_street"
                       type="text"
                       name="street"
					   value={street.value}
					   readOnly={readOnlyToggle ? true : false}
					   disabled = {readOnlyToggle ? true : false}
					   onChange={e => street.onChange(e)}/>
                <label htmlFor="input_user_city">City</label>
                <input id="input_user_city"
                       type="text"
                       name="city"
					   value={city.value}
					   readOnly={readOnlyToggle ? true : false}
					   disabled = {readOnlyToggle ? true : false}
					   onChange={e => city.onChange(e)}/>
                <label htmlFor="input_user_zip">Zip Code</label>
                <input id="input_user_zip"
                       type="text"
                       name="zip"
					   value={zipcode.value}
					   readOnly={readOnlyToggle ? true : false}
					   disabled = {readOnlyToggle ? true : false}
					   onChange={e => zipcode.onChange(e)}/>
                <label htmlFor="input_user_tel">Phone</label>
                <input id="input_user_tel"
                       type="tel"
                       name="tel"
					   value={phone.value}
					   readOnly={readOnlyToggle ? true : false}
					   disabled = {readOnlyToggle ? true : false}
					   onChange={e => phone.onChange(e)}/>
                <label htmlFor="input_user_web">Website</label>
                <input id="input_user_web"
                       type="url"
                       name="web"
					   value={website.value}
					   readOnly={readOnlyToggle ? true : false}
					   disabled = {readOnlyToggle ? true : false}
					   onChange={e => website.onChange(e)}/>
                <label htmlFor="input_user_comment">Comment</label>
                <textarea id="input_user_comment"
                       type="text"
                       resize="none"
                       name="comment"
					   value={comment.value}
					   readOnly={readOnlyToggle ? true : false}
					   disabled = {readOnlyToggle ? true : false}
					   onChange={e => comment.onChange(e)}/>
				<button className='user-profile__btn_submit' type='submit'>Отправить</button>
            </form>
        </div>
    )
}

export default UserProfile