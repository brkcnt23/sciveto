# InputMenu

> An autocomplete input with real-time suggestions.

## Usage

Use the `v-model` directive to control the value of the InputMenu or the `default-value` prop to set the initial value when you do not need to control its state.

<tip>

Use this over an [`Input`](/components/input) to take advantage of Reka UI's [`Combobox`](https://reka-ui.com/docs/components/combobox) component that offers autocomplete capabilities.

</tip>

<note>

This component is similar to the [`SelectMenu`](/components/select-menu) but it's using an Input instead of a Select.

</note>

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
  <UInputMenu model-value="Backlog" :items="items" />
</template>
```

You can also pass an array of objects with the following properties:

- `label?: string`
- [`type?: "label" | "separator" | "item"`](#with-items-type)
- [`icon?: string`](#with-icons-in-items)
- [`avatar?: AvatarProps`](#with-avatar-in-items)
- [`chip?: ChipProps`](#with-chip-in-items)
- `disabled?: boolean`
- `onSelect?(e: Event): void`
- `class?: any`
- `ui?: { tagsItem?: ClassNameValue, tagsItemText?: ClassNameValue, tagsItemDelete?: ClassNameValue, tagsItemDeleteIcon?: ClassNameValue, label?: ClassNameValue, separator?: ClassNameValue, item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLeadingChip?: ClassNameValue, itemLeadingChipSize?: ClassNameValue, itemLabel?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingIcon?: ClassNameValue }`

```vue
<script setup lang="ts">
const items = ref<undefined>([
  {
    label: 'Backlog',
  },
  {
    label: 'Todo',
  },
  {
    label: 'In Progress',
  },
  {
    label: 'Done',
  },
])
</script>

<template>
  <UInputMenu :items="items" />
</template>
```

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
  <UInputMenu model-value="Apple" :items="items" />
</template>
```

### Value Key

You can choose to bind a single property of the object rather than the whole object by using the `value-key` prop. Defaults to `undefined`.

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
  <UInputMenu model-value="todo" value-key="id" :items="items" />
</template>
```

### Multiple

Use the `multiple` prop to allow multiple selections, the selected items will be displayed as tags.

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
  <UInputMenu multiple :items="items" />
</template>
```

<caution>

Ensure to pass an array to the `default-value` prop or the `v-model` directive.

</caution>

### Delete Icon

With `multiple`, use the `delete-icon` prop to customize the delete [Icon](/components/icon) in the tags. Defaults to `i-lucide-x`.

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
  <UInputMenu multiple delete-icon="i-lucide-trash" :items="items" />
</template>
```

<framework-only>
<template v-slot:nuxt="">
<tip to="/getting-started/icons/nuxt#theme">

You can customize this icon globally in your `app.config.ts` under `ui.icons.close` key.

</tip>
</template>

<template v-slot:vue="">
<tip to="/getting-started/icons/vue#theme">

You can customize this icon globally in your `vite.config.ts` under `ui.icons.close` key.

</tip>
</template>
</framework-only>

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
  <UInputMenu placeholder="Select status" :items="items" />
</template>
```

### Content

Use the `content` prop to control how the InputMenu content is rendered, like its `align` or `side` for example.

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
  <UInputMenu model-value="Backlog" :items="items" />
</template>
```

### Arrow

Use the `arrow` prop to display an arrow on the InputMenu.

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
  <UInputMenu model-value="Backlog" arrow :items="items" />
</template>
```

### Color

Use the `color` prop to change the ring color when the InputMenu is focused.

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
  <UInputMenu model-value="Backlog" color="neutral" highlight :items="items" />
</template>
```

<note>

The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.

</note>

### Variant

Use the `variant` prop to change the variant of the InputMenu.

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
  <UInputMenu model-value="Backlog" color="neutral" variant="subtle" :highlight="false" :items="items" />
</template>
```

### Size

Use the `size` prop to change the size of the InputMenu.

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
  <UInputMenu model-value="Backlog" size="xl" :items="items" />
