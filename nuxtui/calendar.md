# Calendar

> A calendar component for selecting single dates, multiple dates or date ranges.

<note>

This component relies on the [`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date/index.html) package which provides objects and functions for representing and manipulating dates and times in a locale-aware manner.

</note>

## Usage

Use the `v-model` directive to control the selected date.

```vue
<script setup lang="ts">
const value = ref(new CalendarDate(2022, 2, 3))
</script>

<template>
  <UCalendar v-model="value" />
</template>
```

Use the `default-value` prop to set the initial value when you do not need to control its state.

```vue
<template>
  <UCalendar />
</template>
```

### Multiple

Use the `multiple` prop to allow multiple selections.

```vue
<script setup lang="ts">
const value = ref(new CalendarDate(2022,2,4, 2022,2,6, 2022,2,8))
</script>

<template>
  <UCalendar multiple v-model="value" />
</template>
```

### Range

Use the `range` prop to select a range of dates.

```vue
<template>
  <UCalendar range v-model="value" />
</template>
```

### Color

Use the `color` prop to change the color of the calendar.

```vue
<template>
  <UCalendar color="neutral" />
</template>
```

### Size

Use the `size` prop to change the size of the calendar.

```vue
<template>
  <UCalendar size="xl" />
</template>
```

### Disabled

Use the `disabled` prop to disable the calendar.

```vue
<template>
  <UCalendar disabled />
</template>
```

### Number Of Months

Use the `numberOfMonths` prop to change the number of months in the calendar.

```vue
<template>
  <UCalendar :number-of-months="3" />
</template>
```

### Month Controls

Use the `month-controls` prop to show the month controls. Defaults to `true`.

```vue
<template>
  <UCalendar :month-controls="false" />
</template>
```

### Year Controls

Use the `year-controls` prop to show the year controls. Defaults to `true`.

```vue
<template>
  <UCalendar :year-controls="false" />
</template>
```

### Fixed Weeks

Use the `fixed-weeks` prop to display the calendar with fixed weeks.

```vue
<template>
  <UCalendar :fixed-weeks="false" />
</template>
```

## Examples

### With chip events

Use the [Chip](/components/chip) component to add events to specific days.

```vue [CalendarEventsExample.vue]
<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'

const modelValue = shallowRef(new CalendarDate(2022, 1, 10))

function getColorByDate(date: Date) {
  const isWeekend = date.getDay() % 6 == 0
  const isDayMeeting = date.getDay() % 3 == 0

  if (isWeekend) {
    return undefined
  }

  if (isDayMeeting) {
    return 'error'
  }

  return 'success'
}
</script>

<template>
  <UCalendar v-model="modelValue">
    <template #day="{ day }">
      <UChip :show="!!getColorByDate(day.toDate('UTC'))" :color="getColorByDate(day.toDate('UTC'))" size="2xs">
        {{ day.day }}
      </UChip>
    </template>
  </UCalendar>
</template>
```

### With disabled dates

Use the `is-date-disabled` prop with a function to mark specific dates as disabled.

```vue [CalendarDisabledDatesExample.vue]
<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { CalendarDate } from '@internationalized/date'

const modelValue = shallowRef({
  start: new CalendarDate(2022, 1, 1),
  end: new CalendarDate(2022, 1, 9)
})

const isDateDisabled = (date: DateValue) => {
  return date.day >= 10 && date.day <= 16
}
</script>

<template>
  <UCalendar v-model="modelValue" :is-date-disabled="isDateDisabled" range />
</template>
```

### With unavailable dates

Use the `is-date-unavailable` prop with a function to mark specific dates as unavailable.

```vue [CalendarUnavailableDatesExample.vue]
<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { CalendarDate } from '@internationalized/date'

const modelValue = shallowRef({
  start: new CalendarDate(2022, 1, 1),
  end: new CalendarDate(2022, 1, 9)
})

const isDateUnavailable = (date: DateValue) => {
  return date.day >= 10 && date.day <= 16
}
</script>

<template>
  <UCalendar v-model="modelValue" :is-date-unavailable="isDateUnavailable" range />
</template>
```

### With min/max dates

Use the `min-value` and `max-value` props to limit the dates.

```vue [CalendarMinMaxDatesExample.vue]
<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'

const modelValue = shallowRef(new CalendarDate(2023, 9, 10))
const minDate = new CalendarDate(2023, 9, 1)
const maxDate = new CalendarDate(2023, 9, 30)
</script>

<template>
  <UCalendar v-model="modelValue" :min-value="minDate" :max-value="maxDate" />
</template>
```

### With other calendar systems

You can use other calenders from `@internationalized/date` to implement a different calendar system.

```vue [CalendarOtherSystemExample.vue]
<script lang="ts" setup>
import { CalendarDate, HebrewCalendar } from '@internationalized/date'

const hebrewDate = shallowRef(new CalendarDate(new HebrewCalendar(), 5781, 1, 1))
</script>

<template>
  <UCalendar v-model="hebrewDate" />
</template>
```

<note to="https://react-spectrum.adobe.com/internationalized/date/Calendar.html#implementations">

You can check all the available calendars on `@internationalized/date` docs.

</note>

### With external controls

You can control the calendar with external controls by manipulating the date passed in the `v-model`.

```vue [CalendarExternalControlsExample.vue]
<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'

const date = shallowRef(new CalendarDate(2025, 4, 2))
</script>

<template>
  <div class="flex flex-col gap-4">
    <UCalendar v-model="date" :month-controls="false" :year-controls="false" />

    <div class="flex justify-between gap-4">
      <UButton color="neutral" variant="outline" @click="date = date.subtract({ months: 1 })">
        Prev
      </UButton>

      <UButton color="neutral" variant="outline" @click="date = date.add({ months: 1 })">
        Next
      </UButton>
    </div>
  </div>
</template>
```

### As a DatePicker

Use a [Button](/components/button) and a [Popover](/components/popover) component to create a date picker.

```vue [CalendarDatePickerExample.vue]
<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'

const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
})

