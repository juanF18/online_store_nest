import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';
import { CrearUsuarioDTO } from './dto/crear-usuario.dto';
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
}
