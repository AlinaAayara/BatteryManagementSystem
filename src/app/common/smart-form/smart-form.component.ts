import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SmartFormService } from 'src/app/Services/SmartForm/smart-form.service';
import { SharedDataService } from 'src/app/Services/shared-data.service';
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
  @Input() public showDefaultListTable: boolean = true;
  @Output() changeEmit = new EventEmitter();

  constructor(
    private _FormBuilder: FormBuilder,
    private _smartFormService: SmartFormService,
    private _sharedDataService: SharedDataService
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
    if (changes?.['showDefaultListTable']) {
      this.showDefaultListTable = changes['showDefaultListTable']?.currentValue;
    }
  }

  ngOnInit(): void {
    this.SmartForm = this._FormBuilder.group(this.formFields());

    /* fetch list data to render in dropdown */

    this.getListDataForDropdown();

    this._sharedDataService.customerInfoEdit.subscribe(res => {
      this.edit(res);
    });
    /* this will trigger on party selection from party search page component */
    this._sharedDataService.partyInfoEdit.subscribe(res => {
      this.edit(res);
    });

  }
  public formFields() {
    var control = {};
    for (let field of this.formField) {
      const defaultValue = field?.isDateControl ? this._sharedDataService.currentUser.todaysDate : field?.defaultValue;
      control[field?.fieldName] = [defaultValue, field?.validation]
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
      fieldData[field.fieldName] = data[field.fieldName] ?? 0
    }
    this.SmartForm.setValue(fieldData);
  }

  /* search list edit */
  edit(item) {
    this.setFormValue(item);
    this.isAdd = false;

    setTimeout(() => {
      for (let field of this.formField) {
        if (field?.onChange) {
          this.onChange(field);
        }
      }
    }, 1000);
  }
  /* search list delete  */
  delete(item) {

  }

  /* fetch list data to render in dropdown */

  getListDataForDropdown() {
    this.formField.filter((field) => {
      this.loadListData(field);
    })
  }

  radioClick(e) {

  }
  loadListData(field) {
    if (field?.listData?.fetchURL) {
      this._smartFormService.GetDropdownList(field?.listData?.requestBody, field?.listData?.fetchURL).subscribe({
        next: data => {
          this[field.fieldName + 'List'] = data;
        },
        error: error => {
        }
      });
    }
  }
  onChange(field) {
    const value = this.SmartForm.get(field.fieldName)?.value;
    const obj = {
      field: field,
      value: value
    }
    this.changeEmit.emit(obj);
  }

  manuallySetValue(field) {
    this.SmartForm.get(field?.fieldName)?.setValue(field?.defaultValue);
  }
}
