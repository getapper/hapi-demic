// CONSTANTS
import * as keys from 'root-constants/translations/keys'

// REACT
import React, {
  useState,
  memo, useEffect, Fragment,
} from 'react'
import {
  func, shape,
} from 'prop-types'
import {
  Trans, translate,
} from 'react-i18next'
import {
  Button,
  CircularProgress,
  Divider,
  Paper, Typography,
  withStyles,
} from '@material-ui/core'

// REDUX
import {
  useSelector, useDispatch,
} from 'react-redux'
import {
  getIsHapiDemic, getProject, getRestUri,
} from 'root-redux/getters'

// LIBS
import cn from 'classnames'
import {
  getApiProjectAjax,
} from 'root-redux/actions'

// STYLE
import styles from './style.js'
import {
  createApiErrorsAjax,
} from '../../redux/actions/ajax'

function Home({
  classes,
  t,
}) {
  const dispatch = useDispatch()
  const restUri = useSelector(getRestUri)
  const isHapiDemic = useSelector(getIsHapiDemic)
  const project = useSelector(getProject)

  useEffect(() => {
    dispatch(getApiProjectAjax(restUri))
  }, [])

  return (
    <Paper
      className={classes.container}
    >
      {
        isHapiDemic === null && <CircularProgress />
      }
      {
        isHapiDemic === true && (
          <Fragment>
            <Typography variant="h2">Hapi Demic found!</Typography>
            <Typography
              className={classes.MT20}
              variant="subtitle1"
            >Version: {project.get('version')}
            </Typography>
            <div
              className={classes.MT20}
            >
              <Button
                color="primary"
                href="#/routes"
                variant="contained"
              >
                Routes
              </Button>
              <Button
                color="secondary"
                className={classes.ML10}
                variant="contained"
              >
                Models
              </Button>
            </div>
            <Divider
              className={cn(classes.MT20, classes.MB20)}
            />
            <Typography
              className={classes.MB20}
              variant="subtitle1"
            >Tasks
            </Typography>
            <div>
              <Button
                color="default"
                onClick={() => {
                  dispatch(createApiErrorsAjax(restUri))
                }}
                variant="contained"
              >
                Errors
              </Button>
            </div>
          </Fragment>
        )
      }
      {
        isHapiDemic === false && (
          <Fragment>
            <Typography variant="h2">Hapi Demic not found!</Typography>
          </Fragment>
        )
      }
    </Paper>
  )
}

Home.propTypes = {
  classes: shape({}).isRequired,
  t: func.isRequired,
}

export default withStyles(styles)(translate()(memo(Home)))
