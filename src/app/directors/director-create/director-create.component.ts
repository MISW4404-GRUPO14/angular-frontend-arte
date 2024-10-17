import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Director } from 'src/app/models/director.model';
import { DirectorService } from 'src/app/services/directors/director.service';

@Component({
  selector: 'app-director-create',
  templateUrl: './director-create.component.html',
})
export class DirectorCreateComponent implements OnInit {
  directorForm!: FormGroup;

  @Input() isOpen: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private directorService: DirectorService
  ) {}

  ngOnInit() {
    this.directorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      photo: ['', Validators.required],
      nationality: ['', Validators.required],
      birthDate: [new Date(), Validators.required],
      biography: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  createDirector(director: Director) {
    this.directorService.createDirector(director).subscribe(() => {
      this.toastr.success('Confirmation', 'Director Creado');
      this.directorForm.reset();
    });
  }

  cancelCreation() {
    this.directorForm.reset();
  }
}
