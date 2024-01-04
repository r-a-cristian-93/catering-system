let scrollY: number = 0;

export function pageScrollBlock(): void
{
    scrollY = document.documentElement.scrollTop;
    const body = document.body;
    // body.style.position = 'fixed';
    // body.style.overflow = 'scroll';

    document.body.className = "block-scroll";

    body.style.top = `-${scrollY}px`;
}

export function pageScrollUnblock(): void
{
    document.body.className = "";

    const body = document.body;
    // body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, scrollY);
}