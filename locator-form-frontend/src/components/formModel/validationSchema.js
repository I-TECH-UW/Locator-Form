import * as Yup from 'yup'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { parse, isDate } from "date-fns";


function isBlankOrValidPhoneNumber(phoneNumber) {
	if (phoneNumber === undefined || phoneNumber === '+1' || phoneNumber === '') {
		return true;
	} else {
		return isValidPhoneNumber(phoneNumber);
	}
}

function parseDateString(value, originalValue) {
	const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}

const today = new Date();
today.setHours(0,0,0,0);

export default [
	//step 1
	Yup.object().shape({
		travellerType: Yup.string()
			.oneOf(
				['resident', 'nonresident'],
				'error.invalid.selection')
			.required('error.required'),
	}),
	//step 2
	Yup.object().shape({
		airlineName: Yup.string()
			.max(50, 'error.char.max.exceeded')
			.required('error.required'),
		flightNumber: Yup.string()
			.max(15, 'error.char.max.exceeded')
			.required('error.required'),
		seatNumber: Yup.string()
			.max(15, 'error.char.max.exceeded'),
		arrivalDate: Yup.date().transform(parseDateString)
			.typeError("error.date.invalidformat")
			.min(today, "error.date.past")
			.required('error.required'),
		visitPurpose: Yup.string()
			.oneOf(
				['business', 'pleasure', 'other'],
				'error.invalid.selection'
			)
			.required('error.required'),
	}),
	//step 3
	Yup.object().shape({
		travellerType: Yup.string()
			.oneOf(
				['resident', 'nonresident'],
				'error.invalid.selection')
			.required('error.required'),
		title: Yup.string()
			.oneOf(
				['mr', 'mrs', 'ms', 'miss', 'dr', 'other'],
				'error.invalid.selection'
			)
			.required('error.required'),
		firstName: Yup.string()
			.max(50, 'error.char.max.exceeded')
			.required('error.required'),
		lastName: Yup.string()
			.max(50, 'error.char.max.exceeded')
			.required('error.required'),
		middleInitial: Yup.string()
			.max(3, 'error.char.max.exceeded'),
		sex: Yup.string()
			.oneOf(
				['male', 'female'],
				'error.invalid.selection'
			)
			.required('error.required'),
		dateOfBirth: Yup.date().transform(parseDateString)
						.typeError("error.date.invalidformat")
						.max(today, "error.date.future")
						.required('error.required'),
		nationalID: Yup.string()
				.when('travellerType', {
					is: 'resident',
					then: Yup.string().required('error.required')
				}),
	}),
	//step 4
	Yup.object().shape({
		portOfEmbarkation: Yup.string()
			.max(50, 'error.char.max.exceeded'),
	}),
	//step 5
	Yup.object().shape({
		hadCovidBefore: Yup.string()
			.oneOf(
				['true', 'false'],
				'error.invalid.selection'
			),
		fever: Yup.string()
			.oneOf(
				['true', 'false'],
				'error.invalid.selection'
			),
			// .required('error.required'),
		soreThroat: Yup.string()
			.oneOf(
				['true', 'false'],
				'error.invalid.selection'
			),
			// .required('error.required'),
		jointPain: Yup.string()
			.oneOf(
				['true', 'false'],
				'error.invalid.selection'
			),
			// .required('error.required'),
		cough: Yup.string()
			.oneOf(
				['true', 'false'],
				'error.invalid.selection'
			),
			// .required('error.required'),
		breathingDifficulties: Yup.string()
			.oneOf(
				['true', 'false'],
				'error.invalid.selection'
			),
			// .required('error.required'),
		rash: Yup.string()
			.oneOf(
				['true', 'false'],
				'error.invalid.selection'
			)
			// .required('error.required'),
	}),
	//step 6
	Yup.object().shape({
		mobilePhone: Yup.string()
			.test('is-phone',
				'error.phone.invalid',
				value => isBlankOrValidPhoneNumber(value)
			),
		fixedPhone: Yup.string()
			.test('is-phone',
				'error.phone.invalid',
				value => isBlankOrValidPhoneNumber(value)
			),
		email: Yup.string()
			.email('error.email.invalid')
			.required('error.required'),
		confirmEmail: Yup.string().when('email', {
			is: email => (email && email.length > 0 ? true : false),
			then: Yup.string()
				.oneOf([Yup.ref('email')], "error.email.doesnotmatch")
				.required('error.required')
		}),
		passportNumber: Yup.string()
			.max(20, 'error.char.max.exceeded')
			.required('error.required'),
		nationality: Yup.string()
			.max(50, 'error.char.max.exceeded'),
//			.required('error.required'),
	}),
	//step 7
	Yup.object().shape({
		permanentAddress: Yup.object().shape({
			travellerType: Yup.string()
			.oneOf(
				['resident', 'nonresident'],
				'error.invalid.selection')
			.required('error.required'),
			numberAndStreet: Yup.string()
				.max(50, 'error.char.max.exceeded')
				.when('travellerType', {
					is: 'resident',
					then: Yup.string().required('error.required')
				}),
			apartmentNumber: Yup.string()
				.max(20, 'error.char.max.exceeded'),
			city: Yup.string()
				.max(50, 'error.char.max.exceeded'),
//				.when('travellerType', {
//					is: 'resident',
//					then: Yup.string().required('error.required')
//				}),
			stateProvince: Yup.string()
				.max(50, 'error.char.max.exceeded'),
			country: Yup.string()
				.max(50, 'error.char.max.exceeded')
				.when('travellerType', {
					is: 'resident',
					then: Yup.string().required('error.required')
				}),
			zipPostalCode: Yup.string()
				.max(20, 'error.char.max.exceeded'),
				// .when('travellerType', {
				// 	is: 'resident',
				// 	then: Yup.string().required('error.required')
				// }),
		}),
		travellerType: Yup.string()
			.oneOf(
				['resident', 'nonresident'],
				'error.invalid.selection')
			.required('error.required'),
		lengthOfStay: Yup.string()
			.matches('^[0-9]*$', 'error.lengthOfStay.noninteger')
			.when('travellerType', {
				is: 'nonresident',
				then: Yup.string().required('error.required')
			}),
		temporaryAddress: Yup.object().shape({
			hotelName: Yup.string()
				.max(50, 'error.char.max.exceeded'),
			numberAndStreet: Yup.string()
				.max(50, 'error.char.max.exceeded')
				.required('error.required'),
			apartmentNumber: Yup.string()
				.max(20, 'error.char.max.exceeded'),
			city: Yup.string()
				.max(50, 'error.char.max.exceeded'),
				// .required('error.required'),
			stateProvince: Yup.string()
				.max(50, 'error.char.max.exceeded'),
				// .required('error.required'),
			country: Yup.string()
				.max(50, 'error.char.max.exceeded'),
				// .required('error.required'),
		}),
	}),
	//step 8
	Yup.object().shape({
		emergencyContact: Yup.object().shape({
			lastName: Yup.string()
				.max(50, 'error.char.max.exceeded')
				.required('error.required'),
			firstName: Yup.string()
				.max(50, 'error.char.max.exceeded')
				.required('error.required'),
			address: Yup.string()
				.max(50, 'error.char.max.exceeded')
				.required('error.required'),
			country: Yup.string()
				.max(50, 'error.char.max.exceeded'),
//				.required('error.required'),
			mobilePhone: Yup.string()
				.test('is-phone',
					'error.phone.invalid',
					value => isBlankOrValidPhoneNumber(value)
				).required('error.required'),
		}),
	}),
	//step 9
	Yup.object().shape({
		familyTravelCompanions: Yup.array()
			.of(
				Yup.object().shape({
					lastName: Yup.string()
						.required('error.required'),
					firstName: Yup.string()
						.required('error.required'),
					middleInitial: Yup.string()
						.max(3, 'error.char.max.exceeded'),
					// seatNumber: Yup.string()
					// 	.required('error.required'),
					dateOfBirth: Yup.date().transform(parseDateString)
						.typeError("error.date.invalidformat")
						.max(today, "error.date.future")
						.required('error.required'),
					sex: Yup.string()
						.oneOf(
							['male', 'female'],
							'error.invalid.selection'
						)
						.required('error.required'),
					nationality: Yup.string()
						.required('error.required'),
					passportNumber: Yup.string()
						.required('error.required'),
				})
			),

		nonFamilyTravelCompanions: Yup.array()
			.of(
				Yup.object().shape({
					lastName: Yup.string()
						.required('error.required'),
					firstName: Yup.string()
						.required('error.required'),
					middleInitial: Yup.string()
						.max(3, 'error.char.max.exceeded'),
					// seatNumber: Yup.string()
					// 	.required('error.required'),
					dateOfBirth: Yup.date().transform(parseDateString)
						.typeError("error.date.invalidformat")
						.max(today, "error.date.future")
						.required('error.required'),
					sex: Yup.string()
						.oneOf(
							['male', 'female'],
							'error.invalid.selection'
						)
						.required('error.required'),
					nationality: Yup.string()
						.required('error.required'),
					passportNumber: Yup.string()
						.required('error.required'),
				})
			),
	}),
	//step 10
	Yup.object().shape({
		acceptedTerms: Yup.boolean()
			.required('error.required')
			.oneOf([true], 'error.terms.unaccepted'),
	}),

]