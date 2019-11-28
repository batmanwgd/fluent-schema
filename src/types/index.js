'use strict'
// This file will be passed to the TypeScript CLI to verify our typings compile
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const FluentSchema_1 = __importDefault(require('../FluentSchema'))
console.log('isFluentSchema:', FluentSchema_1.default.object().isFluentSchema)
const schema = FluentSchema_1.default
  .object()
  .id('http://foo.com/user')
  .title('A User')
  .description('A User desc')
  .definition(
    'address',
    FluentSchema_1.default
      .object()
      .id('#address')
      .prop('line1')
      .prop(
        'line2',
        FluentSchema_1.default.anyOf([
          FluentSchema_1.default.string(),
          FluentSchema_1.default.null(),
        ])
      )
      .prop('country')
      .allOf([FluentSchema_1.default.string()])
      .prop('city')
      .prop('zipcode')
  )
  .prop('username', FluentSchema_1.default.string().pattern(/[a-z]*/g))
  .prop('email', FluentSchema_1.default.string().format('email'))
  .prop(
    'avatar',
    FluentSchema_1.default
      .string()
      .contentEncoding('base64')
      .contentMediaType('image/png')
  )
  .required()
  .prop(
    'password',
    FluentSchema_1.default
      .string()
      .default('123456')
      .minLength(6)
      .maxLength(12)
      .pattern('.*')
  )
  .required()
  .prop(
    'addresses',
    FluentSchema_1.default
      .array()
      .items([FluentSchema_1.default.ref('#address')])
  )
  .required()
  .prop(
    'role',
    FluentSchema_1.default
      .object()
      .id('http://foo.com/role')
      .prop('name')
      .enum(['ADMIN', 'USER'])
      .prop('permissions')
  )
  .required()
  .prop('age', FluentSchema_1.default.mixed(['string', 'integer']))
  .ifThen(
    FluentSchema_1.default
      .object()
      .prop('age', FluentSchema_1.default.string()),
    FluentSchema_1.default.required(['age'])
  )
  .readOnly()
  .writeOnly(true)
  .valueOf()
console.log('example:\n', JSON.stringify(schema))
console.log('isFluentSchema:', FluentSchema_1.default.object().isFluentSchema)
const userBaseSchema = FluentSchema_1.default
  .object()
  .additionalProperties(false)
  .prop('username', FluentSchema_1.default.string())
  .prop('password', FluentSchema_1.default.string())
const userSchema = FluentSchema_1.default
  .object()
  .prop('id', FluentSchema_1.default.string().format('uuid'))
  .prop('createdAt', FluentSchema_1.default.string().format('time'))
  .prop('updatedAt', FluentSchema_1.default.string().format('time'))
  .extend(userBaseSchema)
  .valueOf()
console.log('user:\n', JSON.stringify(userSchema))
