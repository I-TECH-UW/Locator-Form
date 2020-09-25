import React from "react"
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik, Form, Field, FieldArray, useField } from 'formik'
import { MyRadioInputGroup, MyTextInput, MySelect, MyPhoneInput, MyCheckbox, MyHiddenInput, StyledErrorMessage } from '../MyInputs'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { countriesList } from '../data/countries.json'

class Step9 extends React.Component {

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
			<div className="step" id="step9">
				<div id="travelCompanionsInformation" className="section">
					<div className="row">
						<div className="col-lg-12 ">
							<h5> <FormattedMessage id="nav.item.travelCompanionsFamily" defaultMessage="Travel Companions Family" /></h5>
						</div>
					</div>
					<FieldArray
						name="familyTravelCompanions"
						render={({ remove, push }) => (

							<div className="travelCompanion">
								{this.props.formikProps.values.familyTravelCompanions.length > 0 &&
									this.props.formikProps.values.familyTravelCompanions.map((comp, index) => (
										<div key={index}>

											<div className="row">
												<div className="col-lg-4 form-group ">
													<Field className="form-control"
														name={`familyTravelCompanions.${index}.lastName`}>
														{({ field, form, meta }) =>
															<MyTextInput
																label={<FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name" />}
																name={field.name}
																type="text"
															/>
														}
													</Field>
												</div>
												<div className="col-lg-4 form-group ">
													<Field className="form-control"
														name={`familyTravelCompanions.${index}.firstName`}
													>
														{({ field, form, meta }) =>
															<MyTextInput
																label={<FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name" />}
																name={field.name}
																type="text"
															/>
														}
													</Field>
												</div>
												<div className="col-lg-2 form-group ">
													<Field name={`familyTravelCompanions.${index}.sex`}>
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
											</div>
											<div className="row">
												<div className="col-lg-2 ">
													<Field className="form-control"
														name={`familyTravelCompanions.${index}.seatNumber`}
													>
														{({ field, form, meta }) =>
															<MyTextInput
																label={<FormattedMessage id="nav.item.seat" defaultMessage="Seat" />}
																name={field.name}
																type="text"
															/>
														}
													</Field>
												</div>
												<div className="col-lg-3 form-group ">
													<Field className="form-control"
														name={`familyTravelCompanions.${index}.dateOfBirth`}>
														{({ field, form, meta }) =>
															<MyTextInput
																label={<FormattedMessage id="nav.item.dateOfBirth" defaultMessage="Date Of Birth" />}
																name={field.name}
																type="date"
															/>
														}
													</Field>
												</div>

												<div className="col-lg-3 form-group ">
													<Field className="form-control"
														name={`familyTravelCompanions.${index}.nationality`}
													>
														{({ field, form, meta }) =>
															<MySelect form={form}
																name={field.name}
																options={countriesList}
																isSearchable={true}
																placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
																label={<FormattedMessage id="nav.item.nationality" defaultMessage="Nationality" />}
															/>
														}
													</Field>
												</div>
												<div className="col-lg-3 form-group ">
													<Field className="form-control"
														name={`familyTravelCompanions.${index}.passportNumber`}>
														{({ field, form, meta }) =>
															<MyTextInput
																label={<FormattedMessage id="nav.item.passportNumber" defaultMessage="Passport Number" />}
																name={field.name}
																type="text"
															/>
														}
													</Field>
												</div>
												<div className="col-lg-1 ">
													<button
														type="button"
														className="secondary"
														onClick={() => remove(index)}
													>
														X
				</button>
												</div>
											</div>
										</div>

									))}

								<button
									type="button"
									className="secondary"
									onClick={() => push({
										lastName: "",
										firstName: "",
										middleInitial: "",
										seatNumber: "",
										dateOfBirth: "",
										sex: "",
										nationality: "",
										passportNumber: "",
									})}
								>
									<FormattedMessage id="nav.item.addTravelCompanionFamily" defaultMessage="Add Travel Companion Family" />
								</button>
							</div>
						)
						}
					/>
				</div >
				<div id="nonFamilyTravelCompanionInformation" className="section">

					<div className="row">
						<div className="col-lg-12 ">
							<h5> <FormattedMessage id="nav.item.travelCompanionsNonFamily" defaultMessage="Travel Companions Non-Family" /></h5>
						</div>
					</div>
					<FieldArray
						name="nonFamilyTravelCompanions"
						render={({ remove, push }) => (

							<div className="travelCompanion">
								{this.props.formikProps.values.nonFamilyTravelCompanions.length > 0 &&
									this.props.formikProps.values.nonFamilyTravelCompanions.map((comp, index) => (
										<div key={index}>

											<div className="row">
												<div className="col-lg-4 form-group ">
													<Field className="form-control"
														name={`nonFamilyTravelCompanions.${index}.lastName`}>
														{({ field, form, meta }) =>
															<MyTextInput
																label={<FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name" />}
																name={field.name}
																type="text"
															/>
														}
													</Field>
												</div>
												<div className="col-lg-4 form-group ">
													<Field className="form-control"
														name={`nonFamilyTravelCompanions.${index}.firstName`}
													>
														{({ field, form, meta }) =>
															<MyTextInput
																label={<FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name" />}
																name={field.name}
																type="text"
															/>
														}
													</Field>
												</div>
												<div className="col-lg-2 form-group ">
													<Field name={`nonFamilyTravelCompanions.${index}.sex`}>
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
											</div>
											<div className="row">
												<div className="col-lg-2 ">
													<Field className="form-control"
														name={`nonFamilyTravelCompanions.${index}.seatNumber`}
													>
														{({ field, form, meta }) =>
															<MyTextInput
																label={<FormattedMessage id="nav.item.seat" defaultMessage="Seat" />}
																name={field.name}
																type="text"
															/>
														}
													</Field>
												</div>
												<div className="col-lg-3 form-group ">
													<Field className="form-control"
														name={`nonFamilyTravelCompanions.${index}.dateOfBirth`}>
														{({ field, form, meta }) =>
															<MyTextInput
																label={<FormattedMessage id="nav.item.dateOfBirth" defaultMessage="Date Of Birth" />}
																name={field.name}
																type="date"
															/>
														}
													</Field>
												</div>

												<div className="col-lg-3 form-group ">
													<Field className="form-control"
														name={`nonFamilyTravelCompanions.${index}.nationality`}
													>
														{({ field, form, meta }) =>
															<MySelect form={form}
																name={field.name}
																options={countriesList}
																isSearchable={true}
																placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
																label={<FormattedMessage id="nav.item.nationality" defaultMessage="Nationality" />}
															/>
														}
													</Field>
												</div>
												<div className="col-lg-3 form-group ">
													<Field className="form-control"
														name={`nonFamilyTravelCompanions.${index}.passportNumber`}>
														{({ field, form, meta }) =>
															<MyTextInput
																label={<FormattedMessage id="nav.item.passportNumber" defaultMessage="Passport Number" />}
																name={field.name}
																type="text"
															/>
														}
													</Field>
												</div>
												<div className="col-lg-1">
													<button
														type="button"
														className="secondary"
														onClick={() => remove(index)}
													>
														X
								</button>
												</div>
											</div>
										</div>

									))}
								<div className="row">
									<div className="col-lg-12 ">
										<button
											type="button"
											className="secondary"
											onClick={() => push({
												lastName: "",
												firstName: "",
												middleInitial: "",
												seatNumber: "",
												dateOfBirth: "",
												sex: "",
												nationality: "",
												passportNumber: "",
											})}
										>
											<FormattedMessage id="nav.item.addTravelCompanionNonFamily" defaultMessage="Add Travel Companion Non-Family" />
										</button>
									</div>
								</div>
							</div>
						)}
					/>
				</div >
			</div>
		</div>
	}

}
export default Step9