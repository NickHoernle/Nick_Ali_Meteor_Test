import React from 'react';
import classnames from 'classnames';

const todoClass = classnames({
      'list-item': true,
    });


const Transaction = ({ toUser, fromUser, toUserId, fromUserId, amount, timestamp }) => (
  <div className={todoClass}>
  	<p>{fromUser} paid {toUser} R{amount} on {timestamp}</p>
  </div>
);

Transaction.propTypes = {
	toUser: React.PropTypes.string,
	fromUser: React.PropTypes.string,
	toUserId: React.PropTypes.string,
	fromUserId: React.PropTypes.string,
	amount: React.PropTypes.number,
	timestamp: React.PropTypes.string,
};

export default Transaction;