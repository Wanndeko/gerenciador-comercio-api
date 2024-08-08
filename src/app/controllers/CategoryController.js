import * as Yup from 'yup'

import Category from '../models/Category'

class CategoryController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required()
    })

    try {
      schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name } = request.body

    const categoryExistis = await Category.findOne({
      where: {
        name
      }
    })

    if (categoryExistis) {
      return response.status(400).json({ error: 'category already exists' })
    }

    const { id } = await Category.create({
      name
    })

    return response.status(201).json({ id, name })
  }

  async index(request, response) {
    const allCategories = await Category.findAll()

    return response.status(200).json(allCategories)
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string().required()
    })

    try {
      schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name } = request.body

    const { id } = request.params

    const categoryExists = await Category.findByPk(id)

    try {
    } catch (error) {}

    if (!categoryExists) {
      return response.status(400).json({ error: 'category not exists' })
    }

    await Category.update(
      {
        name
      },
      { where: { id } }
    )

    return response.status(201).json({ message: 'category altered' })
  }
}

export default new CategoryController()
