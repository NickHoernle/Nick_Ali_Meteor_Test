import React from 'react';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';

export default class TransactionNewPage extends React.Component {
  constructor(props) {
    super(props);
  }

  // onEditingChange(id, editing) {
  //   this.setState({
  //     editingTodo: editing ? id : null
  //   });
  // }

  render() {
    console.log('in transaction new page')
    // const { transactionExists, transaction, loading } = this.props;

    // if (!transactionExists) {
    //   return <NotFoundPage/>;
    // }
    // debugger
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

TransactionNewPage.propTypes = {
  transaction: React.PropTypes.object,
  loading: React.PropTypes.bool,
  transactionExists: React.PropTypes.bool
};