const modelValue = shallowRef(new CalendarDate(2022, 1, 10))
</script>

<template>
  <UPopover>
    <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
      {{ modelValue ? df.format(modelValue.toDate(getLocalTimeZone())) : 'Select a date' }}
    </UButton>

    <template #content>
      <UCalendar v-model="modelValue" class="p-2" />
    </template>
  </UPopover>
</template>
```

### As a DateRangePicker

Use a [Button](/components/button) and a [Popover](/components/popover) component to create a date range picker.

```vue [CalendarDateRangePickerExample.vue]
<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'

const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
})

const modelValue = shallowRef({
  start: new CalendarDate(2022, 1, 20),
  end: new CalendarDate(2022, 2, 10)
})
</script>

<template>
  <UPopover>
    <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
      <template v-if="modelValue.start">
        <template v-if="modelValue.end">
          {{ df.format(modelValue.start.toDate(getLocalTimeZone())) }} - {{ df.format(modelValue.end.toDate(getLocalTimeZone())) }}
        </template>

        <template v-else>
          {{ df.format(modelValue.start.toDate(getLocalTimeZone())) }}
        </template>
      </template>
      <template v-else>
        Pick a date
      </template>
    </UButton>

    <template #content>
      <UCalendar v-model="modelValue" class="p-2" :number-of-months="2" range />
    </template>
  </UPopover>
</template>
```

## API

### Props

```ts
/**
 * Props for the Calendar component
 */
