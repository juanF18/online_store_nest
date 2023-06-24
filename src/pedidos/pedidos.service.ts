import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Pedido } from './pedido.entity';
import { Repository } from 'typeorm';
import { ProductosService } from 'src/productos/productos.service';
import { CrearPedidoDTO } from './dto/crear-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido) private respositorioPedidos: Repository<Pedido>,
    private servicioUsuario: UsuariosService,
    private servicioProducto: ProductosService,
  ) {}

  // usuario_id, producto_id, cantidad
  async crearPedido(pedido: CrearPedidoDTO) {
    const usuarioEncontrado = await this.servicioUsuario.obtenerUsuario(
      pedido.usuario_id,
    );

    const productoEncontrado = await this.servicioProducto.obtenerProducto(
      pedido.producto_id,
    );

    if (!usuarioEncontrado || !productoEncontrado) {
      return new HttpException(
        'Usuario o producto no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const nuevoPedido = this.respositorioPedidos.create(pedido);
    return nuevoPedido;
  }

  obtenerPedidos() {
    return this.respositorioPedidos.find();
  }
}
