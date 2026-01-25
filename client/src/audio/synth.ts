import * as Tone from 'tone';

// 1. Create the Synth (The "Instrument")
const synth = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: "sine" },
  envelope: {
    attack: 0.001,
    decay: 0.1,
    sustain: 0.1,
    release: 1.2
  }
}).toDestination();

// 2. Add Reverb (The "Space")
const reverb = new Tone.Reverb({ decay: 2, preDelay: 0.01 }).toDestination();
synth.connect(reverb);

// 3. The Function you call from React
export const playSound = async (note: string) => {
  if (Tone.getContext().state !== 'running') {
    await Tone.start();
  }
  
  synth.triggerAttackRelease(note, "8n");
};