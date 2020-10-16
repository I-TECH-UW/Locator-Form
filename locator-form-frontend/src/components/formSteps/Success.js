import React from "react"
import { FormattedMessage } from 'react-intl'
import Summary from './Summary'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

class Success extends React.Component {

	// componentDidMount() {
	// 	const input = document.getElementById('questions');
	// 	html2canvas(input).then((canvas) => {
	// 		const imgData = canvas.toDataURL('image/png');
	// 		const pdf = new jsPDF();
	// 		pdf.addImage(imgData, 'PNG', 0, 0);
	// 		pdf.save("locatorForm.pdf");
	// 	});
	// }

	render() {

		var Barcode = require('react-barcode')
		return (<div>
			<div className="row">
				<div className="col-lg-12 success-large text-center">
					<FormattedMessage id="submit.success.msg" defaultMessage="Thank you for filling out our online form. Please monitor your email for any further instructions. If you do not receive an email, please print or save this page somewhere you can access when you land in Mauritius " />
				</div>
			</div>
			<Summary formikProps={this.props.formikProps}/>
			{this.props.labelContentPairs.map(function (labelContentPair) {
				return (
					<div className="row">
						<div className="col-lg-12 ">
							<h5>{labelContentPair.label}:</h5>
							<Barcode value={labelContentPair.barcodeContent} />
						</div>
					</div>)
			})}
		</div>
		)
	}

}
export default Success