import type { SidebarData } from '#/types/layout'
import { LayoutDashboard } from 'lucide-react'

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: LayoutDashboard,
        },
      ],
    },
  ],
}
