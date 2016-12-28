import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import ListContainer from '../../ui/containers/ListContainer.jsx';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
import TransactionPage from '../../ui/pages/TransactionPage.jsx';
import TransactionHistoryContainer from '../../ui/containers/TransactionHistoryContainer.jsx';
import TransactionNewPage from '../../ui/pages/TransactionNewPage.jsx';


export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
	    <Route path="transaction" component={TransactionHistoryContainer}>
        <Route path="/transaction/new" component={TransactionNewPage}/>
	    </Route>
	    <Route path="lists/:id" component={ListContainer} />
      <Route path="signin" component={AuthPageSignIn} />
      <Route path="join" component={AuthPageJoin} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>
);
//<Route path="transaction/:transactionId" component={TransactionPage}/>