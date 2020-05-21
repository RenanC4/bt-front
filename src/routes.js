import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './pages/Login.js'
import Main from './pages/Main.js'
import Chat from './pages/Chat.js'
import Team from './pages/Team.js'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/user/:id" component={Main} />
            <Route path="/team/:id" component={Team} />
						<Route path="/chat/:id/:friendId" component={Chat} />
        </BrowserRouter>
    )
}
