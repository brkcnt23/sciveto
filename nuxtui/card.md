# Card

> Display content in a card with a header, body and footer.

## Usage

```vue [CardExample.vue]
<template>
  <UCard>
    <template #header>
      <Placeholder class="h-8" />
    </template>

    <Placeholder class="h-32" />

    <template #footer>
      <Placeholder class="h-8" />
    </template>
  </UCard>
</template>
```

### Variant

Use the `variant` prop to change the variant of the Card.

```vue
<template>
  <UCard variant="subtle">
    <Placeholder class="h-32" />
  
    <template #header>
      <Placeholder class="h-8" />
    </template>
    <template #footer>
      <Placeholder class="h-8" />
    </template></UCard>
</template>
```

## API

### Props

```ts
/**
 * Props for the Card component
 */
interface CardProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  variant?: "solid" | "outline" | "soft" | "subtle" | undefined;
  ui?: { root?: ClassNameValue; header?: ClassNameValue; body?: ClassNameValue; footer?: ClassNameValue; } | undefined;
}
```

### Slots

```ts
/**
 * Slots for the Card component
 */
interface CardSlots {
  header(): any;
  default(): any;
  footer(): any;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    card: {
      slots: {
        root: 'rounded-lg overflow-hidden',
        header: 'p-4 sm:px-6',
        body: 'p-4 sm:p-6',
        footer: 'p-4 sm:px-6'
      },
      variants: {
        variant: {
          solid: {
            root: 'bg-inverted text-inverted'
          },
          outline: {
            root: 'bg-default ring ring-default divide-y divide-default'
          },
          soft: {
            root: 'bg-elevated/50 divide-y divide-default'
          },
          subtle: {
            root: 'bg-elevated/50 ring ring-default divide-y divide-default'
          }
        }
      },
      defaultVariants: {
        variant: 'outline'
      }
    }
  }
})
```
