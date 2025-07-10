# Slideover

> A dialog that slides in from any side of the screen.

## Usage

Use a [Button](/components/button) or any other component in the default slot of the Slideover.

Then, use the `#content` slot to add the content displayed when the Slideover is open.

```vue
<template>
  <USlideover>
    <UButton label="Open" color="neutral" variant="subtle" />
  
    <template #content>
      <Placeholder class="h-full m-4" />
    </template></USlideover>
</template>
```

You can also use the `#header`, `#body` and `#footer` slots to customize the Slideover's content.

### Title

Use the `title` prop to set the title of the Slideover's header.

```vue
<template>
  <USlideover title="Slideover with title">
    <UButton label="Open" color="neutral" variant="subtle" />
  
    <template #body>
      <Placeholder class="h-full" />
    </template></USlideover>
</template>
```

### Description

Use the `description` prop to set the description of the Slideover's header.

```vue
<template>
  <USlideover title="Slideover with description" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
    <UButton label="Open" color="neutral" variant="subtle" />
  
    <template #body>
      <Placeholder class="h-full" />
    </template></USlideover>
</template>
```

### Close

Use the `close` prop to customize or hide the close button (with `false` value) displayed in the Slideover's header.

You can pass any property from the [Button](/components/button) component to customize it.

```vue
<template>
  <USlideover title="Slideover with close button">
    <UButton label="Open" color="neutral" variant="subtle" />
  
    <template #body>
      <Placeholder class="h-full" />
    </template></USlideover>
</template>
```

<note>

The close button is not displayed if the `#content` slot is used as it's a part of the header.

</note>

### Close Icon

Use the `close-icon` prop to customize the close button [Icon](/components/icon). Defaults to `i-lucide-x`.

```vue
<template>
  <USlideover title="Slideover with close button" close-icon="i-lucide-arrow-right">
    <UButton label="Open" color="neutral" variant="subtle" />
  
    <template #body>
      <Placeholder class="h-full" />
    </template></USlideover>
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

### Side

Use the `side` prop to set the side of the screen where the Slideover will slide in from. Defaults to `right`.

```vue
<template>
  <USlideover side="left" title="Slideover with side">
    <UButton label="Open" color="neutral" variant="subtle" />
  
    <template #body>
      <Placeholder class="h-full min-h-48" />
    </template></USlideover>
</template>
```

### Overlay

Use the `overlay` prop to control whether the Slideover has an overlay or not. Defaults to `true`.

```vue
<template>
  <USlideover :overlay="false" title="Slideover without overlay">
    <UButton label="Open" color="neutral" variant="subtle" />
  
    <template #body>
      <Placeholder class="h-full" />
    </template></USlideover>
</template>
```

### Transition

Use the `transition` prop to control whether the Slideover is animated or not. Defaults to `true`.

```vue
<template>
  <USlideover :transition="false" title="Slideover without transition">
    <UButton label="Open" color="neutral" variant="subtle" />
  
    <template #body>
      <Placeholder class="h-full" />
    </template></USlideover>
</template>
```

## Examples

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

```vue [SlideoverOpenExample.vue]
<script setup lang="ts">
const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <USlideover v-model:open="open">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #content>
      <Placeholder class="h-full m-4" />
    </template>
  </USlideover>
</template>
```

<note>

In this example, leveraging [`defineShortcuts`](/composables/define-shortcuts), you can toggle the Slideover by pressing <kbd value="O">



</kbd>

.

</note>

<tip>

This allows you to move the trigger outside of the Slideover or remove it entirely.

</tip>

### Disable dismissal

Set the `dismissible` prop to `false` to prevent the Slideover from being closed when clicking outside of it or pressing escape. A `close:prevent` event will be emitted when the user tries to close it.

```vue
<template>
  <USlideover :dismissible="false" title="Slideover non-dismissible">
    <UButton label="Open" color="neutral" variant="subtle" />
  
    <template #body>
      <Placeholder class="h-full" />
    </template></USlideover>
