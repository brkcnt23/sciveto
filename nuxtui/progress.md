# Progress

> An indicator showing the progress of a task.

## Usage

Use the `v-model` directive to control the value of the Progress.

```vue
<template>
  <UProgress :model-value="50" />
</template>
```

### Max

Use the `max` prop to set the maximum value of the Progress.

```vue
<template>
  <UProgress :model-value="3" :max="4" />
</template>
```

Use the `max` prop with an array of strings to display the active step under the bar, the maximum value of the Progress is the length of the array.

```vue
<template>
  <UProgress :model-value="3" />
</template>
```

### Status

Use the `status` prop to display the current Progress value above the bar.

```vue
<template>
  <UProgress :model-value="50" status />
</template>
```

### Indeterminate

When no `v-model` is set or the value is `null`, the Progress becomes *indeterminate*. The progress bar is animated as a `carousel`, but you can change it using the [`animation`](#animation) prop.

```vue
<template>
  <UProgress />
</template>
```

### Animation

Use the `animation` prop to change the animation of the Progress to an inverse carousel, a swinging bar or an elastic bar. Defaults to `carousel`.

```vue
<template>
  <UProgress animation="swing" />
</template>
```

### Orientation

Use the `orientation` prop to change the orientation of the Progress. Defaults to `horizontal`.

```vue
<template>
  <UProgress orientation="vertical" class="h-48" />
</template>
```

### Color

Use the `color` prop to change the color of the Slider.

```vue
<template>
  <UProgress color="neutral" />
</template>
```

### Size

Use the `size` prop to change the size of the Slider.

```vue
<template>
  <UProgress size="xl" />
</template>
```

### Inverted

Use the `inverted` prop to visually invert the Progress.

```vue
<template>
  <UProgress inverted :model-value="25" />
</template>
```

## API

### Props

```ts
/**
 * Props for the Progress component
 */
interface ProgressProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  /**
   * The maximum progress value.
   */
  max?: number | any[] | undefined;
  /**
   * Display the current progress value.
   */
  status?: boolean | undefined;
  /**
   * Whether the progress is visually inverted.
   * @default "false"
   */
  inverted?: boolean | undefined;
  size?: "md" | "xs" | "sm" | "lg" | "xl" | "2xs" | "2xl" | undefined;
  color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined;
  /**
   * The orientation of the progress bar.
   * @default "\"horizontal\""
   */
  orientation?: "horizontal" | "vertical" | undefined;
  /**
   * The animation of the progress bar.
   */
  animation?: "carousel" | "carousel-inverse" | "swing" | "elastic" | undefined;
  ui?: { root?: ClassNameValue; base?: ClassNameValue; indicator?: ClassNameValue; status?: ClassNameValue; steps?: ClassNameValue; step?: ClassNameValue; } | undefined;
  /**
   * The progress value. Can be bind as `v-model`.
   * @default "null"
   */
  modelValue?: number | null | undefined;
  /**
   * A function to get the accessible label text in a human-readable format.
   * 
   *  If not provided, the value label will be read as the numeric value as a percentage of the max value.
   */
  getValueLabel?: ((value: number | null | undefined, max: number) => string | undefined) | undefined;
  /**
   * A function to get the accessible value text representing the current value in a human-readable format.
   */
  getValueText?: ((value: number | null | undefined, max: number) => string | undefined) | undefined;
}
```

### Slots

```ts
/**
 * Slots for the Progress component
 */
interface ProgressSlots {
  status(): any;
}
```

### Emits

```ts
/**
 * Emitted events for the Progress component
 */
interface ProgressEmits {
  update:modelValue: (payload: [value: string[] | undefined]) => void;
  update:max: (payload: [value: number]) => void;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    progress: {
      slots: {
        root: 'gap-2',
        base: 'relative overflow-hidden rounded-full bg-accented',
        indicator: 'rounded-full size-full transition-transform duration-200 ease-out',
        status: 'flex justify-end text-dimmed transition-[width] duration-200',
        steps: 'grid items-end',
        step: 'truncate text-end row-start-1 col-start-1 transition-opacity'
      },
      variants: {
        animation: {
          carousel: '',
          'carousel-inverse': '',
          swing: '',
          elastic: ''
        },
        color: {
          primary: {
            indicator: 'bg-primary',
            steps: 'text-primary'
          },
          secondary: {
            indicator: 'bg-secondary',
            steps: 'text-secondary'
          },
          success: {
            indicator: 'bg-success',
            steps: 'text-success'
          },
          info: {
            indicator: 'bg-info',
            steps: 'text-info'
          },
          warning: {
            indicator: 'bg-warning',
            steps: 'text-warning'
          },
          error: {
            indicator: 'bg-error',
            steps: 'text-error'
          },
          neutral: {
            indicator: 'bg-inverted',
            steps: 'text-inverted'
          }
        },
        size: {
          '2xs': {
            status: 'text-xs',
            steps: 'text-xs'
          },
          xs: {
            status: 'text-xs',
            steps: 'text-xs'
          },
          sm: {
            status: 'text-sm',
            steps: 'text-sm'
          },
          md: {
            status: 'text-sm',
            steps: 'text-sm'
          },
          lg: {
            status: 'text-sm',
            steps: 'text-sm'
          },
          xl: {
            status: 'text-base',
            steps: 'text-base'
          },
          '2xl': {
            status: 'text-base',
            steps: 'text-base'
          }
        },
        step: {
          active: {
            step: 'opacity-100'
          },
          first: {
            step: 'opacity-100 text-muted'
          },
          other: {
            step: 'opacity-0'
          },
          last: {
            step: ''
          }
        },
        orientation: {
          horizontal: {
            root: 'w-full flex flex-col',
            base: 'w-full',
            status: 'flex-row'
          },
          vertical: {
            root: 'h-full flex flex-row-reverse',
            base: 'h-full',
            status: 'flex-col'
          }
        },
        inverted: {
          true: {
            status: 'self-end'
          }
        }
      },
      compoundVariants: [
        {
          inverted: true,
          orientation: 'horizontal',
          class: {
            step: 'text-start',
            status: 'flex-row-reverse'
          }
        },
        {
          inverted: true,
          orientation: 'vertical',
          class: {
            steps: 'items-start',
            status: 'flex-col-reverse'
          }
        },
        {
          orientation: 'horizontal',
          size: '2xs',
          class: 'h-px'
        },
        {
          orientation: 'horizontal',
          size: 'xs',
          class: 'h-0.5'
        },
        {
          orientation: 'horizontal',
          size: 'sm',
          class: 'h-1'
        },
        {
          orientation: 'horizontal',
          size: 'md',
          class: 'h-2'
        },
        {
          orientation: 'horizontal',
          size: 'lg',
          class: 'h-3'
        },
        {
          orientation: 'horizontal',
          size: 'xl',
          class: 'h-4'
        },
        {
          orientation: 'horizontal',
          size: '2xl',
          class: 'h-5'
        },
        {
          orientation: 'vertical',
          size: '2xs',
          class: 'w-px'
        },
        {
          orientation: 'vertical',
          size: 'xs',
          class: 'w-0.5'
        },
        {
          orientation: 'vertical',
          size: 'sm',
          class: 'w-1'
        },
        {
          orientation: 'vertical',
          size: 'md',
          class: 'w-2'
        },
        {
          orientation: 'vertical',
          size: 'lg',
          class: 'w-3'
        },
        {
          orientation: 'vertical',
          size: 'xl',
          class: 'w-4'
        },
        {
          orientation: 'vertical',
          size: '2xl',
          class: 'w-5'
        },
        {
          orientation: 'horizontal',
          animation: 'carousel',
          class: {
            indicator: 'data-[state=indeterminate]:animate-[carousel_2s_ease-in-out_infinite] data-[state=indeterminate]:rtl:animate-[carousel-rtl_2s_ease-in-out_infinite]'
          }
        },
        {
          orientation: 'vertical',
          animation: 'carousel',
          class: {
            indicator: 'data-[state=indeterminate]:animate-[carousel-vertical_2s_ease-in-out_infinite]'
          }
        },
        {
          orientation: 'horizontal',
          animation: 'carousel-inverse',
          class: {
            indicator: 'data-[state=indeterminate]:animate-[carousel-inverse_2s_ease-in-out_infinite] data-[state=indeterminate]:rtl:animate-[carousel-inverse-rtl_2s_ease-in-out_infinite]'
          }
        },
        {
          orientation: 'vertical',
          animation: 'carousel-inverse',
          class: {
            indicator: 'data-[state=indeterminate]:animate-[carousel-inverse-vertical_2s_ease-in-out_infinite]'
          }
        },
        {
          orientation: 'horizontal',
          animation: 'swing',
          class: {
            indicator: 'data-[state=indeterminate]:animate-[swing_2s_ease-in-out_infinite]'
          }
        },
        {
          orientation: 'vertical',
          animation: 'swing',
          class: {
            indicator: 'data-[state=indeterminate]:animate-[swing-vertical_2s_ease-in-out_infinite]'
          }
        },
        {
          orientation: 'horizontal',
          animation: 'elastic',
          class: {
            indicator: 'data-[state=indeterminate]:animate-[elastic_2s_ease-in-out_infinite]'
          }
        },
        {
          orientation: 'vertical',
          animation: 'elastic',
          class: {
            indicator: 'data-[state=indeterminate]:animate-[elastic-vertical_2s_ease-in-out_infinite]'
          }
        }
      ],
      defaultVariants: {
        animation: 'carousel',
        color: 'primary',
        size: 'md'
      }
    }
  }
})
```
