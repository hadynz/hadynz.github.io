---
layout: posts
title: "Clean installing Windows 10 on Surface Pro 3"
description: "A guide on installing a fresh version of Windows 10 on Surface Pro 3 via USB"
keywords: "surface, windows, windows10, usb, recovery, clean"
date: 2015-08-11 21:45
categories: ['blog']
comments: true
meta: true
---

What are we trying to do?

Clean install a Windows 8.x or Windows 10 installation by using USB.

Download Windows 10 ISO

## Burn to USB
The problem: Using a tool such as [Windows 7 USB DVD Download Tool][1] will create a bootable USB drive using NTFS. 
However, because the Surface Pro expects a UEFI boot device, that means it can only work with a USB that is formatted 
with FAT32 and not NTFS.

Solution: 
1. Format a USB drive with FAT32
2. Mount the Windows 10 ISO file or manually extract the file to disk
3. Manually copy the extracted ISO files to the USB drive

## Bitlocker - disable drive encryption
Because you are wanting to clean install Windows 10 and format your primary drive clean in the process, you need to ensure
that your drive is not encrypted with Bitlocker.

To do, goto "Control Panel > System and Security > BitLocker Drive Encryption" and choose to "Turn off BitLocker".

## Booting Surface from USB
As per [Microsoft's instructions][2], to start the Surface from a USB drive follow the following steps:

1. Insert a USB recovery drive into the USB port on your Surface.
2. Press and hold the volume-down button.
3. Press and release the power button.
4. When the Surface logo appears, release the volume-down button.

Surface will start the software on your USB drive.

[1]: https://www.microsoft.com/en-us/download/windows-usb-dvd-download-tool
[2]: https://www.microsoft.com/surface/en-nz/support/storage-files-and-folders/boot-surface-from-usb-recovery-device
