import { createEditor } from 'slate'
import withMarks from './withMarks'

describe('withMarks slate plugin', () => {
  const editor = withMarks(createEditor())
  it('should define isMarkActive method', () => {
    expect(editor.isMarkActive).toBeDefined
  })
  it('should define toggleMark method', () => {
    expect(editor.toggleMark).toBeDefined
  })
})
