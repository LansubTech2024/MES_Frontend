import React, { useState } from 'react'
import DataTable from 'react-data-table-component'

function table(){
    const columns=[
        {
            name:'Name',
            selector:row=>row.name,
            sortable:true
        
        },
        {
            name:"Email",
            selector:row=>row.email,
            sortable:true
            
        },
        {
            name:"Department",
            selector:row=>row.department,
            sortable:true
        }
];
const data=[
    {
        id:1,
        name:'keerthi',
        email:'keerthikak0393@gmail.com',
        department:'Technical'
    },
    {
        id:2,
        name:'deepa',
        email:'deepa@gmail.com',
        department:'Technical'
    },
    {
        id:3,
        name:'sri',
        email:'sri@gmail.com',
        department:'Technical'
       
    }
]
const[records, setRecords]=useState (data);
function handleFilter(event){
    const newData=records.filter(row=>
    {
        return row.name.toLowerCase().includes(event.target.value.toLowerCase())
    }
    )
    setRecords(newData)
}
return(
    <div className='container mt-5'>
        <div style={{width:400,height:400}} ></div>
        <div className='text-end'><input type="text" onChange={handleFilter}/></div>
        <DataTable
        columns={columns}
        data={data}
        selectableRows
        fixedHeader
        pagination>

        </DataTable>
    </div>
)

}
  
export default table