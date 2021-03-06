import {Output, Component, ViewChild, OnDestroy, ElementRef, EventEmitter} from '@angular/core';
import {Form as FormDHX} from 'dhx-suite';

@Component({
  selector: 'app-form-configurated-cdn',
  template: `
      <div class="container">
          <div #widget class='widget-box-wide'></div>
      </div>`,
  styleUrls: ['./form.scss'],
})
export class FormConfiguratedComponent implements OnDestroy {
  @ViewChild('widget', {static: true})
  container: ElementRef;
  form: FormDHX;
  wait: Promise<void>;

  ngOnInit() {
    this.form = new FormDHX(this.container.nativeElement, {
      css: 'dhx_widget--bordered',
      gravity: false,
      width: 500,
      height: 450,
      title: 'Form',
      padding: 40,
      rows: [
        {
          type: 'input',
          label: 'Name',
          icon: 'dxi-magnify',
          placeholder: 'John Doe',
          required: true,
        },
        {
          type: 'input',
          label: 'Email',
          placeholder: 'jd@mail.name',
        },
        {
          type: 'input',
          inputType: 'password',
          label: 'Password',
          placeholder: '********',
        },
        {
          type: 'checkbox',
          label: 'I agree',
          name: 'agree',
          labelPosition: 'right',
          value: 'checkboxvalue',
        },
        {
          type: 'button',
          value: 'Send',
          size: 'medium',
          view: 'flat',
          submit: true,
          color: 'primary',
        },
      ],
    });
  }

  ngOnDestroy() {
    if (this.form) {
      this.form.destructor();
    }
  }
}
