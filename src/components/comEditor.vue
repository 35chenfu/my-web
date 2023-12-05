<template>
    <div>
        <div style="border: 1px solid #ccc; margin-top: 10px;width:100%;">
            <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode"
                style="border-bottom: 1px solid #ccc" />
            <Editor :defaultConfig="editorConfig" :mode="mode" v-model="valueHtml" style="height: 400px;width:100%; overflow-y: hidden"
                @onCreated="handleCreated" @onChange="handleChange" @onDestroyed="handleDestroyed" @onFocus="handleFocus"
                @onBlur="handleBlur" @customAlert="customAlert" @customPaste="customPaste"  />
        </div>
        
    </div>
</template>

<script lang="ts">
import "@wangeditor/editor/dist/css/style.css";
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import baseConfing from '@/config'

export default {
    components: { Editor, Toolbar },
    setup() {
        // 编辑器实例，必须用 shallowRef，重要！
        const editorRef = shallowRef();
        // 内容 HTML
        const valueHtml = ref("<p></p>");

        // 模拟 ajax 异步获取内容
        onMounted(() => {
            setTimeout(() => {
                valueHtml.value = "";
            }, 1500);
            console.log(11111,editorRef)
        });

        const toolbarConfig = {};
        const editorConfig = { 
            placeholder: "请输入内容...",
            MENU_CONF: {}
        };
        editorConfig.MENU_CONF['uploadImage'] = {
            server: baseConfing.baseUrl+'my-file/file/upload',
            fieldName: 'file',
            // 自定义插入图片
            customInsert(res: any, insertFn: any) {  // TS 语法
                console.log(1231321,res)

                // let imgUrl='http://125.124.0.124:8000/my-file/file/preview/5fb8f29796404931bf1f2f88774fdab6'
                let imgUrl=baseConfing.baseUrl+'my-file/file/preview/'+res.result.id
                let text=`<img src=${imgUrl}>`
                editorRef.value.dangerouslyInsertHtml(text)
            },
        }
        function insertFn(url, alt, href){

        }
        
        // 组件销毁时，也及时销毁编辑器，重要！
        onBeforeUnmount(() => {
            const editor = editorRef.value;
            if (editor == null) return;

            editor.destroy();
        });

        // 编辑器回调函数
        const handleCreated = (editor) => {
            
            editorRef.value = editor; // 记录 editor 实例，重要！
           
        };
        const handleChange = (editor) => {
            console.log("change:", editor.getHtml());
        };
        const handleDestroyed = (editor) => {
            console.log("destroyed", editor);
        };
        const handleFocus = (editor) => {
            console.log("focus", editor);
        };
        const handleBlur = (editor) => {
            console.log("blur", editor);
        };
        const customAlert = (info, type) => {
            alert(`【自定义提示】${type} - ${info}`);
        };
        const customPaste = (editor, event, callback) => {
            console.log("ClipboardEvent 粘贴事件对象", event);

            // 自定义插入内容
            editor.insertText("xxx");

            // 返回值（注意，vue 事件的返回值，不能用 return）
            callback(false); // 返回 false ，阻止默认粘贴行为
            // callback(true) // 返回 true ，继续默认的粘贴行为
        };
        const insertText = (val:any='') => {
            const editor = editorRef.value;
            if (editor == null) return;
            editor.insertText(val);
        };

        const printHtml = () => {
            const editor = editorRef.value;
            if (editor == null) return;
            console.log(editor.getHtml());
        };

        const disable = () => {
            const editor = editorRef.value;
            if (editor == null) return;
            editor.disable();
        };

        return {
            editorRef,
            mode: "default",
            valueHtml,
            toolbarConfig,
            editorConfig,
            handleCreated,
            handleChange,
            handleDestroyed,
            handleFocus,
            handleBlur,
            customAlert,
            customPaste,
            insertText,
            printHtml,
            disable,
        };
    },
};
</script>
