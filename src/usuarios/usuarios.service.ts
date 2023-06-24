import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
    @InjectRepository(Usuario) private repositorioUsuario: Repository<Usuario>,
  ) {}

  async crearUsuario(usuario: CrearUsuarioDTO) {
    const usuarioEncontrado = await this.repositorioUsuario.findOne({
      where: {
        correo_electronico: usuario.correo_electronico,
      },
    });

    if (usuarioEncontrado) {
      return new HttpException('El usuario ya existe', HttpStatus.CONFLICT);
    }

    const nuevoUsuario = this.repositorioUsuario.create(usuario);
    return this.repositorioUsuario.save(nuevoUsuario);
  }

  obtenerUsuarios() {
    return this.repositorioUsuario.find();
  }

  async obtenerUsuario(id: number) {
    const usuarioEncontrado = await this.repositorioUsuario.findOne({
      where: {
        id: id,
      },
    });

    if (!usuarioEncontrado) {
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    return usuarioEncontrado;
  }

  async eliminarUsuario(id: number) {
    const usuarioEncontrado = await this.repositorioUsuario.findOne({
      where: {
        id,
      },
    });
    if (!usuarioEncontrado) {
      return new HttpException('Usuario no encotrado', HttpStatus.NOT_FOUND);
    }
    return this.repositorioUsuario.delete({ id });
  }

  async actualizarUsuario(id: number, usuario: ActualizarUsuarioDTO) {
    const usuarioEncontrado = await this.repositorioUsuario.findOne({
      where: {
        id,
      },
    });

    if (!usuarioEncontrado) {
      return new HttpException('Usuario no encotrado', HttpStatus.NOT_FOUND);
    }

    const usuarioActualizado = Object.assign(usuarioEncontrado, usuario);

    return this.repositorioUsuario.save(usuarioActualizado);
  }
}
