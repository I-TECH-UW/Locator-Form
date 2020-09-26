import React from "react"
import { FormattedMessage } from 'react-intl'
import { MyCheckbox } from '../inputs/MyInputs'

class Confirmation extends React.Component {

	render() {

		const { travellerType, airlineName, flightNumber, seatNumber, arrivalDate, title, firstName, lastName, middleInitial,
			sex,dateOfBirth, lengthOfStay,countriesVisited, portOfEmbarkation, fever, soreThroat, jointPain, cough, breathingDifficulties, rash, visitPurpose,
			mobilePhone, businessPhone, email, passportNumber, nationality, permanentAddress, temporaryAddress, emergencyContact, familyTravelCompanions, nonFamilyTravelCompanions,
		} = this.props.formikProps.values;
		return <div>


			<div id="travellerTypeInformation" className="section">
			<div className="row">
				<div className="col-lg-12 form-group form-group">
					<FormattedMessage id="nav.item.travellerType" defaultMessage="Passenger Type" />: {travellerType}
				</div>
			</div>
			</div>

			<div id="flightInformation" className="section">
				<div className="row">
					<div className="col-lg-12 ">
						<h5> <FormattedMessage id="nav.item.flightInformation" defaultMessage="Flight Information" /></h5>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-3 form-group form-group">
						<FormattedMessage id="nav.item.airline" defaultMessage="Airline" />: {airlineName}
					</div>
					<div className="col-lg-3 form-group form-group">
						<FormattedMessage id="nav.item.flightNumber" defaultMessage="Flight" />: {flightNumber}
					</div>
					<div className="col-lg-3 form-group form-group">
						<FormattedMessage id="nav.item.seat" defaultMessage="Seat" />: {seatNumber}
					</div>
					<div className="col-lg-3 form-group form-group">
						<FormattedMessage id="nav.item.dateOfArrival" defaultMessage="Date Of Arrival" />: {arrivalDate}
					</div>
				</div>
			</div>
			<div id="personalInformation" className="section">
				<div className="row">
					<div className="col-lg-12 ">

						<h5> <FormattedMessage id="nav.item.personalInformation" defaultMessage="Personal Information" /> </h5>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-2 form-group">
						<FormattedMessage id="nav.item.title" defaultMessage="Title" />: {title}
					</div>
					<div className="col-lg-4 form-group">
						<FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name" />: {lastName}
					</div>
					<div className="col-lg-4 form-group">
						<FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name" />: {firstName}
					</div>
					<div className="col-lg-2 form-group">
						<FormattedMessage id="nav.item.middleInitial" defaultMessage="Middle Initial" />: {middleInitial}
					</div>
				</div>
				<div className="row">
					<div className="col-lg-2 form-group">
						<FormattedMessage id="nav.item.sex" defaultMessage="Sex" />: {sex}
					</div>
					<div className="col-lg-3 form-group">
						<FormattedMessage id="nav.item.dateOfBirth" defaultMessage="Date Of Birth" />: {dateOfBirth}
					</div>
				</div>
			</div>
			<div id="healthInformation" className="section">
				<div className="row">
					<div className="col-lg-12 ">
						<h5> <FormattedMessage id="nav.item.healthInformation" defaultMessage="Health Information" /></h5>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 form-group ">
						<FormattedMessage id="nav.item.proposedLengthOfStay" defaultMessage="Proposed Length of Stay in Mauritius (days)" />: {lengthOfStay}
					</div>

					<div className="col-lg-4 form-group ">
						<FormattedMessage id="nav.item.countriesVisited" defaultMessage="Countries visited during last 6 months" />: {countriesVisited}
					</div>
					<div className="col-lg-4 form-group ">
						<FormattedMessage id="nav.item.portOfEmbarkation" defaultMessage="Port Of Embarkation (ie Airport Code)" />: {portOfEmbarkation}
					</div>
				</div>
			</div>
			<div id="sufferingInformation" className="section">
				<div className="row">
					<div className="col-lg-12 ">

						<h5> <FormattedMessage id="nav.item.areYouSufferingFrom" defaultMessage="Are you suffering from?" /></h5>
					</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-4 form-group ">
						<FormattedMessage id="nav.item.fever" defaultMessage="Fever" />: {fever}
					</div>

					<div className="col-xl-2 col-lg-4 form-group ">
						<FormattedMessage id="nav.item.soreThroat" defaultMessage="Sore Throat" />: {soreThroat}
					</div>
					<div className="col-xl-2 col-lg-4 form-group ">
						<FormattedMessage id="nav.item.jointPain" defaultMessage="Joint Pain" />: {jointPain}
					</div>
					<div className="col-xl-2 col-lg-4 form-group ">
						<FormattedMessage id="nav.item.cough" defaultMessage="Cough" />: {cough}
					</div>
					<div className="col-xl-2 col-lg-4 form-group ">
						<FormattedMessage id="nav.item.breathingdifficulties" defaultMessage="Breathing Difficulties" />: {breathingDifficulties}
					</div>
					<div className="col-xl-2 col-lg-4 form-group ">
						<FormattedMessage id="nav.item.rash" defaultMessage="Rash" />: {rash}
					</div>
				</div>
			</div>
			<div id="contactInformation" className="section">
				<div className="row">
					<div className="col-lg-12 ">
						<h5> <FormattedMessage id="nav.item.phoneNumbers" defaultMessage="Phone Number(s) Where you can be reached if needed? Include country code and city code." /> </h5>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 form-group ">
						<FormattedMessage id="nav.item.purposeOfVisit" defaultMessage="Purpose of Visit" />: {visitPurpose}
					</div>
					<div className="col-lg-4 form-group ">
						<FormattedMessage id="nav.item.mobilePhone" defaultMessage="Mobile Phone" />{mobilePhone}
					</div>
					<div className="col-lg-4 form-group ">
						<FormattedMessage id="nav.item.businessPhone" defaultMessage="Business Phone" />{businessPhone}
					</div>
				</div>
				<div className="row">
					<div className="col-lg-3 form-group ">

						<FormattedMessage id="nav.item.emailAddress" defaultMessage="Email Address" />: {email}
					</div>
					<div className="col-lg-3 form-group ">
						<FormattedMessage id="nav.item.nationality" defaultMessage="Nationality" />: {nationality}
					</div>
					<div className="col-lg-3 form-group ">
						<FormattedMessage id="nav.item.passportNumber" defaultMessage="Passport Number" />: {passportNumber}
					</div>
				</div>
			</div >
			<div id="permanentAddressInformation" className="section">
				<div className="row">
					<div className="col-lg-12 ">
						<h5> <FormattedMessage id="nav.item.permanent Address" defaultMessage="Permanent Address" /></h5>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 form-group">
						<FormattedMessage id="nav.item.numberAndStreet" defaultMessage="Number and Street" />: {permanentAddress.numberAndStreet}
					</div>
					<div className="col-lg-4 form-group">
						<FormattedMessage id="nav.item.apartmentNumber" defaultMessage="Apartment Number" />: {permanentAddress.apartmentNumber}
					</div>
					<div className="col-lg-4 form-group">
						<FormattedMessage id="nav.item.city" defaultMessage="City" />: {permanentAddress.city}
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 form-group ">
						<FormattedMessage id="nav.item.state/Province" defaultMessage="State/Province" />: {permanentAddress.stateProvince}
					</div>
					<div className="col-lg-4 form-group ">
						<FormattedMessage id="nav.item.country" defaultMessage="Country" />: {permanentAddress.country}
					</div>
					<div className="col-lg-4 form-group ">
						<FormattedMessage id="nav.item.zipPostalCode" defaultMessage="Zip/Postal Code" />: {permanentAddress.zipPostalCode}
					</div>
				</div>
			</div>
			<div id="temporaryAddressInformation" className="section">
				<div className="row">
					<div className="col-lg-12 ">
						<h5> <FormattedMessage id="nav.item.temporaryAddress" defaultMessage="Temporary Address in Mauritius" /></h5>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-5 form-group ">
						<FormattedMessage id="nav.item.hotelName" defaultMessage="Hotel Name" />: {temporaryAddress.hotelName}
					</div>
					<div className="col-lg-5 form-group ">
						<FormattedMessage id="nav.item.numberAndStreet" defaultMessage="Number and Street" />: {temporaryAddress.numberAndStreet}
					</div>
					<div className="col-lg-2 form-group ">
						<FormattedMessage id="nav.item.apartmentNumber" defaultMessage="Apartment Number" />: {temporaryAddress.apartmentNumber}
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6 form-group ">
						<FormattedMessage id="nav.item.city" defaultMessage="City" />: {temporaryAddress.city}
					</div>
					<div className="col-lg-6 form-group ">
						<FormattedMessage id="nav.item.district" defaultMessage="District" />: {temporaryAddress.stateProvince}
					</div>
					{/* <div className="col-lg-4 form-group ">
				<MySelect
					label={<FormattedMessage id="nav.item.country" defaultMessage="Country" />: {temporaryAddress.country"
				>
					<option value=""></option>
					<MyCountryOptions/>
				</MySelect>
				</div> */}
					{/* <div className="col-lg-4 form-group ">
				<FormattedMessage id="nav.item.zipPostalCode" defaultMessage="Zip/Postal Code" />: {temporaryAddress.zipPostalCode}
				</div> */}
				</div>
			</div>
			<div id="emergencyContactInformation" className="section">
				<div className="row">
					<div className="col-lg-12 ">
						<h5> <FormattedMessage id="nav.item.emergencyContact" defaultMessage="Emergency Contact Information of someone who can reach you during the next 30 days" /></h5>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-3 form-group ">
						<FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name" />: {emergencyContact.lastName}
					</div>
					<div className="col-lg-3 form-group ">
						<FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name" />: {emergencyContact.firstName}
					</div>
					<div className="col-lg-3 form-group ">
						<FormattedMessage id="nav.item.city" defaultMessage="City" />: {emergencyContact.city}
					</div>
					<div className="col-lg-3 form-group ">
						<FormattedMessage id="nav.item.country" defaultMessage="Country" />: {emergencyContact.country}
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6 form-group ">
						<FormattedMessage id="nav.item.emailAddress" defaultMessage="Email Address" />: {emergencyContact.email}
					</div>
					<div className="col-lg-6 form-group ">
						<FormattedMessage id="nav.item.mobilePhone" defaultMessage="Mobile Phone" />: {emergencyContact.mobilePhone}
					</div>
				</div>
			</div>
			<div id="travelCompanionsInformation" className="section">
				<div className="row">
					<div className="col-lg-12 ">
						<h5> <FormattedMessage id="nav.item.travelCompanionsFamily" defaultMessage="Travel Companions Family" /></h5>
					</div>
				</div>
				{familyTravelCompanions.map((companion) => {
					return <>
					<div className="row">
											<div className="col-lg-4 form-group ">
					<FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name" />: {companion.lastName}
					</div>
											<div className="col-lg-4 form-group ">
					<FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name" />: {companion.firstName}
					</div>
											<div className="col-lg-2 form-group ">
					<FormattedMessage id="nav.item.sex" defaultMessage="Sex" />: {companion.sex}
					</div>
											<div className="col-lg-2 form-group ">
					<FormattedMessage id="nav.item.seat" defaultMessage="Seat" />: {companion.seatNumber}
					</div>

					</div>
					<div className="row">
											<div className="col-lg-3 form-group ">
					<FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name" />: {companion.dateOfBirth}
					</div>
											<div className="col-lg-3 form-group ">
					<FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name" />: {companion.nationality}
					</div>
											<div className="col-lg-3 form-group ">
					<FormattedMessage id="nav.item.sex" defaultMessage="Sex" />: {companion.passportNumber}
					</div>
					</div>
					</>;
				})}
				</div>
			<div id="nonFamilyTravelCompanionInformation" className="section">
				<div className="row">
					<div className="col-lg-12 ">
						<h5> <FormattedMessage id="nav.item.travelCompanionsNonFamily" defaultMessage="Travel Companions Non-Family" /></h5>
					</div>
				</div>
				{nonFamilyTravelCompanions.map((companion) => {
					return <>
					<div className="row">
											<div className="col-lg-4 form-group ">
					<FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name" />: {companion.lastName}
					</div>
											<div className="col-lg-4 form-group ">
					<FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name" />: {companion.firstName}
					</div>
											<div className="col-lg-2 form-group ">
					<FormattedMessage id="nav.item.sex" defaultMessage="Sex" />: {companion.sex}
					</div>
											<div className="col-lg-2 form-group ">
					<FormattedMessage id="nav.item.seat" defaultMessage="Seat" />: {companion.seatNumber}
					</div>

					</div>
					<div className="row">
											<div className="col-lg-3 form-group ">
					<FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name" />: {companion.dateOfBirth}
					</div>
											<div className="col-lg-3 form-group ">
					<FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name" />: {companion.nationality}
					</div>
											<div className="col-lg-3 form-group ">
					<FormattedMessage id="nav.item.sex" defaultMessage="Sex" />: {companion.passportNumber}
					</div>
					</div>
					</>;
				})}
				</div>
			<div className="step" id="step10">
				<div id="acceptInformation" className="section">
					<div className="row">
						<div className="col-lg-12 ">
							<MyCheckbox name="acceptedTerms">
								<FormattedMessage id="nav.item.declareInformation" defaultMessage="*I declare that the information I have given is true and complete. I understand that I shall commit an offence if I fail to fill the form or knowingly submit false information." />
							</MyCheckbox>
						</div>
					</div>
				</div>
			</div>
		</div>
	}

}
export default Confirmation