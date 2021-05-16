import { createEditor } from 'slate'
import withBlocks from './withBlocks'

describe('withBlocks slate plugin', () => {
  const editor = withBlocks(createEditor())
  it('should define isBlockActive method', () => {
    expect(editor.isBlockActive).toBeDefined()
  })
  it('should define toggleBlock method', () => {
    expect(editor.toggleBlock).toBeDefined()
  })
})
