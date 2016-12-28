import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { browserHistory } from 'react-router'

export default class AccountsUIWrapper extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  componentWillReceiveProps(nextProps) {
    if (Meteor.user()) {
      const { router } = this.context;
      if (router.isActive('/signin')) {
          router.push('/');
      }
    }
  }
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
}

AccountsUIWrapper.propTypes = {
  location: React.PropTypes.object   // current router location
};

AccountsUIWrapper.contextTypes = {
  router: React.PropTypes.object
};