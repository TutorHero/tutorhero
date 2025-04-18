<template>
  <div>
    <h1 class="text-2xl font-bold mb-5">Invoices</h1>
    <Card>
      <CardHeader>
        <CardTitle>Invoices</CardTitle>
        <CardDescription>
          Manage your invoices
        </CardDescription>
        <CardContent>
          <InvoiceTable />
        </CardContent>
      </CardHeader>
    </Card>
  </div>
</template>

<script setup>
definePageMeta({ middleware: ['auth'] })
</script>