# Badge

> A short text to represent a status or a category.

## Usage

### Label

Use the default slot to set the label of the Badge.

```vue
<template>
  <UBadge>
    Badge
  </UBadge>
</template>
```

You can achieve the same result by using the `label` prop.

```vue
<template>
  <UBadge label="Badge" />
</template>
```

### Color

Use the `color` prop to change the color of the Badge.

```vue
<template>
  <UBadge color="neutral">
    Badge
  </UBadge>
</template>
```

### Variant

Use the `variant` props to change the variant of the Badge.

```vue
<template>
  <UBadge color="neutral" variant="outline">
    Badge
  </UBadge>
</template>
```

### Size

Use the `size` prop to change the size of the Badge.

```vue
<template>
  <UBadge size="xl">
    Badge
  </UBadge>
</template>
```

### Icon

Use the `icon` prop to show an [Icon](/components/icon) inside the Badge.

```vue
<template>
  <UBadge icon="i-lucide-rocket" size="md" color="primary" variant="solid">
    Badge
  </UBadge>
</template>
```

Use the `leading` and `trailing` props to set the icon position or the `leading-icon` and `trailing-icon` props to set a different icon for each position.

```vue
<template>
  <UBadge trailing-icon="i-lucide-arrow-right" size="md">
    Badge
  </UBadge>
</template>
```

### Avatar

Use the `avatar` prop to show an [Avatar](/components/avatar) inside the Badge.

```vue
<template>
  <UBadge size="md" color="neutral" variant="outline">
    Badge
  </UBadge>
</template>
```

## Examples

### `class` prop

Use the `class` prop to override the base styles of the Badge.

```vue
<template>
  <UBadge class="font-bold rounded-full">
    Badge
  </UBadge>
</template>
```

## API

### Props

```ts
/**
 * Props for the Badge component
 */
interface BadgeProps {
  /**
   * The element or component this component should render as.
   * @default "\"span\""
   */
  as?: any;
  label?: string | number | undefined;
  color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined;
  variant?: "solid" | "outline" | "soft" | "subtle" | undefined;
  size?: "md" | "xs" | "sm" | "lg" | "xl" | undefined;
  /**
   * Render the badge with equal padding on all sides.
   */
  square?: boolean | undefined;
  ui?: { base?: ClassNameValue; label?: ClassNameValue; leadingIcon?: ClassNameValue; leadingAvatar?: ClassNameValue; leadingAvatarSize?: ClassNameValue; trailingIcon?: ClassNameValue; } | undefined;
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
   * Display an icon on the right side.
   */
  trailingIcon?: string | undefined;
}
```

### Slots