interface CalendarProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  /**
   * The icon to use for the next year control.
   */
  nextYearIcon?: string | undefined;
  /**
   * Configure the next year button.
   * `{ color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   */
  nextYear?: ButtonProps | undefined;
  /**
   * The icon to use for the next month control.
   */
  nextMonthIcon?: string | undefined;
  /**
   * Configure the next month button.
   * `{ color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   */
  nextMonth?: ButtonProps | undefined;
  /**
   * The icon to use for the previous year control.
   */
  prevYearIcon?: string | undefined;
  /**
   * Configure the prev year button.
   * `{ color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   */
  prevYear?: ButtonProps | undefined;
  /**
   * The icon to use for the previous month control.
   */
  prevMonthIcon?: string | undefined;
  /**
   * Configure the prev month button.
   * `{ color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   */
  prevMonth?: ButtonProps | undefined;
  color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined;
  size?: "md" | "xs" | "sm" | "lg" | "xl" | undefined;
  /**
   * Whether or not a range of dates can be selected
   */
  range?: boolean | undefined;
  /**
   * Whether or not multiple dates can be selected
   */
  multiple?: boolean | undefined;
  /**
   * Show month controls
   * @default "true"
   */
  monthControls?: boolean | undefined;
  /**
   * Show year controls
   * @default "true"
   */
  yearControls?: boolean | undefined;
  defaultValue?: DateValue | DateRange | DateValue[] | undefined;
  modelValue?: DateValue | DateRange | DateValue[] | null | undefined;
  ui?: { root?: ClassNameValue; header?: ClassNameValue; body?: ClassNameValue; heading?: ClassNameValue; grid?: ClassNameValue; gridRow?: ClassNameValue; gridWeekDaysRow?: ClassNameValue; gridBody?: ClassNameValue; headCell?: ClassNameValue; cell?: ClassNameValue; cellTrigger?: ClassNameValue; } | undefined;
  /**
   * The default placeholder date
   */
  defaultPlaceholder?: DateValue | undefined;
  /**
   * The placeholder date, which is used to determine what month to display when no date is selected. This updates as the user navigates the calendar and can be used to programmatically control the calendar view
   */
  placeholder?: DateValue | undefined;
  /**
   * When combined with `isDateUnavailable`, determines whether non-contiguous ranges, i.e. ranges containing unavailable dates, may be selected.
   */
  allowNonContiguousRanges?: boolean | undefined;
  /**
   * This property causes the previous and next buttons to navigate by the number of months displayed at once, rather than one month
   */
  pagedNavigation?: boolean | undefined;
  /**
   * Whether or not to prevent the user from deselecting a date without selecting another date first
   */
  preventDeselect?: boolean | undefined;
  /**
   * The maximum number of days that can be selected in a range
   */
  maximumDays?: number | undefined;
  /**
   * The day of the week to start the calendar on
   */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;
  /**
   * The format to use for the weekday strings provided via the weekdays slot prop
   */
  weekdayFormat?: WeekDayFormat | undefined;
  /**
   * Whether or not to always display 6 weeks in the calendar
   * @default "true"
   */
  fixedWeeks?: boolean | undefined;
  /**
   * The maximum date that can be selected
   */
  maxValue?: DateValue | undefined;
  /**
   * The minimum date that can be selected
   */
  minValue?: DateValue | undefined;
  /**
   * The number of months to display at once
   */
  numberOfMonths?: number | undefined;
  /**
   * Whether or not the calendar is disabled
   */
  disabled?: boolean | undefined;
  /**
   * Whether or not the calendar is readonly
   */
  readonly?: boolean | undefined;
  /**
   * If true, the calendar will focus the selected day, today, or the first day of the month depending on what is visible when the calendar is mounted
   */
  initialFocus?: boolean | undefined;
  /**
   * A function that returns whether or not a date is disabled
   */
  isDateDisabled?: Matcher | undefined;
  /**
   * A function that returns whether or not a date is unavailable
   */
  isDateUnavailable?: Matcher | undefined;
  /**
   * A function that returns whether or not a date is hightable
   */
  isDateHighlightable?: Matcher | undefined;
  /**
   * A function that returns the next page of the calendar. It receives the current placeholder as an argument inside the component.
   */
  nextPage?: ((placeholder: DateValue) => DateValue) | undefined;
  /**
   * A function that returns the previous page of the calendar. It receives the current placeholder as an argument inside the component.
   */
  prevPage?: ((placeholder: DateValue) => DateValue) | undefined;
  /**
   * Whether or not to disable days outside the current view.
   */
  disableDaysOutsideCurrentView?: boolean | undefined;
  /**
   * Which part of the range should be fixed
   */
  fixedDate?: "start" | "end" | undefined;
}
```

### Slots

```ts
/**
 * Slots for the Calendar component
 */
