import React from "react"
import { FormattedMessage } from 'react-intl'
import { Field } from 'formik'
import { MyTextInput, MySelect, MyHiddenInput , MyCheckbox ,MyPhoneInput} from '../inputs/MyInputs'
import { countriesList } from '../data/countries.js'
import {getHotelAddress ,hotelList } from '../data/hotels'

class Step8 extends React.Component {
	getDefaultCountryCode = () => {
		return this.props.formikProps.values.travellerType === 'resident' ? 'MU' : 'US';
	}
  
	render() {
    	console.log("errors: " + JSON.stringify(this.props.formikProps.errors))
		const hotelSearch = this.props.formikProps.values.hotelSearchCheck
		const hotel =  this.props.formikProps.values.temporaryAddress.hotelName
		const address = this.props.formikProps.values.temporaryAddress.numberAndStreet
	    this.props.formikProps.values.temporaryAddress.numberAndStreet = hotelSearch ? address : getHotelAddress(hotel)
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
								disabled={this.props.disabled}
							/>
						</div>
						<div className="col-lg-4 form-group">
							<MyTextInput
								label={<FormattedMessage id="nav.item.apartmentNumber" defaultMessage="Apartment Number" />}
								name="permanentAddress.apartmentNumber"
								type="text"
								disabled={this.props.disabled}
							/>
						</div>
						<div className="col-lg-4 form-group">
							<MyTextInput
								label={<FormattedMessage id="nav.item.city" defaultMessage="City" />}
								name="permanentAddress.city"
								requireField={false}
								type="text"
								disabled={this.props.disabled}
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
									disabled={this.props.disabled}
								/>
							</div>
							<div className="col-lg-4 form-group ">
								<Field name="permanentAddress.country">
									{({ field, form, meta }) =>
										<MySelect label={<FormattedMessage id="nav.item.country" defaultMessage="Country" />}
											name={field.name} form={form} placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
											options={countriesList} isSearchable={true}
									requireField={this.props.formikProps.values.travellerType === 'resident' ? true : false}
									disabled={this.props.disabled}
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
									disabled={this.props.disabled}
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
							<MyCheckbox name="tempAddrCheckbox"
								disabled={this.props.disabled} onClick={e => this.toggleTempAddress(this.props.formikProps)}>
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
									disabled={this.props.disabled}
								/>
							</div>
						</div>
					}
					<div className="row">
						<div className="col-lg-5 form-group ">
						{!hotelSearch  &&
							<Field name="temporaryAddress.hotelName">
								{({ field, form, meta }) =>
									<MySelect label={<FormattedMessage id="nav.item.hotelName" defaultMessage="Hotel Name" />}
										name={field.name} 
										form={form}
										requireField={false} 
										isSearchable={true}
										placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										options={hotelList}
										disabled={this.props.disabled}
									/>
								}
							</Field>
                          }
						  {hotelSearch &&
							<MyTextInput
								label={<FormattedMessage id="nav.item.hotelName" defaultMessage="Hotel Name" />}
								name="temporaryAddress.hotelName"
								type="text"
								requireField={false}
								disabled={this.props.disabled}
							/>
						  }
						</div>
						<div className="col-lg-5 form-group ">
							<MyTextInput
								label={<FormattedMessage id="nav.item.numberAndStreet" defaultMessage="Number and Street" />}
								name="temporaryAddress.numberAndStreet"
								type="text"
								requireField={false}
								disabled={this.props.disabled}
							/>
						</div>
						<div className="col-lg-2 form-group ">
							<MyTextInput
								label={<FormattedMessage id="nav.item.apartmentNumber" defaultMessage="Apartment Number" />}
								name="temporaryAddress.apartmentNumber"
								type="text"
								disabled={this.props.disabled}
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

					   <div className="col-lg-6 form-group ">
							<MyHiddenInput
								name="temporaryAddress.country"
								type="hidden"
							/>
					   </div>
					   <div className="col-lg-4 form-group ">
							<Field name="temporaryAddress.localPhone">
								{({ field, form, meta }) =>
									<MyPhoneInput
										label={<FormattedMessage id="nav.item.localPhone" defaultMessage="Local Phone" />}
										defaultCountryCode={this.getDefaultCountryCode()}
										form={form} name="temporaryAddress.localPhone"
										disabled={this.props.disabled}
									/>
								}
							</Field>
						</div>
					   <div className="col-lg-4 form-group">
							<MyCheckbox
								className="required-field-field" name="hotelSearchCheck"
								disabled={this.props.disabled}>
								<FormattedMessage id="nav.item.noHotel" defaultMessage="I am not staying at a hotel / my hotel isn't listed" 
								/>						   		
							</MyCheckbox>
						</div>
						
						{/* <div className="col-lg-4 form-group ">
				<MySelect
					label={<FormattedMessage id="nav.item.country" defaultMessage="Country" />}
					name="temporaryAddress.country"
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