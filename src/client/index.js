'use strict';

import React from 'react';
import {render} from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import {Provider} from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './stores/index';
import "./stylesheets/main.scss";

import HomePageWrapper from './views/homePageWrapper';
import RegisterPage from './views/registerPage';
import OrphanageViewWrapper from './views/orphanageViewWrapper';
import PartyHallView from './views/partyHallView';
import EnsureProtectedAccess from './views/ensureProtectedAccess';
import RequestIntimationsWrapper from './views/requestIntimationsWrapper';

const history = syncHistoryWithStore(browserHistory, store);

class App extends React.Component {
  render () {

    return (
       <div>
        {this.props.children}
      </div>
    );
  }
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePageWrapper}/>
          <Route path='/register' component={RegisterPage}/>
          <Route path='/orphanage' component={OrphanageViewWrapper}/>
          <Route path='/partyhall' component={PartyHallView}/>
          <Route path='/requestIntimations' component={RequestIntimationsWrapper}/>
      </Route>
    </Router>
  </Provider>, document.getElementById('app'));
