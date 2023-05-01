export default function createElement(el, className, ...attributes) {
  const component = document.createElement(el);
  if (className) component.classList.add(className);

  if (attributes.length) {
    attributes.forEach(([name, value]) => {
      component.setAttribute(name, value);
    });
  }
  return component;
}
