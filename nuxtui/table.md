# Table

> A responsive table element to display data in rows and columns.

## Usage

The Table component is built on top of [TanStack Table](https://tanstack.com/table/latest) and is powered by the [useVueTable](https://tanstack.com/table/latest/docs/framework/vue/vue-table#usevuetable) composable to provide a flexible and fully type-safe API. *Some features of TanStack Table are not supported yet, we'll add more over time.*

```vue [TableExample.vue]
<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import { upperFirst } from 'scule'
import type { TableColumn } from '@nuxt/ui'
import { useClipboard } from '@vueuse/core'

const UButton = resolveComponent('UButton')
const UCheckbox = resolveComponent('UCheckbox')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const toast = useToast()
const { copy } = useClipboard()

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const data = ref<Payment[]>([{
  id: '4600',
  date: '2024-03-11T15:30:00',
  status: 'paid',
  email: 'james.anderson@example.com',
  amount: 594
}, {
  id: '4599',
  date: '2024-03-11T10:10:00',
  status: 'failed',
  email: 'mia.white@example.com',
  amount: 276
}, {
  id: '4598',
  date: '2024-03-11T08:50:00',
  status: 'refunded',
  email: 'william.brown@example.com',
  amount: 315
}, {
  id: '4597',
  date: '2024-03-10T19:45:00',
  status: 'paid',
  email: 'emma.davis@example.com',
  amount: 529
}, {
  id: '4596',
  date: '2024-03-10T15:55:00',
  status: 'paid',
  email: 'ethan.harris@example.com',
  amount: 639
}, {
  id: '4595',
  date: '2024-03-10T13:40:00',
  status: 'refunded',
  email: 'ava.thomas@example.com',
  amount: 428
}, {
  id: '4594',
  date: '2024-03-10T09:15:00',
  status: 'paid',
  email: 'michael.wilson@example.com',
  amount: 683
}, {
  id: '4593',
  date: '2024-03-09T20:25:00',
  status: 'failed',
  email: 'olivia.taylor@example.com',
  amount: 947
}, {
  id: '4592',
  date: '2024-03-09T18:45:00',
  status: 'paid',
  email: 'benjamin.jackson@example.com',
  amount: 851
}, {
  id: '4591',
  date: '2024-03-09T16:05:00',
  status: 'paid',
  email: 'sophia.miller@example.com',
  amount: 762
}, {
  id: '4590',
  date: '2024-03-09T14:20:00',
  status: 'paid',
  email: 'noah.clark@example.com',
  amount: 573
}, {
  id: '4589',
  date: '2024-03-09T11:35:00',
  status: 'failed',
  email: 'isabella.lee@example.com',
  amount: 389
}, {
  id: '4588',
  date: '2024-03-08T22:50:00',
  status: 'refunded',
  email: 'liam.walker@example.com',
  amount: 701
}, {
  id: '4587',
  date: '2024-03-08T20:15:00',
  status: 'paid',
  email: 'charlotte.hall@example.com',
  amount: 856
}, {
  id: '4586',
  date: '2024-03-08T17:40:00',
  status: 'paid',
  email: 'mason.young@example.com',
  amount: 492
}, {
  id: '4585',
  date: '2024-03-08T14:55:00',
  status: 'failed',
  email: 'amelia.king@example.com',
  amount: 637
}, {
  id: '4584',
  date: '2024-03-08T12:30:00',
  status: 'paid',
  email: 'elijah.wright@example.com',
  amount: 784
}, {
  id: '4583',
  date: '2024-03-08T09:45:00',
  status: 'refunded',
  email: 'harper.scott@example.com',
  amount: 345
}, {
  id: '4582',
  date: '2024-03-07T23:10:00',
  status: 'paid',
  email: 'evelyn.green@example.com',
  amount: 918
}, {
  id: '4581',
  date: '2024-03-07T20:25:00',
  status: 'paid',
  email: 'logan.baker@example.com',
  amount: 567
}])

const columns: TableColumn<Payment>[] = [{
  id: 'select',
  header: ({ table }) => h(UCheckbox, {
    'modelValue': table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
    'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value),
    'aria-label': 'Select all'
  }),
  cell: ({ row }) => h(UCheckbox, {
    'modelValue': row.getIsSelected(),
    'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
    'aria-label': 'Select row'
  }),
  enableSorting: false,
  enableHiding: false
}, {
  accessorKey: 'id',
  header: '#',
  cell: ({ row }) => `#${row.getValue('id')}`
}, {
  accessorKey: 'date',
  header: 'Date',
  cell: ({ row }) => {
    return new Date(row.getValue('date')).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
}, {
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }) => {
    const color = ({
      paid: 'success' as const,
      failed: 'error' as const,
      refunded: 'neutral' as const
    })[row.getValue('status') as string]

    return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => row.getValue('status'))
  }
}, {
  accessorKey: 'email',
  header: ({ column }) => {
    const isSorted = column.getIsSorted()

    return h(UButton, {
      color: 'neutral',
      variant: 'ghost',
      label: 'Email',
      icon: isSorted ? (isSorted === 'asc' ? 'i-lucide-arrow-up-narrow-wide' : 'i-lucide-arrow-down-wide-narrow') : 'i-lucide-arrow-up-down',
      class: '-mx-2.5',
      onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
    })
  },
  cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email'))
}, {
  accessorKey: 'amount',
  header: () => h('div', { class: 'text-right' }, 'Amount'),
  cell: ({ row }) => {
    const amount = Number.parseFloat(row.getValue('amount'))

    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)

    return h('div', { class: 'text-right font-medium' }, formatted)
  }
}, {
  id: 'actions',
  enableHiding: false,
  cell: ({ row }) => {
    const items = [{
      type: 'label',
      label: 'Actions'
    }, {
      label: 'Copy payment ID',
      onSelect() {
        copy(row.original.id)

        toast.add({
          title: 'Payment ID copied to clipboard!',
          color: 'success',
          icon: 'i-lucide-circle-check'
        })
      }
    }, {
      label: row.getIsExpanded() ? 'Collapse' : 'Expand',
      onSelect() {
        row.toggleExpanded()
      }
    }, {
      type: 'separator'
    }, {
      label: 'View customer'
    }, {
      label: 'View payment details'
    }]

    return h('div', { class: 'text-right' }, h(UDropdownMenu, {
      'content': {
        align: 'end'
      },
      items,
      'aria-label': 'Actions dropdown'
    }, () => h(UButton, {
      'icon': 'i-lucide-ellipsis-vertical',
      'color': 'neutral',
      'variant': 'ghost',
      'class': 'ml-auto',
      'aria-label': 'Actions dropdown'
    })))
  }
}]

const table = useTemplateRef('table')

function randomize() {
  data.value = [...data.value].sort(() => Math.random() - 0.5)
}
</script>

<template>
  <div class="flex-1 divide-y divide-accented w-full">
    <div class="flex items-center gap-2 px-4 py-3.5 overflow-x-auto">
      <UInput
        :model-value="(table?.tableApi?.getColumn('email')?.getFilterValue() as string)"
        class="max-w-sm min-w-[12ch]"
        placeholder="Filter emails..."
        @update:model-value="table?.tableApi?.getColumn('email')?.setFilterValue($event)"
      />

      <UButton color="neutral" label="Randomize" @click="randomize" />

      <UDropdownMenu
        :items="table?.tableApi?.getAllColumns().filter(column => column.getCanHide()).map(column => ({
          label: upperFirst(column.id),
          type: 'checkbox' as const,
          checked: column.getIsVisible(),
          onUpdateChecked(checked: boolean) {
            table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
          },
          onSelect(e?: Event) {
            e?.preventDefault()
          }
        }))"
        :content="{ align: 'end' }"
      >
        <UButton
          label="Columns"
          color="neutral"
          variant="outline"
          trailing-icon="i-lucide-chevron-down"
          class="ml-auto"
          aria-label="Columns select dropdown"
        />
      </UDropdownMenu>
    </div>

    <UTable
      ref="table"
      :data="data"
      :columns="columns"
      sticky
      class="h-96"
    >
      <template #expanded="{ row }">
        <pre>{{ row.original }}</pre>
      </template>
    </UTable>

    <div class="px-4 py-3.5 text-sm text-muted">
      {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} of
      {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s) selected.
    </div>
  </div>
</template>
```

<callout ariaLabel="View source code" icon="i-simple-icons-github" to="https://github.com/nuxt/ui/tree/v3/docs/app/components/content/examples/table/TableExample.vue">

This example demonstrates the most common use case of the `Table` component. Check out the source code on GitHub.

</callout>

### Data

Use the `data` prop as an array of objects, the columns will be generated based on the keys of the objects.

```vue
<template>
  <UTable class="flex-1" />
</template>
```

### Columns

Use the `columns` prop as an array of [ColumnDef](https://tanstack.com/table/latest/docs/api/core/column-def) objects with properties like:

- `accessorKey`: <span className="text-muted">

The key of the row object to use when extracting the value for the column.

</span>
- `header`: <span className="text-muted">

The header to display for the column. If a string is passed, it can be used as a default for the column ID. If a function is passed, it will be passed a props object for the header and should return the rendered header value (the exact type depends on the adapter being used).

</span>
- `footer`: <span className="text-muted">

The footer to display for the column. Works exactly like header, but is displayed under the table.

</span>
- `cell`: <span className="text-muted">

The cell to display each row for the column. If a function is passed, it will be passed a props object for the cell and should return the rendered cell value (the exact type depends on the adapter being used).

</span>
- `meta`: <span className="text-muted">

Extra properties for the column.

</span>


  - `class`:
  
    - `td`: <span className="text-muted">
    
    The classes to apply to the `td` element.
    
    </span>
    - `th`: <span className="text-muted">
    
    The classes to apply to the `th` element.
    
    </span>

In order to render components or other HTML elements, you will need to use the Vue [`h` function](https://vuejs.org/api/render-function.html#h) inside the `header` and `cell` props. This is different from other components that use slots but allows for more flexibility.

<tip ariaLabel="Table columns with slots" to="#with-slots">

You can also use slots to customize the header and data cells of the table.

</tip>

```vue [TableColumnsExample.vue]
<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const data = ref<Payment[]>([{
  id: '4600',
  date: '2024-03-11T15:30:00',
  status: 'paid',
  email: 'james.anderson@example.com',
  amount: 594
}, {
  id: '4599',
  date: '2024-03-11T10:10:00',
  status: 'failed',
  email: 'mia.white@example.com',
  amount: 276
}, {
  id: '4598',
  date: '2024-03-11T08:50:00',
  status: 'refunded',
  email: 'william.brown@example.com',
  amount: 315
}, {
  id: '4597',
  date: '2024-03-10T19:45:00',
  status: 'paid',
  email: 'emma.davis@example.com',
  amount: 529
}, {
  id: '4596',
  date: '2024-03-10T15:55:00',
  status: 'paid',
  email: 'ethan.harris@example.com',
  amount: 639
}])

