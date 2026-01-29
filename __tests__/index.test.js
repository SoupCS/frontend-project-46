import fs from 'fs'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import genDiff from '../index.js'
import { expect, test } from '@jest/globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '.', '__fixtures__', filename)

const readFixture = filename => fs.readFileSync(getFixturePath(`${filename}.txt`), 'utf8')

const dataSucessTest = [
  ['.json', '.json'],
  ['.json', '.yml'],
  ['.yml', '.yml'],
]

test.each(dataSucessTest)('formatStylish', (fileExtension1, fileExtension2) => {
  const result = genDiff(getFixturePath(`file1${fileExtension1}`), getFixturePath(`file2${fileExtension2}`))
  const expectResult = readFixture('stylish')
  expect(result).toEqual(expectResult)
})

test.each(dataSucessTest)('formatPlain', (fileExtension1, fileExtension2) => {
  const result = genDiff(getFixturePath(`file1${fileExtension1}`), getFixturePath(`file2${fileExtension2}`), 'plain')
  const expectResult = readFixture('plain')
  expect(result).toEqual(expectResult)
})

test.each(dataSucessTest)('formatJSON', (fileExtension1, fileExtension2) => {
  const result = genDiff(getFixturePath(`file1${fileExtension1}`), getFixturePath(`file2${fileExtension2}`), 'json')
  const expectResult = readFixture('json')
  expect(result).toEqual(expectResult)
})

test('errorFormatIni', () => {
  const error = new Error('Not found format: ini')
  expect(() => genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'ini')).toThrowError(error)
})
