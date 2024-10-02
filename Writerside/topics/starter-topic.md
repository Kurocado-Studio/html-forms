# RFC: React Form Library for Accessible and Type-Safe Forms

<!--Writerside adds this topic when you create a new documentation project.
You can use it as a sandbox to play with Writerside features, and remove it from the TOC when you don't need it anymore.-->

## Introduction

This RFC proposes the development of a React form library focused on building accessible and
type-safe forms with ease. The library leverages modern React practices, TypeScript for type safety,
and integrates with popular validation libraries like Zod and form state management solutions like
Conform.

## Motivation

Form handling in React applications often involves repetitive boilerplate code, accessibility
concerns, and inconsistent validation practices. Existing form libraries may not fully address the
need for:

- Accessibility: Ensuring forms are accessible to all users, including those using assistive
  technologies.
- Type Safety: Leveraging TypeScript to catch errors at compile-time.
- Customization: Allowing developers to customize components as needed.
- Ease of Use: Providing a simple API that abstracts complex form handling logic.

## Dependencies

- [Kurocado Styleguide](https://kurocado-studio.github.io/styleguide/starter-topic.html)

## Design Overview

The library consists of a set of React components and hooks that:

- Abstract Form Logic: Use [Conform](https://conform.guide) hooks to manage form state and
  validation logic.
- Promote Accessibility: Utilize
  [React Aria](https://react-spectrum.adobe.com/react-aria/hooks.html) to ensure components are
  accessible.
- Leverage TypeScript: Use generics and interfaces to enforce type safety throughout the library.
- Integrate with Validation Libraries: Work seamlessly with [Zod](https://zod.dev) for schema-based
  validation.

## Inject XML

For example, this is how you inject a procedure:

<procedure title="Inject a procedure" id="inject-a-procedure">
    <step>
        <p>Start typing and select a procedure type from the completion suggestions:</p>
        <img src="completion_procedure.png" alt="completion suggestions for procedure" border-effect="line"/>
    </step>
    <step>
        <p>Press <shortcut>Tab</shortcut> or <shortcut>Enter</shortcut> to insert the markup.</p>
    </step>
</procedure>

## Add interactive elements

### Tabs

To add switchable content, you can make use of tabs (inject them by starting to type `tab` on a new
line):

<tabs>
    <tab title="Markdown">
        <code-block lang="plain text">![Alt Text](new_topic_options.png){ width=450 }</code-block>
    </tab>
    <tab title="Semantic markup">
        <code-block lang="xml">
            <![CDATA[<img src="new_topic_options.png" alt="Alt text" width="450px"/>]]></code-block>
    </tab>
</tabs>

### Collapsible blocks

Apart from injecting entire XML elements, you can use attributes to configure the behavior of
certain elements. For example, you can collapse a chapter that contains non-essential information:

#### Supplementary info {collapsible="true"}

Content under a collapsible header will be collapsed by default, but you can modify the behavior by
adding the following attribute: `default-state="expanded"`

### Convert selection to XML

If you need to extend an element with more functions, you can convert selected content from Markdown
to semantic markup. For example, if you want to merge cells in a table, it's much easier to convert
it to XML than do this in Markdown. Position the caret anywhere in the table and press
<shortcut>Alt+Enter</shortcut>:

<img src="convert_table_to_xml.png" alt="Convert table to XML" width="706" border-effect="line"/>

## Feedback and support

Please report any issues, usability improvements, or feature requests to our
<a href="https://youtrack.jetbrains.com/newIssue?project=WRS">YouTrack project</a> (you will need to
register).

You are welcome to join our <a href="https://jb.gg/WRS_Slack">public Slack workspace</a>. Before you
do, please read our
[Code of conduct](https://plugins.jetbrains.com/plugin/20158-writerside/docs/writerside-code-of-conduct.html).
We assume that you’ve read and acknowledged it before joining.

You can also always email us at [writerside@jetbrains.com](mailto:writerside@jetbrains.com).

<seealso>
    <category ref="wrs">
        <a href="https://plugins.jetbrains.com/plugin/20158-writerside/docs/markup-reference.html">Markup reference</a>
        <a href="https://plugins.jetbrains.com/plugin/20158-writerside/docs/manage-table-of-contents.html">Reorder topics in the TOC</a>
        <a href="https://plugins.jetbrains.com/plugin/20158-writerside/docs/local-build.html">Build and publish</a>
        <a href="https://plugins.jetbrains.com/plugin/20158-writerside/docs/configure-search.html">Configure Search</a>
    </category>
</seealso>
