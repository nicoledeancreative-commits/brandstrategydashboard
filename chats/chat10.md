# PNG transparency background issue

_Started 2026-07-05 23:21 UTC_

---

## User

When I upload an image, the uploaded image is shown over a light gray background. if I upload a PNG, I expect not to see a background where my image is

## Assistant

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

The `.frame` background (`rgba(0,0,0,.04)`) always shows — including behind transparent PNG areas. I'll make it disappear once filled.

_[tool: dc_js_str_replace]_

_[tool: str_replace_edit]_

Fixed — the faint gray placeholder background now clears once an image is dropped in, so transparent PNGs show as transparent.

_[tool: ready_for_verification]_

Done — transparent PNGs will no longer show a gray backdrop in the image slots.

## User

Please center the logo in the top field. 

KEEP logo upload functionaloty in secton 3 AS IS but  allow me to upload a separate file on the top logo

## Assistant

_[tool: grep]_

_[tool: read_file]_

This is the "1. Logo" preview sheet at the top of the right panel — it currently shares `id="brand-logo"` with Section 3's upload (same image). I'll give it its own separate id, and center it (it's already flex-centered, but the inner box is fixed at 1000px wide within an 85% wrapper — I'll center that properly too).

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

Done — the top "1. Logo" preview now uses its own upload slot (`top-logo`), independent from Section 3's `brand-logo`, and is centered within its sheet.

## User

please center this logo

## Assistant

_[tool: grep]_

_[tool: grep]_

_[tool: str_replace_edit]_

_[tool: show_html]_

_[tool: ready_for_verification]_

Fixed — the logo upload box is now centered within the top logo field.

