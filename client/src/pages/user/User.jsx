import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const User = () => {
	const [user, setUser] = useState('');
	const { id } = useParams();

	useEffect(() => {
		getUserById(id, setUser);
	}, [id]);
	return (
		<>
			<h1>User</h1>
			{!user && <h2>User not found</h2>}
			{user && (
				<div>
					<h2>{user.name}</h2>
					<h2>{user.email}</h2>
					<Link to='/'>
						<button>Back to all users</button>
					</Link>
				</div>
			)}
		</>
	);
};

const getUserById = async (id, setUser) => {
	try {
		const response = await fetch(`http://localhost:3000/api/users/${id}`);
		const user = await response.json();
		setUser(user);
	} catch (error) {
		console.log(error.error);
	}
};

export default User;
