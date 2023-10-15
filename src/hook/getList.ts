import { ref, onMounted, onUnmounted, Ref } from 'vue'
import http from '@/utils/http';

function getListHook(method,url:any,data:any) {
    onMounted(()=>{
        getTableList(method,url,data)
    })

    let tableList:any=ref([])
    let tableTotal=ref(0)
    const getTableList=(method,url:any,data:any,pageFrom:any='')=>{
        return new Promise((resolve)=>{
            http[method](url,data).then((res:any)=>{
                // resolve(res)
                tableList.value=res.rows
                tableTotal.value=res.total
            })
        })
        
    }

    return { 
        tableList,
        getTableList,
        tableTotal
    }
}

export default getListHook
