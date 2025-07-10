# ColorPicker

> A component to select a color.

## Usage

Use the `v-model` directive to control the value of the ColorPicker.

```vue
<template>
  <UColorPicker model-value="#00C16A" />
</template>
```

Use the `default-value` prop to set the initial value when you do not need to control its state.

```vue
<template>
  <UColorPicker default-value="#00BCD4" />
</template>
```

### RGB Format

Use the `format` prop to set `rgb` value of the ColorPicker.

```vue
<template>
  <UColorPicker format="rgb" model-value="rgb(0, 193, 106)" />
</template>
```

### HSL Format

Use the `format` prop to set `hsl` value of the ColorPicker.

```vue
<template>
  <UColorPicker format="hsl" model-value="hsl(153, 100%, 37.8%)" />
</template>
```

### CMYK Format

Use the `format` prop to set `cmyk` value of the ColorPicker.

```vue
<template>
  <UColorPicker format="cmyk" model-value="cmyk(100%, 0%, 45.08%, 24.31%)" />
</template>
```

### CIELab Format

Use the `format` prop to set `lab` value of the ColorPicker.

```vue
<template>
  <UColorPicker format="lab" model-value="lab(68.88% -60.41% 32.55%)" />
</template>
```

### Throttle

Use the `throttle` prop to set the throttle value of the ColorPicker.

```vue
<template>
  <UColorPicker :throttle="100" model-value="#00C16A" />
</template>
```

### Size

Use the `size` prop to set the size of the ColorPicker.

```vue
<template>
  <UColorPicker size="xl" />
</template>
```

### Disabled

Use the `disabled` prop to disable the ColorPicker.

```vue
<template>
  <UColorPicker disabled />
</template>
```

## Examples

### As a Color chooser

Use a [Button](/components/button) and a [Popover](/components/popover) component to create a color chooser.

```vue [ColorPickerChooserExample.vue]
<script setup lang="ts">
const color = ref('#00C16A')

const chip = computed(() => ({ backgroundColor: color.value }))
</script>

<template>
  <UPopover>
    <UButton label="Choose color" color="neutral" variant="outline">
      <template #leading>
        <span :style="chip" class="size-3 rounded-full" />
      </template>
    </UButton>

    <template #content>
      <UColorPicker v-model="color" class="p-2" />
    </template>
  </UPopover>
</template>
```

## API

### Props

```ts
/**
 * Props for the ColorPicker component
 */
interface ColorPickerProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  /**
   * Throttle time in ms for the color picker
   * @default "50"
   */
  throttle?: number | undefined;
  /**
   * Disable the color picker
   */
  disabled?: boolean | undefined;
  /**
   * The default value of the color picker
   * @default "\"#FFFFFF\""
   */
  defaultValue?: string | undefined;
  /**
   * Format of the color
   * @default "\"hex\""
   */
  format?: "hex" | "rgb" | "hsl" | "cmyk" | "lab" | undefined;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  ui?: { root?: ClassNameValue; picker?: ClassNameValue; selector?: ClassNameValue; selectorBackground?: ClassNameValue; selectorThumb?: ClassNameValue; track?: ClassNameValue; trackThumb?: ClassNameValue; } | undefined;
  modelValue?: string | undefined;
}
```

### Emits

```ts
/**
 * Emitted events for the ColorPicker component
 */
interface ColorPickerEmits {
  update:modelValue: (payload: [value: string | undefined]) => void;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    colorPicker: {
      slots: {
        root: 'data-[disabled]:opacity-75',
        picker: 'flex gap-4',
        selector: 'rounded-md touch-none',
        selectorBackground: 'w-full h-full relative rounded-md',
        selectorThumb: '-translate-y-1/2 -translate-x-1/2 absolute size-4 ring-2 ring-(--color-white) rounded-full cursor-pointer data-[disabled]:cursor-not-allowed',
        track: 'w-[8px] relative rounded-md touch-none',
        trackThumb: 'absolute transform -translate-y-1/2 -translate-x-[4px] rtl:translate-x-[4px] size-4 rounded-full ring-2 ring-(--color-white) cursor-pointer data-[disabled]:cursor-not-allowed'
      },
      variants: {
        size: {
          xs: {
            selector: 'w-38 h-38',
            track: 'h-38'
          },
          sm: {
            selector: 'w-40 h-40',
            track: 'h-40'
          },
          md: {
            selector: 'w-42 h-42',
            track: 'h-42'
          },
          lg: {
            selector: 'w-44 h-44',
            track: 'h-44'
          },
          xl: {
            selector: 'w-46 h-46',
            track: 'h-46'
          }
        }
      },
      compoundVariants: [],
      defaultVariants: {
        size: 'md'
      }
    }
  }
})
```
