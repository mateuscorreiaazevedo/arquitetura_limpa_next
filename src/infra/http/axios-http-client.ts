import { env } from '@/main/config/env'
import axios, { type AxiosResponse, type AxiosInstance, type AxiosError } from 'axios'
import type { HttpClient, HttpRequest, HttpResponse } from './http-client'

export class AxiosHttpClient implements HttpClient {
  private axiosInstance: AxiosInstance

  constructor(private readonly baseUrl = env.baseUrl) {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
    })
  }
  async request<R = unknown, T = unknown, S = object>(request: HttpRequest<T, S>): Promise<HttpResponse<R>> {
    const { method = 'get', url, body, headers, params } = request
    let axiosResponse: AxiosResponse<R>

    try {
      axiosResponse = await this.axiosInstance.request<R>({
        method,
        url,
        ...(body && { data: body }),
        ...(headers && { headers }),
        ...(params && { params }),
      })
    } catch (error) {
      axiosResponse = (error as AxiosError).response as AxiosResponse<R>
      if (!axiosResponse) {
        throw error
      }
    }

    return {
      data: axiosResponse.data,
      statusCode: axiosResponse.status,
    }
  }
}
