import React from 'react'


export default function DBCreate(){
    const form = React.useRef()
    //แบบเก่า https://server-480a.onrender.com/api/db/create
    const onSubmitForm = (event) => {
        event.preventDefault()
        const fd = new FormData(form.current)
        const fe = Object.fromEntries(fd.entries())
        fetch('https://demo.designgoodweb.com/api/db/create', {
            method: 'POST',
            body: JSON.stringify(fe),
            headers: {'Content-Type':'application/json'}
        })
        .then(response => response.text())
        .then(result => {
            if(result => 'true'){
                form.current.reset()
                alert('ข้อมูลถูกจัดเก็บแล้ว')
            } else {
                alert('เกิดข้อผิดพลาด ข้อมูลไม่ถูกบันทึก')
            }
        })
        .catch(err => alert(err))
    }

    return (
        <form id="form-create" onSubmit={onSubmitForm} ref={form}>
              <div class="mb-3 row" style={{paddingTop: '20px'}}>
                <label class="col-sm-2 col-form-label">ชื่อสินค้า</label>
                <div class="col-sm-10">
                <input type="text" name="name" required />
                </div>     
              </div>


              <div class="mb-3 row">
                <label class="col-sm-2 col-form-label">ราคา</label>
                <div class="col-sm-10">
                <input type="number" name="price" min="0" required/>
                </div>     
              </div>
      
   
              <div class="mb-3 row">
                <label class="col-sm-2 col-form-label">รายละเอียดสินค้า</label>
                <div class="col-sm-10">
                <textarea name="detail" cols="30" rows="3"></textarea>
                </div>     
              </div>
          
          
              <div class="mb-3 row">
                <label class="col-sm-2 col-form-label">วันที่เพิ่มสินค้า</label>
                <div class="col-sm-10">
                <input type="date" name="date_added" required/>
                </div>     
              </div>
          
              <div class="mb-3 row">
                <div class="col-sm-2"></div>
                 <button class="col-sm-2 btn btn-primary">ตกลง</button>  
              </div>
     
          <br/><br/>
            <a href="/">หน้าหลัก</a>
        </form>
    )
}


