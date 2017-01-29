import React from 'react';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import { Transactions } from '../../../imports/api/transactions/transactions.js'
import { insert } from '../../api/transactions/methods.js';
import { debitBalance } from '../../api/users/methods.js';
import { creditBalance } from '../../api/users/methods.js';

export default class TransactionNewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleSubmit(event) {
    event.preventDefault();

    const amount = this.refs.amount.value;
    const personPaid = this.refs.person.value;
    const errors = {};
    const toUserId = 'u2Ti4634Wf3pwFXTa';
    const toUserName = 'Nick';

    try{
      insert.call({
        fromUserId: Meteor.userId(),
        toUserId: toUserId,
        fromUserName: Meteor.user().profile.name,
        toUserName: toUserName,
        amount: amount
      }, (err) => {
        if (err) {
          router.push('/');
          alert('Could not complete transaction.');
        }
      });
    } catch(err) {
      console.log('Oh dear')
    }

    this.context.router.push('/transaction');
  }

  handleAlternate(event) {
    event.preventDefault();

    const amount = this.refs.amount.value;
    const personPaid = this.refs.person.value;
    const errors = {};
    const toUserId = 'u2Ti4634Wf3pwFXTa';
    const toUserName = 'Nick';
  }

  render() {
    return (
      <div>
        <hr />
        <h3>Create a new transaction</h3>
        <hr />
      <div className="page-new-transaction">
        <form onSubmit={this.handleSubmit.bind(this)} className='new-transaction-form'>
          <table className='form-table'><tbody>
          <tr>
            <td className='form-label'><label for="amount">Payment Amount:</label></td>
            <td className='form-input'><input className='input' type="number" name="amount" ref="amount" placeholder="Amount"/></td>
          </tr>
          <tr>
            <td className='form-label'><label for="person">Payment to:</label></td>
            <td className='form-input'><input className='input' type="text" name="person" ref="person" placeholder="Person"/></td>
          </tr>
          <tr>
            <td className='form-label'><label for="body">What is this transaction for?</label></td>
            <td className='form-input'><textarea name="body" onChange={this.handleChange} value={this.state.currentValue} placeholder="Transaction description can go here."/></td>
          </tr>
          </tbody></table>
          <center>
            <button type="submit" className="btn btn-default btn-sm">Pay</button>
            <button type="button" className="btn btn-default btn-sm" onClick={this.handleAlternate.bind(this)}>Charge</button>
          </center>
      </form>
      </div>
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
