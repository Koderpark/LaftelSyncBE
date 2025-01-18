import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthRegisterDto } from 'src/auth/dto/auth-register.dto';
import { AuthLoginDto } from 'src/auth/dto/auth-login.dto';
import { UserMaskedDto } from './dto/user-masked.dto';
import { UserKeyDto } from './dto/user-key.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: AuthRegisterDto): Promise<boolean> {
    const user = this.userRepository.create(data); // 엔티티 생성
    await this.userRepository.save(user); // 데이터베이스에 저장
    return true;
  }

  async read(data: UserKeyDto): Promise<UserMaskedDto | null> {
    const user = await this.userRepository.findOneBy(data);
    if (!user) return null;

    const { password, ...left } = user;
    return left;
  }

  async readWithPW(data: UserQueryDto): Promise<User | null> {
    return await this.userRepository.findOneBy(data);
  }

  async update(key: UserKeyDto, data: UserUpdateDto) {
    const res = await this.userRepository.update(key, data);
    return res.affected ? true : false;
  }

  async remove() {}

  async countByEmail(email: string): Promise<number> {
    return this.userRepository.countBy({ email });
  }
}
