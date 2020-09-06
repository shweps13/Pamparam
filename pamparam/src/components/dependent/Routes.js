import React from 'react'

import Main from '../main/Main.js';
import Messenger from '../main/Messenger.js';
import Discover from '../main/Discover.js';
import LikePage from '../main/LikePage.js';
import LoadPage from '../main/LoadPage.js';
import NotFound from './NotFound.js';

function Routes({ Route, Redirect, setLocal, user, username }) {
    
    return (
    <>
        <Route exact path="/">
          <Redirect to="/feed" />
        </Route>
        <Route exact path="/feed"
            render={() => (
							<Main
                username={username} user={user} setLocal={setLocal}
							/>
						)} />
        <Route exact path="/post"
            render={() => (
							<LoadPage
                setLocal={setLocal}
							/>
						)} />

        <Route exact path="/messenger"
            render={() => (
							<Messenger
                setLocal={setLocal}
							/>
						)} />
        <Route exact path="/discover"
            render={() => (
              <Discover
                setLocal={setLocal}
              />
            )} />
        <Route exact path="/likes"
            render={() => (
              <LikePage
                setLocal={setLocal}
              />
            )} />
    </>
    )
}

export default Routes
