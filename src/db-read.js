/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import loadingGif from './loading.gif'

export default function DBRead(){
    let [data,setData] = React.useState('')
    let [loading,setLoading] = React.useState('')

    
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
        let tb = (
            <div style={{overflow: 'auto', maxWidth: '100%'}}>
            <table style={{border: '1px', borderStyle: 'groove', minWidth: '500px'}} class='table'>
                <tr style={{backgroundColor: 'grey', borderStyle: 'solid'}}>
                    <th>ชื่อสินค้า</th><th>ราคา</th>
                    <th style={{width: '150px'}}>วันที่เพิ่มสินค้า</th><th>รายละเอียด</th>
                </tr>
                {
                    result.map(doc => {
                        let dt = new Date(Date.parse(doc.date_added))
                        let df = (
                            <>{dt.getDate()}-{dt.getMonth() + 1 }-{dt.getFullYear()}</>
                        )
                        let p = new Intl.NumberFormat().format(doc.price)

                        return (
                            <tr > 
                                <td>{doc.name}</td>
                                <td>{p}</td>
                                <td style={{width: '150px'}}>{df}</td>
                                <td>{doc.detail}</td>
                            </tr>
                        )
                    })
                }
            </table>
            </div>
        )

        setData(tb)
    }

    return (
        <div style={{margin: '20px'}}>
            <div class="col-lg-12" style={{textAlign: 'center'}}>{loading}</div>
            <div id="data">{data}</div>
            <a href="/">หน้าหลัก</a>

        </div>
    )
    

}