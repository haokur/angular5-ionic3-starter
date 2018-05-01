import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { allMockConfigList } from '../config/mock.config';

const MockAdpapterObj = new MockAdapter(axios)

export const MockServer = {
  bootstrap() {
    allMockConfigList.forEach(item => {
      let _method = item.method
      item.list.forEach(reqItem => {
        MockAdpapterObj[_method](this._getReqUrl(reqItem.url)).reply(config => this.success(reqItem.data))
      })
    })
  },
  _getReqUrl(url) {
    return typeof url === 'string' ? new RegExp(url) : url;
  },
  success(data) {
    return this.wait()
      .then(() => {
        return Promise.resolve([
          200,
          {
            code: 1,
            msg: '[模拟数据] 操作成功',
            data
          }
        ])
      });
  },
  wait(time = 500) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, time)
    })
  }
}