import { ElMessage } from 'element-plus';
import {JSEncrypt} from 'jsencrypt'

let timeout: any = null;

// 防抖
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

// 判断浏览器
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


// 验证输入
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


// 复制文本
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


// 加密
export const encryptByPublicKey=(password:any)=>{
    let publicKey='MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3m6CGmIWVUBHV+ACqSQ3oRVB4xuRu84zzJ0eH/oNb+Qhs/jNVdHyCQ/mTuANGJS+LAqbAvVJOyNgcYfsSGm7n7fuuffr9YdXgkv4i6xqe6i+Ahinhr6Htcv7wej/s8lA0dhCnw74KuSm+0rhwiqqnPeMfj4mibSsfzL6XbranfQIDAQAB'
    let encrypt : JSEncrypt = new JSEncrypt()
    encrypt.setPublicKey(publicKey)
    return <string>encrypt.encrypt(password)
}

