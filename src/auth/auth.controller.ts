import { Post, UseGuards, Controller, Body, Req, Get, Param, Logger, Res, ConflictException } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiImplicitQuery } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthGuard } from '@nestjs/passport';
import { LoginDTO } from "./dto/login.dto";
import { SignupDTO } from './dto/signup.dto';
import { Request, Response } from 'express';

var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");
var CryptoJS = require("crypto-js");

@Controller('api/auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) { }

  // @Post('login/ad')
  // @ApiOperation({ title: 'Login ad' })
  // @UseGuards(AuthGuard('ad'))
  // public async ad(@Body() data: LoginDTO, @Req() req) {
  //   Logger.log(req.user, 'user');
  //   return await this.authService.createToken(req.user);
  // }

  // @Post('login/jwt')
  // @ApiOperation({ title: 'Login ' })
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  // public async jwt(@Req() req) {
  //   Logger.log(req.user,'user');
  //   return await this.authService.createToken(req.user);
  // }

  @Get('test-encrypt')
  @ApiImplicitQuery({ name: 'password', description: 'Password to encrypt', required: true })
  @ApiOperation({ title: 'test encrypt', description: 'test encrypt using crypto-js' })
  public async testEncrypt(@Req() req: Request) {
    return this.encryptText(req.query.password, 'secret key 122')

    // var CryptoJS = require("crypto-js");

    // Encrypt
    // var ciphertext = CryptoJS.AES.encrypt(req.query.password, 'secret key 122');
    // Logger.log(ciphertext.toString(),'cipherText');

    // Decrypt
    // var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 122');
    // var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    // Logger.log(plaintext,'plaintext');
    // return ciphertext.toString();
  }

  @Get('test-decrypt')
  @ApiOperation({ title: 'test decrypt', description: 'test encrypt using crypto-js' })
  @ApiImplicitQuery({ name: 'password', description: 'password to decrypt', required: true })
  public async testDecrypt(@Req() req) {
    return this.decryptText(req.query.password, 'secret key 122');

    // Logger.log(SHA256("Message"),'data');
    // Logger.log(CryptoJS.HmacSHA1("Message", "Key"),'data');

    // var CryptoJS = require("crypto-js");

    // Encrypt
    // var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 122');
    // Logger.log(ciphertext.toString(),'ciphertext');

    // Logger.log(req.query.password,'password');
    // Decrypt
    // var bytes = CryptoJS.AES.decrypt(req.query.password, 'secret key 122');
    // var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    // Logger.log(plaintext,'plaintext');
    // return plaintext;
  }

  @Post('login/local')
  @ApiOperation({ title: 'Login credential from database' })
  @UseGuards(AuthGuard('local'))
  public async local(@Body() data: LoginDTO, @Req() req) {
    // Logger.log(data, 'Data login');
    // Logger.log(req.user, 'user-data');
    return await this.authService.createToken(req.user);
  }

  @Post('sign-up/local')
  @ApiOperation({ title: 'Sign up new user' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  signup(@Body() signupData: SignupDTO, @Req() req, @Res() res: Response) {
    // Logger.log(req.user, 'This is creation user');
    // get signup data
    // Logger.log(signupData, 'Data signup');

    // decrypt password
    // var bytes = CryptoJS.AES.decrypt(signupData.password, 'secret key 122');
    // var plainPassword = bytes.toString(CryptoJS.enc.Utf8);
    var plainPassword = this.decryptText(signupData.password, 'secret key 122');

    // encrypt by dynamic key
    // var cipherPassword = CryptoJS.AES.encrypt(plainPassword, signupData.email);
    var cipherPassword = this.encryptText(plainPassword, signupData.email);

    this.authService.signupUser([signupData, cipherPassword]).subscribe(
      data => {
        res.send(data.data.resource);
      }, err => {
        // throw new ConflictException('Duplicate entry', 'Failed to create user');
        res.send(new ConflictException('Duplicate entry', 'Failed to create user'));
      }
    );
    // decrypt back : test
    // var bytes = CryptoJS.AES.decrypt(cipherPassword, signupData.email);
    // var plainDecrypt = bytes.toString(CryptoJS.enc.Utf8);
    // var plainDecrypt = this.decryptText(cipherPassword, signupData.email);

    // Logger.log(plainDecrypt, 'Get password back');

    // res.send(signupData);
  }




  public encryptText(plainText: string, secretKey: string) {
    var ciphertext = CryptoJS.AES.encrypt(plainText, secretKey);
    return ciphertext.toString();
  }

  public decryptText(cipherText: string, secretKey: string) {
    var bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

}