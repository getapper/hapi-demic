export const getRestUri = () => {
  if (process.env.NODE_ENV === 'development') {
    return ''
  }
  return process.env.REST_URI
}
