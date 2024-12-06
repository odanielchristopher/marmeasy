import { IController, IRequest, IResponse } from '../interfaces/IController';

export class EditAccountController implements IController{
  async handle(request: IRequest): Promise<IResponse> {
    console.log({ request });
    return {
      statusCode: 200,
      body: {
        id: 123,
        email: 'teste@mail.com',
        password: 'sadwodnasd',
      }
    };
  }
}
