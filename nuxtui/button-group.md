# ButtonGroup

> Group multiple button-like elements together.

## Usage

Wrap multiple [Button](/components/button) within a ButtonGroup to group them together.

```vue
<template>
  <UButtonGroup>
    <UButton color="neutral" variant="subtle" label="Button" />
    <UButton color="neutral" variant="outline" icon="i-lucide-chevron-down" />
  </UButtonGroup>
</template>
```

### Size

Use the `size` prop to change the size of all the buttons.

```vue
<template>
  <UButtonGroup size="xl">
    <UButton color="neutral" variant="subtle" label="Button" />
    <UButton color="neutral" variant="outline" icon="i-lucide-chevron-down" />
  </UButtonGroup>
</template>
```

### Orientation

Use the `orientation` prop to change the orientation of the buttons. Defaults to `horizontal`.

```vue
<template>
  <UButtonGroup orientation="vertical">
    <UButton color="neutral" variant="subtle" label="Submit" />
    <UButton color="neutral" variant="outline" label="Cancel" />
  </UButtonGroup>
</template>
```

## Examples

### With input

You can use components like [Input](/components/input), [InputMenu](/components/input-menu), [Select](/components/select) [SelectMenu](/components/select-menu), etc. within a button group.

```vue
<template>
  <UButtonGroup>
    <UInput color="neutral" variant="outline" placeholder="Enter token" />

    <UButton color="neutral" variant="subtle" icon="i-lucide-clipboard" />
  </UButtonGroup>
</template>
```

### With tooltip

You can use a [Tooltip](/components/tooltip) within a button group.

```vue [ButtonGroupTooltipExample.vue]
<template>
  <UButtonGroup>
    <UInput color="neutral" variant="outline" placeholder="Enter token" />

    <UTooltip text="Copy to clipboard">
      <UButton
        color="neutral"
        variant="subtle"
        icon="i-lucide-clipboard"
      />
    </UTooltip>
  </UButtonGroup>
</template>
```

### With dropdown

You can use a [DropdownMenu](/components/dropdown-menu) within a button group.

```vue [ButtonGroupDropdownExample.vue]
<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const items: DropdownMenuItem[] = [
  {
    label: 'Team',
    icon: 'i-lucide-users'
  },
  {
    label: 'Invite users',
    icon: 'i-lucide-user-plus',
    children: [
      {
        label: 'Invite by email',
        icon: 'i-lucide-send-horizontal'
      },
      {
        label: 'Invite by link',
        icon: 'i-lucide-link'
      }
    ]
  },
  {
    label: 'New team',
    icon: 'i-lucide-plus'
  }
]
</script>

<template>
  <UButtonGroup>
    <UButton color="neutral" variant="subtle" label="Settings" />

    <UDropdownMenu :items="items">
      <UButton
        color="neutral"
        variant="outline"
        icon="i-lucide-chevron-down"
      />
    </UDropdownMenu>
  </UButtonGroup>
</template>
```

### With badge

You can use a [Badge](/components/badge) within a button group.

```vue [ButtonGroupBadgeExample.vue]
<template>
  <UButtonGroup>
    <UBadge color="neutral" variant="outline" size="lg" label="https://" />

    <UInput color="neutral" variant="outline" placeholder="www.example.com" />
  </UButtonGroup>
</template>
```

## API

### Props

```ts
/**
 * Props for the ButtonGroup component
 */
interface ButtonGroupProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  size?: "md" | "xs" | "sm" | "lg" | "xl" | undefined;
  /**
   * The orientation the buttons are laid out.
   * @default "\"horizontal\""
   */
  orientation?: "horizontal" | "vertical" | undefined;
  ui?: {} | undefined;
}
```

### Slots

```ts
/**
 * Slots for the ButtonGroup component
 */
interface ButtonGroupSlots {
  default(): any;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    buttonGroup: {
      base: 'relative',
      variants: {
        size: {
          xs: '',
          sm: '',
          md: '',
          lg: '',
          xl: ''
        },
        orientation: {
          horizontal: 'inline-flex -space-x-px',
          vertical: 'flex flex-col -space-y-px'
        }
      }
    }
  }
})
```
