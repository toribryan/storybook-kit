# Getting started

This guide takes you from an empty laptop to your own Storybook running in a
browser tab, with your name, fonts and colours on it. You don't need to have
used a terminal before. Plan on about 15 minutes, most of it waiting for
downloads.

You'll need a Mac or a Windows computer and an internet connection. A Figma
file is useful later but not for this guide.

## 1. Install Node.js

Node.js is the program that runs Storybook on your computer. You install it
once and then forget about it.

1. Go to [nodejs.org](https://nodejs.org) and download the LTS version (24 at
   the time of writing).
2. Open the file you downloaded and click through the installer with the
   default options.

To check it worked, open a terminal:

- On a Mac, press Cmd+Space, type `Terminal`, and press Return.
- On Windows, open the Start menu, type `PowerShell`, and press Enter.

Type this and press Return:

```bash
node -v
```

You should see a version number that starts with `v24`. If you see "command
not found" instead, close the terminal, open a new one, and try again. The
installer only reaches terminals opened after it finished.

## 2. Install an agent

The kit is built to be set up and extended by an AI agent. Pick one:

- [Cursor](https://cursor.com) is a code editor with an agent built in. It's
  the easier start if you like having windows and buttons.
- [Claude Code](https://docs.claude.com/en/docs/claude-code/overview) runs in
  the terminal you just opened.

Either works with everything in this guide.

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
"inside" your project, and commands you type apply to it.

## 5. Start Storybook

Type these two commands, pressing Return after each one:

```bash
npm install
npm run storybook
```

The first downloads everything the kit depends on. It takes a minute or two
and prints a lot of text; that's normal. The second starts Storybook and
opens it in your browser. If no tab opens, go to
[localhost:6006](http://localhost:6006) yourself.

Storybook keeps running for as long as the terminal stays open. To stop it,
click in the terminal and press Ctrl+C (on a Mac too, not Cmd).

## 6. Make it yours

Open `brand.config.ts` in your project folder. It's the only file you need to
touch to change how the Storybook looks, and every setting in it has a note
explaining what it does.

- `name` is shown at the top of the sidebar and in the browser tab.
- `logo` is an image you put in the `public` folder, written as
  `"/logo.svg"`. Leave it empty to show the name as text instead.
- `fonts` takes the names of your fonts and a Google Fonts link that loads
  them. On [fonts.google.com](https://fonts.google.com), pick your fonts, click
  Get embed code, and copy the address from the `href` part of the link.
- `chrome` sets the colours of the sidebar and toolbar, once for light mode
  and once for dark.

Save the file. The docs pages update straight away. The sidebar and toolbar
only pick up changes when Storybook starts, so press Ctrl+C in the terminal
and run `npm run storybook` again.

## 7. Add your colours

Your components' colours live in `src/styles/globals.css`, as named tokens
such as `--primary` and `--border`. Each token is set once in the `:root`
block for light mode and once in the `.dark` block for dark mode. Change a
value there and every component that uses it follows. The Colors page in
Storybook reads this file directly, so it always shows what you have.

Keep the token names the same as your Figma variables. That way a designer
reading Figma and a developer reading the code are talking about the same
thing.

## 8. Add a component

Every component is three files in `src/components`. Button is there as an
example:

| File                  | What it is                                                     |
| --------------------- | -------------------------------------------------------------- |
| `button.tsx`          | The component itself                                           |
| `button.stories.tsx`  | The versions of it Storybook shows: each variant, size, state |
| `button.mdx`          | Its docs page: usage, guidelines, do's and don'ts             |

To add your own, ask your agent. Give it the link to the Figma frame and say
which component it is, for example: "Add a Badge component from this Figma
frame, with stories and a docs page like Button's." Point it at Button so it
follows the same pattern.

## 9. Share it

When you want other people to see your Storybook, run:

```bash
npm run build
```

This makes a folder called `storybook-static` in your project. It's a
complete website. To put it online, go to
[Vercel Drop](https://vercel.com/drop) and drag the folder onto the page. You
get a link you can send to anyone.

## If something goes wrong

"command not found: npm" means Node.js isn't installed, or the terminal was
open before you installed it. Open a new terminal and try again.

"Port 6006 is in use" means Storybook is already running somewhere, probably
in another terminal window. Close that window, or use the tab that's already
open.

If you changed `brand.config.ts` and the sidebar looks the same, stop
Storybook with Ctrl+C and start it again with `npm run storybook`.

If a page shows a red error box, copy the whole message and paste it to your
agent. It can read the error and fix the file that caused it.
