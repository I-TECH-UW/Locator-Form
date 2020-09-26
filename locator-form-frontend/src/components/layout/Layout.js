import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Layout(props) {
  const { children } = props
  return (
    // <ThemeProvider theme={theme}>
    <div className="container-fluid d-flex h-100 flex-column">
      <div className="row">
        <div className="col-lg-12 no-padding">
          <Header onChangeLanguage={props.onChangeLanguage} />
        </div>
      </div>
      {children}
      <div className="row">
        <div className="col-lg-12 no-padding">
          <Footer/>
        </div>
      </div>
    </div>
  )
}