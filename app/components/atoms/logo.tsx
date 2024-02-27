import Image from "next/image"
export default function LogoIcon() {
   return(
    <div>
      <Image src="/logo.png" alt="Logo Image" width={100} height={100}/>
    </div>
   )

}