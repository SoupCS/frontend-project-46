import _ from 'lodash'

const buildTree = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort()

  return keys.map((key) => {
    const hasInObj1 = _.has(obj1, key)
    const hasInObj2 = _.has(obj2, key)

    const value1 = obj1[key]
    const value2 = obj2[key]

    if (!hasInObj1) {
      return { key, value: value2, type: 'added' }
    }

    if (!hasInObj2) {
      return { key, value: value1, type: 'deleted' }
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        children: buildTree(value1, value2),
        type: 'nested',
      }
    }

    if (!_.isEqual(value1, value2)) {
      return {
        key,
        oldValue: value1,
        newValue: value2,
        type: 'changed',
      }
    }

    return { key, value: value1, type: 'unchanged' }
  })
}

export default buildTree
