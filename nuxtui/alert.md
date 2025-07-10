# Alert

> A callout to draw user's attention.

## Usage

### Title

Use the `title` prop to set the title of the Alert.

```vue
<template>
  <UAlert title="Heads up!" />
</template>
```

### Description

Use the `description` prop to set the description of the Alert.

```vue
<template>
  <UAlert title="Heads up!" description="You can change the primary color in your app config." />
</template>
```

### Icon

Use the `icon` prop to show an [Icon](/components/icon).

```vue
<template>
  <UAlert title="Heads up!" description="You can change the primary color in your app config." icon="i-lucide-terminal" />
</template>
```

### Avatar

Use the `avatar` prop to show an [Avatar](/components/avatar).

```vue
<template>
  <UAlert title="Heads up!" description="You can change the primary color in your app config." />
</template>
```

### Color

Use the `color` prop to change the color of the Alert.

```vue
<template>
  <UAlert color="neutral" title="Heads up!" description="You can change the primary color in your app config." icon="i-lucide-terminal" />
</template>
```

### Variant

Use the `variant` prop to change the variant of the Alert.

```vue
<template>
  <UAlert color="neutral" variant="subtle" title="Heads up!" description="You can change the primary color in your app config." icon="i-lucide-terminal" />
</template>
```

### Close

Use the `close` prop to display a [Button](/components/button) to dismiss the Alert.

<tip>

An `update:open` event will be emitted when the close button is clicked.

</tip>

```vue
<template>
  <UAlert title="Heads up!" description="You can change the primary color in your app config." color="neutral" variant="outline" close />
</template>
```

You can pass any property from the [Button](/components/button) component to customize it.

```vue
<template>
  <UAlert title="Heads up!" description="You can change the primary color in your app config." color="neutral" variant="outline" />
</template>
```

### Close Icon

Use the `close-icon` prop to customize the close button [Icon](/components/icon). Defaults to `i-lucide-x`.

```vue
<template>
  <UAlert title="Heads up!" description="You can change the primary color in your app config." color="neutral" variant="outline" close close-icon="i-lucide-arrow-right" />
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

### Actions

Use the `actions` prop to add some [Button](/components/button) actions to the Alert.

```vue
<template>
  <UAlert title="Heads up!" description="You can change the primary color in your app config." color="neutral" variant="outline" />
</template>
```

### Orientation

Use the `orientation` prop to change the orientation of the Alert.

```vue
<template>
  <UAlert title="Heads up!" description="You can change the primary color in your app config." color="neutral" variant="outline" orientation="horizontal" />
</template>
```

## Examples

### `class` prop

Use the `class` prop to override the base styles of the Alert.

```vue
<template>
  <UAlert title="Heads up!" description="You can change the primary color in your app config." class="rounded-none" />
</template>
```

### `ui` prop

Use the `ui` prop to override the slots styles of the Alert.

```vue
<template>
  <UAlert title="Heads up!" description="You can change the primary color in your app config." icon="i-lucide-rocket" />
</template>
```

## API

### Props

```ts
/**
 * Props for the Alert component
 */
interface AlertProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  title?: string | undefined;
  description?: string | undefined;
  icon?: string | undefined;
  avatar?: AvatarProps | undefined;
  color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined;
  variant?: "solid" | "outline" | "soft" | "subtle" | undefined;
  /**
   * The orientation between the content and the actions.
   * @default "\"vertical\""
   */
  orientation?: "vertical" | "horizontal" | undefined;
  /**
   * Display a list of actions:
   * - under the title and description when orientation is `vertical`
   * - next to the close button when orientation is `horizontal`
   * `{ size: 'xs' }`{lang="ts-type"}
   */
  actions?: ButtonProps[] | undefined;
  /**
   * Display a close button to dismiss the alert.
   * `{ size: 'md', color: 'neutral', variant: 'link' }`{lang="ts-type"}
   */
  close?: boolean | Partial<ButtonProps> | undefined;
  /**
   * The icon displayed in the close button.
   */
  closeIcon?: string | undefined;
  ui?: { root?: ClassNameValue; wrapper?: ClassNameValue; title?: ClassNameValue; description?: ClassNameValue; icon?: ClassNameValue; avatar?: ClassNameValue; avatarSize?: ClassNameValue; actions?: ClassNameValue; close?: ClassNameValue; } | undefined;
}
```

### Slots

```ts
/**
 * Slots for the Alert component
 */
interface AlertSlots {
  leading(): any;
  title(): any;
  description(): any;
  actions(): any;
  close(): any;
}
```

### Emits

```ts
/**
 * Emitted events for the Alert component
 */