</template>
```

### Icon

Use the `icon` prop to show an [Icon](/components/icon) inside the InputMenu.

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
  <UInputMenu model-value="Backlog" icon="i-lucide-search" size="md" :items="items" />
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
  <UInputMenu model-value="Backlog" trailing-icon="i-lucide-arrow-down" size="md" :items="items" />
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
  <UInputMenu model-value="Backlog" selected-icon="i-lucide-flame" size="md" :items="items" />
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

Use the `avatar` prop to show an [Avatar](/components/avatar) inside the InputMenu.

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
  <UInputMenu model-value="Nuxt" :items="items" />
</template>
```

### Loading

Use the `loading` prop to show a loading icon on the InputMenu.

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
  <UInputMenu model-value="Backlog" loading :trailing="false" :items="items" />
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
  <UInputMenu model-value="Backlog" loading loading-icon="i-lucide-loader" :items="items" />
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

Use the `disabled` prop to disable the InputMenu.

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
  <UInputMenu disabled placeholder="Select status" :items="items" />
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
  <UInputMenu model-value="Apple" :items="items" />
</template>
```

### With icon in items

You can use the `icon` property to display an [Icon](/components/icon) inside the items.

```vue [InputMenuItemsIconExample.vue]
<script setup lang="ts">
import type { InputMenuItem } from '@nuxt/ui'

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
] satisfies InputMenuItem[])

const value = ref(items.value[0])
</script>

<template>
  <UInputMenu v-model="value" :icon="value?.icon" :items="items" />
</template>
```

<tip>

You can also use the `#leading` slot to display the selected icon.

</tip>

### With avatar in items

You can use the `avatar` property to display an [Avatar](/components/avatar) inside the items.

```vue [InputMenuItemsAvatarExample.vue]
<script setup lang="ts">
import type { InputMenuItem } from '@nuxt/ui'

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
] satisfies InputMenuItem[])

const value = ref(items.value[0])
</script>

<template>
  <UInputMenu v-model="value" :avatar="value?.avatar" :items="items" />
</template>
```

<tip>

You can also use the `#leading` slot to display the selected avatar.

</tip>

### With chip in items

You can use the `chip` property to display a [Chip](/components/chip) inside the items.

```vue [InputMenuItemsChipExample.vue]
<script setup lang="ts">
import type { InputMenuItem, ChipProps } from '@nuxt/ui'

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
] satisfies InputMenuItem[])

const value = ref(items.value[0])
</script>

<template>
  <UInputMenu v-model="value" :items="items">
    <template #leading="{ modelValue, ui }">
      <UChip
        v-if="modelValue"
        v-bind="modelValue.chip"
        inset
        standalone
        :size="(ui.itemLeadingChipSize() as ChipProps['size'])"
        :class="ui.itemLeadingChip()"
      />
    </template>
  </UInputMenu>
</template>
```

<note>

In this example, the `#leading` slot is used to display the selected chip.

</note>

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

```vue [InputMenuOpenExample.vue]
<script setup lang="ts">
const open = ref(false)
const items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const value = ref('Backlog')

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <UInputMenu v-model="value" v-model:open="open" :items="items" />
</template>
```

<note>

In this example, leveraging [`defineShortcuts`](/composables/define-shortcuts), you can toggle the InputMenu by pressing <kbd value="O">



</kbd>

.

</note>

### Control open state on focus

You can also use the `@focus` directive to control the open state.

```vue [InputMenuOpenFocusExample.vue]
<script setup lang="ts">
const open = ref(false)
const items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const selected = ref('Backlog')
</script>

<template>
  <UInputMenu
    v-model="selected"
    v-model:open="open"
    :items="items"
    @focus="open = true"
  />
</template>
```

### Control search term

Use the `v-model:search-term` directive to control the search term.

```vue [InputMenuSearchTermExample.vue]
<script setup lang="ts">
const searchTerm = ref('D')
const items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const value = ref('Backlog')
</script>

<template>
  <UInputMenu v-model="value" v-model:search-term="searchTerm" :items="items" />
</template>
```

