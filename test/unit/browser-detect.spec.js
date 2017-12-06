const expect = require('chai').expect;
const browser = require('../../dist/browser-detect.js');

describe('Browser dection', () => {
  describe('browserDetect', () => {
    it('detects Chrome on MacOS', () => {
      const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3205.0 Safari/537.36'

      expect(browser(userAgent).os).to.equal('OS X 10.11.6')
    })

    it('detects Chrome on ChromeOS', () => {
      const userAgent = 'Mozilla/5.0 (X11; CrOS x86_64 9765.73.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.110 Safari/537.36'

      expect(browser(userAgent).os).to.equal('Chrome OS x86_64')
    })
  })
})
