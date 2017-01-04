import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

export const debitBalance = new ValidatedMethod({
  name: 'Todos.methods.debitBalance',
  validate: new SimpleSchema({
    userId: { type: String },
    amount: { type: Number }
  }).validator(),
  run({ userId, amount }) {
    const user = Meteor.user()

    if (!user.editableBy(this.userId)) {
      throw new Meteor.Error('user.methods.debitBalance.unauthorized',
        'Cannot debit different user');
    }

    // Initialise the account amount to 1000 for testing purposes
    if(!user.profile.account_balance){
      Meteor.users.update({_id: user._id}, {$set:{'profile.account_balance':1000}});
    }

    const balance = user.profile.balance - balance
    Meteor.users.update({_id: user._id}, {$set:{'profile.account_balance':balance}});
  }
});

export const creditBalance = new ValidatedMethod({
  name: 'Todos.methods.creditBalance',
  validate: new SimpleSchema({
    userId: { type: String },
    amount: { type: Number }
  }).validator(),
  run({ userId, amount }) {
    const user = Meteor.user()

    // Initialise the account amount to 1000 for testing purposes
    if(!user.profile.account_balance){
      Meteor.users.update({_id: user._id}, {$set:{'profile.account_balance':1000}});
    }

    const balance = user.profile.balance + balance
    Meteor.users.update({_id: user._id}, {$set:{'profile.account_balance':balance}});
  }
});