import type { GlobalType } from './global-type'

export interface Organization extends GlobalType {
  name: string
  slug: string
  planId: string
}
