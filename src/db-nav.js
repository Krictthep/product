import React from 'react'
import DBCreate from './db-create'
import DBRead from './db-read'
import DBUpdate from './db-update'
import DBDelete from './db-delete'
import DBPaginate from './db-paginate.js'
import DBSearch from './db-search'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'


export default function DBNav() {

    return (
    <div class='container'>
   
            <BrowserRouter>
            <nav class="navbar navbar-light" style={{backgroundColor: "#e3f2fd"}}>
                <Link to="DBCreate">เพิ่มข้อมูล</Link>&nbsp;&nbsp;
                <Link to="DBRead">แสดงข้อมูล</Link>&nbsp;&nbsp;
                <Link to="DBUpdate">แก้ไขข้อมูล</Link>&nbsp;&nbsp;
                <Link to="DBDelete">ลบข้อมูล</Link>&nbsp;&nbsp;
                {/* <Link to="DBPaginate">แบ่งเพจ</Link>&nbsp;&nbsp;
                <Link to="DBSearch">Workshop: ค้นหาข้อมูล</Link>       */}
            </nav>
            <div className='content'>
                    <Routes>                   
                        <Route path="DBCreate" exact={true}  Component={DBCreate}></Route>
                        <Route path="DBRead" exact={true} Component={DBRead}></Route>    
                        <Route path="DBUpdate" exact={true} Component={DBUpdate}></Route>   
                        <Route path="DBDelete" exact={true} Component={DBDelete}></Route> 
                        <Route path="DBPaginate" exact={true} Component={DBPaginate}></Route> 
                        <Route path="DBSearch" exact={true} Component={DBSearch}></Route> 

                    </Routes>
            </div>

            </BrowserRouter>
    </div>
    )

    
}