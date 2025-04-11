<template>
  <FormsStudentForm :id=name title="Student Form" description="Enter your details" />
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
