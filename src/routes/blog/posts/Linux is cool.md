---
title: Linux is cool!
description: What is linux, brief history and what do know when you switch.
date: "2025-06-04"
location: Berkeley
categories:
  - Philosophy
  - Software
  - Linux
  - Computer Science
  - Open Source
  - Operating Systems
published: true
img: https://static-assets-1.truthsocial.com/tmtg:prime-ts-assets/media_attachments/files/115/027/520/698/240/649/original/f4eed007d3987a99.jpg
language:
  - English
---

Linux, and my identity as someone in computing, is an aspect of my character that is not featured much on this blog.

# What is an Operating System

An operating system is computer software which manages the hardware of a computer so that software can use and communicate with it. Windows is an operating system, macOS or iOS is an operating system.

It is generally made out of these components; this will be overly technical, I apologise.

## Core Components

| Component               | Windows                         | macOS                    | Ubuntu (Linux)                   | Arch Linux                       | Gentoo                               | FreeBSD                          |
| ----------------------- | ------------------------------- | ------------------------ | -------------------------------- | -------------------------------- | ------------------------------------ | -------------------------------- |
| **Kernel**              | Windows NT Kernel               | XNU (Darwin) Kernel      | Linux Kernel                     | Linux Kernel                     | Linux Kernel                         | FreeBSD Kernel                   |
| **System Architecture** | Monolithic with modular drivers | Hybrid (Mach/BSD hybrid) | Monolithic with loadable modules | Monolithic with loadable modules | Monolithic with customisable modules | Monolithic with loadable modules |

## File System and Storage Management

| Component                | Windows                         | macOS                      | Ubuntu (Linux)         | Arch Linux                      | Gentoo                      | FreeBSD         |
| ------------------------ | ------------------------------- | -------------------------- | ---------------------- | ------------------------------- | --------------------------- | --------------- |
| **Primary File Systems** | NTFS, exFAT, FAT32              | APFS, HFS+                 | ext4, Btrfs            | ext4, Btrfs, XFS                | ext4, Btrfs, XFS, ZFS       | UFS2, ZFS       |
| **Volume Management**    | Storage Spaces, Disk Management | Disk Utility, APFS Volumes | LVM, ZFS               | LVM, Btrfs subvolumes           | LVM, md-raid                | ZFS pools, GEOM |
| **File Explorer**        | File Explorer                   | Finder                     | Nautilus (GNOME Files) | Dolphin, Thunar (depends on DE) | User choice (depends on DE) | Dolphin, Thunar |

## User Interface and Experience

| Component               | Windows                              | macOS             | Ubuntu (Linux)      | Arch Linux                           | Gentoo                               | FreeBSD                              |
| ----------------------- | ------------------------------------ | ----------------- | ------------------- | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| **Desktop Environment** | Windows Shell                        | Aqua/Quartz       | GNOME (default)     | User choice (KDE, GNOME, Xfce, etc.) | User choice (KDE, GNOME, Xfce, etc.) | User choice (KDE, GNOME, Xfce, etc.) |
| **Window Manager**      | DWM (Desktop Window Manager)         | Quartz Compositor | Mutter (with GNOME) | Various (i3, KWin, etc.)             | Various (i3, KWin, etc.)             | Various (similar to Linux options)   |
| **Display Server**      | DirectX/Windows Display Driver Model | Quartz Compositor | Wayland or X11      | Wayland or X11                       | X11 (Wayland optional)               | X11                                  |

## Package and Software Management

| Component            | Windows                       | macOS                         | Ubuntu (Linux)               | Arch Linux  | Gentoo                                 | FreeBSD                     |
| -------------------- | ----------------------------- | ----------------------------- | ---------------------------- | ----------- | -------------------------------------- | --------------------------- |
| **Package Manager**  | Windows Store, MSI installers | App Store, Homebrew, MacPorts | APT (apt-get, apt)           | Pacman      | Portage (emerge)                       | pkg, ports collection       |
| **Package Format**   | MSIX, MSI, EXE                | DMG, PKG                      | DEB                          | PKG.TAR.ZST | Source code, EBUILDS                   | PKG, ports                  |
| **Software Updates** | Windows Update                | Software Update               | apt upgrade, Ubuntu Software | pacman -Syu | emerge --update --deep --newuse @world | freebsd-update, pkg upgrade |

## Core System Services

| Component             | Windows                    | macOS   | Ubuntu (Linux) | Arch Linux | Gentoo                               | FreeBSD         |
| --------------------- | -------------------------- | ------- | -------------- | ---------- | ------------------------------------ | --------------- |
| **Init System**       | Windows Services (wininit) | launchd | systemd        | systemd    | OpenRC (default), systemd (optional) | rc.d (BSD init) |
| **Service Manager**   | Service Control Manager    | launchd | systemd        | systemd    | OpenRC, systemd                      | rc.d            |
| **Device Management** | Device Manager, PnP        | IOKit   | udev           | udev       | eudev, udev                          | devd            |

