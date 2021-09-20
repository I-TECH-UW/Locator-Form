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

class HealthDesk extends React.Component {

  constructor(props) {
    super(props)
    this.formRef = React.createRef();
    this.state = {
      submitErrorKey: '',
      isSubmitting: false,
      submitSuccess: false,
      summaryAccessInfo: {},
      passengerSelected: false,
      formKey: '1',
    }
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

  onSuccess = (summaryAccessInfo) => {
    this.setState({ 'submitSuccess': true, 'summaryAccessInfo': summaryAccessInfo })
    this.scrollToTopOfPage();
  }
  
  searchSuccess = (locatorForm, key) => {
	  this.setState({'passengerSelected': true, 'formValues': locatorForm, 'formKey': key});
  }

  render() {
		    const  currentValidationShema = healthDeskValidationSchema;
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
		                  		<FormattedMessage id="nav.item.header.healthdesk" defaultMessage="Health Desk" />
		                  		</h3>
		                    </div>
		                </div>
		              </div>
		          </div>
		          <div className="row light-row flex-grow-1">
		              <div className="col-lg-12 ">
		              	<div className="container pt-3">
		              			<Search onSearchSuccess={this.searchSuccess} intl={this.props.intl}/>
		              		{this.state.passengerSelected && 
		              	
		        <Formik
		          initialValues={this.state.formValues}
		          enableReinitialize
		          validationSchema={currentValidationShema}
		          onSubmit={this.handleSubmit}
		          validateOnMount={true}
		          key={this.state.formKey}
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
		        }
}

export default injectIntl(HealthDesk)