const columns: TableColumn<Payment>[] = [{
  accessorKey: 'id',
  header: '#',
  cell: ({ row }) => `#${row.getValue('id')}`
}, {
  accessorKey: 'date',
  header: 'Date',
  cell: ({ row }) => {
    return new Date(row.getValue('date')).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
}, {
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }) => {
    const color = ({
      paid: 'success' as const,
      failed: 'error' as const,
      refunded: 'neutral' as const
    })[row.getValue('status') as string]

    return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => row.getValue('status'))
  }
}, {
  accessorKey: 'email',
  header: 'Email'
}, {
  accessorKey: 'amount',
  header: () => h('div', { class: 'text-right' }, 'Amount'),
  cell: ({ row }) => {
    const amount = Number.parseFloat(row.getValue('amount'))

    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)

    return h('div', { class: 'text-right font-medium' }, formatted)
  }
}]
</script>

<template>
  <UTable :data="data" :columns="columns" class="flex-1" />
</template>
```

<note>

When rendering components with `h`, you can either use the `resolveComponent` function or import from `#components`.

</note>

### Meta

Use the `meta` prop as an object ([TableMeta](https://tanstack.com/table/latest/docs/api/core/table#meta)) to pass properties like:

- `class`:

  - `tr`: <span className="text-muted">
  
  The classes to apply to the `tr` element.
  
  </span>

### Loading

Use the `loading` prop to display a loading state, the `loading-color` prop to change its color and the `loading-animation` prop to change its animation.

```vue
<template>
  <UTable loading loading-color="primary" loading-animation="carousel" class="flex-1" />
</template>
```

### Sticky

Use the `sticky` prop to make the header or footer sticky.

```vue
<template>
  <UTable sticky class="flex-1 max-h-[312px]" />
</template>
```

## Examples

### With row actions

You can add a new column that renders a [DropdownMenu](/components/dropdown-menu) component inside the `cell` to render row actions.

```vue [TableRowActionsExample.vue]
<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import { useClipboard } from '@vueuse/core'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const toast = useToast()
const { copy } = useClipboard()

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const data = ref<Payment[]>([{
  id: '4600',
  date: '2024-03-11T15:30:00',
  status: 'paid',
  email: 'james.anderson@example.com',
  amount: 594
}, {
  id: '4599',
  date: '2024-03-11T10:10:00',
  status: 'failed',
  email: 'mia.white@example.com',
  amount: 276
}, {
  id: '4598',
  date: '2024-03-11T08:50:00',
  status: 'refunded',
  email: 'william.brown@example.com',
  amount: 315
}, {
  id: '4597',
  date: '2024-03-10T19:45:00',
  status: 'paid',
  email: 'emma.davis@example.com',
  amount: 529
}, {
  id: '4596',
  date: '2024-03-10T15:55:00',
  status: 'paid',
  email: 'ethan.harris@example.com',
  amount: 639
}])

const columns: TableColumn<Payment>[] = [{
  accessorKey: 'id',
  header: '#',
  cell: ({ row }) => `#${row.getValue('id')}`
}, {
  accessorKey: 'date',
  header: 'Date',
  cell: ({ row }) => {
    return new Date(row.getValue('date')).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
}, {
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }) => {
    const color = ({
      paid: 'success' as const,
      failed: 'error' as const,
      refunded: 'neutral' as const
    })[row.getValue('status') as string]

    return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => row.getValue('status'))
  }
}, {
  accessorKey: 'email',
  header: 'Email'
}, {
  accessorKey: 'amount',
  header: () => h('div', { class: 'text-right' }, 'Amount'),
  cell: ({ row }) => {
    const amount = Number.parseFloat(row.getValue('amount'))

    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)

    return h('div', { class: 'text-right font-medium' }, formatted)
  }
}, {
  id: 'actions',
  cell: ({ row }) => {
    return h('div', { class: 'text-right' }, h(UDropdownMenu, {
      'content': {
        align: 'end'
      },
      'items': getRowItems(row),
      'aria-label': 'Actions dropdown'
    }, () => h(UButton, {
      'icon': 'i-lucide-ellipsis-vertical',
      'color': 'neutral',
      'variant': 'ghost',
      'class': 'ml-auto',
      'aria-label': 'Actions dropdown'
    })))
  }
}]

function getRowItems(row: Row<Payment>) {
  return [{
    type: 'label',
    label: 'Actions'
  }, {
    label: 'Copy payment ID',
    onSelect() {
      copy(row.original.id)

      toast.add({
        title: 'Payment ID copied to clipboard!',
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
    }
  }, {
    type: 'separator'
  }, {
    label: 'View customer'
  }, {
    label: 'View payment details'
  }]
}
</script>

<template>
  <UTable :data="data" :columns="columns" class="flex-1" />
</template>
```

### With expandable rows

You can add a new column that renders a [Button](/components/button) component inside the `cell` to toggle the expandable state of a row using the TanStack Table [Expanding APIs](https://tanstack.com/table/latest/docs/api/features/expanding).

<caution>

You need to define the `#expanded` slot to render the expanded content which will receive the row as a parameter.

</caution>

```vue [TableRowExpandableExample.vue]
<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const data = ref<Payment[]>([{
  id: '4600',
  date: '2024-03-11T15:30:00',
  status: 'paid',
  email: 'james.anderson@example.com',
  amount: 594
}, {
  id: '4599',
  date: '2024-03-11T10:10:00',
  status: 'failed',
  email: 'mia.white@example.com',
  amount: 276
}, {
  id: '4598',
  date: '2024-03-11T08:50:00',
  status: 'refunded',
  email: 'william.brown@example.com',
  amount: 315
}, {
  id: '4597',
  date: '2024-03-10T19:45:00',
  status: 'paid',
  email: 'emma.davis@example.com',
  amount: 529
}, {
  id: '4596',
  date: '2024-03-10T15:55:00',
  status: 'paid',
  email: 'ethan.harris@example.com',
  amount: 639
}])

const columns: TableColumn<Payment>[] = [{
  id: 'expand',
  cell: ({ row }) => h(UButton, {
    'color': 'neutral',
    'variant': 'ghost',
    'icon': 'i-lucide-chevron-down',
    'square': true,
    'aria-label': 'Expand',
    'ui': {
      leadingIcon: ['transition-transform', row.getIsExpanded() ? 'duration-200 rotate-180' : '']
    },
    'onClick': () => row.toggleExpanded()
  })
}, {
  accessorKey: 'id',
  header: '#',
  cell: ({ row }) => `#${row.getValue('id')}`
}, {
  accessorKey: 'date',
  header: 'Date',
  cell: ({ row }) => {
    return new Date(row.getValue('date')).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
}, {
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }) => {
    const color = ({
      paid: 'success' as const,
      failed: 'error' as const,
      refunded: 'neutral' as const
    })[row.getValue('status') as string]

    return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => row.getValue('status'))
  }
}, {
  accessorKey: 'email',
  header: 'Email'
}, {
  accessorKey: 'amount',
  header: () => h('div', { class: 'text-right' }, 'Amount'),
  cell: ({ row }) => {
    const amount = Number.parseFloat(row.getValue('amount'))

    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)

    return h('div', { class: 'text-right font-medium' }, formatted)
  }
}]

const expanded = ref({ 1: true })
</script>

<template>
  <UTable
    v-model:expanded="expanded"
    :data="data"
    :columns="columns"
    :ui="{ tr: 'data-[expanded=true]:bg-elevated/50' }"
    class="flex-1"
  >
    <template #expanded="{ row }">
      <pre>{{ row.original }}</pre>
    </template>
  </UTable>
</template>
```

<tip>

You can use the `expanded` prop to control the expandable state of the rows (can be binded with `v-model`).

</tip>

<note>

You could also add this action to the [`DropdownMenu`](/components/dropdown-menu) component inside the `actions` column.

</note>

### With grouped rows

You can group rows based on a given column value and show/hide sub rows via some button added to the cell using the TanStack Table [Grouping APIs](https://tanstack.com/table/latest/docs/api/features/grouping).

#### Important parts:

- Add `grouping` prop with an array of column ids you want to group by.
- Add `grouping-options` prop. It must include `getGroupedRowModel`, you can import it from `@tanstack/vue-table` or implement your own.
- Expand rows via `row.toggleExpanded()` method on any cell of the row. Keep in mind, it also toggles `#expanded` slot.
- Use `aggregateFn` on column definition to define how to aggregate the rows.
- `agregatedCell` renderer on column definition only works if there is no `cell` renderer.

```vue [TableGroupedRowsExample.vue]
<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { getGroupedRowModel } from '@tanstack/vue-table'
import type { GroupingOptions } from '@tanstack/vue-table'

const UBadge = resolveComponent('UBadge')

type Account = {
  id: string
  name: string
}

type PaymentStatus = 'paid' | 'failed' | 'refunded'

type Payment = {
  id: string
  date: string
  status: PaymentStatus
  email: string
  amount: number
  account: Account
}

const getColorByStatus = (status: PaymentStatus) => {
  return {
    paid: 'success',
    failed: 'error',
    refunded: 'neutral'
  }[status]
}

const data = ref<Payment[]>([
  {
    id: '4600',
    date: '2024-03-11T15:30:00',
    status: 'paid',
    email: 'james.anderson@example.com',
    amount: 594,
    account: {
      id: '1',
      name: 'Account 1'
    }
  },
  {
    id: '4599',
    date: '2024-03-11T10:10:00',
    status: 'failed',
    email: 'mia.white@example.com',
    amount: 276,
    account: {
      id: '2',
      name: 'Account 2'
    }
  },
  {
    id: '4598',
    date: '2024-03-11T08:50:00',
    status: 'refunded',
    email: 'william.brown@example.com',
    amount: 315,
    account: {
      id: '1',
      name: 'Account 1'
    }
  },
  {
    id: '4597',
    date: '2024-03-10T19:45:00',
    status: 'paid',
    email: 'emma.davis@example.com',
    amount: 529,
    account: {
      id: '2',
      name: 'Account 2'
    }
  },
  {
    id: '4596',
    date: '2024-03-10T15:55:00',
    status: 'paid',
    email: 'ethan.harris@example.com',
    amount: 639,
    account: {
      id: '1',
      name: 'Account 1'
    }
  }
])

const columns: TableColumn<Payment>[] = [
  {
    id: 'title',
    header: 'Item'
  },
  {
    id: 'account_id',
    accessorKey: 'account.id'
  },
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) =>
      row.getIsGrouped()
        ? `${row.getValue('id')} records`
        : `#${row.getValue('id')}`,
    aggregationFn: 'count'
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      return new Date(row.getValue('date')).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    },
    aggregationFn: 'max'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'email',
    header: 'Email',
    meta: {
      class: {
        td: 'w-full'
      }
    },
    cell: ({ row }) =>
      row.getIsGrouped()
        ? `${row.getValue('email')} customers`
        : row.getValue('email'),
    aggregationFn: 'uniqueCount'
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
    aggregationFn: 'sum'
  }
]

