# Landing Page Spacing Density Design

## Goal

Reduce excessive whitespace and loose content rhythm across the public landing page by roughly 15-25% while preserving its premium visual character, content hierarchy, readability, and touch-target sizes.

## Scope

The audit covers the landing page assembled in `app/page.tsx`, including:

- hero and tagline;
- benefits and curriculum;
- program roadmap;
- teaching team and gallery;
- testimonials and fees;
- FAQ, partners, registration CTA, and footer.

The registration wizard, admin pages, test pages, typography system, colors, content order, and motion behavior are outside this spacing pass unless a shared spacing token directly affects the landing page.

## Audit Findings

The page feels longer than its content requires because global section padding and large local margins frequently stack together.

Primary examples:

- `section-spacing-feature` reaches `10rem` of padding on both the top and bottom at desktop widths;
- the program section adds `mt-24`, `mt-32`, repeated `mb-24` roadmap gaps, and another `mt-24` inside the feature-level section padding;
- curriculum and teaching headers use desktop bottom margins of `5rem` and `6rem`;
- several short-content cards use `p-10` or `p-12`;
- footer top padding reaches `6rem` and is combined with generous internal margins;
- different sections use unrelated local values for structurally equivalent heading-to-content relationships.

## Spacing Strategy

Use a hybrid approach:

1. tighten shared section-spacing utilities so the whole page gains a more consistent baseline;
2. reduce only the largest local margins, gaps, and card padding values in sections where global and local spacing currently compound;
3. preserve breathing room in the hero and keep interactive controls at their current accessible dimensions.

### Shared Section Tokens

Target values:

| Token | Mobile | Tablet | Desktop |
|---|---:|---:|---:|
| `section-spacing-compact` | `2.5rem` | `3.5rem` | `4rem` |
| `section-spacing-standard` | `3.5rem` | `4.5rem` | `5rem` |
| `section-spacing-feature` | `5rem` | `6.5rem` | `8rem` |

These values reduce the current scale without collapsing visual separation between alternating backgrounds.

## Section-Level Changes

### Hero and Tagline

- Keep the hero structure and minimum visual impact intact.
- Reduce the tagline stack from `space-y-8/10/12` to a tighter responsive scale around `space-y-6/8/9`.
- Do not reduce headline size or alter the approved copy.

### Why Choose and Curriculum

- Reduce large grid and feature-panel gaps by one spacing step.
- Reduce heading-to-content margins such as `mb-16/20` toward `mb-10/14`.
- Reduce oversized panel padding only where content does not need it; retain comfortable card readability.

### Program Roadmap

This section receives the largest local reduction:

- method block top margin moves from `mt-16 md:mt-24` toward `mt-12 md:mt-16`;
- roadmap top margin moves from `mt-20 md:mt-32` toward `mt-14 md:mt-20`;
- roadmap heading bottom margin moves from `mb-12 md:mb-20` toward `mb-8 md:mb-12`;
- stage separation moves from `mb-12 md:mb-24` toward `mb-10 md:mb-16`;
- CTA separation moves from `mt-16 md:mt-24` toward `mt-12 md:mt-16`;
- card padding moves from `p-8` to a responsive `p-6 md:p-8` where practical.

The timeline, alternating layout, content, and CTA remain unchanged.

### Teaching, Gallery, Testimonials, and Fees

- Normalize section header bottom spacing to approximately `mb-10 md:mb-14`.
- Reduce desktop grid gaps and card padding by one Tailwind spacing step when they exceed the content need.
- Keep image aspect ratios, testimonial readability, fee hierarchy, and pricing emphasis unchanged.

### FAQ, Partners, Registration, and Footer

- Reduce FAQ column gap from the current large desktop gap while retaining its two-column hierarchy.
- Tighten FAQ introductory copy spacing and accordion row padding slightly.
- Reduce partner heading-to-logo and logo-container padding by one spacing step.
- Keep the registration CTA button dimensions unchanged; only tighten its surrounding card and section whitespace.
- Reduce footer top padding and large block margins while preserving clear grouping and the copyright divider.

## Responsive Principles

- Mobile reductions stay conservative because narrow layouts need separation between stacked content.
- Desktop receives the strongest reduction because accumulated vertical margins are most noticeable there.
- No section may become visually attached to an adjacent section; background changes and headings must still create clear boundaries.
- Buttons, accordion triggers, and links retain accessible touch targets.

## Testing and Verification

Automated tests will verify:

- the shared spacing utility values at mobile, tablet, and desktop breakpoints;
- the program section no longer contains its largest legacy spacing values;
- key landing sections continue using the shared spacing utilities;
- existing landing-page rendering, content, accessibility, and motion tests remain green.

Manual source review will confirm that:

- no copy, ordering, or major visual hierarchy changed;
- spacing reductions stay within the approved balanced range;
- no unrelated admin or registration-wizard styling was modified.

The full Vitest suite and `git diff --check` must pass before completion. Existing unrelated TypeScript errors, if still present, will be reported separately rather than silently attributed to this work.