```ts
/**
 * Slots for the Badge component
 */
interface BadgeSlots {
  leading(): any;
  default(): any;
  trailing(): any;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    badge: {
      slots: {
        base: 'font-medium inline-flex items-center',
        label: 'truncate',
        leadingIcon: 'shrink-0',
        leadingAvatar: 'shrink-0',
        leadingAvatarSize: '',
        trailingIcon: 'shrink-0'
      },
      variants: {
        buttonGroup: {
          horizontal: 'not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]',
          vertical: 'not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]'
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
        variant: {
          solid: '',
          outline: '',
          soft: '',
          subtle: ''
        },
        size: {
          xs: {
            base: 'text-[8px]/3 px-1 py-0.5 gap-1 rounded-sm',
            leadingIcon: 'size-3',
            leadingAvatarSize: '3xs',
            trailingIcon: 'size-3'
          },
          sm: {
            base: 'text-[10px]/3 px-1.5 py-1 gap-1 rounded-sm',
            leadingIcon: 'size-3',
            leadingAvatarSize: '3xs',
            trailingIcon: 'size-3'
          },
          md: {
            base: 'text-xs px-2 py-1 gap-1 rounded-md',
            leadingIcon: 'size-4',
            leadingAvatarSize: '3xs',
            trailingIcon: 'size-4'
          },
          lg: {
            base: 'text-sm px-2 py-1 gap-1.5 rounded-md',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5'
          },
          xl: {
            base: 'text-base px-2.5 py-1 gap-1.5 rounded-md',
            leadingIcon: 'size-6',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-6'
          }
        },
        square: {
          true: ''
        }
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: 'solid',
          class: 'bg-primary text-inverted'
        },
        {
          color: 'secondary',
          variant: 'solid',
          class: 'bg-secondary text-inverted'
        },
        {
          color: 'success',
          variant: 'solid',
          class: 'bg-success text-inverted'
        },
        {
          color: 'info',
          variant: 'solid',
          class: 'bg-info text-inverted'
        },
        {
          color: 'warning',
          variant: 'solid',
          class: 'bg-warning text-inverted'
        },
        {
          color: 'error',
          variant: 'solid',
          class: 'bg-error text-inverted'
        },
        {
          color: 'primary',
          variant: 'outline',
          class: 'text-primary ring ring-inset ring-primary/50'
        },
        {
          color: 'secondary',
          variant: 'outline',
          class: 'text-secondary ring ring-inset ring-secondary/50'
        },
        {
          color: 'success',
          variant: 'outline',
          class: 'text-success ring ring-inset ring-success/50'
        },
        {
          color: 'info',
          variant: 'outline',
          class: 'text-info ring ring-inset ring-info/50'
        },
        {
          color: 'warning',
          variant: 'outline',
          class: 'text-warning ring ring-inset ring-warning/50'
        },
        {
          color: 'error',
          variant: 'outline',
          class: 'text-error ring ring-inset ring-error/50'
        },
        {
          color: 'primary',
          variant: 'soft',
          class: 'bg-primary/10 text-primary'
        },
        {
          color: 'secondary',
          variant: 'soft',
          class: 'bg-secondary/10 text-secondary'
        },
        {
          color: 'success',
          variant: 'soft',
          class: 'bg-success/10 text-success'
        },
        {
          color: 'info',
          variant: 'soft',
          class: 'bg-info/10 text-info'
        },
        {
          color: 'warning',
          variant: 'soft',
          class: 'bg-warning/10 text-warning'
        },
        {
          color: 'error',
          variant: 'soft',
          class: 'bg-error/10 text-error'
        },
        {
          color: 'primary',
          variant: 'subtle',
          class: 'bg-primary/10 text-primary ring ring-inset ring-primary/25'
        },
        {
          color: 'secondary',
          variant: 'subtle',
          class: 'bg-secondary/10 text-secondary ring ring-inset ring-secondary/25'
        },
        {
          color: 'success',
          variant: 'subtle',
          class: 'bg-success/10 text-success ring ring-inset ring-success/25'
        },
        {
          color: 'info',
          variant: 'subtle',
          class: 'bg-info/10 text-info ring ring-inset ring-info/25'
        },
        {
          color: 'warning',
          variant: 'subtle',
          class: 'bg-warning/10 text-warning ring ring-inset ring-warning/25'
        },
        {
          color: 'error',
          variant: 'subtle',
          class: 'bg-error/10 text-error ring ring-inset ring-error/25'
        },
        {
          color: 'neutral',
          variant: 'solid',
          class: 'text-inverted bg-inverted'
        },
        {
          color: 'neutral',
          variant: 'outline',
          class: 'ring ring-inset ring-accented text-default bg-default'
        },
        {
          color: 'neutral',
          variant: 'soft',
          class: 'text-default bg-elevated'
        },
        {
          color: 'neutral',
          variant: 'subtle',
          class: 'ring ring-inset ring-accented text-default bg-elevated'
        },
        {
          size: 'xs',
          square: true,
          class: 'p-0.5'
        },
        {
          size: 'sm',
          square: true,
          class: 'p-1'
        },
        {
          size: 'md',
          square: true,
          class: 'p-1'
        },
        {
          size: 'lg',
          square: true,
          class: 'p-1'
        },
        {
          size: 'xl',
          square: true,
          class: 'p-1'
        }
      ],
      defaultVariants: {
        color: 'primary',
        variant: 'solid',
        size: 'md'
      }
    }
  }
})
```
