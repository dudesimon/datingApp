import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { MessagesModule } from './messages/messages.module';
import config from 'mikro-orm.config';


@Module({
  imports: [MikroOrmModule.forRoot(), UsersModule, ProfileModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
