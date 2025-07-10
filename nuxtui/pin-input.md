# PinInput

> An input element to enter a pin.

## Usage

Use the `v-model` directive to control the value of the PinInput.

```vue
<template>
  <UPinInput />
</template>
```

Use the `default-value` prop to set the initial value when you do not need to control its state.

```vue
<template>
  <UPinInput />
</template>
```

### Type

Use the `type` prop to change the input type. Defaults to `text`.

```vue
<template>
  <UPinInput type="number" />
</template>
```

<note>

When `type` is set to `number`, it will only accept numeric characters.

</note>

### Mask

Use the `mask` prop to treat the input like a password.

```vue
<template>
  <UPinInput mask />
</template>
```

### OTP

Use the `otp` prop to enable One-Time Password functionality. When enabled, mobile devices can automatically detect and fill OTP codes from SMS messages or clipboard content, with autocomplete support.

```vue
<template>
  <UPinInput otp />
</template>
```

### Length

Use the `length` prop to change the amount of inputs.

```vue
<template>
  <UPinInput :length="6" />
</template>
```

### Placeholder

Use the `placeholder` prop to set a placeholder text.

```vue
<template>
  <UPinInput placeholder="○" />
</template>
```

### Color

Use the `color` prop to change the ring color when the PinInput is focused.

```vue
<template>
  <UPinInput color="neutral" highlight placeholder="○" />
</template>
```

<note>

The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.

</note>

### Variant

Use the `variant` prop to change the variant of the PinInput.

```vue
<template>
  <UPinInput color="neutral" variant="subtle" :highlight="false" placeholder="○" />
</template>
```

### Size

Use the `size` prop to change the size of the PinInput.

```vue
<template>
  <UPinInput size="xl" placeholder="○" />
</template>
```

### Disabled

Use the `disabled` prop to disable the PinInput.

```vue
<template>
  <UPinInput disabled placeholder="○" />
</template>
```

## API

### Props

```ts
/**
 * Props for the PinInput component
 */
interface PinInputProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined;
  variant?: "outline" | "soft" | "subtle" | "ghost" | "none" | undefined;
  size?: "md" | "xs" | "sm" | "lg" | "xl" | undefined;
  /**
   * The number of input fields.
   * @default "5"
   */
  length?: string | number | undefined;
  autofocus?: boolean | undefined;
  /**
   * @default "0"
   */
  autofocusDelay?: number | undefined;
  highlight?: boolean | undefined;
  ui?: { root?: ClassNameValue; base?: ClassNameValue; } | undefined;
  /**
   * The default value of the pin inputs when it is initially rendered. Use when you do not need to control its checked state.
   */
  defaultValue?: (string[] | number[])[] | undefined;
  /**
   * When `true`, prevents the user from interacting with the pin input
   */
  disabled?: boolean | undefined;
  /**
   * Id of the element
   */
  id?: string | undefined;
  /**
   * When `true`, pin inputs will be treated as password.
   */
  mask?: boolean | undefined;
  /**
   * The controlled checked state of the pin input. Can be binded as `v-model`.
   */
  modelValue?: string[] | number[] | null | undefined;
  /**
   * The name of the field. Submitted with its owning form as part of a name/value pair.
   */
  name?: string | undefined;
  /**
   * When `true`, mobile devices will autodetect the OTP from messages or clipboard, and enable the autocomplete field.
   */
  otp?: boolean | undefined;
  /**
   * The placeholder character to use for empty pin-inputs.
   */
  placeholder?: string | undefined;
  /**
   * When `true`, indicates that the user must set the value before the owning form can be submitted.
   */
  required?: boolean | undefined;
  /**
   * Input type for the inputs.
   * @default "\"text\" as never"
   */
  type?: PinInputType | undefined;
}
```

### Emits

```ts
/**
 * Emitted events for the PinInput component
 */
interface PinInputEmits {
  blur: (payload: [payload: Event]) => void;
  change: (payload: [payload: Event]) => void;
  update:modelValue: (payload: [value: string[] | number[]]) => void;
  complete: (payload: [value: string[] | number[]]) => void;
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
          inputsRef
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
          ComponentPublicInstance
        </span>
        
        <span class="sTEyZ">
          []
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
    pinInput: {
      slots: {
        root: 'relative inline-flex items-center gap-1.5',
        base: [
          'rounded-md border-0 placeholder:text-dimmed text-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors'
        ]
      },
      variants: {
        size: {
          xs: {
            base: 'size-6 text-xs'
          },
          sm: {
            base: 'size-7 text-xs'
          },
          md: {
            base: 'size-8 text-sm'
          },
          lg: {
            base: 'size-9 text-sm'
          },
          xl: {
            base: 'size-10 text-base'
          }
        },
        variant: {
          outline: 'text-highlighted bg-default ring ring-inset ring-accented',
          soft: 'text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50',
          subtle: 'text-highlighted bg-elevated ring ring-inset ring-accented',
          ghost: 'text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent',
          none: 'text-highlighted bg-transparent'
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
