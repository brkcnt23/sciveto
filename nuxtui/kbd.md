# Kbd

> A kbd element to display a keyboard key.

## Usage

### Value

Use the default slot to set the value of the Kbd.

```vue
<template>
  <UKbd>
    K
  </UKbd>
</template>
```

You can achieve the same result by using the `value` prop.

```vue
<template>
  <UKbd value="K" />
</template>
```

You can pass special keys to the `value` prop that goes through the [`useKbd`](https://github.com/nuxt/ui/blob/v3/src/runtime/composables/useKbd.ts) composable. For example, the `meta` key displays as `⌘` on macOS and `Ctrl` on other platforms.

```vue
<template>
  <UKbd value="meta" />
</template>
```

### Variant

Use the `variant` prop to change the variant of the Kbd.

```vue
<template>
  <UKbd variant="solid">
    K
  </UKbd>
</template>
```

### Size

Use the `size` prop to change the size of the Kbd.

```vue
<template>
  <UKbd size="lg">
    K
  </UKbd>
</template>
```

## Examples

### `class` prop

Use the `class` prop to override the base styles of the Badge.

```vue
<template>
  <UKbd class="font-bold rounded-full" variant="subtle">
    K
  </UKbd>
</template>
```

## API

### Props

```ts
/**
 * Props for the Kbd component
 */
interface KbdProps {
  /**
   * The element or component this component should render as.
   * @default "\"kbd\""
   */
  as?: any;
  value?: string | undefined;
  variant?: "outline" | "subtle" | "solid" | undefined;
  size?: "sm" | "md" | "lg" | undefined;
}
```

### Slots

```ts
/**
 * Slots for the Kbd component
 */
interface KbdSlots {
  default(): any;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    kbd: {
      base: 'inline-flex items-center justify-center px-1 rounded-sm font-medium font-sans',
      variants: {
        variant: {
          solid: 'bg-inverted text-inverted',
          outline: 'bg-default text-highlighted ring ring-inset ring-accented',
          subtle: 'bg-elevated text-default ring ring-inset ring-accented'
        },
        size: {
          sm: 'h-4 min-w-[16px] text-[10px]',
          md: 'h-5 min-w-[20px] text-[11px]',
          lg: 'h-6 min-w-[24px] text-[12px]'
        }
      },
      defaultVariants: {
        variant: 'outline',
        size: 'md'
      }
    }
  }
})
```
