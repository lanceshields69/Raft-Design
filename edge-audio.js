// Shared reveal behavior for the human and machine soundtrack tabs.
document.querySelectorAll('.edge-audio').forEach((group) => {
  const credit = group.querySelector('.edge-audio-credit');
  let lastInput = 'pointer';
  let touchExpanded = false;

  function expand() {
    group.classList.add('is-expanded');
    credit?.removeAttribute('inert');
  }

  function collapse() {
    group.classList.remove('is-expanded');
    credit?.setAttribute('inert', '');
  }

  document.addEventListener('keydown', () => { lastInput = 'keyboard'; });
  document.addEventListener('pointerdown', (event) => {
    lastInput = 'pointer';
    if (event.pointerType === 'touch') {
      if (group.contains(event.target)) {
        touchExpanded = true;
        expand();
      } else if (touchExpanded) {
        touchExpanded = false;
        collapse();
      }
    }
  });
  group.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') expand();
  });
  group.addEventListener('pointerleave', (event) => {
    if (event.pointerType !== 'mouse') return;
    if (lastInput === 'pointer' && group.contains(document.activeElement)) document.activeElement.blur();
    if (!group.contains(document.activeElement) && !touchExpanded) collapse();
  });
  group.addEventListener('focusin', expand);
  group.addEventListener('focusout', (event) => {
    if (!group.contains(event.relatedTarget) && !group.matches(':hover') && !touchExpanded) collapse();
  });
});
