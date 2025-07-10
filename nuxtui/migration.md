# Migration

> A comprehensive guide to migrate your application from Nuxt UI v2 to Nuxt UI v3.

Nuxt UI v3.0 is a new major version rebuilt from the ground up, introducing a modern architecture with significant performance improvements and an enhanced developer experience. This major release includes several breaking changes alongside powerful new features and capabilities:

- **Tailwind CSS v4**: Migration from JavaScript to CSS-based configuration
- **Reka UI**: Replacing Headless UI as the underlying component library
- **Tailwind Variants**: New styling API for component variants

This guide provides step by step instructions to migrate your application from v2 to v3.

## Migrate your project

<steps>

### Update Tailwind CSS

Tailwind CSS v4 introduces significant changes to its configuration approach. The official Tailwind upgrade tool will help automate most of the migration process.

<note to="https://tailwindcss.com/docs/upgrade-guide#changes-from-v3" target="_blank">

For a detailed walkthrough of all changes, refer to the official **Tailwind CSS v4 upgrade guide**.

</note>

1. Create a `main.css` file and import it in your `nuxt.config.ts` file:

<code-group>

```css [app/assets/css/main.css]
@import "tailwindcss";
```

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  css: ['~/assets/css/main.css']
})
```

</code-group>

1. Run the Tailwind CSS upgrade tool:

```bash
npx @tailwindcss/upgrade
```

### Update Nuxt UI

1. Install the latest version of the package:

<module-only>
<template v-slot:ui="">
<div>
<code-group sync="pm">

```bash [pnpm]
pnpm add @nuxt/ui
```

```bash [yarn]
yarn add @nuxt/ui
```

```bash [npm]
npm install @nuxt/ui
```

```bash [bun]
bun add @nuxt/ui
```

</code-group>
</div>
</template>

<template v-slot:ui-pro="">
<div>
<code-group sync="pm">

```bash [pnpm]
pnpm add @nuxt/ui-pro
```

```bash [yarn]
yarn add @nuxt/ui-pro
```

```bash [npm]
npm install @nuxt/ui-pro
```

```bash [bun]
bun add @nuxt/ui-pro
```

</code-group>
</div>
</template>
</module-only>

1. Import it in your CSS:

<module-only>
<template v-slot:ui="">
<div>

```css [app/assets/css/main.css]
@import "tailwindcss";
@import "@nuxt/ui";
```

</div>
</template>

<template v-slot:ui-pro="">
<div>

```css [app/assets/css/main.css]
@import "tailwindcss";
@import "@nuxt/ui-pro";
```

</div>
</template>
</module-only>

<module-only>
<template v-slot:ui="">
<div>

1. Wrap your app with the [App](/components/app) component:

</div>
</template>

<template v-slot:ui-pro="">
<div>

1. Add the `@nuxt/ui-pro` module in your `nuxt.config.ts` file as it's no longer a layer:

```diff [nuxt.config.ts]
export default defineNuxtConfig({
-  extends: ['@nuxt/ui-pro'],
-  modules: ['@nuxt/ui']
+  modules: ['@nuxt/ui-pro']
})
```

1. Wrap your app with the [App](/components/app) component:

</div>
</template>
</module-only>

```vue [app.vue]
<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
```

</steps>

## Changes from v2

Now that you have updated your project, you can start migrating your code. Here's a comprehensive list of all the breaking changes in Nuxt UI v3.

### Updated design system

In Nuxt UI v2, we had a mix between a design system with `primary`, `gray`, `error` aliases and all the colors from Tailwind CSS. We've replaced it with a proper [design system](/getting-started/theme#design-system) with 7 color aliases:

<table>
<thead>
  <tr>
    <th>
      Color
    </th>
    
    <th>
      Default
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code color="primary">
        primary
      </code>
    </td>
    
    <td>
      <code>
        green
      </code>
    </td>
    
    <td>
      Main brand color, used as the default color for components.
    </td>
  </tr>
  
  <tr>
    <td>
      <code color="secondary">
        secondary
      </code>
    </td>
    
    <td>
      <code>
        blue
      </code>
    </td>
    
    <td>
      Secondary color to complement the primary color.
    </td>
  </tr>
  
  <tr>
    <td>
      <code color="success">
        success
      </code>
    </td>
    
    <td>
      <code>
        green
      </code>
    </td>
    
    <td>
      Used for success states.
    </td>
  </tr>
  
  <tr>
    <td>
      <code color="info">
        info
      </code>
    </td>
    
    <td>
      <code>
        blue
      </code>
    </td>
    
    <td>
      Used for informational states.
    </td>
  </tr>
  
  <tr>
    <td>
      <code color="warning">
        warning
      </code>
    </td>
    
    <td>
      <code>
        yellow
      </code>
    </td>
    
    <td>
      Used for warning states.
    </td>
  </tr>
  
  <tr>
    <td>
      <code color="error">
        error
      </code>
    </td>
    
    <td>
      <code>
        red
      </code>
    </td>
    
    <td>
      Used for form error validation states.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        neutral
      </code>
    </td>
    
    <td>
      <code>
        slate
      </code>
    </td>
    
    <td>
      Neutral color for backgrounds, text, etc.
    </td>
  </tr>
</tbody>
</table>

This change introduces several breaking changes that you need to be aware of:

- The `gray` color has been renamed to `neutral`

```diff
<template>
- <p class="text-gray-500 dark:text-gray-400" />
+ <p class="text-neutral-500 dark:text-neutral-400" />
</template>
```

<note>

You can also use the new [design tokens](/getting-started/theme#neutral-palette) to handle light and dark mode:

```diff
<template>
- <p class="text-gray-500 dark:text-gray-400" />
+ <p class="text-muted" />

