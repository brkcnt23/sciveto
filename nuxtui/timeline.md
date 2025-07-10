# Timeline

> A component that displays a sequence of events with dates, titles, icons or avatars.

## Usage

### Items

Use the `items` prop as an array of objects with the following properties:

- `date?: string`
- `title?: string`
- `description?: AvatarProps`
- `icon?: string`
- `avatar?: AvatarProps`
- `value?: string | number`
- [`slot?: string`](#with-custom-slot)
- `class?: any`
- `ui?: { item?: ClassNameValue, container?: ClassNameValue, indicator?: ClassNameValue, separator?: ClassNameValue, wrapper?: ClassNameValue, date?: ClassNameValue, title?: ClassNameValue, description?: ClassNameValue }`

```vue
<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'

const items = ref<TimelineItem[]>([
  {
    date: 'Mar 15, 2025',
    title: 'Project Kickoff',
    description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.',
    icon: 'i-lucide-rocket',
  },
  {
    date: 'Mar 22 2025',
    title: 'Design Phase',
    description: 'User research and design workshops. Created wireframes and prototypes for user testing.',
    icon: 'i-lucide-palette',
  },
  {
    date: 'Mar 29 2025',
    title: 'Development Sprint',
    description: 'Frontend and backend development. Implemented core features and integrated with APIs.',
    icon: 'i-lucide-code',
  },
  {
    date: 'Apr 5 2025',
    title: 'Testing & Deployment',
    description: 'QA testing and performance optimization. Deployed the application to production.',
    icon: 'i-lucide-check-circle',
  },
])
</script>

<template>
  <UTimeline :default-value="2" class="w-96" :items="items" />
</template>
```

### Color

Use the `color` prop to change the color of the active items in a Timeline.

```vue
<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'

const items = ref<TimelineItem[]>([
  {
    date: 'Mar 15, 2025',
    title: 'Project Kickoff',
    description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.',
    icon: 'i-lucide-rocket',
  },
  {
    date: 'Mar 22 2025',
    title: 'Design Phase',
    description: 'User research and design workshops. Created wireframes and prototypes for user testing.',
    icon: 'i-lucide-palette',
  },
  {
    date: 'Mar 29 2025',
    title: 'Development Sprint',
    description: 'Frontend and backend development. Implemented core features and integrated with APIs.',
    icon: 'i-lucide-code',
  },
  {
    date: 'Apr 5 2025',
    title: 'Testing & Deployment',
    description: 'QA testing and performance optimization. Deployed the application to production.',
    icon: 'i-lucide-check-circle',
  },
])
</script>

<template>
  <UTimeline color="neutral" :default-value="2" class="w-96" :items="items" />
</template>
```

### Size

Use the `size` prop to change the size of the Timeline.

```vue
<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'

const items = ref<TimelineItem[]>([
  {
    date: 'Mar 15, 2025',
    title: 'Project Kickoff',
    description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.',
    icon: 'i-lucide-rocket',
  },
  {
    date: 'Mar 22 2025',
    title: 'Design Phase',
    description: 'User research and design workshops. Created wireframes and prototypes for user testing.',
    icon: 'i-lucide-palette',
  },
  {
    date: 'Mar 29 2025',
    title: 'Development Sprint',
    description: 'Frontend and backend development. Implemented core features and integrated with APIs.',
    icon: 'i-lucide-code',
  },
  {
    date: 'Apr 5 2025',
    title: 'Testing & Deployment',
    description: 'QA testing and performance optimization. Deployed the application to production.',
    icon: 'i-lucide-check-circle',
  },
])
</script>

<template>
  <UTimeline size="xs" :default-value="2" class="w-96" :items="items" />
</template>
```

### Orientation

Use the `orientation` prop to change the orientation of the Timeline. Defaults to `vertical`.

```vue
<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'

const items = ref<TimelineItem[]>([
  {
    date: 'Mar 15, 2025',
    title: 'Project Kickoff',
    description: 'Kicked off the project with team alignment.',
    icon: 'i-lucide-rocket',
  },
  {
    date: 'Mar 22 2025',
    title: 'Design Phase',
    description: 'User research and design workshops.',
    icon: 'i-lucide-palette',
  },
  {
    date: 'Mar 29 2025',
    title: 'Development Sprint',
    description: 'Frontend and backend development.',
    icon: 'i-lucide-code',
  },
  {
    date: 'Apr 5 2025',
    title: 'Testing & Deployment',
    description: 'QA testing and performance optimization.',
    icon: 'i-lucide-check-circle',
  },
])
</script>

<template>
  <UTimeline orientation="horizontal" :default-value="2" class="w-full" :items="items" />
</template>
```

### Reverse

Use the reverse prop to reverse the direction of the Timeline.

```vue
<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'

const items = ref<TimelineItem[]>([
  {
    date: 'Mar 15, 2025',
    title: 'Project Kickoff',
    description: 'Kicked off the project with team alignment.',
    icon: 'i-lucide-rocket',
  },
  {
    date: 'Mar 22 2025',
    title: 'Design Phase',
    description: 'User research and design workshops.',
    icon: 'i-lucide-palette',
  },
  {
    date: 'Mar 29 2025',
    title: 'Development Sprint',
    description: 'Frontend and backend development.',
    icon: 'i-lucide-code',
  },
  {
    date: 'Apr 5 2025',
    title: 'Testing & Deployment',
    description: 'QA testing and performance optimization.',
    icon: 'i-lucide-check-circle',
  },
])
</script>

<template>
  <UTimeline reverse :model-value="2" orientation="vertical" class="w-full" :items="items" />
</template>
```

## Examples

### Control active item

You can control the active item by using the `default-value` prop or the `v-model` directive with the index of the item.

```vue [TimelineModelValueExample.vue]
<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'

const items: TimelineItem[] = [{
  date: 'Mar 15, 2025',
  title: 'Project Kickoff',
  description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.',
  icon: 'i-lucide-rocket',
  value: 'kickoff'
}, {
  date: 'Mar 22, 2025',
  title: 'Design Phase',
  description: 'User research and design workshops. Created wireframes and prototypes for user testing.',
  icon: 'i-lucide-palette',
  value: 'design'
}, {
  date: 'Mar 29, 2025',
  title: 'Development Sprint',
  description: 'Frontend and backend development. Implemented core features and integrated with APIs.',
  icon: 'i-lucide-code',
  value: 'development'
}, {
  date: 'Apr 5, 2025',
  title: 'Testing & Deployment',
  description: 'QA testing and performance optimization. Deployed the application to production.',
  icon: 'i-lucide-check-circle',
  value: 'deployment'
}]

const active = ref(0)

// Note: This is for demonstration purposes only. Don't do this at home.
onMounted(() => {
  setInterval(() => {
    active.value = (active.value + 1) % items.length
  }, 2000)
})
</script>

<template>
  <UTimeline v-model="active" :items="items" class="w-96" />
</template>
```

<tip>

You can also pass the `value` of one of the items if provided.

</tip>

### With alternating layout

Use the `ui` prop to create a Timeline with alternating layout.

```vue [TimelineAlternatingLayoutExample.vue]
<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'

const items: TimelineItem[] = [{
  date: 'Mar 15, 2025',
  title: 'Project Kickoff',
  icon: 'i-lucide-rocket',
  value: 'kickoff'
}, {
  date: 'Mar 22, 2025',
  title: 'Design Phase',
  icon: 'i-lucide-palette',
  value: 'design'
}, {
  date: 'Mar 29, 2025',
  title: 'Development Sprint',
  icon: 'i-lucide-code',
  value: 'development'
}, {
  date: 'Apr 5, 2025',
  title: 'Testing & Deployment',
  icon: 'i-lucide-check-circle',
  value: 'deployment'
}]
</script>

<template>
  <UTimeline
    :items="items"
    :default-value="2"
    :ui="{ item: 'even:flex-row-reverse even:-translate-x-[calc(100%-2rem)] even:text-right' }"
    class="translate-x-[calc(50%-1rem)]"
  />
</template>
```

### With custom slot

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}-indicator`
- `#{{ item.slot }}-date`
- `#{{ item.slot }}-title`
- `#{{ item.slot }}-description`

