import React from "react";
import { FormattedMessage } from 'react-intl';
import LocatorForm from "./LocatorForm"



class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      submitSuccess: false
    };
  }

  render() {
    // if (!this.state.submitSuccess) {
      return (
        <div className="home">
          <div className="container pt-3">
            
          </div >
        </div >
      );
    // } else {
    //   var Barcode = require('react-barcode');
    //   return (
    //     <div className="home container">
    //       <div className="row">
    //         <div className="col-lg-12 success-large text-center">
    //           <FormattedMessage id="submit.success.msg" defaultMessage="Thank you for filling out our online form. Please monitor your email for any further instructions. If you do not receive an email, please print or save this page somewhere you can access when you land in Mauritius " />
    //         </div>
    //       </div>
    //         {this.state.labelContentPairs.map(function(labelContentPair){
    //               return (
    //                 <div className="row">
    //                   <div className="col-lg-12 ">
    //                     <h5>{labelContentPair.label}:</h5>
    //                     <Barcode value={labelContentPair.barcodeContent} />
    //                   </div>
    //               </div>);
    //         })}
    //     </div>
    //   );
    // }
  }
}

export default Home;