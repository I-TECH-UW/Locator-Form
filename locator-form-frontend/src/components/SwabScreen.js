import React from 'react'
import { Field, Formik, Form } from 'formik'
import { FormattedMessage, injectIntl } from 'react-intl'
import Search from './SearchBar';

class SwabScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          submitErrorKey: '',
          isSubmitting: false,
          formValues: {},
	        formKey: '1',
          displayPassengerDetails: false
        }
      }

      searchSuccess = (locatorForm, key) => {
        this.setState({displayPassengerDetails: true, formValues: locatorForm, formKey: key});
      }

      render() {
		    return (
		      <>
		        <div className="container-fluid d-flex min-vh-100 flex-column content">
		          <div className="row dark-row">
	              <div className="col-lg-11 ">
	              </div>
	              <div className="col-lg-1 ">
	              	<button style={{display:'none'}} id="logout-button" type="button" onClick={this.logout}>
	              		<FormattedMessage id="nav.item.logout" defaultMessage="logout" />
	              	</button>
	              </div>
	              </div>
		          <div className="row dark-row">
	              <div className="col-lg-12 ">
		                <div className="container pt-3">
		                	<div className="container">  
		                  		<h3 className="question-header"> 
		                  		<FormattedMessage id="nav.item.header.swabscreen" defaultMessage="Swab Screen" />
		                  		</h3>
		                    </div>
		                </div>
		              </div>
		          </div>
              <div className="row light-row flex-grow-1">
		              <div className="col-lg-12 ">
		              	<div className="container pt-3">
					{this.props.keycloak.hasRealmRole('swab-screen-user') && 		  
                       <Search search='testkit' onSearchSuccess={this.searchSuccess} intl={this.props.intl}/>
			        }
					   {this.state.displayPassengerDetails && 
                          (<h1>
                            {this.state.formValues.lastName}
                          </h1>)}
                    </div>
                  </div>
              </div>              
		      </div>
		      </>
		    );
		   }
}

export default injectIntl(SwabScreen)