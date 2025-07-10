# Select

> A select element to choose from a list of options.

## Usage

Use the `v-model` directive to control the value of the Select or the `default-value` prop to set the initial value when you do not need to control its state.

### Items

Use the `items` prop as an array of strings, numbers or booleans:

```vue
<script setup lang="ts">
const items = ref<undefined>([
  'Backlog',
  'Todo',
  'In Progress',
  'Done',
])
</script>

<template>
  <USelect model-value="Backlog" class="w-48" :items="items" />
</template>
```

You can also pass an array of objects with the following properties:

- `label?: string`
- [`value?: string`](#value-key)
- [`type?: "label" | "separator" | "item"`](#with-items-type)
- [`icon?: string`](#with-icons-in-items)
- [`avatar?: AvatarProps`](#with-avatar-in-items)
- [`chip?: ChipProps`](#with-chip-in-items)
- `disabled?: boolean`
- `class?: any`
- `ui?: { label?: ClassNameValue, separator?: ClassNameValue, item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLeadingChipSize?: ClassNameValue, itemLeadingChip?: ClassNameValue, itemLabel?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingIcon?: ClassNameValue }`

```vue
<script setup lang="ts">
const items = ref<undefined>([
  {
    label: 'Backlog',
    value: 'backlog',
  },
  {
    label: 'Todo',
    value: 'todo',
  },
  {
    label: 'In Progress',
    value: 'in_progress',
  },
  {
    label: 'Done',
    value: 'done',
  },
])
</script>

<template>
  <USelect model-value="backlog" class="w-48" :items="items" />
</template>
```

<caution>

When using objects, you need to reference the `value` property of the object in the `v-model` directive or the `default-value` prop.

</caution>

You can also pass an array of arrays to the `items` prop to display separated groups of items.

```vue
<script setup lang="ts">
const items = ref<undefined>([
  [
    'Apple',
    'Banana',
    'Blueberry',
    'Grapes',
    'Pineapple',
  ],
  [
    'Aubergine',
    'Broccoli',
    'Carrot',
    'Courgette',
    'Leek',
  ],
])
</script>

<template>
  <USelect model-value="Apple" class="w-48" :items="items" />
</template>
```

### Value Key

You can change the property that is used to set the value by using the `value-key` prop. Defaults to `value`.

```vue
<script setup lang="ts">
const items = ref<undefined>([
  {
    label: 'Backlog',
    id: 'backlog',
  },
  {
    label: 'Todo',
    id: 'todo',
  },
  {
    label: 'In Progress',
    id: 'in_progress',
  },
  {
    label: 'Done',
    id: 'done',
  },
])
</script>

<template>
  <USelect model-value="backlog" value-key="id" class="w-48" :items="items" />
</template>
```

### Multiple

Use the `multiple` prop to allow multiple selections, the selected items will be separated by a comma in the trigger.

```vue
<script setup lang="ts">
const items = ref<undefined>([
  'Backlog',
  'Todo',
  'In Progress',
  'Done',
])
</script>

<template>
  <USelect multiple class="w-48" :items="items" />
</template>
```

<caution>

Ensure to pass an array to the `default-value` prop or the `v-model` directive.

</caution>

### Placeholder

Use the `placeholder` prop to set a placeholder text.

```vue
<script setup lang="ts">
const items = ref<undefined>([
  'Backlog',
  'Todo',
  'In Progress',
  'Done',
])
</script>

<template>
  <USelect placeholder="Select status" class="w-48" :items="items" />
</template>
```

### Content

Use the `content` prop to control how the Select content is rendered, like its `align` or `side` for example.

```vue
<script setup lang="ts">
const items = ref<undefined>([
  'Backlog',
  'Todo',
  'In Progress',
  'Done',
])
</script>

<template>
  <USelect model-value="Backlog" class="w-48" :items="items" />
</template>
```

### Arrow

Use the `arrow` prop to display an arrow on the Select.

```vue
<script setup lang="ts">
const items = ref<undefined>([
  'Backlog',
  'Todo',
  'In Progress',
  'Done',
])
</script>

<template>
  <USelect model-value="Backlog" arrow class="w-48" :items="items" />
</template>
```

### Color

Use the `color` prop to change the ring color when the Select is focused.

```vue
<script setup lang="ts">
const items = ref<undefined>([
  'Backlog',
  'Todo',
  'In Progress',
  'Done',
])
</script>

<template>
  <USelect model-value="Backlog" color="neutral" highlight class="w-48" :items="items" />
</template>
```

<note>

The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.

</note>

### Variant

Use the `variant` prop to change the variant of the Select.

```vue
<script setup lang="ts">
const items = ref<undefined>([
  'Backlog',
  'Todo',
  'In Progress',
  'Done',
])
</script>

<template>
  <USelect model-value="Backlog" color="neutral" variant="subtle" :highlight="false" class="w-48" :items="items" />
</template>
```

### Size

Use the `size` prop to change the size of the Select.

```vue
<script setup lang="ts">
const items = ref<undefined>([
  'Backlog',
  'Todo',
  'In Progress',
  'Done',
])
</script>

<template>
  <USelect model-value="Backlog" size="xl" class="w-48" :items="items" />
</template>
```

### Icon

Use the `icon` prop to show an [Icon](/components/icon) inside the Select.

```vue
<script setup lang="ts">
const items = ref<undefined>([
  'Backlog',
  'Todo',
  'In Progress',
  'Done',
])
</script>

<template>
  <USelect model-value="Backlog" icon="i-lucide-search" size="md" class="w-48" :items="items" />
</template>
```

### Trailing Icon

Use the `trailing-icon` prop to customize the trailing [Icon](/components/icon). Defaults to `i-lucide-chevron-down`.

```vue
<script setup lang="ts">
const items = ref<undefined>([
  'Backlog',
  'Todo',
  'In Progress',
  'Done',
])
</script>

<template>
  <USelect model-value="Backlog" trailing-icon="i-lucide-arrow-down" size="md" class="w-48" :items="items" />
</template>
```

<framework-only>
<template v-slot:nuxt="">
<tip to="/getting-started/icons/nuxt#theme">

You can customize this icon globally in your `app.config.ts` under `ui.icons.chevronDown` key.

</tip>
</template>

<template v-slot:vue="">
<tip to="/getting-started/icons/vue#theme">

You can customize this icon globally in your `vite.config.ts` under `ui.icons.chevronDown` key.

</tip>
</template>
</framework-only>

### Selected Icon

Use the `selected-icon` prop to customize the icon when an item is selected. Defaults to `i-lucide-check`.

```vue
<script setup lang="ts">
const items = ref<undefined>([
  'Backlog',
  'Todo',
  'In Progress',
  'Done',
])
</script>

<template>
  <USelect model-value="Backlog" selected-icon="i-lucide-flame" size="md" class="w-48" :items="items" />
</template>
```

<framework-only>
<template v-slot:nuxt="">
<tip to="/getting-started/icons/nuxt#theme">

You can customize this icon globally in your `app.config.ts` under `ui.icons.check` key.

</tip>
</template>

<template v-slot:vue="">
<tip to="/getting-started/icons/vue#theme">

You can customize this icon globally in your `vite.config.ts` under `ui.icons.check` key.

</tip>
</template>
</framework-only>

### Avatar

Use the `avatar` prop to show an [Avatar](/components/avatar) inside the Select.

```vue
<script setup lang="ts">
const items = ref<undefined>([
  'Nuxt',
  'NuxtHub',
  'NuxtLabs',
  'Nuxt Modules',
  'Nuxt Community',
])
</script>

<template>
  <USelect model-value="Nuxt" class="w-48" :items="items" />
</template>
```

### Loading

Use the `loading` prop to show a loading icon on the Select.

```vue
<script setup lang="ts">
const items = ref<undefined>([
  'Backlog',
  'Todo',
  'In Progress',
  'Done',
])
</script>

<template>
  <USelect model-value="Backlog" loading :trailing="false" class="w-48" :items="items" />
</template>
```

### Loading Icon

Use the `loading-icon` prop to customize the loading icon. Defaults to `i-lucide-loader-circle`.

```vue
<script setup lang="ts">
const items = ref<undefined>([
  'Backlog',
  'Todo',
  'In Progress',
  'Done',
])
</script>

<template>
  <USelect model-value="Backlog" loading loading-icon="i-lucide-loader" class="w-48" :items="items" />
</template>
```

<framework-only>
<template v-slot:nuxt="">
<tip to="/getting-started/icons/nuxt#theme">

You can customize this icon globally in your `app.config.ts` under `ui.icons.loading` key.

</tip>
</template>

<template v-slot:vue="">
<tip to="/getting-started/icons/vue#theme">

You can customize this icon globally in your `vite.config.ts` under `ui.icons.loading` key.

</tip>
</template>
</framework-only>

### Disabled

Use the `disabled` prop to disable the Select.

```vue
<script setup lang="ts">
const items = ref<undefined>([
  'Backlog',
  'Todo',
  'In Progress',
  'Done',
])
</script>

<template>
  <USelect disabled placeholder="Select status" class="w-48" :items="items" />
</template>
```

## Examples

### With items type

You can use the `type` property with `separator` to display a separator between items or `label` to display a label.

```vue
<script setup lang="ts">
const items = ref<undefined>([
  {
    type: 'label',
    label: 'Fruits',
  },
  'Apple',
  'Banana',
  'Blueberry',
  'Grapes',
  'Pineapple',
  {
    type: 'separator',
  },
  {
    type: 'label',
    label: 'Vegetables',
  },
  'Aubergine',
  'Broccoli',
  'Carrot',
  'Courgette',
  'Leek',
])
</script>

<template>
  <USelect model-value="Apple" class="w-48" :items="items" />
</template>
```

### With icon in items

You can use the `icon` property to display an [Icon](/components/icon) inside the items.

```vue [SelectItemsIconExample.vue]
<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'

const items = ref([
  {
    label: 'Backlog',
    value: 'backlog',
    icon: 'i-lucide-circle-help'
  },
  {
    label: 'Todo',
    value: 'todo',
    icon: 'i-lucide-circle-plus'
  },
  {
    label: 'In Progress',
    value: 'in_progress',
    icon: 'i-lucide-circle-arrow-up'
  },
  {
    label: 'Done',
    value: 'done',
    icon: 'i-lucide-circle-check'
  }
] satisfies SelectItem[])

const value = ref(items.value[0]?.value)

const icon = computed(() => items.value.find(item => item.value === value.value)?.icon)
</script>

<template>
  <USelect v-model="value" :items="items" value-key="value" :icon="icon" class="w-48" />
</template>
```

<note>

In this example, the icon is computed from the `value` property of the selected item.

</note>

<tip>

You can also use the `#leading` slot to display the selected icon.

</tip>

### With avatar in items

You can use the `avatar` property to display an [Avatar](/components/avatar) inside the items.

```vue [SelectItemsAvatarExample.vue]
<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'

const items = ref([
  {
    label: 'benjamincanac',
    value: 'benjamincanac',
    avatar: {
      src: 'https://github.com/benjamincanac.png',
      alt: 'benjamincanac'
    }
  },
  {
    label: 'romhml',
    value: 'romhml',
    avatar: {
      src: 'https://github.com/romhml.png',
      alt: 'romhml'
    }
  },
  {
    label: 'noook',
    value: 'noook',
    avatar: {
      src: 'https://github.com/noook.png',
      alt: 'noook'
    }
  },
  {
    label: 'sandros94',
    value: 'sandros94',
    avatar: {
      src: 'https://github.com/sandros94.png',
      alt: 'sandros94'
    }
  }
] satisfies SelectItem[])

const value = ref(items.value[0]?.value)

const avatar = computed(() => items.value.find(item => item.value === value.value)?.avatar)
</script>

<template>
  <USelect v-model="value" :items="items" value-key="value" :avatar="avatar" class="w-48" />
</template>
```

<note>

In this example, the avatar is computed from the `value` property of the selected item.

</note>

<tip>

You can also use the `#leading` slot to display the selected avatar.

</tip>

### With chip in items

You can use the `chip` property to display a [Chip](/components/chip) inside the items.

```vue [SelectItemsChipExample.vue]
<script setup lang="ts">
import type { SelectItem, ChipProps } from '@nuxt/ui'

const items = ref([
  {
    label: 'bug',
    value: 'bug',
    chip: {
      color: 'error'
    }
  },
  {
    label: 'feature',
    value: 'feature',
    chip: {
      color: 'success'
    }
  },
  {
    label: 'enhancement',
    value: 'enhancement',
    chip: {
      color: 'info'
    }
  }
] satisfies SelectItem[])

const value = ref(items.value[0]?.value)

function getChip(value: string) {
  return items.value.find(item => item.value === value)?.chip
}
</script>

<template>
  <USelect v-model="value" :items="items" value-key="value" class="w-48">
    <template #leading="{ modelValue, ui }">
      <UChip
        v-if="modelValue"
        v-bind="getChip(modelValue)"
        inset
        standalone
        :size="(ui.itemLeadingChipSize() as ChipProps['size'])"
        :class="ui.itemLeadingChip()"
      />
    </template>
  </USelect>
</template>
```

<note>

In this example, the `#leading` slot is used to display the selected chip.

</note>

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

```vue [SelectOpenExample.vue]
<script setup lang="ts">
const open = ref(false)
const items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const value = ref('Backlog')

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <USelect v-model="value" v-model:open="open" :items="items" class="w-48" />
</template>
```

<note>

In this example, leveraging [`defineShortcuts`](/composables/define-shortcuts), you can toggle the Select by pressing <kbd value="O">



</kbd>

.

</note>

### With rotating icon

Here is an example with a rotating icon that indicates the open state of the Select.

```vue [SelectIconExample.vue]
<script setup lang="ts">
const items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const value = ref('Backlog')
</script>

<template>
  <USelect
    v-model="value"
    :items="items"
    :ui="{
      trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
    }"
    class="w-48"
  />
</template>
```

### With fetched items

You can fetch items from an API and use them in the Select.

```vue [SelectFetchExample.vue]
<script setup lang="ts">
import type { AvatarProps } from '@nuxt/ui'

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  key: 'typicode-users',
  transform: (data: { id: number, name: string }[]) => {
    return data?.map(user => ({
      label: user.name,
      value: String(user.id),
      avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` }
    }))
  },
  lazy: true
})

