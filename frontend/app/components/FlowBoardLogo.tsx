import Image from "next/image"

const LOGO_SIZE = 80

export default function FlowBoardLogo() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/FlowBoard2.png"
        alt="FlowBoard logo"
        width={LOGO_SIZE}
        height={LOGO_SIZE}
        className="h-10 w-10 md:h-12 md:w-12"
      />
      <span className="text-xl font-bold text-zinc-100 md:text-2xl">FlowBoard</span>
    </div>
  )
}