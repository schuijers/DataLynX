import { faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'
import { describe, expect, test } from 'vitest'
import { server } from '../mocks/node'
import { DataLynxClient } from './index'

describe('DataLynxClient', () => {
  const baseURL = faker.internet.url({ appendSlash: false })
  const client = new DataLynxClient(baseURL)

  describe('authenticate', () => {
    test('should throw an error when authentication fails', async () => {
      // arrange
      const username = faker.internet.username()
      const password = faker.internet.password()
      const expected = `[POST] "${baseURL}/authenticate": 401 Unauthorized`

      server.use(
        http.post(`${baseURL}/authenticate`, () => {
          return HttpResponse.json(undefined, { status: 401 })
        })
      )

      // act & assert
      await expect(() => client.authenticate(username, password)).rejects.toThrow(expected)
    })

    test('should return a token when authentication succeeds', async () => {
      // arrange
      const username = faker.internet.username()
      const password = faker.internet.password()
      const expected = faker.string.uuid()

      server.use(http.post(`${baseURL}/authenticate`, () => HttpResponse.text(expected)))

      // act
      const actual = await client.authenticate(username, password)

      // assert
      expect(actual).toBe(expected)
    })
  })
})
