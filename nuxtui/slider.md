# Slider

> An input to select a numeric value within a range.

## Usage

Use the `v-model` directive to control the value of the Slider.

```vue
<template>
  <USlider :model-value="50" />
</template>
```

Use the `default-value` prop to set the initial value when you do not need to control its state.

```vue
<template>
  <USlider :default-value="50" />
</template>
```

### Min / Max

Use the `min` and `max` props to set the minimum and maximum values of the Slider. Defaults to `0` and `100`.

```vue
<template>
  <USlider :min="0" :max="50" :default-value="50" />
</template>
```

### Step

Use the `step` prop to set the increment value of the Slider. Defaults to `1`.

```vue
<template>
  <USlider :step="10" :default-value="50" />
</template>
```

### Multiple

Use the `v-model` directive or the `default-value` prop with an array of values to create a range Slider.

```vue
<template>
  <USlider />
</template>
```

Use the `min-steps-between-thumbs` prop to limit the minimum distance between the thumbs.

```vue
<template>
  <USlider :min-steps-between-thumbs="10" />
</template>
```

### Orientation

Use the `orientation` prop to change the orientation of the Slider. Defaults to `horizontal`.

```vue
<template>
  <USlider orientation="vertical" :default-value="50" class="h-48" />
</template>
```

### Color

Use the `color` prop to change the color of the Slider.

```vue
<template>
  <USlider color="neutral" :default-value="50" />
</template>
```

### Size

Use the `size` prop to change the size of the Slider.

```vue
<template>
  <USlider size="xl" :default-value="50" />
</template>
```

### Tooltip

Use the `tooltip` prop to display a [Tooltip](/components/tooltip) around the Slider thumbs with the current value. You can set it to `true` for default behavior or pass an object to customize it with any property from the [Tooltip](/components/tooltip#props) component.

```vue
<template>
  <USlider :default-value="50" tooltip />
</template>
```

### Disabled

Use the `disabled` prop to disable the Slider.

```vue
<template>
  <USlider disabled :default-value="50" />
</template>
```

### Inverted

Use the `inverted` prop to visually invert the Slider.

```vue
<template>
  <USlider inverted :default-value="25" />
</template>
```

## API

### Props

```ts
/**
 * Props for the Slider component
 */
interface SliderProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined;
  /**
   * The orientation of the slider.
   * @default "\"horizontal\""
   */
  orientation?: DataOrientation | undefined;
  /**
   * Display a tooltip around the slider thumbs with the current value.
   * `{ disableClosingTrigger: true }`{lang="ts-type"}
   */
  tooltip?: boolean | TooltipProps | undefined;
  /**
   * The value of the slider when initially rendered. Use when you do not need to control the state of the slider.
   */
  defaultValue?: number | number[] | undefined;
  ui?: { root?: ClassNameValue; track?: ClassNameValue; range?: ClassNameValue; thumb?: ClassNameValue; } | undefined;
  /**
   * The name of the field. Submitted with its owning form as part of a name/value pair.
   */
  name?: string | undefined;
  /**
   * When `true`, prevents the user from interacting with the slider.
   */
  disabled?: boolean | undefined;
  /**
   * Whether the slider is visually inverted.
   */
  inverted?: boolean | undefined;
  /**
   * The minimum value for the range.
   * @default "0"
   */
  min?: number | undefined;
  /**
   * The maximum value for the range.
   * @default "100"
   */
  max?: number | undefined;
  /**
   * The stepping interval.
   * @default "1"
   */
  step?: number | undefined;
  /**
   * The minimum permitted steps between multiple thumbs.
   */
  minStepsBetweenThumbs?: number | undefined;
  modelValue?: number | number[] | undefined;
}
```

### Emits

```ts
/**
 * Emitted events for the Slider component
 */
interface SliderEmits {
  update:modelValue: (payload: [number | number[]]) => void;
  change: (payload: [Event]) => void;
  update:modelValue: (payload: [value: number | number[] | undefined]) => void;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    slider: {
      slots: {
        root: 'relative flex items-center select-none touch-none',
        track: 'relative bg-accented overflow-hidden rounded-full grow',
        range: 'absolute rounded-full',
        thumb: 'rounded-full bg-default ring-2 focus-visible:outline-2 focus-visible:outline-offset-2'
      },
      variants: {
        color: {
          primary: {
            range: 'bg-primary',
            thumb: 'ring-primary focus-visible:outline-primary/50'
          },
          secondary: {
            range: 'bg-secondary',
            thumb: 'ring-secondary focus-visible:outline-secondary/50'
          },
          success: {
            range: 'bg-success',
            thumb: 'ring-success focus-visible:outline-success/50'
          },
          info: {
            range: 'bg-info',
            thumb: 'ring-info focus-visible:outline-info/50'
          },
          warning: {
            range: 'bg-warning',
            thumb: 'ring-warning focus-visible:outline-warning/50'
          },
          error: {
            range: 'bg-error',
            thumb: 'ring-error focus-visible:outline-error/50'
          },
          neutral: {
            range: 'bg-inverted',
            thumb: 'ring-inverted focus-visible:outline-inverted/50'
          }
        },
        size: {
          xs: {
            thumb: 'size-3'
          },
          sm: {
            thumb: 'size-3.5'
          },
          md: {
            thumb: 'size-4'
          },
          lg: {
            thumb: 'size-4.5'
          },
          xl: {
            thumb: 'size-5'
          }
        },
        orientation: {
          horizontal: {
            root: 'w-full',
            range: 'h-full'
          },
          vertical: {
            root: 'flex-col h-full',
            range: 'w-full'
          }
        },
        disabled: {
          true: {
            root: 'opacity-75 cursor-not-allowed'
          }
        }
      },
      compoundVariants: [
        {
          orientation: 'horizontal',
          size: 'xs',
          class: {
            track: 'h-[6px]'
          }
        },
        {
          orientation: 'horizontal',
          size: 'sm',
          class: {
            track: 'h-[7px]'
          }
        },
        {
          orientation: 'horizontal',
          size: 'md',
          class: {
            track: 'h-[8px]'
          }
        },
        {
          orientation: 'horizontal',
          size: 'lg',
          class: {
            track: 'h-[9px]'
          }
        },
        {
          orientation: 'horizontal',
          size: 'xl',
          class: {
            track: 'h-[10px]'
          }
        },
        {
          orientation: 'vertical',
          size: 'xs',
          class: {
            track: 'w-[6px]'
          }
        },
        {
          orientation: 'vertical',
          size: 'sm',
          class: {
            track: 'w-[7px]'
          }
        },
        {
          orientation: 'vertical',
          size: 'md',
          class: {
            track: 'w-[8px]'
          }
        },
        {
          orientation: 'vertical',
          size: 'lg',
          class: {
            track: 'w-[9px]'
          }
        },
        {
          orientation: 'vertical',
          size: 'xl',
          class: {
            track: 'w-[10px]'
          }
        }
      ],
      defaultVariants: {
        size: 'md',
        color: 'primary'
      }
    }
  }
})
```
