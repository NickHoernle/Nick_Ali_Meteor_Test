import { Accounts } from 'meteor/accounts-base'

function Facebook(accessToken) {
    this.fb = Meteor.npmRequire('fbgraph');
    console.log(this.fb)
    this.accessToken = accessToken;
    this.fb.setAccessToken(this.accessToken);
    this.options = {
        timeout: 3000,
        pool: {maxSockets: Infinity},
        headers: {connection: "keep-alive"}
    }
    this.fb.setOptions(this.options);
}
Facebook.prototype.query = function(query, method) {
    var self = this;
    var method = (typeof method === 'undefined') ? 'get' : method;
    var data = Meteor.sync(function(done) {
       self.fb[method](query, function(err, res) {
           done(null, res);
       });
   });
   return data.result;
}
Facebook.prototype.getUserData = function() {
return this.query('me');
}
Facebook.prototype.getFriendsData = function() {
    return this.query('/me/friends');
}
Meteor.methods({
    getUserData: function() {
       var fb = new Facebook(Meteor.user().services.facebook.accessToken);
       var data = fb.getUserData();
       return data;
       },
    getFriendsData: function() {
       var fb = new Facebook(Meteor.user().services.facebook.accessToken);
       console.log(Meteor.user().services.facebook.accessToken)
       var data = fb.getFriendsData();
       console.log(data)
       return data;
    }
});

// Meteor.publish("getUserData", function () {
//     return Meteor.users.find({_id: this.userId});
// });

if (Meteor.isServer) {
  Accounts.onCreateUser(function(options, user) {
    if (user.profile == undefined) user.profile = {};
    _.extend(user.profile, { account_balance : 0 });
  });

  Meteor.publish("userData", function () {
    if (this.userId) {
      /*
        Probably a better way to do this but we are setting the
        initial balance of a user here.
      */
      return Meteor.users.find(
        {_id: this.userId},
        {fields: {'services': 1, 'others': 1, 'profile':1}});
    } else {
      this.ready();
    }
  });

  Meteor.publish("getFriendsData", function(){
    return Meteor.users.find({_id: this.userId});
  });
}