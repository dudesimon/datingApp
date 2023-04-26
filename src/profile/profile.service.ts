import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { Profile } from './entities/profile.entity';
import { Loaded, NotFoundError } from '@mikro-orm/core';
import { profile } from 'console';

@Injectable()
export class ProfileService {
  constructor(
    private readonly em: EntityManager
    ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile: Profile = new Profile(/**createProfileDto */);
    await this.em.persistAndFlush(profile);
    
    return profile;
  }

  findAll() {
    return this.em.find(Profile, {});
  }

  async findOne(id: number) {
    const profile: Loaded<Profile> | null = await this.em.findOne(Profile, { id });
    if(!profile){
      throw new NotFoundError('User not found');
    }
    return profile
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile: Loaded<Profile> = await this.findOne(id);
    profile.display_name = UpdateProfileDto.name ?? profile.display_name;
    await this.em.persistAndFlush(profile);
    return profile;
  }

  async remove(id: number) {
    const profile: Loaded<Profile> = await this.findOne(id);
    this.em.removeAndFlush(profile);
    return profile;
  }
}
