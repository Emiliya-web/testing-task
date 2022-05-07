import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './formUser.scss';


const FormUser = ({...defaultValues}) => {
    const url = 'https://jsonplaceholder.typicode.com/users';

    const [readOnlyToggle, setReadOnlyToggle] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user === null) {
            localStorage.setItem('user', JSON.stringify(defaultValues))
        }
        if(defaultValues.user !== undefined) {
            if(JSON.parse(localStorage.getItem('user')).user.id !== defaultValues.user.id) {
                localStorage.setItem('user', JSON.stringify(defaultValues))
            }
        }
    }, [])

    const transInfo = () => {
        if(defaultValues.user !== undefined) {
            let {...userInfo} = defaultValues.user;
            return userInfo
        } else {
            const user = JSON.parse(localStorage.getItem('user'))
            let {...userInfo} = user.user;
            return userInfo
        }
    }

    const userInfo = transInfo();

    const setAttr = bool => {
        if(bool) {
            return {
                disabled: true,
                readOnly: true
            }
        } else {
            return {
                disabled: false,
                readOnly: false
            }
        }
    }

    const {...attr} = setAttr(readOnlyToggle);

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitSuccessful},
        reset
    } = useForm({defaultValues: userInfo, mode: 'onChange'});

    const onSubmit = (data) => {
        fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({...data})
		})
        .then(res => res.json())
        .then(json => console.log(JSON.stringify(json, null, 2)))
    }

    useEffect(() => {
       if (isSubmitSuccessful) {
           reset({name: '', username: '', email: '', phone: '', website: '', street: '', city: '', zipcode: '', comment: ''})
       }
    }, [isSubmitSuccessful, reset] )

    const editProfile = () => setReadOnlyToggle(false);

    return(
        <div className="user-profile">
            <div className="user-profile__wrapper">
            <h3 className="title user-profile__title">Профиль пользователя</h3>
            <button className="btn user-profile__btn"
					type="button"
					onClick={editProfile}>
						Редактировать
			</button>
            </div>
            <form id="form" className="user-profile__form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="input_name">Name</label>
                <input {...register("name",
                        {
                            required: "Name is required"
                        })}
                        id="input_name" 
                        type="text"
                        {...attr}
                        style = {errors.name?.type === 'required' ? {outline: '1px solid red'} : null}/>
                {errors?.name && <div className='error'>{errors.name.message}</div>}
                <label htmlFor="input_username">User Name</label>
                <input  {...register("username",
                        {
                            required: "Username is required"
                        })}
                        id="input_username"
                        type="text"
                        {...attr}
                        style = {errors.username?.type === 'required' ? {outline: '1px solid red'} : null}/>
                {errors?.username && <div className='error'>{errors.username.message}</div>}
                <label htmlFor="input_user_email">Email</label>
                <input {...register("email",
                        {
                            required: "Email is required",
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please enter valid mail'
                            } 
                        })}
                        id="input_user_email"
                        type="email"
                        style = {errors.username?.type === 'required' ? {outline: '1px solid red'} : null}
                        {...attr}/>
                {errors?.email && <div className='error'>{errors.email.message}</div>}
                <label htmlFor="input_user_street">Street</label>
                <input {...register("street",
                        {
                            required: "Street is required"
                        })}
                        id="input_user_street"
                        type="text"
                        style = {errors.username?.type === 'required' ? {outline: '1px solid red'} : null}
                        {...attr}/>
                {errors?.street && <div className='error'>{errors.street.message}</div>}
                <label htmlFor="input_user_city">City</label>
                <input {...register("city",
                        {
                            required: "City is required"
                        })}
                        id="input_user_city"
                        type="text"
                        style = {errors.username?.type === 'required' ? {outline: '1px solid red'} : null}
                        {...attr}/>
                {errors?.city && <div className='error'>{errors.city.message}</div>}
                <label htmlFor="input_user_zip">Zip Code</label>
                <input  {...register("zipcode",
                        {
                            required: "Zipcode is required"
                        })}
                        id="input_user_zip"
                        type="text"
                        style = {errors.username?.type === 'required' ? {outline: '1px solid red'} : null}
                        {...attr}/>
                {errors?.zipcode && <div className='error'>{errors.zipcode.message}</div>}
                <label htmlFor="input_user_tel">Phone</label>
                <input {...register("phone",
                        {
                            required: "Phone number is required"
                        })}
                        id="input_user_tel"
                        type="tel"
                        style = {errors.username?.type === 'required' ? {outline: '1px solid red'} : null}
                        {...attr}/>
                {errors?.phone && <div className='error'>{errors.phone.message}</div>}
                <label htmlFor="input_user_web">Website</label>
                <input  {...register("website",
                        {
                            required: "Website is required"
                        })}
                        id="input_user_web"
                        type="text"
                        style = {errors.username?.type === 'required' ? {outline: '1px solid red'} : null}
                        {...attr}/>
                {errors?.website && <div className='error'>{errors.website.message}</div>}
                <label htmlFor="input_user_comment">Comment</label>
                <textarea {...register("comment")}
                        id="input_user_comment"
                        type="text"
                        resize="none"
                        style = {errors.username?.type === 'required' ? {outline: '1px solid red'} : null}
                        {...attr}/>
                <div className='user-profile__btns'>
                    <button className='btn btn_submit' 
                            disabled={readOnlyToggle ? true : false}
                            style={readOnlyToggle ? {background: '#AFAFAF'} : null}>Отправить</button>
                    <Link to="/" className='btn btn_back'>На главную</Link>
                </div>
            </form>
        </div>
    )
}

FormUser.propTypes = {
    user: propTypes.shape({
        name: propTypes.string,
        username: propTypes.string,
        email: propTypes.string,
        phone: propTypes.oneOfType([
            propTypes.number,
            propTypes.string
        ]),
        website: propTypes.string,
        street: propTypes.string,
        city: propTypes.string,
        zipcode:propTypes.oneOfType([
            propTypes.number,
            propTypes.string
        ]),
        comment: propTypes.oneOfType([
            propTypes.number,
            propTypes.string
        ])
    }),

}

export default FormUser