// TODO Use browserify to load the compiled modules in the client. browserify main.js -o bundle.js
/*In the preceding command, main.js is the file that contains the root module within our application's dependency tree.
 The bundle.js file is the output file that we will be able to import using a HTML script tag.
 Import the bundle.js file using a HTML <script> tag.*/

function getElementByAttribute(attr, value, root) {
    root = root || document.body;
    if(root.hasAttribute(attr) && root.getAttribute(attr) == value) {
        return root;
    }
    let children = root.children,
        element;
    for(let i = children.length; i--; ) {
        element = getElementByAttribute(attr, value, children[i]);
        if(element) {
            return element;
        }
    }
    return null;
}

let port_number = 3000;

let socket = io('http://localhost:' + port_number, {
    'reconnection': true,
    'reconnectionDelay': 600,
    'reconnectionAttempts': 30
});

let fbBtnClicked = false;

console.log('script started click addmefast like in 8 sec');

setInterval(() => {
    if (fbBtnClicked && window.location.host === 'addmefast.com') {
        console.log('confirm like in 5 sec');
        setTimeout(() => {

            console.log('check successLike in 5 sec');
            setTimeout(() => {
                let successLike = document.getElementsByClassName('success_like')[0]?.click();
                if (successLike) {
                    console.log('emit successLike');
                    io.emit('successLike');
                }
            }, 5000);
            
            console.log('addmefast click CONFIRM like');
            document.getElementsByClassName('single_like_button')[0]?.click();
        }, 5000);
        fbBtnClicked = false;
    } else {
        console.log('addmefast click Like');
        document.getElementsByClassName('single_like_button')[0]?.click();
    }
}, 8000);

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



