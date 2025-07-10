# Toast

> A succinct message to provide information or feedback to the user.

## Usage

Use the [useToast](/composables/use-toast) composable to display a toast in your application.

<warning>

Make sure to wrap your app with the [`App`](/components/app) component which uses our [`Toaster`](https://github.com/nuxt/ui/blob/v3/src/runtime/components/Toaster.vue) component which uses the [`ToastProvider`](https://reka-ui.com/docs/components/toast#provider) component from Reka UI.

</warning>

<tip to="/components/app#props">

You can check the `App` component `toaster` prop to see how to configure the Toaster globally.

</tip>

### Title

Pass a `title` field to the `toast.add` method to display a title.

```vue [ToastTitleExample.vue]
<script setup lang="ts">
const props = defineProps<{
  title: string
}>()

const toast = useToast()

function showToast() {
  toast.add(props)
}
</script>

<template>
  <UButton label="Show toast" color="neutral" variant="outline" @click="showToast" />
</template>
```

### Description

Pass a `description` field to the `toast.add` method to display a description.

```vue [ToastDescriptionExample.vue]
<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
}>()

const toast = useToast()

function showToast() {
  toast.add(props)
}
</script>

<template>
  <UButton label="Show toast" color="neutral" variant="outline" @click="showToast" />
</template>
```

### Icon

Pass an `icon` field to the `toast.add` method to display an [Icon](/components/icon).

```vue [ToastIconExample.vue]
<script setup lang="ts">
const props = defineProps<{
  icon: string
}>()

const toast = useToast()

function showToast() {
  toast.add({
    title: 'Uh oh! Something went wrong.',
    description: 'There was a problem with your request.',
    icon: props.icon
  })
}
</script>

<template>
  <UButton label="Show toast" color="neutral" variant="outline" @click="showToast" />
</template>
```

### Avatar

Pass an `avatar` field to the `toast.add` method to display an [Avatar](/components/avatar).

```vue [ToastAvatarExample.vue]
<script setup lang="ts">
import type { AvatarProps } from '@nuxt/ui'

const props = defineProps<{
  avatar: AvatarProps
}>()

const toast = useToast()

function showToast() {
  toast.add({
    title: 'User invited',
    description: 'benjamincanac was invited to the team.',
    avatar: props.avatar
  })
}
</script>

<template>
  <UButton label="Invite user" color="neutral" variant="outline" @click="showToast" />
</template>
```

### Color

Pass a `color` field to the `toast.add` method to change the color of the Toast.

```vue [ToastColorExample.vue]
<script setup lang="ts">
import type { ToastProps } from '@nuxt/ui'

const props = defineProps<{
  color: ToastProps['color']
}>()

const toast = useToast()

function showToast() {
  toast.add({
    title: 'Uh oh! Something went wrong.',
    description: 'There was a problem with your request.',
    icon: 'i-lucide-wifi',
    color: props.color
  })
}
</script>

<template>
  <UButton label="Show toast" color="neutral" variant="outline" @click="showToast" />
</template>
```

### Close

Pass a `close` field to customize or hide the close [Button](/components/button) (with `false` value).

```vue [ToastCloseExample.vue]
<script setup lang="ts">
const toast = useToast()

function showToast() {
  toast.add({
    title: 'Uh oh! Something went wrong.',
    description: 'There was a problem with your request.',
    icon: 'i-lucide-wifi',
    close: {
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full'
    }
  })
}
</script>

<template>
  <UButton label="Show toast" color="neutral" variant="outline" @click="showToast" />
</template>
```

### Close Icon

Pass a `closeIcon` field to customize the close button [Icon](/components/icon). Default to `i-lucide-x`.

```vue [ToastCloseIconExample.vue]
<script setup lang="ts">
const props = defineProps<{
  closeIcon: string
}>()

const toast = useToast()

function showToast() {
  toast.add({
    title: 'Uh oh! Something went wrong.',
    description: 'There was a problem with your request.',
    closeIcon: props.closeIcon
  })
}
</script>

<template>
  <UButton label="Show toast" color="neutral" variant="outline" @click="showToast" />
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

Pass an `actions` field to add some [Button](/components/button) actions to the Toast.

```vue [ToastActionsExample.vue]
<script setup lang="ts">
const toast = useToast()

const props = defineProps<{
  description: string
}>()

function showToast() {
  toast.add({
    title: 'Uh oh! Something went wrong.',
    description: props.description,
    actions: [{
      icon: 'i-lucide-refresh-cw',
      label: 'Retry',
      color: 'neutral',
      variant: 'outline',
      onClick: (e) => {
        e?.stopPropagation()
      }
    }]
  })
}
</script>

<template>
  <UButton label="Show toast" color="neutral" variant="outline" @click="showToast" />
</template>
```

### Progress <badge className="align-text-top" label="Soon"></badge>

Pass a `progress` field to customize or hide the [Progress](/components/progress) bar (with `false` value).

<tip>

The Progress bar inherits the Toast color by default, but you can override it using the `progress.color` field.

</tip>

```vue [ToastProgressExample.vue]
<script setup lang="ts">
const toast = useToast()

function showToast() {
  toast.add({
    title: 'Uh oh! Something went wrong.',
    description: 'There was a problem with your request.',
    icon: 'i-lucide-wifi',
    progress: false
  })
}
</script>

<template>
  <UButton label="Show toast" color="neutral" variant="outline" @click="showToast" />
</template>
```

### Orientation

Pass an `orientation` field to the `toast.add` method to change the orientation of the Toast.

```vue [ToastOrientationExample.vue]
<script setup lang="ts">
const toast = useToast()

const props = defineProps<{
  orientation: 'horizontal' | 'vertical'
}>()

function showToast() {
  toast.add({
    title: 'Uh oh! Something went wrong.',
    orientation: props.orientation,
    actions: [{
      icon: 'i-lucide-refresh-cw',
      label: 'Retry',
      color: 'neutral',
      variant: 'outline',
      onClick: (e) => {
        e?.stopPropagation()
      }
    }]
  })
}
</script>

<template>
  <UButton label="Show toast" color="neutral" variant="outline" @click="showToast" />
</template>
```

## Examples

### Change global position

Change the `toaster.position` prop on the [App](/components/app#props) component to change the position of the toasts.

```vue [ToastExample.vue]
<script setup lang="ts">
const toast = useToast()

function addToCalendar() {
  const eventDate = new Date(Date.now() + Math.random() * 31536000000)
  const formattedDate = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  toast.add({
    title: 'Event added to calendar',
    description: `This event is scheduled for ${formattedDate}.`,
    icon: 'i-lucide-calendar-days'
  })
}
</script>

<template>
  <UButton label="Add to calendar" color="neutral" variant="outline" icon="i-lucide-plus" @click="addToCalendar" />
</template>
```

<note to="https://github.com/nuxt/ui/blob/v3/docs/app/app.config.ts#L3">

In this example, we use the `AppConfig` to configure the `position` prop of the `Toaster` component globally.

</note>

### Change global duration

Change the `toaster.duration` prop on the [App](/components/app#props) component to change the duration of the toasts.

```vue [ToastExample.vue]
<script setup lang="ts">
const toast = useToast()

function addToCalendar() {
  const eventDate = new Date(Date.now() + Math.random() * 31536000000)
  const formattedDate = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  toast.add({
    title: 'Event added to calendar',
    description: `This event is scheduled for ${formattedDate}.`,
    icon: 'i-lucide-calendar-days'
  })
}
</script>

<template>
  <UButton label="Add to calendar" color="neutral" variant="outline" icon="i-lucide-plus" @click="addToCalendar" />
</template>
```

<note to="https://github.com/nuxt/ui/blob/v3/docs/app/app.config.ts#L5">

In this example, we use the `AppConfig` to configure the `duration` prop of the `Toaster` component globally.

</note>

### Stacked toasts

Set the `toaster.expand` prop to `false` on the [App](/components/app#props) component to display stacked toasts.

<tip>

You can hover over the toasts to expand them. This will also pause the timer of the toasts.

</tip>

```vue [ToastExample.vue]
<script setup lang="ts">
const toast = useToast()

function addToCalendar() {
  const eventDate = new Date(Date.now() + Math.random() * 31536000000)
  const formattedDate = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  toast.add({
    title: 'Event added to calendar',
    description: `This event is scheduled for ${formattedDate}.`,
    icon: 'i-lucide-calendar-days'
  })
}
</script>

<template>
  <UButton label="Add to calendar" color="neutral" variant="outline" icon="i-lucide-plus" @click="addToCalendar" />
</template>
```

<note to="https://github.com/nuxt/ui/blob/v3/docs/app/app.config.ts#L4">

In this example, we use the `AppConfig` to configure the `expand` prop of the `Toaster` component globally.

</note>

## API

### Props

```ts
/**
 * Props for the Toast component
 */
interface ToastProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  title?: StringOrVNode | undefined;
  description?: StringOrVNode | undefined;
  icon?: string | undefined;
  avatar?: AvatarProps | undefined;
  color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined;
  /**
   * The orientation between the content and the actions.
   * @default "\"vertical\""
   */
  orientation?: "horizontal" | "vertical" | undefined;
  /**
   * Display a close button to dismiss the toast.
   * `{ size: 'md', color: 'neutral', variant: 'link' }`{lang="ts-type"}
   * @default "true"
   */
  close?: boolean | Partial<ButtonProps> | undefined;
  /**
   * The icon displayed in the close button.
   */
  closeIcon?: string | undefined;
  /**
   * Display a list of actions:
   * - under the title and description when orientation is `vertical`
   * - next to the close button when orientation is `horizontal`
   * `{ size: 'xs' }`{lang="ts-type"}
   */
  actions?: ButtonProps[] | undefined;
  /**
   * Display a progress bar showing the toast's remaining duration.
   * `{ size: 'sm' }`{lang="ts-type"}
   * @default "true"
   */
  progress?: boolean | Pick<ProgressProps, "color"> | undefined;
  ui?: { root?: ClassNameValue; wrapper?: ClassNameValue; title?: ClassNameValue; description?: ClassNameValue; icon?: ClassNameValue; avatar?: ClassNameValue; avatarSize?: ClassNameValue; actions?: ClassNameValue; progress?: ClassNameValue; close?: ClassNameValue; } | undefined;
  /**
   * The open state of the dialog when it is initially rendered. Use when you do not need to control its open state.
   */
  defaultOpen?: boolean | undefined;
  /**
   * The controlled open state of the dialog. Can be bind as `v-model:open`.
   */
  open?: boolean | undefined;
  /**
   * Control the sensitivity of the toast for accessibility purposes.
   * 
   * For toasts that are the result of a user action, choose `foreground`. Toasts generated from background tasks should use `background`.
   */
  type?: "foreground" | "background" | undefined;
  /**
   * Time in milliseconds that toast should remain visible for. Overrides value
   * given to `ToastProvider`.
   */
  duration?: number | undefined;
}
```

### Slots

```ts
/**
 * Slots for the Toast component
 */
