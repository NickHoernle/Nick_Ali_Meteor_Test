/* eslint-disable prefer-arrow-callback */

import { Transactions } from './transactions.js';

// {
//   $or: [{ fromUserId: this.userId },{ toUserId: this.userId }]
// }

Meteor.publish('Transactions.withUser', function() {
  const toUserId = this.userId;
  const fromUserId = this.userId;
  const query = {
    $or: [{toUserId}, {fromUserId}]
  };
  const options = {
    fields: Transactions.publicFields
  };

  return Transactions.find(query, options);
});
