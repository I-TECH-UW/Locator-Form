import React from 'react'
import { Formik, Form } from 'formik'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9, Confirmation, Success } from './formSteps'
import validationSchema from './formModel/validationSchema'
import formInitialValues from './formModel/formInitialValues'
import {
  createMuiTheme,
  MobileStepper,
  CircularProgress, 
  MuiThemeProvider
} from '@material-ui/core'

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

class LocatorForm extends React.Component {

  constructor(props) {
    super(props)
    this.topOfQuestionsRef = React.createRef();
    this.state = {
      activeStep: 0,
      submitErrorKey: '',
      isSubmitting: false,
      submitSuccess: false,
      summaryAccessInfo: {},
    }
  }

  _renderStepContent(step, formikProps) {
    switch (step) {
      case 0:
        return <Step1 formikProps={formikProps} intl={this.props.intl} />
      case 1:
        return <Step2 formikProps={formikProps} intl={this.props.intl} />
      case 2:
        return <Step3 formikProps={formikProps} intl={this.props.intl} />
      case 3:
        return <Step4 formikProps={formikProps} intl={this.props.intl} />
      case 4:
        return <Step5 formikProps={formikProps} intl={this.props.intl} />
      case 5:
        return <Step6 formikProps={formikProps} intl={this.props.intl} />
      case 6:
        return <Step7 formikProps={formikProps} intl={this.props.intl} />
      case 7:
        return <Step8 formikProps={formikProps} intl={this.props.intl} />
      case 8:
        return <Step9 formikProps={formikProps} intl={this.props.intl} />
      case 9:
        return <Confirmation formikProps={formikProps} intl={this.props.intl} />
      case 10:
        return <Success formikProps={formikProps} intl={this.props.intl} summaryAccessInfo={this.state.summaryAccessInfo} />
      default:
        return <div>Not Found</div>
    }
  }

  submitForm = (values) => {
    this.setState({ isSubmitting: true })
    var json = JSON.stringify(values)
    console.log(json)
    fetch(`${process.env.REACT_APP_DATA_IMPORT_API}/locator-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: json
    }).then(async response => {
      this.setState({ submitting: false })
      const summaryAccessInfo = await response.json()
      if (response.ok) {
        this.onSuccess(summaryAccessInfo)
        this.setState({ activeStep: this.state.activeStep + 1 })
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
    if (steps.length - 1 === this.state.activeStep) {
      this.submitForm(values);
    } else {
      this.setState({ 
        activeStep: this.state.activeStep + 1,
      })
      var json = JSON.stringify(values)
      console.log(json);
      actions.setTouched({});
      actions.setSubmitting(false);
      this.scrollToTopOfQuestionsRef();
    }
  }

  _handleBack = (formikProps) => {
    this.setState({ 
      activeStep: this.state.activeStep - 1 ,
    })
    formikProps.setErrors({})
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

  render() {
    const currentValidationShema = validationSchema[this.state.activeStep];
    // const  currentValidationShema = this.state.activeStep === 11 - 1 ? validationSchema[this.state.activeStep] : validationSchema[20];
    console.log('step: ' + this.state.activeStep)
    return (
      <>
        <div className="container-fluid d-flex min-vh-100 flex-column content">
          <div className="row dark-row">
              <div className="col-lg-12 ">
                <div className="container pt-3">
                  {this.state.activeStep !== 10 && 
                	<div class="container">  
                  		<h3 className="question-header">
                  		<FormattedMessage id="nav.item.header" defaultMessage="Public Health Passenger Locator Form" /></h3>
                  		<p> <FormattedMessage id="nav.item.topOfForm" defaultMessage="To protect your health, public health officers need you to complete this form whenever they suspect a communicable disease onboard a flight. Your information will help public health officers to contact you if you were exposed to a communicable disease. It is important to fill out this form completely and accurately. Your information is intended to be held in accordance with applicable laws and used only for public health purposes. ~Thank you for helping us to protect your health. " /></p> 
                  		<p> <FormattedMessage id="nav.item.topOfFormNote1" defaultMessage="Note: The data collected from the Locator Form, either online or on arrival at the SSR International Airport, Plaisance, is solely used for the purpose of screening infectious diseases, including COVID-19 public health surveillance. The legal basis for using and processing personal information is in accordance with the Data Protection Act 2017. Passengers’ personal data will be retained for a minimum period of 2 years or more depending on the duration of the COVID-19 pandemic and other infectious diseases. One year after this period, the passengers’ personal data will be destroyed. " /></p>
                  		<p> <FormattedMessage id="nav.item.topOfFormNote2" defaultMessage="It is strongly recommended to fill the locator form prior to your travel date in order to avoid any administrative delays at the Airport." /></p>
                    </div>
                  }
                </div>
              </div>
          </div>
          <div className="row light-row flex-grow-1" ref={this.topOfQuestionsRef}>
              <div className="col-lg-12 ">
          <div className="container pt-3">
        {this.state.activeStep < steps.length &&
          <MuiThemeProvider theme={muiMobileTheme}>
            <MobileStepper variant="progress" className="stepper" steps={steps.length} activeStep={this.state.activeStep} position="static" />
          </MuiThemeProvider>}
        {/* <MuiThemeProvider theme={muiTheme}>
        <Stepper alternativeLabel className="stepper" activeStep={this.state.activeStep} >
          {steps.map((labelKey, index) => (
            <Step key={labelKey}>
              <StepLabel>{this.state.activeStep === index && <FormattedMessage id={labelKey}  />}</StepLabel>
            </Step>
          ))}
        </Stepper>
        </MuiThemeProvider> */}
        <Formik
          initialValues={formInitialValues}
          validationSchema={currentValidationShema}
          onSubmit={this.handleSubmit}
        >{formikProps => (
          <Form>
            <div className="row">
              <div className="col-lg-12 ">
                {this.state.activeStep < steps.length &&
                  <h4 className="question-header">
                      <FormattedMessage id={steps[this.state.activeStep]} />
                  </h4>
                }
              </div>
            </div>
            <div className="questions" id="questions">
              {this._renderStepContent(this.state.activeStep, formikProps)}
              {this.state.activeStep < steps.length &&
                <div >
                  <button
                    disabled={this.state.activeStep === 0}
                    type="button"
                    className="back-button"
                    onClick={() => this._handleBack(formikProps)}>
                    <FormattedMessage id="nav.item.back" defaultMessage="Back" />
                  </button>
                  <button
                    disabled={this.state.isSubmitting || !formikProps.isValid || !formikProps.dirty }
                    type="submit"
                    className={steps.length - 1 === this.state.activeStep ? 'confirm-button' : 'next-button'}
                  >
                    {steps.length - 1 === this.state.activeStep ? <FormattedMessage id="nav.item.submit" defaultMessage="Submit" /> : <FormattedMessage id="nav.item.next" defaultMessage="Next" />}
                  </button>
                  {this.state.isSubmitting && (
                    <CircularProgress
                      size={24}
                    />
                  )}
                  {this.state.submitErrorKey &&
                    <div className="error"><FormattedMessage id={this.state.submitErrorKey} defaultMessage="Error"/></div>
                  }
                </div>}
            </div>
          </Form >
        )}
        </Formik>
      </div>
      </div>
      </div>
      </div>
      </>
    )
  }
}

export default injectIntl(LocatorForm)