### With rotating icon

Here is an example with a rotating icon that indicates the open state of the InputMenu.

```vue [InputMenuIconExample.vue]
<script setup lang="ts">
const items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const value = ref('Backlog')
</script>

<template>
  <UInputMenu
    v-model="value"
    :items="items"
    :ui="{
      trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
    }"
  />
</template>
```

### With create item

Use the `create-item` prop to enable users to add custom values that aren't in the predefined options.

```vue [InputMenuCreateItemExample.vue]
<script setup lang="ts">
const items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const value = ref('Backlog')

function onCreate(item: string) {
  items.value.push(item)

  value.value = item
}
</script>

<template>
  <UInputMenu
    v-model="value"
    create-item
    :items="items"
    class="w-48"
    @create="onCreate"
  />
</template>
```

<note>

The create option shows when no match is found by default. Set it to `always` to show it even when similar values exist.

</note>

<tip to="#emits">

Use the `@create` event to handle the creation of the item. You will receive the event and the item as arguments.

</tip>

### With fetched items

You can fetch items from an API and use them in the InputMenu.

```vue [InputMenuFetchExample.vue]
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
</script>

<template>
  <UInputMenu
    :items="users"
    :loading="status === 'pending'"
    icon="i-lucide-user"
    placeholder="Select user"
  >
    <template #leading="{ modelValue, ui }">
      <UAvatar
        v-if="modelValue"
        v-bind="modelValue.avatar"
        :size="(ui.leadingAvatarSize() as AvatarProps['size'])"
        :class="ui.leadingAvatar()"
      />
    </template>
  </UInputMenu>
</template>
```

### With ignore filter

Set the `ignore-filter` prop to `true` to disable the internal search and use your own search logic.

```vue [InputMenuIgnoreFilterExample.vue]
<script setup lang="ts">
import { refDebounced } from '@vueuse/core'
import type { AvatarProps } from '@nuxt/ui'

const searchTerm = ref('')
const searchTermDebounced = refDebounced(searchTerm, 200)

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  params: { q: searchTermDebounced },
  transform: (data: { id: number, name: string }[]) => {
    return data?.map(user => ({
      label: user.name,
      value: String(user.id),
      avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` }
    }))
  },
  lazy: true
})
</script>

<template>
  <UInputMenu
    v-model:search-term="searchTerm"
    :items="users"
    :loading="status === 'pending'"
    ignore-filter
    icon="i-lucide-user"
    placeholder="Select user"
  >
    <template #leading="{ modelValue, ui }">
      <UAvatar
        v-if="modelValue"
        v-bind="modelValue.avatar"
        :size="(ui.leadingAvatarSize() as AvatarProps['size'])"
        :class="ui.leadingAvatar()"
      />
    </template>
  </UInputMenu>
</template>
```

<note>

This example uses [`refDebounced`](https://vueuse.org/shared/refDebounced/#refdebounced) to debounce the API calls.

</note>

### With filter fields

Use the `filter-fields` prop with an array of fields to filter on. Defaults to `[labelKey]`.

```vue [InputMenuFilterFieldsExample.vue]
<script setup lang="ts">
import type { AvatarProps } from '@nuxt/ui'

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
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
  <UInputMenu
    :items="users"
    :loading="status === 'pending'"
    :filter-fields="['label', 'email']"
    icon="i-lucide-user"
    placeholder="Select user"
    class="w-80"
  >
    <template #leading="{ modelValue, ui }">
      <UAvatar
        v-if="modelValue"
        v-bind="modelValue.avatar"
        :size="(ui.leadingAvatarSize() as AvatarProps['size'])"
        :class="ui.leadingAvatar()"
      />
    </template>

    <template #item-label="{ item }">
      {{ item.label }}

      <span class="text-muted">
        {{ item.email }}
      </span>
    </template>
  </UInputMenu>
