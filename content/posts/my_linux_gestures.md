---
title: "My linux gestures"
date: 2022-08-21T17:54:21+06:00
draft: false
toc: true
images:
  - "/img/touchpad_gestures.webp"
tags:
  - linux
  - gestures
  - macos
---

Around 2 years ago, I switched to macos as my primary operating system, to check what's the hype.
I found out the os is solid, but can't find anything espcical which I can't replicate in any linux os.
Couple of months ago, I switched back to linux as my mac machine bites to dust.
Nothing much bothers me this time, because in 2 years I tried to use cross-platform (& open sourced) apps as much possible.
After switching back to linux, only one thing I missed, apple's trackpad support.
Although gnome & kde now have better trackpad supports by default, I missed the 3 & 4 finger magics of macos.
& to be clear, I am a *mid-level* keyboard enthusiastic.
I need trackpad for navigations & I don't want a mouse to carry around with my laptop.
So, I start to look around how to bring those touchpad features in linux.

{{< image src="/img/touchpad_gestures.webp" alt="Touchpad Gestures" position="center" style="border-radius: 8px;" >}}

## My current setup

Right now I am using [Fedora 36](https://getfedora.org/en/) as my daily distro. 
I am using default [gnome](https://www.gnome.org/) as DE, with [material shell](https://material-shell.com/) extension. Initially I was set to [wayland](https://wayland.freedesktop.org/), but because of some issues (screen share not working, can't find better alternative of xdotool, etc), I moved to [xorg](https://www.x.org/wiki/).

## The gestures I miss

In my current setup, I want to use my laptop's touchpad gestures to do the following...

- 4 fingers swipe up & down to navigate between workspaces.

- 4 fingers swipe left & right to navigate between windows of a workspace.

- 3 finger drag to drag windows & text select.

To achive this, I have to follow 2 different process, one for swipe gestures & another one for 3 finger drag gesture.

## 4 finger swipe gestures

To enable 4-finger-swipe gestures, I have followed [this video](https://www.youtube.com/watch?v=ArBCfhVsTZw) by [The Linux Experiment](https://www.youtube.com/c/TheLinuxExperiment).
As described in the video, I've used [libinput-gestures](https://github.com/bulletmark/libinput-gestures) to manage the gestures & [Gestures](https://gitlab.com/cunidev/gestures) as the GUI.
Next I've setup keyboard hotkeys to my material-shell extensions to focus next & previous windows (`cntl+alt+l` & `cntl+alt+h` respectivly).

{{< image src="/img/material_shell_focus_window.webp" alt="Material Shell" position="center" >}}

Then I've setup the following new gestures from the Gestures app.

- 4-finger swipe up. command: `_internal ws_up` . (to move next workspace)

- 4-finger swipe down. command: `_internal ws_down` (to move previous workspace)

- 4-finger swipe right. command: `xdotool key 0xffe3+0xffe9+0x0068` (to focus previous window. It actually perform `cntl+alt+h` click event)

- 4-finger swipe right. command: `xdotool key 0xffe3+0xffe9+0x006c` (to focus next window. It actually perform `cntl+alt+l` click event)

{{< image src="/img/gestures_configurations.webp" alt="Gestures" position="center" >}}

By this, the navigation gestures are setup.\
(***P.S***: 4-finger swipe left-right will not work in wayland because xdotool doesn't work in wayland)

## 3 finger drag

For 3 finger drag I've found blog post in [medium](https://medium.com/@dakshin.k1/enable-3-finger-gesture-for-click-and-drag-on-windows-and-linux-cd7165b66851) & [libinput](https://gitlab.freedesktop.org/libinput/libinput) fork by [jafd](https://github.com/jafd) which enables 3-finger-drag.
The repositoy github link is [here](https://github.com/jafd/libinput).
But I faced 2 issues by following the medium post.\
The fork is based on libinput v1.19, where on time of wrinting libinput in fedora-36 is in v1.21.
Another issue was libinput lives in my `/usr/lib64` directory, so following the command directly will not work.

To resolve these issues, I [forked libinput](https://github.com/fahim44/libinput), applied jafd's patch over the fork's `1.21` build, & clone the git repository in my machine.
Then, I've followed [official libinput build instructions](https://wayland.freedesktop.org/libinput/doc/latest/building.html), but didn't install the build after the launch (installing the build directly would crash the gnome shell on start up, in that case you have to open `tty` & revert back to system-provided libinput following [this](https://wayland.freedesktop.org/libinput/doc/latest/building.html#reverting-to-the-system-provided-libinput-package)).

For fedora-36, the commands what I've followed...

```shell
# install dependencies
$> sudo dnf builddep libinput
$> sudo dnf install git-core gcc gcc-c++ pkgconf-pkg-config meson check-devel libudev-devel libevdev-devel doxygen graphviz python3-sphinx python3-recommonmark python3-sphinx_rtd_theme python3-pytest-xdist libwacom-devel cairo-devel gtk4-devel glib2-devel mtdev-devel diffutils wayland-protocols-devel valgrind

# build libinput
$> git clone https://github.com/fahim44/libinput.git
$> cd libinput
$> meson --prefix=/usr -Ddocumentation=false builddir/
$> ninja -C builddir/

# create libiniput link
$> cd builddir/
$> sudo cp libinput.so.10.14.0 /usr/lib64/
$> sudo ln -sf /usr/lib64/libinput.so.10.14.0 /usr/lib64/libinput.so.10
```

After running these commands, logout & login back in, you should then able to use 3-finger-drag in linux same as macos.

## Conclusion

This is a guild for people who miss the touchpad gestures of macos like me. 
I am planning to manage my libinput fork directory regularly.