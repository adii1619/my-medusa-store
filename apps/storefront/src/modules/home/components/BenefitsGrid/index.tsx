import { BiSolidBatteryCharging, BiDumbbell } from 'react-icons/bi';
import { BsShieldLockFill, BsHeartPulse, BsEmojiSmile } from 'react-icons/bs';
const BenefitsGrid = () => {
    return (
        <section className="flex flex-col py-20 w-full gap-8 bg-[#6B222A]">
            <div className="flex flex-col gap-4 items-center">
                <h1 className="text-6xl text-[#FDCA62] font-light font-serif">Nourishment For Every Phase</h1>
                <div className=" h-[2px] bg-[#7B5800] w-28 "></div>
            </div>

            <div className="grid grid-cols-5 gap-6 w-full max-w-7xl mx-auto text-center">
                <div className="bg-[#621B24] p-8 flex flex-col items-center gap-2">
                    <BiSolidBatteryCharging className="text-[#7B5800]" size={28} />
                    <h3 className="text-[#FFF8F5] text-2xl">ENERGY</h3>
                    <p className="text-[#EE898F]">Natural complex carbs for natural sustained vitality</p>
                </div>
                <div className="bg-[#621B24] p-8 flex flex-col items-center gap-2">
                    <BiDumbbell className="text-[#7B5800]" size={28} />
                    <h3 className="text-[#FFF8F5] text-2xl">BONES</h3>
                    <p className="text-[#EE898F]">Rich in calcium from fox nuts and gum resin.</p>
                </div>
                <div className="bg-[#621B24] p-8 flex flex-col items-center gap-2">
                    <BsShieldLockFill className="text-[#7B5800]" size={28} />
                    <h3 className="text-[#FFF8F5] text-2xl">IMMUNITY</h3>
                    <p className="text-[#EE898F]">Antioxidant-rich dry fruits for recovery.</p>
                </div>
                <div className="bg-[#621B24] p-8 flex flex-col items-center gap-2">
                    <BsHeartPulse className="text-[#7B5800]" size={28} />
                    <h3 className="text-[#FFF8F5] text-2xl">DIGESTION</h3>
                    <p className="text-[#EE898F]">Fibre-dense ingredients for gut health.</p>
                </div>
                <div className="bg-[#621B24] p-8 flex flex-col items-center gap-2">
                    <BsEmojiSmile className="text-[#7B5800] " size={28} />
                    <h3 className="text-[#FFF8F5] text-2xl">RECOVERY</h3>
                    <p className="text-[#EE898F]">Traditional wisdom for new mothers.</p>
                </div>
            </div>

        </section>
    )
}

export default BenefitsGrid