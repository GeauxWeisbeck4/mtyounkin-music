import {InoteAndCent} from '../interfaces/calcluteNote';

const notes: Array<string> = [
    'A',
    'A#',
    'B',
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
];

const startFrequency: number = 27.5; // A0

const ln2: number = Math.log(2);

const getNextNote = (frequency: number): number => frequency * Math.pow(2, 1/12); 

const getCent = (noteFrequency: number, measuredFrequency: number): number => 1200 * Math.log(measuredFrequency / noteFrequency) / ln2;

export const getClosestNoteAndCent = (frequency: number): InoteAndCent => {
    if (!frequency) return null;
    let currentA = startFrequency;
    while (currentA < frequency) {
        currentA *= 2;
    }
    let index: number = 0;
    let lowerFrequency: number = currentA / 2;
    let upperFrequency: number = getNextNote(lowerFrequency);

    while (!(lowerFrequency < frequency && frequency < upperFrequency)) {
        lowerFrequency = upperFrequency;
        upperFrequency = getNextNote(lowerFrequency);
        index++;
    }
    const lowerCent: number = getCent(lowerFrequency, frequency);
    const upperCent: number = getCent(upperFrequency, frequency);
    const takeLower: boolean = lowerCent < Math.abs(upperCent);
    if (takeLower) index--;
    return {
        note: notes[index],
        cent: takeLower
            ? lowerCent
            : upperCent,
    };
};
