import { MedusaContainer } from "@medusajs/framework"
import {
  ContainerRegistrationKeys,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createInventoryLevelsWorkflow,
} from "@medusajs/medusa/core-flows"

export default async function seedProducts({
  container,
}: {
  container: MedusaContainer
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  logger.info("Starting product seed...")

 // Step 1 - Create category (only if it doesn't exist)
logger.info("Creating product categories...")

const { data: existingCategories } = await query.graph({
  entity: "product_category",
  fields: ["id", "name"],
  filters: {
    handle: "traditional-foods",
  },
})

let traditionalFoodsCategory

if (existingCategories.length > 0) {
  traditionalFoodsCategory = existingCategories[0]
  logger.info("Category already exists: " + traditionalFoodsCategory.id)
} else {
  const { result: categoryResult } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: [
        {
          name: "Traditional Foods",
          is_active: true,
        },
      ],
    },
  })
  traditionalFoodsCategory = categoryResult[0]
  logger.info("Category created: " + traditionalFoodsCategory.id)
}
  // Step 2 - Get shipping profile
  const { data: shippingProfileResult } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  })
  const shippingProfile = shippingProfileResult[0]

  // Step 3 - Get sales channel
  const { data: salesChannelResult } = await query.graph({
    entity: "sales_channel",
    fields: ["id", "name"],
    filters: {
      name: "Nutribites Online Store",
    },
  })
  const salesChannel = salesChannelResult[0]
  logger.info("Found sales channel: " + salesChannel.id)

  // Step 4 - Create Panjeeri product (only if it doesn't exist)
logger.info("Checking if Panjeeri exists...")

const { data: existingProducts } = await query.graph({
  entity: "product",
  fields: ["id", "title"],
  filters: {
    handle: "panjeeri",
  },
})

let panjeeri

if (existingProducts.length > 0) {
  panjeeri = existingProducts[0]
  logger.info("Product already exists: " + panjeeri.id)
} else {
  logger.info("Creating Panjeeri product...")
  const { result: productResult } = await createProductsWorkflow(
    container
  ).run({
    input: {
      products: [
        {
          title: "Panjeeri",
          category_ids: [traditionalFoodsCategory.id],
          description:
            "Homemade Panjeeri made with premium Pakistani dry fruits. Rich in nutrients, perfect for energy boost, bone strength, immunity support, better digestion, and postpartum recovery.",
          handle: "panjeeri",
          weight: 250,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          options: [
            {
              title: "Weight",
              values: ["250g", "500g"],
            },
          ],
          variants: [
            {
              title: "250g",
              sku: "NB-PANJEERI-250G",
              options: {
                Weight: "250g",
              },
              prices: [
                {
                  amount: 85000,
                  currency_code: "pkr",
                },
              ],
            },
            {
              title: "500g",
              sku: "NB-PANJEERI-500G",
              options: {
                Weight: "500g",
              },
              prices: [
                {
                  amount: 160000,
                  currency_code: "pkr",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: salesChannel.id,
            },
          ],
          metadata: {
            ingredients:
              "Raisins, Almonds, Pistachios, Cashews, Walnuts, Kernel nuts, Fox nuts, Pumpkin seeds, Sunflower seeds, Mixed melon seeds, Rock sugar",
            benefits:
              "Energy boost, Bone strength, Immunity support, Better digestion, Postpartum recovery",
            serving_size: "15g",
            calories_per_serving: "76",
          },
        },
      ],
    },
  })
  panjeeri = productResult[0]
  logger.info("Panjeeri created: " + panjeeri.id)
}

// Step 5 - Set inventory levels (only if not already set)
logger.info("Setting inventory levels...")

const { data: stockLocations } = await query.graph({
  entity: "stock_location",
  fields: ["id", "name"],
})
const stockLocation = stockLocations[0]

const { data: inventoryItems } = await query.graph({
  entity: "inventory_item",
  fields: ["id"],
})

for (const item of inventoryItems) {
  const { data: existingLevels } = await query.graph({
    entity: "inventory_level",
    fields: ["id"],
    filters: {
      inventory_item_id: item.id,
      location_id: stockLocation.id,
    },
  })

  if (existingLevels.length > 0) {
    logger.info("Inventory level already exists for: " + item.id)
  } else {
    await createInventoryLevelsWorkflow(container).run({
      input: {
        inventory_levels: [
          {
            location_id: stockLocation.id,
            stocked_quantity: 100,
            inventory_item_id: item.id,
          },
        ],
      },
    })
    logger.info("Inventory level created for: " + item.id)
  }
}

logger.info("Inventory setup complete.")
logger.info("Product seed complete!")}