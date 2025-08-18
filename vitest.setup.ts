import '@testing-library/jest-dom';

// Stub ResizeObserver (used by Recharts / responsive containers)
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
// @ts-expect-error attach to window
if (!globalThis.ResizeObserver) {
  // @ts-expect-error
  globalThis.ResizeObserver = MockResizeObserver as any;
}

// Stub getBBox for SVG elements (used by Recharts)
// @ts-expect-error override prototype for jsdom
if (!SVGElement.prototype.getBBox) {
  // @ts-expect-error jsdom
  SVGElement.prototype.getBBox = () => ({ x: 0, y: 0, width: 100, height: 20 });
}
