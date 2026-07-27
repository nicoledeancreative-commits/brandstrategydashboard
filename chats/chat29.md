# Export screenshot format issue

_Started 2026-07-21 10:23 UTC_

---

## User

When I export this as a PDF or PNG. I am expecting to basically be getting a full page screenshot of the live preview.

## Assistant

_[tool: read_file]_

_[tool: grep]_

_[tool: grep]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: eval_js]_

_[tool: screenshot]_

_[tool: grep]_

_[tool: read_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: grep]_

Method is `addToast`, not `pushToast` — fix.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now let's test the export flow live.

_[tool: ready_for_verification]_

## User

Found issues — fixing…

## Assistant

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

## User

They're close but the logos are stretched and the image quality isn't good. Can we increase it?

## Assistant

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

_[tool: read_file]_

_[tool: grep]_

_[tool: grep]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

## User

There's quite a few errors here. This is for both outputs

## User

There's quite a few errors here. This is for both outputs

## User

Found issues — fixing…

## Assistant

Switching to an `onclone` hook so html2canvas hides the slots in its cloned document instead of relying on live style mutation.

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

## User

Found issues — fixing…

## Assistant

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

## User

Found issues — fixing…

## Assistant

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

## User

Found issues — fixing…

## User

Found issues — fixing…

## Assistant

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: screenshot]_

Found it — root-caused by direct pixel inspection of the actual exported PNG (screenshot above confirms the raw logo asset renders bleeding across the whole card and into the section below). The blank-src trick didn't stop it, meaning html2canvas isn't sourcing the broken render from the `src` attribute at all. Switching to fully detaching the `<img>` node from the shadow DOM during capture (not just clearing its src) so there's nothing for html2canvas to mis-render, then reinserting it after.

_[tool: eval_js]_

_[tool: dc_js_str_replace]_

Now let me verify this actually fixes it before shipping, using the same real-export pixel inspection.

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: get_webview_logs]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: dc_js_str_replace]_

Now let's re-verify with the real export pixel inspection before shipping.

_[tool: show_html]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: get_webview_logs]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

Let's try html2canvas's native `ignoreElements` option — cleaner than DOM surgery and should avoid whatever's causing these hangs.

_[tool: eval_js]_

_[tool: show_html]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: screenshot]_

_[tool: eval_js]_

The fix works — confirmed visually on the isolated card capture (clean logo, no bleed). Now confirming the full-page export completes and matches.

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

Completed in under two minutes. Let's verify the primary-logo region in the actual full export output.

_[tool: eval_js]_

_[tool: screenshot]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: screenshot]_

`ignoreElements` cleanly blanks the slot with zero bleed. Switching to that — simpler and reliable.

_[tool: eval_js]_

_[tool: dc_js_str_replace]_

Now testing the full export end-to-end with this fix before shipping.

_[tool: show_html]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

Completed in under a minute. Now inspecting the actual output.

_[tool: eval_js]_

_[tool: screenshot]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: screenshot]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: screenshot]_

_[tool: eval_js]_

_[tool: grep]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: show_html]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: get_webview_logs]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: write_file]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: delete_file]_

_[tool: ready_for_verification]_

Fix is in place — switched to html2canvas's `ignoreElements` to skip the broken shadow-DOM image rendering entirely, verified clean (no bleed) in multiple direct isolated tests against the real capture root at both scale 1 and 2. My test tab hit an infra hiccup on the final end-to-end re-check, so the background verifier (fresh tab) will confirm; will fix if it reports anything.

## User

Found issues — fixing…

## Assistant

_[tool: read_file]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: get_webview_logs]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: show_html]_

_[tool: read_file]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: get_webview_logs]_

_[tool: run_script]_

_[tool: sleep]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

The preview infrastructure itself is currently failing to load — not just for me, the verifier hit the identical "iframe never loads" symptom in its own independent session. I checked the file for a code-level cause (balanced braces, no loops added, hot-reload never errored) and found nothing; a blank scratch test file failed to load too, pointing to a transient platform issue rather than a regression in this file.

Status: the `ignoreElements` fix for the export bleed was verified clean in 3 separate direct isolated tests (including against the real full capture root at scale 2, zero bleed) before this infra hiccup started. That fix is in place and unchanged. I can't get a live reload to re-confirm end-to-end right now — will retry once the preview comes back up.

