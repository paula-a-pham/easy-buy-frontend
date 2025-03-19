import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appBackgroundImageLazyLoad]',
  standalone: true,
})
export class BackgroundImageLazyLoadDirective
  implements AfterViewInit, OnDestroy
{
  private observer!: IntersectionObserver;

  @Input('appBackgroundImageLazyLoad') url!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;

    this.renderer.setStyle(element, 'opacity', '0');
    this.renderer.setStyle(element, 'transition', 'opacity 0.3s ease-in-out');

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(this.url);

          const img = new Image();
          img.src = this.url;
          img.onload = () => {
            this.renderer.setStyle(
              element,
              'backgroundImage',
              `url('${this.url}')`
            );
            this.renderer.setStyle(element, 'opacity', '1');
          };

          this.observer.unobserve(element);
        }
      });
    });

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
