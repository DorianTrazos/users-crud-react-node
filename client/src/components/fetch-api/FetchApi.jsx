import { useEffect, useState } from 'react';

const FetchApi = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetchDataNew(setUsers);
	}, []);

	console.log('RENDER');

	return (
		<>
			<h1>FETCH</h1>
			<input type='text' />
			{users.length === 0 && <h2>No hay usuarios</h2>}
			{users.map(user => (
				<h2 key={user.id}>{user.name}</h2>
			))}
		</>
	);
};

export default FetchApi;

const fetchDataNew = async setUsers => {
	try {
		const response = await fetch('http://localhost:3000/api/users');
		const users = await response.json();
		setUsers(users);
	} catch (error) {
		console.log(error);
	}
};

const fetchDataById = async (setUsers, id) => {
	try {
		const response = await fetch(`http://localhost:3000/api/users/${id}`);
		const users = await response.json();
		setUsers(users);
	} catch (error) {
		console.log(error);
	}
};
