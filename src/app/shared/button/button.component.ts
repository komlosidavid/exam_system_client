import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input()
  btn_type: string = 'button';
  @Input()
  button_class_type!: string;
  @Input()
  is_disabled: boolean = false;
  @Input()
  is_button_link: boolean = false;
  @Input()
  text!: string;
  @Input()
  is_button_small: boolean = false;
  @Input()
  is_button_block: boolean = false;
  @Input()
  btn_has_icon: boolean = false;
  @Input()
  btn_icon_class!: string;
}
