import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Pedido } from './pedido.entity';
import { Repository } from 'typeorm';
import { ProductosService } from 'src/productos/productos.service';
import { CrearPedidoDTO, ActualizarPedidoDTO } from './dto';

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

    const nuevoPedido = this.respositorioPedidos.create(pedido);

    if (
      usuarioEncontrado instanceof HttpException ||
      productoEncontrado instanceof HttpException
    ) {
      return new HttpException(
        'Usuario o producto no encontrado',
        HttpStatus.NOT_FOUND,
      );
    } else {
      nuevoPedido.usuario = usuarioEncontrado;
      nuevoPedido.producto = productoEncontrado;
    }

    return this.respositorioPedidos.save(nuevoPedido);
  }

  obtenerPedidos() {
    return this.respositorioPedidos.find({
      relations: {
        usuario: true,
        producto: true,
      },
    });
  }

  async obtenerPedido(id: number) {
    const pedido = await this.respositorioPedidos.findOne({
      where: {
        id,
      },
      relations: {
        usuario: true,
        producto: true,
      },
    });
    if (!pedido) {
      return new HttpException('Pedido no encontrado', HttpStatus.NOT_FOUND);
    }

    return pedido;
  }

  async actualizarPedido(id: number, pedido: ActualizarPedidoDTO) {
    const pedidoEncontrado = await this.respositorioPedidos.findOne({
      where: {
        id,
      },
    });

    const usuarioEncontrado = await this.servicioUsuario.obtenerUsuario(
      pedido.usuario_id,
    );

    const productoEncontrado = await this.servicioProducto.obtenerProducto(
      pedido.producto_id,
    );

    const pedidoActualizado = Object.assign(pedidoEncontrado, pedido);

    if (!pedidoEncontrado) {
      return new HttpException('Pedido no encontrado', HttpStatus.NOT_FOUND);
    } else if (
      usuarioEncontrado instanceof HttpException ||
      productoEncontrado instanceof HttpException
    ) {
      return new HttpException(
        'Usuario o producto no encontrado',
        HttpStatus.NOT_FOUND,
      );
    } else {
      pedidoActualizado.usuario = usuarioEncontrado;
      pedidoActualizado.producto = productoEncontrado;
    }

    return this.respositorioPedidos.save(pedidoActualizado);
  }

  async eliminarPedido(id: number) {
    const result = await this.respositorioPedidos.delete(id);
    if (result.affected === 0) {
      return new HttpException('Pedido no encontrado', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
