import React from "react"
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik, Form, Field, FieldArray, useField } from 'formik'
import { MyRadioInputGroup, MyTextInput, MySelect, MyPhoneInput, MyCheckbox, MyHiddenInput, StyledErrorMessage } from '../MyInputs'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { countriesList } from '../data/countries.json'

class Step2 extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			submitErrorKey: '',
			tempAddressSameAsPermAddress: false
		}
	}


	toggleTempAddress = (formik) => {
		var previousValue = this.state.tempAddressSameAsPermAddress
		this.setState({ tempAddressSameAsPermAddress: !previousValue })
		if (previousValue) {
			formik.values.temporaryAddress.hotelName = ""
			formik.values.temporaryAddress.numberAndStreet = ""
			formik.values.temporaryAddress.apartmentNumber = ""
			formik.values.temporaryAddress.city = ""
			formik.values.temporaryAddress.stateProvince = ""
			formik.values.temporaryAddress.country = ""
		} else {
			// These values are just to pass the validation. 
			// Actual values are copied into form at submit time from permanentAddress
			formik.values.temporaryAddress.hotelName = "N/A"
			formik.values.temporaryAddress.numberAndStreet = "N/A"
			formik.values.temporaryAddress.apartmentNumber = "N/A"
			formik.values.temporaryAddress.city = "N/A"
			formik.values.temporaryAddress.stateProvince = "N/A"
			formik.values.temporaryAddress.country = "N/A"
		}

	}

	render() {
		return <div>

			<div className="step" id="step2">
				<div id="flightInformation" className="section">
					<div className="row">
						<div className="col-lg-4 form-group">
							<MyTextInput
								label={<FormattedMessage id="nav.item.airline" defaultMessage="Airline" />}
								name="airlineName"
								type="text"
							/>
						</div>
						<div className="col-lg-4 form-group">
							<MyTextInput
								label={<FormattedMessage id="nav.item.flightNumber" defaultMessage="Flight" />}
								name="flightNumber"
								type="text"
							/>
						</div>
						<div className="col-lg-4  form-group">
							<MyTextInput
								label={<FormattedMessage id="nav.item.seat" defaultMessage="Seat" />}
								name="seatNumber"
								type="text"
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-4  form-group">
							<MyTextInput
								label={<FormattedMessage id="nav.item.dateOfArrival" defaultMessage="Date Of Arrival" />}
								name="arrivalDate"
								type="date"
							/>
						</div>
						<div className="col-lg-4 form-group ">
							<Field name="visitPurpose">
								{({ field, form, meta }) =>
									<MySelect label={<FormattedMessage id="nav.item.purposeOfVisit" defaultMessage="Purpose of Visit" />}
										name={field.name} form={form} placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										options={
											[
												{ "value": "business", "label": this.props.intl.formatMessage({ id: 'nav.item.purposeOfVisit.option.business' }) },
												{ "value": "pleasure", "label": this.props.intl.formatMessage({ id: 'nav.item.purposeOfVisit.option.pleasure' }) },
												{ "value": "other", "label": this.props.intl.formatMessage({ id: 'nav.item.purposeOfVisit.option.other' }) },
											]}
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
export default Step2