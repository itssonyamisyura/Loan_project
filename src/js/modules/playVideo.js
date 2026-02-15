export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this); //Bind создаёт новую функцию, в которой this навсегда закреплён.
    }

    bindTriggers() {
        this.btns.forEach((btn, i) => {
           try { const blockedElem = btn.closest('.module__video-item').nextElementSibling; //each btn/ i - num of btn
            if (i % 2 == 0) {
                blockedElem.setAttribute('data-disabled', 'true');
            }} catch(e){}


            btn.addEventListener('click', () => {
                // if block is not blocked
                if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') { 
                    this.activeBtn = btn; // btn user clicked

                    if (document.querySelector('iframe#frame')) {
                        this.overlay.style.display = 'flex';  
                        if (this.path !== btn.getAttribute('data-url')) {
                            this.path = btn.getAttribute('data-url');
                            this.player.loadVideoById({videoId: this.path}); // upload new video
                        }
                    } else {
                        this.path = btn.getAttribute('data-url');
    
                        this.createPlayer(this.path);
                    }
                }
            });
        });
    }

    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';

            // we also need to stop(pause) a video
            this.player.pauseVideo();
        });
    }

    createPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
            events: {
                'onStateChange': this.onPlayerStateChange
            }
        });

        this.overlay.style.display = 'flex';
    }

    onPlayerStateChange(state) {
       try {
        const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling; // we get closest elem module__video-item_3 -> then next elem - locked video here
        const playBtn = this.activeBtn.querySelector('svg').cloneNode(true); // true -> глубокое копирование

        if (state.data === 0) {
            if (blockedElem.querySelector('.play__circle').classList.contains('closed')) {
                blockedElem.querySelector('.play__circle').classList.remove('closed');
                blockedElem.querySelector('svg').remove();
                blockedElem.querySelector('.play__circle').appendChild(playBtn);
                blockedElem.querySelector('.play__text').textContent = 'play video';
                blockedElem.querySelector('.play__text').classList.remove('attention');
                blockedElem.style.opacity = 1;
                blockedElem.style.filter = 'none';

                blockedElem.setAttribute('data-disabled', 'false');
            }
        }
       } catch(e){}
    }

    init() {
        if (this.btns.length > 0) {
            const tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            this.bindTriggers();
            this.bindCloseBtn();
        }
    }
}


// if a player on the page already exists, we will not make one more --> we open modal window