const grouping_options = ref<GroupingOptions>({
  groupedColumnMode: 'remove',
  getGroupedRowModel: getGroupedRowModel()
})
</script>

<template>
  <UTable
    :data="data"
    :columns="columns"
    :grouping="['account_id', 'status']"
    :grouping-options="grouping_options"
    :ui="{
      root: 'min-w-full',
      td: 'empty:p-0' // helps with the colspaned row added for expand slot
    }"
  >
    <template #title-cell="{ row }">
      <div v-if="row.getIsGrouped()" class="flex items-center">
        <span
          class="inline-block"
          :style="{ width: `calc(${row.depth} * 1rem)` }"
        />

        <UButton
          variant="outline"
          color="neutral"
          class="mr-2"
          size="xs"
          :icon="row.getIsExpanded() ? 'i-lucide-minus' : 'i-lucide-plus'"
          @click="row.toggleExpanded()"
        />
        <strong v-if="row.groupingColumnId === 'account_id'">{{
          row.original.account.name
        }}</strong>
        <UBadge
          v-else-if="row.groupingColumnId === 'status'"
          :color="getColorByStatus(row.original.status)"
          class="capitalize"
          variant="subtle"
        >
          {{ row.original.status }}
        </UBadge>
      </div>
    </template>
  </UTable>
</template>
```

### With row selection

You can add a new column that renders a [Checkbox](/components/checkbox) component inside the `header` and `cell` to select rows using the TanStack Table [Row Selection APIs](https://tanstack.com/table/latest/docs/api/features/row-selection).

```vue [TableRowSelectionExample.vue]
<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UCheckbox = resolveComponent('UCheckbox')
const UBadge = resolveComponent('UBadge')

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const data = ref<Payment[]>([{
  id: '4600',
  date: '2024-03-11T15:30:00',
  status: 'paid',
  email: 'james.anderson@example.com',
  amount: 594
}, {
  id: '4599',
  date: '2024-03-11T10:10:00',
  status: 'failed',
  email: 'mia.white@example.com',
  amount: 276
}, {
  id: '4598',
  date: '2024-03-11T08:50:00',
  status: 'refunded',
  email: 'william.brown@example.com',
  amount: 315
}, {
  id: '4597',
  date: '2024-03-10T19:45:00',
  status: 'paid',
  email: 'emma.davis@example.com',
  amount: 529
}, {
  id: '4596',
  date: '2024-03-10T15:55:00',
  status: 'paid',
  email: 'ethan.harris@example.com',
  amount: 639
}])

const columns: TableColumn<Payment>[] = [{
  id: 'select',
  header: ({ table }) => h(UCheckbox, {
    'modelValue': table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
    'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value),
    'aria-label': 'Select all'
  }),
  cell: ({ row }) => h(UCheckbox, {
    'modelValue': row.getIsSelected(),
    'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
    'aria-label': 'Select row'
  })
}, {
  accessorKey: 'date',
  header: 'Date',
  cell: ({ row }) => {
    return new Date(row.getValue('date')).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
}, {
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }) => {
    const color = ({
      paid: 'success' as const,
      failed: 'error' as const,
      refunded: 'neutral' as const
    })[row.getValue('status') as string]

    return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => row.getValue('status'))
  }
}, {
  accessorKey: 'email',
  header: 'Email'
}, {
  accessorKey: 'amount',
  header: () => h('div', { class: 'text-right' }, 'Amount'),
  cell: ({ row }) => {
    const amount = Number.parseFloat(row.getValue('amount'))

    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)

    return h('div', { class: 'text-right font-medium' }, formatted)
  }
}]

const table = useTemplateRef('table')

const rowSelection = ref({ 1: true })
</script>

<template>
  <div class="flex-1 w-full">
    <UTable
      ref="table"
      v-model:row-selection="rowSelection"
      :data="data"
      :columns="columns"
    />

    <div class="px-4 py-3.5 border-t border-accented text-sm text-muted">
      {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} of
      {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s) selected.
    </div>
  </div>
</template>
```

<tip>

You can use the `row-selection` prop to control the selection state of the rows (can be binded with `v-model`).

</tip>

### With row select event

You can add a `@select` listener to make rows clickable with or without a checkbox column.

<note>

The handler function receives the `TableRow` instance as the first argument and an optional `Event` as the second argument.

</note>

```vue [TableRowSelectEventExample.vue]
<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn, TableRow } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')
const UCheckbox = resolveComponent('UCheckbox')

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const data = ref<Payment[]>([{
  id: '4600',
  date: '2024-03-11T15:30:00',
  status: 'paid',
  email: 'james.anderson@example.com',
  amount: 594
}, {
  id: '4599',
  date: '2024-03-11T10:10:00',
  status: 'failed',
  email: 'mia.white@example.com',
  amount: 276
}, {
  id: '4598',
  date: '2024-03-11T08:50:00',
  status: 'refunded',
  email: 'william.brown@example.com',
  amount: 315
}, {
  id: '4597',
  date: '2024-03-10T19:45:00',
  status: 'paid',
  email: 'emma.davis@example.com',
  amount: 529
}, {
  id: '4596',
  date: '2024-03-10T15:55:00',
  status: 'paid',
  email: 'ethan.harris@example.com',
  amount: 639
}])

const columns: TableColumn<Payment>[] = [{
  id: 'select',
  header: ({ table }) => h(UCheckbox, {
    'modelValue': table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
    'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value),
    'aria-label': 'Select all'
  }),
  cell: ({ row }) => h(UCheckbox, {
    'modelValue': row.getIsSelected(),
    'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
    'aria-label': 'Select row'
  })
}, {
  accessorKey: 'date',
  header: 'Date',
  cell: ({ row }) => {
    return new Date(row.getValue('date')).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
}, {
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }) => {
    const color = ({
      paid: 'success' as const,
      failed: 'error' as const,
      refunded: 'neutral' as const
    })[row.getValue('status') as string]

    return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => row.getValue('status'))
  }
}, {
  accessorKey: 'email',
  header: 'Email'
}, {
  accessorKey: 'amount',
  header: () => h('div', { class: 'text-right' }, 'Amount'),
  cell: ({ row }) => {
    const amount = Number.parseFloat(row.getValue('amount'))

    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)

    return h('div', { class: 'text-right font-medium' }, formatted)
  }
}]

const table = useTemplateRef('table')

const rowSelection = ref<Record<string, boolean>>({ })

function onSelect(row: TableRow<Payment>, e?: Event) {
  /* If you decide to also select the column you can do this  */
  row.toggleSelected(!row.getIsSelected())

  console.log(e)
}
</script>

<template>
  <div class="flex w-full flex-1 gap-1">
    <div class="flex-1">
      <UTable
        ref="table"
        v-model:row-selection="rowSelection"
        :data="data"
        :columns="columns"
        @select="onSelect"
      />

      <div class="px-4 py-3.5 border-t border-accented text-sm text-muted">
        {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} of
        {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s) selected.
      </div>
    </div>
  </div>
</template>
```

<tip>

You can use this to navigate to a page, open a modal or even to select the row manually.

</tip>

### With row context menu event <badge className="align-text-top" label="Soon"></badge>

You can add a `@contextmenu` listener to make rows right clickable and wrap the Table in a [ContextMenu](/components/context-menu) component to display row actions for example.

<note>

The handler function receives the `Event` and `TableRow` instance as the first and second arguments respectively.

</note>

```vue [TableRowContextMenuEventExample.vue]
<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { ContextMenuItem, TableColumn, TableRow } from '@nuxt/ui'
import { useClipboard } from '@vueuse/core'

const UBadge = resolveComponent('UBadge')
const UCheckbox = resolveComponent('UCheckbox')

const toast = useToast()
const { copy } = useClipboard()

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const data = ref<Payment[]>([{
  id: '4600',
  date: '2024-03-11T15:30:00',
  status: 'paid',
  email: 'james.anderson@example.com',
  amount: 594
}, {
  id: '4599',
  date: '2024-03-11T10:10:00',
  status: 'failed',
  email: 'mia.white@example.com',
  amount: 276
}, {
  id: '4598',
  date: '2024-03-11T08:50:00',
  status: 'refunded',
  email: 'william.brown@example.com',
  amount: 315
}, {
  id: '4597',
  date: '2024-03-10T19:45:00',
  status: 'paid',
  email: 'emma.davis@example.com',
  amount: 529
}, {
  id: '4596',
  date: '2024-03-10T15:55:00',
  status: 'paid',
  email: 'ethan.harris@example.com',
  amount: 639
}])

const columns: TableColumn<Payment>[] = [{
  id: 'select',
  header: ({ table }) => h(UCheckbox, {
    'modelValue': table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
    'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value),
    'aria-label': 'Select all'
  }),
  cell: ({ row }) => h(UCheckbox, {
    'modelValue': row.getIsSelected(),
    'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
    'aria-label': 'Select row'
  })
}, {
  accessorKey: 'id',
  header: '#',
  cell: ({ row }) => `#${row.getValue('id')}`
}, {
  accessorKey: 'date',
  header: 'Date',
  cell: ({ row }) => {
    return new Date(row.getValue('date')).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
}, {
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }) => {
    const color = ({
      paid: 'success' as const,
      failed: 'error' as const,
      refunded: 'neutral' as const
    })[row.getValue('status') as string]

    return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => row.getValue('status'))
  }
}, {
  accessorKey: 'email',
  header: 'Email'
}, {
  accessorKey: 'amount',
  header: () => h('div', { class: 'text-right' }, 'Amount'),
  cell: ({ row }) => {
    const amount = Number.parseFloat(row.getValue('amount'))

    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)

    return h('div', { class: 'text-right font-medium' }, formatted)
  }
}]

