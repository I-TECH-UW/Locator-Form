import React from "react";
import { render } from "react-dom";
import "./styles.css";
import { Formik, Form, Field, FieldArray, useField } from 'formik';
import styled from "@emotion/styled";
import * as Yup from 'yup';
import { useBarcode } from '@createnextapp/react-barcode';
import { v4 as uuidv4 } from 'uuid';
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';
import { countryOptions } from './docs/data';
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedMessage } from 'react-intl';
import { Link, withRouter } from "react-router-dom";



interface Values {
	  id: string;
	  firstName: string;
	  lastName: string;
	  middleInitial: string;
	  acceptedTerms: string;
	  visitPurpose: string;
	  title: string;
		mobilePhone: string;
		businessPhone: string;
gender: string;        
passportNumber: string; 
nationality: string; 
portOfEmbarkation: string;
coutriesVisited: string;
lengthOfStay: string;
permAddress:
	{
		numberAndStreet: string; 
		apartmentNumber: string; 
		city: string; 
		stateProvince: string; 
		country: string; 
		zipPostalCode: string;
	},

tempAddress:
	{
		hotelName: string; 
		numberAndStreet: string; 
		apartmentNumber: string; 
		city: string; 
		stateProvince: string; 
		country: string; 
		zipPostalCode: string;
	},

emergencyContact:
	{
		lastName: string;
		firstName: string;
		city: string;
		country: string;
		email: string;
		mobilePhone: string;
	},

familyTravelCompanions: [
  {
	 id: string;
  	 lastName: string;
	 firstName: string;
  	 middleInitial: string;
  	 seatNumber: string;
  	 dateOfBirth: string;
     nationality: string;
	 passportNumber: string;
  },
],

nonFamilyTravelCompanions: [
  {
	id: string;
	lastName: string;
    firstName: string;
	middleInitial: string;
	seatNumber: string;
    dateOfBirth: string;
	nationality: string;
	passportNumber: string;
  },
],
	
}

const MyTextInput = ({ label, ...props }) => {
	  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
	  // which we can spread on <input> and alse replace ErrorMessage entirely.
	// <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
	  const [field, meta] = useField(props);
	  return (
	    <>
	    <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
	      <input className="text-input" {...field} {...props} />
	      {meta.touched && meta.error ? (
	        <div className="error">{meta.error}</div>
	      ) : null}
	    </>
	  );
	};
	
	const MynumberInput = ({ label, ...props }) => {
		  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
		  // which we can spread on <input> and alse replace ErrorMessage entirely.
		// <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
		  const [field, meta] = useField(props);
		  return (
		    <>
		    <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
		      <input className="number-input" {...field} {...props} />
		      {meta.touched && meta.error ? (
		        <div className="error">{meta.error}</div>
		      ) : null}
		    </>
		  );
		};

	const MyCheckbox = ({ children, ...props }) => {
	  const [field, meta] = useField({ ...props, type: "checkbox" });
	  return (
	    <>
	      <label className="checkbox">
	        <input {...field} {...props} type="checkbox" />
	        {children}
	      </label>
	      {meta.touched && meta.error ? (
	        <div className="error">{meta.error}</div>
	      ) : null}
	    </>
	  );
	};

	// Styled components ....
	const StyledSelect = styled.select`
	  color: var(--blue);	
	  width : 150px;
	  `;

	const StyledErrorMessage = styled.div`
	  font-size: 12px;
	  color: var(--red-600);
	  width: 150px;
	  margin-top: 0.25rem;
	  &:before {
	    content: "❌ ";
	    font-size: 10px;
	  }
	  @media (prefers-color-scheme: dark) {
	    color: var(--red-300);
	  }
	`;

	const StyledLabel = styled.label`
	  margin-top: 1rem;	
	  `;

	const MySelect = ({ label, ...props }) => {
	  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
	  // which we can spread on <input> and alse replace ErrorMessage entirely.
	  const [field, meta] = useField(props);
	  return (
	    <>
	      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
	      <StyledSelect {...field} {...props} />
	      {meta.touched && meta.error ? (
	        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
	      ) : null}
	    </>
	  );
	};
	
	const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
	
	const initialValues={ 
			id: '', firstName: '', lastName: '', middleInitial: '', email: '',
          acceptedTerms: false,
          visitPurpose: '', title: '', airlineName: '', flightNumber: '', 
          seatNumber: '', arrivalDate: '',
          mobilePhone: '', businessPhone: '',
          gender: '', dateOfBirth: '', passportNumber: '', nationality: '', portOfEmbarkation: '', lengthOfStay: '', countriesVisited: '',
          fever: '', soreThroat: '', jointPain: '', cough: '', breathingDifficulties: '', rash: '',
          
          permAddress: 
          	{
          	numberAndStreet: '', 
              apartmentNumber: '', 
              city: '', 
              stateProvince: '', 
              country: '', 
              zipPostalCode: '',
          	},
          
          tempAddress:
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
  		    {
  		      lastName: "",
  		      firstName: "",
  		    middleInitial: "",
  		      seatNumber: "",
  		      dateOfBirth: "",
  		      gender: "",
  		    nationality: "",
 			 passportNumber: "",
  		    }
  		  ],
    		nonFamilyTravelCompanions: [
  		    {
  		      lastName: "",
  	    	  firstName: "",
  	    	middleInitial: "",
  	    	  seatNumber: "",
  	    	dateOfBirth: "",
  		    gender: "",
  		    nationality: "",
  			 passportNumber: "",
  		    }
  		  ]
        };
	
	function equalTo(ref: any, msg: any) {
		  return Yup.mixed().test({
		    name: 'equalTo',
		    exclusive: false,
		    message: msg || '${path} must be the same as ${reference}',
		    params: {
		      reference: ref.path,
		    },
		    test: function(value: any) {
		      return value === this.resolve(ref);
		    },
		  });
		}
		Yup.addMethod(Yup.string, 'equalTo', equalTo);
	
	   const handleSubmit = (values) => {
           var object = {};
           
           var json = JSON.stringify(values);
           console.log(json);

           fetch('https://host.openelis.org:8445/locator-form' , {
                   method: 'POST',
                   headers: {
                           'Content-Type': 'application/json', 
                   },
                   body: json
           })
            .catch( err => {
                    console.log(err);
            })
           }
           