</template>
```

### Programmatic usage

You can use the [`useOverlay`](/composables/use-overlay) composable to open a Slideover programmatically.

<warning>

Make sure to wrap your app with the [`App`](/components/app) component which uses the [`OverlayProvider`](https://github.com/nuxt/ui/blob/v3/src/runtime/components/OverlayProvider.vue) component.

</warning>

First, create a slideover component that will be opened programmatically:

```vue [SlideoverExample.vue]
<script setup lang="ts">
defineProps<{
  count: number
}>()

const emit = defineEmits<{ close: [boolean] }>()
</script>

<template>
  <USlideover :close="{ onClick: () => emit('close', false) }" :description="`This slideover was opened programmatically ${count} times`">
    <template #body>
      <Placeholder class="h-full" />
    </template>

    <template #footer>
      <div class="flex gap-2">
        <UButton color="neutral" label="Dismiss" @click="emit('close', false)" />
        <UButton label="Success" @click="emit('close', true)" />
      </div>
    </template>
  </USlideover>
</template>
```

<note>

We are emitting a `close` event when the slideover is closed or dismissed here. You can emit any data through the `close` event, however, the event must be emitted in order to capture the return value.

</note>

Then, use it in your app:

```vue [SlideoverProgrammaticExample.vue]
<script setup lang="ts">
import { LazySlideoverExample } from '#components'

const count = ref(0)

const toast = useToast()
const overlay = useOverlay()

const slideover = overlay.create(LazySlideoverExample, {
  props: {
    count: count.value
  }
})

async function open() {
  const instance = slideover.open()

  const shouldIncrement = await instance.result

  if (shouldIncrement) {
    count.value++

    toast.add({
      title: `Success: ${shouldIncrement}`,
      color: 'success',
      id: 'slideover-success'
    })

    // Update the count
    slideover.patch({
      count: count.value
    })
    return
  }

  toast.add({
    title: `Dismissed: ${shouldIncrement}`,
    color: 'error',
    id: 'slideover-dismiss'
  })
}
</script>

<template>
  <UButton label="Open" color="neutral" variant="subtle" @click="open" />
</template>
```

<tip>

You can close the slideover within the slideover component by emitting `emit('close')`.

</tip>

### Nested slideovers

You can nest slideovers within each other.

```vue [SlideoverNestedExample.vue]
<script setup lang="ts">
const first = ref(false)
const second = ref(false)
</script>

<template>
  <USlideover v-model:open="first" title="First slideover" :ui="{ footer: 'justify-end' }">
    <UButton color="neutral" variant="subtle" label="Open" />

    <template #body>
      <Placeholder class="h-full" />
    </template>

    <template #footer>
      <UButton label="Close" color="neutral" variant="outline" @click="first = false" />

      <USlideover v-model:open="second" title="Second slideover" :ui="{ footer: 'justify-end' }">
        <UButton label="Open second" color="neutral" />

        <template #body>
          <Placeholder class="h-full" />
        </template>

        <template #footer>
          <UButton label="Close" color="neutral" variant="outline" @click="second = false" />
        </template>
      </USlideover>
    </template>
  </USlideover>
</template>
```

### With footer slot

Use the `#footer` slot to add content after the Slideover's body.

```vue [SlideoverFooterSlotExample.vue]
<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <USlideover v-model:open="open" title="Slideover with footer" description="This is useful when you want a form in a Slideover." :ui="{ footer: 'justify-end' }">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #body>
      <Placeholder class="h-full" />
    </template>

    <template #footer="{ close }">
      <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
      <UButton label="Submit" color="neutral" />
    </template>
  </USlideover>
</template>
```

## API

### Props

