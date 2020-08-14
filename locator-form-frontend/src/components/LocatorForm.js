import React from "react";
import { Formik, Form, Field, FieldArray, useField } from 'formik';
import styled from "@emotion/styled";
import * as Yup from 'yup';
import { FormattedMessage, injectIntl } from 'react-intl';
import { countriesList } from './data/countries.json'
import MultiCapableSelect from "./MultiCapableSelect"
import { PhoneInputField } from './PhoneInputField'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// Styled components ....

const StyledSelect = styled(MultiCapableSelect)`
	  color: var(--blue);	
//	  width : 150px;
    `;

const StyledPhoneInput = styled(PhoneInputField)`
	  color: var(--blue);	
//	  width : 150px;
    `;
    
const StyledErrorMessage = styled.div`
	  font-size: 12px;
	  color: var(--red-600);
//	  width: 150px;
	  margin-top: 0.25rem;
	  &:before {
	    content: " ";
	    font-size: 10px;
	  }
	  @media (prefers-color-scheme: dark) {
	    color: var(--red-300);
	  }
	`;

const StyledLabel = styled.label`
	  margin-top: 1rem;	
    `;


const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage
  // entirely.
  // <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>

      <input className="text-input form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error"><StyledErrorMessage><FormattedMessage id={meta.error} defaultMessage={meta.error} /></StyledErrorMessage></div>
      ) : null}
    </>
  );
};

const MyHiddenInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage
  // entirely.
  // <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
  const [field] = useField(props);
  return (
    <>
      <input type="hidden" className="text-input form-control" {...field} {...props} />
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" className="form-control" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error"><StyledErrorMessage><FormattedMessage id={meta.error} defaultMessage={meta.error} /></StyledErrorMessage></div>
      ) : null}
    </>
  );
};

const MySelect = ({ label, options, isMulti, isSearchable,  form, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage
  // entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props}
        options={options}
        field={field}
        form={form}
        name={field.name}
		isMulti={isMulti}
		isSearchable={isSearchable}
		placeholder={props.placeholder} />
      {meta.touched && meta.error ? (
        <div className="error"><StyledErrorMessage><FormattedMessage id={meta.error} defaultMessage={meta.error} /></StyledErrorMessage></div>
      ) : null}
    </>
  );
};

const MyPhoneInput = ({ label, options, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage
  // entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledPhoneInput {...field} {...props}
        field={field}
        form={props.form}
        name={field.name}
        className="form-control"
         />
      {meta.touched && meta.error ? (
        <div className="error"><StyledErrorMessage><FormattedMessage id={meta.error} defaultMessage={meta.error} /></StyledErrorMessage></div>
      ) : null}
    </>
  );
};

const initialValues = {
  airlineName: '', flightNumber: '', seatNumber: '',
  title: '',firstName: '', lastName: '', middleInitial: '', 
  acceptedTerms: false,
  visitPurpose: '', arrivalDate: '',
  mobilePhone: '', businessPhone: '',
  email: '', confirmEmail: '',
  sex: '', dateOfBirth: '',
  passportNumber: '', nationality: '', portOfEmbarkation: '', lengthOfStay: '', countriesVisited: [],
  fever: '', soreThroat: '', jointPain: '', cough: '', breathingDifficulties: '', rash: '',

  permanentAddress:
  {
    numberAndStreet: '',
    apartmentNumber: '',
    city: '',
    stateProvince: '',
    country: '',
    zipPostalCode: '',
  },

  temporaryAddress:
  {
    hotelName: '',
    numberAndStreet: '',
    apartmentNumber: '',
    country: 'Mauritius',
    city: '',
    stateProvince: '',
  },


  emergencyContact:
  {
    lastName: '',
    firstName: '',
    city: '',
    country: '',
    email: '',
    mobilePhone: '',
  },

  familyTravelCompanions: [
    // {
    //   lastName: "",
    //   firstName: "",
    //   middleInitial: "",
    //   seatNumber: "",
    //   dateOfBirth: "",
    //   sex: "",
    //   nationality: "",
    //   passportNumber: "",
    // }
  ],
  nonFamilyTravelCompanions: [
    // {
    //   lastName: "",
    //   firstName: "",
    //   middleInitial: "",
    //   seatNumber: "",
    //   dateOfBirth: "",
    //   sex: "",
    //   nationality: "",
    //   passportNumber: "",
    // }
  ]
};


