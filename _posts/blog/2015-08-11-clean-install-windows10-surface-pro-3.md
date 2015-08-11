---
layout: posts
title: "Clean install Windows 10 on Surface Pro 3"
description: "A guide on installing a fresh version of Windows 10 on Surface Pro 3 via USB"
keywords: "surface, windows, windows10, usb, recovery, clean"
date: 2015-08-11 21:45
categories: ['blog']
comments: true
meta: true
---
So Windows 10 has just been released to the masses with a promise to undo all the problems that plagued its predecessor - 
Windows 8.

Being an owner of a Surface that is in seldom use, I immediately wanted to do a clean install of Windows 10 instead of
an upgrade from my current version of Windows 8.1. This simple task turned out to be non-trivial and was an incredibly
frustrating experience. The main challenges were:

1. Surface can only boot from a USB that is formatted with FAT32
2. The Windows 10 ISO file (downloaded via Microsoft's [media creation tool][3]) is only compatible with a NTFS formatted
USB drive by most ISO-to-USB tools
3. Knowing how to force a Surface to boot from USB

Here is a complete walkthrough of how I successfully ended up doing a clean install after prolongued trial and error.

### Step 1: Download Windows 10 ISO
Download Windows 10 ISO

### Step 2: Extract ISO to USB
The problem: Using a tool such as [Windows 7 USB DVD Download Tool][1] will create a bootable USB drive using NTFS. 
However, because the Surface Pro expects a UEFI boot device, that means it can only work with a USB that is formatted 
with FAT32 and not NTFS.

Solution: 
1. Format a USB drive with FAT32
2. Mount the Windows 10 ISO file or manually extract the file to disk
3. Manually copy the extracted ISO files to the USB drive

### Step 3: Disable BitLocker drive encryption
Because you are wanting to clean install Windows 10 and format your primary drive clean in the process, you need to ensure
that your drive is not encrypted with Bitlocker.

To decrypt your drive and all your files, goto "Control Panel > System and Security > BitLocker Drive Encryption" and choose to "Turn off BitLocker". This process could very well take a good 5 to 10 minutes.

### Step 4: Booting Surface from USB
As per [Microsoft's instructions][2], to start the Surface from a USB drive follow the following steps:

1. Insert a Windows 10 bootable USB drive into the USB port on your Surface
2. Press and hold the volume-down button
3. Press and release the power button
4. When the Surface logo appears, release the volume-down button

Surface should boot Windows 10 installation from your USB drive.

[1]: https://www.microsoft.com/en-us/download/windows-usb-dvd-download-tool
[2]: https://www.microsoft.com/surface/en-nz/support/storage-files-and-folders/boot-surface-from-usb-recovery-device
[3]: http://windows.microsoft.com/en-us/windows-10/media-creation-tool-install
