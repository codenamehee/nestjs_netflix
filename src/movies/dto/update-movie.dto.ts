import {
    Equals,
    IsDefined,
    IsNotEmpty,
    IsOptional,
    NotEquals,
    IsEmpty,
    IsIn,
    IsNotIn,
    IsBoolean,
    IsString,
    IsInt,
    IsArray,
    IsEnum,
    IsDate,
    IsDateString,
    IsDivisibleBy,
    IsPositive,
    IsNegative,
    Min,
    Max,
    Contains,
    NotContains,
    IsAlphanumeric,
    IsCreditCard,
    IsHexColor,
    MaxLength,
    MinLength,
    IsUUID,
    IsLatLong,
    ValidatorConstraintInterface,
    ValidationArguments,
    ValidatorConstraint,
    Validate,
    ValidationOptions,
    registerDecorator,
} from 'class-validator';

enum MovieGenre {
    Fantasy = 'fantasy',
    Action = 'action',
}

@ValidatorConstraint({
    async: true,
}) // Custom validation으로 사용하려면 필수인 annotation
class PasswordValidator implements ValidatorConstraintInterface {
    validate(
        value: any,
        validationArguments?: ValidationArguments,
    ): boolean | Promise<boolean> {
        // 비밀번호 길이는 4-8
        return value.length > 4 && value.length < 8;
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return '비밀번호 길이는 4~8자여야 합니다. 입력된 비밀번호: ($value)';
    }
}

function IsPasswordValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: PasswordValidator,
        });
    };
}

export class UpdateMovieDto {
    @IsNotEmpty()
    @IsOptional()
    title?: string;
    @IsNotEmpty()
    @IsOptional()
    genre?: string;

    // @IsDefined() // null || undefined인지 확인
    // @IsOptional() // 자체만으로는 유효하지 않음. 다른 annotation과 함께 써야 유효
    // @Equals('code factory')
    // @NotEquals('code factory')
    //   @IsEmpty() // null || undefined || '' 인지 확인
    // @IsNotEmpty()

    // Array test
    // @IsIn(['action', 'fantasy']) // argument로 정의된 배열의 값 중 하나여야 함
    // @IsNotIn(['action', 'fantasy'])

    /* Type Validator */
    // @IsBoolean()
    // @IsString()
    // @IsInt()
    // @IsArray()
    // @IsEnum(MovieGenre)
    // @IsDate() // 실제 Date 객체 여부인지를 검증
    // @IsDateString() // ISO 8601 format(YYYY-MM-DDThh:mm:ss.000Z)의 string인지 검증

    /* Number Validator */
    // @IsDivisibleBy(5) // 5로 나눌 수 있는 값인가
    // @IsPositive() // 양수인가
    // @IsNegative() // 음수인가
    // @Min(100) // 최솟값 검사
    // @Max(100) // 최대값 검사

    /* String Validator */
    // @Contains('code factory') // 특정 문자를 포함하는지
    // @NotContains('code factory') // 특정 문자를 포함하지 않는 경우
    // @IsAlphanumeric() // 알파벳과 숫자로 이루어져 있는지
    // @IsCreditCard() // 신용카드 번호인가...?
    // @IsHexColor() // 16진수로 표현된 6자리의 색깔 문자열인가
    // @MaxLength(16) // 문자열의 최대길이
    // @MinLength(4) // 문자열의 최소길이
    // @IsUUID() // UUID인가
    // @IsLatLong() // 위도 경도인가

    /* Custom Validator */
    // @Validate(PasswordValidator, {
    //     message: '다른 에러 메시지',
    // })
    @IsPasswordValid()
    test: string;
}
