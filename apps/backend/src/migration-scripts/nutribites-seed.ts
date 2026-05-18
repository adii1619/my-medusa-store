import {MedusaContainer} from '@medusajs/framework'
import {
    ContainerRegistrationKeys,
    Modules,
    ProductStatus,
} from '@medusajs/framework/utils'
import {
    createRegionsWorkflow,
    createSalesChannelsWorkflow,
    createShippingOptionsWorkflow,
    createShippingProfilesWorkflow,
    createStockLocationsWorkflow,
    createTaxRegionsWorkflow,
    createProductCategoriesWorkflow,
    createProductsWorkflow,
    createInventoryLevelsWorkflow,
    createApiKeysWorkflow,
    linkSalesChannelsToApiKeyWorkflow,
    linkSalesChannelsToStockLocationWorkflow,
} from '@medusajs/medusa/core-flows'

export default async function nutribites_seed({
    container,

}:{
    container:MedusaContainer
}){
    const logger=container.resolve(ContainerRegistrationKeys.LOGGER)
    const link=container.resolve(ContainerRegistrationKeys.LINK)
    const query = container.resolve(ContainerRegistrationKeys.QUERY)
    const fulfillmentModulesService = container.resolve(
        Modules.FULFILLMENT
    )
    logger.info("Starting Nutribites seed...")
// #Step 1 Sales Channel
    logger.info('creating sales channnel...')
    const {
        result:[nutribitesSalesChannel],
    }= await createSalesChannelsWorkflow(container).run({
        input:{
            salesChannelsData:[
                {
                    name:"Nutribites Online Store",
                    description:"Main sales channel for Nutribites website",
                },
            ],
        },
    })
    logger.info("sales channel created:" + nutribitesSalesChannel.id)

    // Step 2 PKR Currency+ pakistan region
    logger.info("Creating Pakistan Region")

    const{result:regionResult}= await createRegionsWorkflow(container).run({
        input:{
            regions:[
                {
                    name:'Pakistan',
                    currency_code:'pkr',
                    countries:["pk"],
                    payment_providers:["pp_system_default"],
                },
            ],
        },
    })
    const pakistanRegion=regionResult[0]
    logger.info("Pakistan region created:" + pakistanRegion.id)
// Step 3 Tax Region
    logger.info('Creting Tax region...')
    await createTaxRegionsWorkflow(container).run({
        input:[
            {
                country_code:'pk',
                provider_id:'tp_system',
            },
        ],
    })
    logger.info('Tax Region ceated.')
// Step 4
    logger.info('Creating Stock Location...')
    const{result:stockLocationResult}=await createStockLocationsWorkflow(
        container
    ).run({
        input:{
            locations:[
                {
                    name:'Nutribites kitchen - Islamabad',
                    address:{
                        city:'Islamabad',
                        country_code:'pk',
                        address_1:"Home kitchen",
                    },
                },
            ],
        },
    })
    const stockLocation=stockLocationResult[0]
    logger.info('Stock location crated:' + stockLocation.id)
    //link stock location to fulfillment provider
    await link.create({
        [Modules.STOCK_LOCATION]:{
            stock_location_id:stockLocation.id,
        },
        [Modules.FULFILLMENT]:{
            fulfillment_provider_id:'manual_manual',
        },
    })
    logger.info('stock location linked to fulfillment provider.')
//step 5 Fulfillment sets + shipping zone
    logger.info('creating fulfillment sets...')

    const fulfillmentSet=await fulfillmentModulesService.createFulfillmentSets({
        name:'Nutribites Delivery',
        type:"shipping",
        service_zones:[
            {
                name: 'Pakistan',
                geo_zones:[
                    {
                        country_code:'pk',
                        type:'country',
                    },
                ],
            },
        ],
    })
    logger.info('Fulfillment set created: ' + fulfillmentSet.id)

    //Link fulfillment set to stock location
    await link.create({
        [Modules.STOCK_LOCATION]:{
            stock_location_id:stockLocation.id,
        },
        [Modules.FULFILLMENT]:{
            fulfillment_set_id:fulfillmentSet.id,
        },
    })
    logger.info('Fulfillment set linked to stock location')
// step 6 Shipping options
    logger.info('creating shipping options')
    //  fetch the default shipping profiles
    const{data:shippingProfileResult}= await query.graph({
        entity:'shipping_profile',
        fields:['id'],
    })
    const shippingProfile= shippingProfileResult[0]

    await createShippingOptionsWorkflow(container).run({
        input:[
            {
                name:'Standard Delivery',
                price_type:'flat',
                provider_id:'manual_manual',
                service_zone_id:fulfillmentSet.service_zones[0].id,
                shipping_profile_id:shippingProfile.id,
                type:{
                    label:'Standard',
                    description:'Delivered in 3-5 business days.',
                    code:'standard',
                },
                prices:[
                    {
                        currency_code:'pkr',
                        amount:200,
                    },
                    {
                        region_id:pakistanRegion.id,
                        amount:200,
                    },
                ],
                rules:[
                    {
                        attribute:'enabled_in_store',
                        value:'true',
                        operator:'eq',
                    },
                    {
                        attribute:'is_return',
                        value:'false',
                        operator:'eq',
                    },
                ],
            },
            {
                name:'Express Delivery',
                price_type:'flat',
                provider_id:'manual_manual',
                service_zone_id:fulfillmentSet.service_zones[0].id,
                shipping_profile_id:shippingProfile.id,
                type:{
                    label:'Express',
                    description:'Delivered in 1-2 business days.',
                    code:'express',
                },
                prices:[
                    {
                        currency_code:'pkr',
                        amount:400,
                    },
                    {
                        region_id:pakistanRegion.id,
                        amount:400,
                    },
                ],
                rules:[
                    {
                        attribute:'enabled_in_store',
                        value:'true',
                        operator:'eq',
                    },
                    {
                        attribute:'is_return',
                        value:'false',
                        operator:'eq',
                    },
                ],
            },
        ],
    })
    logger.info('shipping options created.')

    logger.info("Nutribites seed complete!")
}
