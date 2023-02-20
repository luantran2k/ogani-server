import { IsEmail } from 'class-validator';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Optional,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AccessTokenGuard } from './accessToken.guard';
import { JwtPayload } from './accessToken.strategy';
import { AuthService, ChangePasswordInfo } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import EmailDto from './dto/email.dto';
import { RefreshTokenGuard } from './refreshToken.guard';

type RequestType = Request & { user: JwtPayload };

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('verify-code')
  sendVerifyCode(@Query() emailDto: EmailDto) {
    const { email } = emailDto;
    return this.authService.sendVerifyCode(email);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  silogingnin(@Body() data: AuthDto) {
    return this.authService.login(data);
  }

  @UseGuards(AccessTokenGuard)
  @Get('signOut')
  logout(@Req() req: RequestType) {
    return this.authService.logout(Number(req.user['sub']));
  }

  @UseGuards(RefreshTokenGuard)
  @Get('isSignIn')
  isSignIn() {
    return { signIn: true };
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refreshToken')
  refreshTokens(@Req() req: RequestType) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    try {
      return this.authService.refreshTokens(Number(userId), refreshToken);
    } catch {
      throw new ForbiddenException('Khoong the refresh token');
    }
  }

  @Post('getChangePasswordCode')
  getChangePasswordCode(@Body() body: { email: string }) {
    return this.authService.getChangePasswordCode(body.email);
  }

  @Post('changePassword')
  changePassword(@Body() body: ChangePasswordInfo) {
    return this.authService.changePassword(body);
  }
}
