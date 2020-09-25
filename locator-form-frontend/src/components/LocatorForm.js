import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, FieldArray, useField, useFormikContext } from 'formik'
import styled from "@emotion/styled"
import { FormattedMessage, injectIntl } from 'react-intl'
import { countriesList } from './data/countries.json'
import MultiCapableSelect from "./MultiCapableSelect"
import { PhoneInputField } from './PhoneInputField'
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9, Confirmation, Success } from './formSteps'
import validationSchema from './formModel/validationSchema'
import formInitialValues from './formModel/formInitialValues'
import { Paper, CssBaseline } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress
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
    MuiLinearProgress: {
      root: {
        maxWidth: "100%",
        flexGrow: 1
      },
      progress: {
        width: "75%"
      },
      colorPrimary: {
        'background-color': '#aad4e3',
      },
      barColorPrimary: {
        'background-color': '#00aded',
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
    this.state = {
      activeStep: 0,
      submitErrorKey: '',
      isSubmitting: false,
      submitSuccess: false,
      labelContentPairs: {},
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
        return <Success formikProps={formikProps} intl={this.props.intl} labelContentPairs={this.state.labelContentPairs} />
      default:
        return <div>Not Found</div>
    }
  }

  submitForm = (values) => {
    this.setState({ isSubmitting: true })
    if (this.state.tempAddressSameAsPermAddress) {
      values.temporaryAddress = values.permanentAddress
      values.lengthOfStay = -1
    }
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
      const labelContentPairs = await response.json()
      if (response.ok) {
        this.onSuccess(labelContentPairs)
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
      this.submitForm(values)
    } else {
      this.setState({ activeStep: this.state.activeStep + 1 })
      actions.setTouched({})
      actions.setSubmitting(false)
    }
  }

  _handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 })
  }

  onSuccess = (labelContentPairs) => {
    this.setState({ 'submitSuccess': true, 'labelContentPairs': labelContentPairs })
  }


  render() {
    // const currentValidationShema = this.state.activeStep === 6 ? validationSchema[this.state.activeStep] : Yup.object().shape({})
    const  currentValidationShema = validationSchema[this.state.activeStep];
    return (
      <>
        {this.state.activeStep !== 10 &&
          <div className="jumbotron">
            <h1><FormattedMessage id="nav.item.header" defaultMessage="Public Health Passenger Locator Form" /></h1>
            <p> <FormattedMessage id="nav.item.topOfForm" defaultMessage="To protect your health, public health officers need you to complete this form whenever they suspect a communicable disease onboard a flight. Your information will help public health officers to contact you if you were exposed to a communicable disease. It is important to fill out this form completely and accurately. Your information is intended to be held in accordance with applicable laws and used only for public health purposes. ~Thank you for helping us to protect your health." /></p>
          </div>
        }
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
                  <h5><FormattedMessage id={steps[this.state.activeStep]} /></h5>
                }
              </div>
            </div>
            <div className="questions">
              {this._renderStepContent(this.state.activeStep, formikProps)}
              {this.state.activeStep < steps.length &&
                <div >
                  <button
                    disabled={this.state.activeStep === 0}
                    variant="contained"
                    type="button"
                    className="back-button"
                    onClick={this._handleBack}>
                    <FormattedMessage id="nav.item.back" defaultMessage="Back" />
                  </button>
                  <button
                    disabled={this.state.isSubmitting || !formikProps.dirty || !formikProps.isValid}
                    type="submit"
                    variant="contained"
                    className="next-button"
                  >
                    {steps.length - 1 === this.state.activeStep ? <FormattedMessage id="nav.item.next" defaultMessage="Submit" /> : <FormattedMessage id="nav.item.next" defaultMessage="Next" />}
                  </button>
                  {this.state.isSubmitting && (
                    <CircularProgress
                      size={24}
                    />
                  )}
                </div>}
            </div>
          </Form >
        )}
        </Formik>
      </>
    )
  }
}

export default injectIntl(LocatorForm)