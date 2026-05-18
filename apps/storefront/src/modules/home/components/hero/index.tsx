import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full flex flex-col justify-center items-center text-center px-8 gap-6 bg-[#6b222a]">
      <h1 className="text-6xl font-light text-[#d9a945]">
        Nutribites
      </h1>
      <h2 className="text-2xl font-light text-[#f5e0df]">
        Homemade Panjeeri — made with love
      </h2>
      <p className="text-sm text-[#c29293] max-w-md">
        Premium quality, packed with nutrients. Energy boost, bone strength,
        immunity support and postpartum recovery.
      </p>
      <LocalizedClientLink href="/store">
        <button className="bg-[#d9a945] text-[#6b222a] font-semibold px-8 py-3 rounded hover:opacity-90 transition-opacity">
          Shop Panjeeri
        </button>
      </LocalizedClientLink>
    </div>
  )
}

export default Hero