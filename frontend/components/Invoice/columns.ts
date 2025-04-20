import type { ColumnDef } from '@tanstack/vue-table'
import { Badge } from '@/components/ui/badge'

export interface Invoice {
  id: string
  date: string
  student: string
  amount: number
  status: 'pending' | 'success' | 'failed'
}

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', 'Invoice ID'),
    cell: ({ row }) => h('div', row.getValue('id'))
  },
  {
    accessorKey: 'date',
    header: () => h('div', 'Date'),
    cell: ({ row }) => h('div', row.getValue('date'))
  },
  {
    accessorKey: 'student',
    header: () => h('div', 'Student'),
    cell: ({ row }) => h('div', row.getValue('student'))
  },
  {
    accessorKey: 'amount',
    header: () => h('div', 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', formatted)
    }
  },
  {
    accessorKey: 'status',
    header: () => h('div', 'Status'),
    cell: ({ row }) => {
      const status = row.getValue('status')
      switch (status) {
        case 'pending':
          return h("div", { class: "inline p-[4px] rounded-md bg-amber-200 text-amber-600" }, status);
        case 'success':
          return h("div", { class: "inline p-[4px] rounded-md bg-emerald-200 text-emerald-600" }, status);
        case 'failed':
          return h("div", { class: "inline p-[4px] rounded-md bg-red-200 text-red-600" }, status);
        default:
          break;
      }
    }
  }
]