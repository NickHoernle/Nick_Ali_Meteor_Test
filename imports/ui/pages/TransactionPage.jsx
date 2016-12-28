import React from 'react';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';

export default class TransactionPage extends React.Component {
  constructor(props) {
    super(props);
  }

  // onEditingChange(id, editing) {
  //   this.setState({
  //     editingTodo: editing ? id : null
  //   });
  // }

  render() {
    console.log('in transaction page')
    const { transactionExists, transaction, loading } = this.props;
    debugger
    if (!transactionExists) {
      return <NotFoundPage/>;
    }

    return (
      <div className="page lists-show">
        <Message
          title="A transaction"
          subtitle="A transaction"/>
        <div className="content-scrollable list-items">
        </div>
      </div>
    );
  }
}

TransactionPage.propTypes = {
  transaction: React.PropTypes.object,
  loading: React.PropTypes.bool,
  transactionExists: React.PropTypes.bool
};