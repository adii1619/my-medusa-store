import {SubscriberArgs, SubscriberConfig} from '@medusajs/framework'
import {ContainerRegistrationKeys} from '@medusajs/framework/utils'
import {Resend} from 'resend'

export default async function orderPlacedHandler({
    event:{data},
    container,
}:SubscriberArgs<{id: string}>){
    const logger=container.resolve(ContainerRegistrationKeys.LOGGER)
    const query=container.resolve(ContainerRegistrationKeys.QUERY)

    logger.info('Order placed event received:' + data.id)

    //fetch full order details
    const {data: orders} = await query.graph({
        entity:'order',
        fields:[
            "id",
            "display_id",
            "status",
            "total",
            "currency_code",
            "shipping_address.*",
            "items.*",
            "customer.*",
        ],
        filters:{id:data.id},
    })

    const order=orders[0]
    if(!order){
        logger.error("Order not found:" + data.id)
        return
    }

    const resend= new Resend(process.env.RESEND_API_KEY)

    //Format order items for email
    const itemsList = order.items
    .map((item:any)=>`${item.title} x${item.quantity} - PKR ${item.unit_price/100}`)
    .join("\n")

    const totalPKR = order.total/100

    //email 1 customer confirmation

    await resend.emails.send({
        from:"Nutribites <onboarding@resend.dev>",
        to:order.customer?.email || "customer@example.com",
        subject:`Order confirmed #${order.display_id} - Nutribites`,
        text:`
        Assalam o Alaikum!
        Thank you for your order from Nutribites.
        Order #${order.display_id}
        Items:
        ${itemsList}
        Total: PKR ${totalPKR}
        we will contact you shortly to confirm delivery.
        
        Delivery Address:
        ${order.shipping_address?.address_1 }
        ${order.shipping_address?.city }
        
        homemade with love,
        Nutribites Team
         @nutribites.islamabad

        `,

    })
    logger.info("Customer confirmation email sent.")


    //email 2 store owner alert
    await resend.emails.send({
        from:"Nutribites Orders<onboarding@resend.dev>",
        to:process.env.STORE_OWNER_EMAIL!,
        subject:`New Order #${order.display_id} - PKR${totalPKR}`,
        text:`
        New Order received!
        
        Order #${order.display_id}
        Total:PKR ${totalPKR}
        
        Customer: ${order.customer?.first_name} ${order.customer?.last_name}
        Email:${order.customer?.email}
        
        Items:
        ${itemsList}
        
        Delivery Address:
        ${order.shipping_address?.address_1}
        ${order.shipping_address?.city}
        ${order.shipping_address?.phone}
        `,
    })
    logger.info("Store owner notification email sent.")
}

export const config: SubscriberConfig={
    event:"order.placed",
    context:{
        subscriberId:"nutribites-order-placed",
    },
}