/***
 * title: storage.ts
 * Desc: 对存储的简单封装
 */
// 加密库
import CryptoJS from 'crypto-js';

// 十六位十六进制数作为密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse('3333e66666111111');
// 十六位十六进制数作为密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse('3333bb2222111111');

// 类型 window.localStorage,window.sessionStorage,
type Config = {
    type: any;
    prefix: string;
    expire: any;
    isEncrypt: Boolean;
};
const config: Config = {
    type: 'localStorage', // 本地存储类型 sessionStorage
    prefix: '', // 名称前缀 建议：项目名 + 项目版本
    expire: 0, //过期时间 单位：秒
    isEncrypt: false, // 默认加密 为了调试方便, 开发过程中可以不加密
};

// 判断是否支持 Storage
export const isSupportStorage = () => {
    return typeof Storage !== 'undefined' ? true : false;
};

// 设置 setStorage
export const setStorage = (key: string, value: any, type: any = 'localStorage',expire:number=0) => {
    if (value === '' || value === null || value === undefined) {
        value = null;
    }
    let data = {
        value: value, // 存储值
        time: Date.now(), //存值时间戳
        expire: expire,
    };

    const encryptString = config.isEncrypt ? encrypt(JSON.stringify(data)) : JSON.stringify(data);
    (window[type] as any).setItem(autoAddPrefix(key), encryptString);
};
export const timeZone = () => {
    // 获取用户所在的时区偏移量（分钟）
    const timezoneOffset = new Date().getTimezoneOffset();

    // 将时区偏移量转换为小时和分钟
    const hours = Math.abs(Math.floor(timezoneOffset / 60));
    const minutes = Math.abs(timezoneOffset % 60);

    // 判断时区方向（东半球为正，西半球为负）
    const direction = timezoneOffset > 0 ? '-' : '+';

    // 构建时区字符串
    const timezoneString = `UTC${direction}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return timezoneString;
};
// 获取 getStorage
export const getStorage = (key: string, type: any = 'localStorage') => {
    key = autoAddPrefix(key);
    // key 不存在判断
    if (!(window[type] as any).getItem(key) || JSON.stringify((window[type] as any).getItem(key)) === 'null') {
        return null;
    }

    // 优化 持续使用中续期
    const storage = config.isEncrypt ? JSON.parse(decrypt((window[type] as any).getItem(key))) : JSON.parse((window[type] as any).getItem(key));
    if(storage.expire>0){
        let nowTime = Date.now();
        // 过期删除

        let setExpire = (storage.expire || config.expire) * 1000, //过期时间
            expDiff = nowTime - storage.time; //是否过期
        if (setExpire < expDiff) {
            removeStorage(key);
            return null;
        } else {
            // 未过期期间被调用 则自动续期 进行保活
            // setStorage(autoRemovePrefix(key), storage.value, type);
            return storage.value;
        }
    }else{
        return storage.value;
    }
    
    
};

// 是否存在 hasStorage
export const hasStorage = (key: string) => {
    key = autoAddPrefix(key);
    let arr = getStorageAll().filter((item) => {
        return item.key === key;
    });
    return arr.length ? true : false;
};

// 获取所有key
export const getStorageKeys = () => {
    let items = getStorageAll();
    let keys = [];
    for (let index = 0; index < items.length; index++) {
        keys.push(items[index].key);
    }
    return keys;
};

// 获取全部 getAllStorage
export const getStorageAll = () => {
    let len = window[config.type].length; // 获取长度
    let arr = new Array(); // 定义数据集
    for (let i = 0; i < len; i++) {
        // 获取key 索引从0开始
        let getKey = (window[config.type] as any).key(i);
        // 获取key对应的值
        let getVal = (window[config.type] as any).getItem(getKey);
        // 放进数组
        arr[i] = { key: getKey, val: getVal };
    }
    return arr;
};

// 删除 removeStorage
export const removeStorage = (key: string) => {
    (window[config.type] as any).removeItem(autoAddPrefix(key));
};

// 清空 clearStorage
export const clearStorage = () => {
    // (window[config.type] as any).clear();
    window.localStorage.clear();
    window.sessionStorage.clear();
};

// 名称前自动添加前缀
const autoAddPrefix = (key: string) => {
    const prefix = config.prefix ? config.prefix + '_' : '';
    return prefix + key;
};

// 移除已添加的前缀
const autoRemovePrefix = (key: string) => {
    const len: any = config.prefix ? config.prefix.length + 1 : '';
    return key.substr(len);
    // const prefix = config.prefix ? config.prefix + '_' : '';
    // return  prefix + key;
};

/**
 * 加密方法
 * @param data
 * @returns {string}
 */
const encrypt = (data: any) => {
    if (typeof data === 'object') {
        try {
            data = JSON.stringify(data);
        } catch (error) {
            console.log('encrypt error:', error);
        }
    }
    const dataHex = CryptoJS.enc.Utf8.parse(data);
    const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
        iv: SECRET_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.ciphertext.toString();
};

/**
 * 解密方法
 * @param data
 * @returns {string}
 */
const decrypt = (data: any) => {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
    const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
        iv: SECRET_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
};
