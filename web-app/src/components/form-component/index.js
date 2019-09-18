// LIBS
import cn from 'classnames'

// REACT
import React, {
  useState, useEffect,
} from 'react'
import {
  node,
  shape,
  string,
} from 'prop-types'
import {
  validationStates,
} from 'root-components/use-form'
import {
  withStyles,
} from '@material-ui/core'

// STYLES
import styles from './style.js'

const FormComponent = ({
  classes,
  className,
  Component,
  data,
  field,
  label,
  validations,
  ...props
}) => {
  label = label || field.charAt(0).toUpperCase() + field.slice(1)

  return (
    <Component
      className={cn(classes.container, className)}
      classes={classes}
      error={validations[field].state === validationStates.WRONG}
      helperText={
        validations[field].state === validationStates.WRONG
          ? validations[field].error
          : undefined
      }
      label={label}
      name={field}
      value={data.get(field)}
      {...props}
    />
  )
}

FormComponent.propTypes = {
  classes: shape({}),
  className: string,
  Component: node.isRequired,
  data: shape({}).isRequired,
  field: string.isRequired,
  label: string.optional,
  validations: shape({}).isRequired,
}

FormComponent.defaultProps = {
  className: undefined,
  classes: undefined,
  label: null,
}

export default withStyles(styles)(FormComponent)
