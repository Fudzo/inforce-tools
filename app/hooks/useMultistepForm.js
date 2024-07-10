import { useState } from "react";

export function useMultistepForm(steps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    function next() {
        setCurrentStepIndex(i => {
            if(i >= steps.lenght - 1) {
                return i
            } else {
                return i + 1;
            }
        })
    }

    function back() {
        setCurrentStepIndex(i => {
            if(i <= steps.lenght - 1) {
                return i
            } else {
                return i - 1;
            }
        })
    }

    function goTo(index) {
        setCurrentStepIndex(index);
    }

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        next, 
        back,
        goTo
    }
}