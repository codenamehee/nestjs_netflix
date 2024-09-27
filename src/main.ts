import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // true인 경우, type으로 정의하지 않은 값들은 전달하지 않음.
            forbidNonWhitelisted: true, // whitelist에 의해 특정 값이 걸렸을 때, 오류를 발생시킴.
        }),
    );
    await app.listen(3000);
}
bootstrap();
