import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { Product } from '../../core/models/product.model';
import { ApiService } from '../../core/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-product-drawer',
  templateUrl: './product-drawer.component.html',
  styleUrls: ['./product-drawer.component.scss']
})
export class ProductDrawerComponent implements OnInit {
  @Input()
  isOpen: boolean;
  @Input()
  type: string;
  @Input()
  product: Product
  @Output()
  feedBackIsOpen = new EventEmitter();

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  public title;
  public productForm: FormGroup;
  public submitAttempt: boolean = false;

  public myProduct = {
    nome: '',
    marca: '',
    modelo: '',
    preco: 0,
    link_foto: '',
    descricao: ''
  }


  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
    this.productForm = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required])],
      marca: ['', Validators.compose([Validators.required])],
      modelo: ['', Validators.compose([Validators.required])],
      preco: [, Validators.compose([Validators.required])],
      foto: [''],
      descricao: [''],
    });
  }

  ngOnInit(): void {
    if (this.type == 'edit') {
      this.title = "Editar Produto"
    } else {
      this.title = "Adicionar Produto"
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.product) {
      this.loadProduct();
    }
  }

  loadProduct(): void {
    this.productForm.patchValue({
      nome: this.product.nome,
      marca: this.product.marca,
      modelo: this.product.modelo,
      preco: this.product.preco,
      foto: this.product.link_foto,
      descricao: this.product.descricao
    });
  }

  showSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['custom-class'];
    config.duration = 3000,
      this._snackBar.open(message, 'OK', config);
  }

  closeDrawer(): void {
    this.isOpen = false;
    this.productForm.reset();
    this.formGroupDirective.resetForm();
    this.feedBackIsOpen.emit({ drawer: this.isOpen, reload: false });
  }

  productSubmit(): void {
    if (this.type === "create") {
      const product = {
        nome: '',
        marca: '',
        modelo: '',
        preco: 0,
        link_foto: '',
        descricao: ''
      }

      this.myProduct.nome = this.productForm.controls.nome.value;
      this.myProduct.marca = this.productForm.controls.marca.value;
      this.myProduct.modelo = this.productForm.controls.modelo.value;
      this.myProduct.preco = this.productForm.controls.preco.value;
      this.myProduct.link_foto = this.productForm.controls.foto.value;
      this.myProduct.descricao = this.productForm.controls.descricao.value;

      if (this.productForm.valid) {
        this.submitAttempt = true;
        this.apiService.createProduct(this.myProduct).subscribe(
          (res) => {
            if (res.status == 200 || res.status == 201) {
              this.showSnackBar('Cadastro feito com sucesso');
              this.isOpen = false;
              this.productForm.reset();
              this.formGroupDirective.resetForm();
              this.feedBackIsOpen.emit({ drawer: this.isOpen, reload: true });
            }
          },
          (err: HttpErrorResponse) => {
            if (err.status == 200 || err.status == 201) {
              this.showSnackBar('Cadastro feito com sucesso');
              this.isOpen = false;
              this.productForm.reset();
              this.formGroupDirective.resetForm();
              this.feedBackIsOpen.emit({ drawer: this.isOpen, reload: true });
            }
          })
      }
    }
    if (this.type === "edit") {
      this.product.nome = this.productForm.controls.nome.value;
      this.product.marca = this.productForm.controls.marca.value;
      this.product.modelo = this.productForm.controls.modelo.value;
      this.product.preco = this.productForm.controls.preco.value;
      this.product.link_foto = this.productForm.controls.foto.value;
      this.product.descricao = this.productForm.controls.descricao.value;

      if (this.productForm.valid) {
        this.submitAttempt = true;
        this.apiService.editProduct(this.product._id, this.product).subscribe(
          (res) => {
            if (res.status == 200 || res.status == 201) {
              this.showSnackBar('Produto alterado com sucesso');
              this.closeDrawer();
            }
          },
          (err: HttpErrorResponse) => {
            if (err.status == 200 || err.status == 201) {
              this.showSnackBar('Produto alterado com sucesso');
              this.closeDrawer();
            }
          }
        )
      }
    }
  }
}
