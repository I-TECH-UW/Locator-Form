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
				    this.props.onSearchSuccess(locatorForm);
				} else if (status === 404) {
					this.onNotFound();
//					this.searchForPassenger(searchValue);
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
		<MyTextInput
		label={<FormattedMessage id="nav.item.form.search.label" defaultMessage="Search" />}
		name="searchValue"
		type="text"
		placeholder={this.props.intl.formatMessage({ id: 'nav.item.form.search.placeholder' })}
		icon={<FontAwesomeIcon icon={faSearch}/>}
		iconClickable={true}
		iconOnClick={e => {
			this.search(formikProps.values.searchValue);
		}}
		additionalErrorMessage={this.errorMessage()}
		// disabled={this.state.searching || this.state.confirming} 
	/>
	{this.state.isSearching && (
		<CircularProgress
		size={24}
		/>
	)} 
		{this.state.travellers.map(traveller => (
				<React.Fragment key={traveller.serviceRequestId}> 
	            <label htmlFor={traveller.firstName}>
	            <input type="radio" 
	              // className="radio-button"\
	              name="pasenger"
	              id={traveller.serviceRequestId}
	              value={traveller.serviceRequestId}
//	              onChange={inputChange}
//	              checked={field.value === option.value}
	            />
	            {traveller.passportNumber},{traveller.firstName},{traveller.lastName}
	          </label>
	          </React.Fragment>
		))}
		
		</Form >
      )}
      </Formik>
		</div>
		</div>
    </>)
	}
}
export default SearchBar;