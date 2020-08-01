import React from "react";
import { Formik, Form, Field, FieldArray, useField } from 'formik';
import styled from "@emotion/styled";
import * as Yup from 'yup';
import { FormattedMessage } from 'react-intl';




// Styled components ....
const StyledSelect = styled.select`
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

const MySelect = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage
  // entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect className="form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error"><StyledErrorMessage><FormattedMessage id={meta.error} defaultMessage={meta.error} /></StyledErrorMessage></div>
      ) : null}
    </>
  );
};

const MyOption = ({ ...props }) => {
  return (
    <FormattedMessage id={props.messageKey} >
      {(message) => <option value={props.value}>{message}</option>}
    </FormattedMessage>
  );
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const initialValues = {
  airlineName: '', flightNumber: '', seatNumber: '',
  title: '',firstName: '', lastName: '', middleInitial: '', 
  acceptedTerms: false,
  visitPurpose: '', arrivalDate: '',
  mobilePhone: '', businessPhone: '',
  email: '', confirmEmail: '',
  sex: '', dateOfBirth: '',
  passportNumber: '', nationality: '', portOfEmbarkation: '', lengthOfStay: '', countriesVisited: '',
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
    city: '',
    stateProvince: '',
    country: '',
    zipPostalCode: '',
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

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      submitErrorKey: ''
    };
  }

  handleSubmit = (values, that) => {

    var json = JSON.stringify(values);
    console.log(json);
    fetch(`${process.env.REACT_APP_DATA_IMPORT_API}/locator-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: json
    }).then(async response => {
      const labelContentPairs = await response.json();
      if (response.ok) {
        that.setState({ 'submitSuccess': true, 'labelContentPairs': labelContentPairs });
      } else {
        throw new Error("didn't receive ok");
      }
    }).catch(err => {
      console.log(err);
      that.setState({ 'submitErrorKey': 'error.submit' })
    })
  }

  render() {
    if (!this.state.submitSuccess) {
      return (
        <div className="home">
          <div className="container pt-3">
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object({
                acceptedTerms: Yup.boolean()
                  .required('error.required')
                  .oneOf([true], 'error.terms.unaccepted'),
                airlineName: Yup.string()
                  .max(15, 'error.char.max.exceeded')
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
                    ['mr', 'mrs', 'miss', 'other'],
                    'error.invalid.selection'
                  )
                  .required('error.required'),
                firstName: Yup.string()
                  .max(15, 'error.char.max.exceeded')
                  .required('error.required'),
                lastName: Yup.string()
                  .max(20, 'error.char.max.exceeded')
                  .required('error.required'),
                middleInitial: Yup.string()
                  .max(20, 'error.char.max.exceeded')
                  .required('error.required'),
                sex: Yup.string()
                  .oneOf(
                    ['male', 'female'],
                    'error.invalid.selection'
                  )
                  .required('error.required'),
                portOfEmbarkation: Yup.string()
                  .max(20, 'error.char.max.exceeded')
                  .required('error.required'),
                countriesVisited: Yup.string()
                  .required('error.required'),
                lengthOfStay: Yup.string()
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
                mobilePhone: Yup.string().matches(phoneRegExp, 'error.phone.invalid')
                  .min(10, 'error.char.min.notreached'),
                businessPhone: Yup.string().matches(phoneRegExp, 'error.phone.invalid')
                  .min(10, 'error.char.min.notreached'),

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
                  .max(20, 'error.char.max.exceeded')
                  .required('error.required'),
                permanentAddress: Yup.object().shape({
                  numberAndStreet: Yup.string()
                    .max(20, 'error.char.max.exceeded')
                    .required('error.required'),
                  apartmentNumber: Yup.string()
                    .max(20, 'error.char.max.exceeded')
                    .required('error.required'),
                  city: Yup.string()
                    .max(20, 'error.char.max.exceeded')
                    .required('error.required'),
                  stateProvince: Yup.string()
                    .max(20, 'error.char.max.exceeded')
                    .required('error.required'),
                  country: Yup.string()
                    .max(20, 'error.char.max.exceeded')
                    .required('error.required'),
                  zipPostalCode: Yup.string()
                    .max(20, 'error.char.max.exceeded')
                    .required('error.required'),
                }),

                temporaryAddress: Yup.object().shape({
                  hotelName: Yup.string()
                    .max(20, 'error.char.max.exceeded')
                    .required('error.required'),
                  numberAndStreet: Yup.string()
                    .max(20, 'error.char.max.exceeded')
                    .required('error.required'),
                  apartmentNumber: Yup.string()
                    .max(20, 'error.char.max.exceeded')
                    .required('error.required'),
                  city: Yup.string()
                    .max(20, 'error.char.max.exceeded')
                    .required('error.required'),
                  stateProvince: Yup.string()
                    .max(20, 'error.char.max.exceeded')
                    .required('error.required'),
                  country: Yup.string()
                    .max(20, 'error.char.max.exceeded')
                    .required('error.required'),
                  zipPostalCode: Yup.string()
                    .max(20, 'error.char.max.exceeded')
                    .required('error.required'),
                }),

                emergencyContact: Yup.object().shape({
                  lastName: Yup.string()
                    .max(20, 'error.char.max.exceeded')
                    .required('error.required'),
                  firstName: Yup.string()
                    .max(20, 'error.char.max.exceeded')
                    .required('error.required'),
                  city: Yup.string()
                    .max(20, 'error.char.max.exceeded')
                    .required('error.required'),
                  country: Yup.string()
                    .max(20, 'error.char.max.exceeded')
                    .required('error.required'),
                  email: Yup.string()
                    .email('error.email.invalid'),
                  mobilePhone: Yup.string().matches(phoneRegExp, 'error.phone.invalid')
                    .min(10, 'error.char.min.notreached'),
                }),

              })}

              onSubmit={(values, { setSubmitting }) => {
                // get the Home object
                const that = this;
                setTimeout(() => {
                  this.handleSubmit(values, that);
                  setSubmitting(false);
                }, 400);
              }}
            >
              {props => (
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
                          <div className="col-lg-1 form-group">
                            <MySelect label={<FormattedMessage id="nav.item.title" defaultMessage="Title" />}
                              name="title">
                              <option value="other"></option>
                              <MyOption value="mr" messageKey="nav.item.title.option.mr" />
                              <MyOption value="mrs" messageKey="nav.item.title.option.mrs" />
                              <MyOption value="miss" messageKey="nav.item.title.option.miss" />
                            </MySelect>
                          </div>
                          <div className="col-lg-3 form-group">

                            <MyTextInput
                              label={<FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name" />}
                              name="lastName"
                              type="text"
                            />
                          </div>
                          <div className="col-lg-3 form-group">
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
                          <div className="col-lg-1 form-group">

                            <MySelect label={<FormattedMessage id="nav.item.sex" defaultMessage="Sex" />}
                              name="sex">
                              <option value=""> </option>
                              <MyOption value="male" messageKey="nav.item.sex.option.male" />
                              <MyOption value="female" messageKey="nav.item.sex.option.female" />
                            </MySelect>

                          </div>
                          <div className="col-lg-2 form-group">
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
                              type="text"
                            />
                          </div>

                          <div className="col-lg-4 form-group ">
                            <MyTextInput
                              label={<FormattedMessage id="nav.item.countriesVisited" defaultMessage="Countries visited during last 6 months" />}
                              name="countriesVisited"
                              type="text"
                            />
                          </div>
                          <div className="col-lg-4 form-group ">
                            <MyTextInput
                              label={<FormattedMessage id="nav.item.portOfEmbarkation" defaultMessage="Port Of Embarkation" />}
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
                          <div className="col-lg-2 form-group ">
                            <MySelect label={<FormattedMessage id="nav.item.fever" defaultMessage="Fever" />} name="fever">
                              <option value=""></option>
                              <MyOption value="true" messageKey="nav.item.symptoms.option.yes" />
                              <MyOption value="false" messageKey="nav.item.symptoms.option.no" />
                            </MySelect>
                          </div>

                          <div className="col-lg-2 form-group ">
                            <MySelect label={<FormattedMessage id="nav.item.soreThroat" defaultMessage="Sore Throat" />} name="soreThroat">
                              <option value=""></option>
                              <MyOption value="true" messageKey="nav.item.symptoms.option.yes" />
                              <MyOption value="false" messageKey="nav.item.symptoms.option.no" />
                            </MySelect>
                          </div>
                          <div className="col-lg-2 form-group ">
                            <MySelect label={<FormattedMessage id="nav.item.jointPain" defaultMessage="Joint Pain" />} name="jointPain">
                              <option value=""></option>
                              <MyOption value="true" messageKey="nav.item.symptoms.option.yes" />
                              <MyOption value="false" messageKey="nav.item.symptoms.option.no" />
                            </MySelect>
                          </div>
                          <div className="col-lg-2 form-group ">
                            <MySelect label={<FormattedMessage id="nav.item.cough" defaultMessage="Cough" />} name="cough">
                              <option value=""></option>
                              <MyOption value="true" messageKey="nav.item.symptoms.option.yes" />
                              <MyOption value="false" messageKey="nav.item.symptoms.option.no" />
                            </MySelect>
                          </div>
                          <div className="col-lg-2 form-group ">
                            <MySelect label={<FormattedMessage id="nav.item.breathingdifficulties" defaultMessage="Breathing Difficulties" />} name="breathingDifficulties">
                              <option value=""></option>
                              <MyOption value="true" messageKey="nav.item.symptoms.option.yes" />
                              <MyOption value="false" messageKey="nav.item.symptoms.option.no" />
                            </MySelect>
                          </div>
                          <div className="col-lg-2 form-group ">
                            <MySelect label={<FormattedMessage id="nav.item.rash" defaultMessage="Rash" />}
                              name="rash">
                              <option value=""></option>
                              <MyOption value="true" messageKey="nav.item.symptoms.option.yes" />
                              <MyOption value="false" messageKey="nav.item.symptoms.option.no" />
                            </MySelect>
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
                            <MySelect label={<FormattedMessage id="nav.item.purposeOfVisit" defaultMessage="Purpose of Visit" />}
                              name="visitPurpose">
                              <option value=""></option>
                              <MyOption value="business" messageKey="nav.item.purposeOfVisit.option.business" />
                              <MyOption value="pleasure" messageKey="nav.item.purposeOfVisit.option.pleasure" />
                              <MyOption value="other" messageKey="nav.item.purposeOfVisit.option.other" />
                            </MySelect>
                          </div>
                          <div className="col-lg-4 form-group ">
                            <MyTextInput
                              label={<FormattedMessage id="nav.item.mobilePhone" defaultMessage="Mobile Phone" />}
                              name="mobilePhone"
                              type="text"
                            />
                          </div>
                          <div className="col-lg-4 form-group ">
                            <MyTextInput
                              label={<FormattedMessage id="nav.item.businessPhone" defaultMessage="Business Phone" />}
                              name="businessPhone"
                              type="text"
                            />
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
                            <MyTextInput
                              label={<FormattedMessage id="nav.item.nationality" defaultMessage="Nationality" />}
                              name="nationality"
                              type="text"
                            />
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
                            <MyTextInput
                              label={<FormattedMessage id="nav.item.country" defaultMessage="Country" />}
                              name="permanentAddress.country"
                              type="text"
                            />
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
                          <div className="col-lg-3 form-group ">
                            <MyTextInput
                              label={<FormattedMessage id="nav.item.hotelName" defaultMessage="Hotel Name" />}
                              name="temporaryAddress.hotelName"
                              type="text"
                            />
                          </div>
                          <div className="col-lg-3 form-group ">
                            <MyTextInput
                              label={<FormattedMessage id="nav.item.numberAndStreet" defaultMessage="Number and Street" />}
                              name="temporaryAddress.numberAndStreet"
                              type="text"
                            />
                          </div>
                          <div className="col-lg-3 form-group ">
                            <MyTextInput
                              label={<FormattedMessage id="nav.item.apartmentNumber" defaultMessage="Apartment Number" />}
                              name="temporaryAddress.apartmentNumber"
                              type="text"
                            />
                          </div>
                          <div className="col-lg-3 form-group ">
                            <MyTextInput
                              label={<FormattedMessage id="nav.item.city" defaultMessage="City" />}
                              name="temporaryAddress.city"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4 form-group ">
                            <MyTextInput
                              label={<FormattedMessage id="nav.item.state/Province" defaultMessage="State/Province" />}
                              name="temporaryAddress.stateProvince"
                              type="text"
                            />
                          </div>
                          <div className="col-lg-4 form-group ">
                            <MyTextInput
                              label={<FormattedMessage id="nav.item.country" defaultMessage="Country" />}
                              name="temporaryAddress.country"
                              type="text"
                            />
                          </div>
                          <div className="col-lg-4 form-group ">
                            <MyTextInput
                              label={<FormattedMessage id="nav.item.zipPostalCode" defaultMessage="Zip/Postal Code" />}
                              name="temporaryAddress.zipPostalCode"
                              type="text"
                            />
                          </div>
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
                            <MyTextInput
                              label={<FormattedMessage id="nav.item.country" defaultMessage="Country" />}
                              name="emergencyContact.country"
                              type="text"
                            />
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
                            <MyTextInput
                              label={<FormattedMessage id="nav.item.mobilePhone" defaultMessage="Mobile Phone" />}
                              name="emergencyContact.mobilePhone"
                              type="text"
                            />
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
                                      <div className="col-lg-6 form-group ">

                                        <label htmlFor={`familyTravelCompanions.${index}.lastName`}><FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name" /></label>
                                        <Field className="form-control"
                                          name={`familyTravelCompanions.${index}.lastName`}
                                          type="text"
                                        />
                                        {props.errors.familyTravelCompanions &&
                                          props.errors.familyTravelCompanions[index] &&
                                          props.errors.familyTravelCompanions[index].lastName &&
                                          props.touched.familyTravelCompanions &&
                                          props.touched.familyTravelCompanions[index].lastName && (
                                            <div className="field-error">
                                              {props.errors.familyTravelCompanions[index].lastName}
                                            </div>
                                          )}
                                      </div>
                                      <div className="col-lg-6 form-group ">
                                        <label htmlFor={`familyTravelCompanions.${index}.firstName`}><FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name" /></label>
                                        <Field className="form-control"
                                          name={`familyTravelCompanions.${index}.firstName`}
                                          type="text"
                                        />
                                        {props.errors.familyTravelCompanions &&
                                          props.errors.familyTravelCompanions[index] &&
                                          props.errors.familyTravelCompanions[index].firstName &&
                                          props.touched.familyTravelCompanions &&
                                          props.touched.familyTravelCompanions[index].firstName && (
                                            <div className="field-error">
                                              {props.errors.familyTravelCompanions[index].firstName}
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-lg-1 ">
                                        <label htmlFor={`familyTravelCompanions.${index}.seatNumber`}><FormattedMessage id="nav.item.seat" defaultMessage="Seat" /></label>
                                        <Field className="form-control"
                                          name={`familyTravelCompanions.${index}.seatNumber`}
                                          type="text"
                                        />
                                        {props.errors.familyTravelCompanions &&
                                          props.errors.familyTravelCompanions[index] &&
                                          props.errors.familyTravelCompanions[index].seatNumber &&
                                          props.touched.familyTravelCompanions &&
                                          props.touched.familyTravelCompanions[index].seatNumber && (
                                            <div className="field-error">
                                              {props.errors.familyTravelCompanions[index].seatNumber}
                                            </div>
                                          )}
                                      </div>
                                      <div className="col-lg-3 form-group ">
                                        <label htmlFor={`familyTravelCompanions.${index}.dateOfBirth`}><FormattedMessage id="nav.item.dateOfBirth" defaultMessage="Date Of Birth" /></label>
                                        <Field className="form-control"
                                          name={`familyTravelCompanions.${index}.dateOfBirth`}
                                          type="date"
                                        />
                                        {props.errors.familyTravelCompanions &&
                                          props.errors.familyTravelCompanions[index] &&
                                          props.errors.familyTravelCompanions[index].dateOfBirth &&
                                          props.touched.familyTravelCompanions &&
                                          props.touched.familyTravelCompanions[index].dateOfBirth && (
                                            <div className="field-error">
                                              {props.errors.familyTravelCompanions[index].dateOfBirth}
                                            </div>
                                          )}
                                      </div>
                                      <div className="col-lg-1 form-group ">
                                        <MySelect
                                          label={<FormattedMessage id="nav.item.sex" defaultMessage="Sex" />}
                                          name={`familyTravelCompanions.${index}.sex`}>
                                          <option value=""></option>
                                          <MyOption value="male" messageKey="nav.item.sex.option.male" />
                                          <MyOption value="female" messageKey="nav.item.sex.option.female" />
                                        </MySelect>
                                        {props.errors.familyTravelCompanions &&
                                          props.errors.familyTravelCompanions[index] &&
                                          props.errors.familyTravelCompanions[index].sex &&
                                          props.touched.familyTravelCompanions &&
                                          props.touched.familyTravelCompanions[index].sex && (
                                            <div className="field-error">
                                              {props.errors.familyTravelCompanions[index].sex}
                                            </div>
                                          )}
                                      </div>

                                      <div className="col-lg-3 form-group ">
                                        <label htmlFor={`familyTravelCompanions.${index}.nationality`}><FormattedMessage id="nav.item.nationality" defaultMessage="Nationality" /></label>
                                        <Field className="form-control"
                                          name={`familyTravelCompanions.${index}.nationality`}
                                          type="text"
                                        />
                                        {props.errors.familyTravelCompanions &&
                                          props.errors.familyTravelCompanions[index] &&
                                          props.errors.familyTravelCompanions[index].nationality &&
                                          props.touched.familyTravelCompanions &&
                                          props.touched.familyTravelCompanions[index].nationality && (
                                            <div className="field-error">
                                              {props.errors.familyTravelCompanions[index].nationality}
                                            </div>
                                          )}
                                      </div>
                                      <div className="col-lg-3 form-group ">
                                        <label htmlFor={`familyTravelCompanions.${index}.passportNumber`}><FormattedMessage id="nav.item.passportNumber" defaultMessage="Passport Number" /></label>
                                        <Field className="form-control"
                                          name={`familyTravelCompanions.${index}.passportNumber`}
                                          type="text"
                                        />
                                        {props.errors.familyTravelCompanions &&
                                          props.errors.familyTravelCompanions[index] &&
                                          props.errors.familyTravelCompanions[index].passportNumber &&
                                          props.touched.familyTravelCompanions &&
                                          props.touched.familyTravelCompanions[index].passportNumber && (
                                            <div className="field-error">
                                              {props.errors.familyTravelCompanions[index].passportNumber}
                                            </div>
                                          )}
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
                                onClick={() => push({ lastName: "", firstName: "" })}
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
                          render={({ insert, remove, push }) => (
                            <div>
                              {props.values.nonFamilyTravelCompanions.length > 0 &&
                                props.values.nonFamilyTravelCompanions.map((comp, index) => (
                                  <div key={index}>

                                    <div className="row">
                                      <div className="col-lg-6 form-group ">
                                        <label htmlFor={`nonFamilyTravelCompanions.${index}.lastName`}><FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name" /></label>
                                        <Field className="form-control"
                                          name={`nonFamilyTravelCompanions.${index}.lastName`}
                                          type="text"
                                        />
                                        {props.errors.nonFamilyTravelCompanions &&
                                          props.errors.nonFamilyTravelCompanions[index] &&
                                          props.errors.nonFamilyTravelCompanions[index].lastName &&
                                          props.touched.nonFamilyTravelCompanions &&
                                          props.touched.nonFamilyTravelCompanions[index].lastName && (
                                            <div className="field-error">
                                              {props.errors.nonFamilyTravelCompanions[index].lastName}
                                            </div>
                                          )}
                                      </div>
                                      <div className="col-lg-6 form-group ">
                                        <label htmlFor={`nonFamilyTravelCompanions.${index}.firstName`}><FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name" /></label>
                                        <Field className="form-control"
                                          name={`nonFamilyTravelCompanions.${index}.firstName`}
                                          type="text"
                                        />
                                        {props.errors.nonFamilyTravelCompanions &&
                                          props.errors.nonFamilyTravelCompanions[index] &&
                                          props.errors.nonFamilyTravelCompanions[index].firstName &&
                                          props.touched.nonFamilyTravelCompanions &&
                                          props.touched.nonFamilyTravelCompanions[index].firstName && (
                                            <div className="field-error">
                                              {props.errors.nonFamilyTravelCompanions[index].firstName}
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-lg-1">
                                        <label htmlFor={`nonFamilyTravelCompanions.${index}.seatNumber`}><FormattedMessage id="nav.item.seat" defaultMessage="Seat" /></label>
                                        <Field className="form-control"
                                          name={`nonFamilyTravelCompanions.${index}.seatNumber`}
                                          type="text"
                                        />
                                        {props.errors.nonFamilyTravelCompanions &&
                                          props.errors.nonFamilyTravelCompanions[index] &&
                                          props.errors.nonFamilyTravelCompanions[index].seatNumber &&
                                          props.touched.nonFamilyTravelCompanions &&
                                          props.touched.nonFamilyTravelCompanions[index].seatNumber && (
                                            <div className="field-error">
                                              {props.errors.nonFamilyTravelCompanions[index].seatNumber}
                                            </div>
                                          )}
                                      </div>
                                      <div className="col-lg-3 form-group">
                                        <label htmlFor={`nonFamilyTravelCompanions.${index}.dateOfBirth`}><FormattedMessage id="nav.item.dateOfBirth" defaultMessage="Date Of Birth" /></label>
                                        <Field className="form-control"
                                          name={`nonFamilyTravelCompanions.${index}.dateOfBirth`}
                                          type="date"
                                        />
                                        {props.errors.nonFamilyTravelCompanions &&
                                          props.errors.nonFamilyTravelCompanions[index] &&
                                          props.errors.nonFamilyTravelCompanions[index].dateOfBirth &&
                                          props.touched.nonFamilyTravelCompanions &&
                                          props.touched.nonFamilyTravelCompanions[index].dateOfBirth && (
                                            <div className="field-error">
                                              {props.errors.nonFamilyTravelCompanions[index].dateOfBirth}
                                            </div>
                                          )}
                                      </div>
                                      <div className="col-lg-1 form-group">
                                        <MySelect
                                          label={<FormattedMessage id="nav.item.sex" defaultMessage="Sex" />}
                                          name={`nonFamilyTravelCompanions.${index}.sex`}>
                                          <option value=""></option>
                                          <MyOption value="male" messageKey="nav.item.sex.option.male" />
                                          <MyOption value="female" messageKey="nav.item.sex.option.female" />
                                        </MySelect>
                                        {props.errors.nonFamilyTravelCompanions &&
                                          props.errors.nonFamilyTravelCompanions[index] &&
                                          props.errors.nonFamilyTravelCompanions[index].sex &&
                                          props.touched.nonFamilyTravelCompanions &&
                                          props.touched.nonFamilyTravelCompanions[index].sex && (
                                            <div className="field-error">
                                              {props.errors.nonFamilyTravelCompanions[index].sex}
                                            </div>
                                          )}
                                      </div>
                                      <div className="col-lg-3 form-group">
                                        <label htmlFor={`nonFamilyTravelCompanions.${index}.nationality`}><FormattedMessage id="nav.item.nationality" defaultMessage="Nationality" /></label>
                                        <Field className="form-control"
                                          name={`nonFamilyTravelCompanions.${index}.nationality`}
                                          type="text"
                                        />
                                        {props.errors.nonFamilyTravelCompanions &&
                                          props.errors.nonFamilyTravelCompanions[index] &&
                                          props.errors.nonFamilyTravelCompanions[index].nationality &&
                                          props.touched.nonFamilyTravelCompanions &&
                                          props.touched.nonFamilyTravelCompanions[index].nationality && (
                                            <div className="field-error">
                                              {props.errors.nonFamilyTravelCompanions[index].nationality}
                                            </div>
                                          )}
                                      </div>
                                      <div className="col-lg-3 form-group">
                                        <label htmlFor={`nonFamilyTravelCompanions.${index}.passportNumber`}><FormattedMessage id="nav.item.passportNumber" defaultMessage="Passport Number" /></label>
                                        <Field className="form-control"
                                          name={`nonFamilyTravelCompanions.${index}.passportNumber`}
                                          type="text"
                                        />
                                        {props.errors.nonFamilyTravelCompanions &&
                                          props.errors.nonFamilyTravelCompanions[index] &&
                                          props.errors.nonFamilyTravelCompanions[index].passportNumber &&
                                          props.touched.nonFamilyTravelCompanions &&
                                          props.touched.nonFamilyTravelCompanions[index].passportNumber && (
                                            <div className="field-error">
                                              {props.errors.nonFamilyTravelCompanions[index].passportNumber}
                                            </div>
                                          )}
                                      </div>
                                      <div className="col-lg-1">
                                        <div className="col">
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
                                  </div>

                                ))}
                              <div className="row">
                                <div className="col-lg-12 ">
                                  <button
                                    type="button"
                                    className="secondary"
                                    onClick={() => push({ lastName: "", firstName: "" })}
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
                              <StyledErrorMessage><FormattedMessage id="nav.item.declareInformation" defaultMessage="*I declare that the information I have given is true and complete. I understand that I shall commit an offence if I fail to fill the form or knowingly submit false information." /></StyledErrorMessage>
                            </MyCheckbox>
                          </div>
                        </div>
                      </div>
                      <div id="submitInformation" className="section">
                        <div className="row">
                          <div className="col-lg-12 ">
                            <button type="submit" disabled={!props.isValid || !props.dirty}><FormattedMessage id="nav.item.submit" defaultMessage="Submit" /></button>
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
          </div >
        </div >
      );
    } else {
      var Barcode = require('react-barcode');
      return (
        <div className="home container">
          <div className="row">
            <div className="col-lg-12 success-large text-center">
              <FormattedMessage id="submit.success.msg" defaultMessage="Thank you for filling out our online form. Please monitor your email for further instructions." />
            </div>
          </div>
            {this.state.labelContentPairs.map(function(labelContentPair){
                  return (
                    <div className="row">
                      <div className="col-lg-12 ">
                        <h5>{labelContentPair.label}:</h5>
                        <Barcode value={labelContentPair.barcodeContent} />
                      </div>
                  </div>);
            })}
        </div>
      );
    }
  }
}

export default Home;