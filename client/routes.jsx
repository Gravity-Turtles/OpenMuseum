import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import FrontPage from './components/frontPage';
import PostLists from './components/postLists';
import PostDetail from './components/postDetail';
import PostNew from './components/postNew';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={FrontPage} />
    <Route path="lists" component={PostLists} />
    <Route path="lists/title" component={PostDetail} />
    <Route path="new" component={PostNew} />
  </Route>
)