- <p class="text-gray-900 dark:text-white" />
+ <p class="text-highlighted" />
</template>
```

</note>

- The `gray`, `black` and `white` in the `color` props have been removed in favor of `neutral`:

```diff
- <UButton color="black" />
+ <UButton color="neutral" />

- <UButton color="gray" />
+ <UButton color="neutral" variant="subtle" />

- <UButton color="white" />
+ <UButton color="neutral" variant="outline" />
```

- You can no longer use Tailwind CSS colors in the `color` props, use the new aliases instead:

```diff
- <UButton color="red" />
+ <UButton color="error" />
```

<note to="/getting-started/theme#colors">

Learn how to extend the design system to add new color aliases.

</note>

- The color configuration in `app.config.ts` has been moved into a `colors` object:

```diff
export default defineAppConfig({
  ui: {
-   primary: 'green',
-   gray: 'cool'
+   colors: {
+     primary: 'green',
+     neutral: 'slate'
+   }
  }
})
```

### Updated theming system

Nuxt UI components are now styled using the [Tailwind Variants API](/getting-started/theme#components-theme), which makes all the overrides you made using the `app.config.ts` and the `ui` prop obsolete.

- Update your [`app.config.ts`](/getting-started/theme#config) to override components with their new theme:

```diff
export default defineAppConfig({
   ui: {
     button: {
-       font: 'font-bold',
-       default: {
-         size: 'md',
-         color: 'primary'
-       }
+       slots: {
+         base: 'font-medium'
+       },
+       defaultVariants: {
+         size: 'md',
+         color: 'primary'
+       }
     }
   }
})
```

- Update your [`ui` props](/getting-started/theme#props) to override each component's slots using their new theme:

```diff
<template>
- <UButton :ui="{ font: 'font-bold' }" />
+ <UButton :ui="{ base: 'font-bold' }" />
</template>
```

<tip to="/components/button#theme">

We can't detail all the changes here but you can check each component's theme in the **Theme** section.

</tip>

### Renamed components

We've renamed some Nuxt UI components to align with the Reka UI naming convention:

<table>
<thead>
  <tr>
    <th>
      v2
    </th>
    
    <th>
      v3
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        Divider
      </code>
    </td>
    
    <td>
      <a href="/components/separator">
        <code>
          Separator
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        Dropdown
      </code>
    </td>
    
    <td>
      <a href="/components/dropdown-menu">
        <code>
          DropdownMenu
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        FormGroup
      </code>
    </td>
    
    <td>
      <a href="/components/form-field">
        <code>
          FormField
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        Range
      </code>
    </td>
    
    <td>
      <a href="/components/slider">
        <code>
          Slider
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        Toggle
      </code>
    </td>
    
    <td>
      <a href="/components/switch">
        <code>
          Switch
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        Notification
      </code>
    </td>
    
    <td>
      <a href="/components/toast">
        <code>
          Toast
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        VerticalNavigation
      </code>
    </td>
    
    <td>
      <a href="/components/navigation-menu">
        <code>
          NavigationMenu
        </code>
      </a>
      
       with <code>
        orientation="vertical"
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        HorizontalNavigation
      </code>
    </td>
    
    <td>
      <a href="/components/navigation-menu">
        <code>
          NavigationMenu
        </code>
      </a>
      
       with <code>
        orientation="horizontal"
      </code>
    </td>
  </tr>
</tbody>
</table>

<module-only>
<template v-slot:ui-pro="">
<div>

Here are the Nuxt UI Pro components that have been renamed or removed:

<table>
<thead>
  <tr>
    <th>
      v1
    </th>
    
    <th>
      v3
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        BlogList
      </code>
    </td>
    
    <td>
      <a href="/components/blog-posts">
        <code>
          BlogPosts
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ColorModeToggle
      </code>
    </td>
    
    <td>
      <a href="/components/color-mode-switch">
        <code>
          ColorModeSwitch
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        DashboardCard
      </code>
    </td>
    
    <td>
      Removed (use <a href="/components/page-card">
        <code>
          PageCard
        </code>
      </a>
      
       instead)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        DashboardLayout
      </code>
    </td>
    
    <td>
      <a href="/components/dashboard-group">
        <code>
          DashboardGroup
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        DashboardModal
      </code>
    </td>
    
    <td>
      Removed (use <a href="/components/modal">
        <code>
          Modal
        </code>
      </a>
      
       instead)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        DashboardNavbarToggle
      </code>
    </td>
    
    <td>
      <a href="/components/dashboard-sidebar-toggle">
        <code>
          DashboardSidebarToggle
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        DashboardPage
      </code>
    </td>
    
    <td>
      Removed
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        DashboardPanelContent
      </code>
    </td>
    
    <td>
      Removed (use <code>
        #body
      </code>
      
       slot instead)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        DashboardPanelHandle
      </code>
    </td>
    
    <td>
      <a href="/components/dashboard-resize-handle">
        <code>
          DashboardResizeHandle
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        DashboardSection
      </code>
    </td>
    
    <td>
      Removed (use <a href="/components/page-card">
        <code>
          PageCard
        </code>
      </a>
      
       instead)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        DashboardSidebarLinks
      </code>
    </td>
    
    <td>
      Removed (use <a href="/components/navigation-menu">
        <code>
          NavigationMenu
        </code>
      </a>
      
       instead)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        DashboardSlideover
      </code>
    </td>
    
    <td>
      Removed (use <a href="/components/slideover">
        <code>
          Slideover
        </code>
      </a>
      
       instead)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        FooterLinks
      </code>
    </td>
    
    <td>
      Removed (use <a href="/components/navigation-menu">
        <code>
          NavigationMenu
        </code>
      </a>
      
       instead)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        HeaderLinks
      </code>
    </td>
    
    <td>
      Removed (use <a href="/components/navigation-menu">
        <code>
          NavigationMenu
        </code>
      </a>
      
       instead)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        LandingCard
      </code>
    </td>
    
    <td>
      Removed (use <a href="/components/page-card">
        <code>
          PageCard
        </code>
      </a>
      
       instead)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        LandingCTA
      </code>
    </td>
    
    <td>
      <a href="/components/page-cta">
        <code>
          PageCTA
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        LandingFAQ
      </code>
    </td>
    
    <td>
      Removed (use <a href="/components/page-accordion">
        <code>
          PageAccordion
        </code>
      </a>
      
       instead)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        LandingGrid
      </code>
    </td>
    
    <td>
      Removed (use <a href="/components/page-grid">
        <code>
          PageGrid
        </code>
      </a>
      
       instead)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        LandingHero
      </code>
    </td>
    
    <td>
      Removed (use <a href="/components/page-hero">
        <code>
          PageHero
        </code>
      </a>
      
       instead)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        LandingLogos
      </code>
    </td>
    
    <td>
      <a href="/components/page-logos">
        <code>
          PageLogos
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        LandingSection
      </code>
    </td>
    
    <td>
      <a href="/components/page-section">
        <code>
          PageSection
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        LandingTestimonial
      </code>
    </td>
    
    <td>
      Removed (use <a href="/components/page-card#as-a-testimonial">
        <code>
          PageCard
        </code>
      </a>
      
       instead)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        NavigationAccordion
      </code>
    </td>
    
    <td>
      <a href="/components/content-navigation">
        <code>
          ContentNavigation
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        NavigationLinks
      </code>
    </td>
    
    <td>
      <a href="/components/content-navigation">
        <code>
          ContentNavigation
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        NavigationTree
      </code>
    </td>
    
    <td>
      <a href="/components/content-navigation">
        <code>
          ContentNavigation
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        PageError
      </code>
    </td>
    
    <td>
      <a href="/components/error">
        <code>
          Error
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        PricingCard
      </code>
    </td>
    
    <td>
      <a href="/components/pricing-plan">
        <code>
          PricingPlan
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        PricingGrid
      </code>
    </td>
    
    <td>
      <a href="/components/pricing-plans">
        <code>
          PricingPlans
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        PricingSwitch
      </code>
    </td>
    
    <td>
      Removed (use <a href="/components/switch">
        <code>
          Switch
        </code>
      </a>
      
       or <a href="/components/tabs">
        <code>
          Tabs
        </code>
      </a>
      
       instead)
    </td>
  </tr>
</tbody>
</table>
</div>
</template>
</module-only>

### Changed components

In addition to the renamed components, there are lots of changes to the components API. Let's detail the most important ones:

- The `links` and `options` props have been renamed to `items` for consistency:

```diff
<template>
- <USelect :options="countries" />
+ <USelect :items="countries" />

