import React, { useEffect } from 'react'
import './Estudiantes.css'
import { useState } from 'react';

//ant componentes
import { message ,Button, Form, Input, Table, Popover } from 'antd';
import Modal from 'antd/lib/modal/Modal';
function Estudiantes(){
	//Variables
	const[estudiantes, setEstudiantes] = useState([])
	const[edit, setEdit] = useState({})
	const[deletVar, setDeletVar] = useState({})
	const[eForm] = Form.useForm()
	const[edForm] = Form.useForm()
	const [newEVisi, setNewEVisi] = useState(false);
	const [editVis, setEditVis] = useState(false);
	const [deleteVis, setDeleteVis] = useState(false);

	//Funciones
	const showModal = () => {
		setNewEVisi(true);
	  };
	
	  //post
	const sendData = (values) =>{
		eForm.resetFields()
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(values)
		};
		fetch('http://localhost:8080/estudiantes', requestOptions).then(res => res.json()).then(
			(resp)=>{
				if(resp.status == 0){
					setNewEVisi(false)
					message.success("Subido con exito!")
				}
				else{
					setNewEVisi(false)
					message.error('no se pudo subir bien')
				}
			}
		)
	}

	 //PUT
	const editData = (values) =>{
		console.log(edit.id)
		console.log(values.id)
		edForm.resetFields()
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(values)
		};
		fetch('http://localhost:8080/estudiantes/'+edit.id, requestOptions).then(res => res.json()).then(
			(resp)=>{
				if(resp.status == 0){
					setEditVis(false)
					setEdit({})
					message.success("Subido con exito!")
				}
				else{
					setEditVis(false)
					setEdit({})
					message.error('no se pudo subir bien')
				}
			}
		)
		setEditVis(false)
	}

	 //Delete
	const deleteData = ()=>{
		fetch('http://localhost:8080/estudiantes/'+deletVar.id, {method:'DELETE'}).then(
			(resp)=>{
				if(resp.status == 0){
					setDeleteVis(false)
					setDeletVar({})
					message.success("Eliminado con exito")
				}
				else{
					setDeleteVis(false)
					message.error('Eliminado con exito')
				}
			}
		)
	}

	const cancelData = () => {
		setNewEVisi(false)
		setEditVis(false)
		setDeleteVis(false)
	}

	//Variables de la tabla
	const columns = [
		{ title: 'id', dataIndex: 'id', key: 'id' },
		{ title: 'nombre', dataIndex: 'nombre', key: 'nombre' },
		{ title: 'telefono', dataIndex: 'age', key: 'age' },
		{ title: 'correo', dataIndex: 'correo', key: 'correo' },
		{
		  title: 'Action',
		  dataIndex: '',
		  key: 'x',
		  render: (index) => <div>
			  <Button onClick={()=>{
			  	setEdit(index)
			  	edForm.setFieldsValue(index)
			  	setEditVis(true)
				}}>Editar</Button>
				<Button onClick={()=>{
					setDeleteVis(true)
					setDeletVar(index)
				}}>borrar</Button>
			</div>,
		},
	  ];
	
	
	// Get al backend
	useEffect(()=>{
		fetch('http://localhost:8080/estudiantes')
		.then(res=> res.json())
		.then(r =>{
			if(r.status == 0){
				setEstudiantes(r.data)
			}
		})
	})
	return (
	<div>
		{/*Model para crear nuevo objeto*/}

		<Modal title="Agregar un estudiante" visible={newEVisi} footer={null}>
		<Form
			form={eForm}
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			initialValues={{ remember: true }}
			onFinish={sendData}
			autoComplete="off"
			>
			<Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Se necesita nombre' }]}>
				<Input />
			</Form.Item>
			<Form.Item label="Telefono" name="telefono" rules={[{ required: true, message: 'Se necesita telefono' }]} >
				<Input/>
			</Form.Item>
			<Form.Item label="Correo" name="correo" rules={[{ required: true, message: 'Se necesita correo' }]} >
				<Input/>
			</Form.Item>
			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit">
					Enviar
				</Button>
				<Button type='erro' onClick={()=> cancelData()}>
					Cancelar
				</Button>
			</Form.Item>
			</Form>
		</Modal>

		<Modal title="Editar estudiante" visible={editVis} footer={null}>
		<Form
			form={edForm}
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			initialValues={{ remember: true }}
			onFinish={editData}
			autoComplete="off"
			>
			<Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Se necesita nombre' }]}>
				<Input />
			</Form.Item>
			<Form.Item label="Telefono" name="telefono" rules={[{ required: true, message: 'Se necesita telefono' }]} >
				<Input/>
			</Form.Item>
			<Form.Item label="Correo" name="correo" rules={[{ required: true, message: 'Se necesita correo' }]} >
				<Input/>
			</Form.Item>
			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit">
					Enviar
				</Button>
				<Button type='erro' onClick={()=> cancelData()}>
					Cancelar
				</Button>
			</Form.Item>
			</Form>
		</Modal>

		<Modal title="Borrando..." visible={deleteVis} onOk={()=>{deleteData()}} onCancel={()=>cancelData()}>
			<p>Seguro que quieres borrarlo?</p>
		</Modal>

		<h1>Estudiantes</h1>
		<Button type='primary' className='marginbt' onClick={()=>{showModal()}}>Agregar estudiante</Button>
		<Table columns={columns} dataSource={estudiantes} size='middle'/>
	</div>)
}

export default Estudiantes