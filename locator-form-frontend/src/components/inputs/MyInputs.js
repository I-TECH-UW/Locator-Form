import React from "react";
import { Field, useField } from 'formik';
import styled from "@emotion/styled";
import { FormattedMessage } from 'react-intl';
import MultiCapableSelect from "./MultiCapableSelect"
import { PhoneInputField } from './PhoneInputField'


// Styled components ....

export const StyledSelect = styled(MultiCapableSelect)`
	  color: var(--blue);	
//	  width : 150px;
    `;

export const StyledPhoneInput = styled(PhoneInputField)`
	  color: var(--blue);	
//	  width : 150px;
    `;
    
export const StyledErrorMessage = styled.div` 
	  font-size: 12px;
	  color: var(--red-600);
//	  width: 150px;
	  margin-top: 0.25rem;
	  &:before {
	    content: " ";
	    font-size: 10px;
	  }
	`;

const StyledLabel = styled.label`
	  margin-top: 1rem;	
	`;
	
export const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage
  // entirely.
  // <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <div className="input-group">
        <input className="text-input form-control" {...field} {...props} />
        {props.iconClickable &&
          <span className="input-group-btn">
            <button className="input-icon-button" 
            type="button"
            onClick={e => {
              props.iconOnClick(e)
						}}>{props.icon}</button>
          </span>
        }
      </div>
      {!props.iconClickable &&
        <i>{props.icon}</i>
      }
      <div className="error">
        <StyledErrorMessage>
          {props.additionalErrorMessage}
        </StyledErrorMessage>
      </div>
      {meta.touched && meta.error ? (
        <div className="error">
          <StyledErrorMessage>
            <FormattedMessage id={meta.error} defaultMessage={meta.error} />
          </StyledErrorMessage>
        </div>
      ) : null}
    </>
  );
};

export const MyRadioInputGroup = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage
  // entirely.
  // <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
  const [meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      {Object.keys(props.values).map(value =>
    	<label key={value}>
	  		<Field name={props.name} type="radio" value={value} className="form-control radio-button" {...props}/>
     		<FormattedMessage id={props.values[value]} defaultMessage={props.values[value]} />
	  	</label>
        )
	  }
      
	  
      {meta.touched && meta.error ? (
        <div className="error"><StyledErrorMessage><FormattedMessage id={meta.error} defaultMessage={meta.error} /></StyledErrorMessage></div>
      ) : null}
    </>
  );
};

export const MyHiddenInput = ({ label, ...props }) => {
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

export const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" className="form-control" />
      </label>
        {children}
      {meta.touched && meta.error ? (
        <div className="error"><StyledErrorMessage><FormattedMessage id={meta.error} defaultMessage={meta.error} /></StyledErrorMessage></div>
      ) : null}
    </>
  );
};

export const MySelect = ({ label, options, isMulti, isSearchable,  form, ...props }) => {
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

export const MyPhoneInput = ({ label, options, ...props }) => {
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