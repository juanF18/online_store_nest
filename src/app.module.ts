import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuarios/usuario.entity';
import { ProductosModule } from './productos/productos.module';
import { Producto } from './productos/productos.entity';
import 'dotenv/config';

@Module({
  imports: [
    UsuariosModule,
    ProductosModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DEV_HOST,
      port: Number(process.env.DEV_PORT),
      username: process.env.DEV_USER,
      password: process.env.DEV_PASS,
      database: process.env.DEV_DB_NAME,
      entities: [Usuario, Producto],
      synchronize: true,
      logging: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
