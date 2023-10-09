import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

export const sanitize = (source: string): string => {
  const window = new JSDOM('').window
  const purify = DOMPurify(window)
  return purify.sanitize(source)
}
