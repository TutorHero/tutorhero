<template>
  <div class="flex justify-between items-center">
    <Input
      class="max-w-sm"
      :placeholder="filterPlaceholder"
      :model-value="table.getColumn(`${filterColumn}`)?.getFilterValue() as string"
      @update:model-value="table.getColumn(`${filterColumn}`)?.setFilterValue($event)"
    />
    
    <div class="flex">
      <GenerateStudentLink />
      <Dialog>
        <DialogTrigger>
          <Button class="ml-2" variant="destructive" v-if="table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()">
            Remove student
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Warning</DialogTitle>
          </DialogHeader>
          <div v-if="table.getSelectedRowModel().rows.length > 1">
            Are you sure you want to remove the selected students?
          </div>
          <div v-else>
            Are you sure you want to remove the selected student?
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant="destructive" type="submit" @click="removeStudents">
                Yes, remove
              </Button>
            </DialogClose>
            <DialogClose>
              <Button variant="secondary" type="submit">
                No, do not remove
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </div>

  <div class="w-full mt-3 border rounded-md">
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows" :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
  <div class="flex items-center justify-end space-x-2 py-4">
    <div class="flex-1 text-sm text-muted-foreground">
      {{ table.getFilteredSelectedRowModel().rows.length }} of
      {{ table.getFilteredRowModel().rows.length }} row(s) selected.
    </div>
    <div class="space-x-2">
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanPreviousPage()"
        @click="table.previousPage()"
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanNextPage()"
        @click="table.nextPage()"
      >
        Next
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, ColumnFiltersState } from '@tanstack/vue-table'
import { valueUpdater } from '../../lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import type { Student } from './columns';
import SubjectForm from '@/components/SubjectForm.vue'

const props = defineProps<{
  columns: ColumnDef<Student, TValue>[]
  data: Student[]
  filterPlaceholder: String
  filterColumn: String
}>()

const columnFilters = ref<ColumnFiltersState>([])
const rowSelection = ref({})

const table = useVueTable<Student>({
  get data() { return props.data },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  getFilteredRowModel: getFilteredRowModel(),
  getRowId: row => row.id,
  state: {
    get columnFilters() { return columnFilters.value },
    get rowSelection() { return rowSelection.value } ,
  },
})

const studentStore = useStudentStore()
const removeStudents = () => {
  console.log('delete')
  table.getSelectedRowModel().rows.forEach(student => {
    console.log(student.id)
  })
}
</script>