const items = ref<ContextMenuItem[]>([])

function getRowItems(row: TableRow<Payment>) {
  return [{
    type: 'label' as const,
    label: 'Actions'
  }, {
    label: 'Copy payment ID',
    onSelect() {
      copy(row.original.id)

      toast.add({
        title: 'Payment ID copied to clipboard!',
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
    }
  }, {
    label: row.getIsExpanded() ? 'Collapse' : 'Expand',
    onSelect() {
      row.toggleExpanded()
    }
  }, {
    type: 'separator' as const
  }, {
    label: 'View customer'
  }, {
    label: 'View payment details'
  }]
}

function onContextmenu(_e: Event, row: TableRow<Payment>) {
  items.value = getRowItems(row)
}
</script>

<template>
  <UContextMenu :items="items">
    <UTable
      :data="data"
      :columns="columns"
      class="flex-1"
      @contextmenu="onContextmenu"
    >
      <template #expanded="{ row }">
        <pre>{{ row.original }}</pre>
      </template>
    </UTable>
  </UContextMenu>
</template>
```

### With row hover event <badge className="align-text-top" label="Soon"></badge>

You can add a `@hover` listener to make rows hoverable and use a [Popover](/components/popover) or a [Tooltip](/components/tooltip) component to display row details for example.

<note>

The handler function receives the `Event` and `TableRow` instance as the first and second arguments respectively.

</note>

```vue [TableRowHoverEventExample.vue]
<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn, TableRow } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')
const UCheckbox = resolveComponent('UCheckbox')

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const data = ref<Payment[]>([{
  id: '4600',
  date: '2024-03-11T15:30:00',
  status: 'paid',
  email: 'james.anderson@example.com',
  amount: 594
}, {
  id: '4599',
  date: '2024-03-11T10:10:00',
  status: 'failed',
  email: 'mia.white@example.com',
  amount: 276
}, {
  id: '4598',
  date: '2024-03-11T08:50:00',
  status: 'refunded',
  email: 'william.brown@example.com',
  amount: 315
}, {
  id: '4597',
  date: '2024-03-10T19:45:00',
  status: 'paid',
  email: 'emma.davis@example.com',
  amount: 529
}, {
  id: '4596',
  date: '2024-03-10T15:55:00',
  status: 'paid',
  email: 'ethan.harris@example.com',
  amount: 639
}])

const columns: TableColumn<Payment>[] = [{
  id: 'select',
  header: ({ table }) => h(UCheckbox, {
    'modelValue': table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
    'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value),
    'aria-label': 'Select all'
  }),
  cell: ({ row }) => h(UCheckbox, {
    'modelValue': row.getIsSelected(),
    'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
    'aria-label': 'Select row'
  })
}, {
  accessorKey: 'id',
  header: '#',
  cell: ({ row }) => `#${row.getValue('id')}`
}, {
  accessorKey: 'date',
  header: 'Date',
  cell: ({ row }) => {
    return new Date(row.getValue('date')).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
}, {
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }) => {
    const color = ({
      paid: 'success' as const,
      failed: 'error' as const,
      refunded: 'neutral' as const
    })[row.getValue('status') as string]

    return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => row.getValue('status'))
  }
}, {
  accessorKey: 'email',
  header: 'Email'
}, {
  accessorKey: 'amount',
  header: () => h('div', { class: 'text-right' }, 'Amount'),
  cell: ({ row }) => {
    const amount = Number.parseFloat(row.getValue('amount'))

    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)

    return h('div', { class: 'text-right font-medium' }, formatted)
  }
}]

const anchor = ref({ x: 0, y: 0 })

const reference = computed(() => ({
  getBoundingClientRect: () =>
    ({
      width: 0,
      height: 0,
      left: anchor.value.x,
      right: anchor.value.x,
      top: anchor.value.y,
      bottom: anchor.value.y,
      ...anchor.value
    } as DOMRect)
}))

const open = ref(false)
const openDebounced = refDebounced(open, 10)
const selectedRow = ref<TableRow<Payment> | null>(null)

function onHover(_e: Event, row: TableRow<Payment> | null) {
  selectedRow.value = row

  open.value = !!row
}
</script>

<template>
  <div class="flex w-full flex-1 gap-1">
    <UTable
      :data="data"
      :columns="columns"
      class="flex-1"
      @pointermove="(ev: PointerEvent) => {
        anchor.x = ev.clientX
        anchor.y = ev.clientY
      }"
      @hover="onHover"
    />

    <UPopover
      :content="{ side: 'top', sideOffset: 16, updatePositionStrategy: 'always' }"
      :open="openDebounced"
      :reference="reference"
    >
      <template #content>
        <div class="p-4">
          {{ selectedRow?.original?.id }}
        </div>
      </template>
    </UPopover>
  </div>
</template>
```

<note>

This example is similar as the Popover [with following cursor example](/components/popover#with-following-cursor) and uses a [`refDebounced`](https://vueuse.org/shared/refDebounced/#refdebounced) to prevent the Popover from opening and closing too quickly when moving the cursor from one row to another.

</note>

### With column footer <badge className="align-text-top" label="Soon"></badge>

You can add a `footer` property to the column definition to render a footer for the column.

```vue [TableColumnFooterExample.vue]
<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn, TableRow } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const data = ref<Payment[]>([{
  id: '4600',
  date: '2024-03-11T15:30:00',
  status: 'paid',
  email: 'james.anderson@example.com',
  amount: 594
}, {
  id: '4599',
  date: '2024-03-11T10:10:00',
  status: 'failed',
  email: 'mia.white@example.com',
  amount: 276
}, {
  id: '4598',
  date: '2024-03-11T08:50:00',
  status: 'refunded',
  email: 'william.brown@example.com',
  amount: 315
}, {
  id: '4597',
  date: '2024-03-10T19:45:00',
  status: 'paid',
  email: 'emma.davis@example.com',
  amount: 529
}, {
  id: '4596',
  date: '2024-03-10T15:55:00',
  status: 'paid',
  email: 'ethan.harris@example.com',
  amount: 639
}])

const columns: TableColumn<Payment>[] = [{
  accessorKey: 'id',
  header: '#',
  cell: ({ row }) => `#${row.getValue('id')}`
}, {
  accessorKey: 'date',
  header: 'Date',
  cell: ({ row }) => {
    return new Date(row.getValue('date')).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
}, {
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }) => {
    const color = ({
      paid: 'success' as const,
      failed: 'error' as const,
      refunded: 'neutral' as const
    })[row.getValue('status') as string]

    return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => row.getValue('status'))
  }
}, {
  accessorKey: 'email',
  header: 'Email'
}, {
  accessorKey: 'amount',
  header: () => h('div', { class: 'text-right' }, 'Amount'),
  footer: ({ column }) => {
    const total = column.getFacetedRowModel().rows.reduce((acc: number, row: TableRow<Payment>) => acc + Number.parseFloat(row.getValue('amount')), 0)

    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(total)

    return h('div', { class: 'text-right font-medium' }, `Total: ${formatted}`)
  },
  cell: ({ row }) => {
    const amount = Number.parseFloat(row.getValue('amount'))

    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)

    return h('div', { class: 'text-right font-medium' }, formatted)
  }
}]
</script>

<template>
  <UTable :data="data" :columns="columns" class="flex-1" />
</template>
```

### With column sorting

You can update a column `header` to render a [Button](/components/button) component inside the `header` to toggle the sorting state using the TanStack Table [Sorting APIs](https://tanstack.com/table/latest/docs/api/features/sorting).

```vue [TableColumnSortingExample.vue]
<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const data = ref<Payment[]>([{
  id: '4600',
  date: '2024-03-11T15:30:00',
  status: 'paid',
  email: 'james.anderson@example.com',
  amount: 594
}, {
  id: '4599',
  date: '2024-03-11T10:10:00',
  status: 'failed',
  email: 'mia.white@example.com',
  amount: 276
}, {
  id: '4598',
  date: '2024-03-11T08:50:00',
  status: 'refunded',
  email: 'william.brown@example.com',
  amount: 315
}, {
  id: '4597',
  date: '2024-03-10T19:45:00',
  status: 'paid',
  email: 'emma.davis@example.com',
  amount: 529
}, {
  id: '4596',
  date: '2024-03-10T15:55:00',
  status: 'paid',
  email: 'ethan.harris@example.com',
  amount: 639
}])

const columns: TableColumn<Payment>[] = [{
  accessorKey: 'id',
  header: '#',
  cell: ({ row }) => `#${row.getValue('id')}`
}, {
  accessorKey: 'date',
  header: 'Date',
  cell: ({ row }) => {
    return new Date(row.getValue('date')).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
}, {
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }) => {
    const color = ({
      paid: 'success' as const,
      failed: 'error' as const,
      refunded: 'neutral' as const
    })[row.getValue('status') as string]

    return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => row.getValue('status'))
  }
}, {
  accessorKey: 'email',
  header: ({ column }) => {
    const isSorted = column.getIsSorted()

    return h(UButton, {
      color: 'neutral',
      variant: 'ghost',
      label: 'Email',
      icon: isSorted ? (isSorted === 'asc' ? 'i-lucide-arrow-up-narrow-wide' : 'i-lucide-arrow-down-wide-narrow') : 'i-lucide-arrow-up-down',
      class: '-mx-2.5',
      onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
    })
  }
}, {
  accessorKey: 'amount',
  header: () => h('div', { class: 'text-right' }, 'Amount'),
  cell: ({ row }) => {
    const amount = Number.parseFloat(row.getValue('amount'))

    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)

    return h('div', { class: 'text-right font-medium' }, formatted)
  }
}]

const sorting = ref([{
  id: 'email',
  desc: false
}])
</script>

<template>
  <UTable
    v-model:sorting="sorting"
    :data="data"
    :columns="columns"
    class="flex-1"
  />
