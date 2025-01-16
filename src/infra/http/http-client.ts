export interface HttpRequest<T = unknown, S = object> {
  url: string
  body?: T
  headers?: object
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete'
  params?: S
}

export interface HttpResponse<R = unknown> {
  data?: R
  statusCode: number
}
export type HttpResponseError = {
  error?: string
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export abstract class HttpClient {
  abstract request<R = unknown, T = unknown, S = object>(request: HttpRequest<T, S>): Promise<HttpResponse<R>>
}
