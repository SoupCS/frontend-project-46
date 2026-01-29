import _ from 'lodash'

const INDENT = 4
const SPACE = ' '

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value
  }

  const indent = SPACE.repeat(depth * INDENT)
  const bracketIndent = SPACE.repeat((depth - 1) * INDENT)

  const lines = Object.entries(value).map(
    ([key, val]) =>
      `${indent}${key}: ${stringify(val, depth + 1)}`,
  )

  return ['{', ...lines, `${bracketIndent}}`].join('\n')
}

const formatToStylish = (tree) => {
  const iter = (nodes, depth) =>
    nodes.flatMap((node) => {
      const indent = SPACE.repeat(depth * INDENT)
      const signIndent = SPACE.repeat(depth * INDENT - 2)
      const currentDepth = depth + 1

      switch (node.type) {
        case 'nested':
          return `${indent}${node.key}: {\n${iter(node.children, currentDepth).join('\n')}\n${indent}}`

        case 'added':
          return `${signIndent}+ ${node.key}: ${stringify(node.value, currentDepth)}`

        case 'deleted':
          return `${signIndent}- ${node.key}: ${stringify(node.value, currentDepth)}`

        case 'changed':
          return [
            `${signIndent}- ${node.key}: ${stringify(node.oldValue, currentDepth)}`,
            `${signIndent}+ ${node.key}: ${stringify(node.newValue, currentDepth)}`,
          ]

        case 'unchanged':
          return `${indent}${node.key}: ${stringify(node.value, currentDepth)}`

        default:
          throw new Error(`Unknown node type: ${node.type}`)
      }
    })

  return `{\n${iter(tree, 1).join('\n')}\n}`
}

export default formatToStylish
