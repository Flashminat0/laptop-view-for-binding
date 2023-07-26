import React, {useEffect, useRef, useState} from 'react';
import Link from "next/link";
import html2canvas from "html2canvas";

const Bind = () => {

    // [1,0,1,1,0,0] - should be random and 1 amd 0 should be random
    const randomSequence = (): number[] => {

        const sequence = [1, 0, 1, 1, 0, 0];
        const iterations = 6;

        for (let i = 0; i < iterations; i++) {
            const random = Math.floor(Math.random() * 2);
            sequence[i] = random;
        }

        return sequence;

    }

    const [sequence, setSequence] = useState<number[]>(randomSequence());
    const [sequence2, setSequence2] = useState<number[]>(sequence);
    const [redo, setRedo] = useState<boolean>(false);

    useEffect(() => {
        setSequence(randomSequence());
    }, [redo]);

    const flip = () => {
        const newSequence = [...sequence];

        for (let i = 0; i < newSequence.length; i++) {
            newSequence[i] = newSequence[i] === 0 ? 1 : 0;
        }

        setSequence(newSequence);
    }


    useEffect(() => {
        setTimeout(() => {
            setSequence2(randomSequence());
        }, 1)
    }, [redo]);

    const checkIfReallyRandom = () => {
        let count = 0;
        for (let i = 0; i < sequence.length; i++) {
            if (sequence[i] === 1) {
                count++;
            }
        }

        if (count !== 3) {
            setSequence(randomSequence());
        }
    }

    useEffect(() => {
        checkIfReallyRandom();
    }, [sequence]);


    const ref = useRef(null);
    const exportAsImage = async () => {
        // @ts-ignore
        const canvas = await html2canvas(ref.current);
        const image = canvas.toDataURL("image/png", 1.0);

        console.log(image);
    };


    useEffect(() => {
        setTimeout(() => {
            exportAsImage();
        }, 1000)
    }, [sequence]);

    return (
        <div
            id={'bind'}
            ref={ref}
            className={`relative h-screen w-screen`}>
            <div className={`h-screen w-screen grid grid-cols-3 grid-rows-2 overflow-hidden`}>
                {sequence.map((item, index) => <>
                    <div
                        key={index}
                        onClick={flip}
                        className={`w-0 h-0
                    ${item === 0 ? `border-l-[280px] border-l-transparent
                                    border-t-[900px] border-t-black
                                    border-r-[280px] border-r-transparent
                                    ${sequence2[index] === 0 && 'rotate-180 scale-150'}
                                    ${sequence2[Math.floor(index / 2)] === 1 && 'rotate-90'}
                                    ` : 'bg-white'} 
                   `}>
                    </div>
                </>)}
            </div>
            <div
                className={`absolute top-[35vh] left-[19vw] pb-4 m-2 rounded-md border-[20px] border-black text-9xl scale-150 font-bold bg-white text-black`}>
                <span
                    className={`cursor-default scale-150 tracking-widest text-transparent`}>
                    {sequence.toString()
                        .replaceAll(',', '')
                        .replaceAll('0', ' / ')
                        .replaceAll('1', ' ]')}
                </span>
            </div>
            <Link href={'/dashboard'}>
                <div
                    className={`cursor-pointer absolute top-[1vh] left-[2vw] m-2 border-black text-3xl scale-150 font-bold bg-white text-black`}>
                    {'<'} Go Back
                </div>
            </Link>
            <div
                onClick={() => setRedo(!redo)}
                className={`cursor-pointer absolute bottom-[1vh] right-[2vw] m-2 border-black text-3xl scale-150 font-bold bg-white text-black`}>
                Regenerate
            </div>

        </div>
    );
};

export default Bind;