/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

export default function DBUpdate(){
    let [data,setData] = React.useState('')

    const form = React.useRef()
    const name = React.useRef()
    const price = React.useRef()
    const date_added = React.useRef()
    const detail = React.useRef()    

    React.useEffect(()=>{
        fetch('/api/db/read')
        .then(response => response != null ? response.json() : null)
        .then(result => {
           
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
            <table>
                <tr>
                    <th>แก้ไข</th><th>ชื่อสินค้า</th><th>ราคา</th>
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
                                    <input type="radio" name="_id" value={doc._id} onClick={() => onClickRadio(doc)}/>
                                </td>
                                <td>{doc.name}</td>
                                <td>{p}</td>
                                <td>{df}</td>
                                <td>{doc.detail}</td>
                            </tr>
                        )
                    })
                }
                <tr>
                    <td><button>แก้ไข</button></td>
                    <td><input type="text" name="name" ref={name} /></td>
                    <td><input type="number" name="price" ref={price} /></td>
                    <td><input type="date" name="date_added" ref={date_added} /></td>
                    <td>
                        <textarea name="detail" ref={detail} cols="34" rows="3"></textarea>
                    </td>

                </tr>
            </table>
            <div>เลือกรายการที่จะแก้ไข แล้วใส่ข้อมูลใหม่ลงไป จากนั้นคลิกปุ่ม แก้ไข</div>
            </form>
        )

        setData(r)
    }

    const onSubmitForm = (event) => {
        event.preventDefault()

        if(!window.confirm('ยืนยันการแก้ไขรายการนี้')){
            return
        }

        const fd = new FormData(form.current)
        const fe = Object.fromEntries(fd.entries())

        fetch('/api/db/update', {
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
                //หลังการแก้ไข ฝั่งเซิร์ฟเวอร์จะอ่านข้อมูลใหม่ แล้วส่งกลับมา
                //เราก็นำมาแสดงผลใหม่อีกครั้ง
                showData(result)
                form.current.reset()
                alert('ข้อมูลถูกแก้ไขแล้ว')
            }
        })
        .catch(err => alert(err))
    }

    //เมื่อ radio บนรายการใดถูกคลิก (ในที่นี้เลือกใช้ click แทน change)
    //ก็อ่านข้อมูลในแต่ละฟิลด์จาก document ที่ผ่านเข้ามา แล้วเติมลงในฟอร์ม
    const onClickRadio = (doc) => {
        name.current.value = doc.name
        price.current.value = doc.price

        let dt = new Date(Date.parse(doc.date_added))
        let y = dt.getFullYear()
        let m = dt.getMonth() + 1
        //ค่าที่จะกำหนดให้แก่อินพุตชนิด date ต้องเป็นรูปแบบ yyyy-mm-dd
        //สำหรับเดือนและวันที่ หากเป็นตัวเลขเดียวต้องเติม 0 ข้างหน้า
        m = (m >= 10) ? m : '0' + m
        let d = dt.getDate()
        d = (d >= 10) ? d : '+' + d
        date_added.current.value = `${(y)}-${m}-${d}`

        detail.current.value = doc.detail
    }

    return (
        <div style={{margin: '20px'}}>
            <div id="data">{data}</div>
            <a href="/">หน้าหลัก</a>

        </div>
    )
    

}