import React from 'react';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Transaction from '../components/Transaction.jsx';
import UserHeader from '../components/UserHeader.jsx';

export default class TransactionHistoryPage extends React.Component {
  constructor(props) {
    super(props);
  }

  // onEditingChange(id, editing) {
  //   this.setState({
  //     editingTodo: editing ? id : null
  //   });
  // }

  defaultHistory(transactions) {
    return (
      <div className='content-scrollable list-items'>
        {transactions.map(transaction => (
          <Transaction
            key={transaction._id}
            toUser={transaction.toUserName}
            fromUser={transaction.fromUserName}
            toUserId={transaction.toUserId}
            fromUserId={transaction.fromUserId}
            amount={transaction.amount}
            timestamp={transaction.timestamp.toUTCString()} />
        ))}
      </div>
    );

  }

  render() {
    const { userExists, user, loading, transactions } = this.props;
    // debugger
    if (!userExists) {
      return <NotFoundPage/>;
    }
    // if (this.props.location.pathname == '/transaction/new'){
    //   return (<TransactionNewPage />);
    // } else if (this.props.location.pathname == '/transaction') {
    //   return defaultHistory();
    // } else {
    return (
      <div className="page lists-show">
        <UserHeader user={user}/>
        {this.props.children || this.defaultHistory(transactions)}
      </div>
    );
    // }
  }
}

TransactionHistoryPage.propTypes = {
  user: React.PropTypes.object,
  loading: React.PropTypes.bool,
  userExists: React.PropTypes.bool,
  transactions: React.PropTypes.array,
  location: React.PropTypes.object
};

TransactionHistoryPage.contextTypes = {
  router: React.PropTypes.object
};