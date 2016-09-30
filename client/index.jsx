import React from 'react';
import { render } from 'react-dom';

// import css
import css from './style/style.css';

// import components
import MainNav from './components/mainNav';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import FrontPage from './components/frontPage';
import PostLists from './components/postLists';
import PostListsFromSearch from './components/postListsFromSearch';
import PostDetail from './components/postDetail';
import PostNew from './components/postNew';

// import react router dependencies
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={MainNav}>
        <IndexRoute component={FrontPage} />
        <Route path="signin" component={Signin} />
        <Route path="signup" component={Signup} />
        <Route path="signout" component={Signout} />
        <Route path="new" component={PostNew} />
        <Route path="posts" component={PostLists} />
        <Route path="postsfromsearch" component={PostListsFromSearch} />
        <Route path="posts/:id" component={PostDetail} />
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'));

