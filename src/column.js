import React from 'react';
import Task from './task';
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';

const Container= styled.div`
text-align: center;
margin: 8px;
border: 1px solid lightgrey;
border-radius: 2px;
width: 220px;
display:flex;
flex-direction:column;
`;

const ContainerColumnLess= styled.div`
text-align: center;
margin: 1px;
width: 220px;
display:flex;
flex-direction:column;
`;
const Title= styled.div`
padding: 8px;
background-color:'blue';
`;
const TaskList= styled.div`
padding: 8px;
transition: background-color 0.2s ease;
background-color: ${props =>( props.isDraggingOver? 'skyblue':'white')};
flex-grow:1;
min-height: 100 px;
`;

const TaskListColumnLess= styled.div`
padding: 8px;
flex-grow:1;
min-height: 100 px;
`;
export default class Column extends React.Component{
    render(){
		if(this.props.column.id === 'column-1'){
			return (
				<Container>
					<Title>{this.props.column.title}</Title>
					<Droppable droppableId={this.props.column.id}>
					{(provided,snapshot) =>(
							<TaskList ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
								{this.props.tasks.map((task,index) => <Task key={task.id} task={task} index={index}/>)}
								{provided.placeholder}
							</TaskList>
					)}
					</Droppable>
				</Container>
				);
		}
		else
		{
			return (
				<ContainerColumnLess>
					<Title>{this.props.column.title}</Title>
					<Droppable droppableId={this.props.column.id}>
					{(provided,snapshot) =>(
							<TaskListColumnLess ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
								{this.props.tasks.map((task,index) => <Task key={task.id} task={task} index={index}/>)}
								{provided.placeholder}
							</TaskListColumnLess>
					)}
					</Droppable>
				</ContainerColumnLess>
				);
		}
	}
}