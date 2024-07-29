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
      category_id: Yup.string()
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
}

export default new ProductController()
