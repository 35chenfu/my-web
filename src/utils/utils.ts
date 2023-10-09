import { ElMessage } from 'element-plus';
import i18n from '@/assets/lang/i18n';
let timeout: any = null;

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider,TwitterAuthProvider } from 'firebase/auth';

export const googleLogin = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyDfQpvmtttOa0h__QorKUKV0qkbH_BOtjY",
        authDomain: "dev-auth.umate.me",
        projectId: "um-web-390908",
        storageBucket: "um-web-390908.appspot.com",
        messagingSenderId: "464842429918",
        appId: "1:464842429918:web:9c15a0baf87313c16af94f",
        measurementId: "G-XZNSWB70YQ"
    };
    const app = initializeApp(firebaseConfig);
    const provider = new GoogleAuthProvider();
    
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential: any = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log('谷歌登录的用户信息：', user);
            // ...
        })
        .catch((error) => {
            // 此处处理错误。
            const errorCode = error.code;
            const errorMessage = error.message;
            // 使用的用户帐户的电子邮件。
            const email = error.customData.email;
            // 使用的AuthCredential类型。
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
};

export const twitterlogin=()=>{
    const firebaseConfig = {
        apiKey: "AIzaSyDfQpvmtttOa0h__QorKUKV0qkbH_BOtjY",
        authDomain: "um-web-390908.firebaseapp.com",
        projectId: "um-web-390908",
        storageBucket: "um-web-390908.appspot.com",
        messagingSenderId: "464842429918",
        appId: "1:464842429918:web:9c15a0baf87313c16af94f",
        measurementId: "G-XZNSWB70YQ"
    };
    const app = initializeApp(firebaseConfig);
    const provider = new TwitterAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential: any = TwitterAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log('推特登录的用户信息：', user);
            // ...
        })
        .catch((error) => {
            console.log('推特登录报错',error)
            // 此处处理错误。
            const errorCode = error.code;
            const errorMessage = error.message;
            // 使用的用户帐户的电子邮件。
            const email = error.customData.email;
            // 使用的AuthCredential类型。
            const credential = TwitterAuthProvider.credentialFromError(error);
            // ...
        });
}

export const debounce = (func: any, wait = 500, ams = [], immediate = false) => {
    // 清除定时器
    if (timeout !== null) clearTimeout(timeout);
    // 立即执行，此类情况一般用不到
    if (immediate) {
        const callNow = !timeout;
        timeout = setTimeout(function () {
            timeout = null;
        }, wait);

        if (callNow) typeof func === 'function' && func(...ams);
    } else {
        // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
        timeout = setTimeout(function () {
            typeof func === 'function' && func(...ams);
        }, wait);
    }
};
export const windowBrowser = {
    getAgent: function (): any {
        var ua = window.navigator.userAgent.toLowerCase();
        return ua;
    },
    //判断是否是微信浏览器
    isWechat: function () {
        //通过正则表达式匹配ua中是否含有MicroMessenger字符串
        return this.getAgent().match(/MicroMessenger/i) == 'micromessenger';
    },
    //判断是否是QQ浏览器
    isQQ: function () {
        return this.getAgent().match(/QQ/i) == 'qq';
    },
    //判断是否是手机端
    isMobile: function () {
        var u = this.getAgent();
        alert(u);
        return !!u.match(/AppleWebKit.*Mobile.*/i);
    },
    //判断是否是Android
    isAndroid: function () {
        return this.getAgent().match(/Android/i) == 'android';
    },
    //判断是否是IOS
    isIOS: function () {
        return !!this.getAgent().match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i);
    },
    // 判断是否是UC
    isUC: function () {
        return window.navigator.userAgent.indexOf('UCBrowser') > -1;
    },
    // 判断是否是夸克
    isQK: function () {
        return window.navigator.userAgent.indexOf('Quark') > -1;
    },
};

export const verifyInput = (type: string, val: string) => {
    let reg: any = '';
    switch (type) {
        case 'pwd':
            reg =
                /(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%\*\?&~#\^&\(\)\,\.\"\`\'\:\;\\\{\}\[\]\-\_\+\=<>\/])[A-Za-z\d@$!%\*\?&~#\^&\(\)\,\.\"\`\'\:\;\\\{\}\[\]\-\_\+\=<>\/]+/;
            // reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、])([a-zA-Z0-9]{8,20})$/im;
            return new RegExp(reg).test(val) && val.length >= 8 && val.length <= 20;
        case 'email':
            reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            return new RegExp(reg).test(val);
    }
};

export const getAssetUrl = (image: any) => {
    return new URL(`../assets/images/${image}`, import.meta.url).href;
};

export const copyDomText = (id: any, shareTxt = i18n.global.t('news.hasBeenCopied')) => {
    const node = document.getElementById(id);
    if (node) {
        let createRange: any = document.createRange();
        createRange.selectNodeContents(document.getElementById(id));
        const selection: any = document.getSelection();
        selection.removeAllRanges();
        console.log(node);
        selection.addRange(createRange);
        document.execCommand('Copy');
        selection.removeAllRanges();
        ElMessage({
            dangerouslyUseHTMLString: true,
            icon: 'none',
            message: `<img src="${import.meta.env.VITE_STATIC_URL}common/success.png"><span>${shareTxt}</span>`,
            customClass: 'custom_message',
        });
    }
};