- <UHorizontalNavigation :links="links" />
+ <UNavigationMenu :items="links" />
</template>
```

<note>

This change affects the following components: `Breadcrumb`, `HorizontalNavigation`, `InputMenu`, `RadioGroup`, `Select`, `SelectMenu`, `VerticalNavigation`.

</note>

- The `click` field in different components has been removed in favor of the native Vue `onClick` event:

```diff
<script setup lang="ts">
const items = [{
  label: 'Edit',
-  click: () => {
+  onClick: () => {
    console.log('Edit')
  }
}]
</script>
```

<note>

This change affects the `Toast` component as well as all component that have `items` links like `NavigationMenu`, `DropdownMenu`, `CommandPalette`, etc.

</note>

- The global `Modals`, `Slideovers` and `Notifications` components have been removed in favor the [App](/components/app) component:

```diff [app.vue]
<template>
+  <UApp>
+    <NuxtPage />
+  </UApp>
-  <UModals />
-  <USlideovers />
-  <UNotifications />
</template>
```

- The `v-model:open` directive and `default-open` prop are now used to control visibility:

```diff
<template>
- <UModal v-model="open" />
+ <UModal v-model:open="open" />
</template>
```

<note>

This change affects the following components: `ContextMenu`, `Modal` and `Slideover` and enables controlling visibility for `InputMenu`, `Select`, `SelectMenu` and `Tooltip`.

</note>

- The default slot is now used for the trigger and the content goes inside the `#content` slot (you don't need to use a `v-model:open` directive with this method):

```diff
<script setup lang="ts">
- const open = ref(false)
</script>

<template>
- <UButton label="Open" @click="open = true" />

- <UModal v-model="open">
+ <UModal>
+   <UButton label="Open" />

+   <template #content>
      <div class="p-4">
        <Placeholder class="h-48" />
      </div>
+   </template>
  </UModal>
</template>
```

<note>

This change affects the following components: `Modal`, `Popover`, `Slideover`, `Tooltip`.

</note>

- A `#header`, `#body` and `#footer` slots have been added inside the `#content` slot like the `Card` component:

```diff
<template>
- <UModal>
+ <UModal title="Title" description="Description">
-   <div class="p-4">
+   <template #body>
      <Placeholder class="h-48" />
+   </template>
-   </div>
  </UModal>
</template>
```

<note>

This change affects the following components: `Modal`, `Slideover`.

</note>

### Changed composables

- The `useToast()` composable `timeout` prop has been renamed to `duration`:

```diff
<script setup lang="ts">
const toast = useToast()

- toast.add({ title: 'Invitation sent', timeout: 0 })
+ toast.add({ title: 'Invitation sent', duration: 0 })
</script>
```

- The `useModal` and `useSlideover` composables have been removed in favor of a more generic `useOverlay` composable:

Some important differences:

- The `useOverlay` composable is now used to create overlay instances
- Overlays that are opened, can be awaited for their result
- Overlays can no longer be close using `modal.close()` or `slideover.close()`, rather, they close automatically: either when a `close` event is fired explicitly from the opened component OR when the overlay closes itself (clicking on backdrop, pressing the ESC key, etc)
- To capture the return value in the parent component you must explictly emit a `close` event with the desired value

```diff
<script setup lang="ts">
import { ModalExampleComponent } from '#components'

- const modal = useModal()
+ const overlay = useOverlay()

- modal.open(ModalExampleComponent)
+ const modal = overlay.create(ModalExampleComponent)
</script>
```

Props are now passed through a props attribute:

```diff
<script setup lang="ts">
import { ModalExampleComponent } from '#components'

- const modal = useModal()
+ const overlay = useOverlay()

const count = ref(0)

- modal.open(ModalExampleComponent, {
-   count: count.value
- })
+ const modal = overlay.create(ModalExampleComponent, {
+   props: {
+     count: count.value
+   }
+ })
</script>
```

Closing a modal is now done through the `close` event. The `modal.open` method now returns an instance that can be used to await for the result of the modal whenever the modal is closed:

```diff
<script setup lang="ts">
import { ModalExampleComponent } from '#components'

- const modal = useModal()
+ const overlay = useOverlay()

+ const modal = overlay.create(ModalExampleComponent)

- function openModal() {
-   modal.open(ModalExampleComponent, {
-     onSuccess() {
-       toast.add({ title: 'Success!' })
-     }
-   })
- }
+ async function openModal() {
+   const instance = modal.open(ModalExampleComponent, {
+     count: count.value
+   })
+
+   const result = await instance.result
+
+   if (result) {
+     toast.add({ title: 'Success!' })
+   }
+ }
</script>
```

---

<warning>

This page is a work in progress, we'll improve it regularly.

</warning>