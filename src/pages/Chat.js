import React, { useState, useEffect, Component } from 'react'
import api from '../services/api';
import firebase from '../firebase'
import './Chat.css'

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
	async sendMessage() {
		return firebase.firestore().collection('messages').add({
			name: this.props.location.state[1],
			text: this.state.messageToSend,
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
			query.onSnapshot(function (snapshot) {
				snapshot.docChanges().forEach(function (change) {
					if (change.type === 'removed') {
						console.log('cuca beludo')
					} if (change.type === 'added') {
						var message = change.doc.data();
						const msg = {
							name: message.name,
							message: message.text,
						}
						chats.push(msg);
						that.setState({ chats });
					} else { console.log('chupacu') }
				});
			});
		} catch (error) {
			this.setState({ readError: error.message });
		}
	}


	render() {
		return (
			<>
			<div className="chat-name">
				<span>{this.props.location.state[0]}</span>
				</div>

<div className="chat-main-container">
<div className="chat-container">
					{this.state.chats.length > 0 ? (<ul>
						{this.state.chats.map(chat => (
							<li >
								{chat.name === this.props.location.state[1] &&
									<div class="chat-container-chat m-2">
										<span>{chat.message}</span>
									</div>
								}
								{chat.name === this.props.location.state[0] &&
									<div class="chat-content m-2">
										<span>{chat.message}</span>
									</div>
								}
							</li>))
						}
					</ul>) : (<> </>)}
				</div>
				<div className="type-message-container"></div>
				<center>
					<div className='search-form'>
						<input
							type="input"
							placeholder=""
							onChange={event => {
								this.setState({
									messageToSend: event.target.value, messageSend: true
								})
							}}
						/>
						<button className="button-chat"onClick={() => { this.sendMessage() }}>Enviar</button>
					</div>
				</center>
</div>
</>
		);
	}
}
