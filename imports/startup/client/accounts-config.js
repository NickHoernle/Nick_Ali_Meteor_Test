import { Accounts } from 'meteor/accounts-base'
import { Template } from 'meteor/templating';

Accounts.ui.config({
  requestPermissions: {
    facebook: ['user_friends', 'email']
  },
  requestOfflineToken: {
    google: true
  },
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

Meteor.subscribe("userData");

if (Meteor.isClient) {
  Template.loginButtons.rendered = function() {
    Deps.autorun(function(){
    	Accounts._loginButtonsSession.get('dropdownVisible');
    	Accounts._loginButtonsSession.set('dropdownVisible', true);	
	});
  }
}