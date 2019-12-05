import React from 'react'
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
var path= require('path');

const Container= styled.div`
padding: 8px;
border: 1px solid lightgrey;
border-radius: 2px;
margin-bottom: 8px;
`;

const img= styled.div`
padding: 8px;
border: 1px solid lightgrey;
border-radius: 2px;
margin-bottom: 8px;
display: inline-block;
`;

export default class Task extends React.Component{
	render(){
		return (
		<Draggable draggableId={this.props.task.id} index={this.props.index}>
		{provided =>{
				if(this.props.task.image == null){
					return(<Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>{this.props.task.content}</Container>);
				}
				else{
					const images = require.context('./images', true);
					//let imgSrc=require(this.props.task.image);
					return(<Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
								<img src={images(this.props.task.image)}
									width="100"
									height="100"
									className="d-inline-block align-top">
								</img>
						   </Container>)
				}
			}}
		</Draggable>
		);
	}
}