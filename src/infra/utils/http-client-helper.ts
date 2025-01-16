import { type HttpResponse, type HttpResponseError, HttpStatus } from '../http/http-client'

export namespace HttpClientHelper {
  export function validateResponse<T = unknown>(response: HttpResponse<T & HttpResponseError>): T {
    switch (response.statusCode) {
      case HttpStatus.OK:
        return response.data!
      case HttpStatus.CREATED:
        return response.data!
      case HttpStatus.BAD_REQUEST:
        throw new Error(response.data?.error)
      case HttpStatus.UNAUTHORIZED:
        throw new Error(response.data?.error)
      case HttpStatus.NOT_FOUND:
        throw new Error(response.data?.error)
      case HttpStatus.SERVER_ERROR:
        throw new Error(response.data?.error)
      default:
        throw new Error(response.data?.error)
    }
  }
}
