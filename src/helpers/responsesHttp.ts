import { HttpResponse } from '../controllers/protocols'

export function notFound(message: string): HttpResponse<unknown> {
  return {
    code: 503,
    body: {
      msg: message,
      ok: false,
      status: 503,
    },
  }
}

export function success(
  message: string,
  code: number,
  data: unknown,
): HttpResponse<unknown> {
  return {
    body: {
      msg: message,
      ok: true,
      status: code,
      data,
    },
    code,
  }
}

export function errorResponse(message: string): HttpResponse<unknown> {
  return {
    code: 500,
    body: {
      msg: message,
      ok: false,
      status: 500,
    },
  }
}
