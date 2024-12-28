import { Buffer } from 'buffer/index.js'

export function createBasicAuthHeader(username: string, password: string): string {
  const credentials = Buffer.from(`${username}:${password}`)

  return `Basic ${credentials.toString('base64')}`
}
