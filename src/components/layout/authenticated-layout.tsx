import type { ReactNode } from 'react'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from './app-sidebar'
import { getCookie } from '#/lib/cookies'
import { Main } from './main'
import { Outlet } from '@tanstack/react-router'
import { cn } from '#/lib/utils'
import { Header } from './header'

interface AuthenticatedLayoutProps {
  children?: ReactNode
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const defaultOpen = getCookie('sidebar_state') !== 'false'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset
        className={cn(
          '@container/content',
          'has-data-[layout=fixed]:h-svh',
          'peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]',
        )}
      >
        <Header fixed />
        <Main className="flex flex-1 flex-col">{children ?? <Outlet />}</Main>
      </SidebarInset>
    </SidebarProvider>
  )
}
