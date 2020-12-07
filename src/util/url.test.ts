import { isUrl } from './url'

describe('util/url.ts - url utilities ', () => {
  describe('isUrl function', () => {
    it('should return true for valid urls', () => {
      const urls = [
        'https://www.google.com',
        'http://www.example.com'
      ]
      for (const url of urls) {
        expect(isUrl(url)).toBe(true)
      }
    })
    it('should return false for invalid urls', () => {
      const urls = [
        'www.google.com',
        'www.example.com'
      ]
      for (const url of urls) {
        expect(isUrl(url)).toBe(false)
      }
    })
  })
})