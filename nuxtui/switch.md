# Switch

> A control that toggles between two states.

## Usage

Use the `v-model` directive to control the checked state of the Switch.

```vue
<template>
  <USwitch model-value />
</template>
```

Use the `default-value` prop to set the initial value when you do not need to control its state.

```vue
<template>
  <USwitch default-value />
</template>
```

### Label

Use the `label` prop to set the label of the Switch.

```vue
<template>
  <USwitch label="Check me" />
</template>
```

When using the `required` prop, an asterisk is added next to the label.

```vue
<template>
  <USwitch required label="Check me" />
</template>
```

### Description

Use the `description` prop to set the description of the Switch.

```vue
<template>
  <USwitch label="Check me" description="This is a checkbox." />
</template>
```

### Icon

Use the `checked-icon` and `unchecked-icon` props to set the icons of the Switch when checked and unchecked.

```vue
<template>
  <USwitch unchecked-icon="i-lucide-x" checked-icon="i-lucide-check" default-value label="Check me" />
</template>
```

### Loading

Use the `loading` prop to show a loading icon on the Switch.

```vue
<template>
  <USwitch loading default-value label="Check me" />
</template>
```

### Loading Icon

Use the `loading-icon` prop to customize the loading icon. Defaults to `i-lucide-loader-circle`.

```vue
<template>
  <USwitch loading loading-icon="i-lucide-loader" default-value label="Check me" />
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

### Color

Use the `color` prop to change the color of the Switch.

```vue
<template>
  <USwitch color="neutral" default-value label="Check me" />
</template>
```

### Size

Use the `size` prop to change the size of the Switch.

```vue
<template>
  <USwitch size="xl" default-value label="Check me" />
</template>
```

### Disabled

Use the `disabled` prop to disable the Switch.

```vue
<template>
  <USwitch disabled label="Check me" />
</template>
```

## API

### Props

```ts
/**
 * Props for the Switch component
 */
interface SwitchProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  /**
   * When `true`, the loading icon will be displayed.
   */
  loading?: boolean | undefined;
  /**
   * The icon when the `loading` prop is `true`.
   */
  loadingIcon?: string | undefined;
  /**
   * Display an icon when the switch is checked.
   */
  checkedIcon?: string | undefined;
  /**
   * Display an icon when the switch is unchecked.
   */
  uncheckedIcon?: string | undefined;
  label?: string | undefined;
  description?: string | undefined;
  ui?: { root?: ClassNameValue; base?: ClassNameValue; container?: ClassNameValue; thumb?: ClassNameValue; icon?: ClassNameValue; wrapper?: ClassNameValue; label?: ClassNameValue; description?: ClassNameValue; } | undefined;
  /**
   * The state of the switch when it is initially rendered. Use when you do not need to control its state.
   */
  defaultValue?: boolean | undefined;
  /**
   * When `true`, prevents the user from interacting with the switch.
   */
  disabled?: boolean | undefined;
  id?: string | undefined;
  /**
   * The name of the field. Submitted with its owning form as part of a name/value pair.
   */
  name?: string | undefined;
  /**
   * When `true`, indicates that the user must set the value before the owning form can be submitted.
   */
  required?: boolean | undefined;
  /**
   * The value given as data when submitted with a `name`.
   */
  value?: string | undefined;
  /**
   * @default "undefined"
   */
  modelValue?: boolean | undefined;
}
```

### Slots

```ts
/**
 * Slots for the Switch component
 */
interface SwitchSlots {
  label(): any;
  description(): any;
}
```

### Emits

```ts
/**
 * Emitted events for the Switch component
 */
interface SwitchEmits {
  change: (payload: [payload: Event]) => void;
  update:modelValue: (payload: [value: boolean]) => void;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    switch: {
      slots: {
        root: 'relative flex items-start',
        base: [
          'inline-flex items-center shrink-0 rounded-full border-2 border-transparent focus-visible:outline-2 focus-visible:outline-offset-2 data-[state=unchecked]:bg-accented',
          'transition-[background] duration-200'
        ],
        container: 'flex items-center',
        thumb: 'group pointer-events-none rounded-full bg-default shadow-lg ring-0 transition-transform duration-200 data-[state=unchecked]:translate-x-0 data-[state=unchecked]:rtl:-translate-x-0 flex items-center justify-center',
        icon: [
          'absolute shrink-0 group-data-[state=unchecked]:text-dimmed opacity-0 size-10/12',
          'transition-[color,opacity] duration-200'
        ],
        wrapper: 'ms-2',
        label: 'block font-medium text-default',
        description: 'text-muted'
      },
      variants: {
        color: {
          primary: {
            base: 'data-[state=checked]:bg-primary focus-visible:outline-primary',
            icon: 'group-data-[state=checked]:text-primary'
          },
          secondary: {
            base: 'data-[state=checked]:bg-secondary focus-visible:outline-secondary',
            icon: 'group-data-[state=checked]:text-secondary'
          },
          success: {
            base: 'data-[state=checked]:bg-success focus-visible:outline-success',
            icon: 'group-data-[state=checked]:text-success'
          },
          info: {
            base: 'data-[state=checked]:bg-info focus-visible:outline-info',
            icon: 'group-data-[state=checked]:text-info'
          },
          warning: {
            base: 'data-[state=checked]:bg-warning focus-visible:outline-warning',
            icon: 'group-data-[state=checked]:text-warning'
          },
          error: {
            base: 'data-[state=checked]:bg-error focus-visible:outline-error',
            icon: 'group-data-[state=checked]:text-error'
          },
          neutral: {
            base: 'data-[state=checked]:bg-inverted focus-visible:outline-inverted',
            icon: 'group-data-[state=checked]:text-highlighted'
          }
        },
        size: {
          xs: {
            base: 'w-7',
            container: 'h-4',
            thumb: 'size-3 data-[state=checked]:translate-x-3 data-[state=checked]:rtl:-translate-x-3',
            wrapper: 'text-xs'
          },
          sm: {
            base: 'w-8',
            container: 'h-4',
            thumb: 'size-3.5 data-[state=checked]:translate-x-3.5 data-[state=checked]:rtl:-translate-x-3.5',
            wrapper: 'text-xs'
          },
          md: {
            base: 'w-9',
            container: 'h-5',
            thumb: 'size-4 data-[state=checked]:translate-x-4 data-[state=checked]:rtl:-translate-x-4',
            wrapper: 'text-sm'
          },
          lg: {
            base: 'w-10',
            container: 'h-5',
            thumb: 'size-4.5 data-[state=checked]:translate-x-4.5 data-[state=checked]:rtl:-translate-x-4.5',
            wrapper: 'text-sm'
          },
          xl: {
            base: 'w-11',
            container: 'h-6',
            thumb: 'size-5 data-[state=checked]:translate-x-5 data-[state=checked]:rtl:-translate-x-5',
            wrapper: 'text-base'
          }
        },
        checked: {
          true: {
            icon: 'group-data-[state=checked]:opacity-100'
          }
        },
        unchecked: {
          true: {
            icon: 'group-data-[state=unchecked]:opacity-100'
          }
        },
        loading: {
          true: {
            icon: 'animate-spin'
          }
        },
        required: {
          true: {
            label: "after:content-['*'] after:ms-0.5 after:text-error"
          }
        },
        disabled: {
          true: {
            base: 'cursor-not-allowed opacity-75',
            label: 'cursor-not-allowed opacity-75',
            description: 'cursor-not-allowed opacity-75'
          }
        }
      },
      defaultVariants: {
        color: 'primary',
        size: 'md'
      }
    }
  }
})
```