</template>
```

### With full content width

You can expand the content to the full width of its items by using the `ui.content` key.

```vue [InputMenuContentWidthExample.vue]
<script setup lang="ts">
const { data: users } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  key: 'typicode-users-email',
  transform: (data: { id: number, name: string, email: string }[]) => {
    return data?.map(user => ({
      label: user.name,
      value: String(user.id),
      email: user.email,
      avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` }
    }))
  },
  lazy: true
})
</script>

<template>
  <UInputMenu
    :items="users"
    icon="i-lucide-user"
    placeholder="Select user"
    :ui="{ content: 'min-w-fit' }"
  >
    <template #item-label="{ item }">
      {{ item.label }}

      <span class="text-muted">
        {{ item.email }}
      </span>
    </template>
  </UInputMenu>
</template>
```

<tip>

You can also change the content width globally in your `app.config.ts`:

```text
export default defineAppConfig({
  ui: {
    inputMenu: {
      slots: {
        content: 'min-w-fit'
      }
    }
  }
})
```

</tip>

### As a CountryPicker

This example demonstrates using the InputMenu as a country picker with lazy loading - countries are only fetched when the menu is opened.

```vue [InputMenuCountriesExample.vue]
<script setup lang="ts">
const { data: countries, status, execute } = await useLazyFetch<{
  name: string
  code: string
  emoji: string
}[]>('/api/countries.json', {
  immediate: false
})

function onOpen() {
  if (!countries.value?.length) {
    execute()
  }
}
</script>

<template>
  <UInputMenu
    :items="countries"
    :loading="status === 'pending'"
    label-key="name"
    :search-input="{ icon: 'i-lucide-search' }"
    placeholder="Select country"
    class="w-48"
    @update:open="onOpen"
  >
    <template #leading="{ modelValue, ui }">
      <span v-if="modelValue" class="size-5 text-center">
        {{ modelValue?.emoji }}
      </span>
      <UIcon v-else name="i-lucide-earth" :class="ui.leadingIcon()" />
    </template>
    <template #item-leading="{ item }">
      <span class="size-5 text-center">
        {{ item.emoji }}
      </span>
    </template>
  </UInputMenu>
</template>
```

## API

### Props

```ts
/**
 * Props for the InputMenu component
 */
interface InputMenuProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  id?: string | undefined;
  /**
   * @default "\"text\""
   */
  type?: InputTypeHTMLAttribute | undefined;
  /**
   * The placeholder text when the input is empty.
   */
  placeholder?: string | undefined;
  color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined;
  variant?: "soft" | "outline" | "subtle" | "ghost" | "none" | undefined;
  size?: "sm" | "md" | "xs" | "lg" | "xl" | undefined;
  required?: boolean | undefined;
  autofocus?: boolean | undefined;
  /**
   * @default "0"
   */
  autofocusDelay?: number | undefined;
  /**
   * The icon displayed to open the menu.
   */
  trailingIcon?: string | undefined;
  /**
   * The icon displayed when an item is selected.
   */
  selectedIcon?: string | undefined;
  /**
   * The icon displayed to delete a tag.
   * Works only when `multiple` is `true`.
   */
  deleteIcon?: string | undefined;
  /**
   * The content of the menu.
   */
  content?: (Omit<ComboboxContentProps, "asChild" | "as" | "forceMount"> & Partial<EmitsToProps<DismissableLayerEmits>>) | undefined;
  /**
   * Display an arrow alongside the menu.
   */
  arrow?: boolean | Omit<ComboboxArrowProps, "asChild" | "as"> | undefined;
  /**
   * Render the menu in a portal.
   * @default "true"
   */
  portal?: string | boolean | HTMLElement | undefined;
  /**
   * When `items` is an array of objects, select the field to use as the value instead of the object itself.
   */
  valueKey?: keyof _InputMenuItem | undefined;
  /**
   * When `items` is an array of objects, select the field to use as the label.
   * @default "\"label\" as never"
   */
  labelKey?: undefined;
  items?: ArrayOrNested<InputMenuItem> | undefined;
  /**
   * The value of the InputMenu when initially rendered. Use when you do not need to control the state of the InputMenu.
   */
  defaultValue?: any;
  /**
   * The controlled value of the InputMenu. Can be binded-with with `v-model`.
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
  /**
   * Determines if custom user input that does not exist in options can be added.
   */
  createItem?: boolean | "always" | { position?: "top" | "bottom" | undefined; when?: "always" | "empty" | undefined; } | undefined;
  /**
   * Fields to filter items by.
   */
  filterFields?: string[] | undefined;
  /**
   * When `true`, disable the default filters, useful for custom filtering (useAsyncData, useFetch, etc.).
   */
  ignoreFilter?: boolean | undefined;
  ui?: { root?: ClassNameValue; base?: ClassNameValue; leading?: ClassNameValue; leadingIcon?: ClassNameValue; leadingAvatar?: ClassNameValue; leadingAvatarSize?: ClassNameValue; trailing?: ClassNameValue; trailingIcon?: ClassNameValue; arrow?: ClassNameValue; content?: ClassNameValue; viewport?: ClassNameValue; group?: ClassNameValue; empty?: ClassNameValue; label?: ClassNameValue; separator?: ClassNameValue; item?: ClassNameValue; itemLeadingIcon?: ClassNameValue; itemLeadingAvatar?: ClassNameValue; itemLeadingAvatarSize?: ClassNameValue; itemLeadingChip?: ClassNameValue; itemLeadingChipSize?: ClassNameValue; itemTrailing?: ClassNameValue; itemTrailingIcon?: ClassNameValue; itemLabel?: ClassNameValue; tagsItem?: ClassNameValue; tagsItemText?: ClassNameValue; tagsItemDelete?: ClassNameValue; tagsItemDeleteIcon?: ClassNameValue; tagsInput?: ClassNameValue; } | undefined;
  /**
   * The controlled open state of the Combobox. Can be binded with with `v-model:open`.
   */
  open?: boolean | undefined;
  /**
   * The open state of the combobox when it is initially rendered. <br> Use when you do not need to control its open state.
   */
  defaultOpen?: boolean | undefined;
  /**
   * When `true`, prevents the user from interacting with listbox
   */
  disabled?: boolean | undefined;
  /**
   * The name of the field. Submitted with its owning form as part of a name/value pair.
   */
  name?: string | undefined;
  /**
   * Whether to reset the searchTerm when the Combobox input blurred
   * @default "true"
   */
  resetSearchTermOnBlur?: boolean | undefined;
  /**
   * Whether to reset the searchTerm when the Combobox value is selected
   * @default "true"
   */
  resetSearchTermOnSelect?: boolean | undefined;
  /**
   * When `true`, hover over item will trigger highlight
   */
  highlightOnHover?: boolean | undefined;
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
  /**
   * @default "\"\""
   */
  searchTerm?: string | undefined;
}
```

### Slots

```ts
/**
 * Slots for the InputMenu component
 */
interface InputMenuSlots {
  leading(): any;
  trailing(): any;
  empty(): any;
  item(): any;
  item-leading(): any;
  item-label(): any;
  item-trailing(): any;
  tags-item-text(): any;
  tags-item-delete(): any;
  content-top(): any;
  content-bottom(): any;
  create-item-label(): any;
}
```

### Emits

```ts
/**
 * Emitted events for the InputMenu component
 */
interface InputMenuEmits {
  blur: (payload: [payload: FocusEvent]) => void;
  change: (payload: [payload: Event]) => void;
  focus: (payload: [payload: FocusEvent]) => void;
  update:open: (payload: [value: boolean]) => void;
  create: (payload: [item: string]) => void;
  highlight: (payload: [payload: { ref: HTMLElement; value: any; } | undefined]) => void;
  update:modelValue: (payload: [payload: any]) => void;
  update:searchTerm: (payload: [value: string]) => void;
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
          inputRef
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
          ComboboxTrigger
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
    inputMenu: {
      slots: {
        root: 'relative inline-flex items-center',
        base: [
          'rounded-md',
          'transition-colors'
        ],
        leading: 'absolute inset-y-0 start-0 flex items-center',
        leadingIcon: 'shrink-0 text-dimmed',
        leadingAvatar: 'shrink-0',
        leadingAvatarSize: '',
        trailing: 'group absolute inset-y-0 end-0 flex items-center disabled:cursor-not-allowed disabled:opacity-75',
        trailingIcon: 'shrink-0 text-dimmed',
        arrow: 'fill-default',
        content: 'max-h-60 w-(--reka-combobox-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-combobox-content-transform-origin) pointer-events-auto flex flex-col',
        viewport: 'relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1',
        group: 'p-1 isolate',
        empty: 'text-center text-muted',
        label: 'font-semibold text-highlighted',
        separator: '-mx-1 my-1 h-px bg-border',
        item: [
          'group relative w-full flex items-center gap-1.5 p-1.5 text-sm select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50',
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
        itemLabel: 'truncate',
        tagsItem: 'px-1.5 py-0.5 rounded-sm font-medium inline-flex items-center gap-0.5 ring ring-inset ring-accented bg-elevated text-default data-disabled:cursor-not-allowed data-disabled:opacity-75',
        tagsItemText: 'truncate',
        tagsItemDelete: [
          'inline-flex items-center rounded-xs text-dimmed hover:text-default hover:bg-accented/75 disabled:pointer-events-none',
          'transition-colors'
        ],
        tagsItemDeleteIcon: 'shrink-0',
        tagsInput: 'flex-1 border-0 bg-transparent placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75'
      },
      variants: {
        buttonGroup: {
          horizontal: {
            root: 'group has-focus-visible:z-[1]',
            base: 'group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none'
          },
          vertical: {
            root: 'group has-focus-visible:z-[1]',
            base: 'group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none'
          }
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
            tagsItem: 'text-[10px]/3',
            tagsItemDeleteIcon: 'size-3',
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
            tagsItem: 'text-[10px]/3',
            tagsItemDeleteIcon: 'size-3',
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
            tagsItem: 'text-xs',
            tagsItemDeleteIcon: 'size-3.5',
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
            tagsItem: 'text-xs',
            tagsItemDeleteIcon: 'size-3.5',
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
            tagsItem: 'text-sm',
            tagsItemDeleteIcon: 'size-4',
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
        },
        multiple: {
          true: {
            root: 'flex-wrap'
          },
          false: {
            base: 'w-full border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75'
          }
        }
      },
      compoundVariants: [
        {
          variant: 'soft',
          multiple: true,
          class: 'has-focus:bg-elevated'
        },
        {
          variant: 'ghost',
          multiple: true,
          class: 'has-focus:bg-elevated'
        },
        {
          color: 'primary',
          multiple: true,
          variant: [
            'outline',
            'subtle'
          ],
          class: 'has-focus-visible:ring-2 has-focus-visible:ring-primary'
        },
        {
          color: 'secondary',
          multiple: true,
          variant: [
            'outline',
            'subtle'
          ],
          class: 'has-focus-visible:ring-2 has-focus-visible:ring-secondary'
        },
        {
          color: 'success',
          multiple: true,
          variant: [
            'outline',
            'subtle'
          ],
          class: 'has-focus-visible:ring-2 has-focus-visible:ring-success'
        },
        {
          color: 'info',
          multiple: true,
          variant: [
            'outline',
            'subtle'
          ],
          class: 'has-focus-visible:ring-2 has-focus-visible:ring-info'
        },
        {
          color: 'warning',
          multiple: true,
          variant: [
            'outline',
            'subtle'
          ],
          class: 'has-focus-visible:ring-2 has-focus-visible:ring-warning'
        },
        {
          color: 'error',
          multiple: true,
          variant: [
            'outline',
            'subtle'
          ],
          class: 'has-focus-visible:ring-2 has-focus-visible:ring-error'
        },
        {
          color: 'neutral',
          multiple: true,
          variant: [
            'outline',
            'subtle'
          ],
          class: 'has-focus-visible:ring-2 has-focus-visible:ring-inverted'
        },
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
