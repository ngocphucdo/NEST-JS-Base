import { UserDocument } from './schemas/users.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRegisterUser } from './interfaces/RegisterUser.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ILoginUser } from './interfaces/LoginUser.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async register(registerUser: IRegisterUser) {
    const { username, password } = registerUser;
    // Check if username already exits
    try {
      const usernameFound = await this.userModel.findOne({ username });
      if (usernameFound) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      const hashPassword = bcrypt.hashSync(password, 10);
      registerUser.password = hashPassword;
      const newUser = new this.userModel(registerUser);
      await newUser.save();
      return newUser;
    } catch (error) {
      return error;
    }
  }

  async login(loginUser: ILoginUser) {
    const { username, password } = loginUser;
    try {
      // Get detail user from DB
      const userInfo = await this.userModel.findOne({ username });
      const comparedPassword = await bcrypt.compare(
        password,
        userInfo.password,
      );

      if (!userInfo || !comparedPassword) {
        throw new HttpException(
          'Username/Password wrong',
          HttpStatus.NOT_FOUND,
        );
      }
      const tokenGenerated = jwt.sign(
        { id: userInfo._id, username: userInfo.username },
        '@ngocphucdo',
        {
          expiresIn: '7d',
        },
      );
      return {
        username,
        tokenGenerated,
      };
    } catch (error) {
      return error;
    }
  }
}
