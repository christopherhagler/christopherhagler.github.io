# Building a Coffee-Can Radar

A radar feels like it should be a serious piece of hardware. It turns out you
can build one that measures both **range** and **speed** out of two metal cans,
a few RF modules, and the microphone input on a laptop. The design comes from
MIT's open courseware project, and rebuilding it is one of the best ways I know
to make signal processing feel real.

## The idea

The radar transmits a continuous wave and listens for the echo. Two coffee cans
act as cantenna horns — one to transmit, one to receive. The interesting part
is what happens *between* the transmitted signal and the echo.

There are two modes:

- **Doppler mode** — transmit a constant tone. A moving target shifts the echo
  in frequency. Mix the echo with the transmitted signal and the difference
  *is* the Doppler frequency, which maps directly to velocity.
- **Ranging mode (FMCW)** — sweep the transmit frequency linearly in time (a
  *chirp*). By the time the echo returns, the transmitter has moved on to a new
  frequency. The gap between "what we're sending now" and "what's coming back"
  is proportional to the round-trip time — and therefore the distance.

## Why mixing is the whole trick

The receiver multiplies the echo by the transmitted signal. Multiplying two
sinusoids produces sum and difference frequencies; a low-pass filter throws away
the sum and keeps the difference. That difference — the **beat frequency** — is
small enough to land in the audio band, which is why a sound card can digitize
it. You are quite literally listening to radar.

For an FMCW chirp of bandwidth `B` over time `T`, a target at range `R` produces
a beat frequency:

```
f_beat = (2 * B * R) / (c * T)
```

Run an FFT over one chirp and each peak is a target; the peak's frequency tells
you how far away it is.

## Turning samples into a picture

Ranging gets powerful when you stack chirps. Lay each chirp's FFT as a row and
you get a **range vs. time** image — a waterfall where approaching objects trace
diagonal lines. Process across rows instead and you recover Doppler. That
two-dimensional view (range–Doppler) is the foundation that real radar
processing builds on, just with far more bandwidth and far better front ends.

## What it teaches

The build is cheap, but the lessons transfer directly to serious work:

- Mixing down to baseband is how you make an impossible sampling problem
  tractable.
- The FFT is not abstract — its bins are literally meters and meters-per-second.
- Windowing, sample rate, and chirp linearity all show up as artifacts you can
  see and hear.

If you want to understand radar, don't start with the math. Build the cans,
point them at a passing car, and watch the peak move.