interface ToastSlots {
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
 * Emitted events for the Toast component
 */
interface ToastEmits {
  pause: (payload: []) => void;
  escapeKeyDown: (payload: [event: KeyboardEvent]) => void;
  resume: (payload: []) => void;
  swipeStart: (payload: [event: SwipeEvent]) => void;
  swipeMove: (payload: [event: SwipeEvent]) => void;
  swipeCancel: (payload: [event: SwipeEvent]) => void;
  swipeEnd: (payload: [event: SwipeEvent]) => void;
  update:open: (payload: [value: boolean]) => void;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    toast: {
      slots: {
        root: 'relative group overflow-hidden bg-default shadow-lg rounded-lg ring ring-default p-4 flex gap-2.5 focus:outline-none',
        wrapper: 'w-0 flex-1 flex flex-col',
        title: 'text-sm font-medium text-highlighted',
        description: 'text-sm text-muted',
        icon: 'shrink-0 size-5',
        avatar: 'shrink-0',
        avatarSize: '2xl',
        actions: 'flex gap-1.5 shrink-0',
        progress: 'absolute inset-x-0 bottom-0',
        close: 'p-0'
      },
      variants: {
        color: {
          primary: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
            icon: 'text-primary'
          },
          secondary: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary',
            icon: 'text-secondary'
          },
          success: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success',
            icon: 'text-success'
          },
          info: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info',
            icon: 'text-info'
          },
          warning: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning',
            icon: 'text-warning'
          },
          error: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error',
            icon: 'text-error'
          },
          neutral: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted',
            icon: 'text-highlighted'
          }
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
      defaultVariants: {
        color: 'primary'
      }
    }
  }
})
```
