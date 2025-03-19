import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appImageLazyLoad]',
  standalone: true,
})
export class ImageLazyLoadDirective implements AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;

  @Input('appImageLazyLoad') imageSrc!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const img = this.el.nativeElement;

    this.renderer.setStyle(img, 'opacity', '0');
    this.renderer.setStyle(img, 'transition', 'opacity 0.3s ease-in-out');

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = new Image();
          image.src = this.imageSrc;
          image.onload = () => {
            this.renderer.setAttribute(img, 'src', this.imageSrc);
            this.renderer.setStyle(img, 'opacity', '1');
          };
          this.observer.unobserve(img);
        }
      });
    });

    this.observer.observe(img);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