```ts
/**
 * Props for the Slideover component
 */
interface SlideoverProps {
  title?: string | undefined;
  description?: string | undefined;
  /**
   * The content of the slideover.
   */
  content?: (Omit<DialogContentProps, "asChild" | "as" | "forceMount"> & Partial<EmitsToProps<DialogContentImplEmits>>) | undefined;
  /**
   * Render an overlay behind the slideover.
   * @default "true"
   */
  overlay?: boolean | undefined;
  /**
   * Animate the slideover when opening or closing.
   * @default "true"
   */
  transition?: boolean | undefined;
  /**
   * The side of the slideover.
   * @default "\"right\""
   */
  side?: "top" | "bottom" | "right" | "left" | undefined;
  /**
   * Render the slideover in a portal.
   * @default "true"
   */
  portal?: string | boolean | HTMLElement | undefined;
  /**
   * Display a close button to dismiss the slideover.
   * `{ size: 'md', color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   * @default "true"
   */
  close?: boolean | Partial<ButtonProps> | undefined;
  /**
   * The icon displayed in the close button.
   */
  closeIcon?: string | undefined;
  /**
   * When `false`, the slideover will not close when clicking outside or pressing escape.
   * @default "true"
   */
  dismissible?: boolean | undefined;
  ui?: { overlay?: ClassNameValue; content?: ClassNameValue; header?: ClassNameValue; wrapper?: ClassNameValue; body?: ClassNameValue; footer?: ClassNameValue; title?: ClassNameValue; description?: ClassNameValue; close?: ClassNameValue; } | undefined;
  /**
   * The controlled open state of the dialog. Can be binded as `v-model:open`.
   */
  open?: boolean | undefined;
  /**
   * The open state of the dialog when it is initially rendered. Use when you do not need to control its open state.
   */
  defaultOpen?: boolean | undefined;
  /**
   * The modality of the dialog When set to `true`, <br>
   * interaction with outside elements will be disabled and only dialog content will be visible to screen readers.
   * @default "true"
   */
  modal?: boolean | undefined;
}
```

### Slots

```ts
/**
 * Slots for the Slideover component
 */
interface SlideoverSlots {
  default(): any;
  content(): any;
  header(): any;
  title(): any;
  description(): any;
  actions(): any;
  close(): any;
  body(): any;
  footer(): any;
}
```

### Emits

```ts
/**
 * Emitted events for the Slideover component
 */
interface SlideoverEmits {
  update:open: (payload: [value: boolean]) => void;
  after:leave: (payload: []) => void;
  after:enter: (payload: []) => void;
  close:prevent: (payload: []) => void;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    slideover: {
      slots: {
        overlay: 'fixed inset-0 bg-elevated/75',
        content: 'fixed bg-default divide-y divide-default sm:ring ring-default sm:shadow-lg flex flex-col focus:outline-none',
        header: 'flex items-center gap-1.5 p-4 sm:px-6 min-h-16',
        wrapper: '',
        body: 'flex-1 overflow-y-auto p-4 sm:p-6',
        footer: 'flex items-center gap-1.5 p-4 sm:px-6',
        title: 'text-highlighted font-semibold',
        description: 'mt-1 text-muted text-sm',
        close: 'absolute top-4 end-4'
      },
      variants: {
        side: {
          top: {
            content: 'inset-x-0 top-0 max-h-full'
          },
          right: {
            content: 'right-0 inset-y-0 w-full max-w-md'
          },
          bottom: {
            content: 'inset-x-0 bottom-0 max-h-full'
          },
          left: {
            content: 'left-0 inset-y-0 w-full max-w-md'
          }
        },
        transition: {
          true: {
            overlay: 'data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]'
          }
        }
      },
      compoundVariants: [
        {
          transition: true,
          side: 'top',
          class: {
            content: 'data-[state=open]:animate-[slide-in-from-top_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-top_200ms_ease-in-out]'
          }
        },
        {
          transition: true,
          side: 'right',
          class: {
            content: 'data-[state=open]:animate-[slide-in-from-right_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-right_200ms_ease-in-out]'
          }
        },
        {
          transition: true,
          side: 'bottom',
          class: {
            content: 'data-[state=open]:animate-[slide-in-from-bottom_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-bottom_200ms_ease-in-out]'
          }
        },
        {
          transition: true,
          side: 'left',
          class: {
            content: 'data-[state=open]:animate-[slide-in-from-left_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-left_200ms_ease-in-out]'
          }
        }
      ]
    }
  }
})
```
