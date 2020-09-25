import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { theme, useStyle } from './styles';
import { FormattedMessage, injectIntl } from 'react-intl'

export default function Layout(props) {
  const { children } = props;
  return (
    // <ThemeProvider theme={theme}>
    <>
	  <Header onChangeLanguage={props.onChangeLanguage}/>
    <div className="container pt-3">
      <div >
        {children}
      </div>
      </div>
      <Footer />
      </>
  );
}