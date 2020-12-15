<h1 align="center">:red_square: Archived, and somewhat dated, but still useful! :red_square:</h1>

<p align="center"><em>This repo does not fully represent my current best thinking on structuring an Ember Octane app with TypeScript, but it may still be useful to you for reference! It is archived and will not see further changes (including dependency fixes), but I leave it up in case it is useful to anyone!</em></p>

# TODO MVC… with TypeScript and Ember Octane!

Let's learn how to use TypeScript in an Ember Octane app!

Slides from the workshop will be available [here](https://github.com/chriskrycho/emberconf-2019-slides) by the morning of the workshop (Monday, March 18).

To make the workshop go as smoothly as possible and avoid as many hiccups as we can (especially given conference WiFi is notoriously spotty), I have two requests for some ahead-of-time setup:

1. Clone the app and install the dependencies.
2. Set up your editor.

I am *not* allotting time for these tasks during the workshop: we have way too much to get through!

Here are the details you need:

## Task 1: Clone the app and install the dependencies

Please download the code for the workshop (you're here!).

On the command line:

```bash
$ git clone https://github.com/chriskrycho/emberconf-2019.git
$ cd emberconf
$ git checkout setup
$ yarn install
```

Make sure you check out the `setup` tag before doing `yarn install`!

## Task 2: Set up your editor

You’ll also want your editor configured with TypeScript support. You should follow the setup instructions provided for your editor on the [Official TypeScript Wiki](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support). I am not personally familiar enough with the setups for every editor to be able to troubleshoot for you, but people throughout the community have used each of Atom, VS Code, Sublime Text, Vim, Emacs, and the JetBrains IDEs successfully—so thing *should* be pretty smooth for you, assuming you already know how to set up plugins in your editor or IDE of choice.

For VS Code, JetBrains IDEs, and Sublime Text, there are project files you can open directly in the root of the Git repository. (The VS Code project file will also prompt you to install a set of helpful addons for doing Ember.js development.)