interface AlertEmits {
  update:open: (payload: [value: boolean]) => void;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    alert: {
      slots: {
        root: 'relative overflow-hidden w-full rounded-lg p-4 flex gap-2.5',
        wrapper: 'min-w-0 flex-1 flex flex-col',
        title: 'text-sm font-medium',
        description: 'text-sm opacity-90',
        icon: 'shrink-0 size-5',
        avatar: 'shrink-0',
        avatarSize: '2xl',
        actions: 'flex flex-wrap gap-1.5 shrink-0',
        close: 'p-0'
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
        variant: {
          solid: '',
          outline: '',
          soft: '',
          subtle: ''
        },
        orientation: {
          horizontal: {
            root: 'items-center',
            actions: 'items-center'
          },
          vertical: {
            root: 'items-start',
            actions: 'items-start mt-2.5'
          }
        },
        title: {
          true: {
            description: 'mt-1'
          }
        }
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: 'solid',
          class: {
            root: 'bg-primary text-inverted'
          }
        },
        {
          color: 'secondary',
          variant: 'solid',
          class: {
            root: 'bg-secondary text-inverted'
          }
        },
        {
          color: 'success',
          variant: 'solid',
          class: {
            root: 'bg-success text-inverted'
          }
        },
        {
          color: 'info',
          variant: 'solid',
          class: {
            root: 'bg-info text-inverted'
          }
        },
        {
          color: 'warning',
          variant: 'solid',
          class: {
            root: 'bg-warning text-inverted'
          }
        },
        {
          color: 'error',
          variant: 'solid',
          class: {
            root: 'bg-error text-inverted'
          }
        },
        {
          color: 'primary',
          variant: 'outline',
          class: {
            root: 'text-primary ring ring-inset ring-primary/25'
          }
        },
        {
          color: 'secondary',
          variant: 'outline',
          class: {
            root: 'text-secondary ring ring-inset ring-secondary/25'
          }
        },
        {
          color: 'success',
          variant: 'outline',
          class: {
            root: 'text-success ring ring-inset ring-success/25'
          }
        },
        {
          color: 'info',
          variant: 'outline',
          class: {
            root: 'text-info ring ring-inset ring-info/25'
          }
        },
        {
          color: 'warning',
          variant: 'outline',
          class: {
            root: 'text-warning ring ring-inset ring-warning/25'
          }
        },
        {
          color: 'error',
          variant: 'outline',
          class: {
            root: 'text-error ring ring-inset ring-error/25'
          }
        },
        {
          color: 'primary',
          variant: 'soft',
          class: {
            root: 'bg-primary/10 text-primary'
          }
        },
        {
          color: 'secondary',
          variant: 'soft',
          class: {
            root: 'bg-secondary/10 text-secondary'
          }
        },
        {
          color: 'success',
          variant: 'soft',
          class: {
            root: 'bg-success/10 text-success'
          }
        },
        {
          color: 'info',
          variant: 'soft',
          class: {
            root: 'bg-info/10 text-info'
          }
        },
        {
          color: 'warning',
          variant: 'soft',
          class: {
            root: 'bg-warning/10 text-warning'
          }
        },
        {
          color: 'error',
          variant: 'soft',
          class: {
            root: 'bg-error/10 text-error'
          }
        },
        {
          color: 'primary',
          variant: 'subtle',
          class: {
            root: 'bg-primary/10 text-primary ring ring-inset ring-primary/25'
          }
        },
        {
          color: 'secondary',
          variant: 'subtle',
          class: {
            root: 'bg-secondary/10 text-secondary ring ring-inset ring-secondary/25'
          }
        },
        {
          color: 'success',
          variant: 'subtle',
          class: {
            root: 'bg-success/10 text-success ring ring-inset ring-success/25'
          }
        },
        {
          color: 'info',
          variant: 'subtle',
          class: {
            root: 'bg-info/10 text-info ring ring-inset ring-info/25'
          }
        },
        {
          color: 'warning',
          variant: 'subtle',
          class: {
            root: 'bg-warning/10 text-warning ring ring-inset ring-warning/25'
          }
        },
        {
          color: 'error',
          variant: 'subtle',
          class: {
            root: 'bg-error/10 text-error ring ring-inset ring-error/25'
          }
        },
        {
          color: 'neutral',
          variant: 'solid',
          class: {
            root: 'text-inverted bg-inverted'
          }
        },
        {
          color: 'neutral',
          variant: 'outline',
          class: {
            root: 'text-highlighted bg-default ring ring-inset ring-default'
          }
        },
        {
          color: 'neutral',
          variant: 'soft',
          class: {
            root: 'text-highlighted bg-elevated/50'
          }
        },
        {
          color: 'neutral',
          variant: 'subtle',
          class: {
            root: 'text-highlighted bg-elevated/50 ring ring-inset ring-accented'
          }
        }
      ],
      defaultVariants: {
        color: 'primary',
        variant: 'solid'
      }
    }
  }
})
```
