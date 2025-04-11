<template>
  <FormsTutorForm :id=name title="Tutor Form" description="Enter your details" />
</template>

<script> 
import { FormsStudentForm } from '#components';
export default {
  name: "nametest",
  computed: {
    name() {
      return this.$route.query.name;
    }
  }
}
</script>
