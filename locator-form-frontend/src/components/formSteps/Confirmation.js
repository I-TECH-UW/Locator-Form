import React from "react"
import { FormattedMessage } from 'react-intl'
import { MyCheckbox } from '../inputs/MyInputs'
import { getCountryFromCode } from '../data/countries.js'



class Confirmation extends React.Component {

	render() {

		const { travellerType, airlineName, flightNumber, seatNumber, arrivalDate, title, firstName, lastName, middleInitial,
			sex,dateOfBirth, lengthOfStay,countriesVisited, portOfEmbarkation, fever, soreThroat, jointPain, cough, breathingDifficulties, rash, visitPurpose,
			mobilePhone, fixedPhone, email, passportNumber, nationality, permanentAddress, temporaryAddress, emergencyContact, familyTravelCompanions, nonFamilyTravelCompanions,
		} = this.props.formikProps.values;

		return <div>


			<div id="travellerTypeInformation" className="section">
				<div className="row">
					<div className="col-lg-12 ">
						<h5 className="confirm-section-header"> <FormattedMessage id="nav.item.travellerSection" defaultMessage="Traveller" /></h5>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-12 form-group">
						<span className="confirm-field"><FormattedMessage id="nav.item.travellerType" defaultMessage="Passenger Type" />: </span><span className="confirm-value">{travellerType}</span>
					</div>
				</div>
			</div>

			<div id="flightInformation" className="section">
				<div className="row">
					<div className="col-lg-12 ">
						<h5 className="confirm-section-header"> <FormattedMessage id="nav.item.flightInformation" defaultMessage="Flight Information" /></h5>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-3 form-group">
						<span className="confirm-field"><FormattedMessage id="nav.item.airline" defaultMessage="Airline" />: </span><span className="confirm-value">{airlineName}</span>
					</div>
					<div className="col-lg-3 form-group">
						<span className="confirm-field"><FormattedMessage id="nav.item.flightNumber" defaultMessage="Flight" />: </span><span className="confirm-value">{flightNumber}</span>
					</div>
					<div className="col-lg-3 form-group">
						<span className="confirm-field"><FormattedMessage id="nav.item.seat" defaultMessage="Seat" />: </span><span className="confirm-value">{seatNumber}</span>
					</div>
					<div className="col-lg-3 form-group">
						<span className="confirm-field"><FormattedMessage id="nav.item.dateOfArrival" defaultMessage="Date Of Arrival" />: </span><span className="confirm-value">{arrivalDate}</span>
					</div>
				</div>
			</div>
			<div id="personalInformation" className="section">
				<div className="row">
					<div className="col-lg-12 ">
						<h5 className="confirm-section-header"> <FormattedMessage id="nav.item.personalInformation" defaultMessage="Personal Information" /> </h5>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-2 form-group">
						<span className="confirm-field"><FormattedMessage id="nav.item.title" defaultMessage="Title" />: </span><span className="confirm-value">{title}</span>
					</div>
					<div className="col-lg-4 form-group">
						<span className="confirm-field"><FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name" />: </span><span className="confirm-value">{lastName}</span>
					</div>
					<div className="col-lg-4 form-group">
						<span className="confirm-field"><FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name" />: </span><span className="confirm-value">{firstName}</span>
					</div>
					<div className="col-lg-2 form-group">
						<span className="confirm-field"><FormattedMessage id="nav.item.middleInitial" defaultMessage="Middle Initial" />: </span><span className="confirm-value">{middleInitial}</span>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-2 form-group">
						<span className="confirm-field"><FormattedMessage id="nav.item.sex" defaultMessage="Sex" />: </span><span className="confirm-value">{sex}</span>
					</div>
					<div className="col-lg-3 form-group">
						<span className="confirm-field"><FormattedMessage id="nav.item.dateOfBirth" defaultMessage="Date Of Birth" />: </span><span className="confirm-value">{dateOfBirth}</span>
					</div>
				</div>
			</div>
			<div id="healthInformation" className="section">
				<div className="row">
					<div className="col-lg-12 ">
						<h5 className="confirm-section-header"> <FormattedMessage id="nav.item.healthInformation" defaultMessage="Health Information" /></h5>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.proposedLengthOfStay" defaultMessage="Proposed Length of Stay in Mauritius (days)" />: </span><span className="confirm-value">{lengthOfStay}</span>
					</div>

					<div className="col-lg-4 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.countriesVisited" defaultMessage="Countries visited during last 6 months" />: </span><span className="confirm-value">
							{countriesVisited.map((option, index) => {
								return  (
								<React.Fragment key={option}>
									{index !== 0 && ', '}
									{getCountryFromCode(option)}
								</React.Fragment>
								)
							})}
						</span>
					</div>
					<div className="col-lg-4 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.portOfEmbarkation" defaultMessage="Port Of Embarkation (ie Airport Code)" />: </span><span className="confirm-value">{portOfEmbarkation}</span>
					</div>
				</div>
			</div>
			<div id="sufferingInformation" className="section">
				<div className="row">
					<div className="col-lg-12 ">
						<h5 className="confirm-section-header"> <FormattedMessage id="nav.item.areYouSufferingFrom" defaultMessage="Are you suffering from?" /></h5>
					</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-4 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.fever" defaultMessage="Fever" />: </span><span className="confirm-value">{fever}</span>
					</div>

					<div className="col-xl-2 col-lg-4 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.soreThroat" defaultMessage="Sore Throat" />: </span><span className="confirm-value">{soreThroat}</span>
					</div>
					<div className="col-xl-2 col-lg-4 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.jointPain" defaultMessage="Joint Pain" />: </span><span className="confirm-value">{jointPain}</span>
					</div>
					<div className="col-xl-2 col-lg-4 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.cough" defaultMessage="Cough" />: </span><span className="confirm-value">{cough}</span>
					</div>
					<div className="col-xl-2 col-lg-4 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.breathingdifficulties" defaultMessage="Breathing Difficulties" />: </span><span className="confirm-value">{breathingDifficulties}</span>
					</div>
					<div className="col-xl-2 col-lg-4 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.rash" defaultMessage="Rash" />: </span><span className="confirm-value">{rash}</span>
					</div>
				</div>
			</div>
			<div id="contactInformation" className="section">
				<div className="row">
					<div className="col-lg-12 ">
						<h5 className="confirm-section-header"> <FormattedMessage id="nav.item.phoneNumbers" defaultMessage="Phone Number(s) Where you can be reached if needed? Include country code and city code." /> </h5>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.purposeOfVisit" defaultMessage="Purpose of Visit" />: </span><span className="confirm-value">{visitPurpose}</span>
					</div>
					<div className="col-lg-4 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.mobilePhone" defaultMessage="Mobile Phone" />: </span><span className="confirm-value">{mobilePhone}</span>
					</div>
					<div className="col-lg-4 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.fixedPhone" defaultMessage="Fixed Phone" />: </span><span className="confirm-value">{fixedPhone}</span>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-3 form-group ">

						<span className="confirm-field"><FormattedMessage id="nav.item.emailAddress" defaultMessage="Email Address" />: </span><span className="confirm-value">{email}</span>
					</div>
					<div className="col-lg-3 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.nationality" defaultMessage="Nationality" />: </span>
						<span className="confirm-value">
							{getCountryFromCode(nationality)}
						</span>
					</div>
					<div className="col-lg-3 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.passportNumber" defaultMessage="Passport Number" />: </span><span className="confirm-value">{passportNumber}</span>
					</div>
				</div>
			</div >
			<div id="permanentAddressInformation" className="section">
				<div className="row">
					<div className="col-lg-12 ">
						<h5 className="confirm-section-header"> <FormattedMessage id="nav.item.permanent Address" defaultMessage="Permanent Address" /></h5>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 form-group">
						<span className="confirm-field"><FormattedMessage id="nav.item.numberAndStreet" defaultMessage="Number and Street" />: </span><span className="confirm-value">{permanentAddress.numberAndStreet}</span>
					</div>
					<div className="col-lg-4 form-group">
						<span className="confirm-field"><FormattedMessage id="nav.item.apartmentNumber" defaultMessage="Apartment Number" />: </span><span className="confirm-value">{permanentAddress.apartmentNumber}</span>
					</div>
					<div className="col-lg-4 form-group">
						<span className="confirm-field"><FormattedMessage id="nav.item.city" defaultMessage="City" />: </span><span className="confirm-value">{permanentAddress.city}</span>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.state/Province" defaultMessage="State/Province" />: </span><span className="confirm-value">{permanentAddress.stateProvince}</span>
					</div>
					<div className="col-lg-4 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.country" defaultMessage="Country" />: </span>
						<span className="confirm-value">
							{getCountryFromCode(permanentAddress.country)}
						</span>
					</div>
					<div className="col-lg-4 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.zipPostalCode" defaultMessage="Zip/Postal Code" />: </span><span className="confirm-value">{permanentAddress.zipPostalCode}</span>
					</div>
				</div>
			</div>
			<div id="temporaryAddressInformation" className="section">
				<div className="row">
					<div className="col-lg-12 ">
						<h5 className="confirm-section-header"> <FormattedMessage id="nav.item.temporaryAddress" defaultMessage="Temporary Address in Mauritius" /></h5>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-5 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.hotelName" defaultMessage="Hotel Name" />: </span><span className="confirm-value">{temporaryAddress.hotelName}</span>
					</div>
					<div className="col-lg-5 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.numberAndStreet" defaultMessage="Number and Street" />: </span><span className="confirm-value">{temporaryAddress.numberAndStreet}</span>
					</div>
					<div className="col-lg-2 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.apartmentNumber" defaultMessage="Apartment Number" />: </span><span className="confirm-value">{temporaryAddress.apartmentNumber}</span>
					</div>
				</div>
				<div className="row">
					{/* <div className="col-lg-6 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.city" defaultMessage="City" />: </span><span className="confirm-value">{temporaryAddress.city}</span>
					</div> */}
					{/* <div className="col-lg-6 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.district" defaultMessage="District" />: </span><span className="confirm-value">{temporaryAddress.stateProvince}</span>
					</div> */}
					{/* <div className="col-lg-4 form-group ">
				<MySelect
					label={<FormattedMessage id="nav.item.country" defaultMessage="Country" />: {temporaryAddress.country"
				>
					<option value=""></option>
					<MyCountryOptions/>
				</MySelect>
				</div> */}
					{/* <div className="col-lg-4 form-group ">
				<span className="confirm-field"><FormattedMessage id="nav.item.zipPostalCode" defaultMessage="Zip/Postal Code" />: </span><span className="confirm-value">{temporaryAddress.zipPostalCode}</span>
				</div> */}
				</div>
			</div>
			<div id="emergencyContactInformation" className="section">
				<div className="row">
					<div className="col-lg-12 ">
						<h5 className="confirm-section-header"> <FormattedMessage id="nav.item.emergencyContact" defaultMessage="Emergency Contact Information of someone who can reach you during the next 30 days" /></h5>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-3 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name" />: </span><span className="confirm-value">{emergencyContact.lastName}</span>
					</div>
					<div className="col-lg-3 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name" />: </span><span className="confirm-value">{emergencyContact.firstName}</span>
					</div>
					<div className="col-lg-3 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.city" defaultMessage="City" />: </span><span className="confirm-value">{emergencyContact.city}</span>
					</div>
					<div className="col-lg-3 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.country" defaultMessage="Country" />: </span>
						<span className="confirm-value">
							{getCountryFromCode(emergencyContact.country)}
						</span>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.emailAddress" defaultMessage="Email Address" />: </span><span className="confirm-value">{emergencyContact.email}</span>
					</div>
					<div className="col-lg-6 form-group ">
						<span className="confirm-field"><FormattedMessage id="nav.item.mobilePhone" defaultMessage="Mobile Phone" />: </span><span className="confirm-value">{emergencyContact.mobilePhone}</span>
					</div>
				</div>
			</div>
			<div id="travelCompanionsInformation" className="section">
				<div className="row">
					<div className="col-lg-12 ">
						<h5 className="confirm-section-header"> <FormattedMessage id="nav.item.travelCompanionsFamily" defaultMessage="Travel Companions Family" /></h5>
					</div>
				</div>
				{familyTravelCompanions.map((companion) => {
					return <>
					<div className="row">
											<div className="col-lg-4 form-group ">
					<span className="confirm-field"><FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name" />: </span><span className="confirm-value">{companion.lastName}</span>
					</div>
											<div className="col-lg-4 form-group ">
					<span className="confirm-field"><FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name" />: </span><span className="confirm-value">{companion.firstName}</span>
					</div>
											<div className="col-lg-2 form-group ">
					<span className="confirm-field"><FormattedMessage id="nav.item.sex" defaultMessage="Sex" />: </span><span className="confirm-value">{companion.sex}</span>
					</div>
											<div className="col-lg-2 form-group ">
					<span className="confirm-field"><FormattedMessage id="nav.item.seat" defaultMessage="Seat" />: </span><span className="confirm-value">{companion.seatNumber}</span>
					</div>

					</div>
					<div className="row">
											<div className="col-lg-3 form-group ">
					<span className="confirm-field"><FormattedMessage id="nav.item.dateOfBirth" defaultMessage="Date Of Birth" />: </span><span className="confirm-value">{companion.dateOfBirth}</span>
					</div>
											<div className="col-lg-3 form-group ">
					<span className="confirm-field"><FormattedMessage id="nav.item.nationality" defaultMessage="Nationality" />: </span>
					<span className="confirm-value">
						{getCountryFromCode(companion.nationality)}
					</span>
					</div>
											<div className="col-lg-3 form-group ">
					<span className="confirm-field"><FormattedMessage id="nav.item.passportNumber" defaultMessage="Passport Number" />: </span><span className="confirm-value">{companion.passportNumber}</span>
					</div>
					</div>
					</>;
				})}
				</div>
			<div id="nonFamilyTravelCompanionInformation" className="section">
				<div className="row">
					<div className="col-lg-12 ">
						<h5 className="confirm-section-header"> <FormattedMessage id="nav.item.travelCompanionsNonFamily" defaultMessage="Travel Companions Non-Family" /></h5>
					</div>
				</div>
				{nonFamilyTravelCompanions.map((companion) => {
					return <>
					<div className="row">
											<div className="col-lg-4 form-group ">
					<span className="confirm-field"><FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name" />: </span><span className="confirm-value">{companion.lastName}</span>
					</div>
											<div className="col-lg-4 form-group ">
					<span className="confirm-field"><FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name" />: </span><span className="confirm-value">{companion.firstName}</span>
					</div>
											<div className="col-lg-2 form-group ">
					<span className="confirm-field"><FormattedMessage id="nav.item.sex" defaultMessage="Sex" />: </span><span className="confirm-value">{companion.sex}</span>
					</div>
											<div className="col-lg-2 form-group ">
					<span className="confirm-field"><FormattedMessage id="nav.item.seat" defaultMessage="Seat" />: </span><span className="confirm-value">{companion.seatNumber}</span>
					</div>

					</div>
					<div className="row">
											<div className="col-lg-3 form-group ">
					<span className="confirm-field"><FormattedMessage id="nav.item.dateOfBirth" defaultMessage="Date Of Birth" />: </span><span className="confirm-value">{companion.dateOfBirth}</span>
					</div>
											<div className="col-lg-3 form-group ">
					<span className="confirm-field"><FormattedMessage id="nav.item.nationality" defaultMessage="Nationality" />: </span>
					<span className="confirm-value">
						{getCountryFromCode(companion.nationality)}
					</span>
					</div>
											<div className="col-lg-3 form-group ">
					<span className="confirm-field"><FormattedMessage id="nav.item.passportNumber" defaultMessage="Passport Number" />: </span><span className="confirm-value">{companion.passportNumber}</span>
					</div>
					</div>
					</>;
				})}
				</div>
			<div className="step" id="step10">
				<div id="acceptInformation" className="section">
					<div className="row">
						<div className="col-lg-12 ">
							<MyCheckbox
								className="required-field-field" name="acceptedTerms">
								<FormattedMessage id="nav.item.declareInformation" defaultMessage="I declare that the information I have given is true and complete. I understand that I shall commit an offence if I fail to fill the form or knowingly submit false information." />
							</MyCheckbox>
						</div>
					</div>
				</div>
			</div>
		</div>
	}

}
export default Confirmation