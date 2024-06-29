import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.css'],
})
export class TableProductComponent implements OnInit {
  [x: string]: any;
  //Declarar
  // products: Product[] = [];
  listProducts: Product[] = [];
  copiaFiltrarListProducts: Product[] = [];
  busqueda = '';
  registrosPorPaginaSeleccionados = 5;
  dropdownOpenMap: { [key: string]: boolean } = {};
  constructor(
    private router: Router,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        console.log('🆗🆗', res);
        this.listProducts = res.data;
        this.copiaFiltrarListProducts = [...this.listProducts];
      },
      error: console.error,
    });
  }

  newProduct() {
    this.router.navigate(['/nuevo-producto']);
  }

  buscarFiltro() {
    this.copiaFiltrarListProducts = this.listProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(this.busqueda.toLowerCase())
      // ||
      //   product.description
      //     .toLowerCase()
      //     .includes(this.busqueda.toLowerCase()) ||
      //   product.id.toString().includes(this.busqueda)
    );
  }

  onChangeRegistrosPorPagina(value: any) {
    const registrosPorPagina = value as string;
  }

  toggleDropdown(productId: string) {
    this.dropdownOpenMap[productId] = !this.dropdownOpenMap[productId];
  }

  isDropdownOpen(productId: string): boolean {
    return this.dropdownOpenMap[productId] || false;
  }

  editarProduct(id: string) {
    this.router.navigate(['/editar-producto', id]);
  }
}
