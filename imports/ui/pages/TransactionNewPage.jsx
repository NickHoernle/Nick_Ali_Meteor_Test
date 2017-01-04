import React from 'react';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import { Transactions } from '../../../imports/api/transactions/transactions.js'
import { insert } from '../../api/transactions/methods.js';
import { debitBalance } from '../../api/users/methods.js';

export default class TransactionNewPage extends React.Component {
  constructor(props) {
    super(props);
  }

  // onEditingChange(id, editing) {
  //   this.setState({
  //     editingTodo: editing ? id : null
  //   });
  // }



  onSubmit(event){
    //console.log(event)
    event.preventDefault();
    //debugger
    const amount = this.refs.amount.value;
    const personPaid = this.refs.person.value;
    const errors = {};
    // console.log(event)
    const toUserId = 'u2Ti4634Wf3pwFXTa';
    const toUserName = 'Nick';
    /*
    if (!amount) {
      errors.amount = 'Amount required';
    }

    if (!personPaid) {
      errors.person = 'Receiver required';
    }*/

    insert.call({
      fromUserId: Meteor.userId(),
      toUserId: toUserId,
      fromUserName: Meteor.user().profile.name,
      toUserName: toUserName,
      amount: amount
    }, (err) => {
      console.log('error', err)
    });

    // debugger
    debitBalance.call({
      userId: Meteor.userId(),
      amount: parseFloat(amount)
    }, (err) => {
      console.log('error', err)
    });

    // this.setState({ errors });
    // if (Object.keys(errors).length) {
    //   return;
    // }

    this.context.router.push('/transaction');
  }

  render() {
    console.log('in transaction new page')
    // const { transactionExists, transaction, loading } = this.props;

    // if (!transactionExists) {
    //   return <NotFoundPage/>;
    // }

    return (
      <div className="page-new-transaction">
        <h1>New Transaction</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className='new-transaction-form'>
            <input type="amount" name="amount" ref="amount" placeholder="Amount to pay"/>

          </div>
          <div className='person'>
            <input type="person" name="person" ref="person" placeholder="Person to pay"/>

          </div>
          <button type="submit" className="btn-primary">Pay</button>
        </form>

      </div>
    );
  }
}

TransactionNewPage.propTypes = {
  transaction: React.PropTypes.object,
  loading: React.PropTypes.bool,
  transactionExists: React.PropTypes.bool
};

TransactionNewPage.contextTypes = {
  router: React.PropTypes.object
};
