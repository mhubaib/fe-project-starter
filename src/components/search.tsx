import { Search as SearchIcon } from 'lucide-react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

export function Search() {
  return (
    <InputGroup className="max-w-xs has-[[data-slot=input-group-control]:focus-visible]:ring-teal-200 has-[[data-slot=input-group-control]:focus-visible]:border-teal-200">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  )
}