</template>
```

<tip>

You can use the `sorting` prop to control the sorting state of the columns (can be binded with `v-model`).

</tip>

You can also create a reusable component to make any column header sortable.

```vue [TableColumnSortingReusableExample.vue]
<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Column } from '@tanstack/vue-table'

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const data = ref<Payment[]>([{
  id: '4600',
  date: '2024-03-11T15:30:00',
  status: 'paid',
  email: 'james.anderson@example.com',
  amount: 594
}, {
  id: '4599',
  date: '2024-03-11T10:10:00',
  status: 'failed',
  email: 'mia.white@example.com',
  amount: 276
}, {
  id: '4598',
  date: '2024-03-11T08:50:00',
  status: 'refunded',
  email: 'william.brown@example.com',
  amount: 315
}, {
  id: '4597',
  date: '2024-03-10T19:45:00',
  status: 'paid',
  email: 'emma.davis@example.com',
  amount: 529
}, {
  id: '4596',
  date: '2024-03-10T15:55:00',
  status: 'paid',
  email: 'ethan.harris@example.com',
  amount: 639
}])

const columns: TableColumn<Payment>[] = [{
  accessorKey: 'id',
  header: ({ column }) => getHeader(column, 'ID'),
  cell: ({ row }) => `#${row.getValue('id')}`
}, {
  accessorKey: 'date',
  header: ({ column }) => getHeader(column, 'Date'),
  cell: ({ row }) => {
    return new Date(row.getValue('date')).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
}, {
  accessorKey: 'status',
  header: ({ column }) => getHeader(column, 'Status'),
  cell: ({ row }) => {
    const color = ({
      paid: 'success' as const,
      failed: 'error' as const,
      refunded: 'neutral' as const
    })[row.getValue('status') as string]

    return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => row.getValue('status'))
  }
}, {
  accessorKey: 'email',
  header: ({ column }) => getHeader(column, 'Email')
}, {
  accessorKey: 'amount',
  header: ({ column }) => h('div', { class: 'text-right' }, getHeader(column, 'Amount')),
  cell: ({ row }) => {
    const amount = Number.parseFloat(row.getValue('amount'))

    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)

    return h('div', { class: 'text-right font-medium' }, formatted)
  }
}]

function getHeader(column: Column<Payment>, label: string) {
  const isSorted = column.getIsSorted()

  return h(UDropdownMenu, {
    'content': {
      align: 'start'
    },
    'aria-label': 'Actions dropdown',
    'items': [{
      label: 'Asc',
      type: 'checkbox',
      icon: 'i-lucide-arrow-up-narrow-wide',
      checked: isSorted === 'asc',
      onSelect: () => {
        if (isSorted === 'asc') {
          column.clearSorting()
        } else {
          column.toggleSorting(false)
        }
      }
    }, {
      label: 'Desc',
      icon: 'i-lucide-arrow-down-wide-narrow',
      type: 'checkbox',
      checked: isSorted === 'desc',
      onSelect: () => {
        if (isSorted === 'desc') {
          column.clearSorting()
        } else {
          column.toggleSorting(true)
        }
      }
    }]
  }, () => h(UButton, {
    'color': 'neutral',
    'variant': 'ghost',
    label,
    'icon': isSorted ? (isSorted === 'asc' ? 'i-lucide-arrow-up-narrow-wide' : 'i-lucide-arrow-down-wide-narrow') : 'i-lucide-arrow-up-down',
    'class': '-mx-2.5 data-[state=open]:bg-elevated',
    'aria-label': `Sort by ${isSorted === 'asc' ? 'descending' : 'ascending'}`
  }))
}

const sorting = ref([{
  id: 'id',
  desc: false
}])
</script>

<template>
  <UTable
    v-model:sorting="sorting"
    :data="data"
    :columns="columns"
    class="flex-1"
  />
</template>
```

<note>

In this example, we use a function to define the column header but you can also create an actual component.

</note>

### With column pinning

You can update a column `header` to render a [Button](/components/button) component inside the `header` to toggle the pinning state using the TanStack Table [Pinning APIs](https://tanstack.com/table/latest/docs/api/features/row-pinning).

<note>

A pinned column will become sticky on the left or right side of the table.

</note>

```vue [TableColumnPinningExample.vue]
<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Column } from '@tanstack/vue-table'

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const data = ref<Payment[]>([{
  id: '46000000000000000000000000000000000000000',
  date: '2024-03-11T15:30:00',
  status: 'paid',
  email: 'james.anderson@example.com',
  amount: 594000
}, {
  id: '45990000000000000000000000000000000000000',
  date: '2024-03-11T10:10:00',
  status: 'failed',
  email: 'mia.white@example.com',
  amount: 276000
}, {
  id: '45980000000000000000000000000000000000000',
  date: '2024-03-11T08:50:00',
  status: 'refunded',
  email: 'william.brown@example.com',
  amount: 315000
}, {
  id: '45970000000000000000000000000000000000000',
  date: '2024-03-10T19:45:00',
  status: 'paid',
  email: 'emma.davis@example.com',
  amount: 5290000
}, {
  id: '45960000000000000000000000000000000000000',
  date: '2024-03-10T15:55:00',
  status: 'paid',
  email: 'ethan.harris@example.com',
  amount: 639000
}])

const columns: TableColumn<Payment>[] = [{
  accessorKey: 'id',
  header: ({ column }) => getHeader(column, 'ID', 'left'),
  cell: ({ row }) => `#${row.getValue('id')}`
}, {
  accessorKey: 'date',
  header: ({ column }) => getHeader(column, 'Date', 'left')
}, {
  accessorKey: 'status',
  header: ({ column }) => getHeader(column, 'Status', 'left'),
  cell: ({ row }) => {
    const color = ({
      paid: 'success' as const,
      failed: 'error' as const,
      refunded: 'neutral' as const
    })[row.getValue('status') as string]

    return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => row.getValue('status'))
  }
}, {
  accessorKey: 'email',
  header: ({ column }) => getHeader(column, 'Email', 'left')
}, {
  accessorKey: 'amount',
  header: ({ column }) => h('div', { class: 'text-right' }, getHeader(column, 'Amount', 'right')),
  cell: ({ row }) => {
    const amount = Number.parseFloat(row.getValue('amount'))

    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)

    return h('div', { class: 'text-right font-medium' }, formatted)
  }
}]

function getHeader(column: Column<Payment>, label: string, position: 'left' | 'right') {
  const isPinned = column.getIsPinned()

  return h(UButton, {
    color: 'neutral',
    variant: 'ghost',
    label,
    icon: isPinned ? 'i-lucide-pin-off' : 'i-lucide-pin',
    class: '-mx-2.5',
    onClick() {
      column.pin(isPinned === position ? false : position)
    }
  })
}

const columnPinning = ref({
  left: [],
  right: ['amount']
})
</script>

<template>
  <UTable
    v-model:column-pinning="columnPinning"
    :data="data"
    :columns="columns"
    class="flex-1"
  />
</template>
```

<tip>

You can use the `column-pinning` prop to control the pinning state of the columns (can be binded with `v-model`).

</tip>

### With column visibility

You can use a [DropdownMenu](/components/dropdown-menu) component to toggle the visibility of the columns using the TanStack Table [Column Visibility APIs](https://tanstack.com/table/latest/docs/api/features/column-visibility).

```vue [TableColumnVisibilityExample.vue]
<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import { upperFirst } from 'scule'
import type { TableColumn } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const data = ref<Payment[]>([{
  id: '4600',
  date: '2024-03-11T15:30:00',
  status: 'paid',
  email: 'james.anderson@example.com',
  amount: 594
}, {
  id: '4599',
  date: '2024-03-11T10:10:00',
  status: 'failed',
  email: 'mia.white@example.com',
  amount: 276
}, {
  id: '4598',
  date: '2024-03-11T08:50:00',
  status: 'refunded',
  email: 'william.brown@example.com',
  amount: 315
}, {
  id: '4597',
  date: '2024-03-10T19:45:00',
  status: 'paid',
  email: 'emma.davis@example.com',
  amount: 529
}, {
  id: '4596',
  date: '2024-03-10T15:55:00',
  status: 'paid',
  email: 'ethan.harris@example.com',
  amount: 639
}])

const columns: TableColumn<Payment>[] = [{
  accessorKey: 'id',
  header: '#',
  cell: ({ row }) => `#${row.getValue('id')}`
}, {
  accessorKey: 'date',
  header: 'Date',
  cell: ({ row }) => {
    return new Date(row.getValue('date')).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
}, {
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }) => {
    const color = ({
      paid: 'success' as const,
      failed: 'error' as const,
      refunded: 'neutral' as const
    })[row.getValue('status') as string]

    return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => row.getValue('status'))
  }
}, {
  accessorKey: 'email',
  header: 'Email'
}, {
  accessorKey: 'amount',
  header: () => h('div', { class: 'text-right' }, 'Amount'),
  cell: ({ row }) => {
    const amount = Number.parseFloat(row.getValue('amount'))

    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)

    return h('div', { class: 'text-right font-medium' }, formatted)
  }
}]

const table = useTemplateRef('table')

const columnVisibility = ref({
  id: false
})
</script>

<template>
  <div class="flex flex-col flex-1 w-full">
    <div class="flex justify-end px-4 py-3.5 border-b  border-accented">
      <UDropdownMenu
        :items="table?.tableApi?.getAllColumns().filter(column => column.getCanHide()).map(column => ({
          label: upperFirst(column.id),
          type: 'checkbox' as const,
          checked: column.getIsVisible(),
          onUpdateChecked(checked: boolean) {
            table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
          },
          onSelect(e?: Event) {
            e?.preventDefault()
          }
        }))"
        :content="{ align: 'end' }"
      >
        <UButton
          label="Columns"
          color="neutral"
          variant="outline"
          trailing-icon="i-lucide-chevron-down"
        />
      </UDropdownMenu>
    </div>

    <UTable
      ref="table"
      v-model:column-visibility="columnVisibility"
      :data="data"
      :columns="columns"
    />
  </div>
