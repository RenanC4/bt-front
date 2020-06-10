import './Team.css'
import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'

export default function Team({match, history }) {

	const [teams, setTeams] = useState({})

useEffect(()=>{
	console.log(history.location.state[0])
	setTeams([{id:1, name:'batata'}, {id:1, name:'batata'}, {id:1, name:'batata'}])
},[])
	function openTeam(_id) {
		history.push(`/team/${_id}`)
	}
	return (
		<div className='main-container'>
		<div className='my-profile'>
			<div className='profile-card'>
				<span>Meus Times</span>
			</div>
			<div className='teams-card'>
				<div className="user-teams">
					{teams.length > 0 ? (<ul>
						{teams.map(team => (
							<li key={team.teamId} onClick={() => openTeam(team.teamId)}>
								<span>{team.name}</span>
							</li>))}
					</ul>) : (<> </>)}

					<button className="new-team" onClick={() => openTeam('NewTeam')}>+ Novo Time</button>
				</div>
			</div>
		</div>
		<div className='team'>
			<div className="title-name">
				<span>Nome do time</span>
			</div>

			<div className="main-class">
				<div className="teams-buttons">
					<span>buttons</span>
				</div>
				<div className="editTeam">
					editando
				</div>
			</div>
		</div>

	</div>
	)
}