interface CalendarSlots {
  heading(): any;
  day(): any;
  week-day(): any;
}
```

### Emits

```ts
/**
 * Emitted events for the Calendar component
 */
interface CalendarEmits {
  update:modelValue: (payload: [date: DateValue | DateRange | DateValue[] | null | undefined]) => void;
  update:placeholder: (payload: [date: DateValue] & [date: DateValue]) => void;
  update:startValue: (payload: [date: DateValue | undefined]) => void;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    calendar: {
      slots: {
        root: '',
        header: 'flex items-center justify-between',
        body: 'flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0',
        heading: 'text-center font-medium truncate mx-auto',
        grid: 'w-full border-collapse select-none space-y-1 focus:outline-none',
        gridRow: 'grid grid-cols-7 place-items-center',
        gridWeekDaysRow: 'mb-1 grid w-full grid-cols-7',
        gridBody: 'grid',
        headCell: 'rounded-md',
        cell: 'relative text-center',
        cellTrigger: [
          'm-0.5 relative flex items-center justify-center rounded-full whitespace-nowrap focus-visible:ring-2 focus:outline-none data-disabled:text-muted data-unavailable:line-through data-unavailable:text-muted data-unavailable:pointer-events-none data-[selected]:text-inverted data-today:font-semibold data-[outside-view]:text-muted',
          'transition'
        ]
      },
      variants: {
        color: {
          primary: {
            headCell: 'text-primary',
            cellTrigger: 'focus-visible:ring-primary data-[selected]:bg-primary data-today:not-data-[selected]:text-primary data-[highlighted]:bg-primary/20 hover:not-data-[selected]:bg-primary/20'
          },
          secondary: {
            headCell: 'text-secondary',
            cellTrigger: 'focus-visible:ring-secondary data-[selected]:bg-secondary data-today:not-data-[selected]:text-secondary data-[highlighted]:bg-secondary/20 hover:not-data-[selected]:bg-secondary/20'
          },
          success: {
            headCell: 'text-success',
            cellTrigger: 'focus-visible:ring-success data-[selected]:bg-success data-today:not-data-[selected]:text-success data-[highlighted]:bg-success/20 hover:not-data-[selected]:bg-success/20'
          },
          info: {
            headCell: 'text-info',
            cellTrigger: 'focus-visible:ring-info data-[selected]:bg-info data-today:not-data-[selected]:text-info data-[highlighted]:bg-info/20 hover:not-data-[selected]:bg-info/20'
          },
          warning: {
            headCell: 'text-warning',
            cellTrigger: 'focus-visible:ring-warning data-[selected]:bg-warning data-today:not-data-[selected]:text-warning data-[highlighted]:bg-warning/20 hover:not-data-[selected]:bg-warning/20'
          },
          error: {
            headCell: 'text-error',
            cellTrigger: 'focus-visible:ring-error data-[selected]:bg-error data-today:not-data-[selected]:text-error data-[highlighted]:bg-error/20 hover:not-data-[selected]:bg-error/20'
          },
          neutral: {
            headCell: 'text-highlighted',
            cellTrigger: 'focus-visible:ring-inverted data-[selected]:bg-inverted data-today:not-data-[selected]:text-highlighted data-[highlighted]:bg-inverted/20 hover:not-data-[selected]:bg-inverted/10'
          }
        },
        size: {
          xs: {
            heading: 'text-xs',
            cell: 'text-xs',
            headCell: 'text-[10px]',
            cellTrigger: 'size-7',
            body: 'space-y-2 pt-2'
          },
          sm: {
            heading: 'text-xs',
            headCell: 'text-xs',
            cell: 'text-xs',
            cellTrigger: 'size-7'
          },
          md: {
            heading: 'text-sm',
            headCell: 'text-xs',
            cell: 'text-sm',
            cellTrigger: 'size-8'
          },
          lg: {
            heading: 'text-md',
            headCell: 'text-md',
            cellTrigger: 'size-9 text-md'
          },
          xl: {
            heading: 'text-lg',
            headCell: 'text-lg',
            cellTrigger: 'size-10 text-lg'
          }
        }
      },
      defaultVariants: {
        size: 'md',
        color: 'primary'
      }
    }
  }
})
```
