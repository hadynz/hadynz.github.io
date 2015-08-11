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

Being a tech enthusiast living on the bleeding edge, my dad wanted to do a clean install of Windows 10 on his Surface Pro 3
instead of upgrading from his current version of Windows 8.1. This simple task ended up frustrating the both of us because
of the various hoops that we had to solve on the way.

To summarise, the main challenges were:

1. Surface can only boot from a USB that is formatted with FAT32
2. The downloaded Windows 10 ISO file (downloaded via Microsoft's [media creation tool][3]) is only compatible with a NTFS formatted
USB drive by most ISO-to-USB tools
3. Knowing how to force a Surface to boot from USB

Having eventually been successful in the clean install, here is a walkthrough of what we ended up doing:

### Step 1: Download Windows 10 ISO
Using the [media creation tool][3], choose to download Windows 10 to an ISO file instead of running an immediate upgrade.

### Step 2: Extract ISO to USB
Creating a bootable USB drive from the downloaded Windows 10 ISO using a tool such as [Windows 7 USB DVD Download Tool][1]
will not work out of the box. That's because the tool ends up (*always*) creating a bootable USB drive formatted with NTFS 
which is not compatible with the Surface Pro that expects a UEFI boot device; i.e. one that is formatted with FAT32 and not 
NTFS.

The workaround that ended up working for us is manually extracting the ISO to a USB that is formatted with FAT32.

1. Format a USB drive with FAT32
2. Mount the Windows 10 ISO file or manually extract the file to disk
3. Manually copy the extracted ISO files to the USB drive

### Step 3: Disable BitLocker drive encryption
Attempting to format your primary drive and do a clean install when running on Windows 7/8/10 can frequently fail because
the latter encrypts your drive by default with BitLocker encryption for additional security. So you will need to check
and disable BitLocker for your drive if its turned on.

To decrypt your primary drive and all your files, goto "Control Panel > System and Security > BitLocker Drive Encryption" 
and choose to "Turn off BitLocker". This process could very well take a good 5 to 10 minutes.

### Step 4: Booting Surface from USB
Now that you have a bootable Windows 10 USB drive formatted with FAT32, your last step is to boot your Surface from USB
and go through the standard Windows setup installation.

As per [Microsoft's instructions][2], to start the Surface from a USB drive follow the following steps:

1. Insert a Windows 10 bootable USB drive into the USB port on your Surface
2. Press and hold the volume-down button
3. Press and release the power button
4. When the Surface logo appears, release the volume-down button

Surface should boot Windows 10 installation from your USB drive and hopefully you are now well on your way to start 
clean installation of this fantastic OS that is apparently the [last of its kind][4].

[1]: https://www.microsoft.com/en-us/download/windows-usb-dvd-download-tool
[2]: https://www.microsoft.com/surface/en-nz/support/storage-files-and-folders/boot-surface-from-usb-recovery-device
[3]: http://windows.microsoft.com/en-us/windows-10/media-creation-tool-install
[4]: http://www.theverge.com/2015/5/7/8568473/windows-10-last-version-of-windows
