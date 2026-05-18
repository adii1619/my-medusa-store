import {MedusaContainer} from '@medusajs/framework'
import {ContainerRegistrationKeys,Modules} from '@medusajs/framework/utils'

export default async function fixStoreCurrencies({
    container,
}:{
    container:MedusaContainer
}
){
    const logger= container.resolve(ContainerRegistrationKeys.LOGGER)
    const storeModule = container.resolve(Modules.STORE)

    logger.info("Fixing store currencies...")

    //getting existing store
    const [store]=await storeModule.listStores()
    logger.info("Found store:" + store.id)

    //updating store with pkr as supported currency
    await storeModule.updateStores(store.id,{
        supported_currencies:[
            {currency_code:'pkr', is_default:true},
            {currency_code:'eur', is_default:false},
            {currency_code:'usd', is_default:false},

        ],
    })
    logger.info("Store currencies updated successfully")
}