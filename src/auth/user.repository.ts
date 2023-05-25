import { Repository } from 'typeorm';
import { CustomRepository } from 'src/configs/typeorm-ex.decorator';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { BadRequestException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
    });

    try {
      return await this.save(user);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException(`${username} aleady exists.`);
      } else {
        throw new BadRequestException();
      }
    }
  }
}
