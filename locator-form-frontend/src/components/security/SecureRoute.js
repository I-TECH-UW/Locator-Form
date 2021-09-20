import React from "react";
import { Route } from "react-router-dom";

class SecureRoute extends React.Component {
	
	constructor(props) {
	    super(props);
	    this.state = { 
	    	      authenticated: false,
	    }
	  }
	
	  componentDidMount() {
		  const keycloak = this.props.keycloak;
		  keycloak.init({onLoad: 'login-required'}).success((authenticated) => {
		        if (authenticated) {
				    console.info("Authenticated");
				    this.setState({ authenticated: true });
			        localStorage.setItem("react-token", keycloak.token);
			        localStorage.setItem("react-refresh-token", keycloak.refreshToken);
			        setTimeout(() => {
			            keycloak.updateToken(70).success((refreshed) => {
			              if (refreshed) {
			                console.debug('Token refreshed' + refreshed);
			              } else {
			                console.warn('Token not refreshed, valid for '
			                  + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
			              }
			            }).error(() => {
			              console.error('Failed to refresh token');
			            });
			        }, 60000);
				}
			}).error(() => {
				  console.error("Authenticated Failed");
		    });  
	
	  }
	  
	  render() {
		  if (this.props.keycloak) {
		      if (this.state.authenticated) {
				  return (
						<Route {...this.props}/>
				  );
    	      } else {
    			  return (<div>Not authenticated</div>);
    		  }
    	  } 
    	  return (<div>Initializing Keycloak...</div>);
	  }
}

export default SecureRoute;
