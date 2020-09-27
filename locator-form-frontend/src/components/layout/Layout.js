import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Layout(props) {
  const { children } = props
  return (
    <>
      <div class="d-flex flex-column min-vh-100">
      <Header onChangeLanguage={props.onChangeLanguage} />
      {children}
      <Footer/>
      </div>
    </>
  )
}