var id = null;

function Home() {
	
	id = uuidv4();
	var { inputRef } = useBarcode({ value: id, });
  return (
    <div className="home">
        <div className="row">
          <div className="col-lg-12">
              <div>
              <Formik
               initialValues={initialValues}
              validationSchema={Yup.object({
            	  
             	
//                    acceptedTerms: Yup.boolean()
//                      .required('Required')
//                      .oneOf([true], 'You must accept the terms and conditions.'),
//                      
//         	         airlineName: Yup.string()
//         	           .max(15, 'Must be 15 characters or less')
//         	           .required('Required'),
//                  flightNumber: Yup.string()
//         	           .max(15, 'Must be 15 characters or less')
//         	           .required('Required'),
//                  seatNumber: Yup.string()
//         	           .max(15, 'Must be 15 characters or less')
//         	           .required('Required'),
//                  arrivalDate: Yup.string()
//                    	   .required('Required'),
//                    	   
//                    		 title: Yup.string()
//                             .oneOf(
//                               ['mr', 'mrs', 'miss', 'other'],
//                               'Invalid Status'
//                             )
//                             .required('Required'),
//                    	      firstName: Yup.string()
//                              .max(15, 'Must be 15 characters or less')
//                              .required('Required'),
//                   	     lastName: Yup.string()
//                   	       .max(20, 'Must be 20 characters or less')
//                   	       .required('Required'),
//                   	    middleInitial: Yup.string()
//                	       .max(20, 'Must be 20 characters or less')
//                	       .required('Required'),
//                   	    gender: Yup.string()
//       	             .oneOf(
//       	               ['male', 'female'],
//       	               'Invalid Gender'
//       	             )
//       	             .required('Required'),
//       	 		 portOfEmbarkation: Yup.string()
//				    .max(20, 'Must be 20 characters or less')
//					.required('Required'), 
//		 countriesVisited: Yup.string()
//						.required('Required'), 
//		 lengthOfStay: Yup.string()
//							.required('Required'), 
//							
//					           fever: Yup.string()
//					             .oneOf(
//					               ['yes', 'no'],
//					               'Invalid Status'
//					             )
//					             .required('Required'),
//					             soreThroat: Yup.string()
//					             .oneOf(
//					               ['yes', 'no'],
//					               'Invalid Status'
//					             )
//					             .required('Required'),
//					             jointPain: Yup.string()
//					             .oneOf(
//					               ['yes', 'no'],
//					               'Invalid Status'
//					             )
//					             .required('Required'),
//					             cough: Yup.string()
//					             .oneOf(
//					               ['yes', 'no'],
//					               'Invalid Status'
//					             )
//					             .required('Required'),
//					             breathingDifficulties: Yup.string()
//					             .oneOf(
//					               ['yes', 'no'],
//					               'Invalid Status'
//					             )
//					             .required('Required'),
//					             rash: Yup.string()
//					             .oneOf(
//					               ['yes', 'no'],
//					               'Invalid Status'
//					             )
//					             .required('Required'),	
//					             
//					             visitPurpose: Yup.string()
//					             .oneOf(
//					               ['business', 'pleasure', 'other'],
//					               'Invalid Job Type'
//					             )
//					             .required('Required'),
//					             mobilePhone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
//					         	   .min(10, 'Must be 10 numbers'),
//					  	     businessPhone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
//					         	   .min(10, 'Must be 10 numbers'),
//					  	    
//				           	  email: Yup.string()
//					              .email('Invalid email address')
//					              .required('Required'),
//					          confirmEmail: Yup.string().equalTo(Yup.ref('email'), 'Emails must match')
//					          	   .oneOf([Yup.ref('confirmEmail'), "Emails must match"])
//					              .required('Email confirm is required'),
					              
//					     		 passportNumber: Yup.string()
//								   .max(20, 'Must be 20 characters or less')
//								   .required('Required'),
//						 nationality: Yup.string()
//									.max(20, 'Must be 20 characters or less')
//									.required('Required'),
//									
//									 permAddress: Yup.object().shape ({
//										 
//										 numberAndStreet: Yup.string()
//							                       .max(20, 'Must be 20 characters or less')
//							                       .required('Required'),
//							             apartmentNumber: Yup.string()
//							                       .max(20, 'Must be 20 characters or less')
//							                       .required('Required'),
//
//							             city: Yup.string()
//							                       .max(20, 'Must be 20 characters or less')
//							                       .required('Required'),
//
//							             stateProvince: Yup.string()
//							                       .max(20, 'Must be 20 characters or less')
//							                       .required('Required'),
//
//							             country: Yup.string()
//							                       .max(20, 'Must be 20 characters or less')
//							                       .required('Required'),
//
//							             zipPostalCode: Yup.string()
//							                       .max(20, 'Must be 20 characters or less')
//							                       .required('Required'),
//									 }),
//									 
//									  tempAddress: Yup.object().shape ({
//										  
//										  hotelName: Yup.string()
//							              			.max(20, 'Must be 20 characters or less')
//							              			.required('Required'),
//							              
//										 numberAndStreet: Yup.string()
//							                       .max(20, 'Must be 20 characters or less')
//							                       .required('Required'),
//							             apartmentNumber: Yup.string()
//							                       .max(20, 'Must be 20 characters or less')
//							                       .required('Required'),
//
//							             city: Yup.string()
//							                       .max(20, 'Must be 20 characters or less')
//							                       .required('Required'),
//
//							             stateProvince: Yup.string()
//							                       .max(20, 'Must be 20 characters or less')
//							                       .required('Required'),
//
//							             country: Yup.string()
//							                       .max(20, 'Must be 20 characters or less')
//							                       .required('Required'),
//
//							             zipPostalCode: Yup.string()
//							                       .max(20, 'Must be 20 characters or less')
//							                       .required('Required'),
//									 }),
//									 
//									  emergencyContact: Yup.object().shape ({
//										  
//										  lastName: Yup.string()
//										  	.max(20, 'Must be 20 characters or less')
//										  	.required('Required'),
//
//										  firstName: Yup.string()
//										  	.max(20, 'Must be 20 characters or less')
//										  	.required('Required'),
//
//										  city: Yup.string()
//										  	.max(20, 'Must be 20 characters or less')
//										  	.required('Required'),
//
//										  country: Yup.string()
//										  	.max(20, 'Must be 20 characters or less')
//										  	.required('Required'),
//
//										  email: Yup.string()
//										  	.email('Invalid email address'),
//
//										  mobilePhone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
//										  	.min(10, 'Must be 10 numbers'),
//
//									 
//									  }),									

              })}
              
              onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                	 values.id = id;
                    
                    handleSubmit(values);
                    setSubmitting(false);
                  }, 400);
                }}
              
               render={({ values, errors, touched, handleReset }) => {
            	   
                 return (
                   <Form>
         	       <p> <b>Public Health Passenger Locator Form:</b> To protect your health, public health officers need you to complete this form whenever they suspect a communicable disease onboard a flight. Your information will help public health officers to contact you if you were exposed to a communicable disease. It is important to fill out this form completely and accurately. Your information is intended to be held in accordance with applicable laws and used only for public health purposes. &emsp;<b><i>~Thank you for helping us to protect your health.</i></b></p>
         	       
         	       <p> <b>Public Health Passenger Locator Form:</b> To protect your health, public health officers need you to complete this form whenever they suspect a communicable disease onboard a flight. Your information will help public health officers to contact you if you were exposed to a communicable disease. It is important to fill out this form completely and accurately. Your information is intended to be held in accordance with applicable laws and used only for public health purposes. &emsp;<b><i>~Thank you for helping us to protect your health.</i></b></p>

         	       
         	       <h5> <FormattedMessage id="nav.item.flightInformation" defaultMessage="Flight Information"/></h5>
         	       <table>
         	       <td>
         	       <MyTextInput
                      label=<FormattedMessage id="nav.item.airline" defaultMessage="Airline"/>
                      name="airlineName"
                      type="medtext"
                  />
         	       </td>
         	       <td>
         	      
                
         	       <MyTextInput
         	       	  label=<FormattedMessage id="nav.item.flightNumber" defaultMessage="Flight"/>
                      name="flightNumber"
                      type="smalltext"
                  />
         	       </td>
         	       <td>
         	       <MyTextInput
                      label=<FormattedMessage id="nav.item.seat" defaultMessage="Seat"/>
                      name="seatNumber"
                      type="smalltext"
                  />
         	       </td>
         	       <td>
         	       <MyTextInput
                      label=<FormattedMessage id="nav.item.dateOfArrival" defaultMessage="Date Of Arraval"/>
                      name="arrivalDate"
                      type="date"
                  />
         	       </td>
         	       </table>
         	       
        	       <h5> Personal Information </h5>
        	       <table>
        	       <td>
              	 <MySelect label="Title" name="title">
                 <option value="">Title</option>
                 <option value="mr">Mr</option>
                 <option value="mrs">Mrs</option>
                 <option value="miss">Miss</option>
                 <option value="other">Other</option>
               </MySelect>
               </td>
               <td>
               
               <MyTextInput
               label="Last (Family) Name"
               name="lastName"
               type="text"
             /> 
               </td>
               <td>
            	   <MyTextInput
                     label="First (Given) Name"
                     name="firstName"
                     type="text"
                   />
               </td>
            	   <td>
                   
                   <MyTextInput
                   label="Middle Initial"
                   name="middleInitial"
                   type="smalltext"
                 /> 
                   </td>
            <td>
         
            <MySelect label="Sex" name="gender">
            <option value="">Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </MySelect>
            
        </td>
        <td>
	       <MyTextInput
           label="Date Of Birth"
           name="dateOfBirth"
           type="date"
       />
	       </td>
         </table>
         
         <h5> Health Information</h5>
         <table> 
         <td>
         <MyTextInput
           label="Proposed Length of Stay in Mauritius (days)"
           name="lengthOfStay"
           type="smalltext"
         />
        </td> 
         
         <td>
         <MyTextInput
           label="Countries visited during last  months"
           name="countries"
           type="text"
         />
        </td> 
         <td>
         <MyTextInput
           label="Port Of Embarkation"
           name="portOfEmbarkation"
           type="text"
         />

        </td>
         </table>
         
         <h5> Are you suffering from?</h5>
         <table> 
         <td>
        	 <MySelect label="Fever" name="fever">
             <option value="">Fever</option>
             <option value="yes">Yes</option>
             <option value="no">No</option>
           </MySelect>
           </td>
           <td>
        	 <MySelect label="Sore Throat" name="soreThroat">
           <option value="">Sore Throat</option>
           <option value="yes">Yes</option>
           <option value="no">No</option>
         </MySelect>
         </td>
         <td>
         <MySelect label="Joint Pain" name="jointPain">
         <option value="">Joint Pain</option>
         <option value="yes">Yes</option>
         <option value="no">No</option>
        </MySelect>
        </td>
        <td>
        <MySelect label="Cough" name="cough">
        <option value="">Cough</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
        </MySelect>
        </td>
        <td>
        <MySelect label="Breathing Difficulties" name="breathingDifficulties">
        <option value="">Difficulties</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
        </MySelect>
        </td>
        <td>
        <MySelect label="Rash" name="rash">
        <option value="">Rash</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
        </MySelect>
        </td>
        </table>
        
        <h5> Phone Number(s) Where you can be reached if needed? Include country code and city code. </h5>
        <table>
            <td>
            <MySelect label="Purpose of Visit" name="visitPurpose">
          <option value="">Purpose</option>
          <option value="business">Business</option>
          <option value="pleasure">Pleasure</option>
          <option value="other">Other</option>
        </MySelect>
        </td>
            <td>
            <MyTextInput
              label="Mobile Phone"
              name="mobilePhone"
              type="text"
          />
            </td>
            <td>
            <MyTextInput
              label="Business Phone"
              name="businessPhone"
              type="text"
          />
            </td>
            </table>
            <table>
            <td>
            
            <MyTextInput
            label="Email Address"
            name="email"
            type="email"
          />
            </td>
            <td>
            <MyTextInput
            label="Confirm Email Address"
            name="confirmEmail"
            type="email"
          />
            </td>
            
            <td>
        	   <MyTextInput
                 label="Nationality"
                 name="nationality"
                 type="medtext"
               />

           </td>
            <td>
       	   <MyTextInput
              label="Passport Number"
              name="passportNumber"
              type="medtext"
            />
        </td>
            </table>
            <h5> Permanent Address</h5>
            <table>
            <td>
            <MyTextInput
              label="Number and Street"
              name="permAddress.numberAndStreet"
              type="text"
          />
            </td>
            <td>
            <MyTextInput
              label="Apartment #"
              name="permAddress.apartmentNumber"
              type="smalltext"
          />
            </td>
            <td>
            <MyTextInput
              label="City"
              name="permAddress.city"
              type="medtext"
          />
            </td>
            </table>
            <table>
            <td>
            <MyTextInput
              label="State/Province"
              name="permAddress.stateProvince"
              type="text"
          />
            </td>
            <td>
            <MyTextInput
              label="Country"
              name="permAddress.country"
              type="medtext"
          />
            </td>
            <td>
            <MyTextInput
              label="Zip/Postal Code"
              name="permAddress.zipPostalCode"
              type="text"
          />
            </td>
            </table>
            <h5> Temporary Address in Mauritius</h5>
            <table>
            <td>
            <MyTextInput
              label="Hotel Name"
              name="tempAddress.hotelName"
              type="text"
          />
            </td>
            <td>
            <MyTextInput
              label="Number and Street"
              name="tempAddress.numberAndStreet"
              type="text"
          />
            </td>
            <td>
            <MyTextInput
              label="Apartment #"
              name="tempAddress.apartmentNumber"
              type="smalltext"
          />
            </td>
            <td>
            <MyTextInput
              label="City"
              name="tempAddress.city"
              type="medtext"
          />
            </td>
            </table>
            <table>
            <td>
            <MyTextInput
              label="State/Province"
              name="tempAddress.stateProvince"
              type="text"
          />
            </td>
            <td>
            <MyTextInput
              label="Country"
              name="tempAddress.country"
              type="medtext"
          />
            </td>
            <td>
            <MyTextInput
              label="Zip/Postal Code"
              name="tempAddress.zipPostalCode"
              type="text"
          />
            </td>
            </table>
            <h5> Emergency Contact Information of someone who can reach you during the next 30 days</h5>
            <table>
            <td>
            <MyTextInput
              label="Last (Family) Name"
              name="emergencyContact.lastName"
              type="text"
          />
            </td>
            <td>
            <MyTextInput
              label="First (Given) Name"
              name="emergencyContact.firstName"
              type="text"
          />
            </td>
            <td>
            <MyTextInput
              label="City"
              name="emergencyContact.city"
              type="medtext"
          />
            </td>
            <td>
            <MyTextInput
              label="Country"
              name="emergencyContact.country"
              type="medtext"
          />
            </td>
            </table>
            <table>
        
            <td>
            <MyTextInput
              label="Email"
              name="emergencyContact.email"
              type="text"
          />
            </td>
            <td>
            <MyTextInput
              label="Mobile Phone"
              name="emergencyContact.mobilePhone"
              type="text"
          />
            </td>
            </table>    
 	       <h5> Travel Companions Family</h5>
           <FieldArray
             name="familyTravelCompanions"
             render={({ insert, remove, push }) => (

               <div>
                 {values.familyTravelCompanions.length > 0 &&
                   values.familyTravelCompanions.map((comp, index) => (
                     <div className="row" key={index}>
                     
                     <table>
                     <td>
                       <div className="col">
                        
                         <label htmlFor={`familyTravelCompanions.${index}.lastName`}>Last (Family) Name</label>
                         <Field
                           name={`familyTravelCompanions.${index}.lastName`}
                           type="text"
                         />
                         {errors.familyTravelCompanions &&
                           errors.familyTravelCompanions[index] &&
                           errors.familyTravelCompanions[index].lastName &&
                           touched.familyTravelCompanions &&
                           touched.familyTravelCompanions[index].lastName && (
                             <div className="field-error">
                               {errors.familyTravelCompanions[index].lastName}
                             </div>
                           )}
                       </div>
                         </td>
                         <td>
                       <div className="col">
                         <label htmlFor={`familyTravelCompanions.${index}.firstName`}>First (Given) Name</label>
                         <Field
                           name={`familyTravelCompanions.${index}.firstName`}
                           type="text"
                         />
                         {errors.familyTravelCompanions &&
                           errors.familyTravelCompanions[index] &&
                           errors.familyTravelCompanions[index].firstName &&
                           touched.familyTravelCompanions &&
                           touched.familyTravelCompanions[index].firstName && (
                             <div className="field-error">
                               {errors.familyTravelCompanions[index].firstName}
                             </div>
                           )}
                       </div>
                         </td>
                         </table><table>
                         <td>
                         <div className="col">
                           <label htmlFor={`familyTravelCompanions.${index}.seatNumber`}>Seat #</label>
                           <Field
                             name={`familyTravelCompanions.${index}.seatNumber`}
                             type="smalltext"
                           />
                           {errors.familyTravelCompanions &&
                             errors.familyTravelCompanions[index] &&
                             errors.familyTravelCompanions[index].seatNumber &&
                             touched.familyTravelCompanions &&
                             touched.familyTravelCompanions[index].seatNumber && (
                               <div className="field-error">
                                 {errors.familyTravelCompanions[index].seatNumber}
                               </div>
                             )}
                         </div>
                           </td>
                           <td>
                           <div className="col">
                             <label htmlFor={`familyTravelCompanions.${index}.dateOfBirth`}>Date Of Birth</label>
                             <Field
                               name={`familyTravelCompanions.${index}.dateOfBirth`}
                               type="date"
                             />
                             {errors.familyTravelCompanions &&
                               errors.familyTravelCompanions[index] &&
                               errors.familyTravelCompanions[index].dateOfBirth &&
                               touched.familyTravelCompanions &&
                               touched.familyTravelCompanions[index].dateOfBirth && (
                                 <div className="field-error">
                                   {errors.familyTravelCompanions[index].dateOfBirth}
                                 </div>
                               )}
                           </div>
                             </td>
                             
                             <td>
                             <div className="col">
                               
                               <MySelect
                                 label= "Sex" name={`familyTravelCompanions.${index}.gender`}>
                               <option value="">Sex</option>
                               <option value="male">Male</option>
                               <option value="female">Female</option>
                               </MySelect>
                               {errors.familyTravelCompanions &&
                                 errors.familyTravelCompanions[index] &&
                                 errors.familyTravelCompanions[index].gender &&
                                 touched.familyTravelCompanions &&
                                 touched.familyTravelCompanions[index].gender && (
                                   <div className="field-error">
                                     {errors.familyTravelCompanions[index].gender}
                                   </div>
                                 )}
                             </div>
                               </td>
                             
                             <td>
                             <div className="col">
                               <label htmlFor={`familyTravelCompanions.${index}.nationality`}>Nationality</label>
                               <Field
                                 name={`familyTravelCompanions.${index}.nationality`}
                                 type="medtext"
                               />
                               {errors.familyTravelCompanions &&
                                 errors.familyTravelCompanions[index] &&
                                 errors.familyTravelCompanions[index].nationality &&
                                 touched.familyTravelCompanions &&
                                 touched.familyTravelCompanions[index].nationality && (
                                   <div className="field-error">
                                     {errors.familyTravelCompanions[index].nationality}
                                   </div>
                                 )}
                             </div>
                               </td>
                               <td>
                               <div className="col">
                                 <label htmlFor={`familyTravelCompanions.${index}.passportNumber`}>Passport Number</label>
                                 <Field
                                   name={`familyTravelCompanions.${index}.passportNumber`}
                                   type="medtext"
                                 />
                                 {errors.familyTravelCompanions &&
                                   errors.familyTravelCompanions[index] &&
                                   errors.familyTravelCompanions[index].passportNumber &&
                                   touched.familyTravelCompanions &&
                                   touched.familyTravelCompanions[index].passportNumber && (
                                     <div className="field-error">
                                       {errors.familyTravelCompanions[index].passportNumber}
                                     </div>
                                   )}
                               </div>
                                 </td>
                         <td>
                       <div className="col">
                         <button
                           type="button"
                           className="secondary"
                           onClick={() => remove(index)}
                         >
                           X
                         </button>
                       </div>
                       </td>
                       </table>
                     </div>
                     
                   ))}
                 <button
                   type="button"
                   className="secondary"
                   onClick={() => push({ lastName: "", firstName: "" }) }
                 >
                   Add Travel Companion Family
                 </button>
               </div>
             )}
           />
           <br />  
	       <h5> Travel Companions Non-Family</h5>
            <FieldArray
              name="nonFamilyTravelCompanions"
              render={({ insert, remove, push }) => (
                <div>
                  {values.nonFamilyTravelCompanions.length > 0 &&
                    values.nonFamilyTravelCompanions.map((comp, index) => (
                      <div className="row" key={index}>
                      
                      <table>
                      <td>
                        <div className="col">
                          <label htmlFor={`nonFamilyTravelCompanions.${index}.lastName`}>Last (Family) Name</label>
                          <Field
                            name={`nonFamilyTravelCompanions.${index}.lastName`}
                            type="text"
                          />
                          {errors.nonFamilyTravelCompanions &&
                            errors.nonFamilyTravelCompanions[index] &&
                            errors.nonFamilyTravelCompanions[index].lastName &&
                            touched.nonFamilyTravelCompanions &&
                            touched.nonFamilyTravelCompanions[index].lastName && (
                              <div className="field-error">
                                {errors.nonFamilyTravelCompanions[index].lastName}
                              </div>
                            )}
                        </div>
                          </td>
                          <td>
                        <div className="col">
                          <label htmlFor={`nonFamilyTravelCompanions.${index}.firstName`}>First (Given) Name</label>
                          <Field
                            name={`nonFamilyTravelCompanions.${index}.firstName`}
                            type="text"
                          />
                          {errors.nonFamilyTravelCompanions &&
                            errors.nonFamilyTravelCompanions[index] &&
                            errors.nonFamilyTravelCompanions[index].firstName &&
                            touched.nonFamilyTravelCompanions &&
                            touched.nonFamilyTravelCompanions[index].firstName && (
                              <div className="field-error">
                                {errors.nonFamilyTravelCompanions[index].firstName}
                              </div>
                            )}
                        </div>
                          </td>
                          </table><table>
                          <td>
                          <div className="col">
                            <label htmlFor={`nonFamilyTravelCompanions.${index}.seatNumber`}>Seat #</label>
                            <Field
                              name={`nonFamilyTravelCompanions.${index}.seatNumber`}
                              type="smalltext"
                            />
                            {errors.nonFamilyTravelCompanions &&
                              errors.nonFamilyTravelCompanions[index] &&
                              errors.nonFamilyTravelCompanions[index].seatNumber &&
                              touched.nonFamilyTravelCompanions &&
                              touched.nonFamilyTravelCompanions[index].seatNumber && (
                                <div className="field-error">
                                  {errors.nonFamilyTravelCompanions[index].seatNumber}
                                </div>
                              )}
                          </div>
                            </td>
                            <td>
                            <div className="col">
                              <label htmlFor={`nonFamilyTravelCompanions.${index}.dateOfBirth`}>Date Of Birth</label>
                              <Field
                                name={`nonFamilyTravelCompanions.${index}.dateOfBirth`}
                                type="date"
                              />
                              {errors.nonFamilyTravelCompanions &&
                                errors.nonFamilyTravelCompanions[index] &&
                                errors.nonFamilyTravelCompanions[index].dateOfBirth &&
                                touched.nonFamilyTravelCompanions &&
                                touched.nonFamilyTravelCompanions[index].dateOfBirth && (
                                  <div className="field-error">
                                    {errors.nonFamilyTravelCompanions[index].dateOfBirth}
                                  </div>
                                )}
                            </div>
                              </td>
                              
                              <td>
                              <div className="col">
                                
                                <MySelect
                                  label= "Sex" name={`nonFamilyTravelCompanions.${index}.gender`}>
                                <option value="">Sex</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                </MySelect>
                                {errors.nonFamilyTravelCompanions &&
                                  errors.nonFamilyTravelCompanions[index] &&
                                  errors.nonFamilyTravelCompanions[index].gender &&
                                  touched.nonFamilyTravelCompanions &&
                                  touched.nonFamilyTravelCompanions[index].gender && (
                                    <div className="field-error">
                                      {errors.nonFamilyTravelCompanions[index].gender}
                                    </div>
                                  )}
                              </div>
                                </td>
                              <td>
                              <div className="col">
                                <label htmlFor={`nonFamilyTravelCompanions.${index}.nationality`}>Nationality</label>
                                <Field
                                  name={`nonFamilyTravelCompanions.${index}.nationality`}
                                  type="medtext"
                                />
                                {errors.nonFamilyTravelCompanions &&
                                  errors.nonFamilyTravelCompanions[index] &&
                                  errors.nonFamilyTravelCompanions[index].nationality &&
                                  touched.nonFamilyTravelCompanions &&
                                  touched.nonFamilyTravelCompanions[index].nationality && (
                                    <div className="field-error">
                                      {errors.nonFamilyTravelCompanions[index].nationality}
                                    </div>
                                  )}
                              </div>
                                </td>
                                <td>
                                <div className="col">
                                  <label htmlFor={`nonFamilyTravelCompanions.${index}.passportNumber`}>Passport Number</label>
                                  <Field
                                    name={`nonFamilyTravelCompanions.${index}.passportNumber`}
                                    type="medtext"
                                  />
                                  {errors.nonFamilyTravelCompanions &&
                                    errors.nonFamilyTravelCompanions[index] &&
                                    errors.nonFamilyTravelCompanions[index].passportNumber &&
                                    touched.nonFamilyTravelCompanions &&
                                    touched.nonFamilyTravelCompanions[index].passportNumber && (
                                      <div className="field-error">
                                        {errors.nonFamilyTravelCompanions[index].passportNumber}
                                      </div>
                                    )}
                                </div>
                                  </td>
                          <td>
                        <div className="col">
                          <button
                            type="button"
                            className="secondary"
                            onClick={() => remove(index)}
                          >
                            X
                          </button>
                        </div>
                        </td>
                        </table>
                      
                      </div>
                      
                    ))}
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => push({ lastName: "", firstName: "" })}
                  >
                    Add Travel Companion Non-Family
                  </button>
                </div>
              )}
            />            
                   <table> 
                   <td>
                   <MyCheckbox name="acceptedTerms">
                   *I declare that the information I have given is true and complete. I understand that I shall commit an offence if I fail to fill the form or knowingly submit false information.
                   <br />
                   *Je déclare qu’ à ma connaissances que toutes les informations fournies sont exactes et complètes. Je suis consients que le fait de ne pas remplie cette forme ou toute fausse declaration de ma part pourra.
                   </MyCheckbox>
                     </td>
                     </table>
                     <table>
                     <td>
                  <button type="submit">Submit</button> 	 
                     </td>
                  </table>
                  
                
                  <table> 
                  <td>
                  <img ref={inputRef} />
                    </td>
                 </table>
         	      </Form>
                 );
               }}
             />
           </div>
          </div>
        </div>
    </div>
  );
}

export default Home;