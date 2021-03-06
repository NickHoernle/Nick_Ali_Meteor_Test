import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { Transactions } from './transactions.js';
import { debitBalance } from '../users/methods.js';
import { creditBalance } from '../users/methods.js';

const TRANSACTION_ID_ONLY = new SimpleSchema({
  fromUserId: { type: String },
  transactionId: { type: String }
}).validator();

export const insert = new ValidatedMethod({
  name: 'Transactions.methods.insert',
  // validate: new SimpleSchema({}).validator(),
  validate: null,
  run({ fromUserId, toUserId, fromUserName, toUserName, amount }) {
          // debugger
    debitBalance.call({
      userId: fromUserId,
      amount: amount
    }, (err) => {
      console.log('error', err)
    });
    console.log('debited')

    creditBalance.call({
      userId: toUserId,
      amount: amount
    }, (err) => {
      console.log('error', err)
    });

    transact = {
      fromUserId: fromUserId,
      toUserId: toUserId,
      fromUserName: fromUserName,
      toUserName: toUserName,
      amount: amount,
      timestamp: (new Date()).getTime()
    }
    return Transactions.insert(transact);
  }
});

export const insertRequest = new ValidatedMethod({
  name: 'Transactions.methods.insertRequest',
  validate: null,
  run({ fromUserId, toUserId, fromUserName, toUserName, amount, reason }) {
    request = {
      fromUserId: fromUserId,
      toUserId: toUserId,
      fromUserName: fromUserName,
      toUserName: toUserName,
      amount: amount,
      timestamp: (new Date()).getTime(),
      reason: reason
    }

    /**
    Some fancy logic is going to have to go here to notify the next person that you
    are requesting a transaction
    **/
    console.log('Well done Ali. Now you would need to save that to a database so that it shows up that you have requested a transaction')

    //return Transactions.insert(request);
  }});
// export const makePrivate = new ValidatedMethod({
//   name: 'Lists.methods.makePrivate',
//   validate: LIST_ID_ONLY,
//   run({ listId }) {
//     if (!this.userId) {
//       throw new Meteor.Error('Lists.methods.makePrivate.notLoggedIn',
//         'Must be logged in to make private lists.');
//     }

//     const list = Lists.findOne(listId);

//     if (list.isLastPublicList()) {
//       throw new Meteor.Error('Lists.methods.makePrivate.lastPublicList',
//         'Cannot make the last public list private.');
//     }

//     Lists.update(listId, {
//       $set: { userId: this.userId }
//     });
//   }
// });

// export const makePublic = new ValidatedMethod({
//   name: 'Lists.methods.makePublic',
//   validate: LIST_ID_ONLY,
//   run({ listId }) {
//     if (!this.userId) {
//       throw new Meteor.Error('Lists.methods.makePublic.notLoggedIn',
//         'Must be logged in.');
//     }

//     const list = Lists.findOne(listId);

//     if (!list.editableBy(this.userId)) {
//       throw new Meteor.Error('Lists.methods.makePublic.accessDenied',
//         'You don\'t have permission to edit this list.');
//     }

//     // XXX the security check above is not atomic, so in theory a race condition could
//     // result in exposing private data
//     Lists.update(listId, {
//       $unset: { userId: true }
//     });
//   }
// });

// export const updateName = new ValidatedMethod({
//   name: 'Lists.methods.updateName',
//   validate: new SimpleSchema({
//     listId: { type: String },
//     newName: { type: String }
//   }).validator(),
//   run({ listId, newName }) {
//     const list = Lists.findOne(listId);

//     if (!list.editableBy(this.userId)) {
//       throw new Meteor.Error('Lists.methods.updateName.accessDenied',
//         'You don\'t have permission to edit this list.');
//     }

//     // XXX the security check above is not atomic, so in theory a race condition could
//     // result in exposing private data

//     Lists.update(listId, {
//       $set: { name: newName }
//     });
//   }
// });

// export const remove = new ValidatedMethod({
//   name: 'Lists.methods.remove',
//   validate: LIST_ID_ONLY,
//   run({ listId }) {
//     const list = Lists.findOne(listId);

//     if (!list.editableBy(this.userId)) {
//       throw new Meteor.Error('Lists.methods.remove.accessDenied',
//         'You don\'t have permission to remove this list.');
//     }

//     // XXX the security check above is not atomic, so in theory a race condition could
//     // result in exposing private data

//     if (list.isLastPublicList()) {
//       throw new Meteor.Error('Lists.methods.remove.lastPublicList',
//         'Cannot delete the last public list.');
//     }

//     Lists.remove(listId);
//   }
// });

// Get list of all method names on Lists
// const LISTS_METHODS = _.pluck([
//   insert,
//   makePublic,
//   makePrivate,
//   updateName,
//   remove
// ], 'name');

// if (Meteor.isServer) {
//   // Only allow 5 list operations per connection per second
//   DDPRateLimiter.addRule({
//     name(name) {
//       return _.contains(LISTS_METHODS, name);
//     },

//     // Rate limit per connection ID
//     connectionId() { return true; }
//   }, 5, 1000);
// }
