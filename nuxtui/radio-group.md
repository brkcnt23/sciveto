# RadioGroup

> A set of radio buttons to select a single option from a list.

## Usage

Use the `v-model` directive to control the value of the RadioGroup or the `default-value` prop to set the initial value when you do not need to control its state.

### Items

Use the `items` prop as an array of strings or numbers:

```vue
<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui'
import type { RadioGroupValue } from '@nuxt/ui'

const items = ref<RadioGroupItem[]>([
  'System',
  'Light',
  'Dark',
])
</script>

<template>
  <URadioGroup model-value="System" :items="items" />
</template>
```

You can also pass an array of objects with the following properties:

- `label?: string`
- `description?: string`
- [`value?: string`](#value-key)
- `disabled?: boolean`
- `class?: any`
- `ui?: { item?: ClassNameValue, container?: ClassNameValue, base?: ClassNameValue, 'indicator'?: ClassNameValue, wrapper?: ClassNameValue, label?: ClassNameValue, description?: ClassNameValue }`

```vue
<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui'
import type { RadioGroupValue } from '@nuxt/ui'

const items = ref<RadioGroupItem[]>([
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
  <URadioGroup model-value="system" :items="items" />
</template>
```

<caution>

When using objects, you need to reference the `value` property of the object in the `v-model` directive or the `default-value` prop.

</caution>

### Value Key

You can change the property that is used to set the value by using the `value-key` prop. Defaults to `value`.

```vue
<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui'
import type { RadioGroupValue } from '@nuxt/ui'

const items = ref<RadioGroupItem[]>([
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
  <URadioGroup model-value="light" value-key="id" :items="items" />
</template>
```

### Legend

Use the `legend` prop to set the legend of the RadioGroup.

```vue
<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui'

const items = ref<RadioGroupItem[]>([
  'System',
  'Light',
  'Dark',
])
</script>

<template>
  <URadioGroup legend="Theme" default-value="System" :items="items" />
</template>
```

### Color

Use the `color` prop to change the color of the RadioGroup.

```vue
<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui'

const items = ref<RadioGroupItem[]>([
  'System',
  'Light',
  'Dark',
])
</script>

<template>
  <URadioGroup color="neutral" default-value="System" :items="items" />
</template>
```

### Variant

Use the `variant` prop to change the variant of the RadioGroup.

```vue
<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui'

const items = ref<RadioGroupItem[]>([
  {
    label: 'Pro',
    value: 'pro',
    description: 'Tailored for indie hackers, freelancers and solo founders.',
  },
  {
    label: 'Startup',
    value: 'startup',
    description: 'Best suited for small teams, startups and agencies.',
  },
  {
    label: 'Enterprise',
    value: 'enterprise',
    description: 'Ideal for larger teams and organizations.',
  },
])
</script>

<template>
  <URadioGroup color="primary" variant="table" default-value="pro" :items="items" />
</template>
```

### Size

Use the `size` prop to change the size of the RadioGroup.

```vue
<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui'

const items = ref<RadioGroupItem[]>([
  'System',
  'Light',
  'Dark',
])
</script>

<template>
  <URadioGroup size="xl" variant="list" default-value="System" :items="items" />
</template>
```

### Orientation

Use the `orientation` prop to change the orientation of the RadioGroup. Defaults to `vertical`.

```vue
<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui'

const items = ref<RadioGroupItem[]>([
  'System',
  'Light',
  'Dark',
])
</script>

<template>
  <URadioGroup orientation="horizontal" variant="list" default-value="System" :items="items" />
</template>
```

### Indicator

Use the `indicator` prop to change the position or hide the indicator. Defaults to `start`.

```vue
<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui'

const items = ref<RadioGroupItem[]>([
  'System',
  'Light',
  'Dark',
])
</script>

<template>
  <URadioGroup indicator="end" variant="card" default-value="System" :items="items" />
</template>
```

### Disabled

Use the `disabled` prop to disable the RadioGroup.

```vue
<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui'

const items = ref<RadioGroupItem[]>([
  'System',
  'Light',
  'Dark',
])
</script>

<template>
  <URadioGroup disabled default-value="System" :items="items" />
</template>
```

## API

### Props

```ts
/**
 * Props for the RadioGroup component
 */
interface RadioGroupProps {
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
  items?: RadioGroupItem[] | undefined;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  variant?: "card" | "list" | "table" | undefined;
  color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined;
  /**
   * The orientation the radio buttons are laid out.
   * @default "\"vertical\""
   */
  orientation?: DataOrientation | undefined;
  /**
   * Position of the indicator.
   */
  indicator?: "start" | "end" | "hidden" | undefined;
  ui?: { root?: ClassNameValue; fieldset?: ClassNameValue; legend?: ClassNameValue; item?: ClassNameValue; container?: ClassNameValue; base?: ClassNameValue; indicator?: ClassNameValue; wrapper?: ClassNameValue; label?: ClassNameValue; description?: ClassNameValue; } | undefined;
  /**
   * The value of the radio item that should be checked when initially rendered.
   * 
   * Use when you do not need to control the state of the radio items.
   */
  defaultValue?: AcceptableValue | undefined;
  /**
   * When `true`, prevents the user from interacting with radio items.
   */
  disabled?: boolean | undefined;
  /**
   * When `true`, keyboard navigation will loop from last item to first, and vice versa.
   */
  loop?: boolean | undefined;
  /**
   * The controlled value of the radio item to check. Can be binded as `v-model`.
   */
  modelValue?: AcceptableValue | undefined;
  /**
   * The name of the field. Submitted with its owning form as part of a name/value pair.
   */
  name?: string | undefined;
  /**
   * When `true`, indicates that the user must set the value before the owning form can be submitted.
   */
  required?: boolean | undefined;
}
```

### Slots

```ts
/**
 * Slots for the RadioGroup component
 */
interface RadioGroupSlots {
  legend(): any;
  label(): any;
  description(): any;
}
```

### Emits

```ts
/**
 * Emitted events for the RadioGroup component
 */
interface RadioGroupEmits {
  change: (payload: [payload: Event]) => void;
  update:modelValue: (payload: [payload: string]) => void;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    radioGroup: {
      slots: {
        root: 'relative',
        fieldset: 'flex gap-x-2',
        legend: 'mb-1 block font-medium text-default',
        item: 'flex items-start',
        container: 'flex items-center',
        base: 'rounded-full ring ring-inset ring-accented overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2',
        indicator: 'flex items-center justify-center size-full after:bg-default after:rounded-full',
        wrapper: 'w-full',
        label: 'block font-medium text-default',
        description: 'text-muted'
      },
      variants: {
        color: {
          primary: {
            base: 'focus-visible:outline-primary',
            indicator: 'bg-primary'
          },
          secondary: {
            base: 'focus-visible:outline-secondary',
            indicator: 'bg-secondary'
          },
          success: {
            base: 'focus-visible:outline-success',
            indicator: 'bg-success'
          },
          info: {
            base: 'focus-visible:outline-info',
            indicator: 'bg-info'
          },
          warning: {
            base: 'focus-visible:outline-warning',
            indicator: 'bg-warning'
          },
          error: {
            base: 'focus-visible:outline-error',
            indicator: 'bg-error'
          },
          neutral: {
            base: 'focus-visible:outline-inverted',
            indicator: 'bg-inverted'
          }
        },
        variant: {
          list: {
            item: ''
          },
          card: {
            item: 'border border-muted rounded-lg'
          },
          table: {
            item: 'border border-muted'
          }
        },
        orientation: {
          horizontal: {
            fieldset: 'flex-row'
          },
          vertical: {
            fieldset: 'flex-col'
          }
        },
        indicator: {
          start: {
            item: 'flex-row',
            wrapper: 'ms-2'
          },
          end: {
            item: 'flex-row-reverse',
            wrapper: 'me-2'
          },
          hidden: {
            base: 'sr-only',
            wrapper: 'text-center'
          }
        },
        size: {
          xs: {
            fieldset: 'gap-y-0.5',
            legend: 'text-xs',
            base: 'size-3',
            item: 'text-xs',
            container: 'h-4',
            indicator: 'after:size-1'
          },
          sm: {
            fieldset: 'gap-y-0.5',
            legend: 'text-xs',
            base: 'size-3.5',
            item: 'text-xs',
            container: 'h-4',
            indicator: 'after:size-1'
          },
          md: {
            fieldset: 'gap-y-1',
            legend: 'text-sm',
            base: 'size-4',
            item: 'text-sm',
            container: 'h-5',
            indicator: 'after:size-1.5'
          },
          lg: {
            fieldset: 'gap-y-1',
            legend: 'text-sm',
            base: 'size-4.5',
            item: 'text-sm',
            container: 'h-5',
            indicator: 'after:size-1.5'
          },
          xl: {
            fieldset: 'gap-y-1.5',
            legend: 'text-base',
            base: 'size-5',
            item: 'text-base',
            container: 'h-6',
            indicator: 'after:size-2'
          }
        },
        disabled: {
          true: {
            base: 'cursor-not-allowed opacity-75',
            label: 'cursor-not-allowed opacity-75'
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
          variant: [
            'card',
            'table'
          ],
          class: {
            item: 'p-2.5'
          }
        },
        {
          size: 'sm',
          variant: [
            'card',
            'table'
          ],
          class: {
            item: 'p-3'
          }
        },
        {
          size: 'md',
          variant: [
            'card',
            'table'
          ],
          class: {
            item: 'p-3.5'
          }
        },
        {
          size: 'lg',
          variant: [
            'card',
            'table'
          ],
          class: {
            item: 'p-4'
          }
        },
        {
          size: 'xl',
          variant: [
            'card',
            'table'
          ],
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
          variant: 'card',
          class: {
            item: 'has-data-[state=checked]:border-primary'
          }
        },
        {
          color: 'secondary',
          variant: 'card',
          class: {
            item: 'has-data-[state=checked]:border-secondary'
          }
        },
        {
          color: 'success',
          variant: 'card',
          class: {
            item: 'has-data-[state=checked]:border-success'
          }
        },
        {
          color: 'info',
          variant: 'card',
          class: {
            item: 'has-data-[state=checked]:border-info'
          }
        },
        {
          color: 'warning',
          variant: 'card',
          class: {
            item: 'has-data-[state=checked]:border-warning'
          }
        },
        {
          color: 'error',
          variant: 'card',
          class: {
            item: 'has-data-[state=checked]:border-error'
          }
        },
        {
          color: 'neutral',
          variant: 'card',
          class: {
            item: 'has-data-[state=checked]:border-inverted'
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
          variant: [
            'card',
            'table'
          ],
          disabled: true,
          class: {
            item: 'cursor-not-allowed opacity-75'
          }
        }
      ],
      defaultVariants: {
        size: 'md',
        color: 'primary',
        variant: 'list',
        orientation: 'vertical',
        indicator: 'start'
      }
    }
  }
})
```
