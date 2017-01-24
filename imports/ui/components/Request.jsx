import React from 'react';
import classnames from 'classnames';

const todoClass = classnames({
      'list-item': true,
    });

const Request = ({ toUser, fromUser, toUserId, fromUserId, amount, timestamp, reason }) => (
  <div className={todoClass}>
  	<p>{fromUser} requests R{amount} from {toUser} for {reason} on {timestamp}</p>
  </div>
);

Request.propTypes = {
	toUser: React.PropTypes.string,
	fromUser: React.PropTypes.string,
	toUserId: React.PropTypes.string,
	fromUserId: React.PropTypes.string,
	amount: React.PropTypes.number,
	timestamp: React.PropTypes.string,
  reason: React.PropTypes.string,
};

export default Request;
