import React from "react"
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik, Form, Field, FieldArray, useField } from 'formik'
import { MyRadioInputGroup } from '../MyInputs'

// workaround for conditional validation in permanent address
const onInputChange = (e, form) => {
  form.handleChange(e);
  form.setFieldValue('permanentAddress.travellerType', e.target.value);
  form.setFieldValue('travellerType', e.target.value);
}

class Step1 extends React.Component {

	render() {
		return <>
		<div className="step" id="step1">
			<div id="passengerTypeInformation" className="section">
				<div className="row">
					<div className="col-lg-10 form-group">
						<MyRadioInputGroup
							label={<FormattedMessage id="nav.item.travellerTypeQuestion" defaultMessage="Are you a Resident, or Non-Resident of Mauritius?" />}
							name="travellerType"
							onChange={ e => {
								onInputChange(e, this.props.formikProps)}
							}
							values={{ resident: 'nav.item.resident', nonresident: 'nav.item.nonresident' }}
						/>
					</div>
				</div>
			</div>
		</div>
		</>
	}
}


export default Step1