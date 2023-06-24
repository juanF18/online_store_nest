import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CrearUsuarioDTO } from './dto/crear-usuario.dto';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private servicioUsuario: UsuariosService) {}

  @Post()
  crearUsuario(@Body() nuevoUsuario: CrearUsuarioDTO): Promise<Usuario> {
    return this.servicioUsuario.crearUsuario(nuevoUsuario);
  }

  @Get()
  obtenerUsuarios(): Promise<Usuario[]> {
    return this.servicioUsuario.obtenerUsuarios();
  }

  @Get(':id')
  obtenerUsuario(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.servicioUsuario.obtenerUsuario(id);
  }

  @Delete(':id')
  eliminarUsuario(@Param('id', ParseIntPipe) id: number) {
    this.servicioUsuario.eliminarUsuario(id);
  }
}
