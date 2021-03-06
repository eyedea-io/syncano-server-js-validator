import { is } from './helpers'

export function validateRequired(attribute, value) {
  return is.existy(value) && is.not.empty(value)
}

export function validateMin(attribute, value, parameters) {
  this.requireParameterCount(1, parameters, 'min')

  if (is.not.number(parameters[0])) {
    throw new Error('Validation rule min requires number parameter.')
  }

  return this.getSize(attribute, value) >= parameters[0]
}

export function validateMax(attribute, value, parameters) {
  this.requireParameterCount(1, parameters, 'max')

  if (is.not.number(parameters[0])) {
    throw new Error('Validation rule max requires number parameter.')
  }

  return this.getSize(attribute, value) <= parameters[0]
}

export function validateExists(attribute, value, parameters) {
  this.requireSyncanoEnvironment('exists', attribute)
  this.requireParameterCount(2, parameters, 'exists')

  const [className, column] = parameters

  return new Promise((resolve, reject) => {
    this.connection[className === 'users' ? 'users' : 'data'][className]
      .where(column, value)
      .list()
      .then(objects => resolve(objects.length > 0))
      .catch(err => reject(err.message))
  })
}

export function validateNumeric(attribute, value) {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

export function validateArray(attribute, value) {
  return is.array(value)
}

export function validateIn(attribute, value, parameters = []) {
  return parameters.indexOf(value) >= 0
}

export function validateBoolean(attribute, value) {
  const acceptable = [true, false, 0, 1, '0', '1']

  return acceptable.indexOf(value) >= 0
}

export function validateUrl(attribute, value) {
  const regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i

  return regex.test(value)
}

export function validateDigits(attribute, value, parameters) {
  this.requireParameterCount(1, parameters, 'digits')
  const matchNumbers = new RegExp('/[^0-9]/')
  return !matchNumbers.test(value) && (value.toString()).length === parameters[0]
}

export function validateDigitsBetween(attribute, value, parameters) {
  this.requireParameterCount(2, parameters, 'digitsBetween')
  const length = (value.toString()).length
  const matchNumbers = new RegExp('/[^0-9]/')
  return !matchNumbers.test(value) && length >= parameters[0] && length <= parameters[1]
}

export function validateInteger(attribute, value) {
  return value === parseInt(value, 10)
}

export function validateAccepted(attribute, value) {
  const acceptable = [true, 'true', 'on', 'yes', 1, '1']

  return acceptable.indexOf(value) >= 0
}

export function validateAlpha(attribute, value) {
  const regex = /^[A-z]+$/

  return (typeof value === 'string') && regex.test(value)
}

export function validateAlphaNum(attribute, value) {
  return (typeof value === 'string' || typeof value === 'number') && is.alphaNumeric(value)
}

export function validateRegex(attribute, value, parameters) {
  this.requireParameterCount(1, parameters, 'regex')

  if (is.not.string(value) && is.not.number(value)) {
    return false
  }
  const regex = new RegExp(`${parameters[0]}`)

  return regex ? regex.test(value) : true
}

export function validateDate(attribute, value) {
  if (is.date(value)) {
    return true
  }

  if (is.not.string(value) && is.not.number(value)) {
    return false
  }

  const date = new Date(value)

  return Boolean(date.getMonth() + 1)
}

export function validateEmail(attribute, value) {
  if (is.not.string(value) && is.not.number(value)) {
    return false
  }

  return is.email(value)
}
