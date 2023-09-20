import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutocompleteoff]',
})
export class AutocompleteoffDirective {
  constructor(private el: ElementRef) {}

  @HostListener('focus')
  onFocus() {
    this.el.nativeElement.setAttribute('autocomplete', 'off');
  }
}
