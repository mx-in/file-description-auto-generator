import path from 'path'

export const testFilePath = (fileName: string): string => {
  return path.join(__dirname, 'test_files', fileName)
}
