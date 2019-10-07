// CONSTANTS
import * as keys from 'root-constants/translations/keys'

// REACT
import React, {
  useState, memo, useEffect,
} from 'react'
import {
  func, shape,
} from 'prop-types'
import {
  Trans, translate,
} from 'react-i18next'
import {
  Button,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core'

// REDUX
import {
  useSelector, useDispatch,
} from 'react-redux'
import {
  getApiRoutingAjax,
} from 'root-redux/actions'
import {
  getRestUri, getApis,
} from 'root-redux/getters'

// LIBS
import cn from 'classnames'

// STYLE
import styles from './style.js'

function Routes({
  classes,
  t,
}) {
  const dispatch = useDispatch()
  const restUri = useSelector(getRestUri)
  const apis = useSelector(getApis)

  useEffect(() => {
    dispatch(getApiRoutingAjax(restUri))
  }, [])

  const renderMethods = methods => methods ? Object.keys(methods).map(m => (
    <Typography
      className={classes.MR20}
      variant="caption"
    >{m}
    </Typography>
  )) : null

  const renderApis = (route, path) => {
    if (!route) {
      return null
    }
    const nodes = Object.keys(route).map(r => (
      <Paper
        className={cn(classes.P10, classes.MT20)}
        key={r}
        elevation={1}
      >
        <Typography>{r}</Typography>
        <div
          className={cn(classes.MT10, classes.MB20)}
        >
          <Button
            color="primary"
            href={`#/new-route/${[...path, r].join('_')}`}
            variant="contained"
          >
            Add route
          </Button>
          <Button
            color="secondary"
            className={classes.ML10}
            href={`#/new-method/${[...path, r].join('_')}`}
            variant="contained"
          >
            Add method
          </Button>
        </div>
        {renderMethods(route[r].methods)}
        {renderApis(route[r].routes, [...path, r])}
      </Paper>
    ))
    return nodes
  }

  return (
    <Paper
      className={classes.P20}
    >
      <Typography variant="h2">
        Routing
      </Typography>
      {
        renderApis(apis, [])
      }
    </Paper>
  )
}

Routes.propTypes = {
  classes: shape({}).isRequired,
  t: func.isRequired,
}

export default withStyles(styles)(translate()(memo(Routes)))
