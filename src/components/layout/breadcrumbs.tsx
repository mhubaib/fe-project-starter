import { Fragment, useMemo } from 'react'
import { Link, useMatches } from '@tanstack/react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { sidebarData } from './data/sidebar-data'
import { type NavItem } from '@/types/layout'

export function Breadcrumbs() {
  const matches = useMatches()
  const data = sidebarData

  // Flatten sidebar data to make lookups easier
  const navItemsByUrl = useMemo(() => {
    const map = new Map<string, NavItem>()

    const flatten = (items: NavItem[]) => {
      items.forEach((item) => {
        if (item.url) map.set(item.url, item)
        if (item.items) flatten(item.items)
      })
    }

    data.navGroups.forEach((group) => flatten(group.items))
    return map
  }, [data])

  const breadcrumbItems = useMemo(() => {
    // Filter out root and pathless layouts
    const filteredMatches = matches.filter(
      (match) =>
        match.id !== '__root' &&
        !match.id.includes('/_') && // Skip layout routes like _authenticated
        match.pathname !== '/' && // Skip base index
        !match.id.startsWith('('), // Skip group routes if any
    )

    const items = filteredMatches.map((match) => {
      const href = match.pathname
      const navItem = navItemsByUrl.get(href)

      // Get title from sidebar data, or route data, or fallback to segment name
      const title =
        navItem?.title ||
        (match.staticData as any)?.title ||
        match.id
          .split('/')
          .filter(Boolean)
          .pop()
          ?.replace(/-/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase()) ||
        ''

      return {
        title,
        href,
        isClickable: !!navItem || !!match.staticData,
      }
    })

    // Prepend Dashboard if not already there, unless we're on a non-authenticated page
    const hasDashboard = items.some(
      (item) => item.href === '/dashboard' || item.title === 'Dashboard',
    )

    // In our app, almost all authenticated pages should start with Dashboard
    if (!hasDashboard && matches.some((m) => m.id.includes('_authenticated'))) {
      return [
        { title: 'Dashboard', href: '/dashboard', isClickable: true },
        ...items,
      ]
    }

    return items
  }, [matches, navItemsByUrl])

  // If we only have "Dashboard" and we are on dashboard, maybe just show it
  // or if we have no items, don't show anything
  if (breadcrumbItems.length === 0) return null

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1

          return (
            <Fragment key={item.href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>
                    <span className="text-sm font-semibold text-foreground tracking-tight">
                      {item.title}
                    </span>
                  </BreadcrumbPage>
                ) : (
                  <Link
                    to={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors tracking-tight"
                  >
                    {item.title}
                  </Link>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator className="text-muted-foreground/40" />
              )}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
