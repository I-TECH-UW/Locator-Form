import React from "react"
import { FormattedMessage } from 'react-intl'
import { Formik, Form } from 'formik'
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MyTextInput } from './inputs/MyInputs'
import { CircularProgress } from '@material-ui/core'

class SearchBar extends React.Component {

	  constructor(props) {
	    super(props)
	    this.state = {
	      searchValue: '',
	      searchFailed: false,
	      failureReason: '',
	      isSearching: false,
	      travellers: [],
	    }
	  }

		errorMessage = () => {
			return (this.state.searchFailed ? 
				<FormattedMessage id={this.state.failureReason} defaultMessage="Error" /> 
				:
				<></>
			);
		}
		


		onNotFound = () => {
			console.log("not found")
			this.setState({ 
				isSearching: false ,
				searchFailed: true,
				failureReason: 'error.search.form.notfound' 
			});
		}

	  
	search = (searchValue) => {
		this.setState({ 
			isSearching: true ,
			searchFailed: false,
			failureReason: '' 
		})
		 fetch(`${process.env.REACT_APP_DATA_IMPORT_API}/formsearch/servicerequest/${searchValue}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
			        'Authorization': `Bearer ${localStorage.getItem("react-token")}`,
				},
			}).then(async response => {
				const status = response.status;
				if (response.ok) {
					this.setState({ 
						isSearching: false ,
						searchFailed: false,
						failureReason: '' 
					})
					const locatorForm = await response.json();
					//this is done to make conditional validation work in a sub-object
					locatorForm.permanentAddress.travellerType = locatorForm.travellerType;
				    this.props.onSearchSuccess(locatorForm, searchValue);
				} else if (status === 404) {
					this.searchForPassenger(searchValue);
				} else { 
					throw new Error("didn't receive form due to error")
				}
			}).catch(err => {
				console.log(err)
				this.setState({ 
					isSearching: false ,
					searchFailed: true,
					failureReason: 'error.search.form.error' 
				})

			})
	}
	
	searchForPassenger = (searchValue) => {
		this.setState({isSearching:true});
		 fetch(`${process.env.REACT_APP_DATA_IMPORT_API}/formsearch/passenger/${searchValue}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
			        'Authorization': `Bearer ${localStorage.getItem("react-token")}`,
				},
			}).then(async response => {
				const status = response.status;
				if (response.ok) {
					this.setState({ 
						isSearching: false ,
						searchFailed: false,
						failureReason: '' 
					})
					const body = await response.json();
					this.setState({travellers: body.travellers});
				} else if (status === 404) {
					return this.onNotFound();
				} else { 
					throw new Error("didn't receive form due to error")
				}
			}).catch(err => {
				console.log(err)
				this.setState({ 
					isSearching: false ,
					searchFailed: true,
					failureReason: 'error.search.form.error' 
				})

			})
	}
	
	handleChange = (event) => {    
		this.setState({searchValue: event.target.value});  
	}
	
	render() {
		return (<>
		<div className="row">
		<div className="col-lg-6 form-group">
		<Formik
        initialValues={{searchValue: ''}}
//        validationSchema={currentValidationShema}
        onSubmit={this.search}
      >{formikProps => (
        <Form>
	   {this.props.search ==undefined && (		
			<MyTextInput
			label={<FormattedMessage id="nav.item.form.search.label" defaultMessage="Search" />}
			name="searchValue"
			type="text"

			placeholder={this.props.intl.formatMessage({ id: 'nav.item.form.search.placeholder'})}
			icon={<FontAwesomeIcon icon={faSearch}/>}
			onKeyPress={e => {
				if (e.charCode === 13) {  
					e.preventDefault();
					this.setState({'travellers': []});
					this.search(formikProps.values.searchValue);
				}
			}}
			iconClickable={true}
			iconOnClick={e => {
				this.setState({'travellers': []});
				this.search(formikProps.values.searchValue);
			}}
			additionalErrorMessage={this.errorMessage()}
			// disabled={this.state.searching || this.state.confirming} 
		/>
	  )} 

	  {this.props.search =='testkit' && (
		<MyTextInput
		label={<FormattedMessage id="nav.item.form.search.label" defaultMessage="Search" />}
		name="searchValue"
		type="text"
		placeholder={this.props.intl.formatMessage({ id: 'nav.item.form.search.placeholder.testkit'})}
		icon={<FontAwesomeIcon icon={faSearch}/>}
		onKeyPress={e => {
			if (e.charCode === 13) {  
				e.preventDefault();
				this.search(formikProps.values.searchValue);
			}
		}}
		iconClickable={true}
		iconOnClick={e => {
			this.search(formikProps.values.searchValue);
		}}
		additionalErrorMessage={this.errorMessage()}
       />
	)} 
	
	{this.state.isSearching && (
		<CircularProgress
		size={24}
		/>
	)} 
		{this.state.travellers.length > 0 && ( 
			<table>
				  <tr>
				    <td></td>
				    <td><FormattedMessage id="nav.item.form.search.passport" defaultMessage="Passport Number" /></td>
				    <td><FormattedMessage id="nav.item.form.search.given" defaultMessage="Given Name" /></td>
				    <td><FormattedMessage id="nav.item.form.search.family" defaultMessage="Family Name" /></td>
				  </tr>

					{this.state.travellers.map(traveller => (
							<React.Fragment key={traveller.serviceRequestId}> 
				            
							  <tr>
						    	<td><input type="radio" 
						              // className="radio-button"\
						              name="pasenger"
						              id={traveller.serviceRequestId}
						              value={traveller.serviceRequestId}
						              onChange={e => {
						            	  this.search(traveller.serviceRequestId)}
						              }
					//	              checked={field.value === option.value}
						            /></td>
						    	<td>{traveller.passportNumber}</td>
							    <td>{traveller.firstName}</td>
							    <td>{traveller.lastName}</td>
							  </tr>
				          </React.Fragment>
						))}
				</table>
		)}
		
		</Form >
      )}
      </Formik>
		</div>
		</div>
    </>)
	}
}
export default SearchBar;