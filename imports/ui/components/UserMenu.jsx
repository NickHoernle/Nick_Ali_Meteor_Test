import React from 'react';
import { Link } from 'react-router';

export default class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggle(e) {
    e.stopPropagation();
    this.setState({
      open: !this.state.open
    });
  }

  renderLoggedIn() {
    const { open } = this.state;
    const { user, logout } = this.props;
    const name = user.profile.name
    const email = user.services.facebook.email;
    const emailLocalPart = `${user.services.facebook.first_name} ${user.services.facebook.last_name}`

    return (
      <div className="user-menu vertical">
        <a href="#" className="btn-secondary" onClick={this.toggle.bind(this)}>
          {open
            ? <span className="icon-arrow-up"></span>
            : <span className="icon-arrow-down"></span>}
          {emailLocalPart}
        </a>
        {open
          ? <a className="btn-secondary" onClick={logout}>Logout</a>
          : null}
      </div>
    );
  }

  renderLoggedOut() {
    return (
      <div className="user-menu">
        <Link to="/signin" className="btn-secondary">Sign In</Link>
        <Link to="/join" className="btn-secondary">Join</Link>
      </div>
    );
  }

  render() {
    return this.props.user
      ? this.renderLoggedIn()
      : this.renderLoggedOut();
  }
}

UserMenu.propTypes = {
  user: React.PropTypes.object,
  logout: React.PropTypes.func
};
