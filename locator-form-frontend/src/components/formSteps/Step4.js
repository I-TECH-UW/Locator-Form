import React from "react"
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik, Form, Field, FieldArray, useField } from 'formik'
import { MyRadioInputGroup, MyTextInput, MySelect, MyPhoneInput, MyCheckbox, MyHiddenInput, StyledErrorMessage } from '../MyInputs'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { countriesList } from '../data/countries.json'

class Step4 extends React.Component {

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

			<div className="step" id="step4">
				<div id="healthInformation" className="section">
					<div className="row">
						<div className="col-lg-4 form-group ">
							<Field name="countriesVisited">
								{({ field, form, meta }) =>
									<MySelect form={form}
										name={field.name}
										options={countriesList}
										isMulti={true}
										isSearchable={true}
										placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										label={<FormattedMessage id="nav.item.countriesVisited" defaultMessage="Countries visited during last 6 months" />}
									/>}
							</Field>
						</div>
						<div className="col-lg-4 form-group ">
							<MyTextInput
								label={<FormattedMessage id="nav.item.portOfEmbarkation" defaultMessage="Port Of Embarkation (ie Airport Code)" />}
								name="portOfEmbarkation"
								type="text"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	}

}
export default Step4