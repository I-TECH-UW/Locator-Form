import React from "react";
import { Barcode } from 'react-barcode';

class Success extends React.Component {


	render() {
		var Barcode = require('react-barcode');
		return (
			<div className="Servers container">
			Form successfully submitted
            <Barcode value={this.props.match.params.id} />
			</div>
		);
	}
}

export default Success