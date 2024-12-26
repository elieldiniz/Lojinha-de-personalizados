import { UserInMemoryRepository } from "@/users/infrastructure/database/in-memory/repository/user-in-memory.repository"
import { ListUserseCase } from "../../listUser.usercase"
import { SerchResult } from "@/shared/domain/repositories/searchble-repository-contracts"
import { UserRepository } from "@/users/domain/repositorys/user.repository"
import { UserEntity } from "@/users/domain/entities/user.entity"
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"

describe('ListUsersUseCase unit tests', () => {
  let sut: ListUserseCase.UserCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new ListUserseCase.UserCase(repository)
  })

  it('toOutput method', () => {
    let result = new UserRepository.SerchResult({
      items: [],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    })
    let output = sut['toOutput'](result)
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    })

    const entity = new UserEntity(UserDataBuilder({}))
    result = new UserRepository.SerchResult({
      items: [entity],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    })
    output = sut['toOutput'](result)
    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    })
  })

  it('should return the users ordered by createdAt', async () => {
    const createdAt = new Date()
    const items = [
      new UserEntity(UserDataBuilder({ createdAt })),
      new UserEntity(
        UserDataBuilder({ createdAt: new Date(createdAt.getTime() + 1) }),
      ),
    ]
    repository.items = items
    const output = await sut.execute({})
    expect(output).toStrictEqual({
      items: [...items].reverse().map(item => item.toJSON()),
      total: 2,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
    })
  })

  it('should return the users using pagination, sort and filter', async () => {
    const items = [
      new UserEntity(UserDataBuilder({ name: 'a' })),
      new UserEntity(UserDataBuilder({ name: 'AA' })),
      new UserEntity(UserDataBuilder({ name: 'Aa' })),
      new UserEntity(UserDataBuilder({ name: 'b' })),
      new UserEntity(UserDataBuilder({ name: 'c' })),
    ]
    repository.items = items
    let output = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'name',
      sortDir: 'asc',
      filter: 'a',
    })
    expect(output).toStrictEqual({
      items: [items[1].toJSON(), items[2].toJSON()],
      total: 3,
      currentPage: 1,
      lastPage: 2,
      perPage: 2,
    })

    output = await sut.execute({
      page: 2,
      perPage: 2,
      sort: 'name',
      sortDir: 'asc',
      filter: 'a',
    })
    expect(output).toStrictEqual({
      items: [items[0].toJSON()],
      total: 3,
      currentPage: 2,
      lastPage: 2,
      perPage: 2,
    })


    output = await sut.execute({
      page: 1,
      perPage: 3,
      sort: 'name',
      sortDir: 'desc',
      filter: 'a',
    })
    expect(output).toStrictEqual({
      items: [items[0].toJSON(),items[2].toJSON(),items[1].toJSON()],
      total: 3,
      currentPage: 1,
      lastPage: 1,
      perPage: 3,
    })
  })

  })
