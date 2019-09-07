import _ from 'lodash'
import sg from 'root-styles'

export default () => _.merge({
  feedbackError: {
    'background-color': 'red',
  },
  feedbackSuccess: {
    'background-color': 'green',
  },
}, sg)
