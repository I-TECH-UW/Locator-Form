import React from "react"
import { FormattedMessage } from 'react-intl'
import { Field } from 'formik'
import { MyTextInput, MySelect, MyPhoneInput } from '../inputs/MyInputs'
import { countriesList } from '../data/countries.js'

class Step7 extends React.Component {

	state = {
			value: { label: this.props.val, value: this.props.val },
	}
	
	handleChange(value) {
		this.setState({ value: value });
	}
	getDefaultCountryCode = () => {
		return this.props.formikProps.values.travellerType === 'resident' ? 'MU' : 'US';
	}

	render() {
		return <div>
			<div className="step" id="step7">
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
										defaultCountryCode={this.getDefaultCountryCode()} form={form} name="mobilePhone"
									/>
								}
							</Field>
						</div>
						<div className="col-lg-4 form-group ">
							<Field name="fixedPhone">
								{({ field, form, meta }) =>
									<MyPhoneInput
										label={<FormattedMessage id="nav.item.fixedPhone" defaultMessage="Fixed Phone" />}
										defaultCountryCode={this.getDefaultCountryCode()}
										form={form} name="fixedPhone"
									/>
								}
							</Field>
						</div>
						<div className="col-lg-4 form-group ">
						<Field name="businessPhone">
							{({ field, form, meta }) =>
								<MyPhoneInput
									label={<FormattedMessage id="nav.item.businessPhone" defaultMessage="Business Phone" />}
									defaultCountryCode={this.getDefaultCountryCode()}
									form={form} name="businessPhone"
								/>
							}
						</Field>
					</div>
					</div>
					<div className="row">
						<div className="col-lg-4 form-group ">

							<MyTextInput
								label={<FormattedMessage id="nav.item.emailAddress" defaultMessage="Email Address" />}
								requireField={true}
								name="email"
								type="email"
							/>
						</div>
						<div className="col-lg-4 form-group ">
							<MyTextInput
								requireField={true}
								label={<FormattedMessage id="nav.item.confirmEmailAddress" defaultMessage="Confirm Email Address" />}
								name="confirmEmail"
								type="email"
							/>
						</div>
								
						<div className="col-lg-4 form-group ">
							<Field className="form-control"
								name={`passengerNationality`}
							>
								{({ field, form, meta }) =>
									<MySelect form={form}
										name={field.name}
										requireField={true}
										onChange={value => this.handleChange(value)}
										options={countriesList}
										isMulti={true}
										isSearchable={true}
										placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										label={<FormattedMessage id="nav.item.nationality" defaultMessage="Nationality" />}
									/>}
							</Field>
						</div>
					</div>
					<div className="row">
								
					<div className="col-lg-3 form-group ">
					<Field className="form-control"
						name={`countryOfBirth`}
					>
					
                    {({ field, form, meta }) =>
                            <MySelect form={form}
                                    name={field.name}
                                    requireField={true}
                                    onChange={value => this.handleChange(value)}
                                    options={countriesList}
                                    isSearchable={true}
                                    placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
                                    label={<FormattedMessage id="nav.item.countryOfBirth" defaultMessage="Country of Birth" />}
                            />}
                    </Field>
                                    
					</div>			
					
						<div className="col-lg-3 form-group ">
						<Field className="form-control"
							name={`countryOfPassportIssue`}
						>
						
                        {({ field, form, meta }) =>
                                <MySelect form={form}
                                        name={field.name}
                                        requireField={true}
                                        onChange={value => this.handleChange(value)}
                                        options={countriesList}
                                        isSearchable={true}
                                        placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
                                        label={<FormattedMessage id="nav.item.countryOfPassportIssue" defaultMessage="Passport Country of Issue" />}
                                />}
                        </Field>
                                        
						</div>
						<div className="col-lg-3 form-group ">
							<MyTextInput
								requireField={true}
								label={<FormattedMessage id="nav.item.passportNumber" defaultMessage="Passport Number" />}
								name="passportNumber"
								type="text"
							/>
						</div>
								
								 <div className="col-lg-3 form-group">
									<MyTextInput
									label={<FormattedMessage id="nav.item.dateOfExpiry" defaultMessage="Date Of Expiry" />}
									name="passportExpiryDate"
									requireField={true}
									type="date"
									placeholder={this.props.intl.formatMessage({ id: 'date.format' })}
								/>
						  </div>		
								
					</div>
				</div >
			</div>
		</div>
	}

}
export default Step7