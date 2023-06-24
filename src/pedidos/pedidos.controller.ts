import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { CrearPedidoDTO } from './dto/crear-pedido.dto';
import { PedidosService } from './pedidos.service';
import { Pedido } from './pedido.entity';

@Controller('pedidos')
export class PedidosController {
  constructor(private servicioPedidos: PedidosService) {}

  @Post()
  crearPedido(@Body() pedido: CrearPedidoDTO): Promise<Pedido | HttpException> {
    return this.servicioPedidos.crearPedido(pedido);
  }

  @Get()
  obtenerPedidos(): Promise<Pedido[]> {
    return this.servicioPedidos.obtenerPedidos();
  }
}
