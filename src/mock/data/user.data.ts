import Mock from 'mockjs';

let users = [];

for (let i = 0; i < 10; i++) {
  users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

// 用户列表
export const mockUserList = users

// 用户详情
export const mockUserDetail = users[0]