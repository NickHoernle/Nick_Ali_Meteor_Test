import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';

class TransactionCollection extends Mongo.Collection {
  // insert(transaction, callback);
  // remove(transaction, callback);
}

export const Transactions = new TransactionCollection('transaction');

// Deny all client-side updates since we will be using methods to manage this collection
Transactions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Transactions.schema = new SimpleSchema({
  timestamp:    { type: Date, defaultValue: Date.now() },
  amount:       { type: Number, defaultValue: 0 },
  fromUserId:   { type: String, regEx: SimpleSchema.RegEx.Id },
  toUserId:     { type: String, regEx: SimpleSchema.RegEx.Id },
  fromUserName: { type: String, defaultValue: '' },
  toUserName:   { type: String, defaultValue: '' },
});

Transactions.attachSchema(Transactions.schema);

// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Transactions.publicFields = {
  date: 1,
  amount: 1,
  fromUserId: 1,
  fromUserName: 1,
  toUserName: 1,
  toUserId: 1,
  timestamp: 1,
};

Factory.define('transaction', Transactions, {});
