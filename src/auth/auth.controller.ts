import { Post, UseGuards, Controller, Body, Req, Get } from "@nestjs/common";
import { ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthGuard } from '@nestjs/passport';
import { LoginDTO } from "./dto/login.dto";

var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");
var CryptoJS = require("crypto-js");

@Controller('api/auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('login/ad')
  @ApiOperation({ title: 'Login ad' })
  @UseGuards(AuthGuard('ad'))
  public async ad(@Body() data: LoginDTO, @Req() req) {
    console.log(req.user);
    return await this.authService.createToken(req.user);
  }

  @Post('login/jwt')
  @ApiOperation({ title: 'Login ' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  public async jwt(@Req() req) {
    console.log(req.user);
    return await this.authService.createToken(req.user);
  }

  @Get('test-encrypt')
  @ApiOperation({ title: 'test encrypt', description: 'test encrypt using crypto-js' })
  public async testEncrypt() {
    // console.log(SHA256("Message"));
    // console.log(CryptoJS.HmacSHA1("Message", "Key"));

    // var CryptoJS = require("crypto-js");

    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 122');
    console.log(ciphertext.toString());

    // Decrypt
    var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 122');
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    console.log(plaintext);
  }
}