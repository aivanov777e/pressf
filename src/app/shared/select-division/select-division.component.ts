import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewChild, Optional, Self } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AbstractControl, NgControl, ControlValueAccessor, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';
// import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { MatAutocompleteTrigger, ErrorStateMatcher } from '@angular/material';
import { Division } from 'src/app/models/division';
import { DivisionService } from 'src/app/core/services/division.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-select-division',
  templateUrl: './select-division.component.html',
  styleUrls: ['./select-division.component.less']
})
export class SelectDivisionComponent  implements ControlValueAccessor, OnInit, ErrorStateMatcher {

  @Input() placeholder: string;
  @Input() requiredMsg: string;
  @Input() divisionId: string;
  @Output() optionSelected = new EventEmitter<any>();

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) { this._required = coerceBooleanProperty(value); }
  protected _required = false;

  divisionFC: AbstractControl;
  filteredDivisions: Observable<Division[]>;
  @ViewChild(MatAutocompleteTrigger, {static: false}) autocomplete: MatAutocompleteTrigger;
  notFoundMsg: string;
  firstOpen = true;

  constructor(
    private divisionSrv: DivisionService,
    @Self() @Optional() private controlDir: NgControl,
    @Optional() @Inject(DOCUMENT) private _document: any,
  ) {
    controlDir.valueAccessor = this;
   }

  ngOnInit() {
    this.divisionFC = this.controlDir.control;
    const validators = this.divisionFC.validator
      ? [this.divisionFC.validator, this.notFoundValidator] : this.notFoundValidator;
    this.divisionFC.setValidators(validators);
    this.divisionFC.updateValueAndValidity();

    this.filteredDivisions = this.divisionFC.valueChanges
      .pipe(
        debounceTime(environment.debounceTime),
        distinctUntilChanged(),
        switchMap(val => this.filterDivision(val || ''))
      );
  }

  filterDivision(val: any): Observable<any[]> {
    if (val && val.name) {
      return of([val]);
    }
    return this.divisionSrv.getList(val, this.divisionId)
    .pipe(
      map(response => {
          // if (this.cities) {
          //   response.divisions = response.divisions.filter(x => x.divisionType === DivisionType.City);
          // }
          if (this.firstOpen && response.length <= 1) { this.firstOpen = false; }
          if (response.length === 1) {
            this.divisionFC.setValue(response[0], {emitEvent: false});
            this.optionSelected.emit();
            this.autocomplete.closePanel();
          }
          return response;
      }));
  }

  displayFn(division?: Division): string | undefined {
    return division ? division.name : undefined;
  }

  formControlClear() {
    this.divisionFC.reset();
    this.divisionFC.markAsTouched();
    this.optionSelected.emit();
  }

  notFoundValidator(control: AbstractControl): {[key: string]: any} | null {
    return (control.value && !control.value.id) ? { cityNotFound: true } : null;
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && !control.valid && (control.dirty || control.touched || isSubmitted)
      && !this.autocomplete.panelOpen && (!this.firstOpen || control.hasError('required')));
  }

  writeValue(value: any): void {}
  registerOnChange(fn: (_: any) => void): void {}
  registerOnTouched(fn: () => void): void {}
}
