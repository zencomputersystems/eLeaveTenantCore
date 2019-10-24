import { Post, UseGuards, Controller, Body, Req, Get } from '@nestjs/common';
import { ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDTO } from './dto/login.dto';
import { Request } from 'express';
import { decryptProcess, encryptProcess } from '../common/helper/basic-function';

@Controller('api/auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) { }

  @Get('test-encrypt')
  @ApiImplicitQuery({ name: 'password', description: 'Password to encrypt', required: true })
  @ApiOperation({ title: 'test encrypt', description: 'test encrypt using crypto-js' })
  public async testEncrypt(@Req() req: Request) {
    return encryptProcess([req.query.password, 'secret key 122']);
  }

  @Get('test-decrypt')
  @ApiOperation({ title: 'test decrypt', description: 'test encrypt using crypto-js' })
  @ApiImplicitQuery({ name: 'password', description: 'password to decrypt', required: true })
  public async testDecrypt(@Req() req) {
    return decryptProcess([req.query.password, 'secret key 122']);
  }

  @Post('login/local')
  @ApiOperation({ title: 'Login credential from database' })
  @UseGuards(AuthGuard('local'))
  public async local(@Body() data: LoginDTO, @Req() req) {
    return await this.authService.createToken(req.user);
  }

}