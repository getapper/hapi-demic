// LIBS
import i18n from 'i18next'

export default ({
  resources, lng,
}) => {
  i18n.init({
    // we init with resources
    resources,
    lng,
    fallbackLng: 'en',
    debug: false,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
    },

    react: {
      wait: true,
    },
  })
  return i18n
}
