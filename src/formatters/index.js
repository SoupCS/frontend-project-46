import formatToStylish from './stylish.js'
import formatToPlain from './plain.js'
import formatToJson from './json.js'

const formatters = {
  stylish: formatToStylish,
  plain: formatToPlain,
  json: formatToJson,
}

const formatResult = (data, format) => {
  const formatter = formatters[format.toLowerCase()]

  if (!formatter) {
    throw new Error(`Unknown format: ${format}`)
  }

  return formatter(data)
}

export default formatResult
