import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';
import { CrearUsuarioDTO, ActualizarUsuarioDTO } from './dto';
/**
 * Servicios basicos de CRUD utilizando un DTO (date transfer object)
 */
@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepositorio: Repository<Usuario>,
  ) {}

  crearUsuario(usuario: CrearUsuarioDTO) {
    const nuevoUsuario = this.usuarioRepositorio.create(usuario);
    return this.usuarioRepositorio.save(nuevoUsuario);
  }

  obtenerUsuarios() {
    return this.usuarioRepositorio.find();
  }

  obtenerUsuario(id: number) {
    return this.usuarioRepositorio.findOne({
      where: {
        id: id,
      },
    });
  }

  eliminarUsuario(id: number) {
    return this.usuarioRepositorio.delete({ id });
  }

  actualizarUsuario(id: number, usuario: ActualizarUsuarioDTO) {
    this.usuarioRepositorio.update({ id }, { ...usuario });
  }
}
