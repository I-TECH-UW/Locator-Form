import React from "react"
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik, Form, Field, FieldArray, useField } from 'formik'
import { MyRadioInputGroup, MyTextInput, MySelect, MyPhoneInput, MyCheckbox, MyHiddenInput, StyledErrorMessage } from '../MyInputs'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { countriesList } from '../data/countries.json'

class Step6 extends React.Component {

	constructor(props) {
    super(props)
    this.state = {
      submitErrorKey: '',
      tempAddressSameAsPermAddress: false
    }
  }


  toggleTempAddress = (formik) => {
	var previousValue = this.state.tempAddressSameAsPermAddress
	this.setState({tempAddressSameAsPermAddress: !previousValue});
	if (previousValue) {
		formik.values.temporaryAddress.hotelName = "";
		formik.values.temporaryAddress.numberAndStreet = "";
		formik.values.temporaryAddress.apartmentNumber = "";
		formik.values.temporaryAddress.city = "";
		formik.values.temporaryAddress.stateProvince = "";
		formik.values.temporaryAddress.country = "";
	} else {
		// These values are just to pass the validation. 
		// Actual values are copied into form at submit time from permanentAddress
		formik.values.temporaryAddress.hotelName = "N/A";
		formik.values.temporaryAddress.numberAndStreet = "N/A";
		formik.values.temporaryAddress.apartmentNumber = "N/A";
		formik.values.temporaryAddress.city = "N/A";
		formik.values.temporaryAddress.stateProvince = "N/A";
		formik.values.temporaryAddress.country = "N/A";
	}

  }
  
	render() {
		return <div>

			<div className="step" id="step6">
				<div id="contactInformation" className="section">
					<div className="row">
						<div className="col-lg-12 ">
							<h5> <FormattedMessage id="nav.item.phoneNumbers" defaultMessage="Phone Number(s) Where you can be reached if needed? Include country code and city code." /> </h5>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-4 form-group ">
							<Field name="mobilePhone">
								{({ field, form, meta }) =>
									<MyPhoneInput
										label={<FormattedMessage id="nav.item.mobilePhone" defaultMessage="Mobile Phone" />}
										form={form} name="mobilePhone"
									/>
								}
							</Field>
						</div>
						<div className="col-lg-4 form-group ">
							<Field name="businessPhone">
								{({ field, form, meta }) =>
									<MyPhoneInput
										label={<FormattedMessage id="nav.item.businessPhone" defaultMessage="Business Phone" />}
										form={form} name="businessPhone"
									/>
								}
							</Field>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-3 form-group ">

							<MyTextInput
								label={<FormattedMessage id="nav.item.emailAddress" defaultMessage="Email Address" />}
								name="email"
								type="email"
							/>
						</div>
						<div className="col-lg-3 form-group ">
							<MyTextInput
								label={<FormattedMessage id="nav.item.confirmEmailAddress" defaultMessage="Confirm Email Address" />}
								name="confirmEmail"
								type="email"
							/>
						</div>
						<div className="col-lg-3 form-group ">
							<Field name="nationality">
								{({ field, form, meta }) =>
									<MySelect form={form}
										name={field.name}
										options={countriesList}
										isSearchable={true}
										placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										label={<FormattedMessage id="nav.item.nationality" defaultMessage="Nationality" />}
									/>}
							</Field>
						</div>
						<div className="col-lg-3 form-group ">
							<MyTextInput
								label={<FormattedMessage id="nav.item.passportNumber" defaultMessage="Passport Number" />}
								name="passportNumber"
								type="text"
							/>
						</div>
					</div>
				</div >
			</div>
		</div>
	}

}
export default Step6