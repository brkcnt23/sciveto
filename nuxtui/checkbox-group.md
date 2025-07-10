# CheckboxGroup

> A set of checklist buttons to select multiple option from a list.

## Usage

Use the `v-model` directive to control the value of the CheckboxGroup or the `default-value` prop to set the initial value when you do not need to control its state.

### Items

Use the `items` prop as an array of strings or numbers:

```vue
<script setup lang="ts">
import type { CheckboxGroupItem } from '@nuxt/ui'
import type { CheckboxGroupValue } from '@nuxt/ui'

const items = ref<CheckboxGroupItem[]>([
  'System',
  'Light',
  'Dark',
])
</script>

<template>
  <UCheckboxGroup :items="items" />
</template>
```

You can also pass an array of objects with the following properties:

- `label?: string`
- `description?: string`
- [`value?: string`](#value-key)
- `disabled?: boolean`
- `class?: any`
- `ui?: { item?: ClassNameValue, container?: ClassNameValue, base?: ClassNameValue, 'indicator'?: ClassNameValue, icon?: ClassNameValue, wrapper?: ClassNameValue, label?: ClassNameValue, description?: ClassNameValue }`

```vue
<script setup lang="ts">
import type { CheckboxGroupItem } from '@nuxt/ui'
import type { CheckboxGroupValue } from '@nuxt/ui'

const items = ref<CheckboxGroupItem[]>([
  {
    label: 'System',
    description: 'This is the first option.',
    value: 'system',
  },
  {
    label: 'Light',
    description: 'This is the second option.',
    value: 'light',
  },
  {
    label: 'Dark',
    description: 'This is the third option.',
    value: 'dark',
  },
])
</script>

<template>
  <UCheckboxGroup :items="items" />
</template>
```

<caution>

When using objects, you need to reference the `value` property of the object in the `v-model` directive or the `default-value` prop.

</caution>

### Value Key

You can change the property that is used to set the value by using the `value-key` prop. Defaults to `value`.

```vue
<script setup lang="ts">
import type { CheckboxGroupItem } from '@nuxt/ui'
import type { CheckboxGroupValue } from '@nuxt/ui'

const items = ref<CheckboxGroupItem[]>([
  {
    label: 'System',
    description: 'This is the first option.',
    id: 'system',
  },
  {
    label: 'Light',
    description: 'This is the second option.',
    id: 'light',
  },
  {
    label: 'Dark',
    description: 'This is the third option.',
    id: 'dark',
  },
])
</script>

<template>
  <UCheckboxGroup value-key="id" :items="items" />
</template>
```

### Legend

Use the `legend` prop to set the legend of the CheckboxGroup.

```vue
<script setup lang="ts">
import type { CheckboxGroupItem } from '@nuxt/ui'

const items = ref<CheckboxGroupItem[]>([
  'System',
  'Light',
  'Dark',
])
</script>

<template>
  <UCheckboxGroup legend="Theme" :items="items" />
</template>
```

### Color

Use the `color` prop to change the color of the CheckboxGroup.

```vue
<script setup lang="ts">
import type { CheckboxGroupItem } from '@nuxt/ui'

const items = ref<CheckboxGroupItem[]>([
  'System',
  'Light',
  'Dark',
])
</script>

<template>
  <UCheckboxGroup color="neutral" :items="items" />
</template>
```

### Variant

Use the `variant` prop to change the variant of the CheckboxGroup.

```vue
<script setup lang="ts">
import type { CheckboxGroupItem } from '@nuxt/ui'

const items = ref<CheckboxGroupItem[]>([
  'System',
  'Light',
  'Dark',
])
</script>

<template>
  <UCheckboxGroup color="primary" variant="card" :items="items" />
</template>
```

### Size

Use the `size` prop to change the size of the CheckboxGroup.

```vue
<script setup lang="ts">
import type { CheckboxGroupItem } from '@nuxt/ui'

const items = ref<CheckboxGroupItem[]>([
  'System',
  'Light',
  'Dark',
])
</script>

<template>
  <UCheckboxGroup size="xl" variant="list" :items="items" />
</template>
```

### Orientation

Use the `orientation` prop to change the orientation of the CheckboxGroup. Defaults to `vertical`.

```vue
<script setup lang="ts">
import type { CheckboxGroupItem } from '@nuxt/ui'

const items = ref<CheckboxGroupItem[]>([
  'System',
  'Light',
  'Dark',
])
</script>

<template>
  <UCheckboxGroup orientation="horizontal" variant="list" :items="items" />
</template>
```

### Indicator

Use the `indicator` prop to change the position or hide the indicator. Defaults to `start`.

```vue
<script setup lang="ts">
import type { CheckboxGroupItem } from '@nuxt/ui'

const items = ref<CheckboxGroupItem[]>([
  'System',
  'Light',
  'Dark',
])
</script>

<template>
  <UCheckboxGroup indicator="end" variant="card" :items="items" />
</template>
```

### Disabled

Use the `disabled` prop to disable the CheckboxGroup.

```vue
<script setup lang="ts">
import type { CheckboxGroupItem } from '@nuxt/ui'

const items = ref<CheckboxGroupItem[]>([
  'System',
  'Light',
  'Dark',
])
</script>

<template>
  <UCheckboxGroup disabled :items="items" />
</template>
```

## API

### Props

```ts
/**
 * Props for the CheckboxGroup component
 */
interface CheckboxGroupProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  legend?: string | undefined;
  /**
   * When `items` is an array of objects, select the field to use as the value.
   * @default "\"value\""
   */
  valueKey?: string | undefined;
  /**
   * When `items` is an array of objects, select the field to use as the label.
   * @default "\"label\""
   */
  labelKey?: string | undefined;
  /**
   * When `items` is an array of objects, select the field to use as the description.
   * @default "\"description\""
   */
  descriptionKey?: string | undefined;
  items?: CheckboxGroupItem[] | undefined;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  variant?: "table" | "list" | "card" | undefined;
  /**
   * The orientation the checkbox buttons are laid out.
   * @default "\"vertical\""
   */
  orientation?: Orientation | undefined;
  ui?: ({ root?: ClassNameValue; fieldset?: ClassNameValue; legend?: ClassNameValue; item?: ClassNameValue; } & { root?: ClassNameValue; container?: ClassNameValue; base?: ClassNameValue; indicator?: ClassNameValue; icon?: ClassNameValue; wrapper?: ClassNameValue; label?: ClassNameValue; description?: ClassNameValue; }) | undefined;
  /**
   * The value of the checkbox when it is initially rendered. Use when you do not need to control its value.
   */
  defaultValue?: AcceptableValue[] | undefined;
  /**
   * When `true`, prevents the user from interacting with the checkboxes
   */
  disabled?: boolean | undefined;
  /**
   * Whether keyboard navigation should loop around
   */
  loop?: boolean | undefined;
  /**
   * The controlled value of the checkbox. Can be binded with v-model.
   */
  modelValue?: AcceptableValue[] | undefined;
  /**
   * The name of the field. Submitted with its owning form as part of a name/value pair.
   */
  name?: string | undefined;
  /**
   * When `true`, indicates that the user must set the value before the owning form can be submitted.
   */
  required?: boolean | undefined;
  color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined;
  /**
   * Position of the indicator.
   */
  indicator?: "start" | "end" | "hidden" | undefined;
  /**
   * The icon displayed when checked.
   */
  icon?: string | undefined;
}
```

### Slots

```ts
/**
 * Slots for the CheckboxGroup component
 */
interface CheckboxGroupSlots {
  legend(): any;
  label(): any;
  description(): any;
}
```

### Emits

```ts
/**
 * Emitted events for the CheckboxGroup component
 */
interface CheckboxGroupEmits {
  change: (payload: [payload: Event]) => void;
  update:modelValue: (payload: [value: AcceptableValue[]]) => void;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    checkboxGroup: {
      slots: {
        root: 'relative',
        fieldset: 'flex gap-x-2',
        legend: 'mb-1 block font-medium text-default',
        item: ''
      },
      variants: {
        orientation: {
          horizontal: {
            fieldset: 'flex-row'
          },
          vertical: {
            fieldset: 'flex-col'
          }
        },
        color: {
          primary: {},
          secondary: {},
          success: {},
          info: {},
          warning: {},
          error: {},
          neutral: {}
        },
        variant: {
          list: {},
          card: {},
          table: {
            item: 'border border-muted'
          }
        },
        size: {
          xs: {
            fieldset: 'gap-y-0.5',
            legend: 'text-xs'
          },
          sm: {
            fieldset: 'gap-y-0.5',
            legend: 'text-xs'
          },
          md: {
            fieldset: 'gap-y-1',
            legend: 'text-sm'
          },
          lg: {
            fieldset: 'gap-y-1',
            legend: 'text-sm'
          },
          xl: {
            fieldset: 'gap-y-1.5',
            legend: 'text-base'
          }
        },
        required: {
          true: {
            legend: "after:content-['*'] after:ms-0.5 after:text-error"
          }
        }
      },
      compoundVariants: [
        {
          size: 'xs',
          variant: 'table',
          class: {
            item: 'p-2.5'
          }
        },
        {
          size: 'sm',
          variant: 'table',
          class: {
            item: 'p-3'
          }
        },
        {
          size: 'md',
          variant: 'table',
          class: {
            item: 'p-3.5'
          }
        },
        {
          size: 'lg',
          variant: 'table',
          class: {
            item: 'p-4'
          }
        },
        {
          size: 'xl',
          variant: 'table',
          class: {
            item: 'p-4.5'
          }
        },
        {
          orientation: 'horizontal',
          variant: 'table',
          class: {
            item: 'first-of-type:rounded-s-lg last-of-type:rounded-e-lg',
            fieldset: 'gap-0 -space-x-px'
          }
        },
        {
          orientation: 'vertical',
          variant: 'table',
          class: {
            item: 'first-of-type:rounded-t-lg last-of-type:rounded-b-lg',
            fieldset: 'gap-0 -space-y-px'
          }
        },
        {
          color: 'primary',
          variant: 'table',
          class: {
            item: 'has-data-[state=checked]:bg-primary/10 has-data-[state=checked]:border-primary/50 has-data-[state=checked]:z-[1]'
          }
        },
        {
          color: 'secondary',
          variant: 'table',
          class: {
            item: 'has-data-[state=checked]:bg-secondary/10 has-data-[state=checked]:border-secondary/50 has-data-[state=checked]:z-[1]'
          }
        },
        {
          color: 'success',
          variant: 'table',
          class: {
            item: 'has-data-[state=checked]:bg-success/10 has-data-[state=checked]:border-success/50 has-data-[state=checked]:z-[1]'
          }
        },
        {
          color: 'info',
          variant: 'table',
          class: {
            item: 'has-data-[state=checked]:bg-info/10 has-data-[state=checked]:border-info/50 has-data-[state=checked]:z-[1]'
          }
        },
        {
          color: 'warning',
          variant: 'table',
          class: {
            item: 'has-data-[state=checked]:bg-warning/10 has-data-[state=checked]:border-warning/50 has-data-[state=checked]:z-[1]'
          }
        },
        {
          color: 'error',
          variant: 'table',
          class: {
            item: 'has-data-[state=checked]:bg-error/10 has-data-[state=checked]:border-error/50 has-data-[state=checked]:z-[1]'
          }
        },
        {
          color: 'neutral',
          variant: 'table',
          class: {
            item: 'has-data-[state=checked]:bg-elevated has-data-[state=checked]:border-inverted/50 has-data-[state=checked]:z-[1]'
          }
        },
        {
          variant: 'table',
          disabled: true,
          class: {
            item: 'cursor-not-allowed opacity-75'
          }
        }
      ],
      defaultVariants: {
        size: 'md',
        variant: 'list',
        color: 'primary'
      }
    }
  }
})
```
