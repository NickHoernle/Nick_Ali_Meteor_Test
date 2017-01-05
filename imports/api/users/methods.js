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

    // TODO: Some sort of fancy editing and checking logic here.

    // if (!user.editableBy(this.userId)) {
    //   throw new Meteor.Error('user.methods.debitBalance.unauthorized',
    //     'Cannot debit different user');
    // }

    // Initialise the account amount to 1000 for testing purposes
    if(!Meteor.user().profile.account_balance){
      Meteor.users.update({_id: user._id}, {$set:{'profile.account_balance': 1000}});
    }

    const balance = Meteor.user().profile.account_balance - amount
    Meteor.users.update({_id: userId}, {$set:{'profile.account_balance': balance}});
  }
});

export const creditBalance = new ValidatedMethod({
  name: 'Todos.methods.creditBalance',
  validate: new SimpleSchema({
    userId: { type: String },
    amount: { type: Number }
  }).validator(),
  run({ userId, amount }) {
    const balance = Meteor.users.findOne({_id: userId}).profile.account_balance + amount
    console.log('Crediting balance', balance)
    Meteor.users.update({_id: userId}, {$set:{'profile.account_balance': balance}});
  }
});