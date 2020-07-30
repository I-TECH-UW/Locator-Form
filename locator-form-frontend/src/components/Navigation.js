import React from "react";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, withRouter } from "react-router-dom";


class Navigation extends React.Component {

  render() {
    return (
      <div className="navigation">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              {/* {languages.title} */}
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                
                

                {/* TODO add this back when/if we want to do internationalization */}
                 <li >
                  <div className="dropdown">
                    <button type="button" className="btn btn-dark" data-toggle="dropdown">
                      <FontAwesomeIcon icon={faLanguage} style={{ color: 'grey' }} size="3x" />
                    </button>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" lang="en" onClick={this.props.onChangeLanguage}>English</a>
                      <a className="dropdown-item" lang="fr" onClick={this.props.onChangeLanguage}>Français</a>
                    </div>
                  </div>
                </li> 
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navigation);