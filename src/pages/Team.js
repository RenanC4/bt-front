import './Team.css'
import React, { useEffect, useState } from 'react'

export default function Team({ match, history }) {
	const [teams, setTeams] = useState({})
	const [teamNameStatus, setTeamNameStatus] = useState('DEFAULT')
	const [teamName, setTeamName] = useState('TIME 01')

	const [topStatus, setTopStatus] = useState('DEFAULT')
	const [topName, setTopName] = useState('TOP')

	const [jgStatus, setJGStatus] = useState('DEFAULT')
	const [jgName, setJGName] = useState('Jungler')

	const [midStatus, setMidStatus] = useState('DEFAULT')
	const [midName, setMidName] = useState('MID')

	const [supStatus, setSupStatus] = useState('DEFAULT')
	const [supName, setSupName] = useState('SUP')

	const [adcStatus, setADCStatus] = useState('DEFAULT')
	const [adcName, setADCName] = useState('ADC')
	const [roles, setRoles] = useState()


	useEffect(() => {
		//console.log(history.location.state[0])
		setTeams([{ id: 1, name: 'batata' }, { id: 1, name: 'batata' }, { id: 1, name: 'batata' }])
		const images = require.context('../assets', true);
		setRoles(images('./Roles.png'))
	}, [])
	function openTeam(_id) {
		history.push(`/team/${_id}`)
	}

	async function handleSubmit(event) {
		event.preventDefault()
		setTeamNameStatus('DEFAULT')
		setTopStatus('DEFAULT')
		setJGStatus('DEFAULT')
		setMidStatus('DEFAULT')
		setSupStatus('DEFAULT')
		setADCStatus('DEFAULT')
	}



	return (
		<div className='main-container'>
			<div className='my-profile'>
				<div className='title-card'>
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
					{teamNameStatus === 'EDITING' ? (
						<form onSubmit={handleSubmit}>
							<textarea
								placeholder="Digie o nome do time"
								maxlength='135'
								onChange={event => setTeamName(event.target.value)}
							/>
							<div className='salvarButton'>
								<button type="submit">Salvar</button>
							</div>
						</form>
					) : (
							<span onClick={() => setTeamNameStatus('EDITING')}>{teamName}</span>
						)
					}
				</div>

				<div className="main-class">
					<div className="teams-buttons">
						<div className="role">
							{topStatus === 'EDITING' ? (
								<form onSubmit={handleSubmit}>
									<textarea
										placeholder="TOP"
										maxlength='135'
										onChange={event => setTopName(event.target.value)}
									/>
									<div className='salvarButton'>
										<button type="submit">Salvar</button>
									</div>
								</form>
							) : (
									<span onClick={() => setTopStatus('EDITING')}>{topName}</span>
								)
							}
						</div>
						<div className="role">
							{jgStatus === 'EDITING' ? (
								<form onSubmit={handleSubmit}>
									<textarea
										placeholder="JG"
										maxlength='135'
										onChange={event => setJGName(event.target.value)}
									/>
									<div className='salvarButton'>
										<button type="submit">Salvar</button>
									</div>
								</form>
							) : (
									<span onClick={() => setJGStatus('EDITING')}>{jgName}</span>
								)
							}
						</div>
						<div className="role">
							{midStatus === 'EDITING' ? (
								<form onSubmit={handleSubmit}>
									<textarea
										placeholder="MID"
										maxlength='135'
										onChange={event => setMidName(event.target.value)}
									/>
									<div className='salvarButton'>
										<button type="submit">Salvar</button>
									</div>
								</form>
							) : (
									<span onClick={() => setMidStatus('EDITING')}>{midName}</span>
								)
							}
						</div>
						<div className="role">
							{supStatus === 'EDITING' ? (
								<form onSubmit={handleSubmit}>
									<textarea
										placeholder="SUP"
										maxlength='135'
										onChange={event => setSupName(event.target.value)}
									/>
									<div className='salvarButton'>
										<button type="submit">Salvar</button>
									</div>
								</form>
							) : (
									<span onClick={() => setSupStatus('EDITING')}>{supName}</span>
								)
							}
						</div>
						<div className="role">
							{adcStatus === 'EDITING' ? (
								<form onSubmit={handleSubmit}>
									<textarea
										placeholder="ADC"
										maxlength='135'
										onChange={event => setADCName(event.target.value)}
									/>
									<div className='salvarButton'>
										<button type="submit">Salvar</button>
									</div>
								</form>
							) : (
									<span onClick={() => setADCStatus('EDITING')}>{adcName}</span>
								)
							}
						</div>
					</div>
					<div className="editTeam">

					<img src={roles} alt="MAP" className="image" />
					<button className="save-team" onClick={() => openTeam('NewTeam')}>Salvar Time</button>
				</div>
				</div>
			</div>

		</div>
	)
}

