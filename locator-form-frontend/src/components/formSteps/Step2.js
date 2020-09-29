import React from "react"
import { FormattedMessage } from 'react-intl'
import { Field } from 'formik'
import { MyTextInput, MySelect, dateInputToday } from '../inputs/MyInputs'

class Step2 extends React.Component {

	render() {
		return <div>

			<div className="step" id="step2">
				<div id="flightInformation" className="section">
					<div className="row">
						<div className="col-lg-4 form-group">
							<MyTextInput
								label={<FormattedMessage id="nav.item.airline" defaultMessage="Airline" />}
								name="airlineName"
								requireField={true}
								type="text"
							/>
						</div>
						<div className="col-lg-4 form-group">
							<MyTextInput
								label={<FormattedMessage id="nav.item.flightNumber" defaultMessage="Flight" />}
								name="flightNumber"
								requireField={true}
								type="text"
							/>
						</div>
						<div className="col-lg-4  form-group">
							<MyTextInput
								label={<FormattedMessage id="nav.item.seat" defaultMessage="Seat" />}
								name="seatNumber"
								type="text"
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-4  form-group">
							<MyTextInput
								label={<FormattedMessage id="nav.item.dateOfArrival" defaultMessage="Date Of Arrival" />}
								name="arrivalDate"
								requireField={true}
								type="date"
								min={dateInputToday()}
							/>
						</div>
						<div className="col-lg-4 form-group ">
							<Field name="visitPurpose">
								{({ field, form, meta }) =>
									<MySelect label={<FormattedMessage id="nav.item.purposeOfVisit" defaultMessage="Purpose of Visit" />}
										name={field.name} 
										form={form}
										requireField={true} 
										placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										options={
											[
												{ "value": "business", "label": this.props.intl.formatMessage({ id: 'nav.item.purposeOfVisit.option.business' }) },
												{ "value": "pleasure", "label": this.props.intl.formatMessage({ id: 'nav.item.purposeOfVisit.option.pleasure' }) },
												{ "value": "other", "label": this.props.intl.formatMessage({ id: 'nav.item.purposeOfVisit.option.other' }) },
											]}
									/>
								}
							</Field>
						</div>
					</div>
				</div>
			</div>
		</div>
	}

}
export default Step2