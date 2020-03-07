> **⚠️ THIS PROJECT IS EARLY WORK IN PROGRESS**

# marmalade 🍊

Another opinionated **JAM**stack starter with static optimization, featuring:

- A **Design System** (custom built in [Styled Components](https://styled-components.com/) with themes)
- **TypeScript**
- **MDX** (extended to support front matter and custom layouts)

**Powered by [Next.js](https://nextjs.org)**.

## Roadmap

- [x] ~~🎨 Theming Schema~~.
- [x] ~~🔎 ESLint, Prettier and commit tools~~.
- [ ] 🧱 Components
  - [ ] Container
  - [ ] Text
  - [ ] Heading
  - [ ] Divider
  - [ ] Blockquote
  - [ ] Link
  - [ ] Image
  - [ ] Table
  - [ ] List
  - [ ] Code inline
  - [ ] Code block
- [ ] 🏗 Layouts
  - [ ] Default
  - [ ] Blog
- [ ] 🖼 Image optimization.
- [ ] ⚡️ Performance audits and optimization.
- [ ] ♿️ Accessibility testing and optimization.
- [ ] 🕸 Metadata and manifest generation.
- [ ] 🚇 Offline support.

### Todo

- [ ] Types for theme dot notation (e.g. colors).

### Ideas

- [ ] Preact in production.
- [ ] Netlify CMS.
- [ ] Extract Design System to separate project.

## Q&A

<details>
 <summary><b>Why does this project exist?</b></summary>
  <p>It's how I like to build things right now. You might like it too or you might not; and that's totally fine.</p>

  <p>This project was born out of a polarization on "how things should be built" in the current Front End climate. Specifically, a comment stating "stop wasting time perfecting your personal site's tech stack". Tweaking my tech stack pushes me to leave my comfort zone and broaden my knowledge; I'd actively encourage others to try new tools where possible.</p>

  <p>Build what you love and don't feel disheartened to try something new or go down a different route.</p>
</details>

<details>
 <summary><b>Why not just use <a href="https://www.gatsbyjs.org/">Gatsby</a>?</b></summary>
  I love <a href="https://www.gatsbyjs.org/">Gatsby</a>, I use it for my <a href="https://github.com/joe-bell/joebell.co.uk">personal site</a>. I like the fact I can install a plugin and let it magically solve my problems, but I equally think it's important to understand what goes on <em>behind</em> the scenes. I heard about Next.js' static export feature just after finishing my personal site and felt like it was worth an explore.
</details>

<details>
 <summary><b>Why do you use CSS-in-JS (specifically <a href="https://styled-components.com/">Styled Components</a>)?</b></summary>
  It feels right. I was a SASS advocate, but now it just feels cumbersome and outdated. With CSS-in-JS I can make the most of a theme schema to reinforce design tokens. In comparison to Emotion, Styled Components benefits from a wider community, better TypeScript support and <a href="https://github.com/emotion-js/emotion/issues/1178">less restrictions on how to write CSS</a>.
</details>

<details>
 <summary><b>Why don't you follow the <a href="https://styled-system.com/theme-specification/">Styled System Theme Specification</a>?</b></summary>
  Marmalade's components use Styled System under the hood to generate themed style props. I just wasn't particularly a fan of the plural naming convention of theme keys, but I might change my mind on this if it's problematic.
</details>

<details>
 <summary><b>Why not use <a href="https://chakra-ui.com/">Chakra-UI</a>?</b></summary>
    <a href="https://chakra-ui.com/">Chakra-UI</a> is bound to the Styled System Theme Specification and Emotion, so unfortunately not an option for this project 💔
</details>

## Acknowledgements

- [**@robertcoopercode**](https://github.com/robertcoopercode) - [_"Using ESLint and Prettier in a TypeScript Project"_](https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project)
