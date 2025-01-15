import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	const [users, setUsers] = useState([]);
	console.log(users);

	useEffect(() => {
		fetchUsers(setUsers);
	}, []);

	return (
		<>
			<h1>ALL USERS</h1>
			{users.length === 0 && <h2>No hay usuarios</h2>}
			{users.map(user => (
				<div key={user.userId}>
					<h2>{user.name}</h2>
					<Link to={`/user/${user.userId}`}>
						<button>View user Info</button>
					</Link>
					<button onClick={() => deleteUserById(user.userId, setUsers)}>
						Delete User
					</button>
				</div>
			))}
		</>
	);
};

export default Home;

const fetchUsers = async setUsers => {
	try {
		const response = await fetch(
			'https://users-crud-react-node.onrender.com/api/users',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			}
		);
		const users = await response.json();
		setUsers(users);
	} catch (error) {
		console.log(error);
	}
};

const deleteUserById = async (id, setUsers) => {
	try {
		const response = await fetch(
			`https://users-crud-react-node.onrender.com/api/users/${id}`,
			{
				method: 'DELETE'
			}
		);
		const usersUpdated = await response.json();
		setUsers(usersUpdated);
	} catch (error) {
		console.log(error);
	}
};
