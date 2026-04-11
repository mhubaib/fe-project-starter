import type { GlobalType } from './global-type'
import type { Organization } from './organization'

export interface User extends GlobalType {
  name: string
  nickname: string
  email: string
  phone: string
  role: string
  avatarUrl: string | null
  isActive: boolean
  lastLoginAt: Date | null
  organization: Organization
}
