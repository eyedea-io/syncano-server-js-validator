export function replaceMin(message, attribute, rule, parameters) {
  return message.replace(':min', parameters[0])
}

export function replaceMax(message, attribute, rule, parameters) {
  return message.replace(':max', parameters[0])
}

export function replaceDigits(message, attribute, rule, parameters) {
  return message.replace(':digits', parameters[0])
}

export function replaceDigitsBetween(message, attribute, rule, parameters) {
  return message.replace(':min', parameters[0]).replace(':max', parameters[1])
}
