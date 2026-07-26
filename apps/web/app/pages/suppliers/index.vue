<template>
  <div class="min-h-screen bg-default">
    <AppHeader />
    <AppSidebar />

    <main class="lg:pl-64 pt-16">
      <div class="p-6 max-w-5xl mx-auto">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="text-2xl font-bold">Tedarikçiler</h1>
            <p class="text-sm text-muted">Tedarikçi listesi ve yönetimi</p>
          </div>
          <UButton color="primary" @click="showCreate = true"><UIcon name="i-lucide-plus" class="w-4 h-4 mr-2" /> Yeni</UButton>
        </div>

        <div class="bg-white rounded-lg shadow-sm">
          <table class="w-full">
            <thead>
              <tr class="text-left text-sm text-muted">
                <th class="p-3">İsim</th>
                <th class="p-3">İlgili Kişi</th>
                <th class="p-3">Telefon</th>
                <th class="p-3">E-posta</th>
                <th class="p-3">Puan</th>
                <th class="p-3">Ürün Sayısı</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in suppliers" :key="s.id" class="border-t">
                <td class="p-3 font-medium">{{ s.name }}</td>
                <td class="p-3">{{ s.contactPerson || '-' }}</td>
                <td class="p-3">{{ s.phone || '-' }}</td>
                <td class="p-3">{{ s.email || '-' }}</td>
                <td class="p-3">{{ s.rating || '-' }}</td>
                <td class="p-3">{{ s._count?.items || 0 }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <UModal v-model:show="showCreate" title="Yeni Tedarikçi Ekle">
          <div class="space-y-4">
            <div>
              <label class="text-sm text-muted">İsim</label>
              <input v-model="form.name" class="input w-full" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-sm text-muted">İlgili Kişi</label>
                <input v-model="form.contactPerson" class="input w-full" />
              </div>
              <div>
                <label class="text-sm text-muted">Telefon</label>
                <input v-model="form.phone" class="input w-full" />
              </div>
            </div>

            <div class="flex justify-end gap-2">
              <UButton variant="ghost" @click="showCreate = false">İptal</UButton>
              <UButton color="primary" :loading="saving" @click="createSupplier">Oluştur</UButton>
            </div>
          </div>
        </UModal>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const token = auth.token

const suppliers = ref<any[]>([])
const showCreate = ref(false)
const saving = ref(false)
const form = ref({ name: '', contactPerson: '', phone: '' })

const load = async () => {
  try {
    const headers: any = token ? { Authorization: `Bearer ${token}` } : {}
    const res: any = await $fetch('/api/suppliers', { headers })
    suppliers.value = res?.data ?? res ?? []
  } catch (e) {
    console.error(e)
  }
}

const createSupplier = async () => {
  saving.value = true
  try {
    const headers: any = token ? { Authorization: `Bearer ${token}` } : {}
    await $fetch('/api/suppliers', { method: 'POST', headers, body: form.value })
    showCreate.value = false
    Object.assign(form.value, { name: '', contactPerson: '', phone: '' })
    await load()
  } catch (e) {
    console.error(e)
  } finally { saving.value = false }
}

onMounted(load)
</script>

<style scoped>
.input { padding: .5rem .75rem; border-radius: .5rem; border: 1px solid #e5e7eb }
</style>
