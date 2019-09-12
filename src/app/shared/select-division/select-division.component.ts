import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewChild, Optional, Self, AfterContentInit } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AbstractControl, NgControl, ControlValueAccessor, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Observable, of, merge, empty } from 'rxjs';
// import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, switchMap, map, startWith } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { MatAutocompleteTrigger, ErrorStateMatcher } from '@angular/material';
import { Division } from 'src/app/models/division';
import { DivisionService } from 'src/app/core/services/division.service';
import { environment } from 'src/environments/environment';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-select-division',
  templateUrl: './select-division.component.html',
  styleUrls: ['./select-division.component.less']
})
export class SelectDivisionComponent  implements ControlValueAccessor, OnInit, AfterContentInit { // , ErrorStateMatcher

  @Input() placeholder: string;
  @Input() requiredMsg: string;
  // @Input() divisionId: string;
  @Input() set topDivision(value: AbstractControl) {
    this._topDivision = value;
  }
  protected _topDivision: AbstractControl;
  // @Output() optionSelected = new EventEmitter<any>();
  @Input() loDivision: AbstractControl;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) { this._required = coerceBooleanProperty(value); }
  protected _required = false;

  // divisionFC: AbstractControl;
  divisionFC: FormControl;
  filteredDivisions: Observable<Division[]>;
  @ViewChild(MatAutocompleteTrigger, {static: false}) autocomplete: MatAutocompleteTrigger;
  notFoundMsg: string;

  constructor(
    private divisionSrv: DivisionService,
    @Self() @Optional() private controlDir: NgControl,
    @Optional() @Inject(DOCUMENT) private _document: any,
  ) {
    controlDir.valueAccessor = this;
  }

  ngOnInit() {
    // this.divisionFC = this.controlDir.control as FormControl;
  }

  ngAfterContentInit() {
    this.divisionFC = this.controlDir.control as FormControl;
    // const validators = this.divisionFC.validator
    //   ? [this.divisionFC.validator, this.notFoundValidator] : this.notFoundValidator;
    // this.divisionFC.setValidators(validators);
    // this.divisionFC.updateValueAndValidity();

    // this.filteredDivisions = merge(this.divisionFC.valueChanges, this._topDivision ? this._topDivision.valueChanges : empty())
    this.filteredDivisions = this.divisionFC.valueChanges
      .pipe(
        // startWith(''),
        // debounceTime(environment.debounceTime),
        // distinctUntilChanged(),
        switchMap((val) => {
          // let val = this.divisionFC.value;
          val = (val && val.name) || val;
          // if (val && val.name) {
          //   return of([val]);
          // }

          let divisionId;
          if (this._topDivision) {
            if (this._topDivision.value && this._topDivision.value.id) {
              divisionId = this._topDivision.value.id;
            } else {
              return of([]);
            }
            // divisionId = this._topDivision.value && this._topDivision.value.id ? this._topDivision.value.id : Guid.EMPTY;
          }
          return this.divisionSrv.getList(val, divisionId)
            .pipe(
              map(response => {
                // if (this.cities) {
                //   response.divisions = response.divisions.filter(x => x.divisionType === DivisionType.City);
                // }
                // if (this.firstOpen && response.length <= 1) { this.firstOpen = false; }
                const d = response.find(r => r.name === val);
                if (d && this.divisionFC.value && this.divisionFC.value.id !== d.id) {
                  this.divisionFC.setValue(d, {emitEvent: false});
                  this.loDivision && this.loDivision.reset();
                }
                // if (response.length === 1) {
                //   this.divisionFC.setValue(response[0], {emitEvent: false});
                //   // this.divisionFC.setValue(response[0]);
                //   // this.optionSelected && this.optionSelected.emit();
                //   this.autocomplete.closePanel();
                // }
                return response;
            }));
        })
      );
  }

  displayFn(division?: Division): string | undefined {
    return division ? division.name : undefined;
  }

  formControlClear() {
    this.divisionFC.reset();
    // this.divisionFC.setValue('');
    this.divisionFC.markAsTouched();
    setTimeout(() => this.autocomplete.openPanel(), 0);
    // this.optionSelected.emit();
  }

  // notFoundValidator(control: AbstractControl): {[key: string]: any} | null {
  //   return (control.value && !control.value.id) ? { notFound: true } : null;
  // }

  // isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
  //   const isSubmitted = form && form.submitted;
  //   return !!(control && !control.valid && (control.dirty || control.touched || isSubmitted)
  //     && !this.autocomplete.panelOpen && (!this.firstOpen || control.hasError('required')));
  // }

  writeValue(value: any): void {}
  registerOnChange(fn: (_: any) => void): void {}
  registerOnTouched(fn: () => void): void {}
}
