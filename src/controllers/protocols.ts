export interface HttpResponse<T> {
  code: number
  body: {
    msg: string
    data?: T
    status: number
    ok: boolean
  }
}

export interface HttpRequest<T> {
  body: T
  params?: T
  headers?: any
}

export interface IController<T> {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>
}
