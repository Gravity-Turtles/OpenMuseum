import React from 'react';
import { render } from 'react-dom';

// import css
import css from './style/style.css';

// import components
import MainNav from './components/mainNav';
import Signin from './components/auth/signIn';
import Signup from './components/auth/signUp';
import Signout from './components/auth/signout';
import FrontPage from './components/frontPage';
import PostLists from './components/postLists';
import PostListsFromSearch from './components/postListsFromSearch';
import PostListsFromTheme from './components/postListsFromTheme';
import PostDetail from './components/postDetail';
import PostNew from './components/postNew';
import RequireAuth from './components/auth/requireAuth';
import ImageSlide from './components/imageSlide';

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
        <Route path="new" component={RequireAuth(PostNew)} />
        <Route path="posts" component={PostLists} />
        <Route path="postsfromsearch" component={PostListsFromSearch} />
        <Route path="postsfromtheme" component={PostListsFromTheme} />
        <Route path="posts/:id" component={RequireAuth(PostDetail)} />
        <Route path="imageSlide" component={ImageSlide} />           
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'));

