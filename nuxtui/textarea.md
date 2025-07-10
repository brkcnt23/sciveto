# Textarea

> A textarea element to input multi-line text.

## Usage

Use the `v-model` directive to control the value of the Textarea.

```vue
<template>
  <UTextarea model-value="" />
</template>
```

### Rows

Use the `rows` prop to set the number of rows. Defaults to `3`.

```vue
<template>
  <UTextarea :rows="12" />
</template>
```

### Placeholder

Use the `placeholder` prop to set a placeholder text.

```vue
<template>
  <UTextarea placeholder="Type something..." />
</template>
```

### Autoresize

Use the `autoresize` prop to enable autoresizing the height of the Textarea.

```vue
<template>
  <UTextarea model-value="This is a long text that will autoresize the height of the Textarea." autoresize />
</template>
```

Use the `maxrows` prop to set the maximum number of rows when autoresizing. If set to `0`, the Textarea will grow indefinitely.

```vue
<template>
  <UTextarea model-value="This is a long text that will autoresize the height of the Textarea with a maximum of 4 rows." :maxrows="4" autoresize />
</template>
```

### Color

Use the `color` prop to change the ring color when the Textarea is focused.

```vue
<template>
  <UTextarea color="neutral" highlight placeholder="Type something..." />
</template>
```

<note>

The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.

</note>

### Variant

Use the `variant` prop to change the variant of the Textarea.

```vue
<template>
  <UTextarea color="neutral" variant="subtle" :highlight="false" placeholder="Type something..." />
</template>
```

### Size

Use the `size` prop to change the size of the Textarea.

```vue
<template>
  <UTextarea size="xl" placeholder="Type something..." />
</template>
```

### Icon

Use the `icon` prop to show an [Icon](/components/icon) inside the Textarea.

```vue
<template>
  <UTextarea icon="i-lucide-search" size="md" variant="outline" placeholder="Search..." :rows="1" />
</template>
```

Use the `leading` and `trailing` props to set the icon position or the `leading-icon` and `trailing-icon` props to set a different icon for each position.

```vue
<template>
  <UTextarea trailing-icon="i-lucide-at-sign" placeholder="Enter your email" size="md" :rows="1" />
</template>
```

### Avatar

Use the `avatar` prop to show an [Avatar](/components/avatar) inside the Textarea.

```vue
<template>
  <UTextarea size="md" variant="outline" placeholder="Search..." :rows="1" />
</template>
```

### Loading

Use the `loading` prop to show a loading icon on the Textarea.

```vue
<template>
  <UTextarea loading :trailing="false" placeholder="Search..." :rows="1" />
</template>
```

### Loading Icon

Use the `loading-icon` prop to customize the loading icon. Defaults to `i-lucide-loader-circle`.

```vue
<template>
  <UTextarea loading loading-icon="i-lucide-loader" placeholder="Search..." :rows="1" />
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

### Disabled

Use the `disabled` prop to disable the Textarea.

```vue
<template>
  <UTextarea disabled placeholder="Type something..." />
</template>
```

## API

### Props

```ts
/**
 * Props for the Textarea component
 */
interface TextareaProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  id?: string | undefined;
  name?: string | undefined;
  /**
   * The placeholder text when the textarea is empty.
   */
  placeholder?: string | undefined;
  color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined;
  variant?: "outline" | "soft" | "subtle" | "ghost" | "none" | undefined;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  required?: boolean | undefined;
  autofocus?: boolean | undefined;
  /**
   * @default "0"
   */
  autofocusDelay?: number | undefined;
  autoresize?: boolean | undefined;
  /**
   * @default "0"
   */
  autoresizeDelay?: number | undefined;
  disabled?: boolean | undefined;
  /**
   * @default "3"
   */
  rows?: number | undefined;
  /**
   * @default "0"
   */
  maxrows?: number | undefined;
  /**
   * Highlight the ring color like a focus state.
   */
  highlight?: boolean | undefined;
  modelValue?: TextareaValue | undefined;
  defaultValue?: TextareaValue | undefined;
  modelModifiers?: { string?: boolean | undefined; number?: boolean | undefined; trim?: boolean | undefined; lazy?: boolean | undefined; nullify?: boolean | undefined; } | undefined;
  ui?: { root?: ClassNameValue; base?: ClassNameValue; leading?: ClassNameValue; leadingIcon?: ClassNameValue; leadingAvatar?: ClassNameValue; leadingAvatarSize?: ClassNameValue; trailing?: ClassNameValue; trailingIcon?: ClassNameValue; } | undefined;
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
  /**
   * When `true`, the loading icon will be displayed.
   */
  loading?: boolean | undefined;
  /**
   * The icon when the `loading` prop is `true`.
   */
  loadingIcon?: string | undefined;
}
```

### Slots

```ts
/**
 * Slots for the Textarea component
 */
