export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

  if (block.closest('.think-equity-container')) {
    Array.from(block.children).forEach((el, index) => {
      el.classList.add(`collist${index + 1}`);
      Array.from(el.children).forEach((elsub) => {
        elsub.classList.add('subcollist');
      });
    });
  }
}
