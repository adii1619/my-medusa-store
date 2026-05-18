import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { ContainerRegistrationKeys } from '@medusajs/framework/utils'

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

    //fetch panjeeri product with all its details
    const { data: products } = await query.graph({
        entity: 'product',
        fields: [
            "id",
            "title",
            "description",
            "handle",
            "status",
            'metadata',
            'variants.*',
            "variants.prices.*",
            "images.*",
            "categories.*",
        ],
        filters: {
            handle: "panjeeri",
        },
    })
    if (!products.length) {
        return res.status(404).json({
            message: "Panjeeri product not found",
        })
    }
    const panjeeri = products[0]

    //Format the response for store front
    return res.json({
        product: {
            id: panjeeri.id,
            title: panjeeri.title,
            description: panjeeri.description,
            variants: panjeeri.variants.map((v) => ({
                id: v.id,
                title: v.title,
                sku: v.sku,
                prices: v.prices,

            })),
            nutrition:{
                serving_size:panjeeri.metadata?.serving_size,
                calories:panjeeri.metadata?.calories_per_serving,
            },
            ingredients:panjeeri.metadata?.ingredients,
            benefits:panjeeri.metadata?.benefits,
        },
    })
}