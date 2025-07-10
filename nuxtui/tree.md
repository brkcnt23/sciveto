# Tree

> A tree view component to display and interact with hierarchical data structures.

## Usage

### Items

Use the `items` prop as an array of objects with the following properties:

- `icon?: string`
- `label?: string`
- `trailingIcon?: string`
- `defaultExpanded?: boolean`
- `disabled?: boolean`
- `value?: string`
- `slot?: string`
- `children?: TreeItem[]`
- `onToggle?(e: Event): void`
- `onSelect?(e?: Event): void`
- `class?: any`
- `ui?: { item?: ClassNameValue, itemWithChildren?: ClassNameValue, link?: ClassNameValue, linkLeadingIcon?: ClassNameValue, linkLabel?: ClassNameValue, linkTrailing?: ClassNameValue, linkTrailingIcon?: ClassNameValue, listWithChildren?: ClassNameValue }`

<note>

A unique identifier is required for each item. The component will use the `value` prop as identifier, falling back to `label` if `value` is not provided. One of these must be provided for the component to work properly.

</note>

```vue
<script setup lang="ts">
const items = ref<undefined>([
  {
    label: 'app/',
    defaultExpanded: true,
    children: [
      {
        label: 'composables/',
        children: [
          {
            label: 'useAuth.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
          {
            label: 'useUser.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
        ],
      },
      {
        label: 'components/',
        defaultExpanded: true,
        children: [
          {
            label: 'Card.vue',
            icon: 'i-vscode-icons-file-type-vue',
          },
          {
            label: 'Button.vue',
            icon: 'i-vscode-icons-file-type-vue',
          },
        ],
      },
    ],
  },
  {
    label: 'app.vue',
    icon: 'i-vscode-icons-file-type-vue',
  },
  {
    label: 'nuxt.config.ts',
    icon: 'i-vscode-icons-file-type-nuxt',
  },
])
</script>

<template>
  <UTree :items="items" />
</template>
```

### Multiple

Use the `multiple` prop to allow multiple item selections.

```vue
<script setup lang="ts">
const items = ref<undefined>([
  {
    label: 'app/',
    defaultExpanded: true,
    children: [
      {
        label: 'composables/',
        children: [
          {
            label: 'useAuth.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
          {
            label: 'useUser.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
        ],
      },
      {
        label: 'components/',
        defaultExpanded: true,
        children: [
          {
            label: 'Card.vue',
            icon: 'i-vscode-icons-file-type-vue',
          },
          {
            label: 'Button.vue',
            icon: 'i-vscode-icons-file-type-vue',
          },
        ],
      },
    ],
  },
  {
    label: 'app.vue',
    icon: 'i-vscode-icons-file-type-vue',
  },
  {
    label: 'nuxt.config.ts',
    icon: 'i-vscode-icons-file-type-nuxt',
  },
])
</script>

<template>
  <UTree multiple :items="items" />
</template>
```

### Color

Use the `color` prop to change the color of the Tree.

```vue
<script setup lang="ts">
const items = ref<undefined>([
  {
    label: 'app/',
    defaultExpanded: true,
    children: [
      {
        label: 'composables/',
        children: [
          {
            label: 'useAuth.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
          {
            label: 'useUser.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
        ],
      },
      {
        label: 'components/',
        defaultExpanded: true,
        children: [
          {
            label: 'Card.vue',
            icon: 'i-vscode-icons-file-type-vue',
          },
          {
            label: 'Button.vue',
            icon: 'i-vscode-icons-file-type-vue',
          },
        ],
      },
    ],
  },
  {
    label: 'app.vue',
    icon: 'i-vscode-icons-file-type-vue',
  },
  {
    label: 'nuxt.config.ts',
    icon: 'i-vscode-icons-file-type-nuxt',
  },
])
</script>

<template>
  <UTree color="neutral" :items="items" />
</template>
```

### Size

Use the `size` prop to change the size of the Tree.

