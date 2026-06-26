# CFAR Detection, Intuitively

After you've turned radar returns into a range–Doppler map, you face a deceptively
simple question: **which cells are targets and which are just noise?** The naive
answer — pick a fixed threshold and call anything above it a detection — fails
almost immediately in the real world. CFAR is the fix.

## Why a fixed threshold breaks

Noise in a radar isn't constant. It rises near strong clutter, climbs with
interference, and drifts with the environment. Set the threshold low and you
drown in false alarms the moment the noise floor lifts. Set it high and you miss
real targets when the floor is quiet.

What you actually want to hold constant isn't the threshold — it's the **false
alarm rate**. That's the whole idea behind **CFAR: Constant False Alarm Rate**.

## Estimate the noise, locally

Instead of one global threshold, CFAR estimates the noise *around each cell* and
sets the threshold relative to that local estimate. The classic version,
**Cell-Averaging CFAR (CA-CFAR)**, slides a window across the data:

- The **cell under test (CUT)** is the one we're deciding on.
- A few **guard cells** on each side are ignored, so a strong target can't leak
  energy into its own noise estimate.
- The **training cells** beyond the guards are averaged to estimate the local
  noise power.

The threshold becomes:

```
threshold = alpha * (average noise power in training cells)
```

where `alpha` is a scaling factor chosen from the number of training cells and
the false-alarm rate you're willing to tolerate. Declare a detection when the
CUT exceeds it.

## The tradeoffs that matter

CA-CFAR is elegant, but the assumptions leak:

- **Multiple targets**: if a second target sits in the training window, it
  inflates the noise estimate and *masks* the target you care about. **GO-CFAR**
  (greatest-of) and **SO-CFAR** (smallest-of) split the window to cope.
- **Clutter edges**: at the boundary between clear sky and heavy clutter, the
  averaging straddles two worlds and the false-alarm rate spikes. **OS-CFAR**
  (ordered-statistic) uses a ranked value instead of the mean to stay robust.
- **Window size**: more training cells means a smoother noise estimate but worse
  resolution near edges. It's a bias–variance tradeoff in disguise.

## Why it's worth understanding

CFAR is where statistics meets engineering pragmatism. You're not trying to be
optimal in some abstract sense — you're trying to keep a promise to the operator:
*the false alarms per scan will stay roughly fixed no matter what the
environment does.* Once that clicks, a lot of detection literature stops looking
like a zoo of acronyms and starts looking like variations on one good idea:
**measure the noise where you stand, then decide.**
