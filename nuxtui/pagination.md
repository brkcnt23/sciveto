# Pagination

> A list of buttons or links to navigate through pages.

## Usage

Use the `default-page` prop or the `v-model:page` directive to control the current page.

<note>

The Pagination component uses some [`Button`](/components/button) to display the pages, use [`color`](#color), [`variant`](#variant) and [`size`](#size) props to style them.

</note>

### Total

Use the `total` prop to set the total number of items in the list.

```vue
<template>
  <UPagination :page="5" :total="100" />
</template>
```

### Items Per Page

Use the `items-per-page` prop to set the number of items per page. Defaults to `10`.

```vue
<template>
  <UPagination :page="5" :items-per-page="20" :total="100" />
</template>
```

### Sibling Count

Use the `sibling-count` prop to set the number of siblings to show. Defaults to `2`.

```vue
<template>
  <UPagination :page="5" :sibling-count="1" :total="100" />
</template>
```

### Show Edges

Use the `show-edges` prop to always show the ellipsis, first and last pages. Defaults to `false`.

```vue
<template>
  <UPagination :page="5" show-edges :sibling-count="1" :total="100" />
</template>
```

### Show Controls

Use the `show-controls` prop to show the first, prev, next and last buttons. Defaults to `true`.

```vue
<template>
  <UPagination :page="5" :show-controls="false" show-edges :total="100" />
</template>
```

### Color

Use the `color` prop to set the color of the inactive controls. Defaults to `neutral`.

```vue
<template>
  <UPagination :page="5" color="primary" :total="100" />
</template>
```

### Variant

Use the `variant` prop to set the variant of the inactive controls. Defaults to `outline`.

```vue
<template>
  <UPagination :page="5" color="neutral" variant="subtle" :total="100" />
</template>
```

### Active Color

Use the `active-color` prop to set the color of the active control. Defaults to `primary`.

```vue
<template>
  <UPagination :page="5" active-color="neutral" :total="100" />
</template>
```

### Active Variant

Use the `active-variant` prop to set the variant of the active control. Defaults to `solid`.

```vue
<template>
  <UPagination :page="5" active-color="primary" active-variant="subtle" :total="100" />
</template>
```

### Size

Use the `size` prop to set the size of the controls. Defaults to `md`.

```vue
<template>
  <UPagination :page="5" size="xl" :total="100" />
</template>
```

### Disabled

Use the `disabled` prop to disable the pagination controls.

```vue
<template>
  <UPagination :page="5" :total="100" disabled />
</template>
```

## Examples

### With links

Use the `to` prop to transform buttons into links. Pass a function that receives the page number and returns a route destination.

```vue [PaginationLinksExample.vue]
<script setup lang="ts">
const page = ref(5)

function to(page: number) {
  return {
    query: {
      page
    },
    hash: '#with-links'
  }
}
</script>

<template>
  <UPagination v-model:page="page" :total="100" :to="to" :sibling-count="1" show-edges />
</template>
```

<note>

In this example we're adding the `#with-links` hash to avoid going to the top of the page.

</note>

## API

### Props

```ts
/**
 * Props for the Pagination component
 */
interface PaginationProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  /**
   * The icon to use for the first page control.
   */
  firstIcon?: string | undefined;
  /**
   * The icon to use for the previous page control.
   */
  prevIcon?: string | undefined;
  /**
   * The icon to use for the next page control.
   */
  nextIcon?: string | undefined;
  /**
   * The icon to use for the last page control.
   */
  lastIcon?: string | undefined;
  /**
   * The icon to use for the ellipsis control.
   */
  ellipsisIcon?: string | undefined;
  /**
   * The color of the pagination controls.
   * @default "\"neutral\""
   */
  color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined;
  /**
   * The variant of the pagination controls.
   * @default "\"outline\""
   */
  variant?: "link" | "solid" | "outline" | "soft" | "subtle" | "ghost" | undefined;
  /**
   * The color of the active pagination control.
   * @default "\"primary\""
   */
  activeColor?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined;
  /**
   * The variant of the active pagination control.
   * @default "\"solid\""
   */
  activeVariant?: "link" | "solid" | "outline" | "soft" | "subtle" | "ghost" | undefined;
  /**
   * Whether to show the first, previous, next, and last controls.
   * @default "true"
   */
  showControls?: boolean | undefined;
  size?: "sm" | "md" | "xs" | "lg" | "xl" | undefined;
  /**
   * A function to render page controls as links.
   */
  to?: ((page: number) => string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric | undefined) | undefined;
  ui?: { root?: ClassNameValue; list?: ClassNameValue; ellipsis?: ClassNameValue; label?: ClassNameValue; first?: ClassNameValue; prev?: ClassNameValue; item?: ClassNameValue; next?: ClassNameValue; last?: ClassNameValue; } | undefined;
  /**
   * When `true`, prevents the user from interacting with item
   */
  disabled?: boolean | undefined;
  /**
   * The controlled value of the current page. Can be binded as `v-model:page`.
   */
  page?: number | undefined;
  /**
   * The value of the page that should be active when initially rendered.
   * 
   * Use when you do not need to control the value state.
   */
  defaultPage?: number | undefined;
  /**
   * Number of items per page
   * @default "10"
   */
  itemsPerPage?: number | undefined;
  /**
   * When `true`, always show first page, last page, and ellipsis
   * @default "false"
   */
  showEdges?: boolean | undefined;
  /**
   * Number of sibling should be shown around the current page
   * @default "2"
   */
  siblingCount?: number | undefined;
  /**
   * Number of items in your list
   * @default "0"
   */
  total?: number | undefined;
}
```

### Slots

```ts
/**
 * Slots for the Pagination component
 */
interface PaginationSlots {
  first(): any;
  prev(): any;
  next(): any;
  last(): any;
  ellipsis(): any;
  item(): any;
}
```

### Emits

```ts
/**
 * Emitted events for the Pagination component
 */
interface PaginationEmits {
  update:page: (payload: [value: number]) => void;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    pagination: {
      slots: {
        root: '',
        list: 'flex items-center gap-1',
        ellipsis: 'pointer-events-none',
        label: 'min-w-5 text-center',
        first: '',
        prev: '',
        item: '',
        next: '',
        last: ''
      }
    }
  }
})
```
