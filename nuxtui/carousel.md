# Carousel

> A carousel with motion and swipe built using Embla.

## Usage

### Items

Use the `items` prop as an array and render each item using the default slot:

<note>

Use your mouse to drag the carousel horizontally on desktop.

</note>

```vue [CarouselItemsExample.vue]
<script setup lang="ts">
const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6'
]
</script>

<template>
  <UCarousel v-slot="{ item }" :items="items" class="w-full max-w-xs mx-auto">
    <img :src="item" width="320" height="320" class="rounded-lg">
  </UCarousel>
</template>
```

You can also pass an array of objects with the following properties:

- `class?: any`
- `ui?: { item?: ClassNameValue }`

You can control how many items are visible by using the [`basis`](https://tailwindcss.com/docs/flex-basis) / [`width`](https://tailwindcss.com/docs/width) utility classes on the `item`:

```vue [CarouselItemsMultipleExample.vue]
<script setup lang="ts">
const items = [
  'https://picsum.photos/468/468?random=1',
  'https://picsum.photos/468/468?random=2',
  'https://picsum.photos/468/468?random=3',
  'https://picsum.photos/468/468?random=4',
  'https://picsum.photos/468/468?random=5',
  'https://picsum.photos/468/468?random=6'
]
</script>

<template>
  <UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'basis-1/3' }">
    <img :src="item" width="234" height="234" class="rounded-lg">
  </UCarousel>
</template>
```

### Orientation

Use the `orientation` prop to change the orientation of the Progress. Defaults to `horizontal`.

<note>

Use your mouse to drag the carousel vertically on desktop.

</note>

```vue [CarouselOrientationExample.vue]
<script setup lang="ts">
const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6'
]
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    orientation="vertical"
    :items="items"
    :ui="{ container: 'h-[336px]' }"
    class="w-full max-w-xs mx-auto"
  >
    <img :src="item" width="320" height="320" class="rounded-lg">
  </UCarousel>
</template>
```

<caution>

You need to specify a `height` on the container in vertical orientation.

</caution>

### Arrows

Use the `arrows` prop to display prev and next buttons.

```vue [CarouselArrowsExample.vue]
<script setup lang="ts">
const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6'
]
</script>

<template>
  <UCarousel v-slot="{ item }" arrows :items="items" class="w-full max-w-xs mx-auto">
    <img :src="item" width="320" height="320" class="rounded-lg">
  </UCarousel>
</template>
```

### Prev / Next

Use the `prev` and `next` props to customize the prev and next buttons with any [Button](/components/button) props.

```vue [CarouselPrevNextExample.vue]
<script setup lang="ts">
const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6'
]
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    arrows
    :prev="{ color: 'primary' }"
    :next="{ variant: 'solid' }"
    :items="items"
    class="w-full max-w-xs mx-auto"
  >
    <img :src="item" width="320" height="320" class="rounded-lg">
  </UCarousel>
</template>
```

### Prev / Next Icons

Use the `prev-icon` and `next-icon` props to customize the buttons [Icon](/components/icon). Defaults to `i-lucide-arrow-left` / `i-lucide-arrow-right`.

```vue [CarouselPrevNextIconExample.vue]
<script setup lang="ts">
defineProps<{
  prevIcon?: string
  nextIcon?: string
}>()

const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6'
]
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    arrows
    :prev-icon="prevIcon"
    :next-icon="nextIcon"
    :items="items"
    class="w-full max-w-xs mx-auto"
  >
    <img :src="item" width="320" height="320" class="rounded-lg">
  </UCarousel>
</template>
```

<framework-only>
<template v-slot:nuxt="">
<tip to="/getting-started/icons/nuxt#theme">

You can customize these icons globally in your `app.config.ts` under `ui.icons.arrowLeft` / `ui.icons.arrowRight` key.

</tip>
</template>

<template v-slot:vue="">
<tip to="/getting-started/icons/vue#theme">

You can customize these icons globally in your `vite.config.ts` under `ui.icons.arrowLeft` / `ui.icons.arrowRight` key.

</tip>
</template>
</framework-only>

### Dots

Use the `dots` prop to display a list of dots to scroll to a specific slide.

```vue [CarouselDotsExample.vue]
<script setup lang="ts">
const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6'
]
</script>

<template>
  <UCarousel v-slot="{ item }" dots :items="items" class="w-full max-w-xs mx-auto">
    <img :src="item" width="320" height="320" class="rounded-lg">
  </UCarousel>
</template>
```

The number of dots is based on the number of slides displayed in the view:

```vue [CarouselDotsMultipleExample.vue]
<script setup lang="ts">
const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6'
]
</script>

<template>
  <UCarousel v-slot="{ item }" dots :items="items" :ui="{ item: 'basis-1/3' }">
    <img :src="item" width="320" height="320" class="rounded-lg">
  </UCarousel>
</template>
```

## Plugins

The Carousel component implements the official [Embla Carousel plugins](https://www.embla-carousel.com/plugins/).

### Autoplay

This plugin is used to extend Embla Carousel with **autoplay** functionality.

Use the `autoplay` prop as a boolean or an object to configure the [Autoplay plugin](https://www.embla-carousel.com/plugins/autoplay/).

```vue [CarouselAutoplayExample.vue]
<script setup lang="ts">
const items = [
  'https://picsum.photos/468/468?random=1',
  'https://picsum.photos/468/468?random=2',
  'https://picsum.photos/468/468?random=3',
  'https://picsum.photos/468/468?random=4',
  'https://picsum.photos/468/468?random=5',
  'https://picsum.photos/468/468?random=6'
]
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    loop
    arrows
    dots
    :autoplay="{ delay: 2000 }"
    :items="items"
    :ui="{ item: 'basis-1/3' }"
  >
    <img :src="item" width="234" height="234" class="rounded-lg">
  </UCarousel>
</template>
```

<note>

In this example, we're using the `loop` prop for an infinite carousel.

</note>

### Auto Scroll

This plugin is used to extend Embla Carousel with **auto scroll** functionality.

Use the `auto-scroll` prop as a boolean or an object to configure the [Auto Scroll plugin](https://www.embla-carousel.com/plugins/auto-scroll/).

```vue [CarouselAutoScrollExample.vue]
<script setup lang="ts">
const items = [
  'https://picsum.photos/468/468?random=1',
  'https://picsum.photos/468/468?random=2',
  'https://picsum.photos/468/468?random=3',
  'https://picsum.photos/468/468?random=4',
  'https://picsum.photos/468/468?random=5',
  'https://picsum.photos/468/468?random=6'
]
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    loop
    dots
    arrows
    auto-scroll
    :items="items"
    :ui="{ item: 'basis-1/3' }"
  >
    <img :src="item" width="234" height="234" class="rounded-lg">
  </UCarousel>
</template>
```

<note>

In this example, we're using the `loop` prop for an infinite carousel.

</note>

### Auto Height

This plugin is used to extend Embla Carousel with **auto height** functionality. It changes the height of the carousel container to fit the height of the highest slide in view.

Use the `auto-height` prop as a boolean or an object to configure the [Auto Height plugin](https://www.embla-carousel.com/plugins/auto-height/).

```vue [CarouselAutoHeightExample.vue]
<script setup lang="ts">
const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/320?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/320?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/320?random=6'
]
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    auto-height
    arrows
    dots
    :items="items"
    :ui="{
      container: 'transition-[height]',
      controls: 'absolute -top-8 inset-x-12',
      dots: '-top-7',
      dot: 'w-6 h-1'
    }"
    class="w-full max-w-xs mx-auto"
  >
    <img :src="item" width="320" height="320" class="rounded-lg">
  </UCarousel>
</template>
```

<note>

In this example, we add the `transition-[height]` class on the container to animate the height change.

</note>

### Class Names

Class Names is a **class name toggle** utility plugin for Embla Carousel that enables you to automate the toggling of class names on your carousel.

Use the `class-names` prop as a boolean or an object to configure the [Class Names plugin](https://www.embla-carousel.com/plugins/class-names/).

```vue [CarouselClassNamesExample.vue]
<script setup lang="ts">
const items = [
  'https://picsum.photos/528/528?random=1',
  'https://picsum.photos/528/528?random=2',
  'https://picsum.photos/528/528?random=3',
  'https://picsum.photos/528/528?random=4',
  'https://picsum.photos/528/528?random=5',
  'https://picsum.photos/528/528?random=6'
]
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    class-names
    arrows
    :items="items"
    :ui="{
      item: 'basis-[70%] transition-opacity [&:not(.is-snapped)]:opacity-10'
    }"
    class="mx-auto max-w-sm"
  >
    <img :src="item" width="264" height="264" class="rounded-lg">
  </UCarousel>
</template>
```

<note>

In this example, we add the `transition-opacity [&:not(.is-snapped)]:opacity-10` classes on the `item` to animate the opacity change.

</note>

### Fade

This plugin is used to replace the Embla Carousel scroll functionality with **fade transitions**.

Use the `fade` prop as a boolean or an object to configure the [Fade plugin](https://www.embla-carousel.com/plugins/fade/).

```vue [CarouselFadeExample.vue]
<script setup lang="ts">
const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6'
]
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    fade
    arrows
    dots
    :items="items"
    class="w-full max-w-xs mx-auto"
  >
    <img :src="item" width="320" height="320" class="rounded-lg">
  </UCarousel>
</template>
```

### Wheel Gestures

This plugin is used to extend Embla Carousel with the ability to **use the mouse/trackpad wheel** to navigate the carousel.

Use the `wheel-gestures` prop as a boolean or an object to configure the [Wheel Gestures plugin](https://www.embla-carousel.com/plugins/wheel-gestures/).

<note>

Use your mouse wheel to scroll the carousel.

</note>

```vue [CarouselWheelGesturesExample.vue]
<script setup lang="ts">
const items = [
  'https://picsum.photos/468/468?random=1',
  'https://picsum.photos/468/468?random=2',
  'https://picsum.photos/468/468?random=3',
  'https://picsum.photos/468/468?random=4',
  'https://picsum.photos/468/468?random=5',
  'https://picsum.photos/468/468?random=6'
]
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    loop
    wheel-gestures
    :items="items"
    :ui="{ item: 'basis-1/3' }"
  >
    <img :src="item" width="234" height="234" class="rounded-lg">
  </UCarousel>
</template>
```

## Examples

### With thumbnails

You can use the [`emblaApi`](#expose) function [scrollTo](https://www.embla-carousel.com/api/methods/#scrollto) to display thumbnails under the carousel that allows you to navigate to a specific slide.

```vue [CarouselThumbnailsExample.vue]
<script setup lang="ts">
const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6'
]

const carousel = useTemplateRef('carousel')
const activeIndex = ref(0)

function onClickPrev() {
  activeIndex.value--
}
function onClickNext() {
  activeIndex.value++
}
function onSelect(index: number) {
  activeIndex.value = index
}

function select(index: number) {
  activeIndex.value = index

  carousel.value?.emblaApi?.scrollTo(index)
}
</script>

<template>
  <div class="flex-1 w-full">
    <UCarousel
      ref="carousel"
      v-slot="{ item }"
      arrows
      :items="items"
      :prev="{ onClick: onClickPrev }"
      :next="{ onClick: onClickNext }"
      class="w-full max-w-xs mx-auto"
      @select="onSelect"
    >
      <img :src="item" width="320" height="320" class="rounded-lg">
    </UCarousel>

    <div class="flex gap-1 justify-between pt-4 max-w-xs mx-auto">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="size-11 opacity-25 hover:opacity-100 transition-opacity"
        :class="{ 'opacity-100': activeIndex === index }"
        @click="select(index)"
      >
        <img :src="item" width="44" height="44" class="rounded-lg">
      </div>
    </div>
  </div>
</template>
```

## API

### Props

```ts
/**
 * Props for the Carousel component
 */
interface CarouselProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  /**
   * Configure the prev button when arrows are enabled.
   */
  prev?: ButtonProps | undefined;
  /**
   * The icon displayed in the prev button.
   */
  prevIcon?: string | undefined;
  /**
   * Configure the next button when arrows are enabled.
   */
  next?: ButtonProps | undefined;
  /**
   * The icon displayed in the next button.
   */
  nextIcon?: string | undefined;
  /**
   * Display prev and next buttons to scroll the carousel.
   * @default "false"
   */
  arrows?: boolean | undefined;
  /**
   * Display dots to scroll to a specific slide.
   * @default "false"
   */
  dots?: boolean | undefined;
  /**
   * The orientation of the carousel.
   * @default "\"horizontal\""
   */
  orientation?: "vertical" | "horizontal" | undefined;
  items?: CarouselItem[] | undefined;
  /**
   * Enable Autoplay plugin
   * @default "false"
   */
  autoplay?: boolean | Partial<CreateOptionsType<OptionsType>> | undefined;
  /**
   * Enable Auto Scroll plugin
   * @default "false"
   */
  autoScroll?: boolean | Partial<CreateOptionsType<OptionsType>> | undefined;
  /**
   * Enable Auto Height plugin
   * @default "false"
   */
  autoHeight?: boolean | Partial<CreateOptionsType<{ active: boolean; breakpoints: { [key: string]: Omit<Partial<any>, "breakpoints">; }; }>> | undefined;
  /**
   * Enable Class Names plugin
   * @default "false"
   */
  classNames?: boolean | Partial<CreateOptionsType<OptionsType>> | undefined;
  /**
   * Enable Fade plugin
   * @default "false"
   */
  fade?: boolean | Partial<CreateOptionsType<{ active: boolean; breakpoints: { [key: string]: Omit<Partial<any>, "breakpoints">; }; }>> | undefined;
  /**
   * Enable Wheel Gestures plugin
   * @default "false"
   */
  wheelGestures?: any;
  ui?: { root?: ClassNameValue; viewport?: ClassNameValue; container?: ClassNameValue; item?: ClassNameValue; controls?: ClassNameValue; arrows?: ClassNameValue; prev?: ClassNameValue; next?: ClassNameValue; dots?: ClassNameValue; dot?: ClassNameValue; } | undefined;
  /**
   * @default "\"center\""
   */
  align?: AlignmentOptionType | undefined;
  /**
   * @default "\"trimSnaps\""
   */
  containScroll?: ScrollContainOptionType | undefined;
  /**
   * @default "1"
   */
  slidesToScroll?: SlidesToScrollOptionType | undefined;
  /**
   * @default "false"
   */
  dragFree?: boolean | undefined;
  /**
   * @default "10"
   */
  dragThreshold?: number | undefined;
  /**
   * @default "0"
   */
  inViewThreshold?: number | number[] | undefined;
  /**
   * @default "false"
   */
  loop?: boolean | undefined;
  /**
   * @default "false"
   */
  skipSnaps?: boolean | undefined;
  /**
   * @default "25"
   */
  duration?: number | undefined;
  /**
   * @default "0"
   */
  startIndex?: number | undefined;
  /**
   * @default "true"
   */
  watchDrag?: DragHandlerOptionType | undefined;
  /**
   * @default "true"
   */
  watchResize?: ResizeHandlerOptionType | undefined;
  /**
   * @default "true"
   */
  watchSlides?: SlidesHandlerOptionType | undefined;
  /**
   * @default "true"
   */
  watchFocus?: FocusHandlerOptionType | undefined;
  /**
   * @default "true"
   */
  active?: boolean | undefined;
  /**
   * @default "{}"
   */
  breakpoints?: { [key: string]: Omit<Partial<CreateOptionsType<{ align: AlignmentOptionType; axis: AxisOptionType; container: string | HTMLElement | null; slides: string | HTMLElement[] | NodeListOf<HTMLElement> | null; containScroll: ScrollContainOptionType; direction: AxisDirectionOptionType; slidesToScroll: SlidesToScrollOptionType; dragFree: boolean; dragThreshold: number; inViewThreshold: number | number[] | undefined; loop: boolean; skipSnaps: boolean; duration: number; startIndex: number; watchDrag: DragHandlerOptionType; watchResize: ResizeHandlerOptionType; watchSlides: SlidesHandlerOptionType; watchFocus: FocusHandlerOptionType; }>>, "breakpoints">; } | undefined;
}
```

### Slots

```ts
/**
 * Slots for the Carousel component
 */
interface CarouselSlots {
  default(): any;
}
```

### Emits

```ts
/**
 * Emitted events for the Carousel component
 */
interface CarouselEmits {
  select: (payload: [selectedIndex: number]) => void;
}
```

### Expose

You can access the typed component instance using [`useTemplateRef`](https://vuejs.org/api/composition-api-helpers.html#usetemplateref).

```vue
<script setup lang="ts">
const carousel = useTemplateRef('carousel')
</script>

<template>
  <UCarousel ref="carousel" />
</template>
```

This will give you access to the following:

<table>
<thead>
  <tr>
    <th>
      Name
    </th>
    
    <th>
      Type
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code className="language-ts-type shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts-type" style="">
        <span class="sBMFI">
          emblaRef
        </span>
      </code>
    </td>
    
    <td>
      <code className="language-ts-type shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts-type" style="">
        <span class="sBMFI">
          Ref
        </span>
        
        <span class="sMK4o">
          <
        </span>
        
        <span class="sBMFI">
          HTMLElement
        </span>
        
        <span class="sMK4o">
          |
        </span>
        
        <span class="sBMFI">
          null
        </span>
        
        <span class="sMK4o">
          >
        </span>
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code className="language-ts-type shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts-type" style="">
        <span class="sBMFI">
          emblaApi
        </span>
      </code>
    </td>
    
    <td>
      <a href="https://www.embla-carousel.com/api/methods/#typescript" rel="nofollow">
        <code className="language-ts-type shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts-type" style="">
          <span class="sBMFI">
            Ref
          </span>
          
          <span class="sMK4o">
            <
          </span>
          
          <span class="sBMFI">
            EmblaCarouselType
          </span>
          
          <span class="sMK4o">
            |
          </span>
          
          <span class="sBMFI">
            null
          </span>
          
          <span class="sMK4o">
            >
          </span>
        </code>
      </a>
    </td>
  </tr>
</tbody>
</table>

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    carousel: {
      slots: {
        root: 'relative focus:outline-none',
        viewport: 'overflow-hidden',
        container: 'flex items-start',
        item: 'min-w-0 shrink-0 basis-full',
        controls: '',
        arrows: '',
        prev: 'absolute rounded-full',
        next: 'absolute rounded-full',
        dots: 'absolute inset-x-0 -bottom-7 flex flex-wrap items-center justify-center gap-3',
        dot: [
          'cursor-pointer size-3 bg-accented rounded-full',
          'transition'
        ]
      },
      variants: {
        orientation: {
          vertical: {
            container: 'flex-col -mt-4',
            item: 'pt-4',
            prev: 'top-4 sm:-top-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90',
            next: 'bottom-4 sm:-bottom-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90'
          },
          horizontal: {
            container: 'flex-row -ms-4',
            item: 'ps-4',
            prev: 'start-4 sm:-start-12 top-1/2 -translate-y-1/2',
            next: 'end-4 sm:-end-12 top-1/2 -translate-y-1/2'
          }
        },
        active: {
          true: {
            dot: 'data-[state=active]:bg-inverted'
          }
        }
      }
    }
  }
})
```
