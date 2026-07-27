# Logo upload workflow issue

_Started 2026-07-06 12:51 UTC_

---

## User

Ok, I'm seeing a problem. Whatever I upload to the Primary Logo area NEEDS to be shown as an image output in the stress test. I DO NOT want to upload each image on the stress test

## Assistant

_[tool: grep]_

_[tool: read_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: str_replace_edit]_

Now update the DC's logic to use this store instead of the broken localStorage sync.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now let's verify it loads and works.

_[tool: ready_for_verification]_

Fixed: the sync was reading/writing `localStorage`, but `image-slot` actually stores images in an in-memory + sidecar-file store, so nothing ever synced. I added a small `window.ImageSlotStore` API to image-slot.js and wired the dashboard to mirror the Primary Logo upload into all stress-test slots automatically (and made those slots read-only so they can't be edited directly, only mirrored).

## User

Found issues — fixing…

## Assistant

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

Fixed: now polls for `ImageSlotStore` until image-slot.js finishes loading before attaching the sync subscription.

## User

Add a section in the Stress Test under Squares that says "Favicons" 

then show a 16x16px placeholder slot and a 32x32px placeholder slot. 

Then, in the form, under Primary Logo, add Favicon * with an uploader that allows jpg png and svg please

## Assistant

_[tool: read_file]_

Good — image-slot already accepts png/jpg/svg by default, so a plain image-slot works for the favicon uploader.

_[tool: str_replace_edit]_

Now the stress test squares section in the output preview.

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

Added a Favicon uploader (PNG/JPG/SVG) under Primary Logo, and a "Favicons" row under the Square stress test showing it at 16px and 32px — auto-mirrored from the upload, same as the logo stress test.

## User

Amazing! Now, please just ensure the uploader is centered and responsive like the Primary Logo. It's off center currently

## Assistant

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

Fixed — favicon uploader now matches Primary Logo's width (241px), so it centers the same way. (The adherence warning is on the archived old file, not the active one — safe to ignore.)

