import type { ForwardRefExoticComponent, RefAttributes } from "react"

import type { LucideProps } from "lucide-react"

export type IconType = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>
