import { useContext, useState } from 'react';
import './profileUpdatePage.scss';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import UploadWidget from '../../components/uploadWidget/UploadWidget';

function ProfileUpdatePage() {
	const { currentUser, updateUser } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const [avatar, setAvatar] = useState([]);

	const [error, setError] = useState('');

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		const formData = new FormData(e.target);

		const { username, email, password } = Object.fromEntries(formData);

		try {
			const res = await apiRequest.put(`/users/${currentUser.id}`, {
				username,
				email,
				password,
				avatar: avatar[0],
			});

			updateUser(res.data);
			// console.log(res.data);
			navigate('/profile');
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setError(error.response.data.message);
		}
	};

	return (
		<div className='profileUpdatePage'>
			<div className='formContainer'>
				<form onSubmit={handleSubmit}>
					<h1>Update Profile</h1>
					<div className='item'>
						<label htmlFor='username'>Username</label>
						<input
							id='username'
							name='username'
							type='text'
							defaultValue={currentUser.username}
						/>
					</div>
					<div className='item'>
						<label htmlFor='email'>Email</label>
						<input
							id='email'
							name='email'
							type='email'
							defaultValue={currentUser.email}
						/>
					</div>
					<div className='item'>
						<label htmlFor='password'>Password</label>
						<input id='password' name='password' type='password' />
					</div>
					<button disabled={isLoading}>Update</button>
					{error && <span>error</span>}
				</form>
			</div>
			<div className='sideContainer'>
				<img
					src={avatar[0] || currentUser.avatar || '/noavatar.jpg'}
					alt=''
					className='avatar'
				/>
				<UploadWidget
					uwConfig={{
						cloudName: 'di5shcgd6',
						uploadPreset: 'estate',
						multiple: false,
						maxImageFileSize: 2000000,
						folder: 'avatars',
					}}
					setState={setAvatar}
				/>
			</div>
		</div>
	);
}

export default ProfileUpdatePage;
