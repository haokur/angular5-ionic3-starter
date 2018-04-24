import { Directive, HostListener, ElementRef } from "@angular/core";

@Directive({
  selector: '[highlight]'
})

export class HighlightDirective {
  isActive: Boolean = false

  constructor(
    public el: ElementRef,
  ) {
    this.el = el;
  }

  // 监听点击事件,切换收藏
  @HostListener('click', ['$event']) handleCollectClick(e) {
    this.isActive = !this.isActive
    let _bgColor = this.isActive ? 'yellow' : 'transparent'
    this.el.nativeElement.style.backgroundColor = _bgColor
    console.log(this.el)
    console.log(e)
  }

}