import React from "react";
import { render } from "react-dom";
import "./styles.css";
import { Formik, Form, Field, FieldArray, useField } from 'formik';
import styled from "@emotion/styled";
import * as Yup from 'yup';

interface Values {
	  firstName: string;
	  lastName: string;
	  middleInitial: string;
	  email: string;
	  acceptedTerms: string;
	  visitPurpose: string;
	  title: string;
		mobilePhone: string;
		businessPhone: string;
		homePhone: string;
sex: string;        
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
		otherPhone: string;	
	},

familyTravelCompanions: [
  {
  	 lastName: string;
	 firstName: string;
  	 middleInitial: string;
  	 seatNumber: string;
  	 age: string;
  },
],

nonFamilyTravelCompanions: [
	{
	    lastName: string;
      firstName: string;
	middleInitial: string;
		seatNumber: string;
		age: string;
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

	const initialValues={ firstName: '', lastName: '', middleInitial: '', email: '',
          acceptedTerms: false,
          visitPurpose: '', title: '', airlineName: '', flightNumber: '', 
          seatNumber: '', arrivalDate: '',
          mobilePhone: '', businessPhone: '', homePhone: '',
          sex: '', passportNumber: '', nationality: '', portOfEmbarkation: '', lengthOfStay: '', countriesVisited: '',
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
  		    	otherPhone: '',
  		    },
    		
    		familyTravelCompanions: [
  		    {
  		      lastName: "",
  		      firstName: "",
  		    middleInitial: "",
  		      seatNumber: "",
  		      age: "",
  		    }
  		  ],
    		nonFamilyTravelCompanions: [
  		    {
  		      lastName: "",
  	    	  firstName: "",
  	    	middleInitial: "",
  	    	  seatNumber: "",
  		      age: "",
  		    }
  		  ]
        };
	
	const handleSubmit = (values) => {
		var object = {};
		var json = JSON.stringify(values);
		console.log(json);
		fetch(`${process.env.REACT_APP_DATA_IMPORT_API}/server/`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem("react-token")}`,
			},
			body: json,
			credentials: 'include'
		}).then(this.props.history.push('/server'));
	}      

function Home() {
  return (
    <div className="home">
        <div className="row">
          <div className="col-lg-12">
              <div>
              <Formik
               initialValues={initialValues}
              validationSchema={Yup.object({
             	 
             	
                    acceptedTerms: Yup.boolean()
                      .required('Required')
                      .oneOf([true], 'You must accept the terms and conditions.'),
                  
                     
                      
         	         airlineName: Yup.string()
         	           .max(15, 'Must be 15 characters or less')
         	           .required('Required'),
                  flightNumber: Yup.string()
         	           .max(15, 'Must be 15 characters or less')
         	           .required('Required'),
                  seatNumber: Yup.string()
         	           .max(15, 'Must be 15 characters or less')
         	           .required('Required'),
                  arrivalDate: Yup.string()
                    	   .required('Required'),
                    	   
                    		 title: Yup.string()
                             .oneOf(
                               ['mr', 'mrs', 'miss', 'other'],
                               'Invalid Status'
                             )
                             .required('Required'),
                    	      firstName: Yup.string()
                              .max(15, 'Must be 15 characters or less')
                              .required('Required'),
                   	     lastName: Yup.string()
                   	       .max(20, 'Must be 20 characters or less')
                   	       .required('Required'),
                   	    middleInitial: Yup.string()
                	       .max(20, 'Must be 20 characters or less')
                	       .required('Required'),
                   	    sex: Yup.string()
       	             .oneOf(
       	               ['male', 'female'],
       	               'Invalid Sex'
       	             )
       	             .required('Required'),
       	 		 portOfEmbarkation: Yup.string()
				    .max(20, 'Must be 20 characters or less')
					.required('Required'), 
		 countriesVisited: Yup.string()
						.required('Required'), 
		 lengthOfStay: Yup.string()
							.required('Required'), 
							
					           fever: Yup.string()
					             .oneOf(
					               ['yes', 'no'],
					               'Invalid Status'
					             )
					             .required('Required'),
					             soreThroat: Yup.string()
					             .oneOf(
					               ['yes', 'no'],
					               'Invalid Status'
					             )
					             .required('Required'),
					             jointPain: Yup.string()
					             .oneOf(
					               ['yes', 'no'],
					               'Invalid Status'
					             )
					             .required('Required'),
					             cough: Yup.string()
					             .oneOf(
					               ['yes', 'no'],
					               'Invalid Status'
					             )
					             .required('Required'),
					             breathingDifficulties: Yup.string()
					             .oneOf(
					               ['yes', 'no'],
					               'Invalid Status'
					             )
					             .required('Required'),
					             rash: Yup.string()
					             .oneOf(
					               ['yes', 'no'],
					               'Invalid Status'
					             )
					             .required('Required'),	
					             
					             visitPurpose: Yup.string()
					             .oneOf(
					               ['business', 'pleasure', 'other'],
					               'Invalid Job Type'
					             )
					             .required('Required'),
					             mobilePhone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
					         	   .min(10, 'Must be 10 numbers'),
					  	     businessPhone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
					         	   .min(10, 'Must be 10 numbers'),
					  	     homePhone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
					         	   .min(10, 'Must be 10 numbers'),
				           	  email: Yup.string()
					              .email('Invalid email address')
					              .required('Required'),
					     		 passportNumber: Yup.string()
								   .max(20, 'Must be 20 characters or less')
								   .required('Required'),
						 nationality: Yup.string()
									.max(20, 'Must be 20 characters or less')
									.required('Required'),
									
									 permAddress: Yup.object().shape ({
										 
										 numberAndStreet: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),
							             apartmentNumber: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),

							             city: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),

							             stateProvince: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),

							             country: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),

							             zipPostalCode: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),
									 }),
									 
									  tempAddress: Yup.object().shape ({
										  
										  hotelName: Yup.string()
							              			.max(20, 'Must be 20 characters or less')
							              			.required('Required'),
							              
										 numberAndStreet: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),
							             apartmentNumber: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),

							             city: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),

							             stateProvince: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),

							             country: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),

							             zipPostalCode: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),
									 }),
									 
									  emergencyContact: Yup.object().shape ({
										  
										  lastName: Yup.string()
										  	.max(20, 'Must be 20 characters or less')
										  	.required('Required'),

										  firstName: Yup.string()
										  	.max(20, 'Must be 20 characters or less')
										  	.required('Required'),

										  city: Yup.string()
										  	.max(20, 'Must be 20 characters or less')
										  	.required('Required'),

										  country: Yup.string()
										  	.max(20, 'Must be 20 characters or less')
										  	.required('Required'),

										  email: Yup.string()
										  	.email('Invalid email address'),

										  mobilePhone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
										  	.min(10, 'Must be 10 numbers'),

										  otherPhone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
										  	.min(10, 'Must be 10 numbers'),
									 
									  }),									

              })}
              
              
              onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    handleSubmit(values);
                    setSubmitting(false);
                  }, 400);
                }}
              
               render={({ values, errors, touched, handleReset }) => {
                 console.group("formik");
                 console.log("touched", touched);
                 console.log("values", values);
                 console.groupEnd("formik");
                 return (
                   <Form>
         	       <p> <b>Public Health Passenger Locator Form:</b> To protect your health, public health officers need you to complete this form whenever they suspect a communicable disease onboard a flight. Your information will help public health officers to contact you if you were exposed to a communicable disease. It is important to fill out this form completely and accurately. Your information is intended to be held in accordance with applicable laws and used only for public health purposes. &emsp;<b><i>~Thank you for helping us to protect your health.</i></b></p>

         	       <h5> Flight Information</h5>
         	       <table>
         	       <td>
         	       <MyTextInput
                      label="Airline Name"
                      name="airlineName"
                      type="text"
                      placeholder="Airline Name"
                  />
         	       </td>
         	       <td>
         	       <MyTextInput
                      label="Flight Number"
                      name="flightNumber"
                      type="text"
                      placeholder="Flight Number"
                  />
         	       </td>
         	       <td>
         	       <MyTextInput
                      label="Seat Number"
                      name="seatNumber"
                      type="text"
                      placeholder="Seat Number"
                  />
         	       </td>
         	       <td>
         	       <MyTextInput
                      label="Arrival Date"
                      name="arrivalDate"
                      type="date"
                      placeholder="Arrival Date"
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
               placeholder="Doe"
             /> 
               </td>
               <td>
            	   <MyTextInput
                     label="First (Given) Name"
                     name="firstName"
                     type="text"
                     placeholder="Jane"
                   />
               </td>
            	   <td>
                   
                   <MyTextInput
                   label="Middle Initial"
                   name="middleInitial"
                   type="text"
                   placeholder="M"
                 /> 
                   </td>
            <td>
         
            <MySelect label="Sex" name="sex">
            <option value="">Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </MySelect>
            
        </td>
         </table>
         
         <h5> Health Information</h5>
         <table> 
         <td>
         <MyTextInput
           label="Proposed Length of Stay in Mauritius (days)"
           name="lengthOfStay"
           type="number"
           placeholder="Length of Stay"
         />
        </td> 
        <td>
         <MyTextInput
           label="Countries Visited During Last 6 Months"
           name="countriesVisited"
           type="text"
           placeholder="Countries Visited During Last 6 Months"
         />
         </td>
         <td>
         <MyTextInput
           label="Port Of Embarkation"
           name="portOfEmbarkation"
           type="text"
           placeholder="Port Of Embarkation"
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
              placeholder="Mobile Phone"
          />
            </td>
            <td>
            <MyTextInput
              label="Business Phone"
              name="businessPhone"
              type="text"
              placeholder="Business Phone"
          />
            </td>
            <td>
            <MyTextInput
              label="Home Phone"
              name="homePhone"
              type="text"
              placeholder="Home Phone"
          />
            </td>
            </table>
            
            <table>
            <td>
            
            <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />
            </td>
            <td>
       	   <MyTextInput
              label="Passport Number"
              name="passportNumber"
              type="text"
              placeholder="Passport Number"
            />

        </td>
       	   <td>
       	   <MyTextInput
                label="Nationality"
                name="nationality"
                type="text"
                placeholder="Nationality"
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
              placeholder="Number and Street"
          />
            </td>
            <td>
            <MyTextInput
              label="Apartment Number"
              name="permAddress.apartmentNumber"
              type="text"
              placeholder="Apartment Number"
          />
            </td>
            </table>
            <table>
            <td>
            <MyTextInput
              label="City"
              name="permAddress.city"
              type="text"
              placeholder="City"
          />
            </td>
            <td>
            <MyTextInput
              label="State/Province"
              name="permAddress.stateProvince"
              type="text"
              placeholder="State/Province"
          />
            </td>
            <td>
            <MyTextInput
              label="Country"
              name="permAddress.country"
              type="text"
              placeholder="Country"
          />
            </td>
            <td>
            <MyTextInput
              label="Zip/Postal Code"
              name="permAddress.zipPostalCode"
              type="text"
              placeholder="Zip/Postal Code"
          />
            </td>
            </table>
            
            
            <h5> Temporary Address</h5>
            <table>
            <td>
            <MyTextInput
              label="Hotel Name"
              name="tempAddress.hotelName"
              type="text"
              placeholder="Hotel Name"
          />
            </td>
            <td>
            <MyTextInput
              label="Number and Street"
              name="tempAddress.numberAndStreet"
              type="text"
              placeholder="Number and Street"
          />
            </td>
            <td>
            <MyTextInput
              label="Apartment Number"
              name="tempAddress.apartmentNumber"
              type="text"
              placeholder="Apartment Number"
          />
            </td>
            </table>
            <table>
            <td>
            <MyTextInput
              label="City"
              name="tempAddress.city"
              type="text"
              placeholder="City"
          />
            </td>
            <td>
            <MyTextInput
              label="State/Province"
              name="tempAddress.stateProvince"
              type="text"
              placeholder="State/Province"
          />
            </td>
            <td>
            <MyTextInput
              label="Country"
              name="tempAddress.country"
              type="text"
              placeholder="Country"
          />
            </td>
            <td>
            <MyTextInput
              label="Zip/Postal Code"
              name="tempAddress.zipPostalCode"
              type="text"
              placeholder="Zip/Postal Code"
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
              placeholder="Last (Family) Name"
          />
            </td>
            <td>
            <MyTextInput
              label="First (Given) Name"
              name="emergencyContact.firstName"
              type="text"
              placeholder="First (Given) Name"
          />
            </td>
            <td>
            <MyTextInput
              label="City"
              name="emergencyContact.city"
              type="text"
              placeholder="City"
          />
            </td>
            <td>
            <MyTextInput
              label="Country"
              name="emergencyContact.country"
              type="text"
              placeholder="Country"
          />
            </td>
            </table>
            <table>
        
            <td>
            <MyTextInput
              label="Email"
              name="emergencyContact.email"
              type="text"
              placeholder="Email"
          />
            </td>
            <td>
            <MyTextInput
              label="Mobile Phone"
              name="emergencyContact.mobilePhone"
              type="text"
              placeholder="Mobile Phone"
          />
            </td>
            <td>
            <MyTextInput
              label="Other Phone"
              name="emergencyContact.otherPhone"
              type="text"
              placeholder="Other Phone"
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
                           placeholder="Doe"
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
                           placeholder="Jane"
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
                         <td>
                         <div className="col">
                           <label htmlFor={`familyTravelCompanions.${index}.seatNumber`}>Seat Number</label>
                           <Field
                             name={`familyTravelCompanions.${index}.seatNumber`}
                             placeholder="Seat Number"
                             type="text"
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
                             <label htmlFor={`familyTravelCompanions.${index}.age`}>Age</label>
                             <Field
                               name={`familyTravelCompanions.${index}.age`}
                               placeholder="Age"
                               type="text"
                             />
                             {errors.familyTravelCompanions &&
                               errors.familyTravelCompanions[index] &&
                               errors.familyTravelCompanions[index].age &&
                               touched.familyTravelCompanions &&
                               touched.familyTravelCompanions[index].age && (
                                 <div className="field-error">
                                   {errors.familyTravelCompanions[index].age}
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
                            placeholder="Doe"
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
                            placeholder="Jane"
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
                          <td>
                          <div className="col">
                            <label htmlFor={`nonFamilyTravelCompanions.${index}.seatNumber`}>Seat Number</label>
                            <Field
                              name={`nonFamilyTravelCompanions.${index}.seatNumber`}
                              placeholder="Seat Number"
                              type="text"
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
                              <label htmlFor={`nonFamilyTravelCompanions.${index}.age`}>Age</label>
                              <Field
                                name={`nonFamilyTravelCompanions.${index}.age`}
                                placeholder="Age"
                                type="text"
                              />
                              {errors.nonFamilyTravelCompanions &&
                                errors.nonFamilyTravelCompanions[index] &&
                                errors.nonFamilyTravelCompanions[index].age &&
                                touched.nonFamilyTravelCompanions &&
                                touched.nonFamilyTravelCompanions[index].age && (
                                  <div className="field-error">
                                    {errors.nonFamilyTravelCompanions[index].age}
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
                     I accept the terms and conditions
                   </MyCheckbox>
                     </td><td>
                  <button type="submit">Submit</button> 	 
                       
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