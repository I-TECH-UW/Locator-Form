import React from "react"
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik, Form, Field, FieldArray, useField } from 'formik'
import { MyRadioInputGroup, MyTextInput, MySelect, MyPhoneInput, MyCheckbox, MyHiddenInput, StyledErrorMessage } from '../MyInputs'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { countriesList } from '../data/countries.json'

class Step8 extends React.Component {

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

			<div className="step" id="step8">
				<div id="emergencyContactInformation" className="section">
					<div className="row">
						<div className="col-lg-12 ">
							<h5> <FormattedMessage id="nav.item.emergencyContact" defaultMessage="Emergency Contact Information of someone who can reach you during the next 30 days" /></h5>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-3 form-group ">
							<MyTextInput
								label={<FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name" />}
								name="emergencyContact.lastName"
								type="text"
							/>
						</div>
						<div className="col-lg-3 form-group ">
							<MyTextInput
								label={<FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name" />}
								name="emergencyContact.firstName"
								type="text"
							/>
						</div>
						<div className="col-lg-3 form-group ">
							<MyTextInput
								label={<FormattedMessage id="nav.item.city" defaultMessage="City" />}
								name="emergencyContact.city"
								type="text"
							/>
						</div>
						<div className="col-lg-3 form-group ">
							<Field name="emergencyContact.country">
								{({ field, form, meta }) =>
									<MySelect label={<FormattedMessage id="nav.item.country" defaultMessage="Country" />}
										name={field.name} form={form} placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										options={countriesList} isSearchable={true}
									/>
								}
							</Field>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-6 form-group ">
							<MyTextInput
								label={<FormattedMessage id="nav.item.emailAddress" defaultMessage="Email Address" />}
								name="emergencyContact.email"
								type="text"
							/>
						</div>
						<div className="col-lg-6 form-group ">
							<Field name="emergencyContact.mobilePhone">
								{({ field, form, meta }) =>
									<MyPhoneInput
										label={<FormattedMessage id="nav.item.mobilePhone" defaultMessage="Mobile Phone" />}
										form={form} name="emergencyContact.mobilePhone"
									/>
								}
							</Field>
						</div>
					</div>
				</div>
			</div>
		</div>
	}

}
export default Step8