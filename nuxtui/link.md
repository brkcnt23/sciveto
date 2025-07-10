# Link

> A wrapper around <NuxtLink> with extra props.

## Usage

The Link component is a wrapper around [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link) using the [`custom`](https://router.vuejs.org/api/interfaces/RouterLinkProps.html#Properties-custom) prop. It provides a few extra props:

- `inactive-class` prop to set a class when the link is inactive, `active-class` is used when active.
- `exact` prop to style with `active-class` when the link is active and the route is exactly the same as the current route.
- `exact-query` and `exact-hash` props to style with `active-class` when the link is active and the query or hash is exactly the same as the current query or hash.

  - use `exact-query="partial"` to style with `active-class` when the link is active and the query partially match the current query.

The incentive behind this is to provide the same API as NuxtLink back in Nuxt 2 / Vue 2. You can read more about it in the Vue Router [migration from Vue 2](https://router.vuejs.org/guide/migration/#removal-of-the-exact-prop-in-router-link) guide.

<note>

It is used by the [`Breadcrumb`](/components/breadcrumb), [`Button`](/components/button), [`ContextMenu`](/components/context-menu), [`DropdownMenu`](/components/dropdown-menu) and [`NavigationMenu`](/components/navigation-menu) components.

</note>

### Tag

The `Link` components renders an `<a>` tag when a `to` prop is provided, otherwise it renders a `<button>` tag. You can use the `as` prop to change fallback tag.

```vue
<template>
  <ULink to="" as="button">
    Link
  </ULink>
</template>
```

<note>

You can inspect the rendered HTML by changing the `to` prop.

</note>

### Style

By default, the link has default active and inactive styles, check out the [#theme](#theme) section.

```vue
<template>
  <ULink to="/components/link">
    Link
  </ULink>
</template>
```

<note>

Try changing the `to` prop to see the active and inactive states.

</note>

You can override this behavior by using the `raw` prop and provide your own styles using `class`, `active-class` and `inactive-class`.

```vue
<template>
  <ULink raw to="/components/link" active-class="font-bold" inactive-class="text-muted">
    Link
  </ULink>
</template>
```

## IntelliSense

If you're using VSCode and wish to get autocompletion for the classes `active-class` and `inactive-class`, you can add the following settings to your `.vscode/settings.json`:

```json [.vscode/settings.json]
{
  "tailwindCSS.classAttributes": [
    "active-class",
    "inactive-class"
  ]
}
```

## API

### Props

```ts
/**
 * Props for the Link component
 */
interface LinkProps {
  /**
   * The element or component this component should render as when not a link.
   * @default "\"button\""
   */
  as?: any;
  /**
   * The type of the button when not a link.
   * @default "\"button\""
   */
  type?: "reset" | "submit" | "button" | undefined;
  disabled?: boolean | undefined;
  /**
   * Force the link to be active independent of the current route.
   * @default "undefined"
   */
  active?: boolean | undefined;
  /**
   * Will only be active if the current route is an exact match.
   */
  exact?: boolean | undefined;
  /**
   * Allows controlling how the current route query sets the link as active.
   */
  exactQuery?: boolean | "partial" | undefined;
  /**
   * Will only be active if the current route hash is an exact match.
   */
  exactHash?: boolean | undefined;
  /**
   * The class to apply when the link is inactive.
   */
  inactiveClass?: string | undefined;
  /**
   * Whether RouterLink should not wrap its content in an `a` tag. Useful when
   * using `v-slot` to create a custom RouterLink
   */
  custom?: boolean | undefined;
  /**
   * When `true`, only styles from `class`, `activeClass`, and `inactiveClass` will be applied.
   */
  raw?: boolean | undefined;
  /**
   * Route Location the link should navigate to when clicked on.
   */
  to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric | undefined;
  /**
   * An alias for `to`. If used with `to`, `href` will be ignored
   */
  href?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric | undefined;
  /**
   * Forces the link to be considered as external (true) or internal (false). This is helpful to handle edge-cases
   */
  external?: boolean | undefined;
  /**
   * Where to display the linked URL, as the name for a browsing context.
   */
  target?: "_blank" | "_parent" | "_self" | "_top" | (string & {}) | null | undefined;
  /**
   * A rel attribute value to apply on the link. Defaults to "noopener noreferrer" for external links.
   */
  rel?: (string & {}) | "noopener" | "noreferrer" | "nofollow" | "sponsored" | "ugc" | null | undefined;
  /**
   * If set to true, no rel attribute will be added to the link
   */
  noRel?: boolean | undefined;
  /**
   * A class to apply to links that have been prefetched.
   */
  prefetchedClass?: string | undefined;
  /**
   * When enabled will prefetch middleware, layouts and payloads of links in the viewport.
   */
  prefetch?: boolean | undefined;
  /**
   * Allows controlling when to prefetch links. By default, prefetch is triggered only on visibility.
   */
  prefetchOn?: "visibility" | "interaction" | Partial<{ visibility: boolean; interaction: boolean; }> | undefined;
  /**
   * Escape hatch to disable `prefetch` attribute.
   */
  noPrefetch?: boolean | undefined;
  /**
   * Class to apply when the link is active
   */
  activeClass?: string | undefined;
  /**
   * Class to apply when the link is exact active
   */
  exactActiveClass?: string | undefined;
  /**
   * Value passed to the attribute `aria-current` when the link is exact active.
   * @default "\"page\""
   */
  ariaCurrentValue?: "page" | "step" | "location" | "date" | "time" | "true" | "false" | undefined;
  /**
   * Pass the returned promise of `router.push()` to `document.startViewTransition()` if supported.
   */
  viewTransition?: boolean | undefined;
  /**
   * Calls `router.replace` instead of `router.push`.
   */
  replace?: boolean | undefined;
}
```

### Slots

```ts
/**
 * Slots for the Link component
 */
interface LinkSlots {
  default(): any;
}
```

## Theme

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    link: {
      base: 'focus-visible:outline-primary',
      variants: {
        active: {
          true: 'text-primary',
          false: 'text-muted'
        },
        disabled: {
          true: 'cursor-not-allowed opacity-75'
        }
      },
      compoundVariants: [
        {
          active: false,
          disabled: false,
          class: [
            'hover:text-default',
            'transition-colors'
          ]
        }
      ]
    }
  }
})
```
