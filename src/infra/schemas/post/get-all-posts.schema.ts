import { z } from 'zod'

export class GetAllPostsSchema {
  static validateId(id: string): SchemaValidationDTO {
    const schemaId = z.string().min(1, { message: 'MIN_LENGTH_ID' }).regex(/^\d+$/, { message: 'ONLY_NUMBERS_ID' })

    return {
      safe: schemaId.safeParse(id).success,
      message: schemaId.safeParse(id).error?.errors[0]?.message ?? '',
    }
  }
  static validateTitle(title: string): SchemaValidationDTO {
    const schemaTitle = z.string().min(10, { message: 'MIN_LENGTH_TITLE' })

    return {
      safe: schemaTitle.safeParse(title).success,
      message: schemaTitle.safeParse(title).error?.errors[0]?.message ?? '',
    }
  }
  static validateContent(content: string): SchemaValidationDTO {
    const schemaContent = z.string().min(10, { message: 'MIN_LENGTH_CONTENT' })

    return {
      safe: schemaContent.safeParse(content).success,
      message: schemaContent.safeParse(content).error?.errors[0]?.message ?? '',
    }
  }
}
