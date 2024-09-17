'use client'

import * as React from 'react'
import { Check, ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

export type Role = {
    value: string,
    description: string | null,
}

export function RoleSelect({ roles, currentValue }: { roles: Role[], currentValue: string } ) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(currentValue)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='w-[200px] justify-between'
                >
                    <span className={'capitalize'}>{roles.find((role) => role.value === value)?.value}</span>
                    <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50'/>
                </Button>
            </PopoverTrigger>
            <PopoverContent align={'end'} className='p-0'>
                <Command>
                    <CommandInput placeholder='Search framework...'/>
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {roles.map((role) => (
                                <CommandItem
                                    key={role.value}
                                    value={role.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? '' : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value === role.value ? 'opacity-100' : 'opacity-0',
                                        )}
                                    />
                                    <div className='flex gap-0 flex-col'>
                                        <span className={'capitalize'}>{role.value}</span>
                                        <span className={'text-muted-foreground'}>{role.description}</span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
