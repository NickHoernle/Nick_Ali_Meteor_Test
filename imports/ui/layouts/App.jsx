import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Lists } from '../../api/lists/lists.js';
// import { Transactions } from '../../api/transitions/transitions.js';
import UserMenu from '../components/UserMenu.jsx';
import ListList from '../components/ListList.jsx';
import ConnectionNotification from '../components/ConnectionNotification.jsx';
import Loading from '../components/Loading.jsx';
import { Link } from 'react-router';

const CONNECTION_ISSUE_TIMEOUT = 5000;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      showConnectionIssue: false
    };
  }

  componentWillReceiveProps({ loading, children }) {
    // redirect / to a list once lists are ready
    if (!loading && !children) {
      const list = Lists.findOne();
      this.context.router.replace(`/lists/${ list._id }`);
    }
  }

  componentDidMount() {
    setTimeout(() => {
      /* eslint-disable react/no-did-mount-set-state */
      this.setState({ showConnectionIssue: true });
    }, CONNECTION_ISSUE_TIMEOUT);
  }

  toggleMenu(menuOpen = !Session.get('menuOpen')) {
    Session.set({ menuOpen });
  }

  logout() {
    Meteor.logout();

    // if we are on a private list, we'll need to go to a public one
    const list = Lists.findOne(this.props.params.id);
    if (list.userId) {
      const publicList = Lists.findOne({ userId: { $exists: false }});
      this.context.router.push(`/lists/${ publicList._id }`);
    }
  }

  loginWithFacebook(){
    Meteor.loginWithFacebook({}, function(err){
      if (err) {
          throw new Meteor.Error("Facebook login failed");
      }
    });
  }

  render() {
    const { showConnectionIssue } = this.state;
    const {
      user,
      connected,
      loading,
      lists,
      menuOpen,
      children,
      location
    } = this.props;

    const closeMenu = this.toggleMenu.bind(this, false);

    // clone route components with keys so that they can
    // have transitions
    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname
    });
    if (Meteor.user()) {
      return(
        <div id="container" className={menuOpen ? 'menu-open' : ''}>
        <section id="menu">
          {loading
              ? <Loading key="loading"/>
              : <UserMenu user={user} logout={this.logout.bind(this)}/>}
          <div className="list-todos">
            <Link
              to='/transaction'
              title='Transaction History'
              className="list-todo"
              activeClassName="active">
                Transaction History
            </Link>
            <Link
              to='/transaction/new'
              title='New Transaction'
              className="list-todo"
              activeClassName="active">
                New Transaction
            </Link>
            <Link
              to='/friends_list'
              title='Friends List'
              className="list-todo"
              activeClassName="active">
                Friends List
            </Link>
            <Link
              to='/settings'
              title='Setting'
              className="list-todo"
              activeClassName="active">
                Settings
            </Link>
          </div>
          {/*<ListList lists={lists}/>*/}
        </section>
        {showConnectionIssue && !connected
          ? <ConnectionNotification/>
          : null}
        <div className="content-overlay" onClick={closeMenu}></div>
        <div id="content-container">
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}>
            {loading
              ? <Loading key="loading"/>
              : clonedChildren}
          </ReactCSSTransitionGroup>
        </div>
        </div>
      );
    }
    else{
      $('.carousel').carousel({
            interval: 2500
      })
      return(
        <div>
          <div className="hero-unit">
            <h1 id='linearBg2'>Micro Payments Application</h1>
            <div id='login-buttons'>
              <center>
              <button className="btn btn-block btn-social btn-facebook" onClick={this.loginWithFacebook}>
                <i className="fa fa-facebook" aria-hidden="true"></i> Login with Facebook
              </button>
              </center>
            </div>
            <div id="myCarousel" className="carousel slide">
              <ol className="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
                <li data-target="#myCarousel" data-slide-to="2"></li>
              </ol>
              <div className="carousel-inner">
                <div className="active item"><center><h2>Some text describing what this does</h2></center></div>
                <div className="item"><center><h2>Some more text describing what this does</h2></center></div>
                <div className="item"><center><h2>Some more text describing what this does</h2></center></div>
              </div>
              <a className="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
              <a className="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>
            </div>
          </div>
        </div>
      );
    }
  }
}

App.propTypes = {
  user: React.PropTypes.object,      // current meteor user
  connected: React.PropTypes.bool,   // server connection status
  loading: React.PropTypes.bool,     // subscription status
  menuOpen: React.PropTypes.bool,    // is side menu open?
  lists: React.PropTypes.array,      // all lists visible to the current user
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object   // current router location
};

App.contextTypes = {
  router: React.PropTypes.object
};
