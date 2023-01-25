import { s as sleep, r as rng, b as runOnEveryParentUntil } from "./animationSetup.js";
const typingInterval = async (interval) => sleep(Array.isArray(interval) ? interval[rng(0, interval.length)] : interval);
const writeEffect = async ({ currentNode, text }, options) => {
  runOnEveryParentUntil(currentNode, options.parentElement, (element) => {
    const classToAdd = currentNode === element ? "typing" : "finished-typing";
    element.classList.add(classToAdd);
  });
  for (let index = 0; index <= text.length; index++) {
    const char = text[index];
    char === "<" && (index = text.indexOf(">", index));
    currentNode.innerHTML = text.slice(0, index);
    await typingInterval(options.interval);
  }
};
export {
  typingInterval as t,
  writeEffect as w
};
