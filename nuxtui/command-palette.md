# CommandPalette

> A command palette with full-text search powered by Fuse.js for efficient fuzzy matching.

## Usage

Use the `v-model` directive to control the value of the CommandPalette or the `default-value` prop to set the initial value when you do not need to control its state.

<tip to="#control-selected-items">

You can also use the `@update:model-value` event to listen to the selected item(s).

</tip>

### Groups

The CommandPalette component filters groups and ranks matching commands by relevance as users type. It provides dynamic, instant search results for efficient command discovery. Use the `groups` prop as an array of objects with the following properties:

- `id: string`
- `label?: string`
- `slot?: string`
- `items?: CommandPaletteItem[]`
- [`ignoreFilter?: boolean`](#with-ignore-filter)
- [`postFilter?: (searchTerm: string, items: T[]) => T[]`](#with-post-filtered-items)
- `highlightedIcon?: string`

<caution>

You must provide an `id` for each group otherwise the group will be ignored.

</caution>

Each group contains an `items` array of objects that define the commands. Each item can have the following properties:

- `prefix?: string`
- `label?: string`
- `suffix?: string`
- `icon?: string`
- `avatar?: AvatarProps`
- `chip?: ChipProps`
- `kbds?: string[] | KbdProps[]`
- `active?: boolean`
- `loading?: boolean`
- `disabled?: boolean`
- [`slot?: string`](#with-custom-slot)
- `placeholder?: string`
- `children?: CommandPaletteItem[]`
- `onSelect?(e?: Event): void`
- `class?: any`
- `ui?: { item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLeadingChipSize?: ClassNameValue, itemLeadingChip?: ClassNameValue, itemLabel?: ClassNameValue, itemLabelPrefix?: ClassNameValue, itemLabelBase?: ClassNameValue, itemLabelSuffix?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingKbds?: ClassNameValue, itemTrailingKbdsSize?: ClassNameValue, itemTrailingHighlightedIcon?: ClassNameValue, itemTrailingIcon?: ClassNameValue }`

You can pass any property from the [Link](/components/link#props) component such as `to`, `target`, etc.

```vue
<template>
  <UCommandPalette class="flex-1" />
</template>
```

<tip to="#with-children-in-items">

Each item can take a `children` array of objects with the following properties to create submenus:

</tip>

### Multiple

Use the `multiple` prop to allow multiple selections.

```vue
<template>
  <UCommandPalette multiple class="flex-1" />
</template>
```

<caution>

Ensure to pass an array to the `default-value` prop or the `v-model` directive.

</caution>

### Placeholder

Use the `placeholder` prop to change the placeholder text.

```vue
<template>
  <UCommandPalette placeholder="Search an app..." class="flex-1" />
</template>
```

### Icon

Use the `icon` prop to customize the input [Icon](/components/icon). Defaults to `i-lucide-search`.

```vue
<template>
  <UCommandPalette icon="i-lucide-box" class="flex-1" />
</template>
```

<framework-only>
<template v-slot:nuxt="">
<tip to="/getting-started/icons/nuxt#theme">

You can customize this icon globally in your `app.config.ts` under `ui.icons.search` key.

</tip>
</template>

<template v-slot:vue="">
<tip to="/getting-started/icons/vue#theme">

You can customize this icon globally in your `vite.config.ts` under `ui.icons.search` key.

</tip>
</template>
</framework-only>

### Selected Icon

Use the `selected-icon` prop to customize the selected item [Icon](/components/icon). Defaults to `i-lucide-check`.

```vue
<template>
  <UCommandPalette multiple selected-icon="i-lucide-circle-check" class="flex-1" />
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

### Trailing Icon <badge className="align-text-top" label="New"></badge>

Use the `trailing-icon` prop to customize the trailing [Icon](/components/icon) when an item has children. Defaults to `i-lucide-chevron-right`.

```vue
<template>
  <UCommandPalette trailing-icon="i-lucide-arrow-right" class="flex-1" />
</template>
```

<framework-only>
<template v-slot:nuxt="">
<tip to="/getting-started/icons/nuxt#theme">

You can customize this icon globally in your `app.config.ts` under `ui.icons.chevronRight` key.

</tip>
</template>

<template v-slot:vue="">
<tip to="/getting-started/icons/vue#theme">

You can customize this icon globally in your `vite.config.ts` under `ui.icons.chevronRight` key.

</tip>
</template>
</framework-only>

### Loading

Use the `loading` prop to show a loading icon on the CommandPalette.

```vue
<template>
  <UCommandPalette loading class="flex-1" />
</template>
```

### Loading Icon

Use the `loading-icon` prop to customize the loading icon. Defaults to `i-lucide-loader-circle`.

```vue
<template>
  <UCommandPalette loading loading-icon="i-lucide-loader" class="flex-1" />
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

### Close

Use the `close` prop to display a [Button](/components/button) to dismiss the CommandPalette.

<tip>

An `update:open` event will be emitted when the close button is clicked.

</tip>

```vue
<template>
  <UCommandPalette close class="flex-1" />
</template>
```

You can pass any property from the [Button](/components/button) component to customize it.

```vue
<template>
  <UCommandPalette class="flex-1" />
</template>
```

### Close Icon

Use the `close-icon` prop to customize the close button [Icon](/components/icon). Defaults to `i-lucide-x`.

```vue
<template>
  <UCommandPalette close close-icon="i-lucide-arrow-right" class="flex-1" />
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

### Back <badge className="align-text-top" label="New"></badge>

Use the `back` prop to customize or hide the back button (with `false` value) displayed when navigating into a submenu.

You can pass any property from the [Button](/components/button) component to customize it.

```vue
<template>
  <UCommandPalette class="flex-1" />
</template>
```

### Back Icon <badge className="align-text-top" label="New"></badge>

Use the `back-icon` prop to customize the back button [Icon](/components/icon). Defaults to `i-lucide-arrow-left`.

```vue
<template>
  <UCommandPalette back back-icon="i-lucide-house" class="flex-1" />
</template>
```

<framework-only>
<template v-slot:nuxt="">
<tip to="/getting-started/icons/nuxt#theme">

You can customize this icon globally in your `app.config.ts` under `ui.icons.arrowLeft` key.

</tip>
</template>

<template v-slot:vue="">
<tip to="/getting-started/icons/vue#theme">

You can customize this icon globally in your `vite.config.ts` under `ui.icons.arrowLeft` key.

</tip>
</template>
</framework-only>

### Disabled

Use the `disabled` prop to disable the CommandPalette.

```vue
<template>
  <UCommandPalette disabled class="flex-1" />
</template>
```

## Examples

### Control selected item(s)

You can control the selected item(s) by using the `default-value` prop or the `v-model` directive, by using the `onSelect` field on each item or by using the `@update:model-value` event.

```vue [CommandPaletteSelectExample.vue]
<script setup lang="ts">
const toast = useToast()

const groups = ref([
  {
    id: 'users',
    label: 'Users',
    items: [
      {
        label: 'Benjamin Canac',
        suffix: 'benjamincanac',
        to: 'https://github.com/benjamincanac',
        target: '_blank',
        avatar: {
          src: 'https://github.com/benjamincanac.png'
        }
      },
      {
        label: 'Sylvain Marroufin',
        suffix: 'smarroufin',
        to: 'https://github.com/smarroufin',
        target: '_blank',
        avatar: {
          src: 'https://github.com/smarroufin.png'
        }
      },
      {
        label: 'Sébastien Chopin',
        suffix: 'atinux',
        to: 'https://github.com/atinux',
        target: '_blank',
        avatar: {
          src: 'https://github.com/atinux.png'
        }
      },
      {
        label: 'Romain Hamel',
        suffix: 'romhml',
        to: 'https://github.com/romhml',
        target: '_blank',
        avatar: {
          src: 'https://github.com/romhml.png'
        }
      },
      {
        label: 'Haytham A. Salama',
        suffix: 'Haythamasalama',
        to: 'https://github.com/Haythamasalama',
        target: '_blank',
        avatar: {
          src: 'https://github.com/Haythamasalama.png'
        }
      },
      {
        label: 'Daniel Roe',
        suffix: 'danielroe',
        to: 'https://github.com/danielroe',
        target: '_blank',
        avatar: {
          src: 'https://github.com/danielroe.png'
        }
      },
      {
        label: 'Neil Richter',
        suffix: 'noook',
        to: 'https://github.com/noook',
        target: '_blank',
        avatar: {
          src: 'https://github.com/noook.png'
        }
      }
    ]
  },
  {
    id: 'actions',
    items: [
      {
        label: 'Add new file',
        suffix: 'Create a new file in the current directory or workspace.',
        icon: 'i-lucide-file-plus',
        kbds: [
          'meta',
          'N'
        ],
        onSelect() {
          toast.add({ title: 'Add new file' })
        }
      },
      {
        label: 'Add new folder',
        suffix: 'Create a new folder in the current directory or workspace.',
        icon: 'i-lucide-folder-plus',
        kbds: [
          'meta',
          'F'
        ],
        onSelect() {
          toast.add({ title: 'Add new folder' })
        }
      },
      {
        label: 'Add hashtag',
        suffix: 'Add a hashtag to the current item.',
        icon: 'i-lucide-hash',
        kbds: [
          'meta',
          'H'
        ],
        onSelect() {
          toast.add({ title: 'Add hashtag' })
        }
      },
      {
        label: 'Add label',
        suffix: 'Add a label to the current item.',
        icon: 'i-lucide-tag',
        kbds: [
          'meta',
          'L'
        ],
        onSelect() {
          toast.add({ title: 'Add label' })
        }
      }
    ]
  }
])

function onSelect(item: any) {
  console.log(item)
}
</script>

<template>
  <UCommandPalette
    :groups="groups"
    class="flex-1 h-80"
    @update:model-value="onSelect"
  />
</template>
```

### Control search term

Use the `v-model:search-term` directive to control the search term.

```vue [CommandPaletteSearchTermExample.vue]
<script setup lang="ts">
const users = [
  {
    label: 'Benjamin Canac',
    suffix: 'benjamincanac',
    to: 'https://github.com/benjamincanac',
    target: '_blank',
    avatar: {
      src: 'https://github.com/benjamincanac.png'
    }
  },
  {
    label: 'Sylvain Marroufin',
    suffix: 'smarroufin',
    to: 'https://github.com/smarroufin',
    target: '_blank',
    avatar: {
      src: 'https://github.com/smarroufin.png'
    }
  },
  {
    label: 'Sébastien Chopin',
    suffix: 'atinux',
    to: 'https://github.com/atinux',
    target: '_blank',
    avatar: {
      src: 'https://github.com/atinux.png'
    }
  },
  {
    label: 'Romain Hamel',
    suffix: 'romhml',
    to: 'https://github.com/romhml',
    target: '_blank',
    avatar: {
      src: 'https://github.com/romhml.png'
    }
  },
  {
    label: 'Haytham A. Salama',
    suffix: 'Haythamasalama',
    to: 'https://github.com/Haythamasalama',
    target: '_blank',
    avatar: {
      src: 'https://github.com/Haythamasalama.png'
    }
  },
  {
    label: 'Daniel Roe',
    suffix: 'danielroe',
    to: 'https://github.com/danielroe',
    target: '_blank',
    avatar: {
      src: 'https://github.com/danielroe.png'
    }
  },
  {
    label: 'Neil Richter',
    suffix: 'noook',
    to: 'https://github.com/noook',
    target: '_blank',
    avatar: {
      src: 'https://github.com/noook.png'
    }
  }
]

const searchTerm = ref('B')

function onSelect() {
  searchTerm.value = ''
}
</script>

<template>
  <UCommandPalette
    v-model:search-term="searchTerm"
    :groups="[{ id: 'users', items: users }]"
    class="flex-1"
    @update:model-value="onSelect"
  />
</template>
```

<note>

This example uses the `@update:model-value` event to reset the search term when an item is selected.

</note>

### With children in items <badge className="align-text-top" label="New"></badge>

You can create hierarchical menus by using the `children` property in items. When an item has children, it will automatically display a chevron icon and enable navigation into a submenu.

```vue [CommandPaletteItemsChildrenExample.vue]
<script setup lang="ts">
const toast = useToast()

const groups = [{
  id: 'actions',
  label: 'Actions',
  items: [{
    label: 'Create new',
    icon: 'i-lucide-plus',
    children: [{
      label: 'New file',
      icon: 'i-lucide-file-plus',
      suffix: 'Create a new file in the current directory',
      onSelect(e: Event) {
        e.preventDefault()
        toast.add({ title: 'New file created!' })
      },
      kbds: ['meta', 'N']
    }, {
      label: 'New folder',
      icon: 'i-lucide-folder-plus',
      suffix: 'Create a new folder in the current directory',
      onSelect(e: Event) {
        e.preventDefault()
        toast.add({ title: 'New folder created!' })
      },
      kbds: ['meta', 'F']
    }, {
      label: 'New project',
      icon: 'i-lucide-folder-git',
      suffix: 'Create a new project from a template',
      onSelect(e: Event) {
        e.preventDefault()
        toast.add({ title: 'New project created!' })
      },
      kbds: ['meta', 'P']
    }]
  }, {
    label: 'Share',
    icon: 'i-lucide-share',
    children: [{
      label: 'Copy link',
      icon: 'i-lucide-link',
      suffix: 'Copy a link to the current item',
      onSelect(e: Event) {
        e.preventDefault()
        toast.add({ title: 'Link copied to clipboard!' })
      },
      kbds: ['meta', 'L']
    }, {
      label: 'Share via email',
      icon: 'i-lucide-mail',
      suffix: 'Share the current item via email',
      onSelect(e: Event) {
        e.preventDefault()
        toast.add({ title: 'Share via email dialog opened!' })
      }
    }, {
      label: 'Share on social',
      icon: 'i-lucide-share-2',
      suffix: 'Share the current item on social media',
      children: [{
        label: 'Twitter',
        icon: 'i-simple-icons-twitter',
        onSelect(e: Event) {
          e.preventDefault()
          toast.add({ title: 'Shared on Twitter!' })
        }
      }, {
        label: 'LinkedIn',
        icon: 'i-simple-icons-linkedin',
        onSelect(e: Event) {
          e.preventDefault()
          toast.add({ title: 'Shared on LinkedIn!' })
        }
      }, {
        label: 'Facebook',
        icon: 'i-simple-icons-facebook',
        onSelect(e: Event) {
          e.preventDefault()
          toast.add({ title: 'Shared on Facebook!' })
        }
      }]
    }]
  }, {
    label: 'Settings',
    icon: 'i-lucide-settings',
    children: [{
      label: 'General',
      icon: 'i-lucide-sliders',
      suffix: 'Configure general settings',
      onSelect(e: Event) {
        e.preventDefault()
        toast.add({ title: 'General settings opened!' })
      }
    }, {
      label: 'Appearance',
      icon: 'i-lucide-palette',
      suffix: 'Customize the appearance',
      onSelect(e: Event) {
        e.preventDefault()
        toast.add({ title: 'Appearance settings opened!' })
      }
    }, {
      label: 'Security',
      icon: 'i-lucide-shield',
      suffix: 'Manage security settings',
      onSelect(e: Event) {
        e.preventDefault()
        toast.add({ title: 'Security settings opened!' })
      }
    }]
  }]
}]
</script>

<template>
  <UCommandPalette :groups="groups" class="flex-1" />
</template>
```

<note>

When navigating into a submenu:

- The search term is reset
- A back button appears in the input
- You can go back to the previous group by pressing the <kbd value="backspace">



</kbd>

 key

</note>

### With fetched items

You can fetch items from an API and use them in the CommandPalette.

```vue [CommandPaletteFetchExample.vue]
<script setup lang="ts">
const searchTerm = ref('')

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  key: 'command-palette-users',
  transform: (data: { id: number, name: string, email: string }[]) => {
    return data?.map(user => ({ id: user.id, label: user.name, suffix: user.email, avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` } })) || []
  },
  lazy: true
})

const groups = computed(() => [{
  id: 'users',
  label: searchTerm.value ? `Users matching “${searchTerm.value}”...` : 'Users',
  items: users.value || []
}])
</script>

<template>
  <UCommandPalette
    v-model:search-term="searchTerm"
    :loading="status === 'pending'"
    :groups="groups"
    class="flex-1 h-80"
  />
</template>
```

### With ignore filter

You can set the `ignoreFilter` field to `true` on a group to disable the internal search and use your own search logic.

```vue [CommandPaletteIgnoreFilterExample.vue]
<script setup lang="ts">
import { refDebounced } from '@vueuse/core'

const searchTerm = ref('')
const searchTermDebounced = refDebounced(searchTerm, 200)

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  params: { q: searchTermDebounced },
  transform: (data: { id: number, name: string, email: string }[]) => {
    return data?.map(user => ({ id: user.id, label: user.name, suffix: user.email, avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` } })) || []
  },
  lazy: true
})

const groups = computed(() => [{
  id: 'users',
  label: searchTerm.value ? `Users matching “${searchTerm.value}”...` : 'Users',
  items: users.value || [],
  ignoreFilter: true
}])
</script>

<template>
  <UCommandPalette
    v-model:search-term="searchTerm"
    :loading="status === 'pending'"
    :groups="groups"
    class="flex-1 h-80"
  />
</template>
```

<note>

This example uses [`refDebounced`](https://vueuse.org/shared/refDebounced/#refdebounced) to debounce the API calls.

</note>

### With post-filtered items

You can use the `postFilter` field on a group to filter items after the search happened.

```vue [CommandPalettePostFilterExample.vue]
<script setup lang="ts">
const items = [
  {
    id: '/',
    label: 'Introduction',
    level: 1
  },
  {
    id: '/getting-started#whats-new-in-v3',
    label: 'What\'s new in v3?',
    level: 2
  },
  {
    id: '/getting-started#reka-ui',
    label: 'Reka UI',
    level: 3
  },
  {
    id: '/getting-started#tailwind-css-v4',
    label: 'Tailwind CSS v4',
    level: 3
  },
  {
    id: '/getting-started#tailwind-variants',
    label: 'Tailwind Variants',
    level: 3
  },
  {
    id: '/getting-started/installation',
    label: 'Installation',
    level: 1
  }
]

function postFilter(searchTerm: string, items: any[]) {
  // Filter only first level items if no searchTerm
  if (!searchTerm) {
    return items?.filter(item => item.level === 1)
  }

  return items
}
</script>

<template>
  <UCommandPalette :groups="[{ id: 'files', items, postFilter }]" class="flex-1" />
</template>
```

<note>

Start typing to see items with higher level appear.

</note>

### With custom fuse search

You can use the `fuse` prop to override the options of [useFuse](https://vueuse.org/integrations/useFuse) which defaults to:

```ts
{
  fuseOptions: {
    ignoreLocation: true,
    threshold: 0.1,
    keys: ['label', 'suffix']
  },
  resultLimit: 12,
  matchAllWhenSearchEmpty: true
}
```

<tip>

The `fuseOptions` are the options of [Fuse.js](https://www.fusejs.io/api/options.html), the `resultLimit` is the maximum number of results to return and the `matchAllWhenSearchEmpty` is a boolean to match all items when the search term is empty.

</tip>

You can for example set `{ fuseOptions: { includeMatches: true } }` to highlight the search term in the items.

```vue [CommandPaletteFuseExample.vue]
<script setup lang="ts">
const { data: users } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  key: 'command-palette-users',
  transform: (data: { id: number, name: string, email: string }[]) => {
    return data?.map(user => ({ id: user.id, label: user.name, suffix: user.email, avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` } })) || []
  },
  lazy: true
})
</script>

<template>
  <UCommandPalette
    :groups="[{ id: 'users', items: users || [] }]"
    :fuse="{ fuseOptions: { includeMatches: true } }"
    class="flex-1 h-80"
  />
</template>
```

### Within a Popover

You can use the CommandPalette component inside a [Popover](/components/popover)'s content.

```vue [PopoverCommandPaletteExample.vue]
<script setup lang="ts">
const items = ref([
  {
    label: 'bug',
    value: 'bug',
    chip: {
      color: 'error' as const
    }
  },
  {
    label: 'feature',
    value: 'feature',
    chip: {
      color: 'success' as const
    }
  },
  {
    label: 'enhancement',
    value: 'enhancement',
    chip: {
      color: 'info' as const
    }
  }
])
const label = ref([])
</script>

<template>
  <UPopover :content="{ side: 'right', align: 'start' }">
    <UButton
      icon="i-lucide-tag"
      label="Select labels"
      color="neutral"
      variant="subtle"
    />

    <template #content>
      <UCommandPalette
        v-model="label"
        multiple
        placeholder="Search labels..."
        :groups="[{ id: 'labels', items }]"
        :ui="{ input: '[&>input]:h-8 [&>input]:text-sm' }"
      />
    </template>
  </UPopover>
</template>
```

### Within a Modal

You can use the CommandPalette component inside a [Modal](/components/modal)'s content.

```vue [ModalCommandPaletteExample.vue]
<script setup lang="ts">
const searchTerm = ref('')

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  key: 'command-palette-users',
  params: { q: searchTerm },
  transform: (data: { id: number, name: string, email: string }[]) => {
    return data?.map(user => ({ id: user.id, label: user.name, suffix: user.email, avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` } })) || []
  },
  lazy: true
})