</template>
```

<tip>

You can use the `column-visibility` prop to control the visibility state of the columns (can be binded with `v-model`).

</tip>

### With column filters

You can use an [Input](/components/input) component to filter per column the rows using the TanStack Table [Column Filtering APIs](https://tanstack.com/table/latest/docs/api/features/column-filtering).

```vue [TableColumnFiltersExample.vue]
<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const data = ref<Payment[]>([{
  id: '4600',
  date: '2024-03-11T15:30:00',
  status: 'paid',
  email: 'james.anderson@example.com',
  amount: 594
}, {
  id: '4599',
  date: '2024-03-11T10:10:00',
  status: 'failed',
  email: 'mia.white@example.com',
  amount: 276
}, {
  id: '4598',
  date: '2024-03-11T08:50:00',
  status: 'refunded',
  email: 'william.brown@example.com',
  amount: 315
}, {
  id: '4597',
  date: '2024-03-10T19:45:00',
  status: 'paid',
  email: 'emma.davis@example.com',
  amount: 529
}, {
  id: '4596',
  date: '2024-03-10T15:55:00',
  status: 'paid',
  email: 'ethan.harris@example.com',
  amount: 639
}])

const columns: TableColumn<Payment>[] = [{
  accessorKey: 'id',
  header: '#',
  cell: ({ row }) => `#${row.getValue('id')}`
}, {
  accessorKey: 'date',
  header: 'Date',
  cell: ({ row }) => {
    return new Date(row.getValue('date')).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
}, {
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }) => {
    const color = ({
      paid: 'success' as const,
      failed: 'error' as const,
      refunded: 'neutral' as const
    })[row.getValue('status') as string]

    return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => row.getValue('status'))
  }
}, {
  accessorKey: 'email',
  header: 'Email'
}, {
  accessorKey: 'amount',
  header: () => h('div', { class: 'text-right' }, 'Amount'),
  cell: ({ row }) => {
    const amount = Number.parseFloat(row.getValue('amount'))

    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)

    return h('div', { class: 'text-right font-medium' }, formatted)
  }
}]

const table = useTemplateRef('table')

const columnFilters = ref([{
  id: 'email',
  value: 'james'
}])
</script>

<template>
  <div class="flex flex-col flex-1 w-full">
    <div class="flex px-4 py-3.5 border-b border-accented">
      <UInput
        :model-value="(table?.tableApi?.getColumn('email')?.getFilterValue() as string)"
        class="max-w-sm"
        placeholder="Filter emails..."
        @update:model-value="table?.tableApi?.getColumn('email')?.setFilterValue($event)"
      />
    </div>

    <UTable
      ref="table"
      v-model:column-filters="columnFilters"
      :data="data"
      :columns="columns"
    />
  </div>
</template>
```

<tip>

You can use the `column-filters` prop to control the filters state of the columns (can be binded with `v-model`).

</tip>

### With global filter

You can use an [Input](/components/input) component to filter the rows using the TanStack Table [Global Filtering APIs](https://tanstack.com/table/latest/docs/api/features/global-filtering).

```vue [TableGlobalFilterExample.vue]
<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const data = ref<Payment[]>([{
  id: '4600',
  date: '2024-03-11T15:30:00',
  status: 'paid',
  email: 'james.anderson@example.com',
  amount: 594
}, {
  id: '4599',
  date: '2024-03-11T10:10:00',
  status: 'failed',
  email: 'mia.white@example.com',
  amount: 276
}, {
  id: '4598',
  date: '2024-03-11T08:50:00',
  status: 'refunded',
  email: 'william.brown@example.com',
  amount: 315
}, {
  id: '4597',
  date: '2024-03-10T19:45:00',
  status: 'paid',
  email: 'emma.davis@example.com',
  amount: 529
}, {
  id: '4596',
  date: '2024-03-10T15:55:00',
  status: 'paid',
  email: 'ethan.harris@example.com',
  amount: 639
}])

const columns: TableColumn<Payment>[] = [{
  accessorKey: 'id',
  header: '#',
  cell: ({ row }) => `#${row.getValue('id')}`
}, {
  accessorKey: 'date',
  header: 'Date',
  cell: ({ row }) => {
    return new Date(row.getValue('date')).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
}, {
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }) => {
    const color = ({
      paid: 'success' as const,
      failed: 'error' as const,
      refunded: 'neutral' as const
    })[row.getValue('status') as string]

    return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => row.getValue('status'))
  }
}, {
  accessorKey: 'email',
  header: 'Email'
}, {
  accessorKey: 'amount',
  header: () => h('div', { class: 'text-right' }, 'Amount'),
  cell: ({ row }) => {
    const amount = Number.parseFloat(row.getValue('amount'))

    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)

    return h('div', { class: 'text-right font-medium' }, formatted)
  }
}]

const globalFilter = ref('45')
</script>

<template>
  <div class="flex flex-col flex-1 w-full">
    <div class="flex px-4 py-3.5 border-b border-accented">
      <UInput
        v-model="globalFilter"
        class="max-w-sm"
        placeholder="Filter..."
      />
    </div>

    <UTable
      ref="table"
      v-model:global-filter="globalFilter"
      :data="data"
      :columns="columns"
    />
  </div>
</template>
```

<tip>

You can use the `global-filter` prop to control the global filter state (can be binded with `v-model`).

</tip>

### With pagination

You can use a [Pagination](/components/pagination) component to control the pagination state using the [Pagination APIs](https://tanstack.com/table/latest/docs/api/features/pagination).

There are different pagination approaches as explained in [Pagination Guide](https://tanstack.com/table/latest/docs/guide/pagination#pagination-guide). In this example, we use client-side pagination so we need to manually pass `getPaginationRowModel()` function.

```vue [TablePaginationExample.vue]
<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'

const table = useTemplateRef('table')

type Payment = {
  id: string
  date: string
  email: string
  amount: number
}
const data = ref<Payment[]>([{
  id: '4600',
  date: '2024-03-11T15:30:00',
  email: 'james.anderson@example.com',
  amount: 594
}, {
  id: '4599',
  date: '2024-03-11T10:10:00',
  email: 'mia.white@example.com',
  amount: 276
}, {
  id: '4598',
  date: '2024-03-11T08:50:00',
  email: 'william.brown@example.com',
  amount: 315
}, {
  id: '4597',
  date: '2024-03-10T19:45:00',
  email: 'emma.davis@example.com',
  amount: 529
}, {
  id: '4596',
  date: '2024-03-10T15:55:00',
  email: 'ethan.harris@example.com',
  amount: 639
}, {
  id: '4595',
  date: '2024-03-10T13:20:00',
  email: 'sophia.miller@example.com',
  amount: 428
}, {
  id: '4594',
  date: '2024-03-10T11:05:00',
  email: 'noah.wilson@example.com',
  amount: 673
}, {
  id: '4593',
  date: '2024-03-09T22:15:00',
  email: 'olivia.jones@example.com',
  amount: 382
}, {
  id: '4592',
  date: '2024-03-09T20:30:00',
  email: 'liam.taylor@example.com',
  amount: 547
}, {
  id: '4591',
  date: '2024-03-09T18:45:00',
  email: 'ava.thomas@example.com',
  amount: 291
}, {
  id: '4590',
  date: '2024-03-09T16:20:00',
  email: 'lucas.martin@example.com',
  amount: 624
}, {
  id: '4589',
  date: '2024-03-09T14:10:00',
  email: 'isabella.clark@example.com',
  amount: 438
}, {
  id: '4588',
  date: '2024-03-09T12:05:00',
  email: 'mason.rodriguez@example.com',
  amount: 583
}, {
  id: '4587',
  date: '2024-03-09T10:30:00',
  email: 'sophia.lee@example.com',
  amount: 347
}, {
  id: '4586',
  date: '2024-03-09T08:15:00',
  email: 'ethan.walker@example.com',
  amount: 692
}, {
  id: '4585',
  date: '2024-03-08T23:40:00',
  email: 'amelia.hall@example.com',
  amount: 419
}, {
  id: '4584',
  date: '2024-03-08T21:25:00',
  email: 'oliver.young@example.com',
  amount: 563
}, {
  id: '4583',
  date: '2024-03-08T19:50:00',
  email: 'aria.king@example.com',
  amount: 328
}, {
  id: '4582',
  date: '2024-03-08T17:35:00',
  email: 'henry.wright@example.com',
  amount: 647
}, {
  id: '4581',
  date: '2024-03-08T15:20:00',
  email: 'luna.lopez@example.com',
  amount: 482
}])
const columns: TableColumn<Payment>[] = [{
  accessorKey: 'id',
  header: '#',
  cell: ({ row }) => `#${row.getValue('id')}`
}, {
  accessorKey: 'date',
  header: 'Date',
  cell: ({ row }) => {
    return new Date(row.getValue('date')).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
}, {
  accessorKey: 'email',
  header: 'Email'
}, {
  accessorKey: 'amount',
  header: () => h('div', { class: 'text-right' }, 'Amount'),
  cell: ({ row }) => {
    const amount = Number.parseFloat(row.getValue('amount'))
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
    return h('div', { class: 'text-right font-medium' }, formatted)
  }
}]

const pagination = ref({
  pageIndex: 0,
  pageSize: 5
})
</script>

<template>
  <div class="w-full space-y-4 pb-4">
    <UTable
      ref="table"
      v-model:pagination="pagination"
      :data="data"
      :columns="columns"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
      }"
      class="flex-1"
    />

    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
        :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
      />
    </div>
  </div>
</template>
```

<tip>

You can use the `pagination` prop to control the pagination state (can be binded with `v-model`).

</tip>

### With fetched data

You can fetch data from an API and use them in the Table.

```vue [TableFetchExample.vue]
<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

const UAvatar = resolveComponent('UAvatar')

type User = {
  id: number
  name: string
  username: string
  email: string
  avatar: { src: string }
  company: { name: string }
}

const { data, status } = await useFetch<User[]>('https://jsonplaceholder.typicode.com/users', {
  key: 'table-users',
  transform: (data) => {
    return data?.map(user => ({
      ...user,
      avatar: { src: `https://i.pravatar.cc/120?img=${user.id}`, alt: `${user.name} avatar` }
    })) || []
  },
  lazy: true
})

const columns: TableColumn<User>[] = [{
  accessorKey: 'id',
  header: 'ID'
}, {
  accessorKey: 'name',
  header: 'Name',
  cell: ({ row }) => {
    return h('div', { class: 'flex items-center gap-3' }, [
      h(UAvatar, {
        ...row.original.avatar,
        size: 'lg'
      }),
      h('div', undefined, [
        h('p', { class: 'font-medium text-highlighted' }, row.original.name),
        h('p', { class: '' }, `@${row.original.username}`)
      ])
    ])
  }
}, {
  accessorKey: 'email',
  header: 'Email'
}, {
  accessorKey: 'company',
  header: 'Company',
  cell: ({ row }) => row.original.company.name
}]
</script>

