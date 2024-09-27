import { Exclude, Expose } from 'class-transformer';

@Exclude() // class 내부의 property를 노출되지 않도록 할 수 있음.
export class Movie {
    @Expose()
    id: number;
    @Expose()
    title: string;
    genre: string;
}
