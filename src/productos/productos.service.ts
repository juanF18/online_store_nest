import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './productos.entity';
import { Repository } from 'typeorm';
import { ActualizarProductoDTO, CrearProductoDTO } from './dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private repositorioProductos: Repository<Producto>,
  ) {}

  async crearProducto(producto: CrearProductoDTO) {
    const productoEncontrado = await this.repositorioProductos.findOne({
      where: {
        nombre: producto.nombre,
      },
    });

    if (productoEncontrado) {
      return new HttpException(
        'El producto ya esta creado',
        HttpStatus.CONFLICT,
      );
    }

    const nuevoProducto = this.repositorioProductos.create(producto);
    return this.repositorioProductos.save(nuevoProducto);
  }

  obtenerProductos() {
    return this.repositorioProductos.find();
  }

  async obtenerProducto(id: number) {
    const productoEncontrado = await this.repositorioProductos.findOne({
      where: {
        id,
      },
    });
    if (!productoEncontrado) {
      return new HttpException(
        'El producto no se ha encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return productoEncontrado;
  }

  async eliminarProducto(id: number) {
    const productoEncontrado = await this.repositorioProductos.findOne({
      where: {
        id,
      },
    });

    if (!productoEncontrado) {
      return new HttpException(
        'El producto no se ha encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.repositorioProductos.delete({ id });
  }

  async actuializarProducto(id: number, producto: ActualizarProductoDTO) {
    const productoEncontrado = await this.repositorioProductos.findOne({
      where: {
        id,
      },
    });

    if (!productoEncontrado) {
      return new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }

    const productoActualizado = Object.assign(productoEncontrado, producto);

    return this.repositorioProductos.save(productoActualizado);
  }
}
