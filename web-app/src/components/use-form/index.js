// REACT
import React, {
  useState, useEffect,
} from 'react'

// LIBS
import immutable from 'immutable'
import joi from 'joi-browser'

const validationStates = {
  CORRECT: 'correct',
  WRONG: 'wrong',
  EMPTY: 'empty',
}

const useForm = ({
  joiValidationSchema,
  initial,
  onSubmit,
}) => {
  const [data, setData] = useState(initial)

  const getInitialValidations = (obj) => {
    const tmpValidations = {}
    if (obj) {
      obj
        .keySeq()
        .toArray()
        .map(field => {
          tmpValidations[field] = {
            state: validationStates.EMPTY,
            error: null,
          }
          return null
        })
      return tmpValidations
    }
    return null
  }

  const [validations, setValidations] = useState([false, getInitialValidations(initial)])

  const getChild = (object, path) => {
    let item
    if (path.length > 1) {
      item = object[path[0]]
      for (let i = 1; i < path.length - 1; i += 1) {
        item = item[path[i]]
      }
      return {
        object: item,
        field: path.pop(),
      }
    }
    return {
      object,
      field: path[0],
    }
  }

  // eslint-disable-next-line consistent-return
  const joiValidate = () => new Promise((resolve, reject) => {
    const tempValidations = getInitialValidations(data)
    if (tempValidations) {
      joi.validate(data.toJS(), joiValidationSchema, {
        abortEarly: false,
      }, (err, validationData) => {
        if (err) {
          err.details.map((item) => {
            const {
              object, field,
            } = getChild(validationData, item.path)
            if (typeof object[field] === 'undefined') {
              return reject(new Error(`Error: field not found. ${field}`))
            }
            if (object[field] && object[field].toString().length === 0) {
              tempValidations[item.path] = {
                state: validationStates.EMPTY,
                error: null,
              }
            } else {
              tempValidations[item.path] = {
                state: validationStates.WRONG,
                error: item.message,
              }
            }
            return null
          })
        }
        return resolve({
          tempIsValid: !err,
          tempValidations,
        })
      })
    } else {
      return resolve({
        tempIsValid: false,
        tempValidations: null,
      })
    }
  })

  const onChange = (...args) => {
    const [name, value, index] = args
    if (index >= 0) {
      setData(data.setIn([name, index], immutable.fromJS(value)))
    } else {
      setData(data.set(name, immutable.fromJS(value)))
    }
  }

  const onChangeEvent = (...args) => {
    const [event] = args
    const {
      name, type, checked, value,
    } = event.target
    setData(data.set(name, type === 'checkbox' ? checked : value))
  }

  useEffect(() => {
    if (joiValidationSchema) {
      joiValidate()
        .then(({
          tempIsValid, tempValidations,
        }) => {
          setValidations([tempIsValid, tempValidations])
        })
        .catch(ex => {
          throw ex
        })
    }
  }, [data])

  const reset = () => {
    setData(initial)
  }

  const onSubmitForm = ev => {
    ev.preventDefault()
    onSubmit(ev)
  }

  const setInitial = newInitial => {
    setData(newInitial)
    setValidations([false, getInitialValidations(newInitial)])
  }

  return {
    data,
    setInitial,
    onChange,
    onChangeEvent,
    reset,
    isValid: validations[0],
    validations: validations[1],
    onSubmit: onSubmitForm,
  }
}

export {
  useForm,
  validationStates,
}
