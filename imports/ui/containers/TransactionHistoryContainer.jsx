import { Transactions } from '../../api/transactions/transactions.js';
import { createContainer } from '../helpers/create-container.jsx';
import TransactionHistoryPage from '../pages/TransactionHistoryPage.jsx';
import { Lists } from '../../api/lists/lists.js';

export default createContainer(() => {
  const user = Meteor.user();
  const transactionsHandle = Meteor.subscribe('Transactions.withUser', Meteor.userId());
  const loading = !transactionsHandle.ready();
  // const transactions = Transactions.find({$or: [{ fromUserId: Meteor.userId() },{ toUserId: Meteor.userId() }]}).fetch();
  // const transactions = Transactions.find().fetch();
  const userExists = !loading && !!user;
  // debugger;
  // TODO: Maybe fetch the relevant users here
  return {
    loading,
    user,
    userExists,
    transactions: Transactions.find().fetch(),
  };
}, TransactionHistoryPage);
