import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('AuthModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  it('should fail if email is missing', async () => {
    await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: '', password: '123456' })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('O e-mail é obrigatório.');
      });
  });

  it('should fail if password is too short', async () => {
    await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'user@mail.com', password: '123' })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain(
          'A senha precisa ter pelo menos 6 caracteres.',
        );
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
