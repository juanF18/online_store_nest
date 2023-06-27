import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ActualizarProductoDTO, CrearProductoDTO } from './dto';
import { Producto } from './productos.entity';

@Controller('productos')
export class ProductosController {
  constructor(private servicioProducto: ProductosService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  crearProducto(
    @Body() nuevoProducto: CrearProductoDTO,
  ): Promise<Producto | HttpException> {
    return this.servicioProducto.crearProducto(nuevoProducto);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  obtenerProductos(): Promise<Producto[]> {
    return this.servicioProducto.obtenerProductos();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  obtenerProducto(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Producto | HttpException> {
    return this.servicioProducto.obtenerProducto(id);
  }

  @Delete(':id')
  eliminarProducto(@Param('id', ParseIntPipe) id: number) {
    return this.servicioProducto.eliminarProducto(id);
  }

  @Patch(':id')
  @Header('Content-Type', 'application/json')
  actualizarProducto(
    @Param('id', ParseIntPipe) id: number,
    @Body() producto: ActualizarProductoDTO,
  ) {
    return this.servicioProducto.actuializarProducto(id, producto);
  }
}
