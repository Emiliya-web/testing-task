import { useState } from 'react'
import './userProfile.scss'

const useInput = (initialValue) => {
	const [value, setValue] = useState(initialValue);

	const onChange = (e) => {
		setValue(e.target.value)
	}

	return {value, onChange}
}

const UserProfile = (props) => {
	const [readOnlyToggle, setReadOnlyToggle] = useState(true);
	const input = useInput();

	const editProfile = () => setReadOnlyToggle(false);

	const {name, username, email, phone, website} = props.user;
	const {street, city, zipcode} = props.user.address;

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
            <form className="user-profile__form" action="#">
                <label htmlFor="input_name">Name</label>
                <input id="input_name" 
                       type="text"
                       name="name" 
					   readOnly = {readOnlyToggle ? true : false}
					   disabled = {readOnlyToggle ? true : false}
					//    onChange={input.onChange()}
					   defaultValue={name}/>
                <label htmlFor="input_user_name">User Name</label>
                <input id="input_user_name"
                       type="text"
                       name="user_name"
					   readOnly={readOnlyToggle ? true : false}
					   disabled = {readOnlyToggle ? true : false}
					   defaultValue={username}/>
                <label htmlFor="input_user_email">Email</label>
                <input id="input_user_email"
                       type="email"
                       name="email"
					   readOnly={readOnlyToggle ? true : false}
					   disabled = {readOnlyToggle ? true : false}
					   defaultValue={email}/>
                <label htmlFor="input_user_street">Street</label>
                <input id="input_user_street"
                       type="text"
                       name="street"
					   readOnly={readOnlyToggle ? true : false}
					   disabled = {readOnlyToggle ? true : false}
					   defaultValue={street}/>
                <label htmlFor="input_user_city">City</label>
                <input id="input_user_city"
                       type="text"
                       name="city"
					   readOnly={readOnlyToggle ? true : false}
					   disabled = {readOnlyToggle ? true : false}
					   defaultValue={city}/>
                <label htmlFor="input_user_zip">Zip Code</label>
                <input id="input_user_zip"
                       type="text"
                       name="zip"
					   readOnly={readOnlyToggle ? true : false}
					   disabled = {readOnlyToggle ? true : false}
					   defaultValue={zipcode}/>
                <label htmlFor="input_user_tel">Phone</label>
                <input id="input_user_tel"
                       type="tel"
                       name="tel"
					   readOnly={readOnlyToggle ? true : false}
					   disabled = {readOnlyToggle ? true : false}
					   defaultValue={phone}/>
                <label htmlFor="input_user_web">Website</label>
                <input id="input_user_web"
                       type="url"
                       name="web"
					   readOnly={readOnlyToggle ? true : false}
					   disabled = {readOnlyToggle ? true : false}
					   defaultValue={website}/>
                <label htmlFor="input_user_comment">Comment</label>
                <textarea id="input_user_comment"
                       type="text"
                       resize="none"
                       name="comment"
					   readOnly={readOnlyToggle ? true : false}
					   disabled = {readOnlyToggle ? true : false}/>
            </form>
            <button className='user-profile__btn_submit' type='submit'>Отправить</button>
        </div>
    )
}

export default UserProfile