```vue
<script setup lang="ts">
const items = ref<undefined>([
  {
    label: 'app/',
    defaultExpanded: true,
    children: [
      {
        label: 'composables/',
        children: [
          {
            label: 'useAuth.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
          {
            label: 'useUser.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
        ],
      },
      {
        label: 'components/',
        defaultExpanded: true,
        children: [
          {
            label: 'Card.vue',
            icon: 'i-vscode-icons-file-type-vue',
          },
          {
            label: 'Button.vue',
            icon: 'i-vscode-icons-file-type-vue',
          },
        ],
      },
    ],
  },
  {
    label: 'app.vue',
    icon: 'i-vscode-icons-file-type-vue',
  },
  {
    label: 'nuxt.config.ts',
    icon: 'i-vscode-icons-file-type-nuxt',
  },
])
</script>

<template>
  <UTree size="xl" :items="items" />
</template>
```

### Trailing Icon

Use the `trailing-icon` prop to customize the trailing [Icon](/components/icon) of a parent node. Defaults to `i-lucide-chevron-down`.

<note>

If an icon is specified for an item, it will always take precedence over these props.

</note>

```vue
<script setup lang="ts">
const items = ref<undefined>([
  {
    label: 'app/',
    defaultExpanded: true,
    children: [
      {
        label: 'composables/',
        trailingIcon: 'i-lucide-chevron-down',
        children: [
          {
            label: 'useAuth.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
          {
            label: 'useUser.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
        ],
      },
      {
        label: 'components/',
        defaultExpanded: true,
        children: [
          {
            label: 'Card.vue',
            icon: 'i-vscode-icons-file-type-vue',
          },
          {
            label: 'Button.vue',
            icon: 'i-vscode-icons-file-type-vue',
          },
        ],
      },
    ],
  },
  {
    label: 'app.vue',
    icon: 'i-vscode-icons-file-type-vue',
  },
  {
    label: 'nuxt.config.ts',
    icon: 'i-vscode-icons-file-type-nuxt',
  },
])
</script>

<template>
  <UTree trailing-icon="i-lucide-arrow-down" :items="items" />
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

### Expanded Icon

Use the `expanded-icon` and `collapsed-icon` props to customize the icons of a parent node when it is expanded or collapsed. Defaults to `i-lucide-folder-open` and `i-lucide-folder` respectively.

```vue
<script setup lang="ts">
const items = ref<undefined>([
  {
    label: 'app/',
    defaultExpanded: true,
    children: [
      {
        label: 'composables/',
        children: [
          {
            label: 'useAuth.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
          {
            label: 'useUser.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
        ],
      },
      {
        label: 'components/',
        defaultExpanded: true,
        children: [
          {
            label: 'Card.vue',
            icon: 'i-vscode-icons-file-type-vue',
          },
          {
            label: 'Button.vue',
            icon: 'i-vscode-icons-file-type-vue',
          },
        ],
      },
    ],
  },
  {
    label: 'app.vue',
    icon: 'i-vscode-icons-file-type-vue',
  },
  {
    label: 'nuxt.config.ts',
    icon: 'i-vscode-icons-file-type-nuxt',
  },
])
</script>

<template>
  <UTree expanded-icon="i-lucide-book-open" collapsed-icon="i-lucide-book" :items="items" />
</template>
```

<framework-only>
<template v-slot:nuxt="">
<tip to="/getting-started/icons/nuxt#theme">

You can customize these icons globally in your `app.config.ts` under `ui.icons.folder` and `ui.icons.folderOpen` keys.

</tip>
</template>

<template v-slot:vue="">
<tip to="/getting-started/icons/vue#theme">

You can customize these icons globally in your `vite.config.ts` under `ui.icons.folder` and `ui.icons.folderOpen` keys.

</tip>
</template>
</framework-only>

### Disabled

Use the `disabled` prop to prevent any user interaction with the Tree.

<note>

You can also disable individual items using `item.disabled`.

</note>

```vue
<script setup lang="ts">
const items = ref<undefined>([
  {
    label: 'app',
    icon: 'i-lucide-folder',
    defaultExpanded: true,
    children: [
      {
        label: 'composables',
        icon: 'i-lucide-folder',
        children: [
          {
            label: 'useAuth.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
          {
            label: 'useUser.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
        ],
      },
      {
        label: 'components',
        icon: 'i-lucide-folder',
        children: [
          {
            label: 'Home',
            icon: 'i-lucide-folder',
            children: [
              {
                label: 'Card.vue',
                icon: 'i-vscode-icons-file-type-vue',
              },
              {
                label: 'Button.vue',
                icon: 'i-vscode-icons-file-type-vue',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'app.vue',
    icon: 'i-vscode-icons-file-type-vue',
  },
  {
    label: 'nuxt.config.ts',
    icon: 'i-vscode-icons-file-type-nuxt',
  },
])
</script>

<template>
  <UTree disabled :items="items" />
</template>
```

## Examples

### Control selected item(s)

You can control the selected item(s) by using the `default-value` prop or the `v-model` directive.

```vue [TreeModelValueExample.vue]
<script setup lang="ts">
import type { TreeItem } from '@nuxt/ui'

const items: TreeItem[] = [
  {
    label: 'app/',
    defaultExpanded: true,
    children: [
      {
        label: 'composables/',
        children: [
          { label: 'useAuth.ts', icon: 'i-vscode-icons-file-type-typescript' },
          { label: 'useUser.ts', icon: 'i-vscode-icons-file-type-typescript' }
        ]
      },
      {
        label: 'components/',
        defaultExpanded: true,
        children: [
          { label: 'Card.vue', icon: 'i-vscode-icons-file-type-vue' },
          { label: 'Button.vue', icon: 'i-vscode-icons-file-type-vue' }
        ]
      }
    ]
  },
  { label: 'app.vue', icon: 'i-vscode-icons-file-type-vue' },
  { label: 'nuxt.config.ts', icon: 'i-vscode-icons-file-type-nuxt' }
]

const value = ref()
</script>

<template>
  <UTree v-model="value" :items="items" />
</template>
```

If you want to prevent an item from being selected, you can use the `item.onSelect()` property:

```vue [TreeOnSelectExample.vue]
<script setup lang="ts">
import type { TreeItem } from '@nuxt/ui'

const items: TreeItem[] = [
  {
    label: 'app/',
    defaultExpanded: true,
    onSelect: (e: Event) => {
      e.preventDefault()
    },
    children: [
      {
        label: 'composables/',
        children: [
          { label: 'useAuth.ts', icon: 'i-vscode-icons-file-type-typescript' },
          { label: 'useUser.ts', icon: 'i-vscode-icons-file-type-typescript' }
        ]
      },
      {
        label: 'components/',
        defaultExpanded: true,
        children: [
          { label: 'Card.vue', icon: 'i-vscode-icons-file-type-vue' },
          { label: 'Button.vue', icon: 'i-vscode-icons-file-type-vue' }
        ]
      }
    ]
  },
  { label: 'app.vue', icon: 'i-vscode-icons-file-type-vue' },
  { label: 'nuxt.config.ts', icon: 'i-vscode-icons-file-type-nuxt' }
]
</script>

<template>
  <UTree :items="items" />
</template>
```

<note>

This lets you expand or collapse a parent item without selecting it.

</note>

### Control expanded items

You can control the expanded items by using the `default-expanded` prop or the `v-model` directive.

```vue [TreeExpandedExample.vue]
<script setup lang="ts">
import type { TreeItem } from '@nuxt/ui'

const items: TreeItem[] = [
  {
    label: 'app/',
    value: 'app',
    children: [
      {
        label: 'composables/',
        value: 'composables',
        children: [
          { label: 'useAuth.ts', icon: 'i-vscode-icons-file-type-typescript' },
          { label: 'useUser.ts', icon: 'i-vscode-icons-file-type-typescript' }
        ]
      },
      {
        label: 'components/',
        value: 'components',
        children: [
          { label: 'Card.vue', icon: 'i-vscode-icons-file-type-vue' },
          { label: 'Button.vue', icon: 'i-vscode-icons-file-type-vue' }
        ]
      }
    ]
  },
  { label: 'app.vue', icon: 'i-vscode-icons-file-type-vue' },
  { label: 'nuxt.config.ts', icon: 'i-vscode-icons-file-type-nuxt' }
]

const expanded = ref(['app', 'composables'])
</script>

<template>
  <UTree v-model:expanded="expanded" :items="items" />
</template>
```

If you want to prevent an item from being expanded, you can use the `item.onToggle()` property:

```vue [TreeOnToggleExample.vue]
<script setup lang="ts">
import type { TreeItem } from '@nuxt/ui'

const items: TreeItem[] = [
  {
    label: 'app/',
    defaultExpanded: true,
    onToggle: (e: Event) => {
      e.preventDefault()
    },
    children: [
      {
        label: 'composables/',
        children: [
          { label: 'useAuth.ts', icon: 'i-vscode-icons-file-type-typescript' },
          { label: 'useUser.ts', icon: 'i-vscode-icons-file-type-typescript' }
        ]
      },
      {
        label: 'components/',
        defaultExpanded: true,
        children: [
          { label: 'Card.vue', icon: 'i-vscode-icons-file-type-vue' },
          { label: 'Button.vue', icon: 'i-vscode-icons-file-type-vue' }
        ]
      }
    ]
  },
  { label: 'app.vue', icon: 'i-vscode-icons-file-type-vue' },
  { label: 'nuxt.config.ts', icon: 'i-vscode-icons-file-type-nuxt' }
]
</script>

<template>
  <UTree :items="items" />
</template>
```

<note>

This lets you select a parent item without expanding or collapsing its children.

</note>

### With custom slot

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}`
- `#{{ item.slot }}-leading`
- `#{{ item.slot }}-label`
- `#{{ item.slot }}-trailing`

```vue [TreeCustomSlotExample.vue]
<script setup lang="ts">
import type { TreeItem } from '@nuxt/ui'

const items = [
  {
    label: 'app/',
    slot: 'app' as const,
    defaultExpanded: true,
    children: [
      {
        label: 'composables/',
        children: [
          { label: 'useAuth.ts', icon: 'i-vscode-icons-file-type-typescript' },
          { label: 'useUser.ts', icon: 'i-vscode-icons-file-type-typescript' }
        ]
      },
      {
        label: 'components/',
        defaultExpanded: true,
        children: [
          { label: 'Card.vue', icon: 'i-vscode-icons-file-type-vue' },
          { label: 'Button.vue', icon: 'i-vscode-icons-file-type-vue' }
        ]
      }
    ]
  },
  { label: 'app.vue', icon: 'i-vscode-icons-file-type-vue' },
  { label: 'nuxt.config.ts', icon: 'i-vscode-icons-file-type-nuxt' }
] satisfies TreeItem[]
</script>

<template>
  <UTree :items="items">
    <template #app="{ item }">
      <p class="italic font-bold">
        {{ item.label }}
      </p>
    </template>
  </UTree>
</template>
```

## API

### Props

```ts
/**
 * Props for the Tree component
 */
interface TreeProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined;
  size?: "md" | "xs" | "sm" | "lg" | "xl" | undefined;
  /**
   * The key used to get the value from the item.
   * @default "\"value\" as never"
   */
  valueKey?: keyof TreeItem | undefined;
  /**
   * The key used to get the label from the item.
   * @default "\"label\" as never"
   */
  labelKey?: keyof TreeItem | undefined;
  /**
   * The icon displayed on the right side of a parent node.
   */
  trailingIcon?: string | undefined;
  /**
   * The icon displayed when a parent node is expanded.
   */
  expandedIcon?: string | undefined;
  /**
   * The icon displayed when a parent node is collapsed.
   */
  collapsedIcon?: string | undefined;
  items?: TreeItem[] | undefined;
  /**
   * The controlled value of the Tree. Can be bind as `v-model`.
   */
  modelValue?: any;
  /**
   * The value of the Tree when initially rendered. Use when you do not need to control the state of the Tree.
   */
  defaultValue?: any;
  /**
   * Whether multiple options can be selected or not.
   */
  multiple?: boolean | undefined;
  ui?: { root?: ClassNameValue; item?: ClassNameValue; listWithChildren?: ClassNameValue; itemWithChildren?: ClassNameValue; link?: ClassNameValue; linkLeadingIcon?: ClassNameValue; linkLabel?: ClassNameValue; linkTrailing?: ClassNameValue; linkTrailingIcon?: ClassNameValue; } | undefined;
  /**
   * The value of the expanded tree when initially rendered. Use when you do not need to control the state of the expanded tree
   */
  defaultExpanded?: string[] | undefined;
  /**
   * When `true`, prevents the user from interacting with tree
   */
  disabled?: boolean | undefined;
  /**
   * The controlled value of the expanded item. Can be binded with with `v-model`.
   */
  expanded?: string[] | undefined;
  /**
   * How multiple selection should behave in the collection.
   */
  selectionBehavior?: "toggle" | "replace" | undefined;
  /**
   * When `true`, selecting parent will select the descendants.
   */
  propagateSelect?: boolean | undefined;
  /**
   * When `true`, selecting children will update the parent state.
   */
  bubbleSelect?: boolean | undefined;
}
```

### Slots

```ts
/**
 * Slots for the Tree component
 */
interface TreeSlots {
  item(): any;
  item-leading(): any;
  item-label(): any;
  item-trailing(): any;
}
```

### Emits

```ts
/**
 * Emitted events for the Tree component
 */
interface TreeEmits {
  update:modelValue: (payload: [payload: any]) => void;
  update:expanded: (payload: [val: string[]]) => void;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    tree: {
      slots: {
        root: 'relative isolate',
        item: '',
        listWithChildren: 'ms-4.5 border-s border-default',
        itemWithChildren: 'ps-1.5 -ms-px',
        link: 'relative group w-full flex items-center text-sm before:absolute before:inset-y-px before:inset-x-0 before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2',
        linkLeadingIcon: 'shrink-0',
        linkLabel: 'truncate',
        linkTrailing: 'ms-auto inline-flex gap-1.5 items-center',
        linkTrailingIcon: 'shrink-0 transform transition-transform duration-200 group-data-expanded:rotate-180'
      },
      variants: {
        color: {
          primary: {
            link: 'focus-visible:before:ring-primary'
          },
          secondary: {
            link: 'focus-visible:before:ring-secondary'
          },
          success: {
            link: 'focus-visible:before:ring-success'
          },
          info: {
            link: 'focus-visible:before:ring-info'
          },
          warning: {
            link: 'focus-visible:before:ring-warning'
          },
          error: {
            link: 'focus-visible:before:ring-error'
          },
          neutral: {
            link: 'focus-visible:before:ring-inverted'
          }
        },
        size: {
          xs: {
            link: 'px-2 py-1 text-xs gap-1',
            linkLeadingIcon: 'size-4',
            linkTrailingIcon: 'size-4'
          },
          sm: {
            link: 'px-2.5 py-1.5 text-xs gap-1.5',
            linkLeadingIcon: 'size-4',
            linkTrailingIcon: 'size-4'
          },
          md: {
            link: 'px-2.5 py-1.5 text-sm gap-1.5',
            linkLeadingIcon: 'size-5',
            linkTrailingIcon: 'size-5'
          },
          lg: {
            link: 'px-3 py-2 text-sm gap-2',
            linkLeadingIcon: 'size-5',
            linkTrailingIcon: 'size-5'
          },
          xl: {
            link: 'px-3 py-2 text-base gap-2',
            linkLeadingIcon: 'size-6',
            linkTrailingIcon: 'size-6'
          }
        },
        selected: {
          true: {
            link: 'before:bg-elevated'
          },
          false: {
            link: [
              'hover:not-disabled:text-highlighted hover:not-disabled:before:bg-elevated/50',
              'transition-colors before:transition-colors'
            ]
          }
        },
        disabled: {
          true: {
            link: 'cursor-not-allowed opacity-75'
          }
        }
      },
      compoundVariants: [
        {
          color: 'primary',
          selected: true,
          class: {
            link: 'text-primary'
          }
        },
        {
          color: 'secondary',
          selected: true,
          class: {
            link: 'text-secondary'
          }
        },
        {
          color: 'success',
          selected: true,
          class: {
            link: 'text-success'
          }
        },
        {
          color: 'info',
          selected: true,
          class: {
            link: 'text-info'
          }
        },
        {
          color: 'warning',
          selected: true,
          class: {
            link: 'text-warning'
          }
        },
        {
          color: 'error',
          selected: true,
          class: {
            link: 'text-error'
          }
        },
        {
          color: 'neutral',
          selected: true,
          class: {
            link: 'text-highlighted'
          }
        }
      ],
      defaultVariants: {
        color: 'primary',
        size: 'md'
      }
    }
  }
})
```
