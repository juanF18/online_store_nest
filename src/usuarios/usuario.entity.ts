import { Pedido } from 'src/pedidos/pedido.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo_electronico: string;

  @Column()
  contrasena: string;

  @OneToMany(() => Pedido, (pedido) => pedido.usuario_id)
  pedidos: Pedido[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
