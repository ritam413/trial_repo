import Lenis from "lenis";

// Mock minimal window and document
global.window = {
  scrollY: 100,
  pageYOffset: 100,
  innerHeight: 800,
  addEventListener: () => {},
  removeEventListener: () => {},
  matchMedia: () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }),
  scrollTo: (x, y) => {
    if (typeof x === 'object') y = x.top;
    global.window.scrollY = y;
    global.window.pageYOffset = y;
  }
};
global.document = {
  documentElement: {
    scrollTop: 100,
    scrollHeight: 5000,
    clientHeight: 800
  },
  body: {
    scrollHeight: 5000
  },
  querySelector: () => null
};

const lenis = new Lenis({
  duration: 2.5,
  lerp: 0.03,
  smoothWheel: true,
  autoRaf: false
});

console.log("Initial actualScroll:", lenis.actualScroll, "targetScroll:", lenis.targetScroll, "animatedScroll:", lenis.animatedScroll);

lenis.scrollTo(1000, { immediate: true });
console.log("After immediate scrollTo(1000):");
console.log("actualScroll:", lenis.actualScroll, "targetScroll:", lenis.targetScroll, "animatedScroll:", lenis.animatedScroll);

// Now simulate next raf tick:
lenis.raf(100);
console.log("After raf(100):");
console.log("actualScroll:", lenis.actualScroll, "targetScroll:", lenis.targetScroll, "animatedScroll:", lenis.animatedScroll);
console.log("window.scrollY:", global.window.scrollY);