## Security Components

| Component                  | Windows                    | macOS                  | Ubuntu (Linux)               | Arch Linux             | Gentoo                      | FreeBSD                       |
| -------------------------- | -------------------------- | ---------------------- | ---------------------------- | ---------------------- | --------------------------- | ----------------------------- |
| **User Permissions**       | User Account Control (UAC) | sudo, file permissions | sudo, file permissions       | sudo, file permissions | sudo, file permissions      | sudo, file permissions, jails |
| **Firewall**               | Windows Defender Firewall  | macOS Firewall (pf)    | UFW (Uncomplicated Firewall) | iptables, firewalld    | iptables, nftables          | pf, ipfw                      |
| **Application Sandboxing** | Windows Sandbox            | App Sandbox            | Snap confinement, Flatpak    | Flatpak                | SELinux (optional), Flatpak | jails, Capsicum               |

## Development and System Tools

| Component              | Windows                           | macOS                | Ubuntu (Linux)            | Arch Linux      | Gentoo                           | FreeBSD    |
| ---------------------- | --------------------------------- | -------------------- | ------------------------- | --------------- | -------------------------------- | ---------- |
| **Compiler Toolchain** | MSVC, MinGW, Clang                | Clang (Xcode)        | GCC, Clang                | GCC, Clang      | GCC, Clang (highly customisable) | Clang, GCC |
| **System Monitoring**  | Task Manager, Performance Monitor | Activity Monitor     | top, htop, System Monitor | top, htop       | top, htop, genlop                | top, htop  |
| **Virtualisation**     | Hyper-V                           | Hypervisor.framework | KVM, VirtualBox           | KVM, VirtualBox | KVM, VirtualBox                  | bhyve      |

## Networking

| Component           | Windows             | macOS                 | Ubuntu (Linux)         | Arch Linux             | Gentoo                       | FreeBSD                       |
| ------------------- | ------------------- | --------------------- | ---------------------- | ---------------------- | ---------------------------- | ----------------------------- |
| **Network Stack**   | Windows TCP/IP      | BSD socket API/Darwin | Linux networking stack | Linux networking stack | Linux networking stack       | BSD networking stack          |
| **Network Manager** | Network Connections | Network Preferences   | NetworkManager         | NetworkManager         | NetworkManager, netifrc      | rc.conf network config, netif |
| **DNS Resolution**  | DNS Client          | mDNSResponder         | systemd-resolved       | systemd-resolved       | resolvconf, systemd-resolved | unbound, BIND                 |

# History of Linux

Linux began with this message and now runs something like 90% of all computers in the world.

> "Hello everybody out there using minix - I'm doing a (free) operating system (just a hobby, won't be big and professional like gnu) for 386(486) AT clones."
>
> - 25th August 1991, when Linus Torvalds

Linux did not want the distro to be named after him, but a collaborator uploaded it to an FTP server under that name and the name stuck.

Technically speaking, "Linux" refers specifically to the kernel—the core component that manages system resources, facilitates communication between hardware and software, and provides essential services for computer programs. In discourse, Linux refers to Linux Operating Systems or distributions (distros). These package Linux and the GNU utils with whatever else the distro maker wants to make a complete computing environment.

# The History of Linux

## Genesis: From UNIX to Linux (1960s-1991)

### The UNIX Foundation

UNIX was first developed at AT&T's Bell Labs in 1969 by legendary computer scientists Ken Thompson and Dennis Ritchie. UNIX revolutionised computing with its portable design, multiuser capabilities, and philosophy of small, modular tools working together. However, as a proprietary system with restrictive licensing, UNIX remained inaccessible to many.

### The GNU Project

In 1983, Richard Stallman launched the GNU Project (recursive acronym GNU's Not UNIX) to create a completely free UNIX-like operating system (this is still an ongoing project they are trying to replace all of the Linux kernel; it's funny but useless). By 1990, GNU had developed most of the essential components needed for a complete operating system—compilers, text editors, shells, libraries—but did not have a kernel.

### Minix as Inspiration

Andrew Tanenbaum created MINIX in 1987 as a simplified UNIX-like system for teaching operating system principles. A young Finnish student named Linus Torvalds used MINIX whilst studying at the University of Helsinki, but was really pissed off with Tanenbaum's design choices and how limiting the system was.

## The Birth of Linux (1991)

On 25th August 1991, Linus Torvalds posted his now-famous message to the comp.os.minix newsgroup:

> "Hello everybody out there using minix - I'm doing a (free) operating system (just a hobby, won't be big and professional like gnu) for 386(486) AT clones."

