<template>
  <div>
    <h1 class="text-2xl font-bold mb-5">Your Students</h1>
    <div v-if="studentStore.students.length > 0">
      <div v-for="student in studentStore.students" :key="student" class="mb-3">
        <div
          class="flex justify-between items-center rounded-md shadow-sm border border-grey p-2 py-3"
        >
          <p class="ml-2">{{ student.name }}</p>
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="outline">Create Subject Form</Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Subject Lesson Form</DialogTitle>
                <DialogDescription>
                  Enter the lesson details
                </DialogDescription>
              </DialogHeader>
              <Subject-Form :studentId=student.id />
              <DialogFooter> </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
    <div v-else class="mb-4">You have no students currently</div>
    <GenerateStudentLink />
  </div>
</template>

<script setup>
const studentStore = useStudentStore();

onMounted(async () => {
  await studentStore.fetchAllStudents();
});

const createSubjectForm = async (student) => {
  await navigateTo({
    path: "/subject-form",
    query: {
      id: student.id,
    },
  });
};
</script>