import React from "react"
import { FormattedMessage } from 'react-intl'
import { Field,  } from 'formik'
import { MyTextInput, MySelect, MyPhoneInput } from '../inputs/MyInputs'
import { countriesList } from '../data/countries.json'

class Step8 extends React.Component {

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
								requireField={true}
								type="text"
							/>
						</div>
						<div className="col-lg-3 form-group ">
							<MyTextInput
								label={<FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name" />}
								name="emergencyContact.firstName"
								requireField={true}
								type="text"
							/>
						</div>
						<div className="col-lg-3 form-group ">
							<MyTextInput
								label={<FormattedMessage id="nav.item.city" defaultMessage="City" />}
								name="emergencyContact.city"
								requireField={true}
								type="text"
							/>
						</div>
						<div className="col-lg-3 form-group ">
							<Field name="emergencyContact.country">
								{({ field, form, meta }) =>
									<MySelect label={<FormattedMessage id="nav.item.country" defaultMessage="Country" />}
										name={field.name} form={form} placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										options={countriesList} isSearchable={true}
										requireField={true}
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
								requireField={true}
							/>
						</div>
						<div className="col-lg-6 form-group ">
							<Field name="emergencyContact.mobilePhone">
								{({ field, form, meta }) =>
									<MyPhoneInput
										requireField={true}
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