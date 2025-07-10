# Collapsible

> A collapsible element to toggle visibility of its content.

## Usage

Use a [Button](/components/button) or any other component in the default slot of the Collapsible.

Then, use the `#content` slot to add the content displayed when the Collapsible is open.

```vue
<template>
  <UCollapsible class="flex flex-col gap-2 w-48">
    <UButton label="Open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block />
  
    <template #content>
      <Placeholder class="h-48" />
    </template></UCollapsible>
</template>
```

### Unmount

Use the `unmount-on-hide` prop to prevent the content from being unmounted when the Collapsible is collapsed. Defaults to `true`.

```vue
<template>
  <UCollapsible :unmount-on-hide="false" class="flex flex-col gap-2 w-48">
    <UButton label="Open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block />
  
    <template #content>
      <Placeholder class="h-48" />
    </template></UCollapsible>
</template>
```

<note>

You can inspect the DOM to see the content being rendered.

</note>

### Disabled

Use the `disabled` prop to disable the Collapsible.

```vue
<template>
  <UCollapsible class="flex flex-col gap-2 w-48" disabled>
    <UButton label="Open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block />
  
    <template #content>
      <Placeholder class="h-48" />
    </template></UCollapsible>
</template>
```

## Examples

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

```vue [CollapsibleOpenExample.vue]
<script setup lang="ts">
const open = ref(true)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <UCollapsible v-model:open="open" class="flex flex-col gap-2 w-48">
    <UButton
      label="Open"
      color="neutral"
      variant="subtle"
      trailing-icon="i-lucide-chevron-down"
      block
    />

    <template #content>
      <Placeholder class="h-48" />
    </template>
  </UCollapsible>
</template>
```

<note>

In this example, leveraging [`defineShortcuts`](/composables/define-shortcuts), you can toggle the Collapsible by pressing <kbd value="O">



</kbd>

.

</note>

<tip>

This allows you to move the trigger outside of the Collapsible or remove it entirely.

</tip>

### With rotating icon

Here is an example with a rotating icon in the Button that indicates the open state of the Collapsible.

```vue [CollapsibleIconExample.vue]
<template>
  <UCollapsible class="flex flex-col gap-2 w-48">
    <UButton
      class="group"
      label="Open"
      color="neutral"
      variant="subtle"
      trailing-icon="i-lucide-chevron-down"
      :ui="{
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
      }"
      block
    />

    <template #content>
      <Placeholder class="h-48" />
    </template>
  </UCollapsible>
</template>
```

## API

### Props

```ts
/**
 * Props for the Collapsible component
 */
interface CollapsibleProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  ui?: { root?: ClassNameValue; content?: ClassNameValue; } | undefined;
  /**
   * When `true`, prevents the user from interacting with the collapsible.
   */
  disabled?: boolean | undefined;
  /**
   * The open state of the collapsible when it is initially rendered. <br> Use when you do not need to control its open state.
   */
  defaultOpen?: boolean | undefined;
  /**
   * The controlled open state of the collapsible. Can be binded with `v-model`.
   */
  open?: boolean | undefined;
  /**
   * When `true`, the element will be unmounted on closed state.
   * @default "true"
   */
  unmountOnHide?: boolean | undefined;
}
```

### Slots

```ts
/**
 * Slots for the Collapsible component
 */
interface CollapsibleSlots {
  default(): any;
  content(): any;
}
```

### Emits

```ts
/**
 * Emitted events for the Collapsible component
 */
interface CollapsibleEmits {
  update:open: (payload: [value: boolean]) => void;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    collapsible: {
      slots: {
        root: '',
        content: 'data-[state=open]:animate-[collapsible-down_200ms_ease-out] data-[state=closed]:animate-[collapsible-up_200ms_ease-out] overflow-hidden'
      }
    }
  }
})
```