function getUserAvatar(value: string) {
  return users.value?.find(user => user.value === value)?.avatar || {}
}
</script>

<template>
  <USelect
    :items="users"
    :loading="status === 'pending'"
    icon="i-lucide-user"
    placeholder="Select user"
    value-key="value"
    class="w-48"
  >
    <template #leading="{ modelValue, ui }">
      <UAvatar
        v-if="modelValue"
        v-bind="getUserAvatar(modelValue)"
        :size="(ui.leadingAvatarSize() as AvatarProps['size'])"
        :class="ui.leadingAvatar()"
      />
    </template>
  </USelect>
</template>
```

### With full content width

You can expand the content to the full width of its items by using the `ui.content` key.

```vue [SelectContentWidthExample.vue]
<script setup lang="ts">
const value = ref<string>()

const { data: users } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  key: 'typicode-users-email',
  transform: (data: { id: number, name: string, email: string }[]) => {
    return data?.map(user => ({
      label: user.name,
      email: user.email,
      value: String(user.id),
      avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` }
    }))
  },
  lazy: true
})
</script>

<template>
  <USelect
    v-model="value"
    :items="users"
    placeholder="Select user"
    value-key="value"
    :ui="{ content: 'min-w-fit' }"
    class="w-48"
  >
    <template #item-label="{ item }">
      {{ item.label }}

      <span class="text-muted">
        {{ item.email }}
      </span>
    </template>
  </USelect>
</template>
```

<tip>

You can also change the content width globally in your `app.config.ts`:

```text
export default defineAppConfig({
  ui: {
    select: {
      slots: {
        content: 'min-w-fit'
      }
    }
  }
})
```

</tip>

## API

### Props

```ts
/**
 * Props for the Select component
 */
interface SelectProps {
  id?: string | undefined;
  /**
   * The placeholder text when the select is empty.
   */
  placeholder?: string | undefined;
  color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined;
  variant?: "outline" | "soft" | "subtle" | "ghost" | "none" | undefined;
  size?: "sm" | "md" | "xs" | "lg" | "xl" | undefined;
  /**
   * The icon displayed to open the menu.
   */
  trailingIcon?: string | undefined;
  /**
   * The icon displayed when an item is selected.
   */
  selectedIcon?: string | undefined;
  /**
   * The content of the menu.
   */
  content?: (Omit<SelectContentProps, "asChild" | "as" | "forceMount"> & Partial<EmitsToProps<SelectContentImplEmits>>) | undefined;
  /**
   * Display an arrow alongside the menu.
   */
  arrow?: boolean | Omit<SelectArrowProps, "asChild" | "as"> | undefined;
  /**
   * Render the menu in a portal.
   * @default "true"
   */
  portal?: string | boolean | HTMLElement | undefined;
  /**
   * When `items` is an array of objects, select the field to use as the value.
   * @default "\"value\" as never"
   */
  valueKey?: keyof SelectItemBase | undefined;
  /**
   * When `items` is an array of objects, select the field to use as the label.
   * @default "\"label\" as never"
   */
  labelKey?: undefined;
  items?: ArrayOrNested<SelectItem> | undefined;
  /**
   * The value of the Select when initially rendered. Use when you do not need to control the state of the Select.
   */
  defaultValue?: any;
  /**
   * The controlled value of the Select. Can be bind as `v-model`.
   */
  modelValue?: any;
  /**
   * Whether multiple options can be selected or not.
   */
  multiple?: boolean | undefined;
  /**
   * Highlight the ring color like a focus state.
   */
  highlight?: boolean | undefined;
  autofocus?: boolean | undefined;
  /**
   * @default "0"
   */
  autofocusDelay?: number | undefined;
  ui?: { base?: ClassNameValue; leading?: ClassNameValue; leadingIcon?: ClassNameValue; leadingAvatar?: ClassNameValue; leadingAvatarSize?: ClassNameValue; trailing?: ClassNameValue; trailingIcon?: ClassNameValue; value?: ClassNameValue; placeholder?: ClassNameValue; arrow?: ClassNameValue; content?: ClassNameValue; viewport?: ClassNameValue; group?: ClassNameValue; empty?: ClassNameValue; label?: ClassNameValue; separator?: ClassNameValue; item?: ClassNameValue; itemLeadingIcon?: ClassNameValue; itemLeadingAvatar?: ClassNameValue; itemLeadingAvatarSize?: ClassNameValue; itemLeadingChip?: ClassNameValue; itemLeadingChipSize?: ClassNameValue; itemTrailing?: ClassNameValue; itemTrailingIcon?: ClassNameValue; itemLabel?: ClassNameValue; } | undefined;
  /**
   * When `true`, prevents the user from interacting with Select
   */
  disabled?: boolean | undefined;
  /**
   * The controlled open state of the Select. Can be bind as `v-model:open`.
   */
  open?: boolean | undefined;
  /**
   * The open state of the select when it is initially rendered. Use when you do not need to control its open state.
   */
  defaultOpen?: boolean | undefined;
  /**
   * Native html input `autocomplete` attribute.
   */
  autocomplete?: string | undefined;
  /**
   * The name of the field. Submitted with its owning form as part of a name/value pair.
   */
  name?: string | undefined;
  /**
   * When `true`, indicates that the user must set the value before the owning form can be submitted.
   */
  required?: boolean | undefined;
  /**
   * Display an icon based on the `leading` and `trailing` props.
   */
  icon?: string | undefined;
  /**
   * Display an avatar on the left side.
   */
  avatar?: AvatarProps | undefined;
  /**
   * When `true`, the icon will be displayed on the left side.
   */
  leading?: boolean | undefined;
  /**
   * Display an icon on the left side.
   */
  leadingIcon?: string | undefined;
  /**
   * When `true`, the icon will be displayed on the right side.
   */
  trailing?: boolean | undefined;
  /**
   * When `true`, the loading icon will be displayed.
   */
  loading?: boolean | undefined;
  /**
   * The icon when the `loading` prop is `true`.
   */
  loadingIcon?: string | undefined;
}
```

### Slots

```ts
/**
 * Slots for the Select component
 */
interface SelectSlots {
  leading(): any;
  default(): any;
  trailing(): any;
  item(): any;
  item-leading(): any;
  item-label(): any;
  item-trailing(): any;
  content-top(): any;
  content-bottom(): any;
}
```

### Emits

```ts
/**
 * Emitted events for the Select component
 */
interface SelectEmits {
  blur: (payload: [payload: FocusEvent]) => void;
  change: (payload: [payload: Event]) => void;
  focus: (payload: [payload: FocusEvent]) => void;
  update:modelValue: (payload: [payload: any]) => void;
  update:open: (payload: [value: boolean]) => void;
}
```

### Expose

When accessing the component via a template ref, you can use the following:

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
          triggerRef
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
          InstanceType
        </span>
        
        <span class="sMK4o">
          <typeof
        </span>
        
        <span class="sTEyZ">
          SelectTrigger
        </span>
        
        <span class="sMK4o">
          >
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
</tbody>
</table>

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    select: {
      slots: {
        base: [
          'relative group rounded-md inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors'
        ],
        leading: 'absolute inset-y-0 start-0 flex items-center',
        leadingIcon: 'shrink-0 text-dimmed',
        leadingAvatar: 'shrink-0',
        leadingAvatarSize: '',
        trailing: 'absolute inset-y-0 end-0 flex items-center',
        trailingIcon: 'shrink-0 text-dimmed',
        value: 'truncate pointer-events-none',
        placeholder: 'truncate text-dimmed',
        arrow: 'fill-default',
        content: 'max-h-60 w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col',
        viewport: 'relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1',
        group: 'p-1 isolate',
        empty: 'text-center text-muted',
        label: 'font-semibold text-highlighted',
        separator: '-mx-1 my-1 h-px bg-border',
        item: [
          'group relative w-full flex items-center select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50',
          'transition-colors before:transition-colors'
        ],
        itemLeadingIcon: [
          'shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default',
          'transition-colors'
        ],
        itemLeadingAvatar: 'shrink-0',
        itemLeadingAvatarSize: '',
        itemLeadingChip: 'shrink-0',
        itemLeadingChipSize: '',
        itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
        itemTrailingIcon: 'shrink-0',
        itemLabel: 'truncate'
      },
      variants: {
        buttonGroup: {
          horizontal: 'not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]',
          vertical: 'not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]'
        },
        size: {
          xs: {
            base: 'px-2 py-1 text-xs gap-1',
            leading: 'ps-2',
            trailing: 'pe-2',
            leadingIcon: 'size-4',
            leadingAvatarSize: '3xs',
            trailingIcon: 'size-4',
            label: 'p-1 text-[10px]/3 gap-1',
            item: 'p-1 text-xs gap-1',
            itemLeadingIcon: 'size-4',
            itemLeadingAvatarSize: '3xs',
            itemLeadingChip: 'size-4',
            itemLeadingChipSize: 'sm',
            itemTrailingIcon: 'size-4',
            empty: 'p-1 text-xs'
          },
          sm: {
            base: 'px-2.5 py-1.5 text-xs gap-1.5',
            leading: 'ps-2.5',
            trailing: 'pe-2.5',
            leadingIcon: 'size-4',
            leadingAvatarSize: '3xs',
            trailingIcon: 'size-4',
            label: 'p-1.5 text-[10px]/3 gap-1.5',
            item: 'p-1.5 text-xs gap-1.5',
            itemLeadingIcon: 'size-4',
            itemLeadingAvatarSize: '3xs',
            itemLeadingChip: 'size-4',
            itemLeadingChipSize: 'sm',
            itemTrailingIcon: 'size-4',
            empty: 'p-1.5 text-xs'
          },
          md: {
            base: 'px-2.5 py-1.5 text-sm gap-1.5',
            leading: 'ps-2.5',
            trailing: 'pe-2.5',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5',
            label: 'p-1.5 text-xs gap-1.5',
            item: 'p-1.5 text-sm gap-1.5',
            itemLeadingIcon: 'size-5',
            itemLeadingAvatarSize: '2xs',
            itemLeadingChip: 'size-5',
            itemLeadingChipSize: 'md',
            itemTrailingIcon: 'size-5',
            empty: 'p-1.5 text-sm'
          },
          lg: {
            base: 'px-3 py-2 text-sm gap-2',
            leading: 'ps-3',
            trailing: 'pe-3',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5',
            label: 'p-2 text-xs gap-2',
            item: 'p-2 text-sm gap-2',
            itemLeadingIcon: 'size-5',
            itemLeadingAvatarSize: '2xs',
            itemLeadingChip: 'size-5',
            itemLeadingChipSize: 'md',
            itemTrailingIcon: 'size-5',
            empty: 'p-2 text-sm'
          },
          xl: {
            base: 'px-3 py-2 text-base gap-2',
            leading: 'ps-3',
            trailing: 'pe-3',
            leadingIcon: 'size-6',
            leadingAvatarSize: 'xs',
            trailingIcon: 'size-6',
            label: 'p-2 text-sm gap-2',
            item: 'p-2 text-base gap-2',
            itemLeadingIcon: 'size-6',
            itemLeadingAvatarSize: 'xs',
            itemLeadingChip: 'size-6',
            itemLeadingChipSize: 'lg',
            itemTrailingIcon: 'size-6',
            empty: 'p-2 text-base'
          }
        },
        variant: {
          outline: 'text-highlighted bg-default ring ring-inset ring-accented',
          soft: 'text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50',
          subtle: 'text-highlighted bg-elevated ring ring-inset ring-accented',
          ghost: 'text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent',
          none: 'text-highlighted bg-transparent'
        },
        color: {
          primary: '',
          secondary: '',
          success: '',
          info: '',
          warning: '',
          error: '',
          neutral: ''
        },
        leading: {
          true: ''
        },
        trailing: {
          true: ''
        },
        loading: {
          true: ''
        },
        highlight: {
          true: ''
        },
        type: {
          file: 'file:me-1.5 file:font-medium file:text-muted file:outline-none'
        }
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: [
            'outline',
            'subtle'
          ],
          class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary'
        },
        {
          color: 'secondary',
          variant: [
            'outline',
            'subtle'
          ],
          class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary'
        },
        {
          color: 'success',
          variant: [
            'outline',
            'subtle'
          ],
          class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success'
        },
        {
          color: 'info',
          variant: [
            'outline',
            'subtle'
          ],
          class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info'
        },
        {
          color: 'warning',
          variant: [
            'outline',
            'subtle'
          ],
          class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning'
        },
        {
          color: 'error',
          variant: [
            'outline',
            'subtle'
          ],
          class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error'
        },
        {
          color: 'primary',
          highlight: true,
          class: 'ring ring-inset ring-primary'
        },
        {
          color: 'secondary',
          highlight: true,
          class: 'ring ring-inset ring-secondary'
        },
        {
          color: 'success',
          highlight: true,
          class: 'ring ring-inset ring-success'
        },
        {
          color: 'info',
          highlight: true,
          class: 'ring ring-inset ring-info'
        },
        {
          color: 'warning',
          highlight: true,
          class: 'ring ring-inset ring-warning'
        },
        {
          color: 'error',
          highlight: true,
          class: 'ring ring-inset ring-error'
        },
        {
          color: 'neutral',
          variant: [
            'outline',
            'subtle'
          ],
          class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted'
        },
        {
          color: 'neutral',
          highlight: true,
          class: 'ring ring-inset ring-inverted'
        },
        {
          leading: true,
          size: 'xs',
          class: 'ps-7'
        },
        {
          leading: true,
          size: 'sm',
          class: 'ps-8'
        },
        {
          leading: true,
          size: 'md',
          class: 'ps-9'
        },
        {
          leading: true,
          size: 'lg',
          class: 'ps-10'
        },
        {
          leading: true,
          size: 'xl',
          class: 'ps-11'
        },
        {
          trailing: true,
          size: 'xs',
          class: 'pe-7'
        },
        {
          trailing: true,
          size: 'sm',
          class: 'pe-8'
        },
        {
          trailing: true,
          size: 'md',
          class: 'pe-9'
        },
        {
          trailing: true,
          size: 'lg',
          class: 'pe-10'
        },
        {
          trailing: true,
          size: 'xl',
          class: 'pe-11'
        },
        {
          loading: true,
          leading: true,
          class: {
            leadingIcon: 'animate-spin'
          }
        },
        {
          loading: true,
          leading: false,
          trailing: true,
          class: {
            trailingIcon: 'animate-spin'
          }
        }
      ],
      defaultVariants: {
        size: 'md',
        color: 'primary',
        variant: 'outline'
      }
    }
  }
})
```
