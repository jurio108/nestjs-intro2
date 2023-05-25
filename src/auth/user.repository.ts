import { Repository } from 'typeorm';
import { CustomRepository } from 'src/configs/typeorm-ex.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