<template>
  <UTable :data="data" :columns="columns" :loading="status === 'pending'" class="flex-1" />
</template>
```

### With infinite scroll

If you use server-side pagination, you can use the [`useInfiniteScroll`](https://vueuse.org/core/useInfiniteScroll/#useinfinitescroll) composable to load more data when scrolling.

```vue [TableInfiniteScrollExample.vue]
<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { useInfiniteScroll } from '@vueuse/core'

const UAvatar = resolveComponent('UAvatar')

type User = {
  id: number
  firstName: string
  username: string
  email: string
  image: string
}

type UserResponse = {
  users: User[]
  total: number
  skip: number
  limit: number
}

const skip = ref(0)

const { data, status, execute } = await useFetch('https://dummyjson.com/users?limit=10&select=firstName,username,email,image', {
  key: 'table-users-infinite-scroll',
  params: { skip },
  transform: (data?: UserResponse) => {
    return data?.users
  },
  lazy: true,
  immediate: false
})

const columns: TableColumn<User>[] = [{
  accessorKey: 'id',
  header: 'ID'
}, {
  accessorKey: 'image',
  header: 'Avatar',
  cell: ({ row }) => h(UAvatar, { src: row.original.image })
}, {
  accessorKey: 'firstName',
  header: 'First name'
}, {
  accessorKey: 'email',
  header: 'Email'
}, {
  accessorKey: 'username',
  header: 'Username'
}]

const users = ref<User[]>([])

watch(data, () => {
  users.value = [
    ...users.value,
    ...(data.value || [])
  ]
})

execute()

const table = useTemplateRef<ComponentPublicInstance>('table')

onMounted(() => {
  useInfiniteScroll(table.value?.$el, () => {
    skip.value += 10
  }, {
    distance: 200,
    canLoadMore: () => {
      return status.value !== 'pending'
    }
  })
})
</script>

<template>
  <div class="w-full">
    <UTable
      ref="table"
      :data="users"
      :columns="columns"
      :loading="status === 'pending'"
      sticky
      class="flex-1 h-80"
    />
  </div>
</template>
```

### With drag and drop

Use the [`useSortable`](https://vueuse.org/integrations/useSortable/) composable from [`@vueuse/integrations`](https://vueuse.org/integrations/README.html) to enable drag and drop functionality on the Table. This integration wraps [Sortable.js](https://sortablejs.github.io/Sortable/) to provide a seamless drag and drop experience.

<note>

Since the table ref doesn't expose the tbody element, add a unique class to it via the `:ui` prop to target it with `useSortable` (e.g. `:ui="{ tbody: 'my-table-tbody' }"`).

</note>

```vue [TableDragAndDropExample.vue]
<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { useSortable } from '@vueuse/integrations/useSortable.mjs'

type Payment = {
  id: string
  date: string
  email: string
  amount: number
}

const data = ref<Payment[]>([{
  id: '4600',
  date: '2024-03-11T15:30:00',
  email: 'james.anderson@example.com',
  amount: 594
}, {
  id: '4599',
  date: '2024-03-11T10:10:00',
  email: 'mia.white@example.com',
  amount: 276
}, {
  id: '4598',
  date: '2024-03-11T08:50:00',
  email: 'william.brown@example.com',
  amount: 315
}, {
  id: '4597',
  date: '2024-03-10T19:45:00',
  email: 'emma.davis@example.com',
  amount: 529
}])

const columns: TableColumn<Payment>[] = [{
  accessorKey: 'id',
  header: '#',
  cell: ({ row }) => `#${row.getValue('id')}`
}, {
  accessorKey: 'date',
  header: 'Date',
  cell: ({ row }) => {
    return new Date(row.getValue('date')).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
}, {
  accessorKey: 'email',
  header: 'Email'
}, {
  accessorKey: 'amount',
  header: () => h('div', { class: 'text-right' }, 'Amount'),
  cell: ({ row }) => {
    const amount = Number.parseFloat(row.getValue('amount'))
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
    return h('div', { class: 'text-right font-medium' }, formatted)
  }
}]

useSortable('.my-table-tbody', data, {
  animation: 150
})
</script>

<template>
  <div class="w-full">
    <UTable
      ref="table"
      :data="data"
      :columns="columns"
      :ui="{
        tbody: 'my-table-tbody'
      }"
    />
  </div>
</template>
```

### With slots

You can use slots to customize the header and data cells of the table.

Use the `#<column>-header` slot to customize the header of a column. You will have access to the `column`, `header` and `table` properties in the slot scope.

Use the `#<column>-cell` slot to customize the cell of a column. You will have access to the `cell`, `column`, `getValue`, `renderValue`, `row`, and `table` properties in the slot scope.

```vue [TableSlotsExample.vue]
<script setup lang="ts">
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
import { useClipboard } from '@vueuse/core'

interface User {
  id: number
  name: string
  position: string
  email: string
  role: string
}

const toast = useToast()
const { copy } = useClipboard()

const data = ref<User[]>([{
  id: 1,
  name: 'Lindsay Walton',
  position: 'Front-end Developer',
  email: 'lindsay.walton@example.com',
  role: 'Member'
}, {
  id: 2,
  name: 'Courtney Henry',
  position: 'Designer',
  email: 'courtney.henry@example.com',
  role: 'Admin'
}, {
  id: 3,
  name: 'Tom Cook',
  position: 'Director of Product',
  email: 'tom.cook@example.com',
  role: 'Member'
}, {
  id: 4,
  name: 'Whitney Francis',
  position: 'Copywriter',
  email: 'whitney.francis@example.com',
  role: 'Admin'
}, {
  id: 5,
  name: 'Leonard Krasner',
  position: 'Senior Designer',
  email: 'leonard.krasner@example.com',
  role: 'Owner'
}, {
  id: 6,
  name: 'Floyd Miles',
  position: 'Principal Designer',
  email: 'floyd.miles@example.com',
  role: 'Member'
}])

const columns: TableColumn<User>[] = [{
  accessorKey: 'id',
  header: 'ID'
}, {
  accessorKey: 'name',
  header: 'Name'
}, {
  accessorKey: 'email',
  header: 'Email'
}, {
  accessorKey: 'role',
  header: 'Role'
}, {
  id: 'action'
}]

function getDropdownActions(user: User): DropdownMenuItem[][] {
  return [
    [{
      label: 'Copy user Id',
      icon: 'i-lucide-copy',
      onSelect: () => {
        copy(user.id.toString())

        toast.add({
          title: 'User ID copied to clipboard!',
          color: 'success',
          icon: 'i-lucide-circle-check'
        })
      }
    }],
    [{
      label: 'Edit',
      icon: 'i-lucide-edit'
    }, {
      label: 'Delete',
      icon: 'i-lucide-trash',
      color: 'error'
    }]
  ]
}
</script>

<template>
  <UTable :data="data" :columns="columns" class="flex-1">
    <template #name-cell="{ row }">
      <div class="flex items-center gap-3">
        <UAvatar :src="`https://i.pravatar.cc/120?img=${row.original.id}`" size="lg" :alt="`${row.original.name} avatar`" />
        <div>
          <p class="font-medium text-highlighted">
            {{ row.original.name }}
          </p>
          <p>
            {{ row.original.position }}
          </p>
        </div>
      </div>
    </template>
    <template #action-cell="{ row }">
      <UDropdownMenu :items="getDropdownActions(row.original)">
        <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" aria-label="Actions" />
      </UDropdownMenu>
    </template>
  </UTable>
</template>
```

## API

### Props

```ts
/**
 * Props for the Table component
 */
