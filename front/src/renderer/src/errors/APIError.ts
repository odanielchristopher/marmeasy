export default class APIError extends Error {
  name: string;
  response: object;
  body: object | undefined;


  constructor(response, body) {
    super();
    this.name = 'APIError';
    this.response = response;
    this.body = body;
    this.message = body?.error || `${response.status} - ${response.statusText}`;
  }
}
