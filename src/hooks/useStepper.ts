import { useState, useEffect, useMemo } from "react";

type UseStepperReturn<T> = {
  currentValue: T;
  currentCount: number;
  isRunning: boolean;
  toggleRunning: () => void;
  stepTo: (index: number) => void;
};

type UseStepperOptions = {
  countDelay?: number; // (eg) The delay between each count step of the stepInterval.
  countDirection?: "up" | "down";
  indexDirection?: "ascend" | "descend";
};

type UseStepperProps<T> = {
  values: T[];
  countInterval: number; // (eg) Count 100 for every interval.
  options?: UseStepperOptions;
};

export function useStepper<T>(args: UseStepperProps<T>): UseStepperReturn<T> {
  const { values, countInterval, options = {} } = args;
  const {
    countDelay = 1000,
    countDirection = "down",
    indexDirection = "ascend",
  } = options;

  // Memoized count direction config to avoid recalculating on every render.
  const countDirectionConfig = useMemo(() => {
    const initialState = {
      down: {
        startAt: countInterval,
        endAt: 0,
        increment: -1,
      },
      up: {
        startAt: 0,
        endAt: countInterval,
        increment: +1,
      },
    };
    return initialState[countDirection] || initialState.down;
  }, [countDirection, countInterval]);

  const [valueIndex, setValueIndex] = useState(() => {
    return indexDirection === "ascend" ? 0 : values.length - 1;
  });
  const [count, setCount] = useState(countDirectionConfig.startAt);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      const { endAt, increment, startAt } = countDirectionConfig;

      // Update count and handle boundaries
      setCount((prevCount) => {
        if (prevCount === endAt) {
          return startAt; // Reset count
        }
        return prevCount + increment;
      });
    }, countDelay);

    return () => clearInterval(timer);
  }, [countDelay, countDirectionConfig, isRunning, values.length]);

  // Separate effect to update the index when count hits the boundary (endAt)
  useEffect(() => {
    if (count === countDirectionConfig.startAt) {
      setValueIndex((prevIndex) => {
        if (indexDirection === "ascend") {
          return prevIndex < values.length - 1 ? prevIndex + 1 : 0;
        } else {
          return prevIndex !== 0 ? prevIndex - 1 : values.length - 1;
        }
      });
    }
  }, [count, countDirectionConfig.startAt, indexDirection, values.length]);

  const toggleRunning = () => setIsRunning((prev) => !prev);
  const stepTo = (index: number) => setValueIndex(index);

  return {
    currentValue: values[valueIndex],
    currentCount: count,
    isRunning,
    toggleRunning,
    stepTo,
  };
}
