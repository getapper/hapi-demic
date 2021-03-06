// CONSTANTS
import * as keys from 'root-constants/translations/keys'

// REACT
import React, {
  useState, memo,
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
  TextField,
  MenuItem,
  Select,
  withStyles, Typography,
} from '@material-ui/core'
import {
  useForm,
  validationStates,
} from 'root-components/use-form'
import FormComponent from 'root-components/form-component'

// REDUX
import {
  useSelector, useDispatch,
} from 'react-redux'
import {
  getMainRouterParams,
  getRestUri,
} from 'root-redux/getters'
import {
  createApiRoutingEndpointsAjax,
} from 'root-redux/actions'


// LIBS
import cn from 'classnames'
import joi from 'joi-browser'
import immutable from 'immutable'

// STYLE
import styles from './style.js'

const methods = ['GET', 'POST', 'DELETE', 'PUT']

const joiValidationSchema = joi.object({
  method: joi.string().valid(methods),
})

function NewMethod({
  classes,
  t,
}) {
  const params = useSelector(getMainRouterParams)
  const dispatch = useDispatch()
  const restUri = useSelector(getRestUri)

  const {
    data,
    onChange,
    onSubmit,
    validations,
  } = useForm({
    joiValidationSchema,
    initial: immutable.fromJS({
      method: 'GET',
    }),
    onSubmit: () => {
      dispatch(createApiRoutingEndpointsAjax(restUri, {
        path: params.get('path'),
        method: data.get('method'),
      }))
    },
  })

  return (
    <Paper
      className={classes.P20}
    >
      <form onSubmit={onSubmit}>
        <Typography
          className={classes.MB10}
        >METODO:
        </Typography>
        <FormComponent
          className={classes.MB20}
          Component={Select}
          data={data}
          field="method"
          fullWidth
          onChange={onChange}
          validations={validations}
        >
          {
            methods.map(method => (
              <MenuItem
                key={method}
                value={method}
              >
                {method}
              </MenuItem>
            ))
          }
        </FormComponent>
        <Button
          color="primary"
          type="submit"
          variant="contained"
        >
          SUBMIT
        </Button>
      </form>
    </Paper>
  )
}

NewMethod.propTypes = {
  classes: shape({}).isRequired,
  t: func.isRequired,
}

export default withStyles(styles)(translate()(memo(NewMethod)))