Torvalds had begun by writing a terminal emulator to connect to the university's computers. This project gradually evolved into a kernel. He initially wanted to call his creation "Freax" (combining "free," "freak," and "UNIX"), but when his friend Ari Lemmke created a directory for it on the FTP server at the Helsinki University of Technology, he named it "Linux" without consulting Torvalds. Despite Torvalds' initial reluctance, the name stuck.

On 17th September 1991, Torvalds released Linux version 0.01, comprising 10,239 lines of code. In October, version 0.02 was released with the ability to run Bash and GCC (the GNU compiler for the C and C++), creating the first functional Linux system.

## The GNU/Linux Combination (1992-1993)

The marriage of the Linux kernel with GNU tools created a complete, free operating system. This symbiotic relationship led [Richard Stallman and the Free Software Foundation to advocate for the term "GNU/Linux"](https://www.gnu.org/gnu/linux-and-gnu.html).

Within the Linux community this has become somewhat of a meme; there is debate as to whether or not these were Stallman's words, but it pretty much is now.

> "I'd just like to interject for a moment. What you're referring to as **Linux**, is in fact, GNU/**Linux**, or as I've recently taken to calling it, GNU plus **Linux**. **Linux** is not an operating system unto itself, but rather another free component of a fully functioning GNU system made useful by the GNU corelibs, shell utilities and vital system components comprising a full OS as defined by POSIX." - Richard Stallman (Maybe)

In February 1992, Linux 0.12 was released under the GNU General Public License (GPL), ensuring the kernel would remain free and open-source. This crucial decision facilitated widespread collaboration and established the legal framework for Linux's development model.

## The Rise of Distributions (1992-1996)

Early Linux users faced complex installation processes, requiring manual configuration of every system component. This led to the creation of Linux distributions (distros), which packaged the kernel with other software, documentation, and installation tools. These included:

- **MCC Interim Linux** (1992): Created at Manchester Computing Centre, one of the first distributions
- **SLS (Softlanding Linux System)** (1992): Added the X Window System for graphical interfaces
- **Slackware** (1993): Created by Patrick Volkerding, the oldest continuously maintained distribution
- **Debian** (1993): Founded by Ian Murdock with a focus on community development and free software principles
- **Red Hat Linux** (1994): Founded by Marc Ewing and Bob Young, pioneering commercial Linux support
- **SUSE** (1994): Originally a German translation of Slackware, later developing its own identity

These were originally distributed by mail on USBs or floppy disks, but soon turned to being distributed by torrent or FTP.

## Technical Evolution (1994-2001)

Distros caused development on the kernel itself to rapidly increase.

- **Linux 1.0** (1994): The first "production-ready" version, supporting single-processor systems
- **Linux 1.2** (1995): Added support for more hardware architectures
- **Linux 2.0** (1996): Introduced multi-processor support (SMP) and improved networking
- **Linux 2.2** (1999): Enhanced support for multiple file systems and improved hardware compatibility
- **Linux 2.4** (2001): Added USB support, logical volume management, and improved SMP scalability

## Enterprise Adoption (1998-2003)

Several developments in the late 1990s facilitated Linux's growth in enterprise environments:

- **IBM's Support** (1998): IBM announced a $1 billion investment in Linux development
- **Oracle for Linux** (1998): Oracle released its database for Linux, legitimising it for business use
- **Red Hat's IPO** (1999): Red Hat went public, setting records for first-day gains
- **Founding of OSDL** (2000): The Open Source Development Labs (later the Linux Foundation) was created to accelerate enterprise Linux adoption
- **Enterprise Distributions** (2002-2003): Red Hat Enterprise Linux and SUSE Linux Enterprise Server established the enterprise Linux market

## Desktop Linux Developments (2000-2010)

Whilst Linux dominated the server market, efforts to make it user-friendly for desktop users accelerated:

- **GNOME 1.0** (1999) and **KDE 1.0** (1998): The major desktop environments matured
- **Ubuntu** (2004): Founded by Mark Shuttleworth, Ubuntu focused on user-friendliness and regular releases
- **Firefox** (2004): The Mozilla browser provided Linux users with a modern web experience
- **OpenOffice.org** (later LibreOffice): Provided essential productivity applications
- **Proprietary Software Support**: Software distributors began creating `apk` or `deb` or `rpm` releases for their software, or adding them directly to software repositories.

## Mobile and Embedded Linux (2007-Present)

Linux found tremendous success beyond traditional computing:

- **Android** (2008): Google's Linux-based mobile OS became the world's most widely used operating system
- **Chrome OS** (2011): Google's lightweight, Linux-based operating system for Chromebooks
- **Embedded Linux**: Powering routers, smart TVs, in-vehicle infotainment systems, and industrial controllers
- **Internet of Things**: Linux became the foundation for pretty much all IoT devices, i.e., thermostats, toasters, fridges or anything with 'smart' before it is running Linux.
- **Raspberry Pi** (2012): These low-cost, Linux-powered computers popularised tinkering and education

## The Cloud Revolution (2010-Present)

Linux became the dominant platform for cloud computing:

- **Amazon EC2** (2006): Built on a modified Red Hat Enterprise Linux
- **OpenStack** (2010): Open-source cloud platform primarily running on Linux
- **Docker** (2013): Containerisation technology built on Linux kernel features
- **Kubernetes** (2014): Container orchestration platform

## Linux now

Linux is everywhere in our lives, yet we don't even know it. From Torvalds' humble announcement to powering roughly 90% of the world's computing infrastructure (including Android devices, servers, supercomputers, embedded systems, desktops (now [4%](https://gs.statcounter.com/os-market-share/desktop/worldwide/)) and cloud platforms. What began as "just a hobby" has become the foundation of all modern digital infrastructure. The best thing about it is it is all open source and developed for the purpose of progressing humanity, not for profit.

Without Linux we would be decades behind in our technological growth and computing would only be for those who can afford it.

# The Linux Desktop

As it is systems which force immoral actions, not individuals, switching to Linux for your desktop is undoubtedly the correct "ethical" thing to do. I will write a longer piece on why later, but for now imagine it like going vegan, not using Amazon, buying fair trade coffee, recycling, donating to charity or voting. These are all things that have become supererogatory; no one is a moral saint, but we can make little consumer choices to help humanity reclaim its independence from the machine.

Beyond the morality of it, Linux is objectively a better operating system. In fact, most major developments in Windows and Mac have been designs that they stole from Linux distros. With Flatpak, Snap and Steam software support has become almost universal, even [PewDiePie has switched over](https://www.youtube.com/watch?v=pVI_smLgTY0).

Linux is also really fun to use, being able to contribute to something as well as tinker so that your computer is tailored to your needs. You can do some crazy things (check out [r/unixporn](https://www.reddit.com/r/unixporn/) for examples) and have access to the cutting edge of software.

# Actually Switching

First you need to backup any data that you want to bring over somewhere; this can be on a cloud service or on a USB/hard drive.

Next you want to choose a distro; this can be daunting because there are so many options. In general I recommend using [Distrochooser](https://distrochooser.de/) and following its recommendations.

I have run Linux since 2018 (7 years as of writing); these are all the distros I have used across my machines.

<script>
	import DistroMap from "../../../lib/components/blog/maps/distromap.svelte"
</script>

<DistroMap />

In my opinion I think everyone should start on an Ubuntu-based system. I recommend [Zorin OS](https://zorin.com/os/) or [Pop!\_OS](https://system76.com/pop/) for complete beginners. Both of these are made by really incredible companies and are fun and easy to use.

Once you get used to Linux and maybe delve into the command line a bit, you may find yourself wanting more control over the operating system. For that I would recommend just installing Arch or Gentoo. These are notoriously difficult tasks that people like to [brag about](https://knowyourmeme.com/memes/btw-i-use-arch), but will teach you everything about how an operating system works and what goes into making it.

After that [distro hop](https://www.reddit.com/r/DistroHopping/)! Try out a bunch of distributions and see what you like. You will find they are all really the same thing packaged differently; the only major difference is the package manager you use.

Debian systems will use `apt` or `dpkg` which I find very limiting, but make your own opinion. Red Hat-based systems use `dnf`, `rpm` or `yum`; these are really good as well and infinitely an upgrade from Debian systems.

Arch systems use `pacman` or the `AUR` which is my choice as it is the most complete. Valve agrees with me and uses it as the base for SteamOS. Nix is another fun one which allows you to write your entire operating system into one config file, meaning you can replicate it on a new computer in minutes. Gentoo is a pain as it mandates that you compile all the packages yourself; this takes a long time but decreases the bloat (amount of useless software on your computer) and tailors each package to your hardware so it is the most efficient it can be. Gentoo is also the backbone for Chrome OS. Void Linux allows you to use both pre-compiled and compile-yourself packages; it is a younger distro so software support is not as complete as Arch.

The other choice you will need to make is systemd vs OpenRC or another init system. Many are religiously anti-systemd, seeing it as old, rejecting the UNIX design principles and bloat (does too much). Personally I have used both and don't really care; I agree with them but systemd is more popular so I generally use it. Most distros will have a non-systemd alternative: Artix for Arch, Devuan for Debian etc. If this doesn't make sense it doesn't need to.

# TL;DR

Linux is cool, you should use it. Use [this](https://distrochooser.de/) to find which distro you should use and get started!
