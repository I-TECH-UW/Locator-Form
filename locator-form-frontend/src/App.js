import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from './components/layout/Layout';
// import { Navigation, Footer, Home } from "./components";
import { Home } from "./components";
import { IntlProvider } from 'react-intl';

import messages_en from './i18n/en.json';
import messages_fr from './i18n/fr.json';

let i18nConfig = {
  locale: navigator.language.split(/[-_]/)[0],
  defaultLocale: 'en',
  messages: messages_en,
};

class App extends React.Component {

  constructor(props) {
    super(props);
    i18nConfig.locale = localStorage.getItem('locale') || navigator.language.split(/[-_]/)[0];
    switch (i18nConfig.locale) {
      case 'en': i18nConfig.messages = messages_en; break;
      case 'fr': i18nConfig.messages = messages_fr; break;
      default: i18nConfig.messages = messages_en; break;
    }
  }

  changeLanguage = (lang) => {
    switch (lang) {
      case 'en': i18nConfig.messages = messages_en; break;
      case 'fr': i18nConfig.messages = messages_fr; break;
      default: i18nConfig.messages = messages_en; break;
    }
    i18nConfig.locale = lang;
    this.setState({ locale: lang });
    localStorage.setItem('locale', lang);
  }

  onChangeLanguage = (e) => {
    e.preventDefault();
    let lang = e.target.lang;
    this.changeLanguage(lang);
  }

  render() {
    return (
      <IntlProvider
        locale={i18nConfig.locale}
        key={i18nConfig.locale}
        defaultLocale={i18nConfig.defaultLocale}
        messages={i18nConfig.messages}
      >
        <div className="App" id="page">
          <Router>
            {/* <Navigation onChangeLanguage={this.onChangeLanguage} /> */}
            <Layout onChangeLanguage={this.onChangeLanguage}>
              <div id="content">
                <Switch>
                  <Route path="/" exact component={Home} />
                </Switch>
              </div>
            </Layout>
            {/* <Footer /> */}
          </Router>
          </div>
      </IntlProvider>
    );
  }
}

export default App;
