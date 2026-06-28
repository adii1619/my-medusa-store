import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text } from "@medusajs/ui"
import { FaEnvelope, FaGlobe, FaInstagram, FaFacebook} from "react-icons/fa"
export default  function Footer() {


  return (
    <footer className="border-t border-[#E37D04] w-full">
      <div className=" gap-16 flex flex-col items-center w-full py-8 bg-[#450A0A]">

        <div className="flex flex-col gap-4 items-center ">
        <LocalizedClientLink
          href="/"
          className="text-3xl text-[#FFF1F2] font-bold uppercase"
        >
          NUTRIBITES PANJEERI
        </LocalizedClientLink>
        <div className="flex gap-4 flex-wrap justify-center text-[#FECDD3]">
          <LocalizedClientLink href="">Shipping & Return</LocalizedClientLink>
          <LocalizedClientLink href="">Privacy Policy</LocalizedClientLink>
          <LocalizedClientLink href="">Terms of Service</LocalizedClientLink>
          <LocalizedClientLink href="">Contact us</LocalizedClientLink>
          <LocalizedClientLink href="">WholeSale</LocalizedClientLink>
        </div>
        </div>
        <div className="flex  gap-2 text-white">
          <a href=""><FaInstagram size={20}/></a>
          <a href=""><FaFacebook size={20}/></a>
          <a href=""><FaEnvelope size={20}/></a>
          <a href=""><FaGlobe size={20}/></a>
        </div>

        <div className="w-full  flex flex-col  justify-center text-ui-fg-muted items-center">
          <div className="content-container h-px w-full  bg-slate-400 "></div>
          <Text className="txt-compact-small text-[#FECDD3]">
            © {new Date().getFullYear()} NUTRIBITES PANJEERI. A HANDCRAFTED LEGACY.
          </Text>
          {/* <MedusaCTA /> */}
        </div>
      </div>
    </footer>
  )
}
