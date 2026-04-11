import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import { Button } from '../ui/button'
import { AppTitle } from './app-title'
import { NavGroup } from './nav-group'
import { sidebarData } from './data/sidebar-data'

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar()

  return (
    <Sidebar>
      <SidebarHeader>
        <div
          className={cn(
            'flex items-center transition-all duration-200',
            'group-data-[collapsible=icon]:pt-2',
          )}
        >
          <AppTitle />
        </div>
      </SidebarHeader>
      <SidebarContent className=''>
        {sidebarData.navGroups.map((group) => (
          <NavGroup key={group.title} {...group} />
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t">
        <Button
          variant="ghost"
          onClick={toggleSidebar}
          className="w-full justify-center"
        >
          {state === 'collapsed' ? (
            <ArrowRight className="h-4 w-4" />
          ) : (
            <ArrowLeft className="h-4 w-4" />
          )}
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
