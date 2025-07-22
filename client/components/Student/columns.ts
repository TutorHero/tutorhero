import type { ColumnDef } from '@tanstack/vue-table'
import { MapPin } from 'lucide-vue-next';
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import DropdownMenuActions from './DropdownActions.vue';

export interface Student {
  id: string
  name: string
  type: string
  gender: string
  dob: string
  email: string
  year: string
  phoneNumber?: string | null;
  parentPhoneNumber?: string | null;
  address?: string | null;
  school: string
}

export const columns: ColumnDef<Student>[] = [
  {
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'modelValue': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:modelValue': value => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
    }),
    cell: ({ row }) => h(Checkbox, {
      'modelValue': row.getIsSelected(),
      'onUpdate:modelValue': value => row.toggleSelected(!!value),
      'ariaLabel': 'Select row',
    }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Student Name',
    cell: ({ row }) => row.getValue('name')
  },
  {
    accessorKey: 'type',
    header: 'Lesson type',
    cell: ({row}) => row.getValue('type')
  },
  {
    accessorKey: 'school',
    header: 'School',
    cell: ({ row }) => row.getValue('school')
  },
  {
    accessorKey: 'year',
    header: 'Year of study',
    cell: ({ row }) => row.getValue('year')
  },
  {
    header: 'Contact Number',
    cell: ({ row }) => {
      const studentPhoneNumber = row.original.phoneNumber as string
      const parentPhoneNumber = row.original.parentPhoneNumber as string
      return h('div', [
        h('div', [
          h('p', { class: 'text-neutral-600' }, "Parent's contact:"),
          h('a', { href: `https://wa.me/${parentPhoneNumber}`, class:'text-blue-500' }, parentPhoneNumber)]), 
        h('div', { class: 'mt-2' }, [
          h('p', { class: 'text-neutral-600' }, "Student's contact:"), 
          h('a', { href: `https://wa.me/${studentPhoneNumber}`, class:'text-blue-500' }, studentPhoneNumber)])
      ])
    }
  },
  {
    accessorKey: 'address',
    header: 'Location of lesson',
    cell: ({ row }) => {
      if (row.getValue('address')) {
        return h('div', { class: 'flex items-center text-blue-500' }, [h(MapPin, { class: 'w-4 h-4 mr-1' }), h('a', { href: `https://www.google.com/maps/search/?api=1&query=${row.getValue('address')}` } , row.getValue('address'))]) 
      } else {
        return h('div', { class: 'text-neutral-400' }, "No address specified")
      }
    }    
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const student = row.original

      return h(DropdownMenuActions, {
        student
      })
    },
  },
]