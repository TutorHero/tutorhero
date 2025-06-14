<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="outline" class="w-8 h-8">
        <EllipsisVertical />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem class="cursor-pointer" @click="showSubjectFormDialog = true">
          <span>Schedule lessons</span>
        </DropdownMenuItem>
        <DropdownMenuItem class="cursor-pointer" @click="showRemoveStudentDialog = true">
          <span>Remove student</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>

  <Dialog :open="showRemoveStudentDialog" @update:open="showRemoveStudentDialog = $event">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Warning</DialogTitle>
      </DialogHeader>
      <div>
        Are you sure you want to remove the selected student?
      </div>
      <DialogFooter>
        <Button variant="destructive" type="submit" @click="removeStudent">
          Yes, remove
        </Button>
        <Button variant="secondary" @click="showRemoveStudentDialog = false">
          No, do not remove
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <Dialog :open="showSubjectFormDialog" @update:open="showSubjectFormDialog = $event">
    <DialogContent class="max-w-[380px] sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>
          Schedule lessons
        </DialogTitle>
      </DialogHeader>
      <SubjectForm :studentId="student.id" :studentName="student.name" />
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { EllipsisVertical } from "lucide-vue-next"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const showRemoveStudentDialog = ref(false)
const showSubjectFormDialog = ref(false)

const props = defineProps(['student'])
const emits = defineEmits(['deleteStudent'])
const removeStudent = () => {
  console.log(props.student.id)
  showRemoveStudentDialog.value = false
  emit('deleteStudent',[...props.student])
}
</script>
