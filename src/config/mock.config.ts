import { mockUserList, mockUserDetail } from "../mock/data/user.data";

export const MockGetList = [
  {
    url: 'user/list',
    data: mockUserList
  },
  {
    url: 'user/detail/1',
    data: mockUserDetail
  }
];

export const MockPostList = [
  {
    url: 'user/add',
    data: {
      user_id: 1,
      user_name: '用户添加测试'
    }
  }
];


export const allMockConfigList = [
  {
    method: 'onGet',
    list: MockGetList,
  }, {
    method: 'onPost',
    list: MockPostList,
  }
]
