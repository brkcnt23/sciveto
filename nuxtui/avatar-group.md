# AvatarGroup

> Stack multiple avatars in a group.

## Usage

Wrap multiple [Avatar](/components/avatar) within an AvatarGroup to stack them.

```vue
<template>
  <UAvatarGroup>
    <UAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
    <UAvatar src="https://github.com/romhml.png" alt="Romain Hamel" />
    <UAvatar src="https://github.com/noook.png" alt="Neil Richter" />
  </UAvatarGroup>
</template>
```

### Size

Use the `size` prop to change the size of all the avatars.

```vue
<template>
  <UAvatarGroup size="xl">
    <UAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
    <UAvatar src="https://github.com/romhml.png" alt="Romain Hamel" />
    <UAvatar src="https://github.com/noook.png" alt="Neil Richter" />
  </UAvatarGroup>
</template>
```

### Max

Use the `max` prop to limit the number of avatars displayed. The rest is displayed as an `+X` avatar.

```vue
<template>
  <UAvatarGroup :max="2">
    <UAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
    <UAvatar src="https://github.com/romhml.png" alt="Romain Hamel" />
    <UAvatar src="https://github.com/noook.png" alt="Neil Richter" />
  </UAvatarGroup>
</template>
```

## Examples

### With tooltip

Wrap each avatar with a [Tooltip](/components/tooltip) to display a tooltip on hover.

```vue [AvatarGroupTooltipExample.vue]
<template>
  <UAvatarGroup>
    <UTooltip text="benjamincanac">
      <UAvatar
        src="https://github.com/benjamincanac.png"
        alt="Benjamin Canac"
      />
    </UTooltip>

    <UTooltip text="romhml">
      <UAvatar
        src="https://github.com/romhml.png"
        alt="Romain Hamel"
      />
    </UTooltip>

    <UTooltip text="noook">
      <UAvatar
        src="https://github.com/noook.png"
        alt="Neil Richter"
      />
    </UTooltip>
  </UAvatarGroup>
</template>
```

### With chip

Wrap each avatar with a [Chip](/components/chip) to display a chip around the avatar.

```vue [AvatarGroupChipExample.vue]
<template>
  <UAvatarGroup>
    <UChip inset color="success">
      <UAvatar
        src="https://github.com/benjamincanac.png"
        alt="Benjamin Canac"
      />
    </UChip>

    <UChip inset color="warning">
      <UAvatar
        src="https://github.com/romhml.png"
        alt="Romain Hamel"
      />
    </UChip>

    <UChip inset color="error">
      <UAvatar
        src="https://github.com/noook.png"
        alt="Neil Richter"
      />
    </UChip>
  </UAvatarGroup>
</template>
```

### With link

Wrap each avatar with a [Link](/components/link) to make them clickable.

```vue [AvatarGroupLinkExample.vue]
<template>
  <UAvatarGroup>
    <ULink
      to="https://github.com/benjamincanac"
      target="_blank"
      class="hover:ring-primary transition"
      raw
    >
      <UAvatar
        src="https://github.com/benjamincanac.png"
        alt="Benjamin Canac"
      />
    </ULink>

    <ULink
      to="https://github.com/romhml"
      target="_blank"
      class="hover:ring-primary transition"
      raw
    >
      <UAvatar
        src="https://github.com/romhml.png"
        alt="Romain Hamel"
      />
    </ULink>

    <ULink
      to="https://github.com/noook"
      target="_blank"
      class="hover:ring-primary transition"
      raw
    >
      <UAvatar
        src="https://github.com/noook.png"
        alt="Neil Richter"
      />
    </ULink>
  </UAvatarGroup>
</template>
```

## API

### Props

```ts
/**
 * Props for the AvatarGroup component
 */
interface AvatarGroupProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  size?: "md" | "3xs" | "2xs" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl" | undefined;
  /**
   * The maximum number of avatars to display.
   */
  max?: string | number | undefined;
  ui?: { root?: ClassNameValue; base?: ClassNameValue; } | undefined;
}
```

### Slots

```ts
/**
 * Slots for the AvatarGroup component
 */
interface AvatarGroupSlots {
  default(): any;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    avatarGroup: {
      slots: {
        root: 'inline-flex flex-row-reverse justify-end',
        base: 'relative rounded-full ring-bg first:me-0'
      },
      variants: {
        size: {
          '3xs': {
            base: 'ring -me-0.5'
          },
          '2xs': {
            base: 'ring -me-0.5'
          },
          xs: {
            base: 'ring -me-0.5'
          },
          sm: {
            base: 'ring-2 -me-1.5'
          },
          md: {
            base: 'ring-2 -me-1.5'
          },
          lg: {
            base: 'ring-2 -me-1.5'
          },
          xl: {
            base: 'ring-3 -me-2'
          },
          '2xl': {
            base: 'ring-3 -me-2'
          },
          '3xl': {
            base: 'ring-3 -me-2'
          }
        }
      },
      defaultVariants: {
        size: 'md'
      }
    }
  }
})
```
