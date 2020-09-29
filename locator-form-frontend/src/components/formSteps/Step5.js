import React from "react"
import { FormattedMessage } from 'react-intl'
import { MyRadioInputGroup } from '../inputs/MyInputs'

class Step5 extends React.Component {

	render() {
		return <div>

			<div className="step" id="step5">
				<div id="sufferingInformation" className="section">
					<div className="row align-items-end">
						<div className="col-xl-2 col-lg-4 form-group ">
							<MyRadioInputGroup
								label={<FormattedMessage id="nav.item.fever" defaultMessage="Fever" />}
								name="fever"
								options={[
									{ key: 'nav.item.symptoms.option.yes', value: 'true' },
									{ key: 'nav.item.symptoms.option.no', value: 'false'}
								]}
							/>
						</div>

						<div className="col-xl-2 col-lg-4 form-group ">
							<MyRadioInputGroup
								label={<FormattedMessage id="nav.item.soreThroat" defaultMessage="Sore Throat" />}
								name="soreThroat"
								options={[
									{ key: 'nav.item.symptoms.option.yes', value: 'true' },
									{ key: 'nav.item.symptoms.option.no', value: 'false'}
								]}
							/>
						</div>
						<div className="col-xl-2 col-lg-4 form-group ">
							<MyRadioInputGroup
								label={<FormattedMessage id="nav.item.jointPain" defaultMessage="Joint Pain" />}
								name="jointPain"
								options={[
									{ key: 'nav.item.symptoms.option.yes', value: 'true' },
									{ key: 'nav.item.symptoms.option.no', value: 'false'}
								]}
							/>
						</div>
						<div className="col-xl-2 col-lg-4 form-group ">
							<MyRadioInputGroup
								label={<FormattedMessage id="nav.item.cough" defaultMessage="Cough" />}
								name="cough"
								options={[
									{ key: 'nav.item.symptoms.option.yes', value: 'true' },
									{ key: 'nav.item.symptoms.option.no', value: 'false'}
								]}
							/>
						</div>
						<div className="col-xl-2 col-lg-4 form-group ">
							<MyRadioInputGroup
								label={<FormattedMessage id="nav.item.breathingDifficulties" defaultMessage="Breathing Difficulties" />}
								name="breathingDifficulties"
								options={[
									{ key: 'nav.item.symptoms.option.yes', value: 'true' },
									{ key: 'nav.item.symptoms.option.no', value: 'false'}
								]}
							/>
						</div>
						<div className="col-xl-2 col-lg-4 form-group ">
							<MyRadioInputGroup
								label={<FormattedMessage id="nav.item.rash" defaultMessage="Rash" />}
								name="rash"
								options={[
									{ key: 'nav.item.symptoms.option.yes', value: 'true' },
									{ key: 'nav.item.symptoms.option.no', value: 'false'}
								]}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	}

}
export default Step5