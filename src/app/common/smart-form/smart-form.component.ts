import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SmartFormService } from 'src/app/Services/SmartForm/smart-form.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-smart-form',
  templateUrl: './smart-form.component.html',
  styleUrls: ['./smart-form.component.css']
})
export class SmartFormComponent implements OnInit, OnChanges {
  @Input() public formName: string;
  SmartForm: FormGroup;
  @Input() formField;
  @Output() formData = new EventEmitter();
  @Input() manuallyClearField: boolean;
  @Input() listData;
  @Input() public searchFormName: string;
  public isAdd: boolean = true;
  @Input() public showLoader: boolean = false;

  constructor(
    private _FormBuilder: FormBuilder,
    private _smartFormService: SmartFormService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['manuallyClearField']) {
      this.manuallyClearField = changes['manuallyClearField']?.currentValue;
      if (this.manuallyClearField) {
        this.clearField();
      }
    }

    if (changes?.['listData']) {
      this.listData = changes['listData']?.currentValue;
    }
    if (changes?.['showLoader']) {
      this.showLoader = changes['showLoader']?.currentValue;
    }
  }

  ngOnInit(): void {
    this.SmartForm = this._FormBuilder.group(this.formFields());

    /* fetch list data to render in dropdown */

    this.getListDataForDropdown();
  }
  public formFields() {
    var control = {};
    for (let field of this.formField) {
      control[field?.fieldName] = [field?.defaultValue, field?.validation]
    }
    return control;
  }
  Submit(): any {
    this.formData.emit(this.generateSubmittedFormData());
  }
  clearField() {
    this.SmartForm.reset();
    this.setDefaultVaueAfterClear();
    this.isAdd = true;
  }

  setDefaultVaueAfterClear() {
    var fieldData = {};
    for (let field of this.formField) {
      fieldData[field.fieldName] = field?.defaultValue == undefined ? "" : field?.defaultValue
    }
    this.SmartForm.setValue(fieldData);
  }
  generateSubmittedFormData() {
    var fieldData = {};
    fieldData["Mode"] = this.isAdd ? "0" : "1";
    for (let field of this.formField) {
      fieldData[field.fieldName] = this.SmartForm.get(field.fieldName)?.value
    }
    return fieldData
  }

  public setFormValue(data) {
    var fieldData = {};
    for (let field of this.formField) {
      fieldData[field.fieldName] = data[field.fieldName]
    }
    this.SmartForm.setValue(fieldData);
  }

  /* search list edit */
  edit(item) {
    this.setFormValue(item);
    this.isAdd = false;
  }
  /* search list delete  */
  delete(item) {

  }

  /* fetch list data to render in dropdown */

  getListDataForDropdown() {
    this.formField.filter((field) => {
      if (field?.listData?.fetchURL) {
        this._smartFormService.GetDropdownList(field?.listData?.requestBody, field?.listData?.fetchURL).subscribe({
          next: data => {
            this[field.fieldName + 'List'] = data;
          },
          error: error => {
          }
        });
      }
    })
  }
}
