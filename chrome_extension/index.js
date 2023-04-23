let port_number = 3000;

let socket = io('http://localhost:' + port_number, {
    'reconnection': true,
    'reconnectionDelay': 600,
    'reconnectionAttempts': 30
});

let fbBtnClicked = false;

console.log('script started click addmefast like in 15 sec');


setInterval(() => {
    if (fbBtnClicked && window.location.host === 'addmefast.com') {
        console.log('confirm like in 5 sec');
        setTimeout(() => {
            console.log('addmefast click CONFIRM like');
            document.getElementsByClassName('single_like_button')[0]?.click();
        }, 5000);
        fbBtnClicked = false;
    } else {
        console.log('addmefast click Like');
        document.getElementsByClassName('single_like_button')[0]?.click();
    }
}, 15000);

setInterval(() => {
    if (!fbBtnClicked && window.location.host === 'www.facebook.com') {
        console.log('try click fb like btn');
        
        if (document.querySelector('[aria-label="Liked"]')) {
            console.log('facebook btn already liked close popup');
            window.close();
        }
        
        let likeBtn = document.querySelector('[aria-label="Like"]');
        if (!likeBtn) {
            likeBtn = document.querySelector('[aria-label="Харесва ми"]');
        }
        if (!likeBtn){
            likeBtn = document.querySelector('[aria-label="Следване"]');
        }
        if (!likeBtn){
            likeBtn = document.querySelector('[aria-label="Follow"]');
        }
        else {
            console.log('facebook btn not found exit in 3 sec');
            setTimeout(() => {
                window.close();
            }, 3000);
        }
        if (likeBtn) {
            likeBtn.click();
            console.log('facebook page LIKED popup window in 5 sec');
            setTimeout(() => {
                window.close();
            }, 5000);


        }
    }
}, 4000);



