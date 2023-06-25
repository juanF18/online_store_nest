import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CrearPedidoDTO } from './dto/crear-pedido.dto';
import { PedidosService } from './pedidos.service';
import { Pedido } from './pedido.entity';
import { ActualizarPedidoDTO } from './dto';

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

  @Get(':id')
  obtenerPedido(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Pedido | HttpException> {
    return this.servicioPedidos.obtenerPedido(id);
  }

  @Delete(':id')
  eliminarProducto(@Param('id', ParseIntPipe) id: number) {
    return this.servicioPedidos.eliminarPedido(id);
  }

  @Patch(':id')
  actualizarPedido(
    @Param('id', ParseIntPipe) id: number,
    @Body() pedido: ActualizarPedidoDTO,
  ) {
    return this.servicioPedidos.actualizarPedido(id, pedido);
  }
}
