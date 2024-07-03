import * as Yup from 'yup'
import Product from '../models/Product'

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      quantity: Yup.number().required(),
      expiration_date: Yup.date(),
      category: Yup.string()
    })

    try {
      schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name, price, quantity, expiration_date, category } = request.body

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
      category
    })

    return response.status(201).json(product)
  }
}

export default new ProductController()
