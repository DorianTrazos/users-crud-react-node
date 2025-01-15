import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const User = () => {
	const [user, setUser] = useState('');
	const [isEditingUser, setIsEditingUser] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		getUserById(id, setUser);
	}, [id]);
	return (
		<>
			<h1>User</h1>
			{!user && <h2>User not found</h2>}
			{user && (
				<>
					<div>
						{!isEditingUser && <h2>{user.name}</h2>}
						{isEditingUser && (
							<input
								type='text'
								defaultValue={user.name}
								onInput={event =>
									setUser({ ...user, name: event.target.value })
								}
							/>
						)}
						{!isEditingUser && <h2>{user.email}</h2>}
						{isEditingUser && (
							<input
								type='text'
								defaultValue={user.email}
								onInput={event =>
									setUser({ ...user, email: event.target.value })
								}
							/>
						)}
						{!isEditingUser && (
							<button onClick={() => setIsEditingUser(true)}>Edit User</button>
						)}
						{isEditingUser && (
							<button
								onClick={() => updateUserById(id, user, setIsEditingUser)}
							>
								Save User
							</button>
						)}
					</div>
					<Link to='/'>
						<button>Back to all users</button>
					</Link>
				</>
			)}
		</>
	);
};

const getUserById = async (id, setUser) => {
	try {
		const response = await fetch(
			`https://users-crud-react-node.onrender.com/api/users/${id}`
		);
		const user = await response.json();
		setUser(user);
	} catch (error) {
		console.log(error.error);
	}
};

const updateUserById = async (id, user, setIsEditingUser) => {
	try {
		const response = await fetch(
			`https://users-crud-react-node.onrender.com/api/users/${id}`,
			{
				method: 'PATCH',
				body: JSON.stringify(user),
				headers: { 'Content-Type': 'application/json' }
			}
		);
		await response.json();
		setIsEditingUser(false);
	} catch (error) {
		console.log(error.error);
	}
};

export default User;
