import { User } from 'src/modules/users/entities/user.entity';

export function makeUser(overrides: Partial<User> = {}) {
  return {
    id: 'uuid',
    name: 'Daniel',
    email: 'dani@mail.com',
    password: 'hashed-password',
    ...overrides,
  };
}
