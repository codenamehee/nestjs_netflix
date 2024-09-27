import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
@UseInterceptors(ClassSerializerInterceptor)
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getMovies(
        @Query('title') title?: string, // path variable과는 달리 id값이 아닌 다른 프로퍼티로 데이터를 찾고자 할 때 사용
    ) {
        return this.moviesService.getManyMovies(title);
    }

    @Get(':id')
    // @Param() path parameter가 여러개일 수 있기 때문에, 이 중에서 사용할 parameter을 지정할 수 있음.
    getMovie(@Param('id') id: string) {
        return this.moviesService.getMovieById(+id);
    }

    @Post()
    postMovie(@Body() body: CreateMovieDto) {
        return this.moviesService.createMovie(body);
    }

    @Patch(':id')
    patchMovie(@Param('id') id: string, @Body() body: UpdateMovieDto) {
        return this.moviesService.updateMovie(+id, body);
    }

    @Delete(':id')
    deleteMovie(@Param('id') id: string) {
        return this.moviesService.deleteMovie(+id);
    }
}