const groups = computed(() => [{
  id: 'users',
  label: searchTerm.value ? `Users matching “${searchTerm.value}”...` : 'Users',
  items: users.value || [],
  ignoreFilter: true
}])
</script>

<template>
  <UModal>
    <UButton
      label="Search users..."
      color="neutral"
      variant="subtle"
      icon="i-lucide-search"
    />

    <template #content>
      <UCommandPalette
        v-model:search-term="searchTerm"
        :loading="status === 'pending'"
        :groups="groups"
        placeholder="Search users..."
        class="h-80"
      />
    </template>
  </UModal>
</template>
```

### Within a Drawer

You can use the CommandPalette component inside a [Drawer](/components/drawer)'s content.

```vue [DrawerCommandPaletteExample.vue]
<script setup lang="ts">
const searchTerm = ref('')

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  key: 'command-palette-users',
  params: { q: searchTerm },
  transform: (data: { id: number, name: string, email: string }[]) => {
    return data?.map(user => ({ id: user.id, label: user.name, suffix: user.email, avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` } })) || []
  },
  lazy: true
})

const groups = computed(() => [{
  id: 'users',
  label: searchTerm.value ? `Users matching “${searchTerm.value}”...` : 'Users',
  items: users.value || [],
  ignoreFilter: true
}])
</script>

<template>
  <UDrawer :handle="false">
    <UButton
      label="Search users..."
      color="neutral"
      variant="subtle"
      icon="i-lucide-search"
    />

    <template #content>
      <UCommandPalette
        v-model:search-term="searchTerm"
        :loading="status === 'pending'"
        :groups="groups"
        placeholder="Search users..."
        class="h-80"
      />
    </template>
  </UDrawer>
</template>
```

### Listen open state

When using the `close` prop, you can listen to the `update:open` event when the button is clicked.

```vue [CommandPaletteOpenExample.vue]
<script setup lang="ts">
const open = ref(false)

const users = [
  {
    label: 'Benjamin Canac',
    suffix: 'benjamincanac',
    to: 'https://github.com/benjamincanac',
    target: '_blank',
    avatar: {
      src: 'https://github.com/benjamincanac.png'
    }
  },
  {
    label: 'Sylvain Marroufin',
    suffix: 'smarroufin',
    to: 'https://github.com/smarroufin',
    target: '_blank',
    avatar: {
      src: 'https://github.com/smarroufin.png'
    }
  },
  {
    label: 'Sébastien Chopin',
    suffix: 'atinux',
    to: 'https://github.com/atinux',
    target: '_blank',
    avatar: {
      src: 'https://github.com/atinux.png'
    }
  },
  {
    label: 'Romain Hamel',
    suffix: 'romhml',
    to: 'https://github.com/romhml',
    target: '_blank',
    avatar: {
      src: 'https://github.com/romhml.png'
    }
  },
  {
    label: 'Haytham A. Salama',
    suffix: 'Haythamasalama',
    to: 'https://github.com/Haythamasalama',
    target: '_blank',
    avatar: {
      src: 'https://github.com/Haythamasalama.png'
    }
  },
  {
    label: 'Daniel Roe',
    suffix: 'danielroe',
    to: 'https://github.com/danielroe',
    target: '_blank',
    avatar: {
      src: 'https://github.com/danielroe.png'
    }
  },
  {
    label: 'Neil Richter',
    suffix: 'noook',
    to: 'https://github.com/noook',
    target: '_blank',
    avatar: {
      src: 'https://github.com/noook.png'
    }
  }
]
</script>

<template>
  <UModal v-model:open="open">
    <UButton
      label="Search users..."
      color="neutral"
      variant="subtle"
      icon="i-lucide-search"
    />

    <template #content>
      <UCommandPalette close :groups="[{ id: 'users', items: users }]" @update:open="open = $event" />
    </template>
  </UModal>
</template>
```

<note>

This can be useful when using the CommandPalette inside a [`Modal`](/components/modal) for example.

</note>

### With footer slot <badge className="align-text-top" label="Soon"></badge>

Use the `#footer` slot to add custom content at the bottom of the CommandPalette, such as keyboard shortcuts help or additional actions.

```vue [CommandPaletteFooterSlotExample.vue]
<script setup lang="ts">
const groups = [
  {
    id: 'actions',
    items: [
      {
        label: 'Add new file',
        suffix: 'Create a new file in the current directory',
        icon: 'i-lucide-file-plus',
        kbds: ['meta', 'N']
      },
      {
        label: 'Add new folder',
        suffix: 'Create a new folder in the current directory',
        icon: 'i-lucide-folder-plus',
        kbds: ['meta', 'F']
      },
      {
        label: 'Search files',
        suffix: 'Search across all files in the project',
        icon: 'i-lucide-search',
        kbds: ['meta', 'P']
      },
      {
        label: 'Settings',
        suffix: 'Open application settings',
        icon: 'i-lucide-settings',
        kbds: ['meta', ',']
      }
    ]
  },
  {
    id: 'recent',
    label: 'Recent',
    items: [
      {
        label: 'project.vue',
        suffix: 'components/',
        icon: 'i-vscode-icons-file-type-vue'
      },
      {
        label: 'readme.md',
        suffix: 'docs/',
        icon: 'i-vscode-icons-file-type-markdown'
      },
      {
        label: 'package.json',
        suffix: 'root/',
        icon: 'i-vscode-icons-file-type-node'
      }
    ]
  }
]
</script>

<template>
  <UCommandPalette :groups="groups" class="flex-1 h-80">
    <template #footer>
      <div class="flex items-center justify-between gap-2">
        <UIcon name="i-simple-icons-nuxtdotjs" class="size-5 text-dimmed ml-1" />
        <div class="flex items-center gap-1">
          <UButton color="neutral" variant="ghost" label="Open Command" class="text-dimmed" size="xs">
            <template #trailing>
              <UKbd value="enter" />
            </template>
          </UButton>
          <USeparator orientation="vertical" class="h-4" />
          <UButton color="neutral" variant="ghost" label="Actions" class="text-dimmed" size="xs">
            <template #trailing>
              <UKbd value="meta" />
              <UKbd value="k" />
            </template>
          </UButton>
        </div>
      </div>
    </template>
  </UCommandPalette>
</template>
```

### With custom slot

Use the `slot` property to customize a specific item or group.

You will have access to the following slots:

- `#{{ item.slot }}`
- `#{{ item.slot }}-leading`
- `#{{ item.slot }}-label`
- `#{{ item.slot }}-trailing`
- `#{{ group.slot }}`
- `#{{ group.slot }}-leading`
- `#{{ group.slot }}-label`
- `#{{ group.slot }}-trailing`

```vue [CommandPaletteCustomSlotExample.vue]
<script setup lang="ts">
const groups = [
  {
    id: 'settings',
    items: [
      {
        label: 'Profile',
        icon: 'i-lucide-user',
        kbds: ['meta', 'P']
      },
      {
        label: 'Billing',
        icon: 'i-lucide-credit-card',
        kbds: ['meta', 'B'],
        slot: 'billing' as const
      },
      {
        label: 'Notifications',
        icon: 'i-lucide-bell'
      },
      {
        label: 'Security',
        icon: 'i-lucide-lock'
      }
    ]
  },
  {
    id: 'users',
    label: 'Users',
    slot: 'users' as const,
    items: [
      {
        label: 'Benjamin Canac',
        suffix: 'benjamincanac',
        to: 'https://github.com/benjamincanac',
        target: '_blank'
      },
      {
        label: 'Sylvain Marroufin',
        suffix: 'smarroufin',
        to: 'https://github.com/smarroufin',
        target: '_blank'
      },
      {
        label: 'Sébastien Chopin',
        suffix: 'atinux',
        to: 'https://github.com/atinux',
        target: '_blank'
      },
      {
        label: 'Romain Hamel',
        suffix: 'romhml',
        to: 'https://github.com/romhml',
        target: '_blank'
      },
      {
        label: 'Haytham A. Salama',
        suffix: 'Haythamasalama',
        to: 'https://github.com/Haythamasalama',
        target: '_blank'
      },
      {
        label: 'Daniel Roe',
        suffix: 'danielroe',
        to: 'https://github.com/danielroe',
        target: '_blank'
      },
      {
        label: 'Neil Richter',
        suffix: 'noook',
        to: 'https://github.com/noook',
        target: '_blank'
      }
    ]
  }
]
</script>

<template>
  <UCommandPalette :groups="groups" class="flex-1 h-80">
    <template #users-leading="{ item }">
      <UAvatar :src="`https://github.com/${item.suffix}.png`" size="2xs" />
    </template>

    <template #billing-label="{ item }">
      <span class="font-medium text-primary">{{ item.label }}</span>

      <UBadge variant="subtle" size="sm">
        50% off
      </UBadge>
    </template>
  </UCommandPalette>
</template>
```

<tip to="#slots">

You can also use the `#item`, `#item-leading`, `#item-label` and `#item-trailing` slots to customize all items.

</tip>

## API

### Props

```ts
/**
 * Props for the CommandPalette component
 */
interface CommandPaletteProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  /**
   * The icon displayed in the input.
   */
  icon?: string | undefined;
  /**
   * The icon displayed when an item is selected.
   */
  selectedIcon?: string | undefined;
  /**
   * The icon displayed when an item has children.
   */
  trailingIcon?: string | undefined;
  /**
   * The placeholder text for the input.
   */
  placeholder?: string | undefined;
  /**
   * Automatically focus the input when component is mounted.
   * @default "true"
   */
  autofocus?: boolean | undefined;
  /**
   * Display a close button in the input (useful when inside a Modal for example).
   * `{ size: 'md', color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   */
  close?: boolean | Partial<ButtonProps> | undefined;
  /**
   * The icon displayed in the close button.
   */
  closeIcon?: string | undefined;
  /**
   * Display a button to navigate back in history.
   * `{ size: 'md', color: 'neutral', variant: 'link' }`{lang="ts-type"}
   * @default "true"
   */
  back?: boolean | ButtonProps | undefined;
  /**
   * The icon displayed in the back button.
   */
  backIcon?: string | undefined;
  groups?: CommandPaletteGroup<CommandPaletteItem>[] | undefined;
  /**
   * Options for [useFuse](https://vueuse.org/integrations/useFuse).
   */
  fuse?: UseFuseOptions<CommandPaletteItem> | undefined;
  /**
   * The key used to get the label from the item.
   * @default "\"label\""
   */
  labelKey?: string | undefined;
  ui?: { root?: ClassNameValue; input?: ClassNameValue; close?: ClassNameValue; back?: ClassNameValue; content?: ClassNameValue; footer?: ClassNameValue; viewport?: ClassNameValue; group?: ClassNameValue; empty?: ClassNameValue; label?: ClassNameValue; item?: ClassNameValue; itemLeadingIcon?: ClassNameValue; itemLeadingAvatar?: ClassNameValue; itemLeadingAvatarSize?: ClassNameValue; itemLeadingChip?: ClassNameValue; itemLeadingChipSize?: ClassNameValue; itemTrailing?: ClassNameValue; itemTrailingIcon?: ClassNameValue; itemTrailingHighlightedIcon?: ClassNameValue; itemTrailingKbds?: ClassNameValue; itemTrailingKbdsSize?: ClassNameValue; itemLabel?: ClassNameValue; itemLabelBase?: ClassNameValue; itemLabelPrefix?: ClassNameValue; itemLabelSuffix?: ClassNameValue; } | undefined;
  /**
   * Whether multiple options can be selected or not.
   */
  multiple?: boolean | undefined;
  /**
   * When `true`, prevents the user from interacting with listbox
   */
  disabled?: boolean | undefined;
  /**
   * The controlled value of the listbox. Can be binded with with `v-model`.
   * @default "\"\""
   */
  modelValue?: AcceptableValue | AcceptableValue[] | undefined;
  /**
   * The value of the listbox when initially rendered. Use when you do not need to control the state of the Listbox
   */
  defaultValue?: AcceptableValue | AcceptableValue[] | undefined;
  /**
   * When `true`, hover over item will trigger highlight
   */
  highlightOnHover?: boolean | undefined;
  /**
   * How multiple selection should behave in the collection.
   */
  selectionBehavior?: "toggle" | "replace" | undefined;
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
 * Slots for the CommandPalette component
 */
interface CommandPaletteSlots {
  empty(): any;
  footer(): any;
  back(): any;
  close(): any;
  item(): any;
  item-leading(): any;
  item-label(): any;
  item-trailing(): any;
}
```

### Emits

```ts
/**
 * Emitted events for the CommandPalette component
 */
interface CommandPaletteEmits {
  update:modelValue: (payload: [value: CommandPaletteItem]) => void;
  highlight: (payload: [payload: { ref: HTMLElement; value: CommandPaletteItem; } | undefined]) => void;
  entryFocus: (payload: [event: CustomEvent<any>]) => void;
  leave: (payload: [event: Event]) => void;
  update:open: (payload: [value: boolean]) => void;
  update:searchTerm: (payload: [value: string]) => void;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    commandPalette: {
      slots: {
        root: 'flex flex-col min-h-0 min-w-0 divide-y divide-default',
        input: '[&>input]:h-12',
        close: '',
        back: 'p-0',
        content: 'relative overflow-hidden flex flex-col',
        footer: 'p-1',
        viewport: 'relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1 focus:outline-none',
        group: 'p-1 isolate',
        empty: 'py-6 text-center text-sm text-muted',
        label: 'p-1.5 text-xs font-semibold text-highlighted',
        item: 'group relative w-full flex items-center gap-1.5 p-1.5 text-sm select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75',
        itemLeadingIcon: 'shrink-0 size-5',
        itemLeadingAvatar: 'shrink-0',
        itemLeadingAvatarSize: '2xs',
        itemLeadingChip: 'shrink-0 size-5',
        itemLeadingChipSize: 'md',
        itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
        itemTrailingIcon: 'shrink-0 size-5',
        itemTrailingHighlightedIcon: 'shrink-0 size-5 text-dimmed hidden group-data-highlighted:inline-flex',
        itemTrailingKbds: 'hidden lg:inline-flex items-center shrink-0 gap-0.5',
        itemTrailingKbdsSize: 'md',
        itemLabel: 'truncate space-x-1 rtl:space-x-reverse text-dimmed',
        itemLabelBase: 'text-highlighted [&>mark]:text-inverted [&>mark]:bg-primary',
        itemLabelPrefix: 'text-default',
        itemLabelSuffix: 'text-dimmed [&>mark]:text-inverted [&>mark]:bg-primary'
      },
      variants: {
        active: {
          true: {
            item: 'text-highlighted before:bg-elevated',
            itemLeadingIcon: 'text-default'
          },
          false: {
            item: [
              'text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50',
              'transition-colors before:transition-colors'
            ],
            itemLeadingIcon: [
              'text-dimmed group-data-highlighted:not-group-data-disabled:text-default',
              'transition-colors'
            ]
          }
        },
        loading: {
          true: {
            itemLeadingIcon: 'animate-spin'
          }
        }
      }
    }
  }
})
```
