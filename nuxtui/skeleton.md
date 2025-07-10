# Skeleton

> A placeholder to show while content is loading.

## Usage

```vue [SkeletonExample.vue]
<template>
  <div class="flex items-center gap-4">
    <USkeleton class="h-12 w-12 rounded-full" />

    <div class="grid gap-2">
      <USkeleton class="h-4 w-[250px]" />
      <USkeleton class="h-4 w-[200px]" />
    </div>
  </div>
</template>
```

## API

### Props

```ts
/**
 * Props for the Skeleton component
 */
interface SkeletonProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
}
```

### Slots

```ts
/**
 * Slots for the Skeleton component
 */
interface SkeletonSlots {
  default(): any;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    skeleton: {
      base: 'animate-pulse rounded-md bg-elevated'
    }
  }
})
```
