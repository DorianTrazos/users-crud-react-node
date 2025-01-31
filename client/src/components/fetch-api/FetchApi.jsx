import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FetchApi = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetchUsers(setUsers);
	}, []);

	return (
		<>
			<h1>FETCH</h1>
			{users.length === 0 && <h2>No hay usuarios</h2>}
			{users.map(user => (
				<div key={user.userId}>
					<h2>{user.name}</h2>
					<Link to={`/user/${user.userId}`}>
						<button>View user Info</button>
					</Link>
				</div>
			))}
		</>
	);
};

export default FetchApi;

const fetchUsers = async setUsers => {
	try {
		const response = await fetch('http://localhost:3000/api/users');
		const users = await response.json();
		setUsers(users);
	} catch (error) {
		console.log(error);
	}
};
