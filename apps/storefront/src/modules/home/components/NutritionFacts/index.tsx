const NutritionFacts = () => {
    return (
        <section className="w-full py-28 bg-[#FFF1E8]">
            <div className="grid grid-cols-2 max-w-6xl mx-auto">
                <div className=" mx-12 ">
                    <div className="flex flex-col mx-4 p-4 border-8 gap-3 bg-white  border-[#4F0C17] ">
                        <h2 className="text-3xl">NUTRITION FACTS</h2>
                        <div className="content-container h-[4px] bg-[#4F0C17] w-full"></div>
                        <p>Servings Per Container: Approx. 10</p>
                        <div className="content-container h-[2px] bg-[#4F0C17] w-full"></div>
                        <div className="flex justify-between text-2xl">
                            <p>Amount Per Saving </p>
                            <span>140kcal</span>
                        </div>

                        <div className="content-container h-[2px] bg-[#4F0C17] w-full"></div>
                        <div className="flex flex-col gap-3" >
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between"> <p>TOTAL FAT 12G </p> <span>15%</span></div>
                                <div className="h-[1px] w-full bg-gray-500"></div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between"> <p>SATURATED FAT 4G </p><span>20%</span></div>
                                <div className="h-[1px] w-full bg-gray-500"></div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between"> <p>PROTEIN 6G </p><span>12%</span></div>
                                <div className="h-[1px] w-full bg-gray-500"></div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between"> <p>DIETARY FIBER 3G </p><span>11%</span></div>
                                <div className="h-[1px] w-full bg-gray-500"></div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between"> <p>IRON 2MG </p><span>11%</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-6 gap-6 mx-4">
                    <p className="font-serif font-light text-xl ">Pure Ingredients, No Fillers.</p>
                    <div className="flex flex-wrap gap-4">
                        <span className="p-2 px-8 text-xl text-[#FFF1E8] inline-flex items-center justify-center bg-[#6B222A] rounded-xl">Raisins</span>
                        <span className="p-2 px-8 text-xl text-[#FFF1E8] inline-flex items-center justify-center bg-[#6B222A] rounded-xl">Almonds</span>
                        <span className="p-2 px-8 text-xl text-[#FFF1E8] inline-flex items-center justify-center bg-[#6B222A] rounded-xl">Pistachios</span>
                        <span className="p-2 px-8 text-xl text-[#FFF1E8] inline-flex items-center justify-center bg-[#6B222A] rounded-xl">Fox Nuts</span>
                        <span className="p-2 px-8 text-xl text-[#FFF1E8] inline-flex items-center justify-center bg-[#6B222A] rounded-xl">Gum Arabic</span>
                        <span className="p-2 px-8 text-xl text-[#FFF1E8] inline-flex items-center justify-center bg-[#6B222A] rounded-xl">Desi Ghee</span>
                        <span className="p-2 px-8 text-xl text-[#FFF1E8] inline-flex items-center justify-center bg-[#6B222A] rounded-xl">Melon Seeds</span>
                        <span className="p-2 px-8 text-xl text-[#FFF1E8] inline-flex items-center justify-center bg-[#6B222A] rounded-xl">Cardamom</span>
                        <span className="p-2 px-8 text-xl text-[#FFF1E8] inline-flex items-center justify-center bg-[#6B222A] rounded-xl">Organic Sugar</span>
                    </div>
                    <p className="italic">"We believe transparency is the highest form of respect. Every
                        ingredient in our Panjeeri is sourced ethically and tested for purity."</p>
                </div>
            </div>
        </section>
    )
}
export default NutritionFacts