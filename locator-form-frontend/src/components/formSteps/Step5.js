import React from "react"
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik, Form, Field, FieldArray, useField } from 'formik'
import { MyRadioInputGroup, MyTextInput, MySelect, MyPhoneInput, MyCheckbox, MyHiddenInput, StyledErrorMessage } from '../MyInputs'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { countriesList } from '../data/countries.json'

class Step5 extends React.Component {

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

			<div className="step" id="step5">
				<div id="sufferingInformation" className="section">
					<div className="row">
						<div className="col-xl-2 col-lg-4 form-group ">
							<Field name="fever">
								{({ field, form, meta }) =>
									<MySelect label={<FormattedMessage id="nav.item.fever" defaultMessage="Fever" />}
										name={field.name} form={form} placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										options={
											[
												{ "value": "true", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.yes' }) },
												{ "value": "false", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.no' }) },
											]}
									/>
								}
							</Field>
						</div>

						<div className="col-xl-2 col-lg-4 form-group ">
							<Field name="soreThroat">
								{({ field, form, meta }) =>
									<MySelect label={<FormattedMessage id="nav.item.soreThroat" defaultMessage="Sore Throat" />}
										name={field.name} form={form} placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										options={
											[
												{ "value": "true", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.yes' }) },
												{ "value": "false", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.no' }) },
											]}
									/>
								}
							</Field>
						</div>
						<div className="col-xl-2 col-lg-4 form-group ">
							<Field name="jointPain">
								{({ field, form, meta }) =>
									<MySelect label={<FormattedMessage id="nav.item.jointPain" defaultMessage="Joint Pain" />}
										name={field.name} form={form} placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										options={
											[
												{ "value": "true", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.yes' }) },
												{ "value": "false", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.no' }) },
											]}
									/>
								}
							</Field>
						</div>
						<div className="col-xl-2 col-lg-4 form-group ">
							<Field name="cough">
								{({ field, form, meta }) =>
									<MySelect label={<FormattedMessage id="nav.item.cough" defaultMessage="Cough" />}
										name={field.name} form={form} placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										options={
											[
												{ "value": "true", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.yes' }) },
												{ "value": "false", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.no' }) },
											]}
									/>
								}
							</Field>
						</div>
						<div className="col-xl-2 col-lg-4 form-group ">
							<Field name="breathingDifficulties">
								{({ field, form, meta }) =>
									<MySelect label={<FormattedMessage id="nav.item.breathingdifficulties" defaultMessage="Breathing Difficulties" />}
										name={field.name} form={form} placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										options={
											[
												{ "value": "true", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.yes' }) },
												{ "value": "false", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.no' }) },
											]}
									/>
								}
							</Field>
						</div>
						<div className="col-xl-2 col-lg-4 form-group ">
							<Field name="rash">
								{({ field, form, meta }) =>
									<MySelect label={<FormattedMessage id="nav.item.rash" defaultMessage="Rash" />}
										name={field.name} form={form} placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										options={
											[
												{ "value": "true", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.yes' }) },
												{ "value": "false", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.no' }) },
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
export default Step5