interface TableProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  data?: unknown[] | undefined;
  columns?: TableColumn<unknown, unknown>[] | undefined;
  caption?: string | undefined;
  /**
   * You can pass any object to `options.meta` and access it anywhere the `table` is available via `table.options.meta`.
   */
  meta?: TableMeta<unknown> | undefined;
  /**
   * The text to display when the table is empty.
   */
  empty?: string | undefined;
  /**
   * Whether the table should have a sticky header or footer. True for both, 'header' for header only, 'footer' for footer only.
   */
  sticky?: boolean | "header" | "footer" | undefined;
  /**
   * Whether the table should be in loading state.
   */
  loading?: boolean | undefined;
  loadingColor?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined;
  loadingAnimation?: "carousel" | "carousel-inverse" | "swing" | "elastic" | undefined;
  /**
   * Use the `watchOptions` prop to customize reactivity (for ex: disable deep watching for changes in your data or limiting the max traversal depth). This can improve performance by reducing unnecessary re-renders, but it should be used with caution as it may lead to unexpected behavior if not managed properly.
   * @default "{
    deep: true
}"
   */
  watchOptions?: WatchOptions<boolean> | undefined;
  globalFilterOptions?: Omit<GlobalFilterOptions<unknown>, "onGlobalFilterChange"> | undefined;
  columnFiltersOptions?: Omit<ColumnFiltersOptions<unknown>, "getFilteredRowModel" | "onColumnFiltersChange"> | undefined;
  columnPinningOptions?: Omit<ColumnPinningOptions, "onColumnPinningChange"> | undefined;
  columnSizingOptions?: Omit<ColumnSizingOptions, "onColumnSizingChange" | "onColumnSizingInfoChange"> | undefined;
  visibilityOptions?: Omit<VisibilityOptions, "onColumnVisibilityChange"> | undefined;
  sortingOptions?: Omit<SortingOptions<unknown>, "getSortedRowModel" | "onSortingChange"> | undefined;
  groupingOptions?: Omit<GroupingOptions, "onGroupingChange"> | undefined;
  expandedOptions?: Omit<ExpandedOptions<unknown>, "getExpandedRowModel" | "onExpandedChange"> | undefined;
  rowSelectionOptions?: Omit<RowSelectionOptions<unknown>, "onRowSelectionChange"> | undefined;
  rowPinningOptions?: Omit<RowPinningOptions<unknown>, "onRowPinningChange"> | undefined;
  paginationOptions?: Omit<PaginationOptions, "onPaginationChange"> | undefined;
  facetedOptions?: FacetedOptions<unknown> | undefined;
  onSelect?: ((row: TableRow<unknown>, e?: Event | undefined) => void) | undefined;
  onHover?: ((e: Event, row: TableRow<unknown> | null) => void) | undefined;
  onContextmenu?: ((e: Event, row: TableRow<unknown>) => void) | ((e: Event, row: TableRow<unknown>) => void)[] | undefined;
  ui?: { root?: ClassNameValue; base?: ClassNameValue; caption?: ClassNameValue; thead?: ClassNameValue; tbody?: ClassNameValue; tfoot?: ClassNameValue; tr?: ClassNameValue; th?: ClassNameValue; td?: ClassNameValue; separator?: ClassNameValue; empty?: ClassNameValue; loading?: ClassNameValue; } | undefined;
  state?: Partial<TableState> | undefined;
  onStateChange?: ((updater: Updater<TableState>) => void) | undefined;
  renderFallbackValue?: any;
  /**
   * An array of extra features that you can add to the table instance.
   */
  _features?: TableFeature<any>[] | undefined;
  /**
   * Set this option to override any of the `autoReset...` feature options.
   */
  autoResetAll?: boolean | undefined;
  /**
   * Set this option to `true` to output all debugging information to the console.
   */
  debugAll?: boolean | undefined;
  /**
   * Set this option to `true` to output cell debugging information to the console.
   */
  debugCells?: boolean | undefined;
  /**
   * Set this option to `true` to output column debugging information to the console.
   */
  debugColumns?: boolean | undefined;
  /**
   * Set this option to `true` to output header debugging information to the console.
   */
  debugHeaders?: boolean | undefined;
  /**
   * Set this option to `true` to output row debugging information to the console.
   */
  debugRows?: boolean | undefined;
  /**
   * Set this option to `true` to output table debugging information to the console.
   */
  debugTable?: boolean | undefined;
  /**
   * Default column options to use for all column defs supplied to the table.
   */
  defaultColumn?: Partial<ColumnDef<unknown, unknown>> | undefined;
  /**
   * This optional function is used to derive a unique ID for any given row. If not provided the rows index is used (nested rows join together with `.` using their grandparents' index eg. `index.index.index`). If you need to identify individual rows that are originating from any server-side operations, it's suggested you use this function to return an ID that makes sense regardless of network IO/ambiguity eg. a userId, taskId, database ID field, etc.
   */
  getRowId?: ((originalRow: unknown, index: number, parent?: Row<unknown> | undefined) => string) | undefined;
  /**
   * This optional function is used to access the sub rows for any given row. If you are using nested rows, you will need to use this function to return the sub rows object (or undefined) from the row.
   */
  getSubRows?: ((originalRow: unknown, index: number) => unknown[] | undefined) | undefined;
  /**
   * Use this option to optionally pass initial state to the table. This state will be used when resetting various table states either automatically by the table (eg. `options.autoResetPageIndex`) or via functions like `table.resetRowSelection()`. Most reset function allow you optionally pass a flag to reset to a blank/default state instead of the initial state.
   * 
   * Table state will not be reset when this object changes, which also means that the initial state object does not need to be stable.
   */
  initialState?: InitialTableState | undefined;
  /**
   * This option is used to optionally implement the merging of table options.
   */
  mergeOptions?: ((defaultOptions: TableOptions<unknown>, options: Partial<TableOptions<unknown>>) => TableOptions<unknown>) | undefined;
  /**
   * @default "undefined"
   */
  globalFilter?: string | undefined;
  /**
   * @default "[]"
   */
  columnFilters?: ColumnFiltersState | undefined;
  /**
   * @default "[]"
   */
  columnOrder?: ColumnOrderState | undefined;
  /**
   * @default "{}"
   */
  columnVisibility?: VisibilityState | undefined;
  /**
   * @default "{}"
   */
  columnPinning?: ColumnPinningState | undefined;
  /**
   * @default "{}"
   */
  columnSizing?: ColumnSizingState | undefined;
  /**
   * @default "{}"
   */
  columnSizingInfo?: ColumnSizingInfoState | undefined;
  /**
   * @default "{}"
   */
  rowSelection?: RowSelectionState | undefined;
  /**
   * @default "{}"
   */
  rowPinning?: RowPinningState | undefined;
  /**
   * @default "[]"
   */
  sorting?: SortingState | undefined;
  /**
   * @default "[]"
   */
  grouping?: GroupingState | undefined;
  /**
   * @default "{}"
   */
  expanded?: ExpandedState | undefined;
  /**
   * @default "{}"
   */
  pagination?: PaginationState | undefined;
}
```

### Slots

```ts
/**
 * Slots for the Table component
 */
interface TableSlots {
  expanded(): any;
  empty(): any;
  loading(): any;
  caption(): any;
  body-top(): any;
  body-bottom(): any;
}
```

### Expose

You can access the typed component instance using [`useTemplateRef`](https://vuejs.org/api/composition-api-helpers.html#usetemplateref).

```vue
<script setup lang="ts">
const table = useTemplateRef('table')
</script>

<template>
  <UTable ref="table" />
</template>
```

This will give you access to the following:

<table>
<thead>
  <tr>
    <th>
      Name
    </th>
    
    <th>
      Type
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code className="language-ts-type shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts-type" style="">
        <span class="sBMFI">
          tableRef
        </span>
      </code>
    </td>
    
    <td>
      <code className="language-ts-type shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts-type" style="">
        <span class="sBMFI">
          Ref
        </span>
        
        <span class="sMK4o">
          <
        </span>
        
        <span class="sBMFI">
          HTMLTableElement
        </span>
        
        <span class="sMK4o">
          |
        </span>
        
        <span class="sBMFI">
          null
        </span>
        
        <span class="sMK4o">
          >
        </span>
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code className="language-ts-type shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts-type" style="">
        <span class="sBMFI">
          tableApi
        </span>
      </code>
    </td>
    
    <td>
      <a href="https://tanstack.com/table/latest/docs/api/core/table#table-api" rel="nofollow">
        <code className="language-ts-type shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts-type" style="">
          <span class="sBMFI">
            Ref
          </span>
          
          <span class="sMK4o">
            <
          </span>
          
          <span class="sBMFI">
            Table
          </span>
          
          <span class="sMK4o">
            |
          </span>
          
          <span class="sBMFI">
            null
          </span>
          
          <span class="sMK4o">
            >
          </span>
        </code>
      </a>
    </td>
  </tr>
</tbody>
</table>

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    table: {
      slots: {
        root: 'relative overflow-auto',
        base: 'min-w-full overflow-clip',
        caption: 'sr-only',
        thead: 'relative',
        tbody: 'divide-y divide-default [&>tr]:data-[selectable=true]:hover:bg-elevated/50 [&>tr]:data-[selectable=true]:focus-visible:outline-primary',
        tfoot: 'relative',
        tr: 'data-[selected=true]:bg-elevated/50',
        th: 'px-4 py-3.5 text-sm text-highlighted text-left rtl:text-right font-semibold [&:has([role=checkbox])]:pe-0',
        td: 'p-4 text-sm text-muted whitespace-nowrap [&:has([role=checkbox])]:pe-0',
        separator: 'absolute z-[1] left-0 w-full h-px bg-(--ui-border-accented)',
        empty: 'py-6 text-center text-sm text-muted',
        loading: 'py-6 text-center'
      },
      variants: {
        pinned: {
          true: {
            th: 'sticky bg-default/75 data-[pinned=left]:left-0 data-[pinned=right]:right-0',
            td: 'sticky bg-default/75 data-[pinned=left]:left-0 data-[pinned=right]:right-0'
          }
        },
        sticky: {
          true: {
            thead: 'sticky top-0 inset-x-0 bg-default/75 z-[1] backdrop-blur',
            tfoot: 'sticky bottom-0 inset-x-0 bg-default/75 z-[1] backdrop-blur'
          },
          header: {
            thead: 'sticky top-0 inset-x-0 bg-default/75 z-[1] backdrop-blur'
          },
          footer: {
            tfoot: 'sticky bottom-0 inset-x-0 bg-default/75 z-[1] backdrop-blur'
          }
        },
        loading: {
          true: {
            thead: 'after:absolute after:z-[1] after:h-px'
          }
        },
        loadingAnimation: {
          carousel: '',
          'carousel-inverse': '',
          swing: '',
          elastic: ''
        },
        loadingColor: {
          primary: '',
          secondary: '',
          success: '',
          info: '',
          warning: '',
          error: '',
          neutral: ''
        }
      },
      compoundVariants: [
        {
          loading: true,
          loadingColor: 'primary',
          class: {
            thead: 'after:bg-primary'
          }
        },
        {
          loading: true,
          loadingColor: 'secondary',
          class: {
            thead: 'after:bg-secondary'
          }
        },
        {
          loading: true,
          loadingColor: 'success',
          class: {
            thead: 'after:bg-success'
          }
        },
        {
          loading: true,
          loadingColor: 'info',
          class: {
            thead: 'after:bg-info'
          }
        },
        {
          loading: true,
          loadingColor: 'warning',
          class: {
            thead: 'after:bg-warning'
          }
        },
        {
          loading: true,
          loadingColor: 'error',
          class: {
            thead: 'after:bg-error'
          }
        },
        {
          loading: true,
          loadingColor: 'neutral',
          class: {
            thead: 'after:bg-inverted'
          }
        },
        {
          loading: true,
          loadingAnimation: 'carousel',
          class: {
            thead: 'after:animate-[carousel_2s_ease-in-out_infinite] rtl:after:animate-[carousel-rtl_2s_ease-in-out_infinite]'
          }
        },
        {
          loading: true,
          loadingAnimation: 'carousel-inverse',
          class: {
            thead: 'after:animate-[carousel-inverse_2s_ease-in-out_infinite] rtl:after:animate-[carousel-inverse-rtl_2s_ease-in-out_infinite]'
          }
        },
        {
          loading: true,
          loadingAnimation: 'swing',
          class: {
            thead: 'after:animate-[swing_2s_ease-in-out_infinite]'
          }
        },
        {
          loading: true,
          loadingAnimation: 'elastic',
          class: {
            thead: 'after:animate-[elastic_2s_ease-in-out_infinite]'
          }
        }
      ],
      defaultVariants: {
        loadingColor: 'primary',
        loadingAnimation: 'carousel'
      }
    }
  }
})
```
