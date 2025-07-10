# DropdownMenu

> A menu to display actions when clicking on an element.

## Usage

Use a [Button](/components/button) or any other component in the default slot of the DropdownMenu.

### Items

Use the `items` prop as an array of objects with the following properties:

- `label?: string`
- `icon?: string`
- `color?: string`
- `avatar?: AvatarProps`
- `kbds?: string[] | KbdProps[]`
- [`type?: "link" | "label" | "separator" | "checkbox"`](#with-checkbox-items)
- [`color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral"`](#with-color-items)
- [`checked?: boolean`](#with-checkbox-items)
- `disabled?: boolean`
- [`slot?: string`](#with-custom-slot)
- `onSelect?(e: Event): void`
- [`onUpdateChecked?(checked: boolean): void`](#with-checkbox-items)
- `children?: DropdownMenuItem[] | DropdownMenuItem[][]`
- `class?: any`
- `ui?: { item?: ClassNameValue, label?: ClassNameValue, separator?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLabel?: ClassNameValue, itemLabelExternalIcon?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingIcon?: ClassNameValue, itemTrailingKbds?: ClassNameValue, itemTrailingKbdsSize?: ClassNameValue }`

You can pass any property from the [Link](/components/link#props) component such as `to`, `target`, etc.

```vue
<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'Benjamin',
      avatar: {
        src: 'https://github.com/benjamincanac.png',
      },
      type: 'label',
    },
  ],
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user',
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card',
    },
    {
      label: 'Settings',
      icon: 'i-lucide-cog',
      kbds: [
        ',',
      ],
    },
    {
      label: 'Keyboard shortcuts',
      icon: 'i-lucide-monitor',
    },
  ],
  [
    {
      label: 'Team',
      icon: 'i-lucide-users',
    },
    {
      label: 'Invite users',
      icon: 'i-lucide-user-plus',
      children: [
        [
          {
            label: 'Email',
            icon: 'i-lucide-mail',
          },
          {
            label: 'Message',
            icon: 'i-lucide-message-square',
          },
        ],
        [
          {
            label: 'More',
            icon: 'i-lucide-circle-plus',
          },
        ],
      ],
    },
    {
      label: 'New team',
      icon: 'i-lucide-plus',
      kbds: [
        'meta',
        'n',
      ],
    },
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/nuxt/ui',
      target: '_blank',
    },
    {
      label: 'Support',
      icon: 'i-lucide-life-buoy',
      to: '/components/dropdown-menu',
    },
    {
      label: 'API',
      icon: 'i-lucide-cloud',
      disabled: true,
    },
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      kbds: [
        'shift',
        'meta',
        'q',
      ],
    },
  ],
])
</script>

<template>
  <UDropdownMenu :items="items">
    <UButton icon="i-lucide-menu" color="neutral" variant="outline" />
  </UDropdownMenu>
</template>
```

<note>

You can also pass an array of arrays to the `items` prop to create separated groups of items.

</note>

<tip>

Each item can take a `children` array of objects with the same properties as the `items` prop to create a nested menu which can be controlled using the `open`, `defaultOpen` and `content` properties.

</tip>

### Content

Use the `content` prop to control how the DropdownMenu content is rendered, like its `align` or `side` for example.

```vue
<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Profile',
    icon: 'i-lucide-user',
  },
  {
    label: 'Billing',
    icon: 'i-lucide-credit-card',
  },
  {
    label: 'Settings',
    icon: 'i-lucide-cog',
  },
])
</script>

<template>
  <UDropdownMenu :items="items">
    <UButton label="Open" icon="i-lucide-menu" color="neutral" variant="outline" />
  </UDropdownMenu>
</template>
```

### Arrow

Use the `arrow` prop to display an arrow on the DropdownMenu.

```vue
<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Profile',
    icon: 'i-lucide-user',
  },
  {
    label: 'Billing',
    icon: 'i-lucide-credit-card',
  },
  {
    label: 'Settings',
    icon: 'i-lucide-cog',
  },
])
</script>

<template>
  <UDropdownMenu arrow :items="items">
    <UButton label="Open" icon="i-lucide-menu" color="neutral" variant="outline" />
  </UDropdownMenu>
</template>
```

### Size

Use the `size` prop to control the size of the DropdownMenu.

```vue
<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Profile',
    icon: 'i-lucide-user',
  },
  {
    label: 'Billing',
    icon: 'i-lucide-credit-card',
  },
  {
    label: 'Settings',
    icon: 'i-lucide-cog',
  },
])
</script>

<template>
  <UDropdownMenu size="xl" :items="items">
    <UButton size="xl" label="Open" icon="i-lucide-menu" color="neutral" variant="outline" />
  </UDropdownMenu>
</template>
```

<warning>

The `size` prop will not be proxied to the Button, you need to set it yourself.

</warning>

<note>

When using the same size, the DropdownMenu items will be perfectly aligned with the Button.

</note>

### Disabled

Use the `disabled` prop to disable the DropdownMenu.

```vue
<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Profile',
    icon: 'i-lucide-user',
  },
  {
    label: 'Billing',
    icon: 'i-lucide-credit-card',
  },
  {
    label: 'Settings',
    icon: 'i-lucide-cog',
  },
])
</script>

<template>
  <UDropdownMenu disabled :items="items">
    <UButton label="Open" icon="i-lucide-menu" color="neutral" variant="outline" />
  </UDropdownMenu>
</template>
```

## Examples

### With checkbox items

You can use the `type` property with `checkbox` and use the `checked` / `onUpdateChecked` properties to control the checked state of the item.

```vue [DropdownMenuCheckboxItemsExample.vue]
<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const showBookmarks = ref(true)
const showHistory = ref(false)
const showDownloads = ref(false)

const items = computed(() => [{
  label: 'Interface',
  icon: 'i-lucide-app-window',
  type: 'label' as const
}, {
  type: 'separator' as const
}, {
  label: 'Show Bookmarks',
  icon: 'i-lucide-bookmark',
  type: 'checkbox' as const,
  checked: showBookmarks.value,
  onUpdateChecked(checked: boolean) {
    showBookmarks.value = checked
  },
  onSelect(e: Event) {
    e.preventDefault()
  }
}, {
  label: 'Show History',
  icon: 'i-lucide-clock',
  type: 'checkbox' as const,
  checked: showHistory.value,
  onUpdateChecked(checked: boolean) {
    showHistory.value = checked
  }
}, {
  label: 'Show Downloads',
  icon: 'i-lucide-download',
  type: 'checkbox' as const,
  checked: showDownloads.value,
  onUpdateChecked(checked: boolean) {
    showDownloads.value = checked
  }
}] satisfies DropdownMenuItem[])
</script>

<template>
  <UDropdownMenu :items="items" :content="{ align: 'start' }" :ui="{ content: 'w-48' }">
    <UButton label="Open" color="neutral" variant="outline" icon="i-lucide-menu" />
  </UDropdownMenu>
</template>
```

<note>

To ensure reactivity for the `checked` state of items, it's recommended to wrap your `items` array inside a `computed`.

</note>

### With color items

You can use the `color` property to highlight certain items with a color.

```vue [DropdownMenuColorItemsExample.vue]
<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const items: DropdownMenuItem[][] = [
  [
    {
      label: 'View',
      icon: 'i-lucide-eye'
    },
    {
      label: 'Copy',
      icon: 'i-lucide-copy'
    },
    {
      label: 'Edit',
      icon: 'i-lucide-pencil'
    }
  ],
  [
    {
      label: 'Delete',
      color: 'error',
      icon: 'i-lucide-trash'
    }
  ]
]
</script>

<template>
  <UDropdownMenu :items="items" :ui="{ content: 'w-48' }">
    <UButton label="Open" color="neutral" variant="outline" icon="i-lucide-menu" />
  </UDropdownMenu>
</template>
```

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

```vue [DropdownMenuOpenExample.vue]
<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})

const items: DropdownMenuItem[] = [
  {
    label: 'Profile',
    icon: 'i-lucide-user'
  }, {
    label: 'Billing',
    icon: 'i-lucide-credit-card'
  }, {
    label: 'Settings',
    icon: 'i-lucide-cog'
  }
]
</script>

<template>
  <UDropdownMenu v-model:open="open" :items="items" :ui="{ content: 'w-48' }">
    <UButton label="Open" color="neutral" variant="outline" icon="i-lucide-menu" />
  </UDropdownMenu>
</template>
```

<note>

In this example, leveraging [`defineShortcuts`](/composables/define-shortcuts), you can toggle the DropdownMenu by pressing <kbd value="O">



</kbd>

.

</note>

### With custom slot

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}`
- `#{{ item.slot }}-leading`
- `#{{ item.slot }}-label`
- `#{{ item.slot }}-trailing`

```vue [DropdownMenuCustomSlotExample.vue]
<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const items = [
  {
    label: 'Profile',
    icon: 'i-lucide-user',
    slot: 'profile' as const
  }, {
    label: 'Billing',
    icon: 'i-lucide-credit-card'
  }, {
    label: 'Settings',
    icon: 'i-lucide-cog'
  }
] satisfies DropdownMenuItem[]
</script>

<template>
  <UDropdownMenu :items="items" :ui="{ content: 'w-48' }">
    <UButton label="Open" color="neutral" variant="outline" icon="i-lucide-menu" />

    <template #profile-trailing>
      <UIcon name="i-lucide-badge-check" class="shrink-0 size-5 text-primary" />
    </template>
  </UDropdownMenu>
</template>
```

<tip to="#slots">

You can also use the `#item`, `#item-leading`, `#item-label` and `#item-trailing` slots to customize all items.

</tip>

### Extract shortcuts

When you have some items with `kbds` property (displaying some [Kbd](/components/kbd)), you can easily make them work with the [defineShortcuts](/composables/define-shortcuts) composable.

Inside the `defineShortcuts` composable, there is an `extractShortcuts` utility that will extract the shortcuts recursively from the items and return an object that you can pass to `defineShortcuts`. It will automatically call the `select` function of the item when the shortcut is pressed.

```vue
<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const items: DropdownMenuItem[] = [{
  label: 'Invite users',
  icon: 'i-lucide-user-plus',
  children: [{
    label: 'Invite by email',
    icon: 'i-lucide-send-horizontal',
    kbds: ['meta', 'e'],
    onSelect() {
      console.log('Invite by email clicked')
    }
  }, {
    label: 'Invite by link',
    icon: 'i-lucide-link',
    kbds: ['meta', 'i'],
    onSelect() {
      console.log('Invite by link clicked')
    }
  }]
}, {
  label: 'New team',
  icon: 'i-lucide-plus',
  kbds: ['meta', 'n'],
  onSelect() {
    console.log('New team clicked')
  }
}]

defineShortcuts(extractShortcuts(items))
</script>
```

<note>

In this example, <kbd value="meta">



</kbd>

 <kbd value="E">



</kbd>

, <kbd value="meta">



</kbd>

 <kbd value="I">



</kbd>

 and <kbd value="meta">



</kbd>

 <kbd value="N">



</kbd>

 would trigger the `select` function of the corresponding item.

</note>

## API

### Props

```ts
/**
 * Props for the DropdownMenu component
 */
interface DropdownMenuProps {
  size?: "sm" | "md" | "xs" | "lg" | "xl" | undefined;
  items?: ArrayOrNested<DropdownMenuItem> | undefined;
  /**
   * The icon displayed when an item is checked.
   */
  checkedIcon?: string | undefined;
  /**
   * The icon displayed when an item is loading.
   */
  loadingIcon?: string | undefined;
  /**
   * The icon displayed when the item is an external link.
   * Set to `false` to hide the external icon.
   * @default "true"
   */
  externalIcon?: string | boolean | undefined;
  /**
   * The content of the menu.
   */
  content?: (Omit<DropdownMenuContentProps, "as" | "asChild" | "forceMount"> & Partial<EmitsToProps<MenuContentEmits>>) | undefined;
  /**
   * Display an arrow alongside the menu.
   */
  arrow?: boolean | Omit<DropdownMenuArrowProps, "as" | "asChild"> | undefined;
  /**
   * Render the menu in a portal.
   * @default "true"
   */
  portal?: string | boolean | HTMLElement | undefined;
  /**
   * The key used to get the label from the item.
   * @default "\"label\""
   */
  labelKey?: keyof DropdownMenuItem | undefined;
  disabled?: boolean | undefined;
  ui?: { content?: ClassNameValue; viewport?: ClassNameValue; arrow?: ClassNameValue; group?: ClassNameValue; label?: ClassNameValue; separator?: ClassNameValue; item?: ClassNameValue; itemLeadingIcon?: ClassNameValue; itemLeadingAvatar?: ClassNameValue; itemLeadingAvatarSize?: ClassNameValue; itemTrailing?: ClassNameValue; itemTrailingIcon?: ClassNameValue; itemTrailingKbds?: ClassNameValue; itemTrailingKbdsSize?: ClassNameValue; itemLabel?: ClassNameValue; itemLabelExternalIcon?: ClassNameValue; } | undefined;
  /**
   * The open state of the dropdown menu when it is initially rendered. Use when you do not need to control its open state.
   */
  defaultOpen?: boolean | undefined;
  /**
   * The controlled open state of the menu. Can be used as `v-model:open`.
   */
  open?: boolean | undefined;
  /**
   * The modality of the dropdown menu.
   * 
   * When set to `true`, interaction with outside elements will be disabled and only menu content will be visible to screen readers.
   * @default "true"
   */
  modal?: boolean | undefined;
}
```

### Slots

```ts
/**
 * Slots for the DropdownMenu component
 */
interface DropdownMenuSlots {
  default(): any;
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
 * Emitted events for the DropdownMenu component
 */
interface DropdownMenuEmits {
  update:open: (payload: [payload: boolean]) => void;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    dropdownMenu: {
      slots: {
        content: 'min-w-32 bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-dropdown-menu-content-transform-origin) flex flex-col',
        viewport: 'relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1',
        arrow: 'fill-default',
        group: 'p-1 isolate',
        label: 'w-full flex items-center font-semibold text-highlighted',
        separator: '-mx-1 my-1 h-px bg-border',
        item: 'group relative w-full flex items-center select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75',
        itemLeadingIcon: 'shrink-0',
        itemLeadingAvatar: 'shrink-0',
        itemLeadingAvatarSize: '',
        itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
        itemTrailingIcon: 'shrink-0',
        itemTrailingKbds: 'hidden lg:inline-flex items-center shrink-0',
        itemTrailingKbdsSize: '',
        itemLabel: 'truncate',
        itemLabelExternalIcon: 'inline-block size-3 align-top text-dimmed'
      },
      variants: {
        color: {
          primary: '',
          secondary: '',
          success: '',
          info: '',
          warning: '',
          error: '',
          neutral: ''
        },
        active: {
          true: {
            item: 'text-highlighted before:bg-elevated',
            itemLeadingIcon: 'text-default'
          },
          false: {
            item: [
              'text-default data-highlighted:text-highlighted data-[state=open]:text-highlighted data-highlighted:before:bg-elevated/50 data-[state=open]:before:bg-elevated/50',
              'transition-colors before:transition-colors'
            ],
            itemLeadingIcon: [
              'text-dimmed group-data-highlighted:text-default group-data-[state=open]:text-default',
              'transition-colors'
            ]
          }
        },
        loading: {
          true: {
            itemLeadingIcon: 'animate-spin'
          }
        },
        size: {
          xs: {
            label: 'p-1 text-xs gap-1',
            item: 'p-1 text-xs gap-1',
            itemLeadingIcon: 'size-4',
            itemLeadingAvatarSize: '3xs',
            itemTrailingIcon: 'size-4',
            itemTrailingKbds: 'gap-0.5',
            itemTrailingKbdsSize: 'sm'
          },
          sm: {
            label: 'p-1.5 text-xs gap-1.5',
            item: 'p-1.5 text-xs gap-1.5',
            itemLeadingIcon: 'size-4',
            itemLeadingAvatarSize: '3xs',
            itemTrailingIcon: 'size-4',
            itemTrailingKbds: 'gap-0.5',
            itemTrailingKbdsSize: 'sm'
          },
          md: {
            label: 'p-1.5 text-sm gap-1.5',
            item: 'p-1.5 text-sm gap-1.5',
            itemLeadingIcon: 'size-5',
            itemLeadingAvatarSize: '2xs',
            itemTrailingIcon: 'size-5',
            itemTrailingKbds: 'gap-0.5',
            itemTrailingKbdsSize: 'md'
          },
          lg: {
            label: 'p-2 text-sm gap-2',
            item: 'p-2 text-sm gap-2',
            itemLeadingIcon: 'size-5',
            itemLeadingAvatarSize: '2xs',
            itemTrailingIcon: 'size-5',
            itemTrailingKbds: 'gap-1',
            itemTrailingKbdsSize: 'md'
          },
          xl: {
            label: 'p-2 text-base gap-2',
            item: 'p-2 text-base gap-2',
            itemLeadingIcon: 'size-6',
            itemLeadingAvatarSize: 'xs',
            itemTrailingIcon: 'size-6',
            itemTrailingKbds: 'gap-1',
            itemTrailingKbdsSize: 'lg'
          }
        }
      },
      compoundVariants: [
        {
          color: 'primary',
          active: false,
          class: {
            item: 'text-primary data-highlighted:text-primary data-highlighted:before:bg-primary/10 data-[state=open]:before:bg-primary/10',
            itemLeadingIcon: 'text-primary/75 group-data-highlighted:text-primary group-data-[state=open]:text-primary'
          }
        },
        {
          color: 'secondary',
          active: false,
          class: {
            item: 'text-secondary data-highlighted:text-secondary data-highlighted:before:bg-secondary/10 data-[state=open]:before:bg-secondary/10',
            itemLeadingIcon: 'text-secondary/75 group-data-highlighted:text-secondary group-data-[state=open]:text-secondary'
          }
        },
        {
          color: 'success',
          active: false,
          class: {
            item: 'text-success data-highlighted:text-success data-highlighted:before:bg-success/10 data-[state=open]:before:bg-success/10',
            itemLeadingIcon: 'text-success/75 group-data-highlighted:text-success group-data-[state=open]:text-success'
          }
        },
        {
          color: 'info',
          active: false,
          class: {
            item: 'text-info data-highlighted:text-info data-highlighted:before:bg-info/10 data-[state=open]:before:bg-info/10',
            itemLeadingIcon: 'text-info/75 group-data-highlighted:text-info group-data-[state=open]:text-info'
          }
        },
        {
          color: 'warning',
          active: false,
          class: {
            item: 'text-warning data-highlighted:text-warning data-highlighted:before:bg-warning/10 data-[state=open]:before:bg-warning/10',
            itemLeadingIcon: 'text-warning/75 group-data-highlighted:text-warning group-data-[state=open]:text-warning'
          }
        },
        {
          color: 'error',
          active: false,
          class: {
            item: 'text-error data-highlighted:text-error data-highlighted:before:bg-error/10 data-[state=open]:before:bg-error/10',
            itemLeadingIcon: 'text-error/75 group-data-highlighted:text-error group-data-[state=open]:text-error'
          }
        },
        {
          color: 'primary',
          active: true,
          class: {
            item: 'text-primary before:bg-primary/10',
            itemLeadingIcon: 'text-primary'
          }
        },
        {
          color: 'secondary',
          active: true,
          class: {
            item: 'text-secondary before:bg-secondary/10',
            itemLeadingIcon: 'text-secondary'
          }
        },
        {
          color: 'success',
          active: true,
          class: {
            item: 'text-success before:bg-success/10',
            itemLeadingIcon: 'text-success'
          }
        },
        {
          color: 'info',
          active: true,
          class: {
            item: 'text-info before:bg-info/10',
            itemLeadingIcon: 'text-info'
          }
        },
        {
          color: 'warning',
          active: true,
          class: {
            item: 'text-warning before:bg-warning/10',
            itemLeadingIcon: 'text-warning'
          }
        },
        {
          color: 'error',
          active: true,
          class: {
            item: 'text-error before:bg-error/10',
            itemLeadingIcon: 'text-error'
          }
        }
      ],
      defaultVariants: {
        size: 'md'
      }
    }
  }
})
```
