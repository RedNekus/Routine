window.onload = function(){
    let main = document.querySelector('.js-main');
    let list = document.querySelectorAll('.js-list [data-item]');
    let num = 0;
    let scrollStep = (document.documentElement.scrollHeight - document.documentElement.clientHeight)/(list.length + 1) - 4;
    let lastScrollPosition = 0;

    const moveListItem = (i) => {
        let rotate = (i + 2)*22.5 - 180;
        animate({
            duration: 1000,
            timing: function(timeFraction) {
                return 1 - Math.sin(Math.acos(timeFraction));
            },
            draw: function(progress) {
                list[i].style.transform = 'translate(calc(643px * sin(' + rotate * progress + 'deg) - 100% + 54px), calc(643px * cos(' + rotate * progress + 'deg) - 50%))';
                list[i].style.opacity = progress;
            }
        });
        setTimeout( () => {
            list[i].classList.add('is-show');
            list[i].removeAttribute('style');
        }, 1100);
    }

    const toggleList = (i) => {
        let lastItem = i > 0? i - 1 : list.length - 1;
        list[lastItem].classList.remove('is-show');
        animate({
            duration: 1000,
            timing: function(timeFraction) {
                return 1 - Math.sin(Math.acos(timeFraction));
            },
            draw: function(progress) {
                list[i].style.transform = 'translate(calc(250px * sin(-' + 90 * progress + 'deg) - 100% + 28px), calc(250px * cos(-' + 90 * progress + 'deg) - 50%))';
                list[i].style.opacity = progress;
            }
        });
        setTimeout( () => {
            list[i].classList.add('is-show');
            list[i].removeAttribute('style');
        }, 1100);
    }

    window.scroll(0,0);
    main.classList.add('is-show');

    if(document.documentElement.clientWidth >= 1440) {
        window.addEventListener('scroll', () => {
            if(window.scrollY - lastScrollPosition > scrollStep && num < list.length) {
                moveListItem(num);
                num++;
                lastScrollPosition = window.scrollY;
            }
        });
    } else {
        let arrow = document.querySelector('.js-arrow');
        arrow.addEventListener('click', () => {
            toggleList(num);
            num++;
            num %= list.length;
        });
        arrow.click();
    }
}

function animate({duration, draw, timing}) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;
        let progress = timing(timeFraction)
        draw(progress);
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}