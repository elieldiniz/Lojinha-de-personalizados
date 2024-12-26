
import { PrismaClient, User } from '@prisma/client';

import { UsersModulemMapper } from '../../user-model.mapper';
import { ValidationError } from '@/shared/domain/erros/validation-erros'; // Corrected typo

import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';

// Test suite for UserModelMapper integration tests
describe('UserModelMapper integration tests', () => {
  let prismaService: PrismaClient; // Stores the Prisma service instance
  let props: any; // Holds test data properties

  // Setup before all tests run (once per test suite)
  beforeAll(async () => {
    console.log('Iniciando setup...');
    setupPrismaTests();
    console.log('Setup concluído!');

    // Create a new Prisma client instance
    prismaService = new PrismaClient();

    // Connect to the Prisma database
    await prismaService.$connect();
  });

  // Setup before each test (once per test)
  beforeEach(async () => {
    // Clear any existing user data before each test
    await prismaService.user.deleteMany();

    // Set up test data properties
    props = {
      id: 'd4255494-f981-4d26-a2a1-35d3f5b8d36a',
      name: 'Test name',
      email: 'a@a.com',
      password: 'TestPassword123',
      created_at: new Date(),
    };
  });

  // Cleanup after all tests run (once per test suite)
  afterAll(async () => {
    // Disconnect from the Prisma database
    await prismaService.$disconnect();
  });

  // Test: Throws error when user model is invalid
  it('should throws error when user model is invalid', async () => {
    // Create a user model with an invalid name (null)
    const model: User = Object.assign({}, props, { name: null });

    // Expect UsersModulemMapper.toEntity to throw a ValidationError
    expect(() => UsersModulemMapper.toEntity(model)).toThrow(ValidationError);
  });
});