class LocatorForm extends React.Component {

  constructor(props) {
	super(props);
    this.state = {
      submitErrorKey: '',
      submitting: false
    };
  }

  handleSubmit = (values, that, onSuccess) => {
    this.setState( {submitting: true})
    var json = JSON.stringify(values);
    console.log(json);
    fetch(`${process.env.REACT_APP_DATA_IMPORT_API}/locator-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: json
    }).then(async response => {
      this.setState( {submitting: false})
      const labelContentPairs = await response.json();
      if (response.ok) {
        onSuccess(labelContentPairs);
      } else {
        throw new Error("didn't receive ok");
      }
    }).catch(err => {
      this.setState( {submitting: false})
	  console.log(err);
      that.setState({ 'submitErrorKey': 'error.submit' })
    })
  }

	render() {
		return (
	<Formik
		initialValues={initialValues}
		validationSchema={Yup.object({
		acceptedTerms: Yup.boolean()
			.required('error.required')
			.oneOf([true], 'error.terms.unaccepted'),
		airlineName: Yup.string()
			.max(50, 'error.char.max.exceeded')
			.required('error.required'),
		flightNumber: Yup.string()
			.max(15, 'error.char.max.exceeded')
			.required('error.required'),
		seatNumber: Yup.string()
			.max(15, 'error.char.max.exceeded')
			.required('error.required'),
		arrivalDate: Yup.string()
			.required('error.required'),

		title: Yup.string()
			.oneOf(
			['mr', 'mrs', 'miss', 'dr', 'other'],
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
		portOfEmbarkation: Yup.string()
			.max(50, 'error.char.max.exceeded')
			.required('error.required'),
		lengthOfStay: Yup.number()
			.integer('error.lengthOfStay.noninteger')
			.required('error.required'),

		fever: Yup.string()
			.oneOf(
			['true', 'false'],
			'error.invalid.selection'
			)
			.required('error.required'),
		soreThroat: Yup.string()
			.oneOf(
			['true', 'false'],
			'error.invalid.selection'
			)
			.required('error.required'),
		jointPain: Yup.string()
			.oneOf(
			['true', 'false'],
			'error.invalid.selection'
			)
			.required('error.required'),
		cough: Yup.string()
			.oneOf(
			['true', 'false'],
			'error.invalid.selection'
			)
			.required('error.required'),
		breathingDifficulties: Yup.string()
			.oneOf(
			['true', 'false'],
			'error.invalid.selection'
			)
			.required('error.required'),
		rash: Yup.string()
			.oneOf(
			['true', 'false'],
			'error.invalid.selection'
			)
			.required('error.required'),

		visitPurpose: Yup.string()
			.oneOf(
			['business', 'pleasure', 'other'],
			'error.invalid.selection'
			)
			.required('error.required'),
		mobilePhone: Yup.string()
			.test('is-phone', 
			'error.phone.invalid',
			value => isValidPhoneNumber(value)
			),
		businessPhone: Yup.string()
			.test('is-phone', 
			'error.phone.invalid',
			value => isValidPhoneNumber(value)
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
			.max(50, 'error.char.max.exceeded')
			.required('error.required'),
		permanentAddress: Yup.object().shape({
			numberAndStreet: Yup.string()
			.max(50, 'error.char.max.exceeded')
			.required('error.required'),
			apartmentNumber: Yup.string()
			.max(20, 'error.char.max.exceeded'),
			city: Yup.string()
			.max(50, 'error.char.max.exceeded')
			.required('error.required'),
			stateProvince: Yup.string()
			.max(50, 'error.char.max.exceeded')
			.required('error.required'),
			country: Yup.string()
			.max(50, 'error.char.max.exceeded')
			.required('error.required'),
			zipPostalCode: Yup.string()
			.max(20, 'error.char.max.exceeded')
			.required('error.required'),
		}),

		temporaryAddress: Yup.object().shape({
			hotelName: Yup.string()
			.max(50, 'error.char.max.exceeded')
			.required('error.required'),
			numberAndStreet: Yup.string()
			.max(50, 'error.char.max.exceeded')
			.required('error.required'),
			apartmentNumber: Yup.string()
			.max(20, 'error.char.max.exceeded'),
			city: Yup.string()
			.max(50, 'error.char.max.exceeded')
			.required('error.required'),
			stateProvince: Yup.string()
			.max(50, 'error.char.max.exceeded')
			.required('error.required'),
			country: Yup.string()
			.max(50, 'error.char.max.exceeded')
			.required('error.required'),
		}),

		emergencyContact: Yup.object().shape({
			lastName: Yup.string()
			.max(50, 'error.char.max.exceeded')
			.required('error.required'),
			firstName: Yup.string()
			.max(50, 'error.char.max.exceeded')
			.required('error.required'),
			city: Yup.string()
			.max(50, 'error.char.max.exceeded')
			.required('error.required'),
			country: Yup.string()
			.max(50, 'error.char.max.exceeded')
			.required('error.required'),
			email: Yup.string()
			.email('error.email.invalid'),
			mobilePhone: Yup.string()
			.test('is-phone', 
			'error.phone.invalid',
			value => isValidPhoneNumber(value)
			),
		}),

		familyTravelCompanions: Yup.array()
			.of(
			Yup.object().shape({
				lastName: Yup.string()
				.required('error.required'),
				firstName: Yup.string()
				.required('error.required'),
				middleInitial: Yup.string()
				.max(3, 'error.char.max.exceeded'),
				seatNumber: Yup.string()
				.required('error.required'),
				dateOfBirth: Yup.string()
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
				seatNumber: Yup.string()
				.required('error.required'),
				dateOfBirth: Yup.string()
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

		})}

		onSubmit={(values, { setSubmitting }) => {
		// get the Home object
		setTimeout(() => {
			this.handleSubmit(values, this, this.props.onSuccess);
			setSubmitting(false);
		}, 400);
		}}
	>{props => (
	<div className="row">
		<div className="col-lg-12 ">
		<Form>
			<div className="jumbotron">
			<h1><FormattedMessage id="nav.item.header" defaultMessage="Public Health Passenger Locator Form" /></h1>
			<p> <FormattedMessage id="nav.item.topOfForm" defaultMessage="To protect your health, public health officers need you to complete this form whenever they suspect a communicable disease onboard a flight. Your information will help public health officers to contact you if you were exposed to a communicable disease. It is important to fill out this form completely and accurately. Your information is intended to be held in accordance with applicable laws and used only for public health purposes. ~Thank you for helping us to protect your health." /></p>
			</div>
			<div id="flightInformation" className="section">
			<div className="row">
				<div className="col-lg-12 ">
				<h5> <FormattedMessage id="nav.item.flightInformation" defaultMessage="Flight Information" /></h5>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-3 form-group form-group">
				<MyTextInput
					label={<FormattedMessage id="nav.item.airline" defaultMessage="Airline" />}
					name="airlineName"
					type="text"
				/>
				</div>
				<div className="col-lg-3 form-group form-group">
				<MyTextInput
					label={<FormattedMessage id="nav.item.flightNumber" defaultMessage="Flight" />}
					name="flightNumber"
					type="text"
				/>
				</div>
				<div className="col-lg-3 form-group form-group">
				<MyTextInput
					label={<FormattedMessage id="nav.item.seat" defaultMessage="Seat" />}
					name="seatNumber"
					type="text"
				/>
				</div>
				<div className="col-lg-3 form-group form-group">
				<MyTextInput
					label={<FormattedMessage id="nav.item.dateOfArrival" defaultMessage="Date Of Arrival" />}
					name="arrivalDate"
					type="date"
				/>
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
				<Field name="title">
					{({field, form, meta}) => 
					<MySelect label={<FormattedMessage id="nav.item.title" defaultMessage="Title" />}
						name="title" form={form}  placeholder={this.props.intl.formatMessage({id: 'nav.item.select.placeholder'})}
						options={
						[ 
							{"value": "mr","label": this.props.intl.formatMessage({id: 'nav.item.title.option.mr'})},
							{"value": "mrs","label": this.props.intl.formatMessage({id: 'nav.item.title.option.mrs'})},
							{"value": "miss","label": this.props.intl.formatMessage({id: 'nav.item.title.option.miss'})},
							{"value": "dr","label": this.props.intl.formatMessage({id: 'nav.item.title.option.dr'})},
						]}
					/>
					}
				</Field>
				</div>
				<div className="col-lg-4 form-group">

				<MyTextInput
					label={<FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name" />}
					name="lastName"
					type="text"
				/>
				</div>
				<div className="col-lg-4 form-group">
				<MyTextInput
					label={<FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name" />}
					name="firstName"
					type="text"
				/>
				</div>
				<div className="col-lg-2 form-group">

				<MyTextInput
					label={<FormattedMessage id="nav.item.middleInitial" defaultMessage="Middle Initial" />}
					name="middleInitial"
					type="text"
				/>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-2 form-group">
				<Field name="sex">
					{({field, form, meta}) => 
					<MySelect label={<FormattedMessage id="nav.item.sex" defaultMessage="Sex" />}
						name={field.name} form={form} placeholder={this.props.intl.formatMessage({id: 'nav.item.select.placeholder'})}
						options={
						[ 
							{"value": "male","label": this.props.intl.formatMessage({id: 'nav.item.sex.option.male'})},
							{"value": "female","label": this.props.intl.formatMessage({id: 'nav.item.sex.option.female'})},
						]}
						/>
					}
				</Field>
				</div>
				<div className="col-lg-3 form-group">
				<MyTextInput
					label={<FormattedMessage id="nav.item.dateOfBirth" defaultMessage="Date Of Birth" />}
					name="dateOfBirth"
					type="date"
				/>
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
				<MyTextInput
					label={<FormattedMessage id="nav.item.proposedLengthOfStay" defaultMessage="Proposed Length of Stay in Mauritius (days)" />}
					name="lengthOfStay"
					keyboardType="numeric"
					type="number"
				/>
				</div>

				<div className="col-lg-4 form-group ">
				<Field name="countriesVisited">
					{({field, form, meta}) => 
					<MySelect form={form}  
					name={field.name} 
					options={countriesList}
					isMulti={true}
					isSearchable={true}
					placeholder={this.props.intl.formatMessage({id: 'nav.item.select.placeholder'})}
					label={<FormattedMessage id="nav.item.countriesVisited" defaultMessage="Countries visited during last 6 months" />}
					/>}
				</Field>
				</div>
				<div className="col-lg-4 form-group ">
				<MyTextInput
					label={<FormattedMessage id="nav.item.portOfEmbarkation" defaultMessage="Port Of Embarkation (ie Airport Code)" />}
					name="portOfEmbarkation"
					type="text"
				/>
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
				<Field name="fever">
					{({field, form, meta}) => 
					<MySelect label={<FormattedMessage id="nav.item.fever" defaultMessage="Fever" />}
						name={field.name} form={form} placeholder={this.props.intl.formatMessage({id: 'nav.item.select.placeholder'})}
						options={
						[ 
							{"value": "true","label": this.props.intl.formatMessage({id: 'nav.item.symptoms.option.yes'})},
							{"value": "false","label": this.props.intl.formatMessage({id: 'nav.item.symptoms.option.no'})},
						]}
						/>
					}
				</Field>
				</div>

				<div className="col-xl-2 col-lg-4 form-group ">
				<Field name="soreThroat">
					{({field, form, meta}) => 
					<MySelect label={<FormattedMessage id="nav.item.soreThroat" defaultMessage="Sore Throat" />}
						name={field.name} form={form} placeholder={this.props.intl.formatMessage({id: 'nav.item.select.placeholder'})}
						options={
						[ 
							{"value": "true","label": this.props.intl.formatMessage({id: 'nav.item.symptoms.option.yes'})},
							{"value": "false","label": this.props.intl.formatMessage({id: 'nav.item.symptoms.option.no'})},
						]}
						/>
					}
				</Field>
				</div>
				<div className="col-xl-2 col-lg-4 form-group ">
				<Field name="jointPain">
					{({field, form, meta}) => 
					<MySelect label={<FormattedMessage id="nav.item.jointPain" defaultMessage="Joint Pain" />}
						name={field.name} form={form} placeholder={this.props.intl.formatMessage({id: 'nav.item.select.placeholder'})}
						options={
						[ 
							{"value": "true","label": this.props.intl.formatMessage({id: 'nav.item.symptoms.option.yes'})},
							{"value": "false","label": this.props.intl.formatMessage({id: 'nav.item.symptoms.option.no'})},
						]}
						/>
					}
				</Field>
				</div>
				<div className="col-xl-2 col-lg-4 form-group ">
				<Field name="cough">
					{({field, form, meta}) => 
					<MySelect label={<FormattedMessage id="nav.item.cough" defaultMessage="Cough" />}
						name={field.name} form={form} placeholder={this.props.intl.formatMessage({id: 'nav.item.select.placeholder'})}
						options={
						[ 
							{"value": "true","label": this.props.intl.formatMessage({id: 'nav.item.symptoms.option.yes'})},
							{"value": "false","label": this.props.intl.formatMessage({id: 'nav.item.symptoms.option.no'})},
						]}
						/>
					}
				</Field>
				</div>
				<div className="col-xl-2 col-lg-4 form-group ">
				<Field name="breathingDifficulties">
					{({field, form, meta}) => 
					<MySelect label={<FormattedMessage id="nav.item.breathingdifficulties" defaultMessage="Breathing Difficulties" />}
						name={field.name} form={form} placeholder={this.props.intl.formatMessage({id: 'nav.item.select.placeholder'})}
						options={
						[ 
							{"value": "true","label": this.props.intl.formatMessage({id: 'nav.item.symptoms.option.yes'})},
							{"value": "false","label": this.props.intl.formatMessage({id: 'nav.item.symptoms.option.no'})},
						]}
						/>
					}
				</Field>
				</div>
				<div className="col-xl-2 col-lg-4 form-group ">
				<Field name="rash">
					{({field, form, meta}) => 
					<MySelect label={<FormattedMessage id="nav.item.rash" defaultMessage="Rash" />}
						name={field.name} form={form} placeholder={this.props.intl.formatMessage({id: 'nav.item.select.placeholder'})}
						options={
						[ 
							{"value": "true","label": this.props.intl.formatMessage({id: 'nav.item.symptoms.option.yes'})},
							{"value": "false","label": this.props.intl.formatMessage({id: 'nav.item.symptoms.option.no'})},
						]}
						/>
					}
				</Field>
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
				<Field name="visitPurpose">
					{({field, form, meta}) => 
					<MySelect label={<FormattedMessage id="nav.item.purposeOfVisit" defaultMessage="Purpose of Visit" />}
						name={field.name} form={form} placeholder={this.props.intl.formatMessage({id: 'nav.item.select.placeholder'})}
						options={
						[ 
							{"value": "business","label": this.props.intl.formatMessage({id: 'nav.item.purposeOfVisit.option.business'})},
							{"value": "pleasure","label": this.props.intl.formatMessage({id: 'nav.item.purposeOfVisit.option.pleasure'})},
							{"value": "other","label": this.props.intl.formatMessage({id: 'nav.item.purposeOfVisit.option.other'})},
						]}
						/>
					}
				</Field>
				</div>
				<div className="col-lg-4 form-group ">
				<Field name="mobilePhone">
					{({field, form, meta}) =>
					<MyPhoneInput
						label={<FormattedMessage id="nav.item.mobilePhone" defaultMessage="Mobile Phone" />}
						form={form} name="mobilePhone" 
					/>
					}
				</Field>
				</div>
				<div className="col-lg-4 form-group ">
				<Field name="businessPhone">
					{({field, form, meta}) =>
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
					{({field, form, meta}) => 
					<MySelect form={form}  
					name={field.name} 
					options={countriesList}
					isSearchable={true}
					placeholder={this.props.intl.formatMessage({id: 'nav.item.select.placeholder'})}
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
					type="text"
				/>
				</div>
			</div>
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
					{({field, form, meta}) => 
					<MySelect label={<FormattedMessage id="nav.item.country" defaultMessage="Country" />}
						name={field.name} form={form} placeholder={this.props.intl.formatMessage({id: 'nav.item.select.placeholder'})}
						options={countriesList} isSearchable={true}
						/>
					}
				</Field>
				</div>
				<div className="col-lg-4 form-group ">
				<MyTextInput
					label={<FormattedMessage id="nav.item.zipPostalCode" defaultMessage="Zip/Postal Code" />}
					name="permanentAddress.zipPostalCode"
					type="text"
				/>
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
				<MyTextInput
					label={<FormattedMessage id="nav.item.hotelName" defaultMessage="Hotel Name" />}
					name="temporaryAddress.hotelName"
					type="text"
				/>
				</div>
				<div className="col-lg-5 form-group ">
				<MyTextInput
					label={<FormattedMessage id="nav.item.numberAndStreet" defaultMessage="Number and Street" />}
					name="temporaryAddress.numberAndStreet"
					type="text"
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
				<MyTextInput
					label={<FormattedMessage id="nav.item.city" defaultMessage="City" />}
					name="temporaryAddress.city"
					type="text"
				/>
				</div>
				<div className="col-lg-6 form-group ">
				<MyTextInput
					label={<FormattedMessage id="nav.item.district" defaultMessage="District" />}
					name="temporaryAddress.stateProvince"
					type="text"
				/>
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
					type="text"
				/>
				</div>
				<div className="col-lg-3 form-group ">
				<MyTextInput
					label={<FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name" />}
					name="emergencyContact.firstName"
					type="text"
				/>
				</div>
				<div className="col-lg-3 form-group ">
				<MyTextInput
					label={<FormattedMessage id="nav.item.city" defaultMessage="City" />}
					name="emergencyContact.city"
					type="text"
				/>
				</div>
				<div className="col-lg-3 form-group ">
				<Field name="emergencyContact.country">
					{({field, form, meta}) => 
					<MySelect label={<FormattedMessage id="nav.item.country" defaultMessage="Country" />}
						name={field.name} form={form} placeholder={this.props.intl.formatMessage({id: 'nav.item.select.placeholder'})}
						options={countriesList} isSearchable={true}
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
				/>
				</div>
				<div className="col-lg-6 form-group ">
				<Field name="emergencyContact.mobilePhone">
					{({field, form, meta}) => 
					<MyPhoneInput
						label={<FormattedMessage id="nav.item.mobilePhone" defaultMessage="Mobile Phone" />}
						form={form} name="emergencyContact.mobilePhone" 
					/>
					}
				</Field>
				</div>
			</div>
			</div>
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
					{props.values.familyTravelCompanions.length > 0 &&
					props.values.familyTravelCompanions.map((comp, index) => (
						<div key={index}>

						<div className="row">
							<div className="col-lg-4 form-group ">
							<Field className="form-control"
								name={`familyTravelCompanions.${index}.lastName`}>
								{({field, form, meta}) => 
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
								{({field, form, meta}) => 
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
								{({field, form, meta}) => 
								<MySelect label={<FormattedMessage id="nav.item.sex" defaultMessage="Sex" />}
									name={field.name} form={form} placeholder={this.props.intl.formatMessage({id: 'nav.item.select.placeholder'})}
									options={
									[ 
										{"value": "male","label": this.props.intl.formatMessage({id: 'nav.item.sex.option.male'})},
										{"value": "female","label": this.props.intl.formatMessage({id: 'nav.item.sex.option.female'})},
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
								{({field, form, meta}) => 
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
								{({field, form, meta}) => 
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
								{({field, form, meta}) => 
									<MySelect form={form}  
										name={field.name} 
										options={countriesList}
										isSearchable={true}
										placeholder={this.props.intl.formatMessage({id: 'nav.item.select.placeholder'})}
										label={<FormattedMessage id="nav.item.nationality" defaultMessage="Nationality" />}
									/>
								}
							</Field>
							</div>
							<div className="col-lg-3 form-group ">
							<Field className="form-control"
								name={`familyTravelCompanions.${index}.passportNumber`}>
								{({field, form, meta}) => 
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
					{props.values.nonFamilyTravelCompanions.length > 0 &&
					props.values.nonFamilyTravelCompanions.map((comp, index) => (
						<div key={index}>

						<div className="row">
							<div className="col-lg-4 form-group ">
							<Field className="form-control"
								name={`nonFamilyTravelCompanions.${index}.lastName`}>
								{({field, form, meta}) => 
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
								{({field, form, meta}) => 
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
								{({field, form, meta}) => 
								<MySelect label={<FormattedMessage id="nav.item.sex" defaultMessage="Sex" />}
									name={field.name} form={form} placeholder={this.props.intl.formatMessage({id: 'nav.item.select.placeholder'})}
									options={
									[ 
										{"value": "male","label": this.props.intl.formatMessage({id: 'nav.item.sex.option.male'})},
										{"value": "female","label": this.props.intl.formatMessage({id: 'nav.item.sex.option.female'})},
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
								{({field, form, meta}) => 
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
								{({field, form, meta}) => 
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
								{({field, form, meta}) => 
									<MySelect form={form}  
										name={field.name} 
										options={countriesList}
										isSearchable={true}
										placeholder={this.props.intl.formatMessage({id: 'nav.item.select.placeholder'})}
										label={<FormattedMessage id="nav.item.nationality" defaultMessage="Nationality" />}
									/>
								}
							</Field>
							</div>
							<div className="col-lg-3 form-group ">
							<Field className="form-control"
								name={`nonFamilyTravelCompanions.${index}.passportNumber`}>
								{({field, form, meta}) => 
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

			<div id="acceptInformation" className="section">
			<div className="row">
				<div className="col-lg-12 ">
				<MyCheckbox name="acceptedTerms">
					<FormattedMessage id="nav.item.declareInformation" defaultMessage="*I declare that the information I have given is true and complete. I understand that I shall commit an offence if I fail to fill the form or knowingly submit false information." />
				</MyCheckbox>
				</div>
			</div>
			</div>
			<div id="submitInformation" className="section">
			<div className="row">
				<div className="col-lg-12 ">
					<button type="submit" disabled={this.state.submitting || !props.dirty || !props.isValid}>
						<FormattedMessage id="nav.item.submit" defaultMessage="Submit" />
					</button>
					{this.state.submitting && 
						<FontAwesomeIcon  alt="submitting..." icon={faSpinner} className="rotation-animation"/>}
				
				{this.state.submitErrorKey &&
					<span className="error-large"><StyledErrorMessage> <FormattedMessage id={this.state.submitErrorKey} defaultMessage="An error occured" /></StyledErrorMessage> </span>}
				</div>
			</div>
			</div>
		</Form >
		</div >
	</div >
	)}
  </Formik>
		)
}	
}

export default injectIntl(LocatorForm)