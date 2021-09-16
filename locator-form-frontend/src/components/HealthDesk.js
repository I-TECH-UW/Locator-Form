import React from 'react'
import { Formik, Form } from 'formik'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9, Confirmation, Success } from './formSteps'
import { MyTextInput } from './inputs/MyInputs'
import Search from './SearchBar';
import { healthDeskValidationSchema } from './formModel/validationSchema'
import formInitialValues from './formModel/formInitialValues'
import {
  createMuiTheme,
  MobileStepper,
  CircularProgress, 
  MuiThemeProvider
} from '@material-ui/core'
import Keycloak from 'keycloak-js';

// const muiTheme = createMuiTheme({
//     overrides: {
//         MuiStepIcon: {
//             root: {
//                 color: '#000000', // or 'rgba(0, 0, 0, 1)'
//                 '&$active': {
//                     color: '#00aded',
//                 },
//                 '&$completed': {
//                     color: '#00aded',
//                 },
//             },
//         },
//     }
// });

const muiMobileTheme = createMuiTheme({
  overrides: {
    // MuiMobileStepper: {
    //   root :{
    //     '@media (prefers-color-scheme: dark)': {
    //     'background-color': '#1e1e1e'
    //     },
    //   }
    // },
    MuiLinearProgress: {
      root: {
        maxWidth: "100%",
        flexGrow: 1
      },
      progress: {
        width: "75%"
      },
      colorPrimary: {
        'background-color': '#00800050',
      },
      barColorPrimary: {
        'background-color': '#008000',
      },
    },
  }
})

const steps = [
  'nav.item.step.passengerType',
  'nav.item.step.flight',
  'nav.item.step.personalInfo',
  'nav.item.step.recentTravel',
  'nav.item.step.health',
  'nav.item.step.contactInfo',
  'nav.item.step.addresses',
  'nav.item.step.emergencyContact',
  'nav.item.step.travelCompanion',
  'nav.item.step.confirmation',
]

class HealthDesk extends React.Component {

  constructor(props) {
    super(props)
    this.topOfQuestionsRef = React.createRef();
    this.state = {
      submitErrorKey: '',
      isSubmitting: false,
      submitSuccess: false,
      summaryAccessInfo: {},
      keycloak:null,
      authenticated: false,
      passengerSelected: false,
    }
  }
  
  componentDidMount() {
	//Get the keycloak configuration
	const keycloak = Keycloak('/resources/keycloak-config.json');
	keycloak.init({onLoad: 'login-required'}).success((authenticated) => {
	    this.setState({ keycloak: keycloak, authenticated: authenticated });
        if (!authenticated) {
		    window.location.reload();
	    } else {
		    console.info("Authenticated");
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

  submitForm = (values) => {
    this.setState({ isSubmitting: true })
    var json = JSON.stringify(values)
    console.log(json)
    fetch(`${process.env.REACT_APP_DATA_IMPORT_API}/health-desk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("react-token")}`,
      },
      body: json
    }).then(async response => {
      this.setState({ submitting: false })
      const summaryAccessInfo = await response.json()
      if (response.ok) {
        this.onSuccess(summaryAccessInfo)
      } else {
        throw new Error("didn't receive ok")
      }
    }).catch(err => {
      this.setState({ isSubmitting: false })
      console.log(err)
      this.setState({ 'submitErrorKey': 'error.submit' })
    })
  }

  handleSubmit = (values, actions) => {
    this.submitForm(values);
  }

  scrollToTopOfPage = () => {
    window.scrollTo(0, 0)
  }

  scrollToTopOfQuestionsRef = () => {
    // not working for some reason on step 4,6,8,9
  //   const inputElements = document.getElementsByTagName('input')
  // if (inputElements.length > 0) {
  //   inputElements.item(0).focus();
  // }
    console.log('scrollto: ' + this.topOfQuestionsRef.current.offsetTop - 125)
    window.scrollTo(0, this.topOfQuestionsRef.current.offsetTop - 125)
    // window.scrollTo(0, 0)
  }

  onSuccess = (summaryAccessInfo) => {
    this.setState({ 'submitSuccess': true, 'summaryAccessInfo': summaryAccessInfo })
    this.scrollToTopOfPage();
  }
  
  searchSuccess = (locatorForm) => {
	  this.setState({'passengerSelected': true, 'formValues': locatorForm});
  }

  render() {
	  if (this.state.keycloak) {
	      if (this.state.authenticated) {
		    const  currentValidationShema = healthDeskValidationSchema;
		    return (
		      <>
		        <div className="container-fluid d-flex min-vh-100 flex-column content">
		          <div className="row dark-row">
		              <div className="col-lg-12 ">
		                <div className="container pt-3">
		                	<div className="container">  
		                  		<h3 className="question-header">
		                  		<FormattedMessage id="nav.item.header.healthdesk" defaultMessage="Health Desk" /></h3>
		                    </div>
		                </div>
		              </div>
		          </div>
		          <div className="row light-row flex-grow-1" ref={this.topOfQuestionsRef}>
		              <div className="col-lg-12 ">
		              	<div className="container pt-3">
		              			<Search onSearchSuccess={this.searchSuccess} intl={this.props.intl}/>
		              		{this.state.passengerSelected && 
		              	
		        <Formik
		          initialValues={this.state.formValues}
		          enableReinitialize={true}
		          validationSchema={currentValidationShema}
		          onSubmit={this.handleSubmit}
		          validateOnMount={true}
		        >{formikProps => (
		          <Form>
		            <div className="questions" id="questions">
		            	<Step1 formikProps={formikProps} intl={this.props.intl} />
		            	<Step2 formikProps={formikProps} intl={this.props.intl} />
		            	<Step3 formikProps={formikProps} intl={this.props.intl} />
		            	<Step4 formikProps={formikProps} intl={this.props.intl} />
		            	<Step5 formikProps={formikProps} intl={this.props.intl} />
		            	<Step6 formikProps={formikProps} intl={this.props.intl} />
		            	<Step7 formikProps={formikProps} intl={this.props.intl} />
		            	<Step8 formikProps={formikProps} intl={this.props.intl} />
		            	<Step9 formikProps={formikProps} intl={this.props.intl} />
						<div className="row">
						<div className="col-lg-4 form-group">
							<MyTextInput
								label={<FormattedMessage id="nav.item.testKitId" defaultMessage="Test Kit ID" />}
								name="testKitId"
								requireField={true}
								type="text"
								// disabled={this.state.searching || this.state.confirming} 
							/>
						</div>
								</div>
								</div>
								<div className="row">
								<div className="col-lg-4 form-group">
		                  <button
		                    disabled={this.state.isSubmitting || !formikProps.isValid || !formikProps.dirty }
		                    type="submit"
		                    className={'confirm-button'}
		                  >
		                    {<FormattedMessage id="nav.item.submit" defaultMessage="Submit" /> }
		                  </button>
		                  {this.state.isSubmitting && (
		                    <CircularProgress
		                      size={24}
		                    />
		                  )}
		                  {this.state.submitErrorKey &&
		                    <div className="error"><FormattedMessage id={this.state.submitErrorKey} defaultMessage="Error"/></div>
		                  }
		                </div>
		            </div>
		          </Form >
		        )}
		        </Formik>
		        }
		      </div>
		      </div>
		      </div>
		      </div>
		      </>
		    );
	      } else {
			  return (<div>Unable to authenticate!</div>);
		  }
	  } 
	  return (<div>Initializing Keycloak...</div>);
  }
}

export default injectIntl(HealthDesk)