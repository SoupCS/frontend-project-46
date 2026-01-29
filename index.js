import fs from 'fs'
import path from 'path'
import parse from './src/parsers.js'
import formatResult from './src/formatters/index.js'
import buildTree from './src/core/buildTree.js'

const getFullPath = filepath => path.resolve(process.cwd(), filepath)

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const content1 = fs.readFileSync(getFullPath(filepath1), 'utf8')
  const content2 = fs.readFileSync(getFullPath(filepath2), 'utf8')
  const data1 = parse(path.extname(filepath1).slice(1), content1)
  const data2 = parse(path.extname(filepath2).slice(1), content2)
  const result = buildTree(data1, data2)
  return formatResult(result, format)
}

export default genDiff
