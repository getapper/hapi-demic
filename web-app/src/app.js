/* eslint-disable no-nested-ternary */
// ASSETS
import 'root-assets/public/css/reset.css'

// CONSTANTS
import resources from 'root-constants/translations'

// LIBS

// REACT
import React from 'react'
import {
  shape,
} from 'prop-types'
import {
  hot,
} from 'react-hot-loader/root'
import {
  I18nextProvider,
} from 'react-i18next'
import HashRouter, { Route } from 'react-redux-hash-router' //eslint-disable-line
import {
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core/styles'
import {
  Snackbar,
} from '@material-ui/core'
import MadeByGetapper from 'react-made-by-getapper'

// REDUX
import {
  Provider, useSelector, useDispatch,
} from 'react-redux'
import store from 'root-redux/store'
import {
  closeFeedback,
} from 'root-redux/actions'
import {
  getFeedback,
} from 'root-redux/getters'

// SERVICES
import createI18n from 'root-services/createI18n'
import lng from 'root-services/language'

// STYLES
import styles from 'root-styles/app'
import theme from 'root-themes'
import NewMethod from './scenes/new-method'
import Routes from './scenes/routes'
import Home from './scenes/home'

const AppContent = ({
  classes,
}) => {
  const feedback = useSelector(getFeedback)
  const dispatch = useDispatch()

  return (
    <div
      className={classes.background}
    >
      <Snackbar
        ContentProps={{
          className:
                feedback.get('type') === 'error'
                  ? classes.feedbackError
                  : feedback.get('type') === 'success' ? classes.feedbackSuccess : undefined,
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        message={feedback.get('message')}
        open={feedback.get('isOpen')}
        onClose={() => dispatch(closeFeedback())}
      />
      <HashRouter
        routerStatePath="routing.mainRouter"
        loaderComponent={<div>Loading...</div>}
      >
        <Route hash="#" initAccess routeKey="home">
          <Home />
        </Route>
        <Route hash="#/routes" initAccess routeKey="routes">
          <Routes />
        </Route>
        <Route hash="#/new-method/{path}" initAccess routeKey="newMethod">
          <NewMethod />
        </Route>
      </HashRouter>
      <MadeByGetapper className="" />
    </div>
  )
}

AppContent.propTypes = {
  classes: shape({}).isRequired,
}

const AppContentStyled = withStyles(styles)(AppContent)

const App = () => (
  <Provider store={store}>
    <I18nextProvider i18n={createI18n({
      resources,
      lng,
    })}
    >
      <MuiThemeProvider theme={theme}>
        <AppContentStyled />
      </MuiThemeProvider>
    </I18nextProvider>
  </Provider>
)

export default process.env.NODE_ENV === 'development' ? hot(App) : App
