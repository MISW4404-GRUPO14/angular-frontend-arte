import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Actor } from '../../models/actor.model';
import { ActoresService } from 'src/app/services/actores/actores.service';
import { ActivatedRoute} from '@angular/router';
import { BreadcrumbItem } from 'src/app/models/breadcrumb-item.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-actor-create',
  templateUrl: './actor-create.component.html',
  styleUrls: []
})
export class ActorCreateComponent implements OnInit {

  actorForm!: FormGroup;
  breadcrumbItems: BreadcrumbItem[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private actoresServices: ActoresService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Crear actor')
    this.breadcrumbItems = [
      {
        label: 'Inicio',
        link: '/',
      },
      {
        label: 'Actores',
        link: '/actores',
      },
    ];
    if (
      this.activatedRoute.snapshot.data &&
      this.activatedRoute.snapshot.data.create
    ) {
      this.breadcrumbItems.push({
        label: this.activatedRoute.snapshot.data.create,
      });
    }
    this.actorForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      photo: ["", Validators.required],
      nationality: ["", Validators.required],
      birthDate: [new Date, Validators.required],
      biography: ["", [Validators.required, Validators.maxLength(500)]]
    })
  }
  createActor(actor: Actor){
    this.actoresServices.createActor(actor).subscribe(()=>{
      this.toastr.success("Confirmation", "Actor Creado")
      this.cancelCreation();
    })
  }

  cancelCreation(){
    this.actorForm.reset();
 }

}
