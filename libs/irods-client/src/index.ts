import { type $Fetch, ofetch } from 'ofetch'
import { createBasicAuthHeader } from './utils/createBasicAuthHeader.js'

/**
 * DataLynX client for the iRODS HTTP API.
 */
export class DataLynxClient {
  private readonly $fetch: $Fetch

  constructor(baseURL: string) {
    this.$fetch = ofetch.create({
      baseURL,
      headers: {
        Accept: 'application/json',
      },
    })
  }

  /**
   * Authenticate a user using the basic authentication scheme.
   * @param username The username of the user.
   * @param password The password of the user.
   * @returns A string representing a bearer token that can be used to execute operations as the authenticated user.
   */
  public async authenticate(username: string, password: string): Promise<string> {
    const authHeader = createBasicAuthHeader(username, password)

    return this.$fetch<string>('/authenticate', {
      headers: {
        Authorization: authHeader,
      },
      method: 'POST',
    })
  }
}
