import { Body, Controller, Post } from '@nestjs/common';
import { CrearUsuarioDTO } from './dto/crear-usuario.dto';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private servicioUsuario: UsuariosService) {}

  @Post()
  crearUsuario(@Body() nuevoUsuario: CrearUsuarioDTO) {
    return this.servicioUsuario.crearUsuario(nuevoUsuario);
  }
}
