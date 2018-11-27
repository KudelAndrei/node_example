import bcrypt from 'bcrypt';
import * as HttpCodes from '../configs/http.code.config';
import HttpError from '../http.error';
import UnitOfWork from '../core/uow';
import userModel from '../models/user';
import * as entityStatus from '../models/entityStatus';
import specification from '../specification';

export default class UserServices {
  constructor() {
    this.userService = new UnitOfWork(userModel);
  }

  signUp = async ({ email, password }) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const userFind = await this.userService.findOne({ email });

    if (userFind) {
      throw new HttpError(HttpCodes.BAD_REQUEST, 'This User is busy');
    }

    const userCreate = await this.userService.create({
      email,
      password: hash,
      status: entityStatus.DISABLE,
    });

    return userCreate;
  }

  signIn = async ({ email, password }) => {
    const userFind = await this.userService.findOne({ email });

    if (!userFind) {
      throw new HttpError(HttpCodes.BAD_REQUEST, 'User is not found');
    }

    // if (specification.isDisable(user.status)) {
    //   throw new HttpError(HttpCodes.BAD_REQUEST, 'Your Email is not activate. Please, confirm email');
    // } else if (specification.isDelited(user.status)) {
    //   throw new HttpError(HttpCodes.BAD_REQUEST, 'Your Account is deleted. Please, reestablish email');
    // }

    const isPasswordCompare = await bcrypt.compare(password, userFind.password);

    if (!isPasswordCompare) {
      throw new HttpError(HttpCodes.UNAUTHORISED, 'Password not valid');
    }
  }

  confirmRegister = async ({ email }) => {
    const userFind = await this.userService.findOne({ email });

    if (!userFind) {
      throw new HttpError(HttpCodes.BAD_REQUEST, 'Email not found');
    }

    const userUpdate = await userFind.update({ status: +entityStatus.ACTIVE });

    return userUpdate;
  }

  deleteUser = async ({ email, password }) => {
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new HttpError(HttpCodes.BAD_REQUEST, 'Email not found');
    }

    // const res = await bcrypt.compare(password, user.password);
    //
    // if (!res) {
    //   throw new HttpError(HttpCodes.UNAUTHORISED, 'Password not valid');
    // }

    const updateUser = await user.update({ status: +entityStatus.DELETED });

    return updateUser;
  }

  getUsers = async () => {
    let users = await this.userService.findAll();

    return users;
  }
}
