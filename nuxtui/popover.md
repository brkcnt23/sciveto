# Popover

> A non-modal dialog that floats around a trigger element.

## Usage

Use a [Button](/components/button) or any other component in the default slot of the Popover.

Then, use the `#content` slot to add the content displayed when the Popover is open.

```vue
<template>
  <UPopover>
    <UButton label="Open" color="neutral" variant="subtle" />
  
    <template #content>
      <Placeholder class="size-48 m-4 inline-flex" />
    </template></UPopover>
</template>
```

### Mode

Use the `mode` prop to change the mode of the Popover. Defaults to `click`.

```vue
<template>
  <UPopover mode="hover">
    <UButton label="Open" color="neutral" variant="subtle" />
  
    <template #content>
      <Placeholder class="size-48 m-4 inline-flex" />
    </template></UPopover>
</template>
```

<note>

When using the `hover` mode, the Reka UI [`HoverCard`](https://reka-ui.com/docs/components/hover-card) component is used instead of the [`Popover`](https://reka-ui.com/docs/components/popover).

</note>

### Delay

When using the `hover` mode, you can use the `open-delay` and `close-delay` props to control the delay before the Popover is opened or closed.

```vue
<template>
  <UPopover mode="hover" :open-delay="500" :close-delay="300">
    <UButton label="Open" color="neutral" variant="subtle" />
  
    <template #content>
      <Placeholder class="size-48 m-4 inline-flex" />
    </template></UPopover>
</template>
```

### Content

Use the `content` prop to control how the Popover content is rendered, like its `align` or `side` for example.

```vue
<template>
  <UPopover>
    <UButton label="Open" color="neutral" variant="subtle" />
  
    <template #content>
      <Placeholder class="size-48 m-4 inline-flex" />
    </template></UPopover>
</template>
```

### Arrow

Use the `arrow` prop to display an arrow on the Popover.

```vue
<template>
  <UPopover arrow>
    <UButton label="Open" color="neutral" variant="subtle" />
  
    <template #content>
      <Placeholder class="size-48 m-4 inline-flex" />
    </template></UPopover>
</template>
```

## Examples

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

```vue [PopoverOpenExample.vue]
<script setup lang="ts">
const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <UPopover v-model:open="open">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #content>
      <Placeholder class="size-48 m-4 inline-flex" />
    </template>
  </UPopover>
</template>
```

<note>

In this example, leveraging [`defineShortcuts`](/composables/define-shortcuts), you can toggle the Popover by pressing <kbd value="O">



</kbd>

.

</note>

### Disable dismissal

Set the `dismissible` prop to `false` to prevent the Popover from being closed when clicking outside of it or pressing escape. A `close:prevent` event will be emitted when the user tries to close it.

```vue [PopoverDismissibleExample.vue]
<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <UPopover v-model:open="open" :dismissible="false" :ui="{ content: 'p-4' }">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #content>
      <div class="flex items-center gap-4 mb-4">
        <h2 class="text-highlighted font-semibold">
          Popover non-dismissible
        </h2>

        <UButton color="neutral" variant="ghost" icon="i-lucide-x" @click="open = false" />
      </div>

      <Placeholder class="size-full min-h-48" />
    </template>
  </UPopover>
</template>
```

### With command palette

You can use a [CommandPalette](/components/command-palette) component inside the Popover's content.

```vue [PopoverCommandPaletteExample.vue]
<script setup lang="ts">
const items = ref([
  {
    label: 'bug',
    value: 'bug',
    chip: {
      color: 'error' as const
    }
  },
  {
    label: 'feature',
    value: 'feature',
    chip: {
      color: 'success' as const
    }
  },
  {
    label: 'enhancement',
    value: 'enhancement',
    chip: {
      color: 'info' as const
    }
  }
])
const label = ref([])
</script>

<template>
  <UPopover :content="{ side: 'right', align: 'start' }">
    <UButton
      icon="i-lucide-tag"
      label="Select labels"
      color="neutral"
      variant="subtle"
    />

    <template #content>
      <UCommandPalette
        v-model="label"
        multiple
        placeholder="Search labels..."
        :groups="[{ id: 'labels', items }]"
        :ui="{ input: '[&>input]:h-8 [&>input]:text-sm' }"
      />
    </template>
  </UPopover>
</template>
```

### With following cursor <badge className="align-text-top" label="Soon"></badge>

You can make the Popover follow the cursor when hovering over an element using the [`reference`](https://reka-ui.com/docs/components/tooltip#trigger) prop:

```vue [PopoverCursorExample.vue]
<script setup lang="ts">
const open = ref(false)
const anchor = ref({ x: 0, y: 0 })

const reference = computed(() => ({
  getBoundingClientRect: () =>
    ({
      width: 0,
      height: 0,
      left: anchor.value.x,
      right: anchor.value.x,
      top: anchor.value.y,
      bottom: anchor.value.y,
      ...anchor.value
    } as DOMRect)
}))
</script>

<template>
  <UPopover
    :open="open"
    :reference="reference"
    :content="{ side: 'top', sideOffset: 16, updatePositionStrategy: 'always' }"
  >
    <div
      class="flex items-center justify-center rounded-md border border-dashed border-accented text-sm aspect-video w-72"
      @pointerenter="open = true"
      @pointerleave="open = false"
      @pointermove="(ev) => {
        anchor.x = ev.clientX
        anchor.y = ev.clientY
      }"
    >
      Hover me
    </div>

    <template #content>
      <div class="p-4">
        {{ anchor.x.toFixed(0) }} - {{ anchor.y.toFixed(0) }}
      </div>
    </template>
  </UPopover>
</template>
```

### With anchor slot

You can use the `#anchor` slot to position the Popover against a custom element.

<warning>

This slot only works when `mode` is `click`.

</warning>

```vue [PopoverAnchorSlotExample.vue]
<script lang="ts" setup>
const open = ref(false)
</script>

<template>
  <UPopover
    v-model:open="open"
    :dismissible="false"
    :ui="{ content: 'w-(--reka-popper-anchor-width) p-4' }"
  >
    <template #anchor>
      <UInput placeholder="Focus to open" @focus="open = true" @blur="open = false" />
    </template>

    <template #content>
      <Placeholder class="w-full aspect-square" />
    </template>
  </UPopover>
</template>
```

## API

### Props

```ts
/**
 * Props for the Popover component
 */
interface PopoverProps {
  /**
   * The display mode of the popover.
   * @default "\"click\""
   */
  mode?: "click" | "hover" | undefined;
  /**
   * The content of the popover.
   */
  content?: (Omit<PopoverContentProps, "as" | "asChild" | "forceMount"> & Partial<EmitsToProps<PopoverContentImplEmits>>) | undefined;
  /**
   * Display an arrow alongside the popover.
   */
  arrow?: boolean | Omit<PopoverArrowProps, "as" | "asChild"> | undefined;
  /**
   * Render the popover in a portal.
   * @default "true"
   */
  portal?: string | boolean | HTMLElement | undefined;
  /**
   * The reference (or anchor) element that is being referred to for positioning.
   * 
   * If not provided will use the current component as anchor.
   */
  reference?: ReferenceElement | undefined;
  /**
   * When `false`, the popover will not close when clicking outside or pressing escape.
   * @default "true"
   */
  dismissible?: boolean | undefined;
  ui?: { content?: ClassNameValue; arrow?: ClassNameValue; } | undefined;
  /**
   * The open state of the popover when it is initially rendered. Use when you do not need to control its open state.
   */
  defaultOpen?: boolean | undefined;
  /**
   * The controlled open state of the popover.
   */
  open?: boolean | undefined;
  /**
   * The modality of the popover. When set to true, interaction with outside elements will be disabled and only popover content will be visible to screen readers.
   */
  modal?: boolean | undefined;
  /**
   * The duration from when the mouse enters the trigger until the hover card opens.
   * @default "0"
   */
  openDelay?: number | undefined;
  /**
   * The duration from when the mouse leaves the trigger or content until the hover card closes.
   * @default "0"
   */
  closeDelay?: number | undefined;
}
```

### Slots

```ts
/**
 * Slots for the Popover component
 */
interface PopoverSlots {
  default(): any;
  content(): any;
  anchor(): any;
}
```

### Emits

```ts
/**
 * Emitted events for the Popover component
 */
interface PopoverEmits {
  close:prevent: (payload: []) => void;
  update:open: (payload: [value: boolean]) => void;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    popover: {
      slots: {
        content: 'bg-default shadow-lg rounded-md ring ring-default data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-popover-content-transform-origin) focus:outline-none pointer-events-auto',
        arrow: 'fill-default'
      }
    }
  }
})
```