```vue [TimelineCustomSlotExample.vue]
<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'

const items = [{
  date: 'Mar 15, 2025',
  title: 'Project Kickoff',
  subtitle: 'Project Initiation',
  description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.',
  icon: 'i-lucide-rocket',
  value: 'kickoff'
}, {
  date: 'Mar 22, 2025',
  title: 'Design Phase',
  description: 'User research and design workshops. Created wireframes and prototypes for user testing.',
  icon: 'i-lucide-palette',
  value: 'design'
}, {
  date: 'Mar 29, 2025',
  title: 'Development Sprint',
  description: 'Frontend and backend development. Implemented core features and integrated with APIs.',
  icon: 'i-lucide-code',
  value: 'development',
  slot: 'development' as const,
  developers: [
    {
      src: 'https://github.com/J-Michalek.png'
    }, {
      src: 'https://github.com/benjamincanac.png'
    }
  ]
}, {
  date: 'Apr 5, 2025',
  title: 'Testing & Deployment',
  description: 'QA testing and performance optimization. Deployed the application to production.',
  icon: 'i-lucide-check-circle',
  value: 'deployment'
}] satisfies TimelineItem[]
</script>

<template>
  <UTimeline :items="items" :default-value="2" class="w-96">
    <template #development-title="{ item }">
      <div class="flex items-center gap-1">
        <span>{{ item.title }}</span>

        <UAvatarGroup size="2xs">
          <UAvatar v-for="(developer, index) of item.developers" :key="index" v-bind="developer" />
        </UAvatarGroup>
      </div>
    </template>
  </UTimeline>
</template>
```

