import React, { useState } from 'react'
import { CircularProgress, Button } from '@material-ui/core';

import './Login.css'

import api from '../services/api.js'

import logo from '../assets/logo.png'

export default function Login({ history }) {
	const [name, setName] = useState('')
	const [loading, setLoading] = useState(false)
	function ButtonComponent() {
		return (

			<Button
				variant="contained" type="submit"disabled={loading}
				style={{marginTop:'10px',
				border : 0,
				borderRadius : '4px',
				height:'48px',
				fontSize : '16px',
				background: '#69bcfb',
				fontWeight : 'bold',
				color : '#FFF',
				cursor : 'pointer',
				}}
				>
				{loading && <CircularProgress size={14} />}
			{!loading && 'Entrar'}
			</Button>
		);
	}
	async function handleSubmit(event) {
		setLoading(true)
		event.preventDefault()
		setName(name.toUpperCase())
		const response = await api.post('/users', {
			name : name.toUpperCase()
		})
		const { _id } = response.data
		setLoading(false)
		history.push(`/user/${_id}`)
	}

	return (
		<div className="login-container">
			<form onSubmit={handleSubmit}>
				<img src={logo} alt="Busca Time Logo" />
				<input
					placeholder="Digite seu usuário no Lolzinho"
					value={name}
					onChange={event => setName(event.target.value)}
				/>
				<ButtonComponent />

			</form>
		</div>
	)
}

