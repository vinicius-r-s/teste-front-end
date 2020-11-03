import { AfterViewInit, Component, OnInit, ViewChild, Output, EventEmitter, TemplateRef, Input, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductTableDataSource } from './product-table-datasource';
import { Product } from '../../core/models/product.model';
import { ApiService } from '../../core/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { Drawer } from 'src/app/core/models/drawer.interface';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements AfterViewInit, OnInit {
  @Input()
  loading: boolean = true;
  @Output()
  feedBackReload = new EventEmitter();

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatTable) table: MatTable<Product>;
  // dataSource: ProductTableDataSource;

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = '#FF7702';
  public loadingTemplate: TemplateRef<any>;
  public products: Product[];
  public selectedProduct: Product;

  public displayedColumns = ['nome', 'marca', 'modelo', 'preco', 'action'];
  public showProductDrawer = false;

  constructor(private apiService: ApiService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getProducts();
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.loading) {
      this.getProducts()
    }
  }

  toggleDrawerWithProduct(product: Product) {
    if (this.showProductDrawer) {
      this.showProductDrawer = false;
    }
    else {
      this.showProductDrawer = true;
    }
    this.selectedProduct = product;
  }

  receiverFeedBack(feedBackIsOpen: Drawer) {
    this.showProductDrawer = feedBackIsOpen.drawer;
  }

  showSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['custom-class'];
    config.duration = 3000,
      this._snackBar.open(message, 'OK', config);
  }

  async getProducts() {
    await this.apiService.getProducts().subscribe((products) => {
      this.loading = false
      this.feedBackReload.emit(this.loading);
      this.products = products;
    })
  }

  deleteProduct(id: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.loading = true;
      if (result) {
        this.apiService.deleteProduct(id).subscribe(
          (res) => {
            if (res.status == 200 || res.status == 201) {
              this.loading = false;
              this.showSnackBar('Excluido com sucesso');
              this.getProducts();
            }
          },
          (err) => {
            if (err.status == 200 || err.status == 201) {
              this.loading = false;
              this.showSnackBar('Excluido com sucesso');
              this.getProducts();
            }
          });
      }
      else {
        this.loading = false;
      }
    });
  }
}