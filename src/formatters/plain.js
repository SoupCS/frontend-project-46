import _ from 'lodash'

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]'
  }

  if (_.isString(value)) {
    return `'${value}'`
  }

  return value
}

const formatToPlain = (tree) => {
  const iter = (nodes, path) =>
    nodes.flatMap((node) => {
      const currentPath = [...path, node.key].join('.')

      switch (node.type) {
        case 'nested':
          return iter(node.children, [...path, node.key])

        case 'added':
          return `Property '${currentPath}' was added with value: ${formatValue(node.value)}`

        case 'deleted':
          return `Property '${currentPath}' was removed`

        case 'changed':
          return `Property '${currentPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`

        case 'unchanged':
          return []

        default:
          throw new Error(`Unknown node type: ${node.type}`)
      }
    })

  return iter(tree, []).join('\n')
}

export default formatToPlain
