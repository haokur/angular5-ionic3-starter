import { Component } from '@angular/core';
import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  dateNow: Date;
  imgList: Array<String> = []

  constructor(
    public api: ApiService
  ) {

  }

  ngOnInit() {
    this.dateNow = new Date()

    this.api.get({
      act: '4/news/latest'
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

    this.api.get({
      act: 'http://gank.io/api/random/data/福利/10'
    })
      .then(res => {
        if (res.error === false) {
          this.imgList = res.results.map(item => item.url)
        }
        console.log(this.imgList)
      })
      .catch(err => {
        console.log(err)
      })

  }



}
