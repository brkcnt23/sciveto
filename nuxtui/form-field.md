# FormField

> A wrapper for form elements that provides validation and error handling.

## Usage

Wrap any form component with a FormField. Used in a [Form](/components/form), it provides validation and error handling.

### Label

Use the `label` prop to set the label for the form control.

```vue
<template>
  <UFormField label="Email">
    <UInput placeholder="Enter your email" />
  </UFormField>
</template>
```

<note>

The label `for` attribute and the form control are associated with a unique `id` if not provided.

</note>

When using the `required` prop, an asterisk is added next to the label.

```vue
<template>
  <UFormField label="Email" required>
    <UInput placeholder="Enter your email" />
  </UFormField>
</template>
```

### Description

Use the `description` prop to provide additional information below the label.

```vue
<template>
  <UFormField label="Email" description="We'll never share your email with anyone else.">
    <UInput placeholder="Enter your email" class="w-full" />
  </UFormField>
</template>
```

### Hint

Use the `hint` prop to display a hint message next to the label.

```vue
<template>
  <UFormField label="Email" hint="Optional">
    <UInput placeholder="Enter your email" />
  </UFormField>
</template>
```

### Help

Use the `help` prop to display a help message below the form control.

```vue
<template>
  <UFormField label="Email" help="Please enter a valid email address.">
    <UInput placeholder="Enter your email" class="w-full" />
  </UFormField>
</template>
```

### Error

Use the `error` prop to display an error message below the form control. When used together with the `help` prop, the `error` prop takes precedence.

When used inside a [Form](/components/form), this is automatically set when a validation error occurs.

```vue
<template>
  <UFormField label="Email" error="Please enter a valid email address.">
    <UInput placeholder="Enter your email" class="w-full" />
  </UFormField>
</template>
```

<tip to="/getting-started/theme#colors">

This sets the `color` to `error` on the form control. You can change it globally in your `app.config.ts`.

</tip>

### Size

Use the `size` prop to change the size of the FormField, the `size` is proxied to the form control.

```vue
<template>
  <UFormField label="Email" description="We'll never share your email with anyone else." hint="Optional" help="Please enter a valid email address." size="xl">
    <UInput placeholder="Enter your email" class="w-full" />
  </UFormField>
</template>
```

## API

### Props

```ts
/**
 * Props for the FormField component
 */
interface FormFieldProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  /**
   * The name of the FormField. Also used to match form errors.
   */
  name?: string | undefined;
  /**
   * A regular expression to match form error names.
   */
  errorPattern?: RegExp | undefined;
  label?: string | undefined;
  description?: string | undefined;
  help?: string | undefined;
  error?: string | boolean | undefined;
  hint?: string | undefined;
  size?: "md" | "xs" | "sm" | "lg" | "xl" | undefined;
  required?: boolean | undefined;
  /**
   * If true, validation on input will be active immediately instead of waiting for a blur event.
   */
  eagerValidation?: boolean | undefined;
  /**
   * Delay in milliseconds before validating the form on input events.
   */
  validateOnInputDelay?: number | undefined;
  ui?: { root?: ClassNameValue; wrapper?: ClassNameValue; labelWrapper?: ClassNameValue; label?: ClassNameValue; container?: ClassNameValue; description?: ClassNameValue; error?: ClassNameValue; hint?: ClassNameValue; help?: ClassNameValue; } | undefined;
}
```

### Slots

```ts
/**
 * Slots for the FormField component
 */
interface FormFieldSlots {
  label(): any;
  hint(): any;
  description(): any;
  help(): any;
  error(): any;
  default(): any;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    formField: {
      slots: {
        root: '',
        wrapper: '',
        labelWrapper: 'flex content-center items-center justify-between',
        label: 'block font-medium text-default',
        container: 'mt-1 relative',
        description: 'text-muted',
        error: 'mt-2 text-error',
        hint: 'text-muted',
        help: 'mt-2 text-muted'
      },
      variants: {
        size: {
          xs: {
            root: 'text-xs'
          },
          sm: {
            root: 'text-xs'
          },
          md: {
            root: 'text-sm'
          },
          lg: {
            root: 'text-sm'
          },
          xl: {
            root: 'text-base'
          }
        },
        required: {
          true: {
            label: "after:content-['*'] after:ms-0.5 after:text-error"
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
