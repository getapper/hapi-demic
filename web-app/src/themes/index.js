import {
  createMuiTheme,
} from '@material-ui/core/styles'
import _ from 'lodash'

const themeBase = {
  palette: {
    type: 'light',
  },
}

export default createMuiTheme(themeBase)

export const common = createMuiTheme(_.merge({}, themeBase, {
  palette: {
    primary: {
      main: '#455a68',
    },
    secondary: {
      main: '#fff',
    },
  },
}))
