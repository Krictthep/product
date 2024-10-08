/* eslin.disable react-hooks/exhaustive-deps */
import React from "react";
import loadingGif from './loading.gif'

export default function DBDelete() {
    let [data,setData] = React.useState('')
    let [loading,setLoading] = React.useState('')
    const form = React.useRef()
    
    //แบบเก่า https://server-480a.onrender.com/api/db/read



    React.useEffect(()=>{

        setLoading(<img src={loadingGif} alt="loading..." />);
        fetch('https://demo.designgoodweb.com/api/db/read')
        .then(response => response != null ? response.json() : null)
        .then(result => {
            setLoading(<></>)
            if(result.length > 0){
                showData(result)
                
            }
            else{
                setData(<>ไม่มีรายการข้อมูล</>)
            }

        })
        .catch(err => alert(err))
    }, [])


    const showData = (result) => {
        let r = (
            <form onSubmit={onSubmitForm} ref={form}>
            <div style={{overflow: 'auto'}}>            
            <table style={{border: '1px', borderStyle: 'groove'}} class='table'>
                <tr style={{backgroundColor: 'grey', borderStyle: 'solid'}}>
                    <th>ลบ</th><th>ชื่อสินค้า</th><th>ราคา</th>
                    <th>วันที่เพิ่มสินค้า</th><th>รายละเอียด</th>
                </tr>
                {
                    result.map(doc => {
                        let dt = new Date(Date.parse(doc.date_added))
                        let df = (
                            <>{dt.getDate()}-{dt.getMonth() + 1 }-{dt.getFullYear()}</>
                        )
                        let p = new Intl.NumberFormat().format(doc.price)

                        return (
                            <tr>
                                {/*
                                เมื่อคลิก radio บนรายการใด เราก็แนบ document ของรายนั้นไปยังฟังก์ชั่นเป้าหมาย
                                เพื่อใช้ในการอ่านข้อมูลจากแต่ละฟิลด์ไปแสดงที่ฟอร์ม
                                */}
                                <td>
                                    <input type="radio" name="_id" value={doc._id} />
                                </td>
                                <td>{doc.name}</td>
                                <td>{p}</td>
                                <td>{df}</td>
                                <td>{doc.detail}</td>
                            </tr>
                        )
                    })
                }            
            </table>
            <button class="btn btn-primary">ลบรายการที่เลือก</button>
            </div>
            </form>
        )

        setData(r)
    }


    const onSubmitForm = (event) => {
        event.preventDefault()       

        const fd = new FormData(form.current)
        const fe = Object.fromEntries(fd.entries())

        if(Object.keys(fe).length === 0){
            alert('ต้องเลือกรายการที่จะลบ')
            return
        }

        if(!window.confirm('ยืนยันการลบรายการนี้')){
            return
        }

        fetch('https://demo.designgoodweb.com/api/db/delete', {
            method: 'POST',                                         
            body: JSON.stringify(fe),
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(result => {
            if(result.error){
                alert(result.error)
            }
            else{
               if(result.length === 0){
                setData('ไม่มีรายการข้อมูล')
               }
               else{ //หลังการลบ ก็อ่านข้อมูลมาแสดงใหม่อีกครั้ง
                showData(result)
               }
                alert('ข้อมูลถูกลบแล้ว')
            }
        })
        .catch(err => alert(err))
    }

    return (
        <div style={{margin: '20px'}}>
            <div class="col-lg-12" style={{textAlign: 'center'}}>{loading}</div>
            <div id="data">{data}</div><br/>
            <a href="/">หน้าหลัก</a>
        </div>
    )
    
}