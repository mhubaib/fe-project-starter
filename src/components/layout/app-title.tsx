import { Link } from '@tanstack/react-router'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Box } from 'lucide-react'

export function AppTitle() {
  const { setOpenMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          asChild
          className="flex w-full items-center gap-2 justify-center hover:bg-transparent active:bg-transparent group-data-[collapsible=icon]:p-0!"
        >
          <Link
            to="/dashboard"
            onClick={() => setOpenMobile(false)}
            className="flex w-full items-center gap-2"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
              <Box className="size-5!" />
            </div>
            <span className="truncate text-xl font-bold group-data-[collapsible=icon]:hidden">
              FE PROJECT
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
