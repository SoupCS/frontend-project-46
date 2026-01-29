import yaml from 'js-yaml'

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
}

const parse = (type, content) => {
  const parser = parsers[type.toLowerCase()]

  if (!parser) {
    throw new Error(`Unknown file format: ${type}`)
  }

  return parser(content)
}

export default parse
