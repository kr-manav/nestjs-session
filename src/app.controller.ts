import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseEnumPipe,
  ParseFloatPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Redirect,
  Req,
  Res,
  UnauthorizedException,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { version } from 'os';
import { isString } from 'util';
import { Guard } from './app.guard';
import { InterceptorClass } from './app.interceptor';
import { AppService } from './app.service';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CustomPipe } from './app.pipes';
import { HttpExceptionFilter } from './app.exception';
import { JsonWebKeyInput } from 'crypto';

export class AddressDTO {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsString()
  @IsOptional()
  country: string;
}

export class BodyDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  number: number;

  @ValidateNested()
  @Type(() => AddressDTO)
  address: AddressDTO;
}

@Controller('/users')
// @UseGuards(Guard)
// @UseInterceptors(InterceptorClass)
export class AppController {
  @Get('/')
  getHello(@Req() req: Request): any {
    // console.log("🚀 ~ file: app.controller.ts:25 ~ AppController ~ getHello ~ req:", req)
    return {
      message: 'Hello world',
    };
  }

  //____________________________________________________________________________________________

  @Get('/getData/:id') // http://localhost:3000/users/getData/{id}
  getIdParamId(@Param('id') id: string): any {
    console.log(
      '🚀 ~ file: app.controller.ts:20 ~ AppController ~ getIdParamObj ~ param:',
      id,
    );
    return {
      id: id,
    };
  }

  // @Get('/getData')
  // getId(@Body('id') id: number): any {
  //   return {
  //     id: id,
  //   };
  // }

  // @Get('/getData')
  // getIdParamObj(@Body() body: any): any {
  //   console.log(
  //     '🚀 ~ file: app.controller.ts:20 ~ AppController ~ getIdParamObj ~ param:',
  //     body,
  //   );
  //   return body;
  // }

  //____________________________________________________________________________________________

  @Get('/error')
  @HttpCode(400)
  @HttpCode(HttpStatus.NOT_FOUND)
  @Header('xyz', 'q')
  getRes(@Res() res: Response): any {
    res.status(404).json({
      message: 'Not found',
    });
  }

  //____________________________________________________________________________________________

  @Get('/redirect/:x')
  @Redirect('/getData/:id', 200)
  redirect(@Param() param): any {
    const x = parseInt(param.x);
    if (x < 10) {
      return {
        url: `http://localhost:3000/users/getData/${x}`,
        statusCode: 200,
      };
    } else {
      return {
        url: `/getData/${x + 10}`,
        statusCode: 400,
      };
    }
  }

  //___________________________________________________________________________________________

  @Get('/pipes/')
  pipes(@Body('id1') id1: any, @Body('id2', ParseIntPipe) id2: any): any {
    // pipes(@Body('id1') id1: any, @Body('id2', ParseFloatPipe) id2: any): any {
    // pipes(@Body('id1') id1: any, @Body('id2', ParseBoolPipe) id2: any): any {

    return {
      id1: {
        value: id1,
        type: typeof id1,
      },
      id2: {
        value: id2,
        type: typeof id2,
      },
    };
  }

  @Get('/pipesBool/')
  pipesBool(@Body('id1') id1: any, @Body('id2', ParseBoolPipe) id2: any): any {
    return {
      id1: {
        value: id1,
        type: typeof id1,
      },
      id2: {
        value: id2,
        type: typeof id2,
      },
    };
  }

  //_______________________________________________________________________________________________-

  @Get('/pipesUUID')
  pipesUUID(@Body('id', ParseUUIDPipe) id: any) {
    // pipesUUID(@Body('id', new ParseUUIDPipe({ version: '3' })) id: any) {
    return {
      message: 'Correct uuid',
    };
  }

  //_______________________________________________________________________________________________

  @Get('/pipesArray')
  pipesArray(
    @Body('id', new ParseArrayPipe({ items: Number, separator: ',' })) id: any,
  ) {
    // pipesUUID(@Body('id', new ParseUUIDPipe({ version: '3' })) id: any) {
    return {
      message: id,
      type: typeof id,
    };
  }

  //_____________________________________________________________________________________________

  @Get('/pipesDTO')
  pipesDTO(@Body(ValidationPipe) bodyDTO: BodyDTO) {
    // pipesUUID(@Body('id', new ParseUUIDPipe({ version: '3' })) id: any) {
    return {
      message: bodyDTO,
    };
  }

  //_____________________________________________________________________________________________

  @Get('custompipe')
  @UsePipes(CustomPipe)
  customPipe(@Body() param: any) {
    return {
      message: param,
    };
  }

  //_____________________________________________________________________________________________

  @Get('exceptionfilter')
  @UseFilters(HttpExceptionFilter)
  filter() {
    throw new BadRequestException('Bad request');
    // throw new UnauthorizedException('Unauthorized');
  }
}
