import _ from 'lodash'
import sg from 'root-styles'

export default () => _.merge({
  background: {
    background: '#ccc',
    padding: 20,
    minHeight: '100vh',
  },
  feedbackError: {
    'background-color': 'red',
  },
  feedbackSuccess: {
    'background-color': 'green',
  },
}, sg)
