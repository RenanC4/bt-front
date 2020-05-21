import React, { useState } from 'react'
import './Login.css'

import logo from '../assets/logo.png'
import firebase from '../firebase'

export default function Login({ history }) {
	const [message, setMessage] = useState('')

	async function handleSubmit(event) {
		event.preventDefault()
		return firebase.firestore().collection('messages').add({
			name: 'Renan',
			text: message,
			//profilePicUrl: getProfilePicUrl(),
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		}).catch(function (error) {
			console.error('Error writing new message to database', error);
		});

		/*const response = await api.post('/users', {
			name
		})
		const { _id } = response.data
		history.push(`/user/${_id}`)*/
	}

	return (
		<div className="login-container">
			<form onSubmit={handleSubmit}>
				<img src={logo} alt="Busca Time Logo" />
				Chat porra

			</form>
		</div>
	)
}

