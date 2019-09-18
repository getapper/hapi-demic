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
  withStyles,
} from '@material-ui/core'

// REDUX
import {
  useSelector, useDispatch,
} from 'react-redux'

// LIBS
import cn from 'classnames'

// STYLE
import styles from './style.js'

function NewMethod({
  classes,
  t,
}) {
  return (
    <div>
      NewMethod
    </div>
  )
}

NewMethod.propTypes = {
  classes: shape({}).isRequired,
  t: func.isRequired,
}

export default withStyles(styles)(translate()(memo(NewMethod)))