interface TextareaSlots {
  leading(): any;
  default(): any;
  trailing(): any;
}
```

### Emits

```ts
/**
 * Emitted events for the Textarea component
 */
interface TextareaEmits {
  update:modelValue: (payload: [TextareaValue]) => void;
  blur: (payload: [FocusEvent]) => void;
  change: (payload: [Event]) => void;
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
          textareaRef
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
          HTMLTextAreaElement
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
    textarea: {
      slots: {
        root: 'relative inline-flex items-center',
        base: [
          'w-full rounded-md border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors'
        ],
        leading: 'absolute start-0 flex items-start',
        leadingIcon: 'shrink-0 text-dimmed',
        leadingAvatar: 'shrink-0',
        leadingAvatarSize: '',
        trailing: 'absolute end-0 flex items-start',
        trailingIcon: 'shrink-0 text-dimmed'
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
        size: {
          xs: {
            base: 'px-2 py-1 text-xs gap-1',
            leading: 'ps-2 inset-y-1',
            trailing: 'pe-2 inset-y-1',
            leadingIcon: 'size-4',
            leadingAvatarSize: '3xs',
            trailingIcon: 'size-4'
          },
          sm: {
            base: 'px-2.5 py-1.5 text-xs gap-1.5',
            leading: 'ps-2.5 inset-y-1.5',
            trailing: 'pe-2.5 inset-y-1.5',
            leadingIcon: 'size-4',
            leadingAvatarSize: '3xs',
            trailingIcon: 'size-4'
          },
          md: {
            base: 'px-2.5 py-1.5 text-sm gap-1.5',
            leading: 'ps-2.5 inset-y-1.5',
            trailing: 'pe-2.5 inset-y-1.5',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5'
          },
          lg: {
            base: 'px-3 py-2 text-sm gap-2',
            leading: 'ps-3 inset-y-2',
            trailing: 'pe-3 inset-y-2',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5'
          },
          xl: {
            base: 'px-3 py-2 text-base gap-2',
            leading: 'ps-3 inset-y-2',
            trailing: 'pe-3 inset-y-2',
            leadingIcon: 'size-6',
            leadingAvatarSize: 'xs',
            trailingIcon: 'size-6'
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
        leading: {
          true: ''
        },
        trailing: {
          true: ''
        },
        loading: {
          true: ''
        },
        highlight: {
          true: ''
        },
        type: {
          file: 'file:me-1.5 file:font-medium file:text-muted file:outline-none'
        },
        autoresize: {
          true: {
            base: 'resize-none'
          }
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
          leading: true,
          size: 'xs',
          class: 'ps-7'
        },
        {
          leading: true,
          size: 'sm',
          class: 'ps-8'
        },
        {
          leading: true,
          size: 'md',
          class: 'ps-9'
        },
        {
          leading: true,
          size: 'lg',
          class: 'ps-10'
        },
        {
          leading: true,
          size: 'xl',
          class: 'ps-11'
        },
        {
          trailing: true,
          size: 'xs',
          class: 'pe-7'
        },
        {
          trailing: true,
          size: 'sm',
          class: 'pe-8'
        },
        {
          trailing: true,
          size: 'md',
          class: 'pe-9'
        },
        {
          trailing: true,
          size: 'lg',
          class: 'pe-10'
        },
        {
          trailing: true,
          size: 'xl',
          class: 'pe-11'
        },
        {
          loading: true,
          leading: true,
          class: {
            leadingIcon: 'animate-spin'
          }
        },
        {
          loading: true,
          leading: false,
          trailing: true,
          class: {
            trailingIcon: 'animate-spin'
          }
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
