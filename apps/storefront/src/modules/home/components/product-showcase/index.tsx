const ProductShowcase = () => {
    return (
        <section className="w-full py-24 bg-[#F7EFEC]">
            <div className="max-w-6xl mx-auto bg-[#F9F5F2] grid grid-cols-[40%_60%] shadow-xl">
                <div className="bg-[#EFEFEF]">
                    <img src="/images/Nutribites-250g-Jar.png" />
                </div>

                <div className="p-12 bg-[#FFF8F5]">
                    <div className="flex flex-col itmes-center gap-6">
                        <div className="flex flex-col gap-2">
                            <h3>OUR SIGNATURE BLEND</h3>
                            <h1 className="text-6xl font-cormorant font-light font-serif">Original Nutribites</h1>
                        </div>
                        <div className="text-2xl italic text-[#7B5800]">
                            $24.99
                        </div>
                        <div>
                            <p>Hand-roasted for over 6 hours, our signature Panjeeri is
                                packed with over 15 superfoods including fox nuts, gum
                                arabic, and premium Iranian pistachios.</p>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <button className="bg-[#4E0B16] text-[#FFF8F5] w-full h-12">
                                ADD TO CART
                            </button>
                            <button className="bg-[#FFF8F5] text-[#7B5800] border-2 border-[#E5D8C4] w-full h-12">
                                    ORDER ON WHATSAPP
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
export default ProductShowcase