/**
 * Declare passport-local
 */
var Strategy = require('passport-local');
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';

/**
 * Class local strategy
 *
 * @export
 * @class LocalStrategy
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  /**
   *Creates an instance of LocalStrategy.
   * @param {AuthService} authService
   * @memberof LocalStrategy
   */
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'loginId',
      passReqToCallback: false
    });
  }

  /**
   * Method validate
   *
   * @param {*} email
   * @param {*} password
   * @param {Function} done
   * @memberof LocalStrategy
   */
  async validate(loginId, password, done: Function) {
    await this.authService.logIn(loginId, password)
      .then(user => done(null, user))
      .catch(err => done(err, false))
  }
}
