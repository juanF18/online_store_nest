import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  HttpException,
} from '@nestjs/common';
import { CrearUsuarioDTO, ActualizarUsuarioDTO } from './dto';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private servicioUsuario: UsuariosService) {}

  @Post()
  crearUsuario(
    @Body() nuevoUsuario: CrearUsuarioDTO,
  ): Promise<Usuario | HttpException> {
    return this.servicioUsuario.crearUsuario(nuevoUsuario);
  }

  @Get()
  obtenerUsuarios(): Promise<Usuario[]> {
    return this.servicioUsuario.obtenerUsuarios();
  }

  @Get(':id')
  obtenerUsuario(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Usuario | HttpException> {
    return this.servicioUsuario.obtenerUsuario(id);
  }

  @Delete(':id')
  eliminarUsuario(@Param('id', ParseIntPipe) id: number) {
    this.servicioUsuario.eliminarUsuario(id);
  }

  @Patch(':id')
  actualizarUsuario(
    @Param('id', ParseIntPipe) id: number,
    @Body() usuario: ActualizarUsuarioDTO,
  ) {
    return this.servicioUsuario.actualizarUsuario(id, usuario);
  }
}
