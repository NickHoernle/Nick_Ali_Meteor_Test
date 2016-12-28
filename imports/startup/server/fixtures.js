import { Lists } from '../../api/lists/lists.js';
import { Todos } from '../../api/todos/todos.js';
import { Transactions } from '../../api/transactions/transactions.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Transactions.find().count() === 0) {
    console.log('working here')
    const data = [
      {
        amount: 20,
        fromUserId: 'u2Ti4634Wf3pwFXTa',
        fromUserName: 'Nick',
        toUserId: 'WGc7oxRfMsYBAZEsj',
        toUserName: 'Ali'
      },
      {
        amount: 30,
        toUserName: 'Dave',
        fromUserName: 'Ali',
        fromUserId: 'u2Ti4634Wf3pwFXTa',
        toUserId: 'WGc7oxRfMsYBAZEsj',
      },
      {
        amount: 40,
        toUserName: 'Doug',
        fromUserName: 'Nick',
        fromUserId: 'u2Ti4634Wf3pwFXTa',
        toUserId: 'WGc7oxRfMsYBAZEsj',
      },
      {
        amount: 50,
        fromUserId: 'u2Ti4634Wf3pwFXTa',
        toUserName: 'Ali',
        fromUserName: 'Dave',
        toUserId: 'WGc7oxRfMsYBAZEsj',
      },
    ];

    let timestamp = (new Date()).getTime();

    data.forEach((transaction) => {
      Transactions.insert({
        createdAt: new Date(timestamp),
        fromUserId: transaction.fromUserId,
        toUserId: transaction.toUserId,
        fromUserName: transaction.fromUserName,
        toUserName: transaction.toUserName,
        amount: transaction.amount,
        timestamp: timestamp
      });
      timestamp += 1; // ensure unique timestamp.
    });
  }

  // We'll delete this rubbish once we totally remove the lists
  // stuff
  if (Lists.find().count() === 0) {
    const data = [
      {
        name: 'Meteor Principles',
        items: [
          'Data on the Wire',
          'One Language',
          'Database Everywhere',
          'Latency Compensation',
          'Full Stack Reactivity',
          'Embrace the Ecosystem',
          'Simplicity Equals Productivity'
        ]
      },
      {
        name: 'Languages',
        items: [
          'Lisp',
          'C',
          'C++',
          'Python',
          'Ruby',
          'JavaScript',
          'Scala',
          'Erlang',
          '6502 Assembly'
        ]
      },
      {
        name: 'Favorite Scientists',
        items: [
          'Ada Lovelace',
          'Grace Hopper',
          'Marie Curie',
          'Carl Friedrich Gauss',
          'Nikola Tesla',
          'Claude Shannon'
        ]
      }
    ];

    let timestamp = (new Date()).getTime();

    data.forEach((list) => {
      const listId = Lists.insert({
        name: list.name,
        incompleteCount: list.items.length
      });

      list.items.forEach((text) => {
        Todos.insert({
          listId: listId,
          text: text,
          createdAt: new Date(timestamp)
        });

        timestamp += 1; // ensure unique timestamp.
      });
    });
  }
});
