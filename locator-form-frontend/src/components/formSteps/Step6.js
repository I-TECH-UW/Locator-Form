import React from "react"
import { FormattedMessage } from 'react-intl'
import { Field } from 'formik'
import { MyTextInput, MySelect, MyPhoneInput } from '../inputs/MyInputs'
import { countriesList } from '../data/countries.json'

class Step6 extends React.Component {

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