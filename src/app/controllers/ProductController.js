import * as Yup from 'yup'
import Product from '../models/Product'
import Category from '../models/Category'

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      quantity: Yup.number().required(),
      expiration_date: Yup.date(),
      category_id: Yup.number()
    })

    try {
      schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name, price, quantity, expiration_date, category_id } = request.body

    const productExistis = await Product.findOne({
      where: {
        name
      }
    })

    if (quantity < 1) {
      return response
        .status(400)
        .json({ error: 'Quantity must be greater than 0' })
    }

    if (productExistis) {
      return response.status(400).json({ error: 'product already exists' })
    }

    const product = await Product.create({
      name,
      price,
      quantity,
      expiration_date,
      category_id
    })

    return response.status(201).json(product)
  }

  async index(request, response) {
    const allProduct = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }
      ]
    })

    return response.status(200).json(allProduct)
  }

  async delete(request, response) {
    const { id } = request.body

    const findThisProduct = await Product.findOne({
      where: {
        id
      }
    })

    if (!findThisProduct) {
      return response
        .status(400)
        .json({ message: 'This product does not exist' })
    }

    await Product.destroy({
      where: {
        id
      }
    })

    return response.status(200).json({ message: 'product deleted' })
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      quantity: Yup.number(),
      expiration_date: Yup.date(),
      category_id: Yup.number()
    })

    const { id } = request.params

    const findProduct = await Product.findByPk(id)

    if (!findProduct) {
      return response.status(401).json({ message: 'product not exists' })
    }

    try {
      schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name, price, quantity, expiration_date, category_id } = request.body

    await Product.update(
      {
        name,
        price,
        quantity,
        expiration_date,
        category_id
      },
      {
        where: { id }
      }
    )

    return response.status(200).json({ message: 'product updated' })
  }
}

export default new ProductController()
