import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import ProductShowcase from "@modules/home/components/product-showcase"
import BenefitsGrid from "@modules/home/components/BenefitsGrid"
import NutritionFacts from "@modules/home/components/NutritionFacts"
import PhotoStrip from "@modules/home/components/Gallery"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <ProductShowcase/>
      <BenefitsGrid/>
      <NutritionFacts/>
      <PhotoStrip/>
    </>
  )
}
