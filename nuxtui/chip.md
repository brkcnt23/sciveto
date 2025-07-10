# Chip

> An indicator of a numeric value or a state.

## Usage

Wrap any component with a Chip to display an indicator.

```vue
<template>
  <UChip>
    <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
  </UChip>
</template>
```

### Color

Use the `color` prop to change the color of the Chip.

```vue
<template>
  <UChip color="neutral">
    <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
  </UChip>
</template>
```

### Size

Use the `size` prop to change the size of the Chip.

```vue
<template>
  <UChip size="3xl">
    <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
  </UChip>
</template>
```

### Text

Use the `text` prop to set the text of the Chip.

```vue
<template>
  <UChip :text="5" size="3xl">
    <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
  </UChip>
</template>
```

### Position

Use the `position` prop to change the position of the Chip.

```vue
<template>
  <UChip position="bottom-left">
    <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
  </UChip>
</template>
```

### Inset

Use the `inset` prop to display the Chip inside the component. This is useful when dealing with rounded components.

```vue
<template>
  <UChip inset>
    <UAvatar src="https://github.com/benjamincanac.png" />
  </UChip>
</template>
```

### Standalone

Use the `standalone` prop alongside the `inset` prop to display the Chip inline.

```vue
<template>
  <UChip standalone inset />
</template>
```

<note>

It's used this way in the [`CommandPalette`](/components/command-palette), [`InputMenu`](/components/input-menu), [`Select`](/components/select) or [`SelectMenu`](/components/select-menu) components for example.

</note>

## Examples

### Control visibility

You can control the visibility of the Chip using the `show` prop.

```vue [ChipShowExample.vue]
<script setup lang="ts">
const statuses = ['online', 'away', 'busy', 'offline']
const status = ref(statuses[0])

const color = computed(() => status.value ? { online: 'success', away: 'warning', busy: 'error', offline: 'neutral' }[status.value] as any : 'online')

const show = computed(() => status.value !== 'offline')

// Note: This is for demonstration purposes only. Don't do this at home.
onMounted(() => {
  setInterval(() => {
    if (status.value) {
      status.value = statuses[(statuses.indexOf(status.value) + 1) % statuses.length]
    }
  }, 1000)
})
</script>

<template>
  <UChip :color="color" :show="show" inset>
    <UAvatar src="https://github.com/benjamincanac.png" />
  </UChip>
</template>
```

<note>

In this example, the Chip has a color per status and is displayed when the status is not `offline`.

</note>

## API

### Props

```ts
/**
 * Props for the Chip component
 */
interface ChipProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  /**
   * Display some text inside the chip.
   */
  text?: string | number | undefined;
  color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "3xs" | "2xs" | "2xl" | "3xl" | undefined;
  /**
   * The position of the chip.
   */
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left" | undefined;
  /**
   * When `true`, keep the chip inside the component for rounded elements.
   * @default "false"
   */
  inset?: boolean | undefined;
  /**
   * When `true`, render the chip relatively to the parent.
   * @default "false"
   */
  standalone?: boolean | undefined;
  ui?: { root?: ClassNameValue; base?: ClassNameValue; } | undefined;
  /**
   * @default "true"
   */
  show?: boolean | undefined;
}
```

### Slots

```ts
/**
 * Slots for the Chip component
 */
interface ChipSlots {
  default(): any;
  content(): any;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    chip: {
      slots: {
        root: 'relative inline-flex items-center justify-center shrink-0',
        base: 'rounded-full ring ring-bg flex items-center justify-center text-inverted font-medium whitespace-nowrap'
      },
      variants: {
        color: {
          primary: 'bg-primary',
          secondary: 'bg-secondary',
          success: 'bg-success',
          info: 'bg-info',
          warning: 'bg-warning',
          error: 'bg-error',
          neutral: 'bg-inverted'
        },
        size: {
          '3xs': 'h-[4px] min-w-[4px] text-[4px]',
          '2xs': 'h-[5px] min-w-[5px] text-[5px]',
          xs: 'h-[6px] min-w-[6px] text-[6px]',
          sm: 'h-[7px] min-w-[7px] text-[7px]',
          md: 'h-[8px] min-w-[8px] text-[8px]',
          lg: 'h-[9px] min-w-[9px] text-[9px]',
          xl: 'h-[10px] min-w-[10px] text-[10px]',
          '2xl': 'h-[11px] min-w-[11px] text-[11px]',
          '3xl': 'h-[12px] min-w-[12px] text-[12px]'
        },
        position: {
          'top-right': 'top-0 right-0',
          'bottom-right': 'bottom-0 right-0',
          'top-left': 'top-0 left-0',
          'bottom-left': 'bottom-0 left-0'
        },
        inset: {
          false: ''
        },
        standalone: {
          false: 'absolute'
        }
      },
      compoundVariants: [
        {
          position: 'top-right',
          inset: false,
          class: '-translate-y-1/2 translate-x-1/2 transform'
        },
        {
          position: 'bottom-right',
          inset: false,
          class: 'translate-y-1/2 translate-x-1/2 transform'
        },
        {
          position: 'top-left',
          inset: false,
          class: '-translate-y-1/2 -translate-x-1/2 transform'
        },
        {
          position: 'bottom-left',
          inset: false,
          class: 'translate-y-1/2 -translate-x-1/2 transform'
        }
      ],
      defaultVariants: {
        size: 'md',
        color: 'primary',
        position: 'top-right'
      }
    }
  }
})
```
