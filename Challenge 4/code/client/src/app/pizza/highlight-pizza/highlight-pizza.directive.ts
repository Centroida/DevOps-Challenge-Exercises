import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appHighlightPizza]'
})

export class HighlightPizzaDirective {

    constructor(private readonly element: ElementRef) { }

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight('#f78e21');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null);
    }

    private highlight(color: string) {
        if (!color) {
            this.element.nativeElement.style.border = '';
            this.element.nativeElement.style.boxShadow = '';
            this.element.nativeElement.children[0].children[1].style.color = '';
            return;
        }

        this.element.nativeElement.style.border = '3px solid ' + color;
        this.element.nativeElement.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 ' + color;
        this.element.nativeElement.children[0].children[1].style.color = color;
    }
}
