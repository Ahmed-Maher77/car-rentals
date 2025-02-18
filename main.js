const desktopNav = document.querySelector('.desktop-nav');
const triggerNavBtn = document.querySelector('.mobile-nav > span');

triggerNavBtn.addEventListener('click', () => {
    desktopNav.classList.toggle('active');
  });

document.addEventListener('click', (e) => {
    console.log('Clicked element:', e.target);
    console.log('Is inside desktopNav?', desktopNav.contains(e.target));
    console.log('Is active?', desktopNav.classList.contains('active'));

    if (!desktopNav.contains(e.target) && desktopNav.classList.contains('active') && e.target!== triggerNavBtn) {
        console.log('Closing nav...');
        desktopNav.classList.remove('active');
    }
});


