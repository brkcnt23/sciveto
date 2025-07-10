# InputNumber

> An input for numerical values with a customizable range.

<note>

This component relies on the [`@internationalized/number`](https://react-spectrum.adobe.com/internationalized/number/index.html) package which provides utilities for formatting and parsing numbers across locales and numbering systems.

</note>

## Usage

Use the `v-model` directive to control the value of the InputNumber.

```vue
<template>
  <UInputNumber :model-value="5" />
</template>
```

Use the `default-value` prop to set the initial value when you do not need to control its state.

```vue
<template>
  <UInputNumber :default-value="5" />
</template>
```

### Min / Max

Use the `min` and `max` props to set the minimum and maximum values of the InputNumber.

```vue
<template>
  <UInputNumber :model-value="5" :min="0" :max="10" />
</template>
```

### Step

Use the `step` prop to set the step value of the InputNumber.

```vue
<template>
  <UInputNumber :model-value="5" :step="2" />
</template>
```

### Orientation

Use the `orientation` prop to change the orientation of the InputNumber.

```vue
<template>
  <UInputNumber :model-value="5" orientation="vertical" />
</template>
```

### Placeholder

Use the `placeholder` prop to set a placeholder text.

```vue
<template>
  <UInputNumber placeholder="Enter a number" />
</template>
```

### Color

Use the `color` prop to change the ring color when the InputNumber is focused.

```vue
<template>
  <UInputNumber :model-value="5" color="neutral" highlight />
</template>
```

### Variant

Use the `variant` prop to change the variant of the InputNumber.

```vue
<template>
  <UInputNumber :model-value="5" variant="subtle" color="neutral" :highlight="false" />
</template>
```

### Size

Use the `size` prop to change the size of the InputNumber.

```vue
<template>
  <UInputNumber :model-value="5" size="xl" />
</template>
```

### Disabled

Use the `disabled` prop to disable the InputNumber.

```vue
<template>
  <UInputNumber :model-value="5" disabled />
</template>
```

### Increment / Decrement

Use the `increment` and `decrement` props to customize the increment and decrement buttons with any [Button](/components/button) props. Defaults to `{ variant: 'link' }`.

```vue
<template>
  <UInputNumber :model-value="5" />
</template>
```

### Increment / Decrement Icons

Use the `increment-icon` and `decrement-icon` props to customize the buttons [Icon](/components/icon). Defaults to `i-lucide-plus` / `i-lucide-minus`.

```vue
<template>
  <UInputNumber :model-value="5" increment-icon="i-lucide-arrow-right" decrement-icon="i-lucide-arrow-left" />
</template>
```

## Examples

### With decimal format

Use the `format-options` prop to customize the format of the value.

```vue [InputNumberDecimalExample.vue]
<script setup lang="ts">
const value = ref(5)
</script>

<template>
  <UInputNumber
    v-model="value"
    :format-options="{
      signDisplay: 'exceptZero',
      minimumFractionDigits: 1
    }"
  />
</template>
```

### With percentage format

Use the `format-options` prop with `style: 'percent'` to customize the format of the value.

```vue [InputNumberPercentageExample.vue]
<script setup lang="ts">
const value = ref(0.05)
</script>

<template>
  <UInputNumber
    v-model="value"
    :step="0.01"
    :format-options="{
      style: 'percent'
    }"
  />
</template>
```

### With currency format

Use the `format-options` prop with `style: 'currency'` to customize the format of the value.

```vue [InputNumberCurrencyExample.vue]
<script setup lang="ts">
const value = ref(1500)
</script>

<template>
  <UInputNumber
    v-model="value"
    :format-options="{
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'code',
      currencySign: 'accounting'
    }"
  />
</template>
```

### Within a FormField

You can use the InputNumber within a [FormField](/components/form-field) component to display a label, help text, required indicator, etc.

```vue [InputNumberFormFieldExample.vue]
<script setup lang="ts">
const retries = ref(0)
</script>

<template>
  <UFormField label="Retries" help="Specify number of attempts" required>
    <UInputNumber v-model="retries" placeholder="Enter retries" />
  </UFormField>
</template>
```

### With slots

Use the `#increment` and `#decrement` slots to customize the buttons.

```vue [InputNumberSlotsExample.vue]
<script setup lang="ts">
const value = ref(5)
</script>

<template>
  <UInputNumber v-model="value">
    <template #decrement>
      <UButton size="xs" icon="i-lucide-minus" />
    </template>

    <template #increment>
      <UButton size="xs" icon="i-lucide-plus" />
    </template>
  </UInputNumber>
</template>
```

## API

### Props

```ts
/**
 * Props for the InputNumber component
 */
interface InputNumberProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  /**
   * The placeholder text when the input is empty.
   */
  placeholder?: string | undefined;
  color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined;
  variant?: "soft" | "outline" | "subtle" | "ghost" | "none" | undefined;
  size?: "sm" | "md" | "xs" | "lg" | "xl" | undefined;
  /**
   * Highlight the ring color like a focus state.
   */
  highlight?: boolean | undefined;
  /**
   * The orientation of the input menu.
   * @default "\"horizontal\""
   */
  orientation?: "horizontal" | "vertical" | undefined;
  /**
   * Configure the increment button. The `color` and `size` are inherited.
   */
  increment?: ButtonProps | undefined;
  /**
   * The icon displayed to increment the value.
   */
  incrementIcon?: string | undefined;
  /**
   * Disable the increment button.
   */
  incrementDisabled?: boolean | undefined;
  /**
   * Configure the decrement button. The `color` and `size` are inherited.
   */
  decrement?: ButtonProps | undefined;
  /**
   * The icon displayed to decrement the value.
   */
  decrementIcon?: string | undefined;
  /**
   * Disable the decrement button.
   */
  decrementDisabled?: boolean | undefined;
  autofocus?: boolean | undefined;
  autofocusDelay?: number | undefined;
  /**
   * The locale to use for formatting and parsing numbers.
   */
  locale?: string | undefined;
  ui?: { root?: ClassNameValue; base?: ClassNameValue; increment?: ClassNameValue; decrement?: ClassNameValue; } | undefined;
  /**
   * When `true`, prevents the user from interacting with the Number Field.
   */
  disabled?: boolean | undefined;
  /**
   * The name of the field. Submitted with its owning form as part of a name/value pair.
   */
  name?: string | undefined;
  modelValue?: number | null | undefined;
  defaultValue?: number | undefined;
  /**
   * When `true`, indicates that the user must set the value before the owning form can be submitted.
   */
  required?: boolean | undefined;
  /**
   * Id of the element
   */
  id?: string | undefined;
  /**
   * The smallest value allowed for the input.
   */
  min?: number | undefined;
  /**
   * The largest value allowed for the input.
   */
  max?: number | undefined;
  /**
   * The amount that the input value changes with each increment or decrement "tick".
   */
  step?: number | undefined;
  /**
   * When `false`, prevents the value from snapping to the nearest increment of the step value
   */
  stepSnapping?: boolean | undefined;
  /**
   * Formatting options for the value displayed in the number field. This also affects what characters are allowed to be typed by the user.
   */
  formatOptions?: Intl.NumberFormatOptions | undefined;
  /**
   * When `true`, prevents the value from changing on wheel scroll.
   */
  disableWheelChange?: boolean | undefined;
  /**
   * When `true`, inverts the direction of the wheel change.
   */
  invertWheelChange?: boolean | undefined;
}
```

### Slots

```ts
/**
 * Slots for the InputNumber component
 */
interface InputNumberSlots {
  increment(): any;
  decrement(): any;
}
```

### Emits

```ts
/**
 * Emitted events for the InputNumber component
 */
interface InputNumberEmits {
  blur: (payload: [event: FocusEvent]) => void;
  change: (payload: [payload: Event]) => void;
  update:modelValue: (payload: [payload: number]) => void;
}
```

### Expose

When accessing the component via a template ref, you can use the following:

<table>
<thead>
  <tr>
    <th>
      Name
    </th>
    
    <th>
      Type
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code className="language-ts-type shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts-type" style="">
        <span class="sBMFI">
          inputRef
        </span>
      </code>
    </td>
    
    <td>
      <code className="language-ts-type shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts-type" style="">
        <span class="sBMFI">
          Ref
        </span>
        
        <span class="sMK4o">
          <
        </span>
        
        <span class="sBMFI">
          InstanceType
        </span>
        
        <span class="sMK4o">
          <typeof
        </span>
        
        <span class="sTEyZ">
          NumberFieldInput
        </span>
        
        <span class="sMK4o">
          >
        </span>
        
        <span class="sMK4o">
          |
        </span>
        
        <span class="sBMFI">
          null
        </span>
        
        <span class="sMK4o">
          >
        </span>
      </code>
    </td>
  </tr>
</tbody>
</table>

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    inputNumber: {
      slots: {
        root: 'relative inline-flex items-center',
        base: [
          'w-full rounded-md border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors'
        ],
        increment: 'absolute flex items-center',
        decrement: 'absolute flex items-center'
      },
      variants: {
        buttonGroup: {
          horizontal: {
            root: 'group has-focus-visible:z-[1]',
            base: 'group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none'
          },
          vertical: {
            root: 'group has-focus-visible:z-[1]',
            base: 'group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none'
          }
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
        size: {
          xs: 'px-2 py-1 text-xs gap-1',
          sm: 'px-2.5 py-1.5 text-xs gap-1.5',
          md: 'px-2.5 py-1.5 text-sm gap-1.5',
          lg: 'px-3 py-2 text-sm gap-2',
          xl: 'px-3 py-2 text-base gap-2'
        },
        variant: {
          outline: 'text-highlighted bg-default ring ring-inset ring-accented',
          soft: 'text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50',
          subtle: 'text-highlighted bg-elevated ring ring-inset ring-accented',
          ghost: 'text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent',
          none: 'text-highlighted bg-transparent'
        },
        disabled: {
          true: {
            increment: 'opacity-75 cursor-not-allowed',
            decrement: 'opacity-75 cursor-not-allowed'
          }
        },
        orientation: {
          horizontal: {
            base: 'text-center',
            increment: 'inset-y-0 end-0 pe-1',
            decrement: 'inset-y-0 start-0 ps-1'
          },
          vertical: {
            increment: 'top-0 end-0 pe-1 [&>button]:py-0 scale-80',
            decrement: 'bottom-0 end-0 pe-1 [&>button]:py-0 scale-80'
          }
        },
        highlight: {
          true: ''
        }
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: [
            'outline',
            'subtle'
          ],
          class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary'
        },
        {
          color: 'secondary',
          variant: [
            'outline',
            'subtle'
          ],
          class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary'
        },
        {
          color: 'success',
          variant: [
            'outline',
            'subtle'
          ],
          class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success'
        },
        {
          color: 'info',
          variant: [
            'outline',
            'subtle'
          ],
          class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info'
        },
        {
          color: 'warning',
          variant: [
            'outline',
            'subtle'
          ],
          class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning'
        },
        {
          color: 'error',
          variant: [
            'outline',
            'subtle'
          ],
          class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error'
        },
        {
          color: 'primary',
          highlight: true,
          class: 'ring ring-inset ring-primary'
        },
        {
          color: 'secondary',
          highlight: true,
          class: 'ring ring-inset ring-secondary'
        },
        {
          color: 'success',
          highlight: true,
          class: 'ring ring-inset ring-success'
        },
        {
          color: 'info',
          highlight: true,
          class: 'ring ring-inset ring-info'
        },
        {
          color: 'warning',
          highlight: true,
          class: 'ring ring-inset ring-warning'
        },
        {
          color: 'error',
          highlight: true,
          class: 'ring ring-inset ring-error'
        },
        {
          color: 'neutral',
          variant: [
            'outline',
            'subtle'
          ],
          class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted'
        },
        {
          color: 'neutral',
          highlight: true,
          class: 'ring ring-inset ring-inverted'
        },
        {
          orientation: 'horizontal',
          size: 'xs',
          class: 'px-7'
        },
        {
          orientation: 'horizontal',
          size: 'sm',
          class: 'px-8'
        },
        {
          orientation: 'horizontal',
          size: 'md',
          class: 'px-9'
        },
        {
          orientation: 'horizontal',
          size: 'lg',
          class: 'px-10'
        },
        {
          orientation: 'horizontal',
          size: 'xl',
          class: 'px-11'
        },
        {
          orientation: 'vertical',
          size: 'xs',
          class: 'pe-7'
        },
        {
          orientation: 'vertical',
          size: 'sm',
          class: 'pe-8'
        },
        {
          orientation: 'vertical',
          size: 'md',
          class: 'pe-9'
        },
        {
          orientation: 'vertical',
          size: 'lg',
          class: 'pe-10'
        },
        {
          orientation: 'vertical',
          size: 'xl',
          class: 'pe-11'
        }
      ],
      defaultVariants: {
        size: 'md',
        color: 'primary',
        variant: 'outline'
      }
    }
  }
})
```
