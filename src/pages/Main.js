import React, { useEffect, useState } from 'react'
import './Main.css'
import api from '../services/api';
import { GiHeavyHelm } from 'react-icons/gi';
import { FaUserCheck, FaTrash } from 'react-icons/fa'
import { MdGroup} from 'react-icons/md'


export default function Main({ match, history }) {
	const [myUser, setMyUser] = useState({})
	const [usersOffset, setUsersOffset] = useState(0)
	const [users, setUsers] = useState({})
	const [teams, setTeams] = useState({})
	const [friends, setFriends] = useState([])
	const [friendsRequest, setFriendsRequest] = useState([])
	const [myElo, setMyElo] = useState()
	const [bioStatus, setBioStatus] = useState('DEFAULT')
	const [tagsStatus, setTagsStatus] = useState('DEFAULT')
	const [tags, setTags] = useState()
	const [bio, setBio] = useState()
	const [search, setSearch] = useState()
	async function userInfo() {
		const response = await api.get('/users/user', {
			headers: {
				authorization: match.params.id,
			}
		})
		const images = require.context('../assets/Elos', true);
		response.data.rank.length === 0 ?
			setMyElo(images('./unranked.png')) :
			setMyElo(images('./' + response.data.rank[0].tier + '.png'))
		setMyUser(response.data)
		console.log(response.data)
		setTags(response.data.tags)
		setBio(response.data.bio)
		setTeams(response.data.teams)
		const friendsReq = response.data.friends
		let friendsList = []
		let solicitationsList = []
		await	friendsReq.forEach(friendR=>{
			if(friendR.status === 'pendente' || friendR.status === 'enviado') {
				solicitationsList.push(friendR);
			} else {
				friendsList.push(friendR);
			}
		})
		setFriends(friendsList)
		setFriendsRequest(solicitationsList)

	}
	useEffect(() => {
		 userInfo()
	}, [match.params.id])


	useEffect(() => {
		(async function(){
			const params = {offset: usersOffset}
			const foundUsers = await api.get('users/', { params })
			//setUsersOffset(foundUsers.data.offset)
			foundUsers.data.users.map((foundUser, index)=>{
				if(foundUser._id === myUser._id){
					foundUsers.data.users.splice(index, 1)
				}
			})
			setUsers(foundUsers.data.users)
		}())

	}, [myUser])

	async function handleSubmit(event) {
		event.preventDefault()
		setBioStatus('DEFAULT')
		setTagsStatus('DEFAULT')
		await api.put('/users', {
			data: { _id: match.params.id, tags, bio }
		})
	}

	async function acceptSolicitation(friendId) {
		api.post('/users/acceptFriendship', {
			_id: myUser._id,
			friendId
		}).then(()=> {
			setSearch('')
			userInfo()
		})
	}
	async function removeSolicitation(friendId) {
		api.delete('/users/deleteFriend', {
			data:{
			_id: myUser._id,
			friendId
			}
		}).then(()=> userInfo())

	}
	async function handleSearch(event) {
		const params = { tags: search }
		event.preventDefault()
		if(!params.tags){
			userInfo()
			return
		}

		const response = await api.get('users/find', { params })
		setUsers(response.data)
	}
	async function sendSolicitation(friendName, friendId) {
		api.post('/users/addFriend', {
			name: myUser.name,
			friendId,
			friendName,
			_id: myUser._id
		}).then(()=> userInfo())
	}
	function openTeam(_id) {
		history.push(`/team/${_id}`)
	}
	function openChat(friendName, friendId) {
		history.push(`/chat/${myUser._id}/${friendId}`,
		[friendName, myUser.name]
		)
	}

	return (
		<>
			{myUser.status === 'online' ?
				(<div className='main-container'>
					<div className='my-profile'>
						<div className='profile-card'>
							<div className='user-name'>
								<span>{myUser.name}</span>
							</div>
							<div>
								<img src={myElo} alt="ELO" />
							</div>

							<div className='status'>
								<span className="dot"></span>
								<strong>{myUser.status}</strong>
							</div>
							<div className='user-tags'>
								{tagsStatus === 'EDITING' ? (
									<form onSubmit={handleSubmit}>
										<textarea
											placeholder="Digite suas tags ate 25 caracteres"
											value={tags}
											maxlength="25"
											onChange={event => setTags(event.target.value)}
										/><div className='salvarButton'>
											<button type="submit">Salvar</button>
										</div>
									</form>
								) : (
										<span onClick={() => { setTagsStatus('EDITING') }}>{tags}</span>
									)
								}
							</div>
							<div className='user-bio'>
								{bioStatus === 'EDITING' ? (
									<form onSubmit={handleSubmit}>
										<textarea
											placeholder="Digite sua bio ate 135 caracteres"
											value={bio}
											maxlength='135'
											onChange={event => setBio(event.target.value)}
										/>
										<div className='salvarButton'>
											<button type="submit">Salvar</button>
										</div>
									</form>
								) : (
										<span onClick={() => setBioStatus('EDITING')}>Bio: {bio}</span>
									)
								}
							</div>

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
					<div className='search'>
						<div className='search-form'>
							<form onSubmit={handleSearch}>
								<input
									type="input"
									placeholder="Buscar por tags.. #FORFUN #Ranked #Challenger"
									onChange={event => setSearch(event.target.value)}
								/>
							</form>
						</div>
						<div className="user-container">
							{users.length > 0 ? (
								<ul>
									{users.map(user => (
										<li key={user._id}>
											<footer>
												<strong>{user.name}</strong>
												<span className='status'>
													<span className="dot"></span>
												</span><strong>{user.friends.length > 0 &&
													<span>{user.friends.forEach(userFriend => {
														if(userFriend._id === myUser._id.toString()){
														user.friendStatus = userFriend.status
													}
												})}</span>}
												<br />
												<span>{user.friendStatus}</span>
												</strong>
												<br/><br/>
												<span>{user.tags}</span>
												<p>{user.bio}</p>
											</footer>

											<div className="buttons">
												<button type="button" onClick={()=>{sendSolicitation(user.name, user._id)}}>
													<span>ADICIONAR AOS AMIGOS</span>
												</button>
											</div>
										</li>
									))}
								</ul>
							) : (<></>)}</div>
					</div>
					<div className="my-friends">
						<div className="friend-request">
							<div className="solicitations-title">
								<GiHeavyHelm className="solicitations-icon" />
								<strong>Solicitações</strong>
							</div>
							<div className="to-accept">
								{friendsRequest.length > 0 ? (
									<div>
								<ul>
									{friendsRequest.map(friend => (
										friend.status === 'pendente' &&
										<li key={friend._id}>
											<div className="friend-request-card">
												<FaUserCheck className="friend-request-accept" onClick={() => { acceptSolicitation(friend._id) }} />
												<FaTrash className="friend-request-deny" onClick={() => { removeSolicitation(friend._id) }} />
												<span>{friend.username}</span>
											</div>
										</li>
									))}
								</ul>
								<ul>
								{friendsRequest.map(friend => (
								friend.status === 'enviado' &&
									<li key={friend._id}>
										<div className="friend-request-card">
										<FaTrash className="friend-request-deny" onClick={() => { removeSolicitation(friend._id) }} />
											<span>{friend.username}</span>
										</div>
									</li>
								))}
							</ul></div>
								) : (<>Ninguém aqui aqui ainda :/</>)}
							</div>
						</div>
						<div className="friend-list">
							<div className="friends-title">
								<MdGroup className="friends-icon" />
								<strong>Meus Amigos</strong>
							</div>
							<div className="friends">
								{friends.length > 0 ? (<ul>
									{friends.map(friend => (
										<li key={friend._id}>
											<div className="friend-card">
											<FaTrash className="friend-request-deny" onClick={() => { removeSolicitation(friend._id) }} />
												<span className="dot"></span>
												<span onClick={()=>{openChat(friend.username, friend._id)}}>{friend.username}</span>
											</div>
										</li>
									))}
								</ul>) : (<>Começe a adicionar amigos,<br/> vai ser legal. :B</>)}
							</div>
						</div>
					</div>
				</div>) :
				(<div className="empty">F5 para continuar</div>)
			}
		</>
	)
}
