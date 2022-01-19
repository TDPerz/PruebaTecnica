import './Maestros.css'
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'

function Maestros(){

	const[maestros, setMaestros] = useState([])

	const columns = [
		{ title: 'id', dataIndex: 'id', key: 'id' },
		{ title: 'nombre', dataIndex: 'nombre', key: 'nombre' },
		{ title: 'telefono', dataIndex: 'telefono', key: 'telefono' },
		{ title: 'correo', dataIndex: 'correo', key: 'correo' },
		{
		  title: 'Action',
		  dataIndex: '',
		  key: 'x',
		  render: (index) => <div>
			</div>,
		},
	];
	useEffect(()=>{
		fetch('http://localhost:8080/maestros')
		.then(res=> res.json())
		.then(r =>{
			if(r.status == 0){
				setMaestros(r.data)
			}
		})
	})

	return (
		<div>
			<h1>Maestros</h1>
			<Table columns={columns} dataSource={maestros}/>
		</div>
	)
}

export default Maestros