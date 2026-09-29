# Getting started

This guide takes you from an empty laptop to your own Storybook running in a
browser tab, with your name, fonts and colours on it. You don't need to have
used a terminal before. Plan on about 15 minutes, most of it spent waiting for
downloads.

You'll need a Mac or a Windows computer and an internet connection. A Figma
file helps later, but you won't need one for this guide.

## What you'll build

Your Storybook is where your design system lives in code. Once it's running,
you work in two steps:

- **Build components.** Give your agent a Figma frame, and it builds the
  component using your colours and type.
- **Write their docs pages.** Each component has a page with a live example,
  usage guidelines, do's and don'ts, and accessibility notes. You decide what
  the guidance says, and your agent lays it out.

Steps 1 to 5 get Storybook running. Steps 6 and 7 bring in your brand, step 8
covers building and documenting components, and step 9 shares the result.

## 1. Install Node.js

Node.js is the program that runs Storybook on your computer. You install it
once and then forget about it.

1. Go to [nodejs.org](https://nodejs.org) and download the LTS version (24 at
   the time of writing).
2. Open the file you downloaded and click through the installer, keeping the
   default options.

To check that it worked, open a terminal:

- On a Mac, press Cmd+Space, type `Terminal`, and press Return.
- On Windows, open the Start menu, type `PowerShell`, and press Enter.

Type this and press Return (Enter on Windows):

```bash
node -v
```

You should see a version number that starts with `v24`. If the terminal says
it can't find `node`, close it, open a new one, and try again. A terminal that
was already open when you ran the installer can't see Node.js.

## 2. Install an agent

An agent is an AI assistant that can read and change the files in your
project. You'll use one to set up the kit and add to it. Pick one:

- [Cursor](https://cursor.com) is a code editor with an agent built in. Start
  here if you prefer windows and buttons.
- [Claude Code](https://code.claude.com/docs/en/overview) runs in the terminal
  you just opened.

Both work with everything in this guide.

## 3. Get the kit

1. Go to [github.com/toribryan/storybook-kit](https://github.com/toribryan/storybook-kit).
2. Click the green Code button, then Download ZIP.
3. Unzip it. Inside you'll find a folder called `template`.
4. Move `template` to wherever you keep your projects and rename it after your
   design system, for example `acme-design-system`.

That folder is your project from now on. You can delete the rest of the
download.

## 4. Open the project

In Cursor, choose File, then Open Folder, and pick your project folder. Then
open the built-in terminal with View, then Terminal.

In a regular terminal, type `cd` followed by a space, drag your project
folder onto the terminal window, and press Return. The terminal is now
"inside" your project, and the commands you type apply to it.

## 5. Start Storybook

Type these two commands, pressing Return after each one:

```bash
npm install
npm run storybook
```

The first command downloads everything the kit depends on. It takes a minute
or two and prints a lot of text; that's normal. The second starts Storybook
and opens it in your browser. If no tab opens, go to
[localhost:6006](http://localhost:6006) yourself.

Storybook runs for as long as the terminal stays open. To stop it, click in
the terminal and press Ctrl+C (on a Mac too, not Cmd).

## 6. Make it yours

Open `brand.config.ts` in your project folder. This one file sets your
Storybook's name, logo, fonts and frame colours, and a note beside each
setting explains what it does.

- `name` appears at the top of the sidebar and in the browser tab.
- `logo` is an image you put in the `public` folder, written as
  `"/logo.svg"`. Leave it empty to show the name as text instead. If your
  logo needs a different version on dark backgrounds, put it in `logoDark`.
- `fonts` takes the names of your fonts and a Google Fonts link that loads
  them. On [fonts.google.com](https://fonts.google.com), pick your fonts, click
  Get embed code, and copy the web address from the `href` part of the link.
- `chrome` sets the colours of the frame around your components, meaning the
  sidebar and toolbar, once for light mode and once for dark.
- `links` takes the web addresses of your Figma file and GitHub project. Each
  one adds a card to the bottom of every docs page. Leave a link empty to hide
  its card.

Save the file. The docs pages update straight away. The sidebar and toolbar
only change when Storybook starts, so press Ctrl+C in the terminal and run
`npm run storybook` again.

## 7. Add your colours

Your components take their colours from `src/styles/globals.css`. Each colour
there is a token: a named value such as `--primary` or `--border`. The block
that starts with `:root` sets each token for light mode, and the block that
starts with `.dark` sets it for dark mode. Change a value and every component
that uses the token follows. The Colors page in Storybook reads this file
directly, so it always shows your current values.

Name your tokens after your Figma variables. Then designers reading Figma and
developers reading the code use the same words for the same thing.

## 8. Build and document a component

Each component is three files in `src/components`. Button is there as an
example:

| File                  | What it is                                                     |
| --------------------- | -------------------------------------------------------------- |
| `button.tsx`          | The component itself                                           |
| `button.stories.tsx`  | The versions of it Storybook shows: each variant, size, state |
| `button.mdx`          | Its docs page: usage, guidelines, do's and don'ts             |

To add your own, give your agent the link to the Figma frame and say which
component it is. For example: "Add a Badge component from this Figma frame,
with stories and a docs page like Button's."

Then write its docs page. Open Button's docs page in Storybook to see the
sections: usage, guidelines, do's and don'ts, and accessibility. Tell your
agent what belongs in each, in your own words, for example: "In the Badge
guidelines, say to keep labels to one or two words. For a do and don't, show
a short label next to one that wraps." Your agent turns that into the page,
with the real component in each example.

## 9. Share it

When you want other people to see your Storybook, run:

```bash
npm run build
```

This command makes a folder called `storybook-static` in your project, which
holds a complete website. To put it online, sign in to a free Vercel account,
go to [Vercel Drop](https://vercel.com/drop), and drag the folder onto the
page. You get a link you can send to anyone.

## If something goes wrong

If the terminal says it can't find `npm` ("command not found" on a Mac, "not
recognized" on Windows), either Node.js isn't installed or the terminal was
open before you installed it. Open a new terminal and try again.

If Storybook says port 6006 is in use, it's already running somewhere,
probably in another terminal window. Close that window, or use the browser tab
that's already open.

If you changed `brand.config.ts` and the sidebar looks the same, stop
Storybook with Ctrl+C and start it again with `npm run storybook`.

If a page shows a red error box, copy the whole message and paste it to your
agent. It can read the error and fix the file that caused it.
