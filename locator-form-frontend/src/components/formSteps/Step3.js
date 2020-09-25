import React from "react"
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik, Form, Field, FieldArray, useField } from 'formik'
import { MyRadioInputGroup, MyTextInput, MySelect, MyPhoneInput, MyCheckbox, MyHiddenInput, StyledErrorMessage } from '../MyInputs'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { countriesList } from '../data/countries.json'

class Step3 extends React.Component {

	constructor(props) {
		super(props)
		const { travellerType } = this.props.formikProps.values
		this.state = {
			submitErrorKey: '',
			tempAddressSameAsPermAddress: false,
			travellerType: travellerType
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
			<div className="step" id="step3">
				<div id="personalInformation" className="section">
					{this.state.travellerType === 'resident' &&
						<div className="row">
							<div className="col-lg-4 form-group">
								<MyTextInput
									label={<FormattedMessage id="nav.item.nationalId" defaultMessage="National ID" />}
									name="nationalID"
									type="text"
								/>
							</div>
						</div>
					}

					<div className="row">
						<div className="col-lg-2 form-group">
							<Field name="title">
								{({ field, form, meta }) =>
									<MySelect label={<FormattedMessage id="nav.item.title" defaultMessage="Title" />}
										name="title" form={form} placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										options={
											[
												{ "value": "mr", "label": this.props.intl.formatMessage({ id: 'nav.item.title.option.mr' }) },
												{ "value": "mrs", "label": this.props.intl.formatMessage({ id: 'nav.item.title.option.mrs' }) },
												{ "value": "miss", "label": this.props.intl.formatMessage({ id: 'nav.item.title.option.miss' }) },
												{ "value": "dr", "label": this.props.intl.formatMessage({ id: 'nav.item.title.option.dr' }) },
											]}
									/>
								}
							</Field>
						</div>
						<div className="col-lg-4 form-group">

							<MyTextInput
								label={<FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name" />}
								name="lastName"
								type="text"
							/>
						</div>
						<div className="col-lg-4 form-group">
							<MyTextInput
								label={<FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name" />}
								name="firstName"
								type="text"
							/>
						</div>
						<div className="col-lg-2 form-group">

							<MyTextInput
								label={<FormattedMessage id="nav.item.middleInitial" defaultMessage="Middle Initial" />}
								name="middleInitial"
								type="text"
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-2 form-group">
							<Field name="sex">
								{({ field, form, meta }) =>
									<MySelect label={<FormattedMessage id="nav.item.sex" defaultMessage="Sex" />}
										name={field.name} form={form} placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										options={
											[
												{ "value": "male", "label": this.props.intl.formatMessage({ id: 'nav.item.sex.option.male' }) },
												{ "value": "female", "label": this.props.intl.formatMessage({ id: 'nav.item.sex.option.female' }) },
											]}
									/>
								}
							</Field>
						</div>
						<div className="col-lg-3 form-group">
							<MyTextInput
								label={<FormattedMessage id="nav.item.dateOfBirth" defaultMessage="Date Of Birth" />}
								name="dateOfBirth"
								type="date"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	}

}
export default Step3