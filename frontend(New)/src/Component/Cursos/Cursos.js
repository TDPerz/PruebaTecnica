import './Cursos.css'
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'

function Cursos(){
	const[cursos, setCursos] = useState([])

	const columns = [
		{ title: 'id', dataIndex: 'id', key: 'id' },
		{ title: 'nombre', dataIndex: 'nombre', key: 'nombre' },
		{ title: 'creditos', dataIndex: 'creditos', key: 'creditos' },
		{ title: 'horario', dataIndex: 'horario', key: 'horario' },
		{ title: 'idProfesor', dataIndex: 'idprofesor', key:'idprofesor'},
		{ title: 'fechaCreacion', dataIndex:'fechaCreacion', key:'fechaCreacion'},
		{
		  title: 'Action',
		  dataIndex: '',
		  key: 'x',
		  render: (index) => <div>
			</div>,
		},
	];
	useEffect(()=>{
		fetch('http://localhost:8080/cursos')
		.then(res=> res.json())
		.then(r =>{
			if(r.status == 0){
				setCursos(r.data)
			}
		})
	})

	return (
		<div>
			<h1>cursos</h1>
			<Table columns={columns} dataSource={cursos}/>
		</div>
	)
}

export default Cursos