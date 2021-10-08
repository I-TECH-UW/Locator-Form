import React from "react"
import { FormattedMessage } from 'react-intl'
import { Field } from 'formik'
import { MyTextInput, MySelect, MyHiddenInput } from '../inputs/MyInputs'
import { countriesList } from '../data/countries.js'

class Step8 extends React.Component {

	

	render() {
    	console.log("errors: " + JSON.stringify(this.props.formikProps.errors))
		return <div>

			<div className="step" id="step8">
				<div id="permanentAddressInformation" className="section">
					<div className="row">
						<div className="col-lg-12 ">
							<h5> <FormattedMessage id="nav.item.permanent Address" defaultMessage="Permanent Address" /></h5>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-4 form-group">
							<MyTextInput
								label={<FormattedMessage id="nav.item.numberAndStreet" defaultMessage="Number and Street" />}
								name="permanentAddress.numberAndStreet"
								requireField={this.props.formikProps.values.travellerType === 'resident' ? true : false}
								type="text"
							/>
						</div>
						<div className="col-lg-4 form-group">
							<MyTextInput
								label={<FormattedMessage id="nav.item.apartmentNumber" defaultMessage="Apartment Number" />}
								name="permanentAddress.apartmentNumber"
								type="text"
							/>
						</div>
						<div className="col-lg-4 form-group">
							<MyTextInput
								label={<FormattedMessage id="nav.item.city" defaultMessage="City" />}
								name="permanentAddress.city"
								requireField={false}
								type="text"
							/>
						</div>
					</div>
					{this.props.formikProps.values.travellerType !== 'resident' &&
						<div className="row">
							<div className="col-lg-4 form-group ">
								<MyTextInput
									label={<FormattedMessage id="nav.item.state/Province" defaultMessage="State/Province" />}
									name="permanentAddress.stateProvince"
									type="text"
								/>
							</div>
							<div className="col-lg-4 form-group ">
								<Field name="permanentAddress.country">
									{({ field, form, meta }) =>
										<MySelect label={<FormattedMessage id="nav.item.country" defaultMessage="Country" />}
											name={field.name} form={form} placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
											options={countriesList} isSearchable={true}
									requireField={this.props.formikProps.values.travellerType === 'resident' ? true : false}
										/>
									}
								</Field>
							</div>
							<div className="col-lg-4 form-group ">
								<MyTextInput
									label={<FormattedMessage id="nav.item.zipPostalCode" defaultMessage="Zip/Postal Code" />}
									name="permanentAddress.zipPostalCode"
									requireField={this.props.formikProps.values.travellerType === 'resident' ? true : false}
									type="text"
								/>
							</div>
						</div>
					}
				</div>

				<div id="temporaryAddressInformation" className="section">
					<div className="row">
						<div className="col-lg-12 ">
							<h5> <FormattedMessage id="nav.item.temporaryAddress" defaultMessage="Temporary Address (Quarantine site or hotel address)" /></h5>
						</div>
					</div>
					{/* <div className="row">
						<div className="col-lg-5 form-group ">
							<MyCheckbox name="tempAddrCheckbox" onClick={e => this.toggleTempAddress(this.props.formikProps)}>
								<FormattedMessage id="nav.item.tempAddrCheckbox" defaultMessage="Temporary Address Same as Permanent Address" />
							</MyCheckbox>
						</div>
					</div> */}
					{this.props.formikProps.values.travellerType !== 'resident' &&
						<div className="row">
							<div className="col-lg-4 form-group ">
								<MyTextInput
									label={<FormattedMessage id="nav.item.proposedLengthOfStay" defaultMessage="Proposed Length of Stay in Mauritius (days)" />}
									name="lengthOfStay"
									keyboardType="numeric"
									type="text"
									requireField={true}
								/>
							</div>
						</div>
					}
					<div className="row">
						<div className="col-lg-5 form-group ">
							<MyTextInput
								label={<FormattedMessage id="nav.item.hotelName" defaultMessage="Hotel Name" />}
								name="temporaryAddress.hotelName"
								type="text"
								requireField={false}
							/>
						</div>
						<div className="col-lg-5 form-group ">
							<MyTextInput
								label={<FormattedMessage id="nav.item.numberAndStreet" defaultMessage="Number and Street" />}
								name="temporaryAddress.numberAndStreet"
								type="text"
								requireField={false}
							/>
						</div>
						<div className="col-lg-2 form-group ">
							<MyTextInput
								label={<FormattedMessage id="nav.item.apartmentNumber" defaultMessage="Apartment Number" />}
								name="temporaryAddress.apartmentNumber"
								type="text"
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-6 form-group ">
							<MyHiddenInput
								name="temporaryAddress.country"
								type="hidden"
							/>
						</div>
						{/* <div className="col-lg-4 form-group ">
				<MySelect
					label={<FormattedMessage id="nav.item.country" defaultMessage="Country" />}
					name="temporaryAddress.country"
				>
					<option value=""></option>
					<MyCountryOptions/>
				</MySelect>
				</div> */}
						{/* <div className="col-lg-4 form-group ">
				<MyTextInput
					label={<FormattedMessage id="nav.item.zipPostalCode" defaultMessage="Zip/Postal Code" />}
					name="temporaryAddress.zipPostalCode"
					type="text"
				/>
				</div> */}
					</div>
				</div>
			</div>
		</div >
	}

}
export default Step8