### With slots

Use the available slots to create a more complex Timeline.

```vue [TimelineSlotsExample.vue]
<script lang="ts" setup>
import type { TimelineItem } from '@nuxt/ui'
import { useTimeAgo } from '@vueuse/core'

const items = [{
  username: 'J-Michalek',
  date: '2025-05-24T14:58:55Z',
  action: 'opened this',
  avatar: {
    src: 'https://github.com/J-Michalek.png'
  }
}, {
  username: 'J-Michalek',
  date: '2025-05-26T19:30:14+02:00',
  action: 'marked this pull request as ready for review',
  icon: 'i-lucide-check-circle'
}, {
  username: 'benjamincanac',
  date: '2025-05-27T11:01:20Z',
  action: 'commented on this',
  description: 'I\'ve made a few changes, let me know what you think! Basically I updated the design, removed unnecessary divs, used Avatar component for the indicator since it supports icon already.',
  avatar: {
    src: 'https://github.com/benjamincanac.png'
  }
}, {
  username: 'J-Michalek',
  date: '2025-05-27T11:01:20Z',
  action: 'commented on this',
  description: 'Looks great! Good job on cleaning it up.',
  avatar: {
    src: 'https://github.com/J-Michalek.png'
  }
}, {
  username: 'benjamincanac',
  date: '2025-05-27T11:01:20Z',
  action: 'merged this',
  icon: 'i-lucide-git-merge'
}] satisfies TimelineItem[]
</script>

<template>
  <UTimeline
    :items="items"
    size="xs"
    :ui="{
      date: 'float-end ms-1',
      description: 'px-3 py-2 ring ring-default mt-2 rounded-md text-default'
    }"
    class="w-96"
  >
    <template #title="{ item }">
      <span>{{ item.username }}</span>
      <span class="font-normal text-muted">&nbsp;{{ item.action }}</span>
    </template>

    <template #date="{ item }">
      {{ useTimeAgo(new Date(item.date)) }}
    </template>
  </UTimeline>
</template>
```

