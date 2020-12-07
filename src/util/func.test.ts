import { pipe, compose } from './func'


describe('util/func.ts - functional programming utilities', () => {
  const fn1 = (val: string) => `fn1(${val})`
  const fn2 = (val: string) => `fn2(${val})`
  const fn3 = (val: string) => `fn3(${val})`

  describe('compose function', () => {

    it('should call the functions in ascending order', () => {
      const composed = compose(fn1, fn2, fn3)
      expect(composed('inner')).toBe('fn1(fn2(fn3(inner)))')
    })

  })

  describe('pipe function', () => {

    it('should call the functions in descending order', () => {
      const piped = pipe(fn1, fn2, fn3)
      expect(piped('inner')).toBe('fn3(fn2(fn1(inner)))')
    })

  })
})