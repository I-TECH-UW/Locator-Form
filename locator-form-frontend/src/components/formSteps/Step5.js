import React from "react"
import { FormattedMessage } from 'react-intl'
import { Field } from 'formik'
import { MySelect } from '../inputs/MyInputs'

class Step5 extends React.Component {

	render() {
		return <div>

			<div className="step" id="step5">
				<div id="sufferingInformation" className="section">
					<div className="row align-items-end">
						<div className="col-xl-2 col-lg-4 form-group ">
							<Field name="fever">
								{({ field, form, meta }) =>
									<MySelect label={<FormattedMessage id="nav.item.fever" defaultMessage="Fever" />}
										name={field.name} form={form} placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										options={
											[
												{ "value": "true", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.yes' }) },
												{ "value": "false", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.no' }) },
											]}
									/>
								}
							</Field>
						</div>

						<div className="col-xl-2 col-lg-4 form-group ">
							<Field name="soreThroat">
								{({ field, form, meta }) =>
									<MySelect label={<FormattedMessage id="nav.item.soreThroat" defaultMessage="Sore Throat" />}
										name={field.name} form={form} placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										options={
											[
												{ "value": "true", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.yes' }) },
												{ "value": "false", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.no' }) },
											]}
									/>
								}
							</Field>
						</div>
						<div className="col-xl-2 col-lg-4 form-group ">
							<Field name="jointPain">
								{({ field, form, meta }) =>
									<MySelect label={<FormattedMessage id="nav.item.jointPain" defaultMessage="Joint Pain" />}
										name={field.name} form={form} placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										options={
											[
												{ "value": "true", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.yes' }) },
												{ "value": "false", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.no' }) },
											]}
									/>
								}
							</Field>
						</div>
						<div className="col-xl-2 col-lg-4 form-group ">
							<Field name="cough">
								{({ field, form, meta }) =>
									<MySelect label={<FormattedMessage id="nav.item.cough" defaultMessage="Cough" />}
										name={field.name} form={form} placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										options={
											[
												{ "value": "true", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.yes' }) },
												{ "value": "false", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.no' }) },
											]}
									/>
								}
							</Field>
						</div>
						<div className="col-xl-2 col-lg-4 form-group ">
							<Field name="breathingDifficulties">
								{({ field, form, meta }) =>
									<MySelect label={<FormattedMessage id="nav.item.breathingdifficulties" defaultMessage="Breathing Difficulties" />}
										name={field.name} form={form} placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										options={
											[
												{ "value": "true", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.yes' }) },
												{ "value": "false", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.no' }) },
											]}
									/>
								}
							</Field>
						</div>
						<div className="col-xl-2 col-lg-4 form-group ">
							<Field name="rash">
								{({ field, form, meta }) =>
									<MySelect label={<FormattedMessage id="nav.item.rash" defaultMessage="Rash" />}
										name={field.name} form={form} placeholder={this.props.intl.formatMessage({ id: 'nav.item.select.placeholder' })}
										options={
											[
												{ "value": "true", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.yes' }) },
												{ "value": "false", "label": this.props.intl.formatMessage({ id: 'nav.item.symptoms.option.no' }) },
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
export default Step5