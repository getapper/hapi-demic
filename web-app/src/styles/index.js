const fields = ['margin', 'padding']
const directions = ['top', 'left', 'bottom', 'right']
const dimensions = [10, 20, 50]
const styles = {}
dimensions.forEach(dim => {
  fields.forEach(f => {
    styles[`${f.substr(0, 1).toUpperCase()}${dim}`] = {
      [f]: dim,
    }
    directions.forEach(d => {
      styles[`${f.substr(0, 1).toUpperCase()}${d.substr(0, 1).toUpperCase()}${dim}`] = {
        [`${f}${d.substr(0, 1).toUpperCase()}${d.substr(1)}`]: dim,
      }
    })
  })
})

export default {
  ...styles,
}
