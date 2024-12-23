import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

// Regex para verificar se o valor contém um emoji Unicode.
const emojiRegex =
  /(?:[\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83D[\uDE00-\uDE4F])/;

export function IsEmoji(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isEmoji',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && emojiRegex.test(value); // Verifica se o valor é uma string e contém um emoji.
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} deve ser um emoji válido.`;
        },
      },
    });
  };
}
