import React from "react"
import { FormattedMessage } from 'react-intl'
import { MyRadioInputGroup } from '../inputs/MyInputs'
import { Field } from 'formik'
import { MyTextInput, MySelect, dateInputToday } from '../inputs/MyInputs'
import { vaccines } from '../data/vaccines'

class Step11 extends React.Component {

	render() {
		return <div>

			<div className="step" id="step11">
				<div id="vaccine" className="section">
					<div className="row align-items-end">
						<div className="col-xl-2 col-lg-4 form-group ">
								<MyRadioInputGroup
								label={<FormattedMessage id="nav.item.vaccinationStatus" defaultMessage="Vaccination Status?" />}
								name="vaccinationStatus"
								options={[
									{ key: 'nav.item.status.option.eligible', value: 'Eligible' },
									{ key: 'nav.item.status.option.notEligible', value: 'Not Eligible'}
								]}
							/>
							</div>
						</div>
						<div className="row">
						  <div className="col-lg-4 form-group">
								<Field name="vaccineName">
								{({ field, form, meta }) =>
									<MySelect label={<FormattedMessage id="nav.item.vaccine" defaultMessage="Name of First Vaccine" />}
										name={field.name} 
										form={form}
										requireField={true} 
										isSearchable={true}
										placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										options={vaccines}
									/>
								}
							  </Field>
						  </div>
						
						  <div className="col-lg-4 form-group">
									<MyTextInput
									label={<FormattedMessage id="nav.item.dateOfFirstDose" defaultMessage="Date Of First Dose" />}
									name="firstDoseDate"
									requireField={true}
									type="date"
									placeholder={this.props.intl.formatMessage({ id: 'date.format' })}
									max={dateInputToday()}
								/>
						  </div>
						</div>
						<div className="row">
						  <div className="col-lg-4 form-group">
								<Field name="secondVaccineName">
								{({ field, form, meta }) =>
									<MySelect label={<FormattedMessage id="nav.item.second.vaccine" defaultMessage="Name of Second Vaccine" />}
										name={field.name} 
										form={form}
										requireField={true} 
										isSearchable={true}
										placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										options={vaccines}
									/>
								}
							  </Field>
						  </div>
						  <div className="col-lg-4 form-group">
									<MyTextInput
									label={<FormattedMessage id="nav.item.dateOfSecondDose" defaultMessage="Date Of Second Dose" />}
									name="secondDoseDate"
									requireField={true}
									type="date"
									placeholder={this.props.intl.formatMessage({ id: 'date.format' })}
									max={dateInputToday()}
								/>
						  </div>
						</div>
					</div>
				</div>
			</div>
	}

}
export default Step11