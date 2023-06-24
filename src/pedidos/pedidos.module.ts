import { Module } from '@nestjs/common';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido]),
    UsuariosModule,
    ProductosModule,
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
