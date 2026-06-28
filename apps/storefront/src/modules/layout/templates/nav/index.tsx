import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import {User} from "@medusajs/icons"
import {ShoppingBag} from "@medusajs/icons"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="px-4 bg-red-900 txt-small-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center gap-x-6 text-white">
            <LocalizedClientLink href="/store" className=" uppercase ">
              Shop
            </LocalizedClientLink>
            <LocalizedClientLink href="#our-story" className=" uppercase">
              Our Story
            </LocalizedClientLink>
          </div>
          <div className="flex items-center h-full">
            <LocalizedClientLink href="/"
            className="txt-compact-xlarge-plus text-amber-400 hover:text-amber-600 italic" 
            data-testid="nav-store-link"
            >
              Nutribites Panjeeri
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end text-white">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink href="#ingredients" className=" uppercase">
                Ingredients
              </LocalizedClientLink>
              <LocalizedClientLink href="#health-benefits" className=" uppercase">
                Health Benefits
              </LocalizedClientLink>
            </div>

            <Suspense
              fallback={
                <LocalizedClientLink href="/cart" className="hover:text-ui-fg-base flex gap-2">
                  <ShoppingBag/>
                </LocalizedClientLink>
              }
            >
              <CartButton />

            </Suspense>
            <LocalizedClientLink href="/account" className="hover:text-ui-fg-base">
              <User/>
            </LocalizedClientLink>
          </div>
        </nav>
      </header>
    </div>
  )
}
