import React from "react"
import { FormattedMessage, injectIntl } from 'react-intl'
import { Field, useFormikContext } from 'formik'
import { MyRadioInputGroup, MyTextInput, MySelect, MyPhoneInput, MyCheckbox, MyHiddenInput, StyledErrorMessage } from '../MyInputs'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { countriesList } from '../data/countries.json'
import { StepContent } from "@material-ui/core"

class Success extends React.Component {

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

		var Barcode = require('react-barcode')
		return (<div>
			<div className="row">
				<div className="col-lg-12 success-large text-center">
					<FormattedMessage id="submit.success.msg" defaultMessage="Thank you for filling out our online form. Please monitor your email for any further instructions. If you do not receive an email, please print or save this page somewhere you can access when you land in Mauritius " />
				</div>
			</div>
			{this.props.labelContentPairs.map(function (labelContentPair) {
				return (
					<div className="row">
						<div className="col-lg-12 ">
							<h5>{labelContentPair.label}:</h5>
							<Barcode value={labelContentPair.barcodeContent} />
						</div>
					</div>)
			})}
		</div>
		)
	}

}
export default Success