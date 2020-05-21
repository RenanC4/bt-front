import React, { useState, useEffect, Component } from 'react'
import api from '../services/api';
import firebase from '../firebase'
import './Main.css'

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
			chats: [],
			messageToSend: '',
			messageSend: false
		};
		console.log(props)
	}
	async sendMessage(){
		console.log('message')
		console.log(this.state.messageToSend)
		return firebase.firestore().collection('messages').add({
			name: this.props.location.state[1],
			text: this.state.messageToSend,
			//profilePicUrl: getProfilePicUrl(),
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		}).catch(function (error) {
			console.error('Error writing new message to database', error);
		});
	}

  async componentDidMount() {
    try {
      var query = firebase.firestore()
				.collection('messages')
				.orderBy('timestamp', 'desc')
				.limit(12);
				let chats = [];
				let that = this
				query.onSnapshot(function(snapshot) {
					snapshot.docChanges().forEach(function(change) {
						console.log('change', change)
						if (change.type === 'removed') {
							console.log('cuca beludo')
						} if(change.type === 'added'){

								var message = change.doc.data();
								console.log(message)
								const msg = {
										name: message.name,
										message :message.text,
									}
							chats.push(msg);
							that.setState({ chats });

						}else {console.log('chupacu')}
					});
				});
    } catch (error) {
      this.setState({ readError: error.message });
    }
	}


	render() {
		return ( <>
			{this.state.chats. length > 0 ? (<ul>
				{this.state.chats.map(chat => (

				<li >
				{chat.name === this.props.location.state[1] &&
						<div className='chat-sender-message'>
						<span>{chat.name}</span>
						<span>{chat.message}</span>
						</div>
				}
					{chat.name === this.props.location.state[0] &&
						<div className='chat-receiver-message'>
						<span>{chat.name}</span>
						<span>{chat.message}</span>
						</div>
				}
					</li>))
				}
			</ul>) : (<> </>)}

			<center>
	<div className='search-form'>
				<input
					type="input"
					placeholder=""
					onChange={event => {
						this.setState({messageToSend: event.target.value, messageSend: true},
						console.log(this.state)
					)}}
				/>
				<button onClick={()=> {this.sendMessage()}}>Enviar msg</button>

		</div>
	</center>
			</>
		);
	}
}
/*
async function handleSubmit(event) {
	console.log(event)
	event.preventDefault()
	return firebase.firestore().collection('messages').add({
		name: 'a',//history.location.state[1],
		text: 'a', //message,
		//profilePicUrl: getProfilePicUrl(),
		timestamp: firebase.firestore.FieldValue.serverTimestamp()
	}).catch(function (error) {
		console.error('Error writing new message to database', error);
	});
}

function ehNois(){console.log('peixinho na brasa')}

export default function Chat({ match, history }) {
	const [message, setMessage] = useState()
	ehNois()
function loadMessages() {
	var query = firebase.firestore()
									.collection('messages')
									.orderBy('timestamp', 'desc')
									.limit(12);
	query.onSnapshot(function(snapshot) {

		snapshot.docChanges().forEach(function(change) {
			if (change.type === 'removed') {
				console.log('removed')
			} else {
				var message = change.doc.data();
				displayMessage(change.doc.id, message.timestamp, message.name,
					message.text);
			}
		});
	});
}
	loadMessages()
	let messa, count
	useEffect(() => {

		displayMessage()
	})

	function DisplayMessage(){
		return(
			<span>{message}</span>
		)
	}

return (
	<>
	<center>
	<div className='search-form'>
			<form>
				<input
					type="input"
					placeholder=""
					//onChange={event => setMessage(event.target.value)}
				/>
				<button>Enviar msg</button>

				<DisplayMessage />
			</form>

		</div>
	</center>
	</>)
}



*/
