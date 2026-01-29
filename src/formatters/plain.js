import _ from 'lodash';

const formattingValue = (value) => {
  if (_.isObjectLike(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

const formatToPlain = (data) => {
  const getResult = (tree, path) => tree.flatMap((node) => {
    const newPath = [...path, node.key];

    switch (node.type) {
      case 'nested':
        return getResult(node.children, newPath);
      case 'added':
        return `Property '${newPath.join('.')}' was added with value: ${formattingValue(node.value)}`;
      case 'deleted':
        return `Property '${newPath.join('.')}' was removed`;
      case 'changed':
        return `Property '${newPath.join('.')}' was updated. From ${formattingValue(node.oldValue)} to ${formattingValue(node.newValue)}`;
      case 'unchanged':
        return [];
      default:
        throw new Error(`Wrong node type: ${node.type}!`);
    }
  });
  const result = getResult(data, []);
  return result.join('\n');
};

export default formatToPlain;