## API

### Props

```ts
/**
 * Props for the Timeline component
 */
interface TimelineProps {
  items: TimelineItem[];
  /**
   * The element or component this component should render as.
   */
  as?: any;
  size?: "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | undefined;
  color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined;
  /**
   * The orientation of the Timeline.
   * @default "\"vertical\""
   */
  orientation?: "horizontal" | "vertical" | undefined;
  defaultValue?: string | number | undefined;
  reverse?: boolean | undefined;
  ui?: { root?: ClassNameValue; item?: ClassNameValue; container?: ClassNameValue; indicator?: ClassNameValue; separator?: ClassNameValue; wrapper?: ClassNameValue; date?: ClassNameValue; title?: ClassNameValue; description?: ClassNameValue; } | undefined;
  modelValue?: string | number | undefined;
}
```

### Slots

```ts
/**
 * Slots for the Timeline component
 */
interface TimelineSlots {
  indicator(): any;
  date(): any;
  title(): any;
  description(): any;
}
```

### Emits

```ts
/**
 * Emitted events for the Timeline component
 */
interface TimelineEmits {
  update:modelValue: (payload: [value: string | number | undefined]) => void;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    timeline: {
      slots: {
        root: 'flex gap-1.5',
        item: 'group relative flex flex-1 gap-3',
        container: 'relative flex items-center gap-1.5',
        indicator: 'group-data-[state=completed]:text-inverted group-data-[state=active]:text-inverted text-muted',
        separator: 'flex-1 rounded-full bg-elevated',
        wrapper: 'w-full',
        date: 'text-dimmed text-xs/5',
        title: 'font-medium text-highlighted text-sm',
        description: 'text-muted text-wrap text-sm'
      },
      variants: {
        orientation: {
          horizontal: {
            root: 'flex-row w-full',
            item: 'flex-col',
            separator: 'h-0.5'
          },
          vertical: {
            root: 'flex-col',
            container: 'flex-col',
            separator: 'w-0.5'
          }
        },
        color: {
          primary: {
            indicator: 'group-data-[state=completed]:bg-primary group-data-[state=active]:bg-primary'
          },
          secondary: {
            indicator: 'group-data-[state=completed]:bg-secondary group-data-[state=active]:bg-secondary'
          },
          success: {
            indicator: 'group-data-[state=completed]:bg-success group-data-[state=active]:bg-success'
          },
          info: {
            indicator: 'group-data-[state=completed]:bg-info group-data-[state=active]:bg-info'
          },
          warning: {
            indicator: 'group-data-[state=completed]:bg-warning group-data-[state=active]:bg-warning'
          },
          error: {
            indicator: 'group-data-[state=completed]:bg-error group-data-[state=active]:bg-error'
          },
          neutral: {
            indicator: 'group-data-[state=completed]:bg-inverted group-data-[state=active]:bg-inverted'
          }
        },
        size: {
          '3xs': '',
          '2xs': '',
          xs: '',
          sm: '',
          md: '',
          lg: '',
          xl: '',
          '2xl': '',
          '3xl': ''
        },
        reverse: {
          true: ''
        }
      },
      compoundVariants: [
        {
          color: 'primary',
          reverse: false,
          class: {
            separator: 'group-data-[state=completed]:bg-primary'
          }
        },
        {
          color: 'secondary',
          reverse: false,
          class: {
            separator: 'group-data-[state=completed]:bg-secondary'
          }
        },
        {
          color: 'success',
          reverse: false,
          class: {
            separator: 'group-data-[state=completed]:bg-success'
          }
        },
        {
          color: 'info',
          reverse: false,
          class: {
            separator: 'group-data-[state=completed]:bg-info'
          }
        },
        {
          color: 'warning',
          reverse: false,
          class: {
            separator: 'group-data-[state=completed]:bg-warning'
          }
        },
        {
          color: 'error',
          reverse: false,
          class: {
            separator: 'group-data-[state=completed]:bg-error'
          }
        },
        {
          color: 'primary',
          reverse: true,
          class: {
            separator: 'group-data-[state=active]:bg-primary group-data-[state=completed]:bg-primary'
          }
        },
        {
          color: 'secondary',
          reverse: true,
          class: {
            separator: 'group-data-[state=active]:bg-secondary group-data-[state=completed]:bg-secondary'
          }
        },
        {
          color: 'success',
          reverse: true,
          class: {
            separator: 'group-data-[state=active]:bg-success group-data-[state=completed]:bg-success'
          }
        },
        {
          color: 'info',
          reverse: true,
          class: {
            separator: 'group-data-[state=active]:bg-info group-data-[state=completed]:bg-info'
          }
        },
        {
          color: 'warning',
          reverse: true,
          class: {
            separator: 'group-data-[state=active]:bg-warning group-data-[state=completed]:bg-warning'
          }
        },
        {
          color: 'error',
          reverse: true,
          class: {
            separator: 'group-data-[state=active]:bg-error group-data-[state=completed]:bg-error'
          }
        },
        {
          color: 'neutral',
          reverse: false,
          class: {
            separator: 'group-data-[state=completed]:bg-inverted'
          }
        },
        {
          color: 'neutral',
          reverse: true,
          class: {
            separator: 'group-data-[state=active]:bg-inverted group-data-[state=completed]:bg-inverted'
          }
        },
        {
          orientation: 'horizontal',
          size: '3xs',
          class: {
            wrapper: 'pe-4.5'
          }
        },
        {
          orientation: 'horizontal',
          size: '2xs',
          class: {
            wrapper: 'pe-5'
          }
        },
        {
          orientation: 'horizontal',
          size: 'xs',
          class: {
            wrapper: 'pe-5.5'
          }
        },
        {
          orientation: 'horizontal',
          size: 'sm',
          class: {
            wrapper: 'pe-6'
          }
        },
        {
          orientation: 'horizontal',
          size: 'md',
          class: {
            wrapper: 'pe-6.5'
          }
        },
        {
          orientation: 'horizontal',
          size: 'lg',
          class: {
            wrapper: 'pe-7'
          }
        },
        {
          orientation: 'horizontal',
          size: 'xl',
          class: {
            wrapper: 'pe-7.5'
          }
        },
        {
          orientation: 'horizontal',
          size: '2xl',
          class: {
            wrapper: 'pe-8'
          }
        },
        {
          orientation: 'horizontal',
          size: '3xl',
          class: {
            wrapper: 'pe-8.5'
          }
        },
        {
          orientation: 'vertical',
          size: '3xs',
          class: {
            wrapper: '-mt-0.5 pb-4.5'
          }
        },
        {
          orientation: 'vertical',
          size: '2xs',
          class: {
            wrapper: 'pb-5'
          }
        },
        {
          orientation: 'vertical',
          size: 'xs',
          class: {
            wrapper: 'mt-0.5 pb-5.5'
          }
        },
        {
          orientation: 'vertical',
          size: 'sm',
          class: {
            wrapper: 'mt-1 pb-6'
          }
        },
        {
          orientation: 'vertical',
          size: 'md',
          class: {
            wrapper: 'mt-1.5 pb-6.5'
          }
        },
        {
          orientation: 'vertical',
          size: 'lg',
          class: {
            wrapper: 'mt-2 pb-7'
          }
        },
        {
          orientation: 'vertical',
          size: 'xl',
          class: {
            wrapper: 'mt-2.5 pb-7.5'
          }
        },
        {
          orientation: 'vertical',
          size: '2xl',
          class: {
            wrapper: 'mt-3 pb-8'
          }
        },
        {
          orientation: 'vertical',
          size: '3xl',
          class: {
            wrapper: 'mt-3.5 